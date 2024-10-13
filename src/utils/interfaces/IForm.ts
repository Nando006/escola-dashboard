import { ReactNode } from "react";
import { ZodSchema } from "zod";

export interface IForm {
  schema: ZodSchema<any>;
  onSubmit: (data: any) => void;
  children: ReactNode;
}