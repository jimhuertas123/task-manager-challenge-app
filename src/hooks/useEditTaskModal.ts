import { EditTaskModalContext } from '@/contexts/EditTaskModalContext';
import { useContext } from 'react';

export const useEditTaskModal = () => {
  const ctx = useContext(EditTaskModalContext);
  if (!ctx)
    throw new Error(
      'useEditTaskModal must be used within EditTaskModalProvider'
    );
  return ctx;
};
