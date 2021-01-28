import { gql } from '@apollo/client';

export const GET_QUESTIONNAIRE_BY_TYPE = gql`
  query($type: QuestionnaireType) {
    questionnaire(where: { type: $type }) {
      questions {
        id
        question
        type
      }
    }
  }
`;

export const GET_RESPONSES_LIMIT = gql`
  query($limit: Int, $page: Int) {
    responses(limit: $limit, page: $page) {
      id
      submitted
      date
      user
      answers {
        id
        value
        question
      }
      student
      status
    }
  }
`;

export const GET_STUDENTS_LIMIT = gql`
  query($limit: Int, $page: Int) {
    students(limit: $limit, page: $page) {
      id
      firstName
      lastName
      active
      room
      tags
      responses {
        id
      }
    }
  }
`;

export const GET_CLINICAL_STAFF = gql`
  query($type: UserType) {
    users(where: { type: $type }) {
      id
      firstName
      lastName
      email
      responses {
        id
      }
    }
  }
`;

export const GET_PARENTS = gql`
  query($type: UserType) {
    users(where: { type: $type }) {
      id
      firstName
      lastName
      email
      phone
      responses {
        id
      }
      children {
        id
        firstName
        lastName
        room
        tags
      }
    }
  }
`;

export const GET_SCREENINGS_TODAY = gql`
  query($date: String) {
    responses(where: { date: $date }) {
      id
      submitted
      date
      user
      answers {
        id
        value
        question
      }
      student
      status
    }
  }
`;
