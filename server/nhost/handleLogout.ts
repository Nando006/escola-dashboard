import { nhost } from "./nhost";

export const handleLogout = async () => {
  try {
    await nhost.auth.signOut(); // Realiza o logout do usuário
    console.log("Deslogado com sucesso!");
  } catch (error) {
    console.error("Erro ao tentar deslogar:", error);
  };
};