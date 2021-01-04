import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      fullName
      email
      phone
      type
      children {
        id
        firstName
        lastName
        room
      }
      responses {
        id
      }
      responsesSummary
      token
      value
    }
  }
`;

export const VALIDATE_TOKEN = gql`
  mutation validateToken($token: String) {
    validateToken(token: $token) {
      id
      firstName
      lastName
      fullName
      email
      phone
      type
      children {
        id
        firstName
        lastName
        room
      }
      responses {
        id
      }
      responsesSummary
      token
      value
    }
  }
`;

export const VALIDATE_RESET_PASSWORD_TOKEN = gql`
  mutation validateResetPasswordToken($token: String) {
    validateResetPasswordToken(token: $token) {
      id
      value
    }
  }
`;

export const SET_PASSWORD = gql`
  mutation setPassword($resetPasswordToken: String, $password: String) {
    setPassword(resetPasswordToken: $resetPasswordToken, password: $password) {
      id
      firstName
      lastName
      fullName
      email
      phone
      type
      children {
        id
        firstName
        lastName
        room
      }
      responses {
        id
      }
      responsesSummary
      token
      value
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String) {
    forgotPassword(email: $email) {
      id
    }
  }
`;

export const CREATE_RESPONSE = gql`
  mutation createResponse($date: String, $user: ID, $student: ID) {
    createResponse(date: $date, user: $user, student: $student) {
      id
    }
  }
`;
