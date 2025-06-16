import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, updateUser, getUsers } from '../../services/userService';

export default function UserForm() {
  const [form, setForm] = useState({ name: '', email: '', role: 'user', password: '' });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getUsers().then(res => {
        const user = res.data.find(u => u.id === parseInt(id));
        if (user) {
          setForm({ ...user, password: '' });
        }
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      if (id) {
        await updateUser(id, form);
      } else {
        await createUser(form);
      }
      navigate('/users');
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      }
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-surface rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Editar usuario' : 'Crear usuario'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full border p-2 rounded bg-background"
          />
          {errors.name && <p className="text-error text-sm">{errors.name[0]}</p>}
        </div>
        <div>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 rounded bg-background"
          />
          {errors.email && <p className="text-error text-sm">{errors.email[0]}</p>}
        </div>
        <div>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role"
            className="w-full border p-2 rounded bg-background"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        {!id && (
          <div>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full border p-2 rounded bg-background"
            />
            {errors.password && <p className="text-error text-sm">{errors.password[0]}</p>}
          </div>
        )}
        <div className="flex gap-4">
          <button type="submit" className="btn bg-primary text-text-inverted px-4 py-2">
            {id ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/users')}
            className="bg-error text-text-inverted hover:bg-error-hover px-4 py-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}