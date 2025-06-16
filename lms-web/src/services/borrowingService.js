import api from "./api";

export const getBorrowings = (id) => api.get(`/users/${id}/borrowings`);

export const getHistory = (id) => api.get(`/users/${id}/borrowings/history`);

export const borrowBook = async (userId, bookId) => {
  const res = await api.post(`/users/${userId}/borrowings`, { book_id: bookId });
  return res.data;
};

export const returnBook = async (userId, bookId) => {
  const res = await api.delete(`/users/${userId}/borrowings/${bookId}`);
  return res.data;
};

export const getUserBorrowingHistory = async (userId) => {
  const res = await api.get(`/users/${userId}/borrowings/history`);
  return res.data;
};