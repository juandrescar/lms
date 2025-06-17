import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Books from "../../pages/books/Books";
import { MemoryRouter } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as bookService from "../../services/bookService";

vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../../services/bookService", () => ({
  getBooks: vi.fn(),
  searchBooks: vi.fn(),
}));

const mockBooks = [
  { id: 1, title: "Libro A", author: "Autor A", ISBN: "123", available: true },
  { id: 2, title: "Libro B", author: "Autor B", ISBN: "456", available: false },
];

describe("Books Page", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ user: { role: "admin" } });
    bookService.getBooks.mockResolvedValue({ data: mockBooks });
  });

  it("renderiza la lista de libros", async () => {
    render(
      <MemoryRouter>
        <Books />
      </MemoryRouter>
    );

    expect(await screen.findByText("Libro A")).toBeInTheDocument();
    expect(screen.getByText("Libro B")).toBeInTheDocument();
  });

  it("muestra el botón 'Agregar libro' si el usuario es admin", async () => {
    render(
      <MemoryRouter>
        <Books />
      </MemoryRouter>
    );

    const addButton = await screen.findByRole("button", { name: /Agregar libro/i });
    expect(addButton).toBeInTheDocument();
  });

  it("no muestra el botón 'Agregar libro' si el usuario no es admin", async () => {
    useAuth.mockReturnValue({ user: { role: "user" } });

    render(
      <MemoryRouter>
        <Books />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /Agregar libro/i })).not.toBeInTheDocument();
    });
  });

  it("realiza búsqueda de libros correctamente", async () => {
    bookService.searchBooks.mockResolvedValueOnce({
      data: [{ id: 3, title: "Libro C", author: "Autor C", ISBN: "789", available: true }],
    });

    render(
      <MemoryRouter>
        <Books />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Buscar/i);
    fireEvent.change(input, { target: { value: "Libro C" } });

    fireEvent.change(input, { target: { value: "Libro A" } });
    fireEvent.submit(input);

    expect(await screen.findByText("Libro C")).toBeInTheDocument();
  });

    it("muestra todos los libros al limpiar la búsqueda", async () => {
        bookService.searchBooks.mockResolvedValueOnce({
        data: [{ id: 3, title: "Libro C", author: "Autor C", ISBN: "789", available: true }],
        });

        render(
        <MemoryRouter>
            <Books />
        </MemoryRouter>
        );

        const input = screen.getByPlaceholderText(/Buscar/i);
        fireEvent.change(input, { target: { value: "Libro C" } });

        // Escribe en el input
        fireEvent.change(input, { target: { value: "Libro A" } });
        fireEvent.submit(input);

        expect(await screen.findByText("Libro C")).toBeInTheDocument();

        // Limpiar búsqueda
        fireEvent.change(input, { target: { value: "" } });
        fireEvent.submit(input);

        expect(await screen.findByText("Libro A")).toBeInTheDocument();
        expect(screen.getByText("Libro B")).toBeInTheDocument();
    });
});