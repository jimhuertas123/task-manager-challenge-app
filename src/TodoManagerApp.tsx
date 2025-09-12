import { RouterProvider } from 'react-router-dom';
import { router } from './lib';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from './pages';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './lib/apolloClient';

export const TodoManagerApp = () => {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </ErrorBoundary>
  );
};
