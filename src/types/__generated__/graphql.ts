import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import {
  skipToken,
  useLazyQuery,
  useMutation,
  useQuery,
  useSuspenseQuery,
  type LazyQueryHookOptions,
  type MutationHookOptions,
  type QueryHookOptions,
  type QueryResult,
  type SkipToken,
  type SuspenseQueryHookOptions,
} from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: unknown; output: unknown };
};

export type CreateTaskInput = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  dueDate: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  pointEstimate: PointEstimate;
  status: Status;
  tags: Array<TaskTag>;
};

export type DeleteTaskInput = {
  id: Scalars['String']['input'];
};

export type FilterTaskInput = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  pointEstimate?: InputMaybe<PointEstimate>;
  status?: InputMaybe<Status>;
  tags?: InputMaybe<Array<TaskTag>>;
};

export type Mutation = {
  __typename: 'Mutation';
  createTask: Task;
  deleteTask: Task;
  updateTask: Task;
};

export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};

export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};

export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};

/** Estimate point for a task */
export enum PointEstimate {
  Eight = 'EIGHT',
  Four = 'FOUR',
  One = 'ONE',
  Two = 'TWO',
  Zero = 'ZERO',
}

export type Query = {
  __typename: 'Query';
  profile: User;
  tasks: Array<Task>;
  users: Array<User>;
};

export type QueryTasksArgs = {
  input: FilterTaskInput;
};

/** Status for Task */
export enum Status {
  Backlog = 'BACKLOG',
  Cancelled = 'CANCELLED',
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO',
}

export type Task = {
  __typename: 'Task';
  assignee: Maybe<User>;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  dueDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  pointEstimate: PointEstimate;
  position: Scalars['Float']['output'];
  status: Status;
  tags: Array<TaskTag>;
};

/** Enum for tags for tasks */
export enum TaskTag {
  Android = 'ANDROID',
  Ios = 'IOS',
  NodeJs = 'NODE_JS',
  Rails = 'RAILS',
  React = 'REACT',
}

export type UpdateTaskInput = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  pointEstimate?: InputMaybe<PointEstimate>;
  position?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<Status>;
  tags?: InputMaybe<Array<TaskTag>>;
};

export type User = {
  __typename: 'User';
  avatar: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  type: UserType;
  updatedAt: Scalars['DateTime']['output'];
};

/** Type of the User */
export enum UserType {
  Admin = 'ADMIN',
  Candidate = 'CANDIDATE',
}

export type TaskFieldsFragment = {
  __typename: 'Task';
  id: string;
  name: string;
  dueDate: unknown;
  createdAt: unknown;
  pointEstimate: PointEstimate;
  position: number;
  status: Status;
  tags: Array<TaskTag>;
  assignee: {
    __typename: 'User';
    id: string;
    fullName: string;
    email: string;
    type: UserType;
  } | null;
  creator: {
    __typename: 'User';
    id: string;
    fullName: string;
    email: string;
    type: UserType;
  };
};

export type UserFieldsFragment = {
  __typename: 'User';
  id: string;
  fullName: string;
  email: string;
  type: UserType;
};

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;

export type CreateTaskMutation = {
  createTask: {
    __typename: 'Task';
    id: string;
    name: string;
    dueDate: unknown;
    createdAt: unknown;
    pointEstimate: PointEstimate;
    position: number;
    status: Status;
    tags: Array<TaskTag>;
    assignee: {
      __typename: 'User';
      id: string;
      fullName: string;
      email: string;
      type: UserType;
    } | null;
    creator: {
      __typename: 'User';
      id: string;
      fullName: string;
      email: string;
      type: UserType;
    };
  };
};

export type DeleteTaskMutationVariables = Exact<{
  input: DeleteTaskInput;
}>;

export type DeleteTaskMutation = {
  deleteTask: { __typename: 'Task'; id: string };
};

export type GetAllTasksQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllTasksQuery = {
  tasks: Array<{
    __typename: 'Task';
    id: string;
    name: string;
    dueDate: unknown;
    createdAt: unknown;
    pointEstimate: PointEstimate;
    position: number;
    status: Status;
    tags: Array<TaskTag>;
    assignee: {
      __typename: 'User';
      id: string;
      fullName: string;
      email: string;
      type: UserType;
    } | null;
    creator: {
      __typename: 'User';
      id: string;
      fullName: string;
      email: string;
      type: UserType;
    };
  }>;
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllUsersQuery = {
  users: Array<{
    __typename: 'User';
    id: string;
    fullName: string;
    email: string;
    type: UserType;
  }>;
};

export type GetMyTasksQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyTasksQuery = {
  tasks: Array<{
    __typename: 'Task';
    id: string;
    name: string;
    status: Status;
    pointEstimate: PointEstimate;
    position: number;
    dueDate: unknown;
    tags: Array<TaskTag>;
    creator: {
      __typename: 'User';
      id: string;
      fullName: string;
      avatar: string | null;
    };
    assignee: {
      __typename: 'User';
      id: string;
      fullName: string;
      avatar: string | null;
    } | null;
  }>;
};

export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    id
    fullName
    email
    type
  }
`;
export const TaskFieldsFragmentDoc = gql`
  fragment TaskFields on Task {
    id
    name
    assignee {
      ...UserFields
    }
    creator {
      ...UserFields
    }
    dueDate
    createdAt
    pointEstimate
    position
    status
    tags
  }
  ${UserFieldsFragmentDoc}
`;
export const CreateTaskDocument = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      ...TaskFields
    }
  }
  ${TaskFieldsFragmentDoc}
`;
export type CreateTaskMutationFn = Apollo.MutationFunction<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskMutation(
  baseOptions?: MutationHookOptions<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return useMutation<CreateTaskMutation, CreateTaskMutationVariables>(
    CreateTaskDocument,
    options
  );
}
export type CreateTaskMutationHookResult = ReturnType<
  typeof useCreateTaskMutation
>;
export type CreateTaskMutationResult =
  Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;
export const DeleteTaskDocument = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;
export type DeleteTaskMutationFn = Apollo.MutationFunction<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTaskMutation(
  baseOptions?: MutationHookOptions<
    DeleteTaskMutation,
    DeleteTaskMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(
    DeleteTaskDocument,
    options
  );
}
export type DeleteTaskMutationHookResult = ReturnType<
  typeof useDeleteTaskMutation
>;
export type DeleteTaskMutationResult =
  Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
>;
export const GetAllTasksDocument = gql`
  query GetAllTasks {
    tasks(input: {}) {
      ...TaskFields
    }
  }
  ${TaskFieldsFragmentDoc}
`;

/**
 * __useGetAllTasksQuery__
 *
 * To run a query within a React component, call `useGetAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTasksQuery(
  baseOptions?: QueryHookOptions<GetAllTasksQuery, GetAllTasksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return useQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(
    GetAllTasksDocument,
    options
  );
}
export function useGetAllTasksLazyQuery(
  baseOptions?: LazyQueryHookOptions<
    GetAllTasksQuery,
    GetAllTasksQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return useLazyQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(
    GetAllTasksDocument,
    options
  );
}
export function useGetAllTasksSuspenseQuery(
  baseOptions?:
    | SkipToken
    | SuspenseQueryHookOptions<GetAllTasksQuery, GetAllTasksQueryVariables>
) {
  const options =
    baseOptions === skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return useSuspenseQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(
    GetAllTasksDocument,
    options
  );
}
export type GetAllTasksQueryHookResult = ReturnType<typeof useGetAllTasksQuery>;
export type GetAllTasksLazyQueryHookResult = ReturnType<
  typeof useGetAllTasksLazyQuery
>;
export type GetAllTasksSuspenseQueryHookResult = ReturnType<
  typeof useGetAllTasksSuspenseQuery
>;
export type GetAllTasksQueryResult = QueryResult<
  GetAllTasksQuery,
  GetAllTasksQueryVariables
>;
export const GetAllUsersDocument = gql`
  query GetAllUsers {
    users {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(
  baseOptions?: QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export function useGetAllUsersLazyQuery(
  baseOptions?: LazyQueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export function useGetAllUsersSuspenseQuery(
  baseOptions?:
    | SkipToken
    | SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>
) {
  const options =
    baseOptions === skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<
  typeof useGetAllUsersLazyQuery
>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<
  typeof useGetAllUsersSuspenseQuery
>;
export type GetAllUsersQueryResult = QueryResult<
  GetAllUsersQuery,
  GetAllUsersQueryVariables
>;
export const GetMyTasksDocument = gql`
  query GetMyTasks {
    tasks(input: { assigneeId: "2c69a930-16ed-41c0-afb3-a7564471d307" }) {
      id
      name
      status
      pointEstimate
      position
      dueDate
      creator {
        id
        fullName
        avatar
      }
      assignee {
        id
        fullName
        avatar
      }
      tags
    }
  }
`;

/**
 * __useGetMyTasksQuery__
 *
 * To run a query within a React component, call `useGetMyTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyTasksQuery(
  baseOptions?: QueryHookOptions<GetMyTasksQuery, GetMyTasksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return useQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(
    GetMyTasksDocument,
    options
  );
}
export function useGetMyTasksLazyQuery(
  baseOptions?: LazyQueryHookOptions<GetMyTasksQuery, GetMyTasksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return useLazyQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(
    GetMyTasksDocument,
    options
  );
}
export function useGetMyTasksSuspenseQuery(
  baseOptions?:
    | SkipToken
    | SuspenseQueryHookOptions<GetMyTasksQuery, GetMyTasksQueryVariables>
) {
  const options =
    baseOptions === skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return useSuspenseQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(
    GetMyTasksDocument,
    options
  );
}
export type GetMyTasksQueryHookResult = ReturnType<typeof useGetMyTasksQuery>;
export type GetMyTasksLazyQueryHookResult = ReturnType<
  typeof useGetMyTasksLazyQuery
>;
export type GetMyTasksSuspenseQueryHookResult = ReturnType<
  typeof useGetMyTasksSuspenseQuery
>;
export type GetMyTasksQueryResult = QueryResult<
  GetMyTasksQuery,
  GetMyTasksQueryVariables
>;
