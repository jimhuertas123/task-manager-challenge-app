import React, { createContext, useState, useMemo, useCallback } from 'react';
import {
  GetAllTasksDocument,
  type GetAllTasksQuery,
  type GetAllTasksQueryVariables,
  type TaskFieldsFragment,
  type UserFieldsFragment,
} from '@/__generated__/graphql';
import { useQuery } from '@apollo/client/react';

type TasksContextType = {
  tasks: TaskFieldsFragment[];
  loading: boolean;
  error: Error | undefined;
  setFilter: (input: GetAllTasksQueryVariables['input']) => void;
  filter: GetAllTasksQueryVariables['input'];
  allTasks: TaskFieldsFragment[];
  refetchTasks: (input?: GetAllTasksQueryVariables['input']) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, loading, error, refetch } = useQuery<GetAllTasksQuery>(
    GetAllTasksDocument,
    {
      variables: { input: {} },
      fetchPolicy: 'cache-first',
      refetchWritePolicy: 'merge',
    }
  );

  const [filter, setFilter] = useState<GetAllTasksQueryVariables['input']>({});

  const allTasks = useMemo(
    () => ((data as GetAllTasksQuery)?.tasks as TaskFieldsFragment[]) ?? [],
    [data]
  );

  const refetchTasks = useCallback(
    (input?: GetAllTasksQueryVariables['input']) => {
      refetch({ input: input ?? {} });
    },
    [refetch]
  );

  const tasks = useMemo(() => {
    if (!filter || Object.keys(filter).length === 0) return allTasks;
    return allTasks.filter((task) => {
      return Object.entries(filter).every(([key, value]) => {
        if (value === undefined || value === null || value === '') return true;
        if (key === 'name') {
          return task.name.toLowerCase().includes(String(value).toLowerCase());
        }
        //for mytasks
        if (key === 'assigneeId') {
          return (task.assignee as UserFieldsFragment)?.id === value;
        }
        if (key === 'dueDate') {
          return task.dueDate?.slice(0, 10) === String(value).slice(0, 10);
        }
        // if (key === 'status') {
        //   return task.status === value;
        // }
        // if (key === 'tags') {
        //   return Array.isArray(value)
        //     ? value.every((v) => task.tags.includes(v))
        //     : task.tags.includes(value);
        // }
        // if (key === 'pointEstimate' || key === 'estimate') {
        //   return task.pointEstimate === value;
        // }
        return true;
      });
    });
  }, [allTasks, filter]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        error,
        setFilter,
        filter,
        allTasks,
        refetchTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext };
