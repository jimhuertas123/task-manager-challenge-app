import { EditableLabel } from './TaskFields/EditabaleLabel';
// import { useFormContext } from 'react-hook-form';
import { newTaskDataSchema, type NewTaskData } from '@/schema/schemaNewTask';
import { Popover } from '@/components/ui';

import {
  AnimatedFailed,
  AnimatedLoading,
  AnimatedSuccess,
  CalendarIcon,
  LabelIcon,
  PlusMinusIcon,
  ProfileIcon,
} from '@/assets/icons';
import { useFormContext } from 'react-hook-form';

// import {
//   GetAllTasksDocument,
//   PointEstimate,
//   Status,
//   TaskTag,
//   useCreateTaskMutation,
//   type GetAllUsersQuery,
//   type TaskFieldsFragment,
// }
import {
  numberToPointEstimate,
  pointEstimateToNumber,
} from '@/components/ui/UICardComponents/pointEstimate';
import { useRef, useState } from 'react';
import { CircleAvatar } from '@/components/ui/UICardComponents/CircleAvatar';

import { DayPicker } from 'react-day-picker';
import { CalendarNavbar } from './';
import {
  CreateTaskDocument,
  GetAllTasksDocument,
  PointEstimate,
  Status,
  TaskTag,
  type CreateTaskMutation,
  type CreateTaskMutationVariables,
  type TaskFieldsFragment,
  type UserFieldsFragment,
} from '@/__generated__/graphql';
import { useMutation } from '@apollo/client/react';
import { parseLocalDate } from './TaskFields/parseLocalDate';

// import { NavigationForm } from '@/components/ui/NavigationForm/NavigationForm';

export const FormNewTask = ({
  usersData,
  onClose,
}: {
  usersData: UserFieldsFragment[] | undefined;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useFormContext<NewTaskData>();

  const [createTask, { data, loading, error }] = useMutation<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >(CreateTaskDocument);

  const [isEstimatedPopoverClose, setIsEstimatedPopoverClose] = useState(false);
  const [isAssigneePopoverClose, setIsAssigneePopoverClose] = useState(false);
  const [isLabelPopoverClose, setIsLabelPopoverClose] = useState(false);
  const [isDueDatePopoverClose, setIsDueDatePopoverClose] = useState(false);

  const dueDateInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: NewTaskData) => {
    try {
      const validatedData = newTaskDataSchema.parse(data);

      await createTask({
        variables: {
          input: {
            name: validatedData.name,
            assigneeId: validatedData.assigneeId,
            dueDate: validatedData.dueDate,
            pointEstimate: numberToPointEstimate(validatedData.estimate),
            status: Status.Backlog,
            tags: validatedData.tags as TaskTag[],
          },
        },
        update: (cache, { data }) => {
          const existing = cache.readQuery<{ tasks: TaskFieldsFragment[] }>({
            query: GetAllTasksDocument,
          });
          cache.writeQuery({
            query: GetAllTasksDocument,
            data: {
              tasks: data?.createTask
                ? [data.createTask, ...(existing?.tasks ?? [])]
                : [...(existing?.tasks ?? [])],
            },
          });
        },
      });
    } catch (errorCatch) {
      throw new Error((errorCatch as Error)?.message);
    }
  };

  return (
    <div className="flex w-full focus:outline-none focus:ring-0">
      <form
        className="flex w-full flex-col"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full h-[50px] flex flex-col">
          <EditableLabel register={register} value={watch('name') || ''} />
          <span className="text-primary-4 text-nav-bar-s text-start">
            {errors.name?.message}
          </span>
        </div>

        <div className="grid grid-cols-[auto_22%_22%_26%] w-full gap-x-4">
          {/* estimate field */}
          <div className="w-full max-w-full">
            <Popover
              open={isEstimatedPopoverClose}
              onOpenChange={setIsEstimatedPopoverClose}
              key={'estimate'}
              side="bottom"
              button={
                <div
                  className="flex h-[32px] w-full justify-center items-center py-2 rounded-[4px] cursor-pointer"
                  style={{
                    backgroundColor: !watch('estimate')
                      ? 'rgba(148, 151, 154, 0.1)'
                      : '',
                  }}
                >
                  <PlusMinusIcon className="fill-neutro-1 flex" />
                  <h2 className="text-neutro-1 ml-2 font-[500] text-nav-bar-m">
                    {watch('estimate')
                      ? `${watch('estimate')} Points`
                      : 'Estimate'}
                  </h2>
                </div>
              }
            >
              <div className="text-neutro-1 ml-1 mt-2 w-[118px] py-2 bg-neutro-3 rounded-[8px] focus:ring-1 border-[1px] border-neutro-2">
                <span className="text-neutro-2 text-nav-bar-xl pl-3">
                  Estimate
                </span>
                {Object.values(PointEstimate).map((point) => (
                  <button
                    key={point}
                    className="flex w-[calc(100%-11px)] ml-1.5 px-1.5 gap-x-2 items-center py-1 rounded cursor-pointer text-nav-bar-m hover:bg-neutro-2"
                    onClick={() => {
                      setValue('estimate', pointEstimateToNumber(point), {
                        shouldValidate: true,
                      });
                      setIsEstimatedPopoverClose(false);
                    }}
                  >
                    <PlusMinusIcon className="fill-neutro-1 flex" />
                    {pointEstimateToNumber(point)} Points
                  </button>
                ))}
              </div>
            </Popover>
            <div className="w-full">
              <span className="text-primary-4 text-nav-bar-s">
                {errors.estimate?.message}
              </span>
            </div>
          </div>

          {/* assignee field */}
          <div className="w-full max-w-full">
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
                      <CircleAvatar
                        fullName={
                          usersData?.find(
                            (user) => user.id === watch('assigneeId')
                          )?.fullName ?? 'No Name'
                        }
                        size={'12px'}
                      />
                      <span className="text-neutro-1 ml-2 font-[500] text-nav-bar-m overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {usersData?.find(
                          (user) => user.id === watch('assigneeId')
                        )?.fullName ?? 'No Name'}
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
              <div className="text-neutro-1 mt-2 w-[218px] py-2 bg-neutro-3 rounded-[8px] focus:ring-1 border-[1px] border-neutro-2">
                <span className="text-neutro-2 text-nav-bar-xl pl-3">
                  Assign To...
                </span>
                {usersData ? (
                  usersData.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-x-2 cursor-pointer hover:bg-neutro-2 px-5 py-3 rounded"
                      onClick={() => {
                        setValue('assigneeId', user.id, {
                          shouldValidate: true,
                        });
                        setIsAssigneePopoverClose(false);
                      }}
                    >
                      <CircleAvatar fullName={user.fullName} size={'10px'} />
                      <span className="text-neutro-1 ml-2 font-[500] text-nav-bar-m">
                        {user.fullName}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-neutro-2 text-nav-bar-m">
                    No users available
                  </span>
                )}
              </div>
            </Popover>
            <div className="w-full">
              <span className="text-primary-4 text-nav-bar-s">
                {errors.assigneeId?.message}
              </span>
            </div>
          </div>

          {/* label field */}
          <div className="w-full max-w-full">
            <Popover
              open={isLabelPopoverClose}
              onOpenChange={setIsLabelPopoverClose}
              key={'label'}
              side="bottom"
              button={
                <div
                  className="flex h-[32px] w-full justify-center items-center py-2 rounded-[4px] cursor-pointer"
                  style={{
                    backgroundColor: 'rgba(148, 151, 154, 0.1)',
                  }}
                >
                  <LabelIcon className="fill-neutro-1" />
                  <h2 className="text-neutro-1 ml-2 font-[500] text-nav-bar-m">
                    {watch('tags') ? watch('tags')[0] : 'Label'}
                  </h2>
                </div>
              }
            >
              <div className="text-neutro-1 mt-2 w-[218px] py-2 bg-neutro-3 rounded-[8px] focus:ring-1 border-[1px] border-neutro-2">
                <span className="text-neutro-2 text-nav-bar-xl pl-3">
                  Tag Title
                </span>
                <div className="text-neutro-2 text-nav-bar-m pl-3 flex flex-col gap-2">
                  {Object.values(TaskTag).map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={tag}
                        checked={
                          Array.isArray(watch('tags')) &&
                          watch('tags').includes(tag)
                        }
                        onChange={(e) => {
                          const currentTags = Array.isArray(watch('tags'))
                            ? watch('tags')
                            : [];
                          if (e.target.checked) {
                            setValue('tags', [...currentTags, tag], {
                              shouldValidate: true,
                            });
                          } else {
                            setValue(
                              'tags',
                              currentTags.filter((t) => t !== tag),
                              { shouldValidate: true }
                            );
                          }
                        }}
                        className="accent-primary-4"
                      />
                      <span>{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </Popover>
            <div className="w-full">
              <span className="text-primary-4 text-nav-bar-s">
                {errors.tags?.message}
              </span>
            </div>
          </div>

          {/* due date field */}
          <div className="w-full max-w-full">
            <Popover
              open={isDueDatePopoverClose}
              onOpenChange={setIsDueDatePopoverClose}
              key={'dueDate'}
              side="bottom"
              button={
                <div
                  className="flex h-[32px] w-full justify-center items-center rounded-[4px] cursor-pointer"
                  style={{
                    backgroundColor: 'rgba(148, 151, 154, 0.1)',
                  }}
                  onClick={() => dueDateInputRef.current?.click()}
                >
                  <CalendarIcon className="fill-neutro-1" />
                  <h2 className="text-neutro-1 ml-2 font-[500] text-nav-bar-m">
                    {watch('dueDate') || 'Due Date'}
                  </h2>
                </div>
              }
            >
              <div className="ml-1 mt-2 w-[266px] pt-2 bg-neutro-5 rounded-[8px] focus:ring-1 border-[1px] border-neutro-2">
                <DayPicker
                  mode="single"
                  selected={
                    watch('dueDate')
                      ? parseLocalDate(watch('dueDate'))
                      : undefined
                  }
                  defaultMonth={
                    watch('dueDate')
                      ? parseLocalDate(watch('dueDate'))
                      : new Date()
                  }
                  classNames={{
                    month:
                      'grid grid-rows-[30px_1fr] text-neutro-1 bg-neutro-5 rounded-lg px-4 mb-3',
                    day: 'w-8 h-8',
                    day_button:
                      'rounded-[2px] hover:bg-primary-4 border-transparent text-white text-center flex w-full h-full justify-center items-center',
                    selected: 'rounded-[2px] border-[2px] border-primary-4',
                    day_today: 'border-primary-4',
                  }}
                  onSelect={(date) => {
                    if (!date) {
                      setValue('dueDate', '');
                      setIsDueDatePopoverClose(false);
                      return;
                    }

                    const monthShort = date.toLocaleString('default', {
                      month: 'short',
                    });
                    const day = String(date.getDate()).padStart(2, '0');
                    const year = date.getFullYear();
                    const formatted = `${monthShort}. ${day} ${year}`;
                    setValue('dueDate', formatted, { shouldValidate: true });
                    setIsDueDatePopoverClose(false);
                  }}
                  components={{
                    MonthCaption: CalendarNavbar,
                    Footer: () => (
                      <div className="w-full border-t border-neutro-2 p-0">
                        <button
                          className="w-full text-primary-4 text-nav-bar-m rounded-bl-[2px] rounded-br-[2px] hover:bg-primary-4 hover:text-neutro-1 py-2 active:scale-95 transition-all duration-200"
                          onClick={() => {
                            const today = new Date();
                            const monthShort = today.toLocaleString('default', {
                              month: 'short',
                            });
                            const day = String(today.getDate()).padStart(
                              2,
                              '0'
                            );
                            const year = today.getFullYear();
                            const formatted = `${monthShort}. ${day} ${year}`;
                            setValue('dueDate', formatted);
                            setIsDueDatePopoverClose(false);
                          }}
                        >
                          Today
                        </button>
                      </div>
                    ),
                  }}
                  hideNavigation={true}
                  footer={true}
                />
              </div>
            </Popover>
            <div className="w-full">
              <span className="text-primary-4 text-nav-bar-s">
                {errors.dueDate?.message}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-x-2">
          <button
            className="hover:bg-white/10 hover:bg-opacity-80 py-2 px-4 rounded-[8px] text-neutro-1 text-nav-bar-m"
            type="button"
            onClick={onClose}
          >
            cancel
          </button>
          <button
            className="flex text-nav-bar-m min-w-20 max-h-[40px] bg-primary-4 justify-center text-neutro-1 py-2 px-4 rounded-[8px] disabled:opacity-50 hover:scale-105 active:scale-95 transition-all duration-200"
            type="submit"
            disabled={!isValid || isSubmitting || loading}
          >
            {isSubmitting ? (
              <AnimatedLoading />
            ) : data ? (
              <AnimatedSuccess stroke="white" />
            ) : error ? (
              <AnimatedFailed className="w-4 h-4 p-0 m-0" stroke="white" />
            ) : (
              <span>create</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
