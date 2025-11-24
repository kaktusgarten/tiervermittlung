import { z } from "zod";

export const characteristicInputSchema = z.object({
  characteristic: z
    .string({ message: "Eigenschaft ist erforderlich" })
    .min(3, { message: "Eigenschaft muss mindestens 3 Zeichen lang sein" }),
});
