import { z } from "zod";

export const signupSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, 'password must be at least 6 characters'),
  confirmPassword : z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

  const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, 'password must be at least 6 characters'),
})
export type signupType = z.infer<typeof signupSchema>
export type serverErrors = {
    errors: {
        email?: string;
        password?: string;
        confirmPassword?: string;
    }
}