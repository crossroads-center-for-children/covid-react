import axios from 'axios';
const root = process.env.API_URL || 'http://localhost:5000';
const SET_TOKEN = 'auth/SET_TOKEN';
const SET_USER = 'auth/SET_USER';
const RESET_STATE = 'auth/RESET';

const initialState = {
  token: localStorage.getItem('token'),
};

export const setToken = token => ({ type: SET_TOKEN, token });
export const setUser = user => ({ type: SET_USER, user });

export const resetState = () => ({ type: RESET_STATE });

export const reset = () => async dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(resetState());
};

export const login = ({ identifier, password }) => async dispatch => {
  console.log(identifier, password);
  const endpoint = '/auth/local';
  const res = await axios.post(`${root}${endpoint}`, { identifier, password });
  console.log(res);
  const { jwt, user } = (await res).data;
  localStorage.setItem('token', jwt);
  dispatch(setToken(jwt));
  dispatch(setUser(user));
  return jwt;
};

export const validateToken = async token => {
  console.log('going to validate token');
  const endpoint = '/users/me';

  try {
    const res = await axios.get(`${root}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await res.data;

    console.log(user);

    return { valid: true, id: user.id };
  } catch (err) {
    return { valid: false };
  }
};

export const loadUser = token => async dispatch => {
  console.log(token);
  const res = await validateToken(token);

  const { valid, id } = res;

  if (valid) {
    console.log(valid);
    console.log(id);
    const user = await getUser(id);
    console.log(user);
    dispatch(setUser(user));
    return true;
  } else {
    return false;
  }
};

export const getUser = async id => {
  const res = await axios.post(`${root}/graphql`, {
    query: `query ($id:ID){
      users(where:{id:$id}){
        id
        firstName
        lastName
        email
        summary
        fullName
        type
        children{
          id
          firstName
          lastName
        }
      }
    }`,
    variables: {
      id: id,
    },
  });

  return res.data.data.users[0];
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.token };
    case SET_USER:
      return { ...state, user: action.user };

    default:
      return state;
  }
}
