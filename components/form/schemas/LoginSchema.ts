import { z } from "zod";

const passwordValidation = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres.")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
  .regex(/\d/, "A senha deve conter pelo menos um número.");

export const loginSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  password: passwordValidation
});