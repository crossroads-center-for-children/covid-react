import axios from 'axios';
const root = process.env.API_URL || 'http://localhost:1337';

export async function createResponse(userId) {
  const res = await axios.post(`${root}/responses`, {
    datetime: new Date(),
    user: userId,
  });

  return await res.data.id;
}

export async function createAnswer(response, question, value) {
  await axios.post(`${root}/answers`, {
    response,
    question,
    value,
  });
}

export async function handleResponse(userId, response) {
  const responseId = await createResponse(userId);

  for (const [questionId, value] of Object.entries(response)) {
    await createAnswer(responseId, questionId, value);
  }

  return true;
}
