import axios from 'axios';
const root = process.env.API_URL || 'http://localhost:5000';

export async function createAnswer(response, question, value) {
  const res = await axios.post(`${root}/graphql`, {
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

  return res.data.data.createAnswer.id;
}

export async function createResponse(date, user, student) {
  const res = await axios.post(`${root}/graphql`, {
    query: `mutation createResponse($date: String, $user: ID, $student: ID) {
      createResponse(date: $date, user: $user, student: $student) {
        id
      }
    }`,
    variables: {
      date,
      user,
      student,
    },
  });

  return res.data.data.createResponse.id;
}

export async function handleResponse({ date, user, student, response }) {
  const responseId = await createResponse(date, user.id, student.id);

  console.log('res', responseId);

  let isCleared = true;
  let success = true;

  console.log(Object.entries(response.answers));

  for (const [questionId, value] of Object.entries(response.answers)) {
    try {
      const answerId = await createAnswer(responseId, questionId, value);

      console.log(answerId);

      const isClear = screen(user.type, questionId, value);

      if (!isClear) isCleared = false;
    } catch (err) {
      console.log(err);
      success = false;
    }
  }

  await updateResponse(responseId, { status: isCleared && success ? 'pass' : 'fail' });

  return { isCleared, success };
}

function screen(type, questionId, value) {
  if (type === 'parent') {
    if (questionId !== '5fee270e50c8a355f102a23d' && value === true) {
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

async function updateResponse(response, update) {
  await axios.post(`${root}/graphql`, {
    query: `mutation ($response:ID,$update:JSON) {
      updateResponse(response:$response, update:$update){
        id
      }
    }`,
    variables: {
      response,
      update,
    },
  });
  console.log('hitting after axios update response');
}
