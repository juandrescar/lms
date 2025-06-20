import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(query);
      }}
      className="mb-4"
    >
      <input
        className="border bg-surface p-2 rounded w-full text-text"
        placeholder="Buscar por título, autor o ISBN"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
