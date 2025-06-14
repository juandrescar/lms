import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Bienvenido, {user.name} ({user.role})
      </h1>
      <Outlet />
    </div>
  );
}