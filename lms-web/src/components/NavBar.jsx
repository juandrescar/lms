import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react"

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const handleMenuToggle = () => setMenuOpen((open) => !open);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-text-inverted shadow-md px-4 py-2 flex items-center justify-between" >
    
      <div className="text-xl font-bold text-secondary mr-8">
        <Link to="/dashboard">LSM</Link>
      </div>

      <div className="hidden md:flex gap-4">
        <Link to="/books" className="text-sm font-medium text-inverted hover:text-secondary">Libros</Link>
        {user?.role === "user" && (
          <Link to="/my-borrowings" className="text-sm font-medium text-inverted hover:text-secondary">Mis Préstamos</Link>
        )}
        {user?.role === "admin" && (
          <Link to="/users" className="text-sm font-medium text-inverted hover:text-secondary">Usuarios</Link>
        )}
      </div>

      <div className="flex-grow" />

      {/* Menú hamburguesa para móviles */}
      <div className="md:hidden">
        <button className="text-secondary bg-primary focus:outline-none"
          onClick={handleMenuToggle}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="hidden md:flex gap-6 items-center">
        {user && <span className="text-sm">Hola, {user.name}</span>}
        {user ? (
          <button onClick={handleLogout} className="bg-secondary px-3 py-1 rounded text-white">
            Cerrar sesión
          </button>
        ) : (
          <Link to="/login" className="px-3 py-1 rounded text-text-inverted bg-secondary hover:bg-secondary-hover">
            Iniciar sesión
          </Link>
        )}
      </div>
      {/* Menú desplegable móvil */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-primary shadow-md flex flex-col items-start px-4 py-2 md:hidden animate-fade-in z-50">
          <Link to="/books" className="py-2 w-full text-sm font-medium text-inverted hover:text-secondary" onClick={handleLinkClick}>Libros</Link>
          {user?.role === "user" && (
            <Link to="/my-borrowings" className="py-2 w-full text-sm font-medium text-inverted hover:text-secondary" onClick={handleLinkClick}>Mis Préstamos</Link>
          )}
          {user?.role === "admin" && (
            <Link to="/users" className="py-2 w-full text-sm font-medium text-inverted hover:text-secondary" onClick={handleLinkClick}>Usuarios</Link>
          )}
          <div className="border-t border-secondary my-2 w-full" />
          <div className="flex flex-col items-center w-full">
            {user && <span className="py-2 text-sm">Hola, {user.name}</span>}
            {user ? (
              <button onClick={handleLogout} className="bg-secondary px-3 py-1 rounded text-white text-left">
                Cerrar sesión
              </button>
            ) : (
              <Link to="/login" className="px-3 py-1 rounded text-text-inverted bg-secondary hover:bg-secondary-hover text-left" onClick={handleLinkClick}>
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}