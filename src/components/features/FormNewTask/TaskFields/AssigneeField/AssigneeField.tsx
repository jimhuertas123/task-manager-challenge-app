import type { UserFieldsFragment } from '@/__generated__/graphql';
import { ProfileIcon } from '@/assets/icons';
import { Popover } from '@/components/ui';
import { CircleAvatar } from '@/components/ui/UICardComponents/CircleAvatar';
import type { NewTaskData } from '@/schema/schemaNewTask';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AssigneeOptions } from './AssigneeOptions';

export const AssigneeField = ({
  usersData,
}: {
  usersData: UserFieldsFragment[] | undefined;
}) => {
  const [isAssigneePopoverClose, setIsAssigneePopoverClose] = useState(false);

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<NewTaskData>();

  return (
    <>
      <Popover
        open={isAssigneePopoverClose}
        onOpenChange={setIsAssigneePopoverClose}
        key={'assignee'}
        side="bottom"
        button={
          <div
            className="flex h-[32px] w-full justify-center items-center rounded-[4px] cursor-pointer"
            style={{
              backgroundColor: !watch('assigneeId')
                ? 'rgba(148, 151, 154, 0.1)'
                : '',
            }}
          >
            {watch('assigneeId') ? (
              <div className="flex items-center">
                <CircleAvatar userId={watch('assigneeId')} size={30} />
                <span className="text-neutro-1 ml-1.5 font-[500] text-nav-bar-m overflow-ellipsis whitespace-nowrap overflow-hidden">
                  {usersData?.find((user) => user.id === watch('assigneeId'))
                    ?.fullName ?? 'No Name'}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <ProfileIcon className="fill-neutro-1" />
                <h2 className="text-neutro-1 ml-2 font-[500] text-nav-bar-m">
                  {watch('assigneeId') || 'Assignee'}
                </h2>
              </div>
            )}
          </div>
        }
      >
        <AssigneeOptions
          usersData={usersData}
          setValue={setValue}
          closeAction={setIsAssigneePopoverClose}
        />
      </Popover>
      <div className="w-full">
        <span key={'assigneeError'} className="text-primary-4 text-nav-bar-s">
          {errors.assigneeId?.message}
        </span>
      </div>
    </>
  );
};
