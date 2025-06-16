import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import BookDetailPage from "./BookDetailPage";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";

let userMock = { id: 1, role: "admin", name: "Admin" };

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: userMock }),
}));

vi.mock("../../services/bookService", () => ({
  getBook: vi.fn(),
  getBorrowed: vi.fn(),
}));

vi.mock("../../services/userService", () => ({
  getUsers: vi.fn(),
}));

import { getBook, getBorrowed } from "../../services/bookService";
import { getUsers } from "../../services/userService";

const mockBook = {
  id: 1,
  title: "Libro de prueba",
  author: "Autor",
  ISBN: "1234567890",
  publication_year: 2020,
  available: false,
};

const borrowedUser = {
  id: 2,
  name: "Juan",
  email: "user@example.com",
};

describe("BookDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra 'Cargando...' mientras se carga el libro", async () => {
    getBook.mockReturnValue(new Promise(() => {})); // nunca resuelve

    render(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("muestra detalles del libro correctamente", async () => {
    getBook.mockResolvedValue({ data: { ...mockBook, available: true } });
    getUsers.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Libro de prueba/i)).toBeInTheDocument();
      expect(screen.getByText(/Autor/i)).toBeInTheDocument();
      expect(screen.getByText(/Disponible/i)).toBeInTheDocument();
    });
  });

  it("muestra prestatario si el libro está prestado", async () => {
    getBook.mockResolvedValue({ data: { ...mockBook, available: false } });
    getBorrowed.mockResolvedValue({ data: { user: borrowedUser } });
    getUsers.mockResolvedValue({ data: [borrowedUser] });

    render(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByText(/Prestado a:/i)).toBeInTheDocument();
        expect(screen.getByText(/Juan/i)).toBeInTheDocument();
        expect(screen.getByText(/user@example.com/i)).toBeInTheDocument();
    });
  });

  it("muestra formulario de préstamo si es admin y libro está disponible", async () => {
    getBook.mockResolvedValue({ data: { ...mockBook, available: true } });
    getUsers.mockResolvedValue({ data: [borrowedUser] });

    render(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Prestar libro/i)).toBeInTheDocument(); // texto de formulario préstamo
    });
  });

  it("no muestra formulario de préstamo si usuario no es admin", async () => {
    userMock = { id: 3, role: "user" };

    getBook.mockResolvedValue({ data: { ...mockBook, available: true } });
    getUsers.mockResolvedValue({ data: [borrowedUser] });

    render(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Prestar libro/i)).not.toBeInTheDocument();
    });
  });
});
