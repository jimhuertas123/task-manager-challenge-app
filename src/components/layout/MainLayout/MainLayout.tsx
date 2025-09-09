import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
