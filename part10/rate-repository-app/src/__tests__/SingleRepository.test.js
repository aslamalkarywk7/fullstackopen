import { render, screen } from '@testing-library/react-native';

import { ReviewItem } from '../components/SingleRepository';

describe('SingleRepository', () => {
  describe('ReviewItem', () => {
    it('renders the review information correctly', () => {
      const review = {
        id: 'abc123',
        text: 'Great repository, works as expected',
        rating: 92,
        createdAt: '2024-03-12T10:20:30.000Z',
        repositoryId: 'jaredpalmer.formik',
        user: { id: 'u1', username: 'kalle' },
      };

      render(<ReviewItem review={review} />);

      expect(screen.getByText('92')).toBeTruthy();
      expect(screen.getByText('kalle')).toBeTruthy();
      expect(screen.getByText('12.03.2024')).toBeTruthy();
      expect(
        screen.getByText('Great repository, works as expected')
      ).toBeTruthy();
    });
  });
});