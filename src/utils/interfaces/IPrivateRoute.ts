export interface IPrivateRoute {
  requiredRole?: string;
  redirectFromLogin?: boolean;
  redirectFromSchool?: boolean;
  redirectFromLoginAdmin?: boolean;
  redirectFromAdmin?: boolean;
}