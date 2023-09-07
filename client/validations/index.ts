import * as z from "zod";

export const signUpFormSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().trim().email(),
    mobile: z
      .string()
      .trim()
      .min(10, { message: "Phone must be exactly 10 digits long" })
      .max(10, { message: "Phone must be exactly 10 digits long" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 charcters long" }),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const signInFormSchema = z.object({
  identity: z
    .string()
    .trim()
    .nonempty({ message: "Please enter a valid email or mobile" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 charcters long" }),
});

export const forgotPasswordFormSchema = z.object({
  identity: z.string().email(),
});

export const resetPasswordFormSchema = z
  .object({
    identity: z.string().email(),
    otp: z
      .string()
      .min(4, { message: "Password must be 4 digits long" })
      .max(4, { message: "Password must be 4 digits long" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 charcters long" }),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );
