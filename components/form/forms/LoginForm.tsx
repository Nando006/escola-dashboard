import TextField from "../fields/TextField";
import Form from "../Form";
import { loginSchema } from "../../../components/form/schemas/LoginSchema";
import LoaderLogin from "../../loaders/LoaderLogin";
import { useRef, useState } from "react";
import { nhost } from "../../../server/nhost/nhost";
import { Toast } from 'primereact/toast';

export default function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleChange = async (data: any) => {
    setLoading(true);

    try {
      const { error, session } = await nhost.auth.signIn({
        email: data.email,
        password: data.password
      });

      if(error) {
        setTimeout(() => {
          incorrectLogin();
          setErrorMessage('E-mail ou senha incorretos')
          setLoading(false);
        }, 3000);
        return;
      }

      if(session?.user.defaultRole !== 'escola') {
        await nhost.auth.signOut();
        setTimeout(() => {
          incorrectRole();
          setErrorMessage('Seu login não é realizado nessa tela')
          setLoading(false);
        }, 3000);
        return;
      }

      if (session?.user.defaultRole === 'escola') {
        successLogin();
        return;
      }
    } catch(e) {
      console.log('Algo deu errado', e);
      errorAuth();
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }

  // Toast (Cartão Mensagens)
  const toast = useRef<Toast>(null);

  const incorrectLogin = () => {
    toast.current?.show({
      severity: 'warn',
      summary: 'Login Incorreto',
      detail: 'E-mail ou senha estão incorretos!',
      life: 3000,
    });
  }

  const incorrectRole = () => {
    toast.current?.show({
      severity: 'warn',
      summary: 'Seu acesso não é válido',
      detail: 'O seu tipo de acesso não é válido nesse login.',
      life: 3000,
    });
  }

  const successLogin = () => {
    toast.current?.show({
      severity: 'success',
      summary: 'Login Realizado com Sucesso',
      detail: 'Aguarde o redirecionamento.',
      life: 3000,
    });
  }

  const errorAuth = () => {
    toast.current?.show({
      severity: 'error',
      summary: 'Algo deu errado',
      detail: 'Aguarde um momento e tente novamente, se o erro persistir contate o suporte.',
      life: 3000,
    });
  }

  return (
    <Form
      onSubmit={handleChange}
      schema={loginSchema}
    >
      <Toast ref={toast} />
      <div className="space-y-5 w-full">
        <TextField 
          label="E-mail"
          name="email"
          typeField="text"
          placeholder="Digite seu e-mail"
          icon="/svg/email.svg"
          disabledField={ loading }
          messageField={ errorMessage }
        />
        <TextField 
          label="Senha"
          name="password"
          typeField="password"
          placeholder="Digite sua senha"
          icon="/svg/password.svg"
          disabledField={ loading }
          messageField={ errorMessage }
        />
        <div className="w-full flex flex-col space-y-5">
          <div className="w-full flex flex-col space-y-3">
            <div className="space-y-2">
              <div className="flex flex-row justify-between w-full">
                <div>
                  <label className="space-x-2">
                    <input
                      type="checkbox"
                      name="lembrarAcesso"
                      value="yes"
                      className="form-checkbox"
                    />
                    <span>Lembrar Acesso</span>
                  </label>
                </div>
                <div className="">
                  <span className="text-blue-500 hover:underline cursor-pointer">
                    Esqueceu seu e-mail ?
                  </span>
                </div>
              </div>
              <div className="w-full">
                <p className="text-xl">
                  Não tem conta ? <span className="text-blue-500 hover:underline text-base cursor-pointer">
                    Cadastre sua escola
                    </span>
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                disabled={ loading }
                className="px-4 py-1 min-w-[200px] h-[35px] bg-slate-500 rounded-lg text-white text-lg font-semibold hover:bg-slate-500/90 duration-200 flex justify-center items-center"
              >
                { loading ? <LoaderLogin /> : 'Login' }
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </Form>
  );
}