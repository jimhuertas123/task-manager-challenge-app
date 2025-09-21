import { UsersContext } from '@/contexts/UsersContext';
import { useContext } from 'react';

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
}
