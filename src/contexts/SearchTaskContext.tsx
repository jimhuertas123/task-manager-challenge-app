import React, { createContext, useState, useCallback } from 'react';
import {
  GetAllTasksDocument,
  type GetAllTasksQuery,
  type GetAllTasksQueryVariables,
  type TaskFieldsFragment,
} from '@/__generated__/graphql';
import { useQuery } from '@apollo/client/react';

type TasksContextType = {
  tasks: TaskFieldsFragment[];
  loading: boolean;
  error: Error | undefined;
  refetchTasks: (input?: GetAllTasksQueryVariables['input']) => void;
  setFilter: (input: GetAllTasksQueryVariables['input']) => void;
  filter: GetAllTasksQueryVariables['input'];
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{
  children: React.ReactNode;
  initialFilter?: GetAllTasksQueryVariables['input'];
}> = ({ children, initialFilter = {} }) => {
  const [filter, setFilter] =
    useState<GetAllTasksQueryVariables['input']>(initialFilter);
  const { data, loading, error, refetch } = useQuery<
    GetAllTasksQuery,
    GetAllTasksQueryVariables
  >(GetAllTasksDocument, {
    variables: { input: filter },
    fetchPolicy: 'cache-first',
  });

  const refetchTasks = useCallback(
    (input?: GetAllTasksQueryVariables['input']) => {
      refetch({ input: input ?? filter });
    },
    [refetch, filter]
  );

  return (
    <TasksContext.Provider
      value={{
        tasks:
          ((data as GetAllTasksQuery)?.tasks as TaskFieldsFragment[]) ?? [],
        loading,
        error,
        refetchTasks,
        setFilter,
        filter,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext };
