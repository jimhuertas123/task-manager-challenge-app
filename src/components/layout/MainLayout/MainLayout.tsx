import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar';
import { SearchTasks } from '@/components/features/SearchTasks/SearchTasks';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { PhoneNavBar } from '../PhoneNavBar';
import { FormProvider, useForm } from 'react-hook-form';
import { newTaskDataSchema, type NewTaskData } from '@/schema/schemaNewTask';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Toast from '@radix-ui/react-toast';

export const MainLayout = () => {
  const isSmallDevice = useMediaQuery('(max-width: 680px)');

  const smallDeviceStyle =
    'flex flex-col bg-neutro-5 min-h-screen pt-4 pl-4 pr-0 sm:pr-4 pb-18 h-full w-full';

  const largeDeviceStyle =
    'grid min-h-screen grid-cols-[232px_1fr] gap-x-8 bg-neutro-5 text-neutro pt-8 pl-8 pb-8 pr-9';

  const methods = useForm<NewTaskData>({
    mode: 'onTouched',
    resolver: zodResolver(newTaskDataSchema),
  });

  return (
    <div
      id="main-layout"
      className={isSmallDevice ? smallDeviceStyle : largeDeviceStyle}
    >
      {!isSmallDevice && <NavBar />}
      <main className="grid grid-rows-[64px_1fr] flex-1 w-full gap-y-3.5 sm:gap-y-6 text-neutro-1">
        <SearchTasks />
        <Toast.Provider swipeDirection="right">
          <FormProvider {...methods}>
            <Outlet />
          </FormProvider>
        </Toast.Provider>
      </main>

      {isSmallDevice && (
        <div className="block fixed bottom-0 left-0 w-full z-50">
          <PhoneNavBar />
        </div>
      )}
    </div>
  );
};
