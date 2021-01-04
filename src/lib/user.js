import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const root = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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

export async function validateResetPasswordToken(resetPasswordToken) {
  try {
    const res = await axios.post(`${root}/graphql`, {
      query: `query($resetPasswordToken:String) {
        user(where:{resetPasswordToken:$resetPasswordToken}){
          id
        }
      }`,
      variables: {
        resetPasswordToken: resetPasswordToken,
      },
    });

    const user = await res.data.data.user;

    if (!user) throw new Error('Link is invalid or has expired.');

    return { success: true, userId: user.id };
  } catch (err) {
    console.log(err);
    return { success: false, err };
  }
}

export async function resetPassword(password, passwordConfirmation, code) {
  try {
    const res = await axios.post(`${root}/graphql`, {
      query: `mutation($resetPa)`,
    });

    const { data } = await res;
    const { user, jwt } = data;
    return { user, jwt };
  } catch (err) {
    console.log(err);
  }
}

export async function setPassword(password, resetPasswordToken) {
  try {
    const res = await axios.post(`${root}/graphql`, {
      query: `
      mutation ($resetPasswordToken:String, $password:String){
        setPassword(resetPasswordToken:$resetPasswordToken, password:$password){
          id
          fullName
        }
      }
      `,
      variables: {
        resetPasswordToken,
        password,
      },
    });
    console.log('hitting');

    console.log(res);

    return { success: true };
  } catch (err) {
    console.log('hitting fail', err);
    return { success: false, err };
  }
}
