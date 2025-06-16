import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

let userMock = { role: "admin" };

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: userMock }),
}));

import BookForm from "./BookForm";

describe("BookForm", () => {
  beforeEach(() => {
    userMock = { role: "admin" };
  });

  it("muestra el formulario si el usuario es admin", () => {
    render(
      <BrowserRouter>
        <BookForm />
      </BrowserRouter>
    );

    expect(screen.getByText(/Agregar Libro/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Título")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Autor")).toBeInTheDocument();
  });
});
