import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { TagCards } from '../ui/UICardComponents/TagCards';
import { DueDate } from '../ui/UICardComponents/DueDate';

//tagCards field tests
it('renders TagCards with tag', () => {
  render(<TagCards tags={['ANDROID']} />);
  expect(screen.getByText(/android/i)).toBeInTheDocument();
});
it('renders TagCards with tag', () => {
  render(<TagCards tags={[]} />);
  expect(screen.getByTestId('tag-cards-empty')).toBeInTheDocument();
});

//dueDate field tests
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
