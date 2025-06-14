import { useNavigate } from "react-router-dom";
export default function UserTable({ users, onEdit, onDelete }) {
  const navigate = useNavigate();
  return (
    <table className="w-full text-left border">
      <thead>
        <tr className="bg-gray-100">
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
                className="text-blue-600"
              >
                Editar
              </button>
              <button onClick={() => onDelete(user.id)} className="text-red-600">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}