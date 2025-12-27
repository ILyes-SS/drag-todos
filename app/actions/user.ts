"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";

export async function signUp(formData: FieldValues) {
  const name = formData["email"] as string;
  const email = formData["email"] as string;
  const password = formData["password"] as string;
  const confirmPassword = formData["confirmPassword"] as string;

  const result = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      callbackURL: "http://localhost:3000",
    },
  });

  console.log("from signup", result);

  redirect("/");
}

export async function signIn(formData: FieldValues) {
  const email = formData["email"] as string;
  const password = formData["password"] as string;

  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  console.log("from signin", result);

  redirect("/");
}
export async function socialSignIn(provider: string) {
  const result = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: "http://localhost:3000/api/auth/callback/github", //configure this on github
    },
  });

  console.log("from social login", result);

  redirect("/");
}

export async function logOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  console.log("from logout", result);

  redirect("/");
}
