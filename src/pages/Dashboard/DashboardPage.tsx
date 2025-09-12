import { DashboardIcon, ListIcon, PlusIcon } from '@/assets/icons';
import { ListCards } from '@/components/ui/ListCards';
import { GridCards } from '@/components/ui/GridCards';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useState } from 'react';

import { useGetAllTasksQuery } from '@/types/__generated__/graphql';

export const DashboardPage = () => {
  const [isGridViewMode, setViewMode] = useState<boolean>(true);
  const isSmallDevice = useMediaQuery('(max-width: 680px)');

  const { data, loading, error } = useGetAllTasksQuery({
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (data) {
    console.log('Fetched tasks:', data);
  }

  const viewModeStyle =
    'w-10 h-10 fill-neutro-1 p-2.5 border-rad-[8px] border-[1px]  rounded-[8px] cursor-pointer hover:fill-primary-4';

  return (
    <div className="h-full w-full">
      <div className="grid grid-rows-[40px_1fr] gap-y-3 sm:gap-y-2 sm:grid-rows-[63px_1fr] h-full w-full">
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
            <PlusIcon
              className="w-[40px] h-[40px] bg-primary-4 fill-neutro-1 p-2 rounded-[8px] 
            transition-transform duration-200 ease-in-out hover:scale-105 
            active:scale-95 cursor-pointer"
            />
          </div>
        )}
        {isSmallDevice && (
          <div className="w-full h-full flex justify-center items-center px-4.5">
            <div className="relative flex bg-neutro-4 rounded-[10px] p-1 w-full h-[40px]">
              <span
                className={`absolute top-1 left-1 h-[32px] w-[80px] rounded-[8px] bg-neutro-2
                  transition-all duration-300 z-0`}
                style={{
                  width: '50%',
                  height: '32px',
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
        <div className="relative h-full w-full">
          <div
            className={`absolute h-full w-full  inset-0 transition-opacity duration-300 ${
              isGridViewMode
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <GridCards tasks={data?.tasks ?? []} />
          </div>
          <div
            className={`absolute min-h-full h-full w-full inset-0 transition-opacity duration-300 ${
              !isGridViewMode
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ListCards tasks={data?.tasks ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
};
