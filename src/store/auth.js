import axios from 'axios';
const root = process.env.API_URL || 'http://localhost:1337';
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
  const endpoint = '/auth/local';
  const res = await axios.post(`${root}${endpoint}`, { identifier, password });

  const { jwt, user } = (await res).data;
  localStorage.setItem('token', jwt);
  dispatch(setToken(jwt));
  dispatch(setUser(user));
  return jwt;
};

export const validateToken = token => async dispatch => {
  const endpoint = '/users/me';

  try {
    const res = await axios.get(`${root}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await res.data;

    dispatch(setToken(token));
    dispatch(setUser(user));

    return true;
  } catch (err) {
    dispatch(reset());

    return false;
  }
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
