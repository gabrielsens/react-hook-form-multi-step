import { z } from "zod";

export const addresStepSchema = z.object({
  state: z.string().min(1, "Informe um estado"),
  street: z.string().min(1, "Infome uma rua"),
  city: z.string().min(1, "Infome a cidade"),
});
