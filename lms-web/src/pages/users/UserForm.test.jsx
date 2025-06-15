import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from './UserForm';
import { BrowserRouter } from 'react-router-dom';
import * as userService from '../../services/userService';

vi.mock('../../services/userService');

describe('UserForm', () => {
  it('crea un nuevo usuario', async () => {
    userService.createUser.mockResolvedValue({});

    render(
      <BrowserRouter>
        <UserForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nombre/), {
      target: { value: 'Nuevo Usuario', name: 'name' },
    });
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: 'nuevo@example.com', name: 'email' },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/), {
      target: { value: '12345678', name: 'password' },
    });

    const crearButton = screen.getByRole('button', { name: /Crear/i });

    fireEvent.click(crearButton);

    await waitFor(() => {
      expect(userService.createUser).toHaveBeenCalledWith({
        name: 'Nuevo Usuario',
        email: 'nuevo@example.com',
        role: 'user',
        password: '12345678',
      });
    });
  });
});