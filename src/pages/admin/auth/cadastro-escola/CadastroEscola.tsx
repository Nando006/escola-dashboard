import CadastroEscolaFormProvider from "../../../../../components/form/forms/CadastroEscolaForm";
import LogoutButton from "../../../../../components/Logout";

export default function CadastroEscola() {
  return (
    <div className="relative w-screen h-screen p-5 flex justify-center items-center">
      <div className="bg-white rounded-2xl p-8 space-y-8 shadow-2xl shadow-black/30">
        <div className="w-full text-center">
          <span className="text-4xl font-semibold">
            Cadastro de Escola
          </span>
          <p className="text-xs text-neutral-500 font-semibold">
            Faça o cadastro da escola!
          </p>
        </div>
        <CadastroEscolaFormProvider />
      </div>
      <div className="absolute bottom-0 right-0 py-5 px-5">
        <LogoutButton />
      </div>
    </div>
  );
}