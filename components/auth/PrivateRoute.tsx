import { useAuthenticated, useUserData } from "@nhost/react";
import { Outlet, useNavigate } from "react-router-dom";
import { IPrivateRoute } from "../../src/utils/interfaces/IPrivateRoute";
import { useEffect } from "react";
import { nhost } from "../../server/nhost/nhost";

export default function PrivateRoute({
  requiredRole
}: IPrivateRoute) {
  const isAuthenticated = useAuthenticated();
  const user = useUserData();
  const navigate = useNavigate();

  const invalidAuthenticated = async () => {
    if(!isAuthenticated || user?.defaultRole !== requiredRole) {
      navigate("/", { replace: true });
      if(isAuthenticated) {
        await nhost.auth.signOut();
        console.log("Você foi deslogado pois o seu tipo de usuário não atende os requisitos.");
      }
    }
  }

  const authenticated = () => {
    if(isAuthenticated && user?.defaultRole === requiredRole) {
      navigate("/escola/dashboard", { replace: true });
    }
  }

  useEffect(() => {
    invalidAuthenticated();
    authenticated();
  }, [isAuthenticated, user, navigate])

  return <Outlet /> // Renderiza a rota protegida
}