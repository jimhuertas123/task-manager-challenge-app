import { DashboardIcon, ListIcon, PlusIcon } from '@/assets/icons';
import { useState } from 'react';
import { ModalTask } from '../features/ModalTask/ModalTask';
import {
  GetAllUsersDocument,
  type GetAllUsersQuery,
  type GetAllUsersQueryVariables,
} from '@/__generated__/graphql';
import { useQuery } from '@apollo/client/react';

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

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument
  );

  return (
    <>
      {!isSmallDevice && (
        <div className=" w-full flex justify-between items-center text-neutro-2">
          <div className="flex">
            <ListIcon
              onClick={() => setViewMode(false)}
              className={`${viewModeStyle} ${!isGridViewMode ? ' border-primary-4 fill-primary-4' : 'border-transparent'}`}
            />
            <DashboardIcon
              onClick={() => setViewMode(true)}
              className={`${viewModeStyle} ${isGridViewMode ? 'border-primary-4 fill-primary-4' : 'border-transparent'}`}
            />
          </div>

          {!usersLoading && !usersError && (
            <PlusIcon
              onClick={() => setOpenModalNewTask(true)}
              className="w-[40px] h-[40px] bg-primary-4 fill-neutro-1 p-2 rounded-[8px] transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 cursor-pointer"
            />
          )}

          {openModalNewTask && (
            <ModalTask
              usersData={usersData?.users}
              isOpen={openModalNewTask}
              onClose={() => setOpenModalNewTask(false)}
            />
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
              className="relative z-10 flex-1 px-2 py-1 rounded-[6px] text-sm font-medium transition-colors duration-200 text-neutro-1"
            >
              Dashboard
            </button>
            <button
              onClick={() => setViewMode(false)}
              className="relative z-10 flex-1 px-2 py-1 rounded-[6px] text-sm font-medium transition-colors duration-200 text-neutro-1"
            >
              Task
            </button>
          </div>
        </div>
      )}
    </>
  );
};
