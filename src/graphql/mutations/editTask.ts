import { gql } from '@apollo/client';

export const EDIT_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      ...TaskFields
    }
  }
`;
