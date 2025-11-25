import z from "zod";

export const postInputSchema = z
  .object({
    title: z
      .string({ error: "title must be a string" })
      .min(5, { message: "title must be at least 5 characters long" }),

    content: z
      .string({ error: "Content must be a string" })
      .min(5, { message: "content must be at least 5 characters long" }),

    // image_url: z.url().optional(), // uplad single
    image_url: z.array(z.string()).optional(), // multiple
  })
  .strict();
