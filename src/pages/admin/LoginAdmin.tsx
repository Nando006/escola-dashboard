import LoginAdminForm from "../../../components/form/forms/LoginAdminForm";

export default function LoginAdmin() {
  return (
    <div 
      className="absolute w-full h-full flex justify-center items-center"
    >
      <div className="bg-white rounded-2xl p-8 space-y-8 shadow-2xl shadow-black/30">
        <div className="space-y-2">
          <div className="flex justify-end items-center">
            <a
              href="/login/auth"
              className="text-xs font-semibold px-4 py-1 bg-slate-500 text-white rounded-lg shadow-md cursor-pointer hover:bg-slate-600 duration-300"
            >
              Login Escola
            </a>
          </div>
          <div className="w-full text-center">
            <span className="font-bold text-4xl">
              Bem vindo(a) ao Admin
            </span>
            <p className="text-neutral-400">
              Faça login para acessar o sistema do admin
            </p>
          </div>
        </div>
        <LoginAdminForm />
      </div>
    </div>
  );
}