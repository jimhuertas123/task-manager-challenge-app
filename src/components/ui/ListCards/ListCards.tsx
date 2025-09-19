import './ListCard.style.css';
import { AccordingLists } from './AccordingLists';
import {
  Status,
  type GetAllTasksQuery,
  type TaskFieldsFragment,
} from '@/__generated__/graphql';

import { useTasks } from '@/hooks/useTasks';

export const ListCards = ({ tasks }: { tasks: GetAllTasksQuery['tasks'] }) => {
  const { filter } = useTasks();

  const listTitleStyle =
    'flex bg-neutro-4 pl-4 items-center font-normal text-nav-bar-m w-full tracking-[2px]';

  const listTitleGridStyle = `grid p-[1px] gap-x-[1px] grid-cols-[45%_15.1%_12.6%_14.3%_auto]
    rounded-[4px] text-lg font-bold tracking-wide bg-neutro-3 h-[56px]`;

  const allStatuses = Object.values(Status);
  const endStatuses: Status[] = [Status.Done, Status.Cancelled];
  let statusOrder = [
    ...allStatuses.filter((status) => !endStatuses.includes(status)),
    ...endStatuses.filter((status) => allStatuses.includes(status)),
  ];

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
    <div className="w-full h-full pt-2 overflow-x-auto ">
      <div className="min-w-[835px] max-w-[1800px] mx-auto pt-[5%] sm:pt-[0]">
        <header className={listTitleGridStyle}>
          <div
            className={`${listTitleStyle} sm:tracking-[0.7px] rounded-tl-[4px] rounded-bl-[4px]`}
          >
            <h1 className="text-neutro-1"># Task Name</h1>
          </div>
          <div className={`${listTitleStyle} sm:tracking-[0.7px]`}>
            <h1 className="text-neutro-1">Task Tags</h1>
          </div>
          <div className={`${listTitleStyle} sm:tracking-[0.7px]`}>
            <h1 className="text-neutro-1">Estimate</h1>
          </div>
          <div className={`${listTitleStyle} sm:tracking-[0px]`}>
            <h1 className="text-neutro-1 whitespace-nowrap overflow-hidden text-ellipsis sm:whitespace-normal sm:overflow-visible sm:text-clip max-w-[120px]">
              Task Assign Name
            </h1>
          </div>
          <div
            className={`${listTitleStyle} sm:tracking-[0.7px] rounded-tr-[4px] rounded-br-[4px]`}
          >
            <h1 className="text-neutro-1">Due Date</h1>
          </div>
        </header>

        {statusOrder.map((status) => (
          <AccordingLists
            key={status}
            listTitleStyle={listTitleStyle}
            title={status}
            tasks={(tasks as TaskFieldsFragment[]).filter(
              (task) => task.status === status
            )}
          />
        ))}
      </div>
    </div>
  );
};
