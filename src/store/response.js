const SET_RESPONSE = 'response/SET_RESPONSE';

export const setResponse = response => ({ type: SET_RESPONSE, response });

export const addAnswer = (questionId, answer) => async (dispatch, getState) => {
  const stateBefore = getState();

  const updatedResponse = stateBefore.response;

  updatedResponse[questionId] = answer;

  dispatch(setResponse(updatedResponse));
};

export default function responseReducer(state = {}, action) {
  switch (action.type) {
    case SET_RESPONSE:
      return { ...action.response };
    default:
      return state;
  }
}
