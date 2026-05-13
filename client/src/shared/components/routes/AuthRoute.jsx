import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../store/useAuthStore";

const AuthRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default AuthRoute;
