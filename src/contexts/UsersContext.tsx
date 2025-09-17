import React, { createContext } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  GetAllUsersDocument,
  type GetAllUsersQuery,
  type GetAllUsersQueryVariables,
} from '@/__generated__/graphql';

interface UsersContextValue {
  data: GetAllUsersQuery | undefined;
  loading: boolean;
  error: Error | undefined;
  refetch: (() => void) | undefined;
}

const UsersContext = createContext<UsersContextValue | undefined>(undefined);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, loading, error, refetch } = useQuery<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >(GetAllUsersDocument, { fetchPolicy: 'cache-first' });

  return (
    <UsersContext.Provider value={{ data, loading, error, refetch }}>
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext };
