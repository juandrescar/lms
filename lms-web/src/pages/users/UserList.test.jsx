import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';
import { BrowserRouter } from 'react-router-dom';
import * as userService from '../../services/userService';

// Mock del servicio
vi.mock('../../services/userService');

describe('UserList', () => {
  const mockUsers = [
    { id: 1, name: 'Juan', email: 'juan@example.com', role: 'admin' },
    { id: 2, name: 'Ana', email: 'ana@example.com', role: 'user' },
  ];

  beforeEach(() => {
    userService.getUsers.mockResolvedValue({ data: mockUsers });
  });

  it('renderiza la lista de usuarios', async () => {
    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Juan')).toBeInTheDocument();
      expect(screen.getByText('Ana')).toBeInTheDocument();
      expect(screen.getAllByText(/Eliminar/)).toHaveLength(2);
    });
  });
});