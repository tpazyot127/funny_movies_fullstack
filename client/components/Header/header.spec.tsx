import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Header from '../Header';
import { useTypedSelector, useUserActions } from '../../hooks';

jest.mock('../../hooks', () => ({
  useTypedSelector: jest.fn(),
  useUserActions: jest.fn(),
}));

describe('Header', () => {

  jest.mock('../../hooks', () => ({
    useTypedSelector: jest.fn(),
    useUserActions: jest.fn(),
  }));

  describe('Header', () => {
    const mockUseTypedSelector = useTypedSelector as any;
    const mockUseUserActions = useUserActions as any;

    test('renders the component', async () => {
      mockUseTypedSelector.mockReturnValue({ data: null });
      mockUseUserActions.mockReturnValue({ logout: jest.fn() });
      await act(async () => {
        render(<Header />);
      });

      expect(screen.getByText('Funny Movies')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Share videos')).toBeInTheDocument();
      expect(screen.getByText('Sign In')).toBeInTheDocument();
    });
  });

  test('renders the component with user data', async () => {
    (useTypedSelector as jest.Mock).mockReturnValue({ data: { name: 'John Doe', isAdmin: false } });
    const mockLogout = jest.fn();
    (useTypedSelector as jest.Mock).mockReturnValue({ data: { name: 'John Doe', isAdmin: false } });

    await act(async () => {
      render(<Header />);
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Logout'));

    expect(mockLogout).toHaveBeenCalled();
  });

  test('renders the component with admin data', async () => {
    (useTypedSelector as jest.Mock).mockReturnValue({ data: { name: 'John Doe', isAdmin: false } });
    (useUserActions as jest.Mock).mockReturnValue({ logout: jest.fn() });

    await act(async () => {
      render(<Header />);
    });

    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
  });
});