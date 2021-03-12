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

export const RESET_PASSWORD = gql`
  mutation resetPassword($resetPasswordToken: String, $password: String) {
    resetPassword(resetPasswordToken: $resetPasswordToken, password: $password) {
      id
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

export const CREATE_USER = gql`
  mutation createUser($firstName: String, $lastName: String, $email: String, $phone: String, $type: String) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, type: $type) {
      id
      firstName
      lastName
      email
      phone
    }
  }
`;

export const CREATE_STUDENT = gql`
  mutation createStudent($firstName: String, $lastName: String, $room: String, $tags: JSON, $parents: JSON) {
    createStudent(firstName: $firstName, lastName: $lastName, room: $room, tags: $tags, parents: $parents) {
      id
    }
  }
`;
