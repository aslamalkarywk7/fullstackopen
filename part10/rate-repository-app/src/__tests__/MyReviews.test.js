import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import MyReviews from '../components/MyReviews';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock('react-router-native', () => ({
  ...jest.requireActual('react-router-native'),
  useNavigate: jest.fn(),
}));

const reviews = [
  {
    id: 'kalle.jaredpalmer.formik',
    text: 'Nice library',
    rating: 90,
    createdAt: '2024-01-01T00:00:00.000Z',
    repositoryId: 'jaredpalmer.formik',
    user: { id: 'u1', username: 'kalle' },
  },
];

const mockData = {
  me: {
    id: 'u1',
    username: 'kalle',
    reviews: {
      edges: reviews.map((node) => ({ node })),
    },
  },
};

describe('MyReviews', () => {
  it('lists the signed in user reviews', () => {
    useQuery.mockReturnValue({ data: mockData, loading: false, refetch: jest.fn() });
    useMutation.mockReturnValue([jest.fn()]);
    useNavigate.mockReturnValue(jest.fn());

    render(<MyReviews />);

    expect(screen.getByText('Nice library')).toBeTruthy();
    expect(screen.getByText('kalle')).toBeTruthy();
  });

  it('deletes a review after confirming the dialog', async () => {
    const deleteReview = jest.fn().mockResolvedValue({ data: { deleteReview: true } });
    const refetch = jest.fn();
    const navigate = jest.fn();

    useQuery.mockReturnValue({ data: mockData, loading: false, refetch });
    useMutation.mockReturnValue([deleteReview]);
    useNavigate.mockReturnValue(navigate);

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(
      (title, message, buttons) => {
        // confirm immediately by pressing the destructive button
        const confirmButton = buttons.find((b) => b.style === 'destructive');
        act(() => confirmButton.onPress());
      }
    );

    render(<MyReviews />);

    fireEvent.press(screen.getByText('Delete review'));

    await waitFor(() => {
      expect(deleteReview).toHaveBeenCalledWith({
        variables: { id: 'kalle.jaredpalmer.formik' },
      });
    });

    await waitFor(() => {
      expect(refetch).toHaveBeenCalled();
    });

    alertSpy.mockRestore();
  });

  it('navigates to the repository of a review', () => {
    const navigate = jest.fn();

    useQuery.mockReturnValue({ data: mockData, loading: false, refetch: jest.fn() });
    useMutation.mockReturnValue([jest.fn()]);
    useNavigate.mockReturnValue(navigate);

    render(<MyReviews />);

    fireEvent.press(screen.getByText('View repository'));

    expect(navigate).toHaveBeenCalledWith('/repository/jaredpalmer.formik');
  });
});