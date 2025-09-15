import { gql } from '@apollo/client';
import { TASK_FIELDS } from '../fragments/tasksFields';

export const EDIT_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`;
