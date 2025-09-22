import { FormNewTask } from '@/components/features/FormNewTask';
import { ModalTask } from '@/components/features/ModalTask/ModalTask';
import { ViewModeSwitch } from '@/components/ui';
import { GridCards, GridCardsLoading } from '@/components/ui/GridCards';
import { ListCards } from '@/components/ui/ListCards';
import { useEditTaskModal } from '@/hooks/useEditTaskModal';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTasks } from '@/hooks/useTasks';
import { useState } from 'react';

export const MyTasksPage = () => {
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
        {loading && <GridCardsLoading />}
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

        {open && (
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
      </div>
    </div>
  );
};
