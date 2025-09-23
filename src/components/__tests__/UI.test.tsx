import { render, screen } from '@testing-library/react';
import { NavLinkCard } from '../layout/NavLinkCard';
import { MemoryRouter } from 'react-router-dom';
import { SuggestionNavigation } from '../features/SearchTasks/SuggestionNavigation';
import userEvent from '@testing-library/user-event';
import { TagCards } from '../ui/UICardComponents/TagCards';
import { CircleAvatar } from '../ui/UICardComponents/CircleAvatar';
import { expect, it, vi } from 'vitest';

vi.mock('../../hooks/useUsers', () => ({
  useUsers: () => ({
    data: { users: [{ id: '1', fullName: 'User1' }] },
    loading: false,
    error: null,
  }),
}));

it('renders NavLinkCard with title', () => {
  render(
    <MemoryRouter>
      <NavLinkCard icon={() => <span>Icon</span>} to="/" title="Dashboard" />
    </MemoryRouter>
  );
  expect(screen.getByText(/DASHBOARD/i)).toBeInTheDocument();
  expect(screen.getByText(/icon/i)).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  expect(screen.getByRole('link')).toHaveClass('text-neutro-2');
});

it('renders CircleAvatar with correct attributes', () => {
  render(<CircleAvatar userId="1" size={40} />);

  const avatarImg = screen.getByAltText('Avatar of 1');
  expect(avatarImg).toBeInTheDocument();
  expect(avatarImg).toHaveAttribute('width', '40');
  expect(avatarImg).toHaveAttribute('height', '40');
  expect(avatarImg).toHaveAttribute('src', expect.stringContaining('avatar'));
});

import { DueDate } from '../ui/UICardComponents/DueDate';

it('renders DueDate for today', () => {
  render(<DueDate dueDate={new Date()} />);
  expect(screen.getByText(/today/i)).toBeInTheDocument();
});
it('renders DueDate for yesterday', () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  render(<DueDate dueDate={yesterday} />);
  expect(screen.getByText(/yesterday/i)).toBeInTheDocument();
});
it('renders DueDate for specific date', () => {
  render(<DueDate dueDate={'2025-09-12T15:10:05.431Z'} />);
  expect(screen.getByText(/12 Sep, 2025/i)).toBeInTheDocument();
});
it('renders DueDate for specific date using new Date', () => {
  render(<DueDate dueDate={new Date('2025-09-10T16:29:25.722Z')} />);
  expect(screen.getByText(/10 Sep, 2025/i)).toBeInTheDocument();
});

it('renders TagCards with tag', () => {
  render(<TagCards tags={['ANDROID']} />);
  expect(screen.getByText(/android/i)).toBeInTheDocument();
});
it('renders TagCards with tag', () => {
  render(<TagCards tags={[]} />);
  expect(screen.getByTestId('tag-cards-empty')).toBeInTheDocument();
});

it('renders all suggestions', () => {
  render(
    <SuggestionNavigation
      popoverSuggestions={['Task 1', 'Task 2']}
      handleSuggestionClick={() => {}}
    />
  );
  expect(screen.getByText('Task 1')).toBeInTheDocument();
  expect(screen.getByText('Task 2')).toBeInTheDocument();
});

it('calls handler when suggestion is clicked', async () => {
  const onSelect = vi.fn();
  render(
    <SuggestionNavigation
      popoverSuggestions={['Task 1', 'Task 2']}
      handleSuggestionClick={onSelect}
    />
  );
  await userEvent.click(screen.getByText('Task 1'));
  expect(onSelect).toHaveBeenCalledWith('Task 1');
});
it('suggestions have correct styling classes', () => {
  render(
    <SuggestionNavigation
      popoverSuggestions={['Task 1', 'Task 2']}
      handleSuggestionClick={() => {}}
    />
  );
  const suggestion = screen.getByText('Task 1');
  expect(suggestion).toHaveClass(
    'px-4',
    'py-2',
    'hover:bg-neutro-3',
    'cursor-pointer'
  );
});
