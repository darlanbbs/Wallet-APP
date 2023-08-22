import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["input", "output"]),
  value: z.string().transform((value) => Number(value)),
  description: z
    .string()
    .min(3, "The description must be at least 3 characters"),
});
