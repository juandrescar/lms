import { useNavigate } from "react-router-dom";
export default function UserTable({ users, onEdit, onDelete }) {
  const navigate = useNavigate();
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}