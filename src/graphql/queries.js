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
