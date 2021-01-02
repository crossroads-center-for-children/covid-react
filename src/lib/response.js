import axios from 'axios';
const root = process.env.API_URL || 'http://localhost:5000';

export async function createAnswer(response, question, value) {
  await axios.post(`${root}/graphql`, {
    query: `mutation ($response:ID,$question:ID,$value:Boolean) {
      createAnswer(response:$response, question:$question, value:$value){
        id
      }
    }`,
    variables: {
      response,
      question,
      value,
    },
  });
}

export async function handleResponse(user, response, responseId) {
  let isCleared = true;
  let success = true;
  console.log(Object.entries(response.answers));

  for (const [questionId, value] of Object.entries(response.answers)) {
    try {
      await createAnswer(responseId, questionId, value);

      const isClear = screen(user.type, questionId, value);

      if (!isClear) isCleared = false;
    } catch (err) {
      console.log(err);
      success = false;
    }
  }

  return { isCleared, success };
}

function screen(type, questionId, value) {
  if (type === 'parent') {
    if (questionId !== '5fee247835e1c2536bbb0ed0' && value === true) {
      return false;
    }
    return true;
  } else {
    if (questionId !== '5fee247835e1c2536bbb0ed1' && value === true) {
      return false;
    }
    return true;
  }
}
