import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import BorrowingHistory from "./BorrowingHistory";

// Mocks
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: { id: 1, name: "Juan" } }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({}),
  };
});

vi.mock("../../services/borrowingService", () => ({
  getHistory: vi.fn(),
}));

import { getHistory } from "../../services/borrowingService";

describe("BorrowingHistory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra el historial si hay datos", async () => {
    getHistory.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          book: { title: "El Quijote" },
          borrowed_at: "2024-01-01",
          returned_at: "2024-01-10",
        },
      ],
    });

    render(<BorrowingHistory />);

    expect(getHistory).toHaveBeenCalledWith(1);

    await waitFor(() => {
      expect(screen.getByText("El Quijote")).toBeInTheDocument();
      expect(screen.getByText("Prestado: 01/01/2024")).toBeInTheDocument();
      expect(screen.getByText("Devuelto: 10/01/2024")).toBeInTheDocument();
    });
  });

  it("muestra mensaje si no hay historial", async () => {
    getHistory.mockResolvedValueOnce({ data: [] });

    render(<BorrowingHistory />);

    await waitFor(() => {
      expect(screen.getByText("No tienes historial de préstamos.")).toBeInTheDocument();
    });
  });
});
