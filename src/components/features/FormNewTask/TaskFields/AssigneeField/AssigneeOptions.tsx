import type { UserFieldsFragment } from '@/__generated__/graphql';
import { CircleAvatar } from '@/components/ui/UICardComponents/CircleAvatar';
import type { NewTaskData } from '@/schema/schemaNewTask';
import type { UseFormSetValue } from 'react-hook-form';

export const AssigneeOptions = ({
  usersData,
  setValue,
  closeAction,
}: {
  usersData: UserFieldsFragment[] | undefined;
  setValue: UseFormSetValue<NewTaskData>;
  closeAction: (open: boolean) => void;
}) => {
  return (
    <>
      <div className="text-neutro-1 mt-2 w-[218px] py-2 bg-neutro-3 rounded-[8px] focus:ring-1 border-[1px] border-neutro-2">
        <span className="text-neutro-2 text-nav-bar-xl pl-3">Assign To...</span>
        {usersData ? (
          usersData.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-x-2 cursor-pointer hover:bg-neutro-2 px-5 py-3 rounded"
              onClick={() => {
                setValue('assigneeId', user.id, {
                  shouldValidate: true,
                });
                closeAction(false);
              }}
            >
              <CircleAvatar userId={user.id} size={30} />
              <span className="text-neutro-1 ml-2 font-[500] text-nav-bar-m">
                {user.fullName}
              </span>
            </div>
          ))
        ) : (
          <span key={'noUsers'} className="text-neutro-2 text-nav-bar-m">
            No users available
          </span>
        )}
      </div>
    </>
  );
};
