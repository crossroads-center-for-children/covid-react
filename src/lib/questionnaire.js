import axios from 'axios';
const root = process.env.API_URL || 'http://localhost:5000';

export async function getQuestionnaireByType(type) {
  const res = await axios.post(`${root}/graphql`, {
    query: `query GET_QUESTIONNAIRE_BY_TYPE ($type: QuestionnaireType) {
      questionnaire(where:{type:$type}){
        id
        type
        questions {
          id
          question
          type
        }
      }
    }`,
    variables: {
      type: type,
    },
  });

  console.log(res.data.data.questionnaire);
}
