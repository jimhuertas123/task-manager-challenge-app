import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, expect, vi } from 'vitest';
import { SuggestionNavigation } from '../features/SearchTasks/SuggestionNavigation';

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
