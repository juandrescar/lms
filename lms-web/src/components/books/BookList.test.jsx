import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookList from "../../components/books/BookList";

const mockBooks = [
  {
    id: 1,
    title: "Cien Años de Soledad",
    author: "Gabriel García Márquez",
    ISBN: "123456789",
    available: true,
  },
  {
    id: 2,
    title: "El Principito",
    author: "Antoine de Saint-Exupéry",
    ISBN: "987654321",
    available: false,
  },
];

describe("BookList", () => {
  it("renderiza correctamente los libros", () => {
    render(
        <MemoryRouter>  
            <BookList books={mockBooks} />
        </MemoryRouter>
    );
    expect(screen.getByText("Cien Años de Soledad")).toBeInTheDocument();
    expect(screen.getByText("El Principito")).toBeInTheDocument();
    expect(screen.getByText("Disponible")).toBeInTheDocument();
    expect(screen.getByText("No disponible")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay libros", () => {
    render(
        <MemoryRouter>  
            <BookList books={[]} />
        </MemoryRouter>
    );
    expect(
      screen.getByText("No hay libros disponibles.")
    ).toBeInTheDocument();
  });
});