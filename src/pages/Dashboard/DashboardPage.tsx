import { ListCards } from '@/components/ui/ListCards';
import { GridCards } from '@/components/ui/GridCards';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useState } from 'react';

import { ViewModeSwitch } from '@/components/ui';
import { useQuery } from '@apollo/client/react';
import {
  GetAllTasksDocument,
  type GetAllTasksQuery,
  type GetAllTasksQueryVariables,
} from '@/__generated__/graphql';

export const DashboardPage = () => {
  const [isGridViewMode, setViewMode] = useState<boolean>(true);
  const isSmallDevice = useMediaQuery('(max-width: 680px)');

  const { data, loading, error } = useQuery<
    GetAllTasksQuery,
    GetAllTasksQueryVariables
  >(GetAllTasksDocument, {
    fetchPolicy: 'cache-first',
  });

  return (
    <div className="h-full w-full">
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
        )}
      </div>
    </div>
  );
};
