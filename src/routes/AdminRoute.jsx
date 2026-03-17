import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AdminRoute = () => {
  const { user, authLoading } = useContext(UserContext);

  if (authLoading) return <div className="text-white">Cargando...</div>;

  if (user && user.role === "admin") {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
