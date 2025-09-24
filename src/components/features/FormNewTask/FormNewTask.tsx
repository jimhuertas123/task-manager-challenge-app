import {
  AnimatedFailed,
  AnimatedLoading,
  AnimatedSuccess,
} from '@/assets/icons';

import {
  type TaskFieldsFragment,
  type UserFieldsFragment,
} from '@/__generated__/graphql';
import {
  EstimateField,
  AssigneeField,
  TitleLabelField,
  LabelTagField,
  DueDateField,
} from './';
import { useUsers } from '@/hooks/useUsers';
import { useTaskForm } from '@/hooks/useTaskForm';

export const FormNewTask = ({
  onClose,
  defaultValues,
}: {
  onClose: () => void;
  defaultValues?: TaskFieldsFragment | null;
}) => {
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useUsers();

  const {
    handleSubmit,
    isSubmitting,
    data,
    error,
    editData,
    errorEdit,
    onSubmit,
  } = useTaskForm({
    onClose,
    defaultValues,
    usersData: usersData?.users
      ? { users: usersData.users as UserFieldsFragment[] }
      : undefined,
  });

  if (usersLoading) {
    return (
      <div className="flex w-full h-[156.5px] justify-center items-center">
        <AnimatedLoading />
      </div>
    );
  }

  return (
    <div className="flex w-full focus:outline-none focus:ring-0">
      <form
        className="flex w-full flex-col"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          id="title"
          aria-label="Title"
          tabIndex={0}
          className="w-full h-[50px] flex flex-col mb-3"
        >
          <TitleLabelField />
        </div>

        <div className="grid grid-cols-[auto_22%_22%_26%] w-full gap-x-4">
          {/* estimate field */}
          <div
            id="estimate"
            aria-label="Estimate"
            className="w-full max-w-full"
          >
            <EstimateField />
          </div>

          {/* assignee field */}
          {!usersError ? (
            <div
              id="assignee"
              aria-label="Assignee"
              tabIndex={0}
              className="w-full max-w-full"
            >
              <AssigneeField
                usersData={usersData?.users as UserFieldsFragment[] | undefined}
              />
            </div>
          ) : (
            <div id="assignee-error">
              <p className="text-primary-4">!Error users</p>
            </div>
          )}
          {/* label field */}
          <div
            id="tag-label"
            aria-label="Tag Label"
            tabIndex={0}
            className="w-full max-w-full"
          >
            <LabelTagField />
          </div>

          {/* due date field */}
          <div
            id="due-date"
            aria-label="Due Date"
            tabIndex={0}
            className="w-full max-w-full"
          >
            <DueDateField />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-x-2">
          <button
            id="cancel-button"
            aria-label="Cancel"
            tabIndex={0}
            className="hover:bg-white/10 hover:bg-opacity-80 py-2 px-4 rounded-[8px] text-neutro-1 text-nav-bar-m"
            type="button"
            onClick={onClose}
          >
            cancel
          </button>
          <button
            id="submit-button"
            aria-label="Submit"
            tabIndex={0}
            className="flex text-nav-bar-m min-w-20 max-h-[40px] bg-primary-4 justify-center text-neutro-1 py-2 px-4 rounded-[8px] disabled:opacity-50 hover:scale-105 active:scale-95 transition-all duration-200"
            type="submit"
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
