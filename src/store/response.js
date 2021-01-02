const SET_ANSWERS = 'response/SET_ANSWERS';
const SET_RELEVANT = 'response/SET_RELEVANT';
const SET_DATE = 'response/SET_DATE';

export const setAnswers = answers => ({ type: SET_ANSWERS, answers });

export const setDate = date => ({ type: SET_DATE, date });

export const setRelevant = ({ id, firstName, lastName }) => ({ type: SET_RELEVANT, id, firstName, lastName });

export const setDefaultAnswers = questions => async dispatch => {
  const answers = {};
  for (const question of questions) {
    if (question.type === 'radio') {
      answers[question.id] = true;
    } else if (question.type === 'checkbox') {
      answers[question.id] = false;
    }
  }
  dispatch(setAnswers(answers));
};

export const addAnswer = (questionId, answer) => async (dispatch, getState) => {
  const stateBefore = getState();

  const updatedResponse = stateBefore.response.answers || {};
  updatedResponse[questionId] = answer;

  dispatch(setAnswers(updatedResponse));
};

export default function responseReducer(state = {}, action) {
  switch (action.type) {
    case SET_ANSWERS:
      return { ...state, answers: action.answers };
    case SET_RELEVANT:
      return { ...state, relevant: { id: action.id, firstName: action.firstName, lastName: action.lastName } };
    case SET_DATE:
      return { ...state, date: action.date };
    default:
      return state;
  }
}
