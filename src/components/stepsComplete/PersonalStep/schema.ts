import { z } from "zod";

export const personalStepSchema = z.object({
  firstName: z.string().min(1, "Informe um nome"),
  lastName: z.string().min(1, "Infome um sobrenome"),
});