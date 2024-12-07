import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address!" }),
  password: z
    .string({ required_error: "password is required!" })
    .min(8, { message: "minimum 8 characters" }),
});

export const registerFormSchema = z
  .object({
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "invalid email address!" }),
    firstName: z.string().min(1, { message: "first name is required" }),
    lastName: z.string().min(1, { message: "last name is required" }),
    password: z
      .string({ required_error: "password is required" })
      .min(8, { message: "minimum 8 characters" }),
    confirmPassword: z.string({
      required_error: "please confirm your password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export const topUpBalanceFormSchema = z.object({
  balance: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "balance must be a number" })
    .refine((val) => val > 0, { message: "balance must be a positive number" })
    .refine((val) => val >= 10000, {
      message: "minimum top up balance is Rp 10.000,00",
    })
    .refine((val) => val <= 1000000, {
      message: "maximum amount of top up balance is Rp 1.000.000,00",
    }),
});

export const updateAccountFormSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" }),
  firstName: z.string().min(1, { message: "first name is required" }),
  lastName: z.string().min(1, { message: "last name is required" }),
});
