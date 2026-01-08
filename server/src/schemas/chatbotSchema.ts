import { z } from "zod";

export const sendMessageSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, "Prompt cannot be empty")
    .max(1000, "Prompt is to long. Max 1000 chars"),
  chatId: z.string().trim(),
});
