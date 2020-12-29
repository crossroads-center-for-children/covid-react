import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const root = process.env.API_URL || 'http://localhost:1337';

export async function getUserFromEmail(email) {
  const res = await axios.post(`${root}/graphql`, {
    query: `query GET_USER_FROM_EMAIL ($email:String) {
      users(where:{email:$email}){
        id
      }
    }`,
    variables: {
      email: email,
    },
  });

  return (await res).data.data.users[0].id;
}

export async function getUserFromResetToken(resetToken) {
  const res = await axios.post(`${root}/graphql`, {
    query: `query ($resetToken:String){
      users (where:{resetToken:$resetToken}) {
        id
      }
    }`,
    variables: {
      resetToken: resetToken,
    },
  });

  console.log(await res);

  return (await res).data.data.users[0].id;
}

export async function updateUserSummary(userId, summary) {}

export async function setResetPasswordToken(id) {
  console.log(id);
  const uuid = uuidv4();
  console.log(uuid);

  try {
    const res = await axios.post(`${root}/graphql`, {
      query: `mutation ($id:ID!, $token:String!){
        updateUser(input:{where:{id:$id}, data:{resetToken:$token}}){
          user{
            id
            resetToken
            email
          }
      }
}`,
      variables: {
        id: id,
        token: uuid,
      },
    });

    return (await res).data.data.updateUser.user;
  } catch (err) {
    console.log(err);
  }
}

export async function resetPassword(userId, password) {
  try {
    const res = await axios.post(`${root}/graphql`, {
      query: `mutation ($id:ID!, $password:String!) {
        updateUser(input:{where:{id:$id}, data:{password:$password, resetToken:null}}){
          user{
            id
            resetToken
            email
          }
        }
      }`,
      variables: {
        id: userId,
        password: password,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
