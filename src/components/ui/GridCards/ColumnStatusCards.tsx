import type {
  GetAllTasksQuery,
  TaskFieldsFragment,
} from '@/__generated__/graphql';
import { GridCard } from '@/components/features';
import { useDroppable } from '@dnd-kit/core';
import { Fragment } from 'react/jsx-runtime';

export const ColumnStatusCards = ({
  overId,
  activeTask,
  status,
  tasks,
  handleDelete,
}: {
  overId: string | null;
  activeTask: TaskFieldsFragment | null;
  status: string;
  tasks: GetAllTasksQuery['tasks'];
  handleDelete: (id: string) => void;
}) => {
  const { setNodeRef } = useDroppable({ id: status });

  const columnTasks = (tasks as TaskFieldsFragment[])
    .filter((t) => t.status === status)
    .filter((t) => !activeTask || t.id !== activeTask.id)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

  let placeholderIndex = -1;
  if (activeTask && overId) {
    const overTask = (columnTasks as TaskFieldsFragment[]).find(
      (t) => t.id === overId
    );
    if (overTask && overTask.status === status) {
      placeholderIndex = columnTasks.findIndex((t) => t.id === overId);
    } else if (overId === status) {
      placeholderIndex = columnTasks.length;
    }
  }

  return (
    <div
      ref={setNodeRef}
      key={status}
      className=" w-full h-[calc(100vh-220px)] flex flex-col pt-1 overflow-hidden z-[1]"
    >
      <h3 className="text-lg font-bold tracking-wide pb-5">
        {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')}
        {` (0${(tasks as TaskFieldsFragment[]).filter((task) => task.status === status).length})`}
      </h3>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {columnTasks.map((task, idx) => (
          <Fragment key={task.id}>
            {placeholderIndex === idx && (
              <div className="h-[204px] bg-neutro-3/20 mb-4 border-[2px] border-dashed border-primary-4" />
            )}
            <GridCard
              isActive={activeTask?.id === task.id}
              task={task}
              onDelete={() => handleDelete(task.id)}
            />
          </Fragment>
        ))}
        {/* If placeholder should be at the end */}
        {placeholderIndex === columnTasks.length && (
          <div className="h-[204px] bg-neutro-3/20 mb-4 border-[2px] border-dashed border-primary-4" />
        )}
      </div>
    </div>
  );
};
