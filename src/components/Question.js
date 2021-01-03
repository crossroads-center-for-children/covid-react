import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import {
  Box,
  Button,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { addAnswer, setRelevant, setDate } from '../store/response';
import { useDispatch } from 'react-redux';

export default function Question({ question, user }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [value, setValue] = useState(true);

  const relevantPerson = useSelector(state => state.response.relevant) || false;

  useEffect(() => {
    if (question.type === 'date') {
      dispatch(setDate(selectedDate));
    }
  }, [selectedDate, dispatch, question]);

  const handleChange = e => {
    const value = e.target.value === 'true' ? true : false;
    setValue(value);
    dispatch(addAnswer(question.id, value));
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    dispatch(setDate(date));
  };

  const handleCheck = e => {
    setChecked(e.target.checked);
    dispatch(addAnswer(question.id, e.target.checked));
  };

  const handleSelect = e => {
    dispatch(setRelevant(e.target.value));
  };

  if (question.type !== 'select' && !relevantPerson) return null;

  if (question.type === 'select' && relevantPerson) return null;

  if (question.type)
    return (
      <Box style={{ margin: 10 }}>
        {question.type === 'date' ? (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify='flex-start'>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline'
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        ) : question.type === 'checkbox' ? (
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleCheck} color='primary' />}
              label={<Typography style={{ fontFamily: 'Roboto', color: '#212121' }}>{question.question}</Typography>}
            />
          </FormGroup>
        ) : question.type === 'radio' ? (
          <FormControl style={{ width: '100%' }}>
            <FormLabel>
              {
                <Typography style={{ fontFamily: 'Roboto', color: '#212121' }}>
                  {Object.keys(relevantPerson).length > 0
                    ? question.question.replace('your child', relevantPerson.firstName)
                    : question.question}
                </Typography>
              }
            </FormLabel>

            <RadioGroup
              row
              aria-label='position'
              name='position'
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 5,
              }}
              value={value}
              onChange={handleChange}>
              <FormControlLabel value={true} control={<Radio color='primary' />} label='Yes' labelPlacement='start' />
              <FormControlLabel value={false} control={<Radio color='primary' />} label='No' labelPlacement='start' />
            </RadioGroup>
          </FormControl>
        ) : user.type === 'parent' ? (
          <FormControl>
            <InputLabel style={{ maxWidth: '100%', minWidth: '50%' }}>{question.question}</InputLabel>
            <Select value={relevantPerson} style={{ minWidth: 200 }} onChange={handleSelect}>
              {user.children.map(child => (
                <MenuItem value={child}>{`${child.firstName} ${child.lastName}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <FormControl>
            <InputLabel>{question.question}</InputLabel>
            <Select value={relevantPerson}>
              <MenuItem value={user}>{`${user.firstName} ${user.lastName}`}</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>
    );
}
