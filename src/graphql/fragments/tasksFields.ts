import { gql } from '@apollo/client';
import { USER_FIELDS } from './userFields';

//tags can be: ANDROID, IOS, NODE_JS, RAILS and REACT
//status can be: "BACKLOG", "CANCELLED", "DONE", IN_PROGRESS", "TODO",
//pointEstimate : EIGHT, FOUR, ONE, TWO, ZERO
export const TASK_FIELDS = gql`
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
  ${USER_FIELDS}
`;
