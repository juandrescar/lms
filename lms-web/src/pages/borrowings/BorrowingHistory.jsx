import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";
import { getHistory } from "../../services/borrowingService";
import { useParams } from "react-router-dom";

export default function BorrowingHistory() {
    const { user } = useAuth();
    const { id } = useParams();
    const [history, setHistory] = useState([]);

    const userId = id || user.id;

    useEffect(() => {
        if (!user) return;

        getHistory(userId)
        .then((res) => setHistory(res.data))
        .catch((err) => console.error("Error cargando historial:", err));
    }, [user?.id]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Historial de préstamos</h1>
            <ul className="space-y-4">
                {history.map(({ id, book, borrowed_at, returned_at }) => (
                <li key={id} className="border p-4 rounded">
                    <h2 className="font-semibold">{book.title}</h2>
                    <p>Prestado: {dayjs(borrowed_at).format("DD/MM/YYYY")}</p>
                    <p>Devuelto: {returned_at ? dayjs(returned_at).format("DD/MM/YYYY") : "No devuelto"}</p>
                </li>
                ))}
                {history.length === 0 && (
                <p className="text-gray-500">No tienes historial de préstamos.</p>
                )}
            </ul>
        </div>
    );
}
