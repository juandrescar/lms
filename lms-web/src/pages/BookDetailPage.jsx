import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../services/api";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`/books/${id}`).then((res) => setBook(res.data));
  }, [id]);

  if (!book) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
      <p>Autor: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Año: {book.publication_year}</p>
      <p>
        Estado:{" "}
        {book.available ? (
          <span className="text-green-600">Disponible</span>
        ) : (
          <span className="text-red-600">Prestado</span>
        )}
      </p>
    </div>
  );
}