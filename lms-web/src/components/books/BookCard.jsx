import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="p-4 border rounded shadow bg-background hover:shadow-lg transition max-h-[200px]">
      <h2 className="text-lg font-semibold">{book.title}</h2>
      <p>{book.author}</p>
      <p className="text-sm text-text-muted">ISBN: {book.ISBN}</p>
      <p className="text-sm text-text-muted">
        {book.available ? "Disponible" : "No disponible"}
      </p>
      <Link
        to={`/books/${book.id}`}
        className="text-primary hover:text-primary-hover mt-2 block"
      >
        Ver más
      </Link>
    </div>
  );
}