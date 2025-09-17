import { useContext } from 'react';
import { EditTaskModalContext } from './EditTaskModalContext';

export const useEditTaskModal = () => {
  const ctx = useContext(EditTaskModalContext);
  if (!ctx)
    throw new Error(
      'useEditTaskModal must be used within EditTaskModalProvider'
    );
  return ctx;
};
