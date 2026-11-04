import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import ReviewForm from '../components/ReviewForm';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn(),
}));

jest.mock('react-router-native', () => ({
  ...jest.requireActual('react-router-native'),
  useNavigate: jest.fn(),
}));

describe('ReviewForm', () => {
  it('calls createReview with the entered values and navigates to the repository', async () => {
    const createReview = jest.fn().mockResolvedValue({
      data: { createReview: { id: 'r1', repositoryId: 'jaredpalmer.formik' } },
    });
    const navigate = jest.fn();

    useMutation.mockReturnValue([createReview]);
    useNavigate.mockReturnValue(navigate);

    render(<ReviewForm />);

    fireEvent.changeText(
      screen.getByPlaceholderText('Repository owner name'),
      'jaredpalmer'
    );
    fireEvent.changeText(
      screen.getByPlaceholderText('Repository name'),
      'formik'
    );
    fireEvent.changeText(
      screen.getByPlaceholderText('Rating between 0 and 100'),
      '88'
    );
    fireEvent.changeText(
      screen.getByPlaceholderText('Review'),
      'Works like a charm'
    );

    fireEvent.press(screen.getByText('Create a review'));

    await waitFor(() => {
      expect(createReview).toHaveBeenCalledTimes(1);
    });

    expect(createReview).toHaveBeenCalledWith({
      variables: {
        review: {
          ownerName: 'jaredpalmer',
          repositoryName: 'formik',
          rating: 88,
          text: 'Works like a charm',
        },
      },
    });

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/repository/jaredpalmer.formik');
    });
  });
});