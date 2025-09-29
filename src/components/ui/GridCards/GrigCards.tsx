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
import { BlankTaskIcon } from '@/assets/icons';

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
    // if (!confirm('Are you sure you want to delete this task?')) return;
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

  if (filter.status) {
    statusOrder = [filter.status];
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div
        data-cy="empty-tasks-state"
        className="flex-1 overflow-y-auto overflow-x-hidden"
      >
        <div className="pt-[16%] inset-0 flex flex-col items-center justify-center gap-y-2">
          <BlankTaskIcon
            className="w-25 h-25 fill-neutro-2/30  stroke-neutro-5"
            fill="rgba(148, 151, 154, 0.3)"
          />
          <h2 className="text-nav-bar-m tracking-wide pb-5 text-neutro-2/60 italic">
            No tasks found
          </h2>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full overflow-x-auto overflow-y-hidden ">
      <div
        className={`grid grid-flow-col auto-cols-[minmax(338px,1fr)] sm:auto-cols-[minmax(348px,1fr)] gap-4 md:gap-x-[2.02rem] max-w-[3000px]`}
      >
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <DragOverlay className="shadow-sm shadow-white/2">
            {activeTask ? (
              <GridCard
                isActive={false}
                isDragging={true}
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
