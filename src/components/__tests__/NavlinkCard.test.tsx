import { render, screen } from '@testing-library/react';
import { NavLinkCard } from '../layout/NavLinkCard';
import { MemoryRouter } from 'react-router-dom';
import { expect, it } from 'vitest';

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
