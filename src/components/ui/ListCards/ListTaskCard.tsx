import { TagCards } from '../UICardComponents/TagCards';
import { pointEstimateToNumber } from '../../features/FormNewTask/TaskFields/EstimateField/pointEstimate';
import { CircleAvatar } from '../UICardComponents/CircleAvatar';
import { DueDate } from '../UICardComponents/DueDate';
import { ChatBubbleIcon, RightArrowIcon, ThreatIcon } from '@/assets/icons';
import {
  type TaskFieldsFragment,
  type TaskTag,
  type UserFieldsFragment,
} from '@/__generated__/graphql';

export const ListTaskCard = ({
  index,
  task,
}: {
  index: number;
  task?: TaskFieldsFragment;
}) => {
  const tagColors: { [key in TaskTag]: { color: string } } = {
    RAILS: { color: '#FFFFFF' },
    IOS: { color: '#70B252' },
    NODE_JS: { color: '#2F61BF' },
    ANDROID: { color: '#E5B454' },
    REACT: { color: '#DA584B' },
  };

  if (!task || task.__typename !== 'Task') {
    return (
      <div className="bg-neutro-4 w-full h-14 border-x-[1px] border-b-[1px] border-neutro-3">
        No tasks
      </div>
    );
  }

  if (!(task.assignee as UserFieldsFragment)) {
    return (
      <div className="bg-neutro-4 w-full h-14 border-x-[1px] border-b-[1px] border-neutro-3">
        No assignee
      </div>
    );
  }
  return (
    <div className="grid grid-cols-[45%_15.1%_12.6%_15%_auto] gap-x-[1px] bg-neutro-3 w-full h-14 items-center pr-[1px] pl-[1px] pb-[1px]">
      <div className="flex items-center bg-neutro-4 h-full justify-between w-full pr-3">
        <div className="flex items-center">
          <div
            className={`flex h-12 w-1 mr-9`}
            style={{ backgroundColor: tagColors[task.tags[0]].color }}
          />
          <span className="mr-2">{index < 9 ? `0${index}` : index}</span>
          <span className="tracking-[0.2px]">{task.name}</span>
        </div>
        <div className="flex items-end gap-x-2 h-full pr-2 opacity-80 sm:active:scale-95 sm:opacity-10 sm:cursor-pointer active:opacity-100 sm:hover:opacity-100">
          <div className="flex items-center h-full gap-x-1">
            <span>3</span>
            <ChatBubbleIcon className="inline-block fill-neutro-1" />
          </div>
          <div className="flex items-center h-full gap-x-2">
            <span>5</span>
            <ThreatIcon className="inline-block fill-neutro-1" />
          </div>
          <div className="flex items-center h-full gap-x-3">
            <span>Details</span>
            <RightArrowIcon className="inline-block fill-neutro-1" />
          </div>
        </div>
      </div>
      <div className="flex items-center pl-2 bg-neutro-4 h-full">
        <TagCards tags={task.tags} limitShow={1} />
      </div>
      <div className="flex items-center bg-neutro-4 h-full pl-2 tracking-[0.4px]">
        <span>{pointEstimateToNumber(task.pointEstimate)} Points</span>
      </div>
      <div className="flex items-center bg-neutro-4 h-full pl-2">
        <CircleAvatar
          userId={(task.assignee as UserFieldsFragment)?.id}
          size={30}
        />
        <span className="ml-2 truncate max-w-[100px] overflow-ellipsis">
          {(task.assignee as UserFieldsFragment)?.fullName}
        </span>
      </div>
      <div className="flex items-center bg-neutro-4 h-full">
        <DueDate
          dueDate={task.dueDate}
          showBgColor={false}
          showIcon={false}
          capitalize={false}
        />
      </div>
    </div>
  );
};
