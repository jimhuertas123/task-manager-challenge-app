import { newTaskDataSchema, type NewTaskData } from '@/schema/schemaNewTask';

import {
  AnimatedFailed,
  AnimatedLoading,
  AnimatedSuccess,
} from '@/assets/icons';
import { useFormContext } from 'react-hook-form';

import {
  numberToPointEstimate,
  pointEstimateToNumber,
} from '@/components/features/FormNewTask/TaskFields/EstimateField/pointEstimate';
import {
  CreateTaskDocument,
  GetAllTasksDocument,
  Status,
  TaskTag,
  UpdateTaskDocument,
  type CreateTaskMutation,
  type CreateTaskMutationVariables,
  type TaskFieldsFragment,
  type UpdateTaskMutation,
  type UpdateTaskMutationVariables,
  type UserFieldsFragment,
} from '@/__generated__/graphql';
import { useMutation } from '@apollo/client/react';
import {
  EstimateField,
  AssigneeField,
  TitleLabelField,
  LabelTagField,
  DueDateField,
  normalizeUTCDate,
} from './';
import { useUsers } from '@/contexts/useUsers';
import { useEffect } from 'react';

export const FormNewTask = ({
  onClose,
  defaultValues,
}: {
  onClose: () => void;
  defaultValues?: TaskFieldsFragment | null;
}) => {
  const {
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useFormContext<NewTaskData>();

  const [createTask, { data, loading, error }] = useMutation<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >(CreateTaskDocument, {
    onCompleted: () => {
      reset();
      setTimeout(() => {
        onClose();
      }, 1000);
    },
  });

  const [editTask, { data: editData, loading: loadingEdit, error: errorEdit }] =
    useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(
      UpdateTaskDocument,
      {
        onCompleted: () => {
          reset();
          setTimeout(() => {
            onClose();
          }, 1000);
        },
      }
    );

  //TODO: CREATE AN ERROR STATE IF USERS QUERY FAILS
  const { data: usersData, loading: usersLoading } = useUsers();

  useEffect(() => {
    const usersDataNormalize = usersData as
      | { users: UserFieldsFragment[] }
      | undefined;
    const defaultValueAssigneeUser = defaultValues?.assignee as
      | UserFieldsFragment
      | undefined;

    if (defaultValues) {
      setValue('name', defaultValues.name);
      setValue(
        'assigneeId',
        usersDataNormalize?.users.find(
          (user) => user.id === defaultValueAssigneeUser?.id
        )?.id || ''
      );
      setValue('dueDate', normalizeUTCDate(defaultValues.dueDate));
      setValue('estimate', pointEstimateToNumber(defaultValues.pointEstimate));
      setValue('tags', defaultValues.tags);
    }
  }, [defaultValues, setValue, usersData]);

  const onSubmit = async (data: NewTaskData) => {
    //validates if default data is iqual as the props of the form to avoid unnecessary mutation
    if (
      defaultValues &&
      defaultValues.name === data.name &&
      (defaultValues as { assignee: UserFieldsFragment | undefined }).assignee
        ?.id === data.assigneeId &&
      normalizeUTCDate(defaultValues.dueDate) === data.dueDate &&
      pointEstimateToNumber(defaultValues.pointEstimate) === data.estimate &&
      JSON.stringify(defaultValues.tags) === JSON.stringify(data.tags)
    ) {
      return;
    }

    try {
      const validatedData = newTaskDataSchema.parse(data);

      if (defaultValues && defaultValues.id) {
        await editTask({
          variables: {
            input: {
              id: defaultValues.id,
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
            if (!existing || !data?.updateTask || data.__typename === undefined)
              return;
            const updatedTask = data.updateTask as TaskFieldsFragment;
            cache.writeQuery({
              query: GetAllTasksDocument,
              data: {
                tasks: existing.tasks.map((task) =>
                  task.id === updatedTask.id ? updatedTask : task
                ),
              },
            });
          },
        });

        return;
      }

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
        <div className="w-full h-[50px] flex flex-col mb-3">
          <TitleLabelField />
        </div>

        <div className="grid grid-cols-[auto_22%_22%_26%] w-full gap-x-4">
          {/* estimate field */}
          <div className="w-full max-w-full">
            <EstimateField />
          </div>

          {/* assignee field */}
          <div className="w-full max-w-full">
            <AssigneeField
              usersData={usersData?.users as UserFieldsFragment[] | undefined}
            />
          </div>

          {/* label field */}
          <div className="w-full max-w-full">
            <LabelTagField />
          </div>

          {/* due date field */}
          <div className="w-full max-w-full">
            <DueDateField />
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
            disabled={
              !isValid || isSubmitting || loading || usersLoading || loadingEdit
            }
          >
            {isSubmitting ? (
              <AnimatedLoading />
            ) : data || editData ? (
              <AnimatedSuccess stroke="white" />
            ) : error || errorEdit ? (
              <AnimatedFailed className="w-4 h-4 p-0 m-0" stroke="white" />
            ) : (
              <span>{defaultValues ? 'modify' : 'create'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
