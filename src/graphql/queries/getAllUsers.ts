import { gql } from '@apollo/client';
import { USER_FIELDS } from '../fragments/userFields';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;
