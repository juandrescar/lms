import api from "./api";

export const getBooks = () => api.get("/books");

export const getBook = (id) => api.get(`/books/${id}`);

export const createBook = (data) => api.post("/books", data);

export const updateBook = (id, data) => api.put(`/books/${id}`, data);

export const deleteBook = (id) => api.delete(`/books/${id}`);

export const getBorrowed = (id) => api.get(`/books/${id}/borrowed`);

export const searchBooks = (query) => {
  return api.get(`/books/search?q=${encodeURIComponent(query)}`);
};
