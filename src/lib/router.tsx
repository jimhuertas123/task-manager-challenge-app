import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/components/layout/MainLayout/MainLayout';
import { DashboardPage, ErrorPage, MyTasksPage, NotFoundPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'mytasks',
        element: <MyTasksPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
