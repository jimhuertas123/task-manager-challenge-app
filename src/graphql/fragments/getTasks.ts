import { gql } from '@apollo/client';

//tags can be: ANDROID, IOS, NODE_JS, RAILS and REACT
//status can be: "BACKLOG", "CANCELLED", "DONE", IN_PROGRESS", "TODO",
//pointEstimate : EIGHT, FOUR, ONE, TWO, ZERO

export const GET_ALL_TASKS = gql`
  query GetAllTasks {
    tasks(input: {}) {
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
