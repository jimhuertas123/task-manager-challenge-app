import { gql } from '@apollo/client';
import { TASK_FIELDS } from '../fragments/tasksFields';

export const GET_ALL_TASKS = gql`
  query GetAllTasks($input: FilterTaskInput!) {
    tasks(input: $input) {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`;
