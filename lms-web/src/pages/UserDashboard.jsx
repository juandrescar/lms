import { useEffect, useState } from "react";
import axios from "../services/api";

export default function UserDashboard() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    axios.get("/users/me/borrowed").then((res) => setBorrowedBooks(res.data));
  }, []);

  return (
    <div>
      {/* <h2 className="text-lg font-semibold mb-4">Mis Libros Prestados</h2>
      <ul className="list-disc pl-5">
        {borrowedBooks.map((book) => (
          <li key={book.id}>
            {book.title} (devuelve antes de {book.due_date})
          </li>
        ))}
      </ul> */}
    </div>
  );
}