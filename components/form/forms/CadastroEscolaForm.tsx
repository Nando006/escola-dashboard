import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import TextFieldRegister from "../fields/TextFieldRegister";
import { useEffect, useRef } from "react";
import ViaCep from "../../../server/api/viaCep";
import Form from "../Form";
import { EscolaSchema } from "../schemas/EscolaSchema";

export default function CadastroEscolaFormProvider() {
  const handleSubmit = (data: any) => {
    console.log('dados', data);
  }

  return (
    <Form
      onSubmit={ handleSubmit }
      schema={ EscolaSchema }
    >
      <CadastroEscolaForm />
    </Form>
  );
}

const CadastroEscolaForm = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses'
  });

  const addresses = useWatch({
    control,
    name: 'addresses'
  });

  const prevCepValues = useRef<string[]>([]);

  useEffect(() => {
    if (!prevCepValues.current.length && addresses?.length) {
      prevCepValues.current = addresses.map(() => '');
    }
  
    addresses?.forEach((address: any, index: number) => {
      const currentCep = address?.cep?.replace(/\D/g, '');
      const prevCep = prevCepValues.current[index]?.replace(/\D/g, '');
  
      if (currentCep && currentCep.length === 8 && currentCep !== prevCep) {
        ViaCep(currentCep)
          .then((data) => {
            if (data) {
              setValue(`addresses.${index}.street`, data.logradouro || '');
              setValue(`addresses.${index}.district`, data.bairro || '');
              setValue(`addresses.${index}.complement`, data.complemento || '');
              setValue(`addresses.${index}.uf`, data.uf || '');
              setValue(`addresses.${index}.locality`, data.localidade || '');
  
              // Atualizar o prevCep após o sucesso
              prevCepValues.current[index] = address?.cep || '';
            } else {
              // CEP não encontrado
             console.log('cep não encontrado')
            }
          })
          .catch((error) => {
            console.error('Erro ao buscar o CEP:', error);
            alert('Erro ao buscar o CEP.');
          });
      }
    });
  }, [addresses, setValue]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-x-8 gap-y-8">
        <TextFieldRegister
          label="Nome"
          name="nome"
          typeField="text"
          placeholder="Digite o nome da escola"
        />
        <TextFieldRegister
          label="CNPJ"
          name="cnpj"
          placeholder="00.000.000/0001-00"
          typeField="text"
          maskType="cnpj"
          max={18}
        />
        <TextFieldRegister
          label="E-mail"
          name="email"
          typeField="text"
          placeholder="Digite o e-mail"
        />
        <TextFieldRegister
          label="Nome do Responsável"
          name="responsavel"
          typeField="text"
          placeholder="Digite o nome da escola"
        />
        <TextFieldRegister
          label="Contato"
          name="contato"
          typeField="text"
          placeholder="Celular ou Telefone"
          maskType="phone"
        />
      </div>
      <div className="space-y-10">
        {
          fields.map((field, index) => (
            <div
              key={field.id}
              className="space-y-8"
            >
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span
                    className="font-semibold"
                  >
                    { index + 1 }º Endereço
                  </span>
                  <div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      title="Remover Endereço"
                      className="bg-red-800 px-5 py-1 rounded-lg font-medium
                      text-neutral-100 border-4 active:scale-105 shadow-lg duration-300 text-sm border-red-300 hover:bg-red-600"       
                    >
                      x
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                  <TextFieldRegister
                    name={ `addresses.${index}.cep` }
                    label="CEP"
                    placeholder="Digite o CEP"
                    typeField="text"
                    maskType="cep"
                  />
                  <TextFieldRegister
                    name={ `addresses.${index}.uf` }
                    label="UF"
                    placeholder="Digite o UF"
                    typeField="text"
                  />
                  <TextFieldRegister
                    name={ `addresses.${index}.locality` }
                    label="Localidade"
                    placeholder="Digite a localidade"
                    typeField="text"
                  />
                  <TextFieldRegister
                    name={ `addresses.${index}.street` }
                    label="Logradouro"
                    placeholder="Digite a Rua"
                    typeField="text"
                  />
                  <TextFieldRegister
                    name={`addresses.${index}.complement`}
                    label="Complemento"
                    placeholder="Digite o complemento"
                    typeField="text"
                  />
                  <TextFieldRegister
                    name={`addresses.${index}.district`}
                    label="Bairro"
                    placeholder="Digite o bairro"
                    typeField="text"
                  />
                </div>
              </div>
            </div>
          ))
        }
        <div className="space-x-5">
          <button
            type="button"
            title="Adicionar Endereço"
            onClick={() =>
              append({
                cep: '',
                street: '',
                district: '',
                complement: '',
                uf: '',
                locality: '',
              })
            }
            className='bg-green-800 px-5 py-1 rounded-lg font-medium
            text-neutral-100 border-4 active:scale-105 shadow-lg duration-300
            text-sm border-green-600 hover:bg-green-700'
          >
            +
          </button>
          {errors.addresses && (
            <span className="text-xs pr-2 font-medium tracking-widest text-red-400 text-right">
            {errors?.addresses?.message?.toString()}
          </span>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-slate-800 px-5 py-1 rounded-lg font-semibold
          text-neutral-100 border-4 border-slate-600 hover:bg-slate-700
          active:scale-105 shadow-lg duration-300 text-xs"
        >
          Registrar
        </button>
      </div>
    </div>
  );
}