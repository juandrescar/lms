import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import BookDetailPage from "./pages/BookDetailPage";
import './App.css'
import DashboardLayout from './components/DashboardLayout';

import { useAuth } from "./context/AuthContext";
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import BookForm from "./pages/BookForm";
import UserList from "./pages/users/UserList";
import UserForm from "./components/users/UserForm";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/create" element={<BookForm />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
        <Route
            index
            element={user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/create" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

