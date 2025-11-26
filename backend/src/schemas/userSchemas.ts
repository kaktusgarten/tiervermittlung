import { z } from "zod";

export const userInputSchema = z
  .object({
    firstName: z
      .string({ error: "firstName must be a string" })
      .min(2, { message: "firstName must be at least 2 chars long" }),

    lastName: z
      .string({ error: "lastName must be a string" })
      .min(2, { message: "lastName must be at least 2 chars long" }),

    email: z
      .string({ error: "email must me a string" })
      .email({ message: "email must be a valid email address" }),
  })
  .strict();

export const userInputSchema2 = z
  .object({
    firstName: z
      .string({ error: "firstName must be a string" })
      .min(2, { message: "firstName must be at least 2 chars long" }),

    lastName: z
      .string({ error: "lastName must be a string" })
      .min(2, { message: "lastName must be at least 2 chars long" }),
    street: z
      .string({ error: "street must be a string" })
      .min(2, { message: "street must be at least 2 chars long" }),
    streetNumber: z
      .string({ error: "streetNumber must be a string" })
      .min(1, { message: "streetNumber must be at least 1 chars long" }),
    city: z
      .string({ error: "city must be a string" })
      .min(2, { message: "city must be at least 2 chars long" }),
    postalCode: z
      .string({ error: "postalCode must be a string" })
      .min(5, { message: "postalCode must be at least 5 chars long" })
      .max(5, { message: "postalCode must be at most 5 chars long" }),
    phone: z
      .string({ error: "phone number must be a string of numbers" })
      .min(7, { message: "phone must be at least 7 numbers long" }),
    email: z
      .string({ error: "email must me a string" })
      .email({ message: "email must be a valid email address" }),
  })
  .strict();

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ error: "password must be a string" })
      .min(1, { message: "current password is required" }),
    newPassword: z
      .string({ error: "password must be a string" })
      .min(8, { message: "password must be at least 8 characters long" })
      .max(64, { message: "password must be at most 64 characters long" })
      .regex(/[a-z]/, { message: "password must include a lowercase letter" })
      .regex(/[A-Z]/, { message: "password must include an uppercase letter" })
      .regex(/\d/, { message: "password must include a number" })
      .regex(/[^A-Za-z0-9\s]/, {
        message: "password must include a special character",
      }),
    confirmNewPassword: z
      .string({ error: "password must be a string" })
      .min(1, { message: "confirm new password is required" }),
  })
  .refine((d) => d.newPassword === d.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "passwords must match",
  })
  .strict();
