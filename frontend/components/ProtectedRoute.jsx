import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LOGIN_ROUTE } from "../routes";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f7f9]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0f756b] border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate replace to={LOGIN_ROUTE} />;
  }

  return <Outlet />;
}
