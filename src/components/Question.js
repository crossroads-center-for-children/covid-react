import React, { useEffect, useState } from 'react';
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
  Typography,
} from '@material-ui/core';
import { addAnswer } from '../store/response';
import { useDispatch } from 'react-redux';

export default function Question({ question }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const handleChange = e => {
    setChecked(e.target.checked);
    dispatch(addAnswer(question.id, e.target.checked));
  };

  return (
    <Box style={{ margin: 10 }}>
      {question.type === 'checkbox' ? (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} color='primary' />}
            label={<Typography style={{ fontFamily: 'Roboto', color: '#212121' }}>{question.question}</Typography>}
          />
        </FormGroup>
      ) : (
        <FormControl style={{ width: '100%' }}>
          <FormLabel>
            {<Typography style={{ fontFamily: 'Roboto', color: '#212121' }}>{question.question}</Typography>}
          </FormLabel>

          <RadioGroup
            row
            aria-label='position'
            name='position'
            defaultValue='top'
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingRight: 5,
            }}>
            <FormControlLabel value='top' control={<Radio color='primary' />} label='Yes' labelPlacement='start' />
            <FormControlLabel value='start' control={<Radio color='primary' />} label='No' labelPlacement='start' />
          </RadioGroup>
        </FormControl>
      )}
    </Box>
  );
}
