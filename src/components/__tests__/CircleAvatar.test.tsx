import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CircleAvatar } from '../ui/UICardComponents/CircleAvatar';

vi.mock('../../hooks/useUsers', () => ({
  useUsers: () => ({
    data: { users: [{ id: '1', fullName: 'User1' }] },
    loading: false,
    error: null,
  }),
}));

it('renders CircleAvatar with correct attributes', () => {
  const userTest = { id: '1', fullName: 'User1' };

  render(<CircleAvatar userId={userTest.id} size={40} />);

  const avatarImg = screen.getByAltText(`Avatar of ${userTest.fullName}`);
  expect(avatarImg).toBeInTheDocument();
  expect(avatarImg).toHaveAttribute('width', '40');
  expect(avatarImg).toHaveAttribute('height', '40');
  expect(avatarImg).toHaveAttribute('src', expect.stringContaining('avatar'));
});
