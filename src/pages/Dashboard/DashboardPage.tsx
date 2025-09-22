import { ListCards } from '@/components/ui/ListCards';
import { GridCards } from '@/components/ui/GridCards';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useState } from 'react';

import { ViewModeSwitch } from '@/components/ui';
import { ModalTask } from '@/components/features/ModalTask/ModalTask';
import { FormNewTask } from '@/components/features/FormNewTask';
import { useTasks } from '@/hooks/useTasks';
import { useEditTaskModal } from '@/hooks/useEditTaskModal';
import { MobileModalTask } from '@/components/features/ModalTask/MobileModalTask';
import { MobileFormTask } from '@/components/features/FormNewTask/MobileFormTask';

export const DashboardPage = () => {
  const [isGridViewMode, setViewMode] = useState<boolean>(true);
  const isSmallDevice = useMediaQuery('(max-width: 680px)');

  const { tasks, loading, error } = useTasks();

  const { open, setOpen, task } = useEditTaskModal();

  return (
    <div key={'dashboard'} className="h-full w-full">
      <div className="grid grid-rows-[40px_1fr] gap-y-3 sm:gap-y-2 sm:grid-rows-[63px_1fr] h-full w-full">
        <ViewModeSwitch
          isSmallDevice={isSmallDevice}
          isGridViewMode={isGridViewMode}
          setViewMode={setViewMode}
        />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {String(error.message)}</p>}
        {!loading && !error && (
          <div className="relative h-full w-full">
            <div
              className={`absolute h-full w-full  inset-0 transition-opacity duration-300 ${
                isGridViewMode
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <GridCards tasks={tasks ?? []} />
            </div>
            <div
              className={`absolute min-h-full h-full w-full inset-0 transition-opacity duration-300 ${
                !isGridViewMode
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <ListCards tasks={tasks ?? []} />
            </div>
          </div>
        )}
        {open && !isSmallDevice && (
          <ModalTask
            isOpen={open}
            onClose={() => setOpen(false)}
            className="bg-neutro-3 w-[572px] relative max-w-4xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
            backgroundStyle="backdrop-blur-[20px] bg-black/5"
          >
            <div className="p-5">
              <FormNewTask
                defaultValues={task}
                onClose={() => setOpen(false)}
              />
            </div>
          </ModalTask>
        )}

        {open && isSmallDevice && (
          <MobileModalTask open={open} setOpen={() => setOpen(false)}>
            <div className="p-5">
              <MobileFormTask
                defaultValues={task}
                onClose={() => setOpen(false)}
              />
            </div>
          </MobileModalTask>
        )}
      </div>
    </div>
  );
};
