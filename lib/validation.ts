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

export const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["TO DO" , "IN PROGRESS" , "FINISHED"]),
  checked: z.boolean(),
});
export type createTodoType = z.infer<typeof createTodoSchema>

export const localStorageSchema: z.ZodType<ToDo[]> = z.array(z.object({
  _id: z.string(),
  status: z.enum( ["TO DO", "FINISHED", "IN PROGRESS"]),
    title: z.string(),
    description: z.string(),
    checked: z.boolean(),
    userId: z.string(),
})) 