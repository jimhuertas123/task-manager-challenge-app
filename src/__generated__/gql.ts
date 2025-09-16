/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment TaskFields on Task {\n    id\n    name\n    assignee {\n      ...UserFields\n    }\n    creator {\n      ...UserFields\n    }\n    dueDate\n    createdAt\n    pointEstimate\n    position\n    status\n    tags\n  }\n  \n": typeof types.TaskFieldsFragmentDoc,
    "\n  fragment UserFields on User {\n    id\n    fullName\n    email\n    type\n  }\n": typeof types.UserFieldsFragmentDoc,
    "\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      ...TaskFields\n    }\n  }\n  \n": typeof types.CreateTaskDocument,
    "\n  mutation DeleteTask($input: DeleteTaskInput!) {\n    deleteTask(input: $input) {\n      id\n    }\n  }\n": typeof types.DeleteTaskDocument,
    "\n  query GetAllTasks {\n    tasks(input: {}) {\n      ...TaskFields\n    }\n  }\n  \n": typeof types.GetAllTasksDocument,
    "\n  query GetAllUsers {\n    users {\n      ...UserFields\n    }\n  }\n  \n": typeof types.GetAllUsersDocument,
    "\n    query GetMyTasks {\n      tasks(input: { assigneeId: \"2c69a930-16ed-41c0-afb3-a7564471d307\" }) {\n        id\n        name\n        status\n        pointEstimate\n        position\n        dueDate\n        creator {\n          id\n          fullName\n          avatar\n        }\n        assignee {\n          id\n          fullName\n          avatar\n        }\n        tags\n      }\n    }\n  ": typeof types.GetMyTasksDocument,
};
const documents: Documents = {
    "\n  fragment TaskFields on Task {\n    id\n    name\n    assignee {\n      ...UserFields\n    }\n    creator {\n      ...UserFields\n    }\n    dueDate\n    createdAt\n    pointEstimate\n    position\n    status\n    tags\n  }\n  \n": types.TaskFieldsFragmentDoc,
    "\n  fragment UserFields on User {\n    id\n    fullName\n    email\n    type\n  }\n": types.UserFieldsFragmentDoc,
    "\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      ...TaskFields\n    }\n  }\n  \n": types.CreateTaskDocument,
    "\n  mutation DeleteTask($input: DeleteTaskInput!) {\n    deleteTask(input: $input) {\n      id\n    }\n  }\n": types.DeleteTaskDocument,
    "\n  query GetAllTasks {\n    tasks(input: {}) {\n      ...TaskFields\n    }\n  }\n  \n": types.GetAllTasksDocument,
    "\n  query GetAllUsers {\n    users {\n      ...UserFields\n    }\n  }\n  \n": types.GetAllUsersDocument,
    "\n    query GetMyTasks {\n      tasks(input: { assigneeId: \"2c69a930-16ed-41c0-afb3-a7564471d307\" }) {\n        id\n        name\n        status\n        pointEstimate\n        position\n        dueDate\n        creator {\n          id\n          fullName\n          avatar\n        }\n        assignee {\n          id\n          fullName\n          avatar\n        }\n        tags\n      }\n    }\n  ": types.GetMyTasksDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment TaskFields on Task {\n    id\n    name\n    assignee {\n      ...UserFields\n    }\n    creator {\n      ...UserFields\n    }\n    dueDate\n    createdAt\n    pointEstimate\n    position\n    status\n    tags\n  }\n  \n"): (typeof documents)["\n  fragment TaskFields on Task {\n    id\n    name\n    assignee {\n      ...UserFields\n    }\n    creator {\n      ...UserFields\n    }\n    dueDate\n    createdAt\n    pointEstimate\n    position\n    status\n    tags\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UserFields on User {\n    id\n    fullName\n    email\n    type\n  }\n"): (typeof documents)["\n  fragment UserFields on User {\n    id\n    fullName\n    email\n    type\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      ...TaskFields\n    }\n  }\n  \n"): (typeof documents)["\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      ...TaskFields\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteTask($input: DeleteTaskInput!) {\n    deleteTask(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteTask($input: DeleteTaskInput!) {\n    deleteTask(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllTasks {\n    tasks(input: {}) {\n      ...TaskFields\n    }\n  }\n  \n"): (typeof documents)["\n  query GetAllTasks {\n    tasks(input: {}) {\n      ...TaskFields\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllUsers {\n    users {\n      ...UserFields\n    }\n  }\n  \n"): (typeof documents)["\n  query GetAllUsers {\n    users {\n      ...UserFields\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetMyTasks {\n      tasks(input: { assigneeId: \"2c69a930-16ed-41c0-afb3-a7564471d307\" }) {\n        id\n        name\n        status\n        pointEstimate\n        position\n        dueDate\n        creator {\n          id\n          fullName\n          avatar\n        }\n        assignee {\n          id\n          fullName\n          avatar\n        }\n        tags\n      }\n    }\n  "): (typeof documents)["\n    query GetMyTasks {\n      tasks(input: { assigneeId: \"2c69a930-16ed-41c0-afb3-a7564471d307\" }) {\n        id\n        name\n        status\n        pointEstimate\n        position\n        dueDate\n        creator {\n          id\n          fullName\n          avatar\n        }\n        assignee {\n          id\n          fullName\n          avatar\n        }\n        tags\n      }\n    }\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;