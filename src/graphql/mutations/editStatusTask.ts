import { gql } from '@apollo/client';

export const EDIT_STATUS_TASK = gql`
  mutation EditStatusTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      status
      position
    }
  }
`;
