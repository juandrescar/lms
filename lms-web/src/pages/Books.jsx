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
        <div className="p-6 bg-surface rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-primary">Lista de Libros</h1>
                {user?.role === "admin" && (
                <button
                    className="btn bg-primary text-text-inverted hover:bg-primary-hover"
                    onClick={() => navigate("/books/create")}
                >
                    Agregar libro
                </button>
                )}
            </div>

            <div className="sticky top-16 z-30 pb-4">
                <h2 className="text-2xl font-bold mb-2">Lista de Libros</h2>
                <SearchBar onSearch={handleSearch} />
                <BookList books={books} />
            </div>
        </div>
    );
}
