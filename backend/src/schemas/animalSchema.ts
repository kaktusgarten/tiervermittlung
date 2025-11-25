import { z } from "zod";
// Schema für Tiere
export const animalInputSchema = z
  .object({
    name: z
      .string({ error: "name must be a string" })
      .min(2, { message: "name must be at least 5 characters long" }),

    category: z
      .string({ error: "category must be a string" })
      .min(5, { message: "category must be at least 5 characters long" }),

    race: z
      .string({ error: "race must be a string" })
      .min(5, { message: "race must be at least 5 characters long" }),

    // age: z
    //   .number({ error: "age must be a number" })
    //   .regex(/[a-z]/, { message: "password must include a lowercase letter" }),

    // age: z.preprocess(
    //   (a) => parseInt(z.string().parse(a), 10),
    //   z.number().gte(18, "Must be 18 and above")
    // ),

    age: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number({ error: "age must be a number" })
    ),

    sex: z.string({ error: "sex must be a string" }),

    characteristics: z.string({ error: "characteristics must be a string" }),

    description: z.string({ error: "description must be a string" }),

    // Kommt aus request
    // owner: z
    //   .string({ error: "owner must be a string" })
    //   .min(5, { message: "owner must be at least 5 characters long" }),

    //    handycap: z.boolean({ error: "handycap must be a boolean" }),
    handycap: z.stringbool({ error: "handycap must be a boolean" }),
    image_url: z.array(z.string()).optional(), // multiple
  })
  .strict();
