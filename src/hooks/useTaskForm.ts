import { useFormContext } from 'react-hook-form';
import { useMutation } from '@apollo/client/react';
import { useEffect, useRef } from 'react';
import { newTaskDataSchema, type NewTaskData } from '@/schema/schemaNewTask';
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
import {
  numberToPointEstimate,
  pointEstimateToNumber,
} from '@/components/features/FormNewTask/TaskFields/EstimateField/pointEstimate';
import { normalizeUTCDate } from '@/components/features/FormNewTask';

export function useTaskForm({
  onClose,
  defaultValues,
  usersData,
}: {
  onClose: () => void;
  defaultValues?: TaskFieldsFragment | null;
  usersData?: { users: UserFieldsFragment[] };
}) {
  const {
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isValid, errors: formErrors },
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

  const prevDefaults = useRef<NewTaskData | undefined>(undefined);

  useEffect(() => {
    const currentDefaults = {
      name: defaultValues?.name ?? '',
      assigneeId:
        usersData?.users.find(
          (user) =>
            user.id ===
            (defaultValues?.assignee as UserFieldsFragment | undefined)?.id
        )?.id || '',
      dueDate: defaultValues ? normalizeUTCDate(defaultValues.dueDate) : '',
      estimate: defaultValues
        ? (pointEstimateToNumber(defaultValues.pointEstimate) as
            | ''
            | '0'
            | '1'
            | '2'
            | '4'
            | '8')
        : ('' as NewTaskData['estimate']),
      tags: defaultValues?.tags ?? [],
    };

    if (
      JSON.stringify(prevDefaults.current) !== JSON.stringify(currentDefaults)
    ) {
      reset(currentDefaults);
      prevDefaults.current = currentDefaults;
    }
  }, [defaultValues, usersData, reset]);

  const onSubmit = async (data: NewTaskData) => {
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
              tags: validatedData.tags as TaskTag[],
            },
          },
          update: (cache, { data }) => {
            const existing = cache.readQuery<{ tasks: TaskFieldsFragment[] }>({
              query: GetAllTasksDocument,
              variables: { input: {} },
            });
            if (!existing || !data?.updateTask) return;
            cache.writeQuery({
              query: GetAllTasksDocument,
              variables: { input: {} },
              data: {
                tasks: existing.tasks.map((task) =>
                  task.id === (data.updateTask as TaskFieldsFragment).id
                    ? data.updateTask
                    : task
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
            variables: { input: {} },
          });
          if (!existing || !data?.createTask) return;
          cache.writeQuery({
            query: GetAllTasksDocument,
            variables: { input: {} },
            data: {
              tasks: [data.createTask, ...existing.tasks],
            },
          });
        },
      });
    } catch (errorCatch) {
      throw new Error((errorCatch as Error)?.message);
    }
  };

  return {
    watch,
    setValue,
    formErrors,
    handleSubmit,
    reset,
    isSubmitting,
    isValid,
    data,
    loading,
    error,
    editData,
    loadingEdit,
    errorEdit,
    onSubmit,
  };
}
