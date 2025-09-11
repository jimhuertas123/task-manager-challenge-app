import type { GetAllTasksQuery } from '@/types/__generated__/graphql';

export const TaskCard = ({
  task,
}: {
  task: GetAllTasksQuery['tasks'][number];
}) => {
  if (!task) {
    return (
      <div className="bg-neutro-4 w-full h-14 border-x-[1px] border-b-[1px] border-neutro-3">
        No tasks
      </div>
    );
  }

  return (
    <div className="bg-neutro-4 w-full h-14 border-x-[1px] border-b-[1px] border-neutro-3"></div>
  );
};
