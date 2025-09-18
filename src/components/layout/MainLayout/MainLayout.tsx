import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { PhoneNavBar } from '../PhoneNavBar';
import { SearchTasks } from '@/components/features';

export const MainLayout = () => {
  const isSmallDevice = useMediaQuery('(max-width: 680px)');

  const smallDeviceStyle =
    'flex flex-col bg-neutro-5 min-h-screen pt-4 pl-4 pr-0 sm:pr-4 pb-18 h-full w-full';

  const largeDeviceStyle =
    'grid min-h-screen grid-cols-[232px_1fr] gap-x-8 bg-neutro-5 text-neutro pt-8 pl-8 pb-8 pr-9';

  return (
    <div
      id="main-layout"
      className={isSmallDevice ? smallDeviceStyle : largeDeviceStyle}
    >
      {!isSmallDevice && <NavBar />}
      <main className="grid grid-rows-[64px_1fr] flex-1 w-full gap-y-3.5 sm:gap-y-6 text-neutro-1">
        <SearchTasks />
        <Outlet />
      </main>

      {isSmallDevice && (
        <div className="block fixed bottom-0 left-0 w-full z-2">
          <PhoneNavBar />
        </div>
      )}
    </div>
  );
};
