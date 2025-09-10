import { DashboardIcon, ListIcon, PlusIcon } from '@/assets/icons';
import { useState } from 'react';

export const DashboardPage = () => {
  const [isGridViewMode, setViewMode] = useState<boolean>(true);
  const viewModeStyle =
    'w-10 h-10 fill-neutro-1 p-2.5 border-rad-[8px] border-[1px]  rounded-[8px] cursor-pointer hover:fill-primary-4';

  return (
    <div className=" h-full w-full ">
      <div className="grid grid-rows-[63px_1fr] h-full w-full">
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
        <div className="relative h-full w-full">
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              isGridViewMode
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <p>Welcome to the dashboard!</p>
          </div>
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              !isGridViewMode
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <p>Welcome to the dashboard in list view!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
