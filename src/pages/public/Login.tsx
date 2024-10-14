import LoginForm from "../../../components/form/forms/LoginForm";

export default function Login() {
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
        <LoginForm />
      </div>
    </div>
  );
}