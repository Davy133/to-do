import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute() {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
