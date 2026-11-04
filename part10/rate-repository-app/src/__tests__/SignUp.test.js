import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import SignUp from '../components/SignUp';
import useSignIn from '../hooks/useSignIn';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn(),
}));

jest.mock('react-router-native', () => ({
  ...jest.requireActual('react-router-native'),
  useNavigate: jest.fn(),
}));

jest.mock('../hooks/useSignIn', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('SignUp', () => {
  it('creates the user, signs in and navigates to the repository list', async () => {
    const createUser = jest.fn().mockResolvedValue({
      data: { createUser: { id: 'u1', username: 'newuser' } },
    });
    const signIn = jest.fn().mockResolvedValue({});
    const navigate = jest.fn();

    useMutation.mockReturnValue([createUser]);
    useNavigate.mockReturnValue(navigate);
    useSignIn.mockReturnValue([signIn]);

    render(<SignUp />);

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'newuser');
    fireEvent.changeText(screen.getByPlaceholderText(/^Password$/), 'password');
    fireEvent.changeText(
      screen.getByPlaceholderText('Password confirmation'),
      'password'
    );

    fireEvent.press(screen.getByText('Sign up'));

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith({
        variables: { user: { username: 'newuser', password: 'password' } },
      });
    });

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        username: 'newuser',
        password: 'password',
      });
    });

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/');
    });
  });

  it('shows a validation error when the passwords do not match', async () => {
    useMutation.mockReturnValue([jest.fn()]);
    useNavigate.mockReturnValue(jest.fn());
    useSignIn.mockReturnValue([jest.fn()]);

    render(<SignUp />);

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'newuser');
    fireEvent.changeText(screen.getByPlaceholderText(/^Password$/), 'password');
    fireEvent.changeText(
      screen.getByPlaceholderText('Password confirmation'),
      'different'
    );

    fireEvent.press(screen.getByText('Sign up'));

    await waitFor(() => {
      expect(screen.getByText('Passwords must match')).toBeTruthy();
    });
  });
});