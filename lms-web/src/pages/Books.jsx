import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";
import { getBooks, searchBooks } from "../services/bookService";

export default function Books() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        getBooks().then(res => setBooks(res.data));
    }, []);

    const handleSearch = async (query) => {
        if (!query.trim()) {
            const res = await getBooks();
            setBooks(res.data);
        } else {
            const res = await searchBooks(query);
            setBooks(res.data);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Lista de Libros</h1>
                <p>{user.role}</p>
                {user?.role === "admin" && (
                <button
                    className="btn bg-green-600 text-white"
                    onClick={() => navigate("/books/create")}
                >
                    ➕ Agregar libro
                </button>
                )}
            </div>
            <h1 className="text-2xl font-bold mb-4">Lista de Libros</h1>
            <SearchBar onSearch={handleSearch} />
            <BookList books={books} />
        </div>
    );
}
