import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavBar } from '../layout/NavBar';

describe('NavBar', () => {
  it('renders dashboard and my task links', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/my task/i)).toBeInTheDocument();
  });
});
