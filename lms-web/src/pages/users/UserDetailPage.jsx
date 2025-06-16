import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import api from "../services/axios";
import { getUserBorrowingHistory } from "../../services/borrowingService";
import { getUser } from "../../services/userService";
import UserBorrowingHistoryTable from "../../components/borrowings/UserBorrowingHistoryTable";

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getUser(id).then((res) => setUser(res.data));
    getUserBorrowingHistory(id).then(setHistory);
  }, [id]);

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="p-6 bg-surface rounded-lg shadow-md min-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Rol: {user.role}</p>

      <h2 className="text-lg font-semibold mt-8 mb-2">Historial de préstamos</h2>
      <UserBorrowingHistoryTable history={history} userId={user.id} />
    </div>
  );
}
