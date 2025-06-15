import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getBorrowings } from "../services/borrowingService";
import { useParams } from "react-router-dom";

export default function BorrowedBooks() {
  const { user } = useAuth();
  const { id } = useParams();
  const userId = id || user.id;
  const [borrowings, setBorrowings] = useState([]);

  useEffect(() => {
      if (!user) return;
  
      getBorrowings(userId)
        .then((res) => setBorrowings(res.data))
        .catch((err) => console.error("Error cargando borrowings:", err));
    }, [user?.id]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Libros actualmente prestados</h1>
      <ul className="space-y-4">
        {borrowings.map(({ id, book }) => (
          <li key={id} className="border p-4 rounded shadow-sm">
            <h2 className="font-bold text-lg">{book.title}</h2>
            <p className="text-sm text-gray-600">Autor: {book.author}</p>
          </li>
        ))}
        {borrowings.length === 0 && (
          <p className="text-gray-500">No hay libros prestados actualmente.</p>
        )}
      </ul>
    </div>
  );
}
