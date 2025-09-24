import { render, screen, waitFor } from '@testing-library/react';
import { expect, it } from 'vitest';

import { FormProvider, useForm } from 'react-hook-form';
import { TitleLabelField } from '../features/FormNewTask';
import { newTaskDataSchema, type NewTaskData } from '@/schema/schemaNewTask';
import { zodResolver } from '@hookform/resolvers/zod';
import userEvent from '@testing-library/user-event';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<NewTaskData>({
    mode: 'onBlur',
    resolver: zodResolver(newTaskDataSchema),
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

it('shows error message when name is less than 5 characters', async () => {
  render(
    <Wrapper>
      <TitleLabelField />
    </Wrapper>
  );
  await userEvent.click(screen.getByText(/task title/i));
  let input = screen.getByRole('textbox');
  await userEvent.type(input, 'One');
  await userEvent.tab();
  await waitFor(() => {
    expect(screen.getByText(/at least 5 characters/i)).toBeInTheDocument();
  });
  expect(screen.getByText(/at least 5 characters/i)).toBeInTheDocument();
  expect(screen.getByText(/at least 5 characters/i)).toHaveAttribute(
    'id',
    'title-error'
  );
});

it('shows error message when name is greater than 20 characters', async () => {
  render(
    <Wrapper>
      <TitleLabelField />
    </Wrapper>
  );
  await userEvent.click(screen.getByText(/task title/i));
  const input = screen.getByRole('textbox');
  await userEvent.clear(input);
  await userEvent.type(input, 'Ticket for the concert next week');
  await userEvent.tab();
  await waitFor(() => {
    expect(
      screen.getByText(/Title must be at most 20 characters/i)
    ).toBeInTheDocument();
  });
  expect(
    screen.getByText(/Title must be at most 20 characters/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Title must be at most 20 characters/i)
  ).toHaveAttribute('id', 'title-error');
});

it('does not show error message when name is valid', async () => {
  render(
    <Wrapper>
      <TitleLabelField />
    </Wrapper>
  );
  await userEvent.click(screen.getByText(/task title/i));
  const input = screen.getByRole('textbox');
  await userEvent.clear(input);
  await userEvent.type(input, 'Valid Title');
  await userEvent.tab();
  await waitFor(() => {
    expect(
      screen.queryByText(/at least 5 characters/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/at most 20 characters/i)
    ).not.toBeInTheDocument();
  });
});

// it('change estimate option and error when click and unclick the field', async () => {
//   render(
//     <Wrapper>
//       <EstimateField />
//     </Wrapper>
//   );

//   await userEvent.click(screen.getByLabelText('Estimate points'));
//   const button = screen.getByTestId('estimate-option-EIGHT');
//   await userEvent.click(button);
// const option = screen.getByRole('option', { name: '1 hour' });
// await userEvent.click(option);
// expect(screen.getByRole('button')).toHaveTextContent('1 hour');
//   screen.debug();
// });
