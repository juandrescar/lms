import dayjs from "dayjs";
import ReturnButton from "./ReturnButton";

export default function UserBorrowingHistoryTable({ history, userId }) {
  if (!history.length) return <p className="text-text-muted">Este usuario no ha tomado libros aún.</p>;

  return (
    <table className="mt-6 w-full table-auto border-collapse border text-sm">
      <thead>
        <tr className="bg-background text-text">
          <th className="border px-3 py-2 text-left">Libro</th>
          <th className="border px-3 py-2">Prestado</th>
          <th className="border px-3 py-2">Devuelto</th>
        </tr>
      </thead>
      <tbody>
        {history.map((entry) => (
          <tr key={entry.id} className="border-t">
            <td className="border px-3 py-2">{entry.book?.title || "Desconocido"}</td>
            <td className="border px-3 py-2">{dayjs(entry.borrowed_at).format("DD/MM/YYYY")}</td>
            <td className="border px-3 py-2">
              {entry.returned_at
                ? dayjs(entry.returned_at).format("DD/MM/YYYY")
                : <ReturnButton userId={entry.user_id} bookId={entry.book.id} onSuccess={() => location.reload()} />}                
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
