import { z } from "zod";

export const messageInputSchema = z.object({
  message: z
    .string({ message: "Nachricht ist erforderlich" })
    .min(3, { message: "Nachricht muss mindestens 3 Zeichen lang sein" })
    .max(1000, { message: "Nachricht darf maximal 1000 Zeichen lang sein" }),
  sender: z
    .string({ message: "Absender-ID ist erforderlich" })
    .min(3, { message: "Absender-ID muss mindestens 3 Zeichen lang sein" }),
  animal: z
    .string({ message: "Tier-ID ist erforderlich" })
    .min(3, { message: "Tier-ID muss mindestens 3 Zeichen lang sein" }),
  status: z.enum(["active", "revoked", "declined", "archived"]),
});
