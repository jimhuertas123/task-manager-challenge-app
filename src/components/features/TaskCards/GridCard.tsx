import {
  ThreeDotsIcon,
  ClipIcon,
  ThreatIcon,
  ChatBubbleIcon,
  PencilIcon,
  TrashIcon,
} from '@/assets/icons';
import { TagCards } from '@/components/ui/UICardComponents/TagCards';
import { CircleAvatar } from '@/components/ui/UICardComponents/CircleAvatar';
import { pointEstimateToNumber } from '@/components/features/FormNewTask/TaskFields/EstimateField/pointEstimate';
import { DueDate } from '@/components/ui/UICardComponents/DueDate';
import { Popover } from '@/components/ui';
import {
  UserFieldsFragmentDoc,
  type TaskFieldsFragment,
} from '@/__generated__/graphql';
import { useFragment } from '@/__generated__';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { useEditTaskModal } from '@/hooks/useEditTaskModal';
import { useState } from 'react';

export const GridCard = ({
  isActive,
  task,
  onDelete,
}: {
  isActive: boolean;
  task?: TaskFieldsFragment;
  onDelete: (id: string) => void;
}) => {
  const assignee = useFragment(UserFieldsFragmentDoc, task?.assignee);

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
  } = useDraggable({
    id: (task as TaskFieldsFragment)?.id,
  });
  const { setNodeRef: setDropRef } = useDroppable({
    id: (task as TaskFieldsFragment)?.id,
  });

  const [popoverOpen, setPopoverOpen] = useState(false);

  const { setOpen, setTask } = useEditTaskModal();
  if (!task || task.__typename !== 'Task') {
    return <div className="bg-neutro-4 w-full h-[208px] mb-3">No Task</div>;
  }

  const style = transform
    ? {
        opacity: 1,
        transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
        zIndex: 1000,
      }
    : undefined;

  return isActive ? (
    <div className="h-[204px] bg-neutro-3/20 mb-4 border-[2px] border-dashed border-primary-4" />
  ) : (
    <div
      ref={(node) => {
        setDragRef(node);
        setDropRef(node);
      }}
      style={style}
      className="grid grid-rows-[1fr_1fr_1fr_1fr] gap-y-3 bg-neutro-4 w-full h-[208px] mb-3 pl-4 pr-[0.68rem] pb-4 pt-4 text-nav-bar-m tracking-[0.8px] font-[500]"
    >
      <div className="flex justify-between items-start tracking-[0.8px] pr-[1.45%]">
        <h2 className="text-lg font-[500]">{task.name}</h2>
        <span
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing mr-2"
          style={{ touchAction: 'none' }}
        >
          <svg
            width="22"
            height="18"
            fill="currentColor"
            aria-label="Drag handle"
            className="fill-neutro-2"
          >
            <circle cx="5" cy="7" r="1.6" />
            <circle cx="11" cy="7" r="1.6" />
            <circle cx="17" cy="7" r="1.6" />
            <circle cx="5" cy="12" r="1.6" />
            <circle cx="11" cy="12" r="1.6" />
            <circle cx="17" cy="12" r="1.6" />
          </svg>
        </span>
        <Popover
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
          side="bottom"
          button={
            <ThreeDotsIcon
              className="flex fill-neutro-2 my-auto rounded-[50%]  h-6.5 w-6.5 p-1
            hover:scale-105 hover:bg-neutro-3 active:bg-neutro-3 active:scale-95 cursor-pointer "
            />
          }
        >
          <div className="p-2 bg-neutro-3 rounded-[8px] border-[1px] border-neutro-2 shadow mt-2 gap-y-1 flex flex-col">
            <div
              onClick={() => {
                setTask(task);
                setOpen(true);
                setPopoverOpen(false);
              }}
              className="flex text-nav-bar-m text-neutro-1 gap-x-2 rounded-[4px] active:scale-95 active:bg-neutro-5/90 hover:bg-neutro-5/90 w-full h-full pl-4 pr-11 py-3 cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <PencilIcon className="fill-neutro-1" />
              <p className="text-sm">Edit</p>
            </div>
            <div
              onClick={() => {
                onDelete(task.id);
                setPopoverOpen(false);
              }}
              className="flex text-nav-bar-m text-neutro-1 gap-x-2 rounded-[4px] active:scale-95 active:bg-neutro-5/90 hover:bg-neutro-5/90 w-full h-full pl-4 pr-11 py-3 cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <TrashIcon className="fill-neutro-1" />
              <p className="text-sm">Delete</p>
            </div>
          </div>
        </Popover>
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
          {assignee?.fullName ? (
            <CircleAvatar userId={assignee.id} size={33} />
          ) : (
            //TODO: Replace with default avatar image
            <div></div>
          )}
        </div>
        {/* TODO: Generate random states for this */}
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
