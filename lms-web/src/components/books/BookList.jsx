import BookCard from "./BookCard";

export default function BookList({ books }) {
  return (
    <div className="w-full">
      <div className="mx-auto w-full md:min-w-[768px] max-w-6xl px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-h-[400px]">
          {books.length > 0 ? (
            books.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <>
              <div className="invisible h-0"></div>
              <div className="invisible h-0"></div>
              <div className="invisible h-0"></div>

              <div className="col-span-full text-center text-muted py-10">
                No hay libros disponibles.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
