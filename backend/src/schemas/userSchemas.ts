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
      .string({ error: "Vorname muss ein String sein" })
      .min(2, { message: "Vorname muss mindestens 2 Zeichen lang sein" }),

    lastName: z
      .string({ error: "Nachname muss ein String sein" })
      .min(2, { message: "Nachname muss mindestens 2 Zeichen lang sein" }),
    street: z
      .string({ error: "Straße muss ein String sein" })
      .min(2, { message: "Straße muss mindestens 2 Zeichen lang sein" }),
    streetNumber: z
      .string({ error: "Hausnummer muss ein String sein" })
      .min(1, { message: "Hausnummer muss mindestens 1 Zeichen lang sein" }),
    city: z
      .string({ error: "Stadt muss ein String sein" })
      .min(2, { message: "Stadt muss mindestens 2 Zeichen lang sein" }),
    postalCode: z
      .string({ error: "PLZ muss ein String sein" })
      .min(4, { message: "PLZ muss mindestens 4 Ziffern lang sein" })
      .max(5, { message: "PLZ darf höchstens 5 Ziffern lang sein" }),
    phone: z
      .string({ error: "Telefonnummer muss ein String aus Zahlen sein" })
      .min(7, { message: "Telefonnummer muss mindestens 7 Ziffern lang sein" })
      .optional(),
    email: z
      .string({ error: "E-Mail muss ein String sein" })
      .email({ message: "E-Mail muss eine gültige E-Mail-Adresse sein" }),
  })
  .strict();

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ error: "Passwort muss ein String sein" })
      .min(1, { message: "aktuelles Passwort ist erforderlich" }),
    newPassword: z
      .string({ error: "Passwort muss ein String sein" })
      .min(8, { message: "Neues Passwort muss mindestens 8 Zeichen lang sein" })
      .max(64, {
        message: "Neues Passwort darf höchstens 64 Zeichen lang sein",
      })
      .regex(/[a-z]/, {
        message: "Neues Passwort muss einen Kleinbuchstaben enthalten",
      })
      .regex(/[A-Z]/, {
        message: "Neues Passwort muss einen Großbuchstaben enthalten",
      })
      .regex(/\d/, { message: "Neues Passwort muss eine Zahl enthalten" })
      .regex(/[^A-Za-z0-9\s]/, {
        message: "Neues Passwort muss ein Sonderzeichen enthalten",
      }),
    confirmNewPassword: z
      .string({ error: "Passwort muss ein String sein" })
      .min(1, { message: "Bestätigung des neuen Passworts ist erforderlich" }),
  })
  .refine((d) => d.newPassword === d.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwörter müssen übereinstimmen",
  })
  .strict();
