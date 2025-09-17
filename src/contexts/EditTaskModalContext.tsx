import { createContext, useState } from 'react';
import type { TaskFieldsFragment } from '@/__generated__/graphql';

type EditTaskModalContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  task: TaskFieldsFragment | null;
  setTask: (task: TaskFieldsFragment | null) => void;
};

const EditTaskModalContext = createContext<
  EditTaskModalContextType | undefined
>(undefined);

export const EditTaskModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<TaskFieldsFragment | null>(null);

  return (
    <EditTaskModalContext.Provider value={{ open, setOpen, task, setTask }}>
      {children}
    </EditTaskModalContext.Provider>
  );
};
export { EditTaskModalContext };
