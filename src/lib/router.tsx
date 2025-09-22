import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/components/layout/MainLayout/MainLayout';
import { DashboardPage, ErrorPage, MyTasksPage, NotFoundPage } from '@/pages';
import { ProfilePage } from '@/pages/Profile/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage error={'Not Found'} />,
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
  {
    path: '/settings',
    element: <ProfilePage />,
  },
]);
