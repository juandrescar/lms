import BookCard from "./BookCard";

export default function BookList({ books }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
