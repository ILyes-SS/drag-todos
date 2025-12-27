"use client";
import { FieldValues, useForm } from "react-hook-form";
import { signIn } from "../actions/user";
import GithubLogin from "@/components/GithubLogin";

const login = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm();

  async function onSubmit(formData: FieldValues) {
    await signIn(formData);
    reset();
  }
  return (
    <div>
      <GithubLogin />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="email" type="email" {...register("email")} />
        {errors.email && <p> invalid email </p>}
        <input placeholder="#####" type="password" {...register("password")} />
        {errors.password && <p> invalid password </p>}
        <button disabled={isSubmitting} type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default login;
