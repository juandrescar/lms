import { useState } from "react";
import { borrowBook } from "../../services/borrowingService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function BorrowForm({ book, users }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBorrow = async () => {
    if (!selectedUser) return toast.error("Selecciona un usuario");

    try {
      setLoading(true);
      await borrowBook(selectedUser, book.id);
      toast.success("Libro prestado con éxito");
      navigate("/books");
    } catch (err) {
      const msg = err.response?.data?.error || "Error al prestar libro";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h2 className="font-semibold mb-2">Prestar este libro</h2>

      <select
        className="border p-2 rounded w-full mb-3"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Selecciona un usuario</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>

      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleBorrow}
        disabled={loading || !book.available}
      >
        {book.available ? "Prestar libro" : "No disponible"}
      </button>
    </div>
  );
}