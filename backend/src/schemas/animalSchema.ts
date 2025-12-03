import { z } from "zod";
// Schema für Tiere
export const animalInputSchema = z
  .object({
    name: z
      .string({ error: "Name muss ein String sein" })
      .min(2, { message: "Name muss mindestens 2 Zeichen lang sein" }),

    category: z
      .string({ error: "Kategorie muss ein String sein" })
      .min(2, { message: "Kategorie muss mindestens 2 Zeichen lang sein" }),

    race: z
      .string({ error: "Rasse muss ein String sein" })
      .min(2, { message: "Rasse muss mindestens 2 Zeichen lang sein" }),
    // age: z
    //   .number({ error: "age must be a number" })
    //   .regex(/[a-z]/, { message: "password must include a lowercase letter" }),

    // age: z.preprocess(
    //   (a) => parseInt(z.string().parse(a), 10),
    //   z.number().gte(18, "Must be 18 and above")
    // ),

    age: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number({ error: "Alter muss eine Zahl sein" })
    ),

    sex: z.string({ error: "Geschlecht muss ein String sein" }),

    characteristics: z.array(
      z.string({ error: "Merkmale müssen ein String sein" })
    ),
    // characteristics: z.string({ error: "Merkmale müssen ein String sein" }),
    description: z.string({ error: "Beschreibung muss ein String sein" }),

    // Kommt aus request
    // owner: z
    //   .string({ error: "owner must be a string" })
    //   .min(5, { message: "owner must be at least 5 characters long" }),

    //    handycap: z.boolean({ error: "handycap must be a boolean" }),
    handycap: z.stringbool({ error: "Handicap muss ein Boolean sein" }),
    image_url: z.array(z.string()).optional(), // multiple
  })
  .strict();
