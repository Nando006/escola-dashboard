import { useAuthenticated, useUserData } from "@nhost/react";
import { Outlet, useNavigate } from "react-router-dom";
import { IPrivateRoute } from "../../src/utils/interfaces/IPrivateRoute";
import { useEffect } from "react";
import { nhost } from "../../server/nhost/nhost";

export default function PrivateRoute({
  requiredRole,
  redirectFromLogin = false,
  redirectFromSchool = false,
  redirectFromLoginAdmin = false,
  redirectFromAdmin = false
}: IPrivateRoute) {
  const isAuthenticated = useAuthenticated();
  const user = useUserData();
  const navigate = useNavigate();

  const invalidAuthenticatedSchool = async () => {
    if(!isAuthenticated || user?.defaultRole !== requiredRole) {
      navigate("/login/auth", { replace: true });
      if(isAuthenticated) {
        await nhost.auth.signOut();
        console.log("Você foi deslogado pois o seu tipo de usuário não atende os requisitos.");
      }
    }
  }

  const authenticatedSchool = () => {
    if(isAuthenticated && user?.defaultRole === requiredRole) {
      navigate("/escola/dashboard", { replace: true });
    }
  }

  const invalidAuthenticatedAdmin = async () => {
    if(!isAuthenticated || user?.defaultRole !== requiredRole) {
      navigate("/admin/loginAdmin", { replace: true });
      if(isAuthenticated) {
        await nhost.auth.signOut();
        console.log("Você foi deslogado pois o seu tipo de usuário não atende os requisitos.");
      }
    }
  }

  const authenticatedAdmin = () => {
    if(isAuthenticated && user?.defaultRole === requiredRole) {
      console.log("Autenticação Aprovada");
      navigate("/admin/auth/cadastroEscola", { replace: true });
    }
  }

  useEffect(() => {
    if(redirectFromLogin) invalidAuthenticatedSchool();
    if(redirectFromSchool) authenticatedSchool();
    if(redirectFromLoginAdmin) invalidAuthenticatedAdmin();
    if(redirectFromAdmin) authenticatedAdmin();
  }, [isAuthenticated, user, navigate])

  return <Outlet /> // Renderiza a rota protegida
}