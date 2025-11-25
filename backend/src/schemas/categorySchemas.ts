import { z } from "zod";

export const categoryInputSchema = z.object({
  categoryName: z
    .string({ message: "Tierart ist erforderlich" })
    .min(3, { message: "Tierart muss mindestens 3 Zeichen lang sein" }),
});
