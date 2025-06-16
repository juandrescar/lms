import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getBorrowings, getHistory } from "../../services/borrowingService";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import UserBorrowedHistoryTable from "../../components/borrowings/UserBorrowedHistoryTable";

export default function BorrowedBooks() {
  const { user } = useAuth();
  const { id } = useParams();
  const userId = id || user.id;
  const [borrowings, setBorrowings] = useState([]);

  useEffect(() => {
      if (!user) return;
  
      getHistory(userId)
        .then((res) => setBorrowings(res.data))
        .catch((err) => console.error("Error cargando borrowings:", err));
    }, [user?.id]);

  return (
    <div className="p-4 bg-surface rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Libros actualmente prestados</h1>
      <UserBorrowedHistoryTable history={borrowings} userId={user.id} />
    </div>
  );
}
