import z from "zod";

export const authLoginSchema = z
  .object({
    email: z
      .string({ error: "E-Mail muss ein String sein" })
      .email({ message: "E-Mail muss eine gültige E-Mail-Adresse sein" }),
    password: z
      .string({ error: "Passwort muss ein String sein" })
      .min(1, { message: "Passwort ist erforderlich" }),
  })
  .strict();

export const authRegisterSchema = z
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

    password: z
      .string({ error: "password must be a string" })
      .min(8, { message: "password must be at least 8 characters long" })
      .max(16, { message: "password must be at most 64 characters long" })
      .regex(/[a-z]/, { message: "password must include a lowercase letter" })
      .regex(/[A-Z]/, { message: "password must include an uppercase letter" })
      .regex(/\d/, { message: "password must include a number" })
      .regex(/[^A-Za-z0-9\s]/, {
        message: "password must include a special character",
      }),
  })
  .strict();

// Tiervermittlung Register Schema mit Adresse und Telefonnummer
export const authRegisterSchema2 = z
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
      .min(4, { message: "PLZ muss mindestens 4 Zeichen lang sein" })
      .max(5, { message: "PLZ darf höchstens 5 Zeichen lang sein" }),
    phone: z
      .string({ error: "Telefonnummer muss ein String aus Zahlen sein" })
      .min(7, { message: "Telefonnummer muss mindestens 7 Ziffern lang sein" })
      .optional(),

    email: z
      .string({ error: "E-Mail muss ein String sein" })
      .email({ message: "E-Mail muss eine gültige E-Mail-Adresse sein" }),
    password: z
      .string({ error: "Passwort muss ein String sein" })
      .min(8, { message: "Passwort muss mindestens 8 Zeichen lang sein" })
      .max(16, { message: "Passwort darf höchstens 64 Zeichen lang sein" })
      .regex(/[a-z]/, {
        message: "Passwort muss einen Kleinbuchstaben enthalten",
      })
      .regex(/[A-Z]/, {
        message: "Passwort muss einen Großbuchstaben enthalten",
      })
      .regex(/\d/, { message: "Passwort muss eine Zahl enthalten" })
      .regex(/[^A-Za-z0-9\s]/, {
        message: "Passwort muss ein Sonderzeichen enthalten",
      }),
  })
  .strict();
