import { RouterProvider } from 'react-router-dom';
import { router } from './lib';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from './pages';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './lib/apolloClient';
import { FormProvider, useForm } from 'react-hook-form';
import { newTaskDataSchema, type NewTaskData } from './schema/schemaNewTask';
import { zodResolver } from '@hookform/resolvers/zod';
import { UsersProvider } from './contexts/UsersContext';
import { EditTaskModalProvider } from './contexts/EditTaskModalContext';

export const TodoManagerApp = () => {
  const methods = useForm<NewTaskData>({
    mode: 'onTouched',
    resolver: zodResolver(newTaskDataSchema),
  });

  return (
    <ErrorBoundary
      fallbackRender={({ error }: { error: Error }) => (
        <ErrorPage error={error.message} />
      )}
    >
      <ApolloProvider client={apolloClient}>
        <EditTaskModalProvider>
          <UsersProvider>
            <FormProvider {...methods}>
              <RouterProvider router={router} />
            </FormProvider>
          </UsersProvider>
        </EditTaskModalProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
};
