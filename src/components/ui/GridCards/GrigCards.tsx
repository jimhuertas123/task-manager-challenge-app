import {
  Status,
  type DeleteTaskMutation,
  type DeleteTaskMutationVariables,
  type GetAllTasksQuery,
  type TaskFieldsFragment,
} from '@/__generated__/graphql';

import { GetAllTasksDocument } from '@/__generated__/graphql';
import { DELETE_TASK } from '@/graphql/mutations/deleteTask';
import { GridCard } from '@/components/features';
import { useMutation } from '@apollo/client/react';
import { useTasks } from '@/hooks/useTasks';

export const GridCards = ({ tasks }: { tasks: GetAllTasksQuery['tasks'] }) => {
  const { filter } = useTasks();

  const allStatuses = Object.values(Status) as Status[];
  const endStatuses: Status[] = [Status.Done, Status.Cancelled];
  let statusOrder: Status[] = [
    ...allStatuses.filter((status) => !endStatuses.includes(status)),
    ...endStatuses.filter((status) => allStatuses.includes(status)),
  ];

  const [deleteTask] = useMutation<
    DeleteTaskMutation,
    DeleteTaskMutationVariables
  >(DELETE_TASK);

  const handleDelete = async (taskId: string) => {
    await deleteTask({
      variables: { input: { id: taskId } },
      update: (cache, { data }) => {
        const existing = cache.readQuery<{ tasks: TaskFieldsFragment[] }>({
          query: GetAllTasksDocument,
          variables: { input: {} },
        });
        if (!existing || !data?.deleteTask) return;
        cache.writeQuery({
          query: GetAllTasksDocument,
          variables: { input: {} },
          data: {
            tasks: existing.tasks.filter(
              (task) => task.id !== data.deleteTask.id
            ),
          },
        });
      },
    });
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h2 className="text-neutro-1 text-2xl">No tasks found</h2>
      </div>
    );
  }

  if (filter.status) {
    statusOrder = [filter.status];
  }

  return (
    <div className="w-full overflow-x-auto">
      <div
        className={`grid grid-flow-col auto-cols-[minmax(338px,1fr)] sm:auto-cols-[minmax(348px,1fr)] gap-4 md:gap-x-[2.02rem] max-w-[3000px] md:m-auto`}
      >
        {statusOrder.map((status) => (
          <div
            key={status}
            className=" w-full h-[calc(100vh-220px)] flex flex-col pt-1"
          >
            <h3 className="text-lg font-bold tracking-wide pb-5">
              {status.charAt(0) +
                status.slice(1).toLowerCase().replace('_', ' ')}
              {` (0${(tasks as TaskFieldsFragment[]).filter((task) => task.status === status).length})`}
            </h3>
            <div className="flex-1 overflow-y-auto">
              {(tasks as TaskFieldsFragment[])
                .filter((task) => task.status === status)
                .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
                .map((task) => (
                  <GridCard
                    key={task.id}
                    task={task}
                    onDelete={() => handleDelete(task.id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
