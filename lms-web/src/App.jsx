import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/books/Books";
import BookDetailPage from "./pages/books/BookDetailPage";
import './App.css'
import DashboardLayout from './components/DashboardLayout';

import { useAuth } from "./context/AuthContext";
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import BookForm from "./pages/books/BookForm";
import UserList from "./pages/users/UserList";
import UserForm from "./components/users/UserForm";
import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import BorrowedBooks from "./pages/borrowings/BorrowedBooks";
import BorrowingHistory from "./pages/borrowings/BorrowingHistory";
import UserDetailPage from "./pages/users/UserDetailPage";

function App() {
  const { user } = useAuth();

  return (
    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
        <Route
            index
            element={user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/books/create" element={<BookForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/create" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserForm />} />
          <Route path="/users/:id/borrowings" element={<BorrowedBooks />} />
          <Route path="/users/:id/borrowings/history" element={<UserDetailPage />} />
        </Route>
        <Route path="/my-borrowings" element={<BorrowedBooks />} />
        <Route path="/my-borrowings/history" element={<BorrowingHistory />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;

