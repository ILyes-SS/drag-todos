"use client";
import {  useForm } from "react-hook-form";
import { signUp } from "../actions/user";
import Link from "next/link";
import { serverErrors, signupSchema, signupType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    setError
  } = useForm<signupType>({
    resolver: zodResolver(signupSchema)
  });

  async function onSubmit(formData: signupType) {
    const result: serverErrors = await signUp(formData);
    if(result?.errors){
      const resultErrors = result.errors;

      if (resultErrors.email) {
        setError("email", {
          type: "server",
          message: resultErrors.email,
        });
      } else if (resultErrors.password) {
        setError("password", {
          type: "server",
          message: resultErrors.password,
        });
      } else if (resultErrors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: resultErrors.confirmPassword,
        });
      } else {
        alert("Something went wrong!");
      }
    }
    reset();
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="email" type="email" {...register("email")} />
        {errors.email && <p> {errors.email.message} </p>}
        <input placeholder="#####" type="password" {...register("password")} />
        {errors.password && <p> {errors.password.message}  </p>}
        <input
          placeholder="#####"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p> {errors.confirmPassword.message}  </p>}
        <button disabled={isSubmitting} type="submit">
          submit
        </button>
      </form>
      <Link href={"/login"} className="border bg-blue-400">
        login
      </Link>
    </div>
  );
};

export default Register;
