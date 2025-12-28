"use client";
import { FieldValues, useForm } from "react-hook-form";
import { signUp } from "../actions/user";
import Link from "next/link";

const Register = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm();

  async function onSubmit(formData: FieldValues) {
    await signUp(formData);
    reset();
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="email" type="email" {...register("email")} />
        {errors.email && <p> invalid email </p>}
        <input placeholder="#####" type="password" {...register("password")} />
        {errors.password && <p> invalid password </p>}
        <input
          placeholder="#####"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p> invalid confirm password </p>}
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
