import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Panel de Administración</h2>
      <div className="flex gap-4">
        <Link to="/books" className="btn">📚 Gestionar Libros</Link>
        <Link to="/users" className="btn">👤 Gestionar Usuarios</Link>
      </div>
    </div>
  );
}