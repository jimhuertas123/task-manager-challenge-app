import { TasksContext } from '@/contexts/SearchTaskContext';
import { useContext } from 'react';

export const useTasks = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used within a TasksProvider');
  return ctx;
};
