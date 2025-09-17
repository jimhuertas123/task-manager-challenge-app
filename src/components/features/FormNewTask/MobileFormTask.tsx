import { useEffect, useState, type JSX } from 'react';
import { ModalTask } from '../ModalTask/ModalTask';
import {
  TitleLabelField,
  CalendarPicker,
  EstimateOptions,
  AssigneeOptions,
  LabelTagOptions,
} from './';
import { useFormContext } from 'react-hook-form';
import { newTaskDataSchema, type NewTaskData } from '@/schema/schemaNewTask';
import {
  AnimatedFailed,
  AnimatedLoading,
  AnimatedSuccess,
  CalendarIcon,
  LabelIcon,
  PlusMinusIcon,
  ProfileIcon,
} from '@/assets/icons';
import {} from './TaskFields/EstimateField/EstimateOptions';
import {
  CreateTaskDocument,
  GetAllTasksDocument,
  Status,
  TaskTag,
  type CreateTaskMutation,
  type CreateTaskMutationVariables,
  type TaskFieldsFragment,
  type UserFieldsFragment,
} from '@/__generated__/graphql';

import { CircleAvatar } from '@/components/ui/UICardComponents/CircleAvatar';
import { useMutation } from '@apollo/client/react';
import { numberToPointEstimate } from '@/components/ui/UICardComponents/pointEstimate';
import { useUsers } from '@/context/useUsers';

export const MobileFormTask = ({ onClose }: { onClose: () => void }) => {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<NewTaskData>();

  const [selectedField, setSelectedField] = useState<string>('dueDate');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    data: usersQuery,
    loading: usersLoading,
    // error: usersError,
  } = useUsers();

  const usersData = usersQuery?.users as UserFieldsFragment[] | undefined;

  const modalContent: Map<string, JSX.Element> = new Map([
    [
      'estimate',
      <EstimateOptions
        closeAction={() => setIsOpen(false)}
        setValue={setValue}
      />,
    ],
    [
      'assignee',
      <AssigneeOptions
        closeAction={() => setIsOpen(false)}
        setValue={setValue}
        usersData={usersData}
      />,
    ],
    ['labels', <LabelTagOptions watch={watch} setValue={setValue} />],
    [
      'dueDate',
      <CalendarPicker
        closeAction={() => setIsOpen(false)}
        setValue={setValue}
        watch={watch}
      />,
    ],
  ]);

  const [createTask, { data, loading, error, reset: resetMutation }] =
    useMutation<CreateTaskMutation, CreateTaskMutationVariables>(
      CreateTaskDocument
    );

  useEffect(() => {
    resetMutation();
  }, []);

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

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (errorCatch) {
      throw new Error((errorCatch as Error)?.message);
    }
  };

  return (
    <div className="flex">
      <form className="flex w-full" action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col pt-20 gap-y-4 w-full">
          <div className="mb-2.5">
            <TitleLabelField />
          </div>
          {/* estimate field */}
          <button
            className="w-full "
            onClick={() => {
              setSelectedField('estimate');
              setIsOpen(true);
            }}
          >
            <div
              className={
                'flex h-[32px] w-full items-center py-2 px-4.5 rounded-[4px] cursor-pointer gap-x-2.5' +
                (errors.estimate ? ' border border-primary-4' : '')
              }
              style={{
                backgroundColor: !watch('estimate')
                  ? 'rgba(148, 151, 154, 0.1)'
                  : '',
              }}
            >
              <PlusMinusIcon className=" fill-neutro-1 flex" />
              <h2 className="text-neutro-1 font-[500] text-nav-bar-m tracking-[0.9px]">
                {watch('estimate') ? `${watch('estimate')} Points` : 'Estimate'}
              </h2>
            </div>
          </button>

          {/* label field */}
          <button
            className="w-full"
            onClick={() => {
              setSelectedField('labels');
              setIsOpen(true);
            }}
          >
            <div
              className={
                'flex h-[32px] w-full items-center py-2 rounded-[4px] cursor-pointer' +
                (watch('tags') ? '' : ' px-4') +
                (errors.tags ? ' border border-primary-4' : '')
              }
              style={{
                backgroundColor: !watch('tags')
                  ? 'rgba(148, 151, 154, 0.1)'
                  : '',
              }}
            >
              {Array.isArray(watch('tags')) && watch('tags').length > 0 ? (
                <div className="flex gap-1 flex-wrap">
                  {watch('tags').map((tag: string) => (
                    <span
                      key={tag}
                      className="text-neutro-1 px-2 py-0.5 rounded text-nav-bar-m font-medium"
                      style={{ backgroundColor: 'rgba(148, 151, 154, 0.1)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-x-2.5">
                  <LabelIcon className="fill-neutro-1" />
                  <h2 className="text-neutro-1 font-[500] text-nav-bar-m tracking-[0.9px]">
                    Label
                  </h2>
                </div>
              )}
            </div>
          </button>

          {/* assignee field */}
          <button
            className="w-full"
            onClick={() => {
              setSelectedField('assignee');
              setIsOpen(true);
            }}
          >
            <div
              className={
                'flex h-[32px] w-full items-center py-2 px-5 rounded-[4px] cursor-pointer gap-x-2.5' +
                (errors.assigneeId ? ' border border-primary-4' : '')
              }
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
                      usersData?.find((user) => user.id === watch('assigneeId'))
                        ?.fullName ?? 'No Name'
                    }
                    size={'12px'}
                  />
                  <span className="text-neutro-1 ml-2 font-[500] text-nav-bar-m overflow-ellipsis whitespace-nowrap overflow-hidden">
                    {usersData?.find((user) => user.id === watch('assigneeId'))
                      ?.fullName ?? 'No Name'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-x-3">
                  <ProfileIcon className="fill-neutro-1" />
                  <h2 className="text-neutro-1 font-[500] text-nav-bar-m tracking-[0.9px] ">
                    {watch('assigneeId') || 'Assignee'}
                  </h2>
                </div>
              )}
            </div>
          </button>

          {/* due date field */}
          <button
            className="w-full"
            onClick={() => {
              setSelectedField('dueDate');
              if (!usersLoading) {
                setIsOpen(true);
              }
            }}
          >
            <div
              className={
                'flex h-[32px] w-full items-center py-2 px-4.5 rounded-[4px] cursor-pointer gap-x-2.5' +
                (errors.dueDate ? ' border border-primary-4' : '')
              }
              style={{
                backgroundColor: 'rgba(148, 151, 154, 0.1)',
              }}
            >
              {/* TODO: calendar icon must be filled one*/}
              <CalendarIcon className="fill-neutro-1" />
              <h2 className="text-neutro-1 font-[500] text-nav-bar-m tracking-[0.9px]">
                {watch('dueDate') || 'Due Date'}
              </h2>
            </div>
          </button>

          <button
            type="submit"
            className="disabled:text-neutro-4 active:scale-95 absolute top-7 right-5 py-3 px-5 text-nav-bar-l text-neutro-2 rounded-[10px] hover:scale-105 hover:bg-white/10 active:bg-neutro-5 transition-colors duration-200 "
            disabled={isSubmitting || loading || usersLoading}
          >
            {isSubmitting ? (
              <AnimatedLoading />
            ) : data ? (
              <AnimatedSuccess width={25} stroke="#70B252" />
            ) : error ? (
              <AnimatedFailed
                width={30}
                className="w-4 h-4 p-0 m-0"
                stroke="#DA584B"
              />
            ) : (
              <span>Create</span>
            )}
          </button>
        </div>
      </form>
      {isOpen && (
        <ModalTask
          className="flex"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          backgroundStyle={'bg-black/40'}
        >
          <div className="flex justify-center w-full">
            {selectedField && modalContent.get(selectedField)}
          </div>
        </ModalTask>
      )}
    </div>
  );
};
