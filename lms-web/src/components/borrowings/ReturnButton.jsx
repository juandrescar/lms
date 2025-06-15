import { returnBook } from "../../services/borrowingService";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function ReturnButton({ userId, bookId, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleReturn = async () => {
    setLoading(true);
    try {
      await returnBook(userId, bookId);
      toast.success("Libro marcado como devuelto");
      onSuccess?.();
    } catch (err) {
      toast.error(err.response?.data?.error || "Error al devolver libro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReturn}
      disabled={loading}
      className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Devolver libro
    </button>
  );
}
