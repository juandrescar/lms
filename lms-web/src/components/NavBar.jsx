import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="flex gap-6">
        <Link to="/books" className="hover:underline">📚 Libros</Link>
        {user?.role === "admin" && (
          <Link to="/users" className="hover:underline">👤 Usuarios</Link>
        )}
      </div>

      <div className="flex gap-4 items-center">
        {user && <span className="text-sm">Hola, {user.name}</span>}
        {user ? (
          <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded text-white">
            Cerrar sesión
          </button>
        ) : (
          <Link to="/login" className="bg-blue-600 px-3 py-1 rounded text-white">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
}