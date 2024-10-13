import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { IForm } from "../../src/utils/interfaces/IForm";

export default function Form({
  onSubmit,
  schema,
  children
}: IForm) {

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      addresses: [], // Inicializa o array vazio.
    }
  })

  return (
    <FormProvider
      { ...methods }
    >
      <form
        onSubmit={ methods.handleSubmit(onSubmit) }
      >
        <div>
          { children }
        </div>
      </form>
    </FormProvider>
  );
}