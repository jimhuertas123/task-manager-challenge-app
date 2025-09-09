import { RouterProvider } from 'react-router-dom';
import { router } from './lib';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from './pages';

export const TodoManagerApp = () => {
  return (
    <ErrorBoundary
      fallback={<ErrorPage />}
      //   onError={(error, errorInfo) => {
      //     console.error('Error caught by boundary:', error, errorInfo);
      //   }}
      //   onReset={() => {
      //     // Reset app state, clear cache, etc.
      //   }}
    >
      {/* <ApolloProvider> */}
      <RouterProvider router={router} />
      {/* </ApolloProvider> */}
    </ErrorBoundary>
  );
};
