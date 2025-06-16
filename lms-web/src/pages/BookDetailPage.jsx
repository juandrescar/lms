import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUsers } from "../services/userService";
import { getBook, getBorrowed } from "../services/bookService";
import BorrowForm from "../components/borrowings/BorrowForm";
import ReturnButton from "../components/borrowings/ReturnButton";

export default function BookDetailPage() {
  const { user } = useAuth();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [book, setBook] = useState(null);
  const [borrowed, setBorrowed] = useState(null);

  useEffect(() => {
    getBook(id).then((res) => setBook(res.data));
  }, [id]);

  useEffect(() => {
    if (!book || !user) return;

    if (user?.role === "admin") {
      getUsers().then((res) => setUsers(res.data));
    }

    if (!book.available) {
        getBorrowed(book.id)
        .then(res => setBorrowed(res.data?.user))
        .catch(err => console.error("Error al obtener prestatario", err));
    }
  }, [id, book, user]);

  useEffect(() => {
    getBook(id).then((res) => setBook(res.data));
  }, [id]);

  if (!book) return <p>Cargando...</p>;

  return (
    <div className="p-6 bg-surface rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-primary">{book.title}</h1>
      <p>Autor: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Año: {book.publication_year}</p>
      <p>
        Estado:{" "}
        {book.available ? (
          <span className="text-secondary">Disponible</span>
        ) : (
          <span className="text-error">Prestado</span>
        )}
      </p>

      {!book.available && borrowed && (
        <div className="mt-2 text-sm text-gray-800">
          Prestado a: <strong>{borrowed.name}</strong> ({borrowed.email})
          <br />
          {user?.role === "admin" && (
            <ReturnButton userId={borrowed.id} bookId={book.id} onSuccess={() => location.reload()} />
          )}
        </div>
      )}

      {user?.role === "admin" && book.available && users.length > 0 ? (
        <BorrowForm book={book} users={users} />
      ) : null}
    </div>
  );
}