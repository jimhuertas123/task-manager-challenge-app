import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar';

export const MainLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-[232px_1fr] gap-x-8 bg-neutro-5 text-neutro pt-8 pl-8 pb-8">
      <NavBar />
      <main className="grid grid-rows-[64px_1fr] h-full gap-y-6 text-neutro-1">
        <header className="bg-neutro-4 rounded-[24px] text-neutro-2 flex items-center px-6">
          xDD
        </header>
        <Outlet />
      </main>
    </div>
  );
};
