import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../services/userService';
import UserTable from '../../components/users/UserTable';
import UserModal from '../../components/users/UserForm';

export default function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  // const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  // const handleEdit = (user) => {
  //   setEditingUser(user);
  //   setShowModal(true);
  // };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-surface rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-primary">Usuarios</h1>
        <button
          onClick={() => navigate('/users/create')}
          className="bg-primary text-text-inverted px-4 py-2 rounded-lg"
        >
          Crear usuario
        </button>
      </div>
      <UserTable users={users} onDelete={handleDelete} />
    </div>
  );
}