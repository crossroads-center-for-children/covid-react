import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, Checkbox, Paper, TextField, Typography } from '@material-ui/core';
import Question from '../components/Question';
import { handleResponse } from '../lib/response';
import puzzlepiece from '../puzzlepiece.png';
import { navbarHeight } from '../components/Navbar';

export default function Covid() {
  const history = useHistory();
  const user = useSelector(state => state.auth.user) || false;
  const [summary, setSummary] = useState({});
  const [questions, setQuestions] = useState([]);

  const root = process.env.API_URL || 'http://localhost:1337';
  const response = useSelector(state => state.response);

  const date = new Date();
  const yearIdx = date.getYear() + 1900;
  const dateIdx = date.getDate();
  const monthIdx = date.getMonth() + 1;

  useEffect(() => {
    if (!user) history.push('/login');
    if (user.type === 'admin') history.push('/admin');
    if (
      user.summary &&
      user.summary[yearIdx] &&
      user.summary[yearIdx][monthIdx] &&
      user.summary[yearIdx][monthIdx][dateIdx]
    )
      history.push('/dashboard');
  }, [user, history, yearIdx, dateIdx, monthIdx]);

  useEffect(() => {
    const url = `${root}/graphql`;

    (async () => {
      const data = await axios.post(url, {
        query: `query ($type:String){
              questionnaires(where:{type:$type}){
                id
                questions {
                  id
                  question
                  type
                }
              }
            }`,
        variables: {
          type: user.type,
        },
      });

      const questions = (await data).data.data.questionnaires[0].questions;
      setQuestions(questions);
    })();
  }, [root, user]);

  const handleSubmit = async () => {
    const success = await handleResponse(user.id, response);
    if (success) history.push('/success');
  };

  if (questions.length === 0) return null;

  return (
    <Box
      style={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: navbarHeight,
        paddingTop: 20,
        backgroundColor: '#f5f5f5',
      }}>
      <Paper
        style={{
          minWidth: 300,
          maxWidth: 500,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <img src={puzzlepiece} style={{ width: 150 }} />
        <Typography variant='h5' style={{ fontWeight: 'bold', fontFamily: 'Roboto', textAlign: 'center' }}>
          COVID-19 Questionnaire
        </Typography>
        <Box>
          {questions.map(question => (
            <Question question={question} />
          ))}
        </Box>

        <Button onClick={handleSubmit} variant='contained' fullWidth size='large' color='primary'>
          Submit
        </Button>
      </Paper>
    </Box>
  );
}
