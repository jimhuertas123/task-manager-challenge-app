import {
  PointEstimate,
  type GetAllTasksQuery,
} from '@/types/__generated__/graphql';

import {
  AlarmIcon,
  ThreeDotsIcon,
  ClipIcon,
  ThreatIcon,
  ChatBubbleIcon,
} from '@/assets/icons';
import { TagCards } from '@/components/ui/TagCards';

const pointEstimateToNumber = (pointEstimate: PointEstimate): number => {
  switch (pointEstimate) {
    case PointEstimate.One:
      return 1;
    case PointEstimate.Two:
      return 2;
    case PointEstimate.Four:
      return 4;
    case PointEstimate.Eight:
      return 8;
    case PointEstimate.Zero:
      return 0;
    default:
      return 0;
  }
};

const colorBGAvatar = [
  '#8B0000',
  '#2C3E50',
  '#4B0082',
  '#006400',
  '#483D8B',
  '#800000',
  '#191970',
  '#2F4F4F',
  '#3B3B3B',
  '#5D1451',
];

export const GridCard = ({
  task,
}: {
  task?: GetAllTasksQuery['tasks'][number];
}) => {
  if (!task) {
    return <div className="bg-neutro-4 w-full h-[208px] mb-3">No Task</div>;
  }

  const dueDate = new Date(task.dueDate as string | number | Date);
  const now = new Date();
  const isToday = dueDate.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = dueDate.toDateString() === yesterday.toDateString();

  const expired = dueDate <= yesterday;

  let calculatedDueDate: string;
  if (isToday) {
    calculatedDueDate = 'TODAY';
  } else if (isYesterday) {
    calculatedDueDate = 'YESTERDAY';
  } else {
    calculatedDueDate = dueDate.toDateString();
  }

  const getInitialsFromUrl = (name: string) => {
    return name
      .split(' ')
      .map((n) => n.charAt(0).toUpperCase())
      .join('');
  };
  const bgColorAvatar =
    colorBGAvatar[Math.floor(Math.random() * colorBGAvatar.length)];

  return (
    <div
      key={task.id}
      className="grid grid-rows-[1fr_1fr_1fr_1fr] gap-y-3 bg-neutro-4 w-full h-[208px] mb-3 pl-4 pr-2 pb-4 pt-4 text-nav-bar-m tracking-[0.8px] font-[500]"
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
        <div
          className={
            'rounded-[4px] px-4 flex justify-center items-center mr-[2%]'
          }
          style={{
            backgroundColor: expired
              ? 'rgba(218, 88, 75, 0.1)'
              : 'rgba(148, 151, 154, 0.1)',
            color: expired ? '#da584b' : '#ffffff',
          }}
        >
          <AlarmIcon
            className={`inline-block ${expired ? 'fill-primary-4' : 'fill-neutro-1'}`}
          />
          <span className="pl-[0.6rem]">{calculatedDueDate}</span>
        </div>
      </div>
      <TagCards tags={task.tags} />
      <div className="flex justify-between">
        <div className="flex items-center mb-auto">
          {task.assignee?.fullName ? (
            <div
              className="w-8 h-8 p-1 rounded-[50%] flex align border-[0.5px] border-neutro-2 text-nav-bar-s font-normal justify-center items-center"
              style={{ backgroundColor: bgColorAvatar }}
            >
              {getInitialsFromUrl(task.assignee.fullName)}
            </div>
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
