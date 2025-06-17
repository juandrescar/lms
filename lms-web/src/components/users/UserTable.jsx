import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function UserTable({ users, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleMenuToggle = (userId) => {
    setOpenMenuId(openMenuId === userId ? null : userId);
  };

  return (
    <table className="w-full text-left border">
      <thead>
        <tr className="bg-background text-text">
          <th className="p-2">ID</th>
          <th className="p-2">Nombre</th>
          <th className="p-2">Email</th>
          <th className="p-2">Rol</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="border-t">
            <td className="p-2">{user.id}</td>
            <td className="p-2">{user.name}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.role}</td>
            <td className="p-2 space-x-2">
               {/* Desktop: botones texto */}
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                  className="text-text-inverted bg-success hover:bg-success-hover px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => navigate(`/users/${user.id}/borrowings/history`)}
                  className="text-text-inverted bg-secondary hover:bg-secondary px-3 py-1 rounded"
                >
                  Historial
                </button>
                <button 
                  onClick={() => onDelete(user.id)}
                  className="text-text-inverted bg-error hover:bg-error-hover px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
              {/* Mobile: menú de 3 puntos */}
              <div className="md:hidden relative">
                <button
                  onClick={() => handleMenuToggle(user.id)}
                  className="p-2 rounded bg-background hover:bg-surface focus:outline-none focus:ring-1 focus:ring-surface"
                  aria-label="Abrir menú de acciones"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="5" r="1.5"/>
                    <circle cx="12" cy="12" r="1.5"/>
                    <circle cx="12" cy="19" r="1.5"/>
                  </svg>
                </button>
                {openMenuId === user.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-background border shadow-lg z-10">
                    <button
                      onClick={() => { navigate(`/users/edit/${user.id}`); setOpenMenuId(null); }}
                      className="flex items-center w-full px-3 py-2 bg-background hover:bg-surface text-sm rounded-none"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => { navigate(`/users/${user.id}/borrowings/history`); setOpenMenuId(null); }}
                      className="flex items-center w-full px-3 py-2 bg-background hover:bg-surface text-sm rounded-none"
                    >
                      Historial
                    </button>
                    <button
                      onClick={() => { onDelete(user.id); setOpenMenuId(null); }}
                      className="flex items-center w-full px-3 py-2 bg-background hover:bg-surface text-sm rounded-none"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}