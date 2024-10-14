import { z } from "zod";
import { validateCNPJ } from "../../../src/utils/functions/ValidateCNPJ";

const addressSchema = z.object({
  cep: z.string().min(1, 'Cep é obrigatório'),
  street: z.string().min(1, 'Logradouro é obrigatório'),
  district: z.string().min(1, 'Bairro é obrigatório'),
  complement: z.string().optional(),
  uf: z.string().min(1, 'UF é obrigatório'),
  locality: z.string().min(1, 'Localidade é obrigatório'),
});

export const EscolaSchema = z.object({
  nome: z.string({
    required_error: 'Campo obrigatório'
  }).min(1, 'Campo obrigatório').min(4, 'No minímo 4 palavras'),
  email: z.string({
    required_error: 'Campo obrigatório'
  }).email('Digite um e-mail válido'),
  cnpj: z.string({
    required_error: 'Campo obrigatório' 
  }).refine(validateCNPJ, {
    message: "CNPJ inválido",
  }),
  responsavel: z.string({
    required_error: 'Campo obrigatório',
  }).min(1, 'Campo obrigatório'),
  contato: z.string().min(1, 'Telefone ou Celular obrigatório'),
  qtd_alunos: z.number().optional(),
  qtd_educadores: z.number().optional(),
  addresses: z.array(addressSchema).min(1, 'Um endereço é obrigatório'),
})