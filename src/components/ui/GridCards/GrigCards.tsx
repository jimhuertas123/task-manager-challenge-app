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
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { ColumnStatusCards } from './ColumnStatusCards';
import { useTaskDnD } from '@/hooks/useTaskDnD';

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

  const { overId, activeTask, handleDragEnd, handleDragOver, handleDragStart } =
    useTaskDnD(tasks as TaskFieldsFragment[], statusOrder);

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
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <DragOverlay className="shadow-sm shadow-white/25">
            {activeTask ? (
              <GridCard
                isActive={false}
                task={activeTask}
                onDelete={() => {}}
              />
            ) : null}
          </DragOverlay>
          {statusOrder.map((status) => (
            <ColumnStatusCards
              overId={overId}
              key={status}
              status={status}
              tasks={tasks}
              activeTask={activeTask}
              handleDelete={handleDelete}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};
