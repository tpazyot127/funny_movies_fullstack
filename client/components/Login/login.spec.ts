import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Login from './';

describe('Login', () => {
  test('renders login form', () => {
    render(Login);
  
    // Check if the login form elements are rendered
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  test('submits login form with valid email and password', () => {
    // Mock the login function
    const loginMock = jest.fn();
    jest.mock('../../hooks', () => ({
      useUserActions: () => ({ login: loginMock }),
      useTypedSelector: () => ({ loading: false, error: null }),
    }));

    render(<Login />);
  
    // Fill in the email and password fields
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
  
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
  
    // Check if the login function is called with the correct arguments
    expect(loginMock).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  test('does not submit login form with empty email and password if there is an error', () => {
    // Mock the login function and set an error
    const loginMock = jest.fn();
    jest.mock('../../hooks', () => ({
      useUserActions: () => ({ login: loginMock }),
      useTypedSelector: () => ({ loading: false, error: 'Invalid credentials' }),
    }));

    render(<Login />);
  
    // Submit the form with empty email and password
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
  
    // Check if the login function is not called
    expect(loginMock).not.toHaveBeenCalled();
  });
});
