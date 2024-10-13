import Form from "../../../components/form/Form";
import LoginForm from "../../../components/form/forms/LoginForm";
import { loginSchema } from "../../../components/form/schemas/LoginSchema";

export default function Login() {
  const handleChange = (data: any) => {
    console.log('data', data);
  }

  return (
    <div 
      className="absolute w-full h-full flex justify-center items-center"
    >
      <div className="bg-white rounded-2xl p-8 space-y-8 shadow-2xl shadow-black/30 w-[400px]">
        <div className="w-full text-center">
          <span className="font-bold text-4xl">
            Bem vindo(a) a Escola
          </span>
          <p className="text-neutral-400">
            Faça login para acessar o sistema da escola
          </p>
        </div>
        <Form
          onSubmit={handleChange}
          schema={loginSchema}
        >
          <div className="space-y-5">
            <LoginForm />
            <div className="w-full flex flex-col space-y-5">
              <div className="w-full flex flex-col">
                <label className="space-x-2">
                  <input
                    type="radio"
                    name="lembrarAcesso"
                    value="yes"
                    className="form-radio"
                  />
                  <span>Lembrar Acesso</span>
                </label>
                <div className="w-full flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1 min-w-[200px] bg-slate-500 rounded-xl text-white font-semibold hover:bg-slate-500/90 duration-200"
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="text-center w-full font-bold">
                <span className="hover:underline cursor-pointer">
                  Esqueceu seu e-mail ?
                </span>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}