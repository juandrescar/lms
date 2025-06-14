import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{book.title}</h2>
      <p>{book.author}</p>
      <p className="text-sm text-gray-500">ISBN: {book.ISBN}</p>
      <p className="text-sm text-gray-500">
        {book.available ? "Disponible" : "No disponible"}
      </p>
      <Link
        to={`/books/${book.id}`}
        className="text-blue-600 hover:underline mt-2 block"
      >
        Ver más
      </Link>
    </div>
  );
}