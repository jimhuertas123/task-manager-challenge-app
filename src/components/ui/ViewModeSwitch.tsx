import { DashboardIcon, ListIcon, PlusIcon } from '@/assets/icons';
import { useEffect, useState } from 'react';
import { ModalTask } from '../features/ModalTask/ModalTask';
import type { NewTaskData } from '@/schema/schemaNewTask';
import { useFormContext } from 'react-hook-form';
import { FormNewTask } from '../features/FormNewTask';

export const ViewModeSwitch = ({
  isSmallDevice,
  isGridViewMode,
  setViewMode,
}: {
  isSmallDevice: boolean;
  isGridViewMode: boolean;
  setViewMode: (mode: boolean) => void;
}) => {
  const viewModeStyle =
    'w-10 h-10 fill-neutro-1 p-2.5 border-rad-[8px] border-[1px]  rounded-[8px] cursor-pointer hover:fill-primary-4';

  const [openModalNewTask, setOpenModalNewTask] = useState(false);

  const { reset } = useFormContext<NewTaskData>();
  useEffect(() => {
    if (openModalNewTask) {
      reset();
    }
  }, [openModalNewTask, reset]);

  return (
    <>
      {!isSmallDevice && (
        <div className=" w-full flex justify-between items-center text-neutro-2">
          <div className="flex">
            <ListIcon
              aria-label="List view"
              role="button"
              type="button"
              id="list-view-button"
              tabIndex={0}
              onClick={() => setViewMode(false)}
              className={`${viewModeStyle} ${!isGridViewMode ? ' border-primary-4 fill-primary-4' : 'border-transparent'}`}
            />
            <DashboardIcon
              aria-label="Dashboard view"
              role="button"
              type="button"
              id="dashboard-view-button"
              tabIndex={0}
              onClick={() => setViewMode(true)}
              className={`${viewModeStyle} ${isGridViewMode ? 'border-primary-4 fill-primary-4' : 'border-transparent'}`}
            />
          </div>

          <PlusIcon
            aria-label="Add new task"
            role="button"
            type="button"
            id="add-new-task-button"
            tabIndex={0}
            onClick={() => setOpenModalNewTask(true)}
            className="w-[40px] h-[40px] bg-primary-4 fill-neutro-1 p-2 rounded-[8px] transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 cursor-pointer"
          />

          {openModalNewTask && (
            <ModalTask
              isOpen={openModalNewTask}
              onClose={() => setOpenModalNewTask(false)}
              className="bg-neutro-3 w-[572px] relative max-w-4xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
              backgroundStyle="backdrop-blur-[20px] bg-black/5"
            >
              <div className="p-5">
                <FormNewTask onClose={() => setOpenModalNewTask(false)} />
              </div>
            </ModalTask>
          )}
        </div>
      )}
      {isSmallDevice && (
        <div className="w-full h-full flex justify-center items-center px-4.5">
          <div className="relative flex bg-neutro-4 rounded-[10px] p-1 w-full h-[40px]">
            <span
              className={`absolute top-1 left-1 h-[32px] w-[50%] rounded-[8px] bg-neutro-2
                  transition-all duration-300 z-0`}
              style={{
                transform: isGridViewMode
                  ? 'translateX(0)'
                  : 'translateX(100%)',
              }}
            />
            <button
              onClick={() => setViewMode(true)}
              className="relative flex-1 px-2 py-1 rounded-[6px] text-sm font-medium transition-colors duration-200 text-neutro-1"
            >
              Dashboard
            </button>
            <button
              onClick={() => setViewMode(false)}
              className="relative flex-1 px-2 py-1 rounded-[6px] text-sm font-medium transition-colors duration-200 text-neutro-1"
            >
              Task
            </button>
          </div>
        </div>
      )}
    </>
  );
};
