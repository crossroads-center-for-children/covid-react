import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { Box, Button, Checkbox, Paper, TextField, Typography } from '@material-ui/core';
import Question from '../../components/Question';
import puzzlepiece from '../../images/puzzlepiece.png';
import { navbarHeight } from '../../components/Navbar';
import { useQuery, useMutation } from '@apollo/client';
import { GET_QUESTIONNAIRE_BY_TYPE } from '../../graphql/queries';
import { CREATE_RESPONSE } from '../../graphql/mutations';
import { setDefaultAnswers } from '../../store/response';

export default function Covid() {
  // const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user) || false;
  const response = useSelector(state => state.response);

  const [questions, setQuestions] = useState([]);

  const { loading, error, data } = useQuery(GET_QUESTIONNAIRE_BY_TYPE, {
    variables: { type: 'parent' },
  });

  const [createResponse] = useMutation(CREATE_RESPONSE, {
    onCompleted(data) {
      const { id } = data.createResponse;

      // history.push({
      //   pathname: '/covid/processing',
      //   state: { user, response, responseId: id },
      // });
    },
    onError(err) {
      console.log(err);
    },
  });

  // useEffect(() => {
  //   if (user.type === 'admin') history.push('/admin');
  // }, [user, history]);

  useEffect(() => {
    if (data) {
      const questions = [data.questionnaire.questions[0], { type: 'date' }, ...data.questionnaire.questions.slice(1)];
      setQuestions(questions);
      console.log(questions);
      dispatch(setDefaultAnswers(questions));
    }
  }, [data]);

  if (loading || !user) return null;

  if (error) console.log(error.message);

  const handleSubmit = () => {
    createResponse({
      variables: {
        date: new Date(response.date),
        user: user.id,
        student: response.relevant.id,
      },
    });
  };

  return (
    <Box
      style={{
        // width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: navbarHeight,
        padding: 10,
      }}>
      <Paper
        style={{
          minWidth: 300,
          maxWidth: 600,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <img src={puzzlepiece} style={{ width: 100 }} />
        <Typography variant='h6' style={{ fontWeight: 'bold', fontFamily: 'Roboto', textAlign: 'center' }}>
          COVID-19 Questionnaire
        </Typography>
        <Box>
          {questions.map(question => (
            <Question question={question} user={user} />
          ))}
        </Box>

        <Button
          onClick={handleSubmit}
          variant='contained'
          fullWidth
          size='large'
          color='primary'
          disabled={
            response.hasOwnProperty('answers') &&
            (response.answers['5fee247835e1c2536bbb0ed1'] === true ||
              response.answers['5fee270e50c8a355f102a23d'] === true)
              ? false
              : true
          }>
          Submit
        </Button>
      </Paper>
    </Box>
  );
}
