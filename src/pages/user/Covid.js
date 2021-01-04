import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Checkbox, Grid, Paper, TextField, Typography } from '@material-ui/core';
import Question from '../../components/Question';
import puzzlepiece from '../../images/puzzlepiece.png';
import { navbarHeight } from '../../components/Navbar';
import { useQuery, useMutation } from '@apollo/client';
import { GET_QUESTIONNAIRE_BY_TYPE } from '../../graphql/queries';
import { CREATE_RESPONSE } from '../../graphql/mutations';
import { setDefaultAnswers } from '../../store/response';
import { handleResponse } from '../../lib/response';
import GridLoader from 'react-spinners/GridLoader';

export default function Covid() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user) || false;
  const response = useSelector(state => state.response);
  const [showLoading, setShowLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const answers = useSelector(state => state.response.answers);

  const { loading, error, data } = useQuery(GET_QUESTIONNAIRE_BY_TYPE, {
    variables: { type: user.type },
  });

  const [createResponse] = useMutation(CREATE_RESPONSE, {
    onCompleted(data) {
      const { id } = data.createResponse;

      navigate('/a/covid/processing', { state: { user, response, responseId: id } });
    },
    onError(err) {
      console.log(err);
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      const questions = [data.questionnaire.questions[0], { type: 'date' }, ...data.questionnaire.questions.slice(1)];
      setQuestions(questions);
      dispatch(setDefaultAnswers(questions));
    }
  }, [data, dispatch]);

  if (loading || !user) return null;

  if (error) console.log(error.message);

  const handleSubmit = () => {
    setShowLoading(true);
    initResponse();
  };

  const initResponse = async () => {
    const { isCleared, success } = await handleResponse({
      date: new Date(response.date),
      user: user,
      student: response.relevant,
      response,
    });

    console.log(isCleared, success);

    if (isCleared && success) navigate('/a/covid/pass');
    if (!isCleared && success) navigate('/a/covid/fail');
    if (!success) navigate('/a/covid/error');
  };

  if (showLoading) {
    return (
      <Grid
        container
        direction='column'
        justify='flex-start'
        alignItems='center'
        style={{
          width: '100vw',
          minHeight: `calc(100vh - 75px)`,
          backgroundColor: '#171c28',
          marginTop: 75,
          paddingTop: 75,
        }}>
        <GridLoader loading={showLoading} size={30} color={'#B39DDB'} />
      </Grid>
    );
  }

  return (
    <Box
      style={{
        // width: '100vw',
        backgroundColor: '#171c28',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: navbarHeight,
        padding: 30,
        paddingBottom: 50,
        minHeight: `calc(100vh - ${navbarHeight}px - 80px)`,
      }}>
      <Paper
        style={{
          // minWidth: 300,
          // maxWidth: 600,
          maxHeight: '100%',
          overflowY: 'auto',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography variant='h6' style={{ fontWeight: 'bold', fontFamily: 'Roboto', textAlign: 'center' }}>
          COVID-19 Screener
        </Typography>
        <Box style={{ margin: 10 }}>
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
            (response.answers['5fee270e50c8a355f102a23d'] === true ||
              response.answers['5fee270f50c8a355f102a245'] === true)
              ? false
              : true
          }>
          Submit
        </Button>
      </Paper>
    </Box>
  );
}
