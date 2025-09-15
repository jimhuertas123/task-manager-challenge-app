import { gql } from '@apollo/client';
import { TASK_FIELDS } from '../fragments/tasksFields';

export const ADD_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`;
