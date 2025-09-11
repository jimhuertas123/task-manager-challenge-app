import { type GetAllTasksQuery } from '@/types/__generated__/graphql';

import {
  ThreeDotsIcon,
  ClipIcon,
  ThreatIcon,
  ChatBubbleIcon,
} from '@/assets/icons';
import { TagCards } from '@/components/ui/UICardComponents/TagCards';
import { CircleAvatar } from '@/components/ui/UICardComponents/CircleAvatar';
import { pointEstimateToNumber } from '@/components/ui/UICardComponents/pointEstimate';
import { DueDate } from '@/components/ui/UICardComponents/DueDate';

export const GridCard = ({
  task,
}: {
  task?: GetAllTasksQuery['tasks'][number];
}) => {
  if (!task) {
    return <div className="bg-neutro-4 w-full h-[208px] mb-3">No Task</div>;
  }

  return (
    <div
      key={task.id}
      className="grid grid-rows-[1fr_1fr_1fr_1fr] gap-y-3 bg-neutro-4 w-full h-[208px] mb-3 pl-4 pr-[0.68rem] pb-4 pt-4 text-nav-bar-m tracking-[0.8px] font-[500]"
    >
      <div className="flex justify-between items-start tracking-[0.8px] pr-[1.45%]">
        <h2 className="text-lg font-[500]">{task.name}</h2>
        <ThreeDotsIcon
          className="inline-block fill-neutro-2 my-auto rounded-[50%]  h-6.5 w-6.5 p-1
            hover:scale-105 hover:bg-neutro-3 active:scale-95 cursor-pointer "
        />
      </div>
      <div className="flex justify-between">
        <p className="flex items-center">
          {pointEstimateToNumber(task.pointEstimate)} Points
        </p>
        <DueDate dueDate={task.dueDate} />
      </div>
      <TagCards tags={task.tags} />
      <div className="flex justify-between">
        <div className="flex items-center mb-auto">
          {task.assignee?.fullName ? (
            <CircleAvatar fullName={task.assignee.fullName} size={8} />
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex items-end gap-x-4 h-full pr-2">
          <div className="flex items-center h-full">
            {/* <span className=""> 5</span> */}
            <ClipIcon className="inline-block fill-neutro-1" />
          </div>
          <div className="flex items-center h-full gap-x-1">
            <span>5</span>
            <ThreatIcon className="inline-block fill-neutro-1" />
          </div>
          <div className="flex items-center h-full gap-x-1">
            <span>3</span>
            <ChatBubbleIcon className="inline-block fill-neutro-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
