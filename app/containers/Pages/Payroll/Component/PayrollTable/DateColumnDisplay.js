/**
 * @file DateColumnDisplay.js
 * @description Component to render date filter display for the table.
 */

import { Grid, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React from 'react';
import PropTypes from 'prop-types';

const DateColumnDisplay = (props) => {
  const {
    filterList, onChange, index, column
  } = props;

  return (
    <>
      <Typography variant='subtitle1' color='gray' mb={1}>
        {column.label}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: '100%' }}
              value={filterList[index][0] ? dayjs(filterList[index][0]) : null}
              onChange={(event) => {
                filterList[index][0] = event
                  ? dayjs(event).format('MM/DD/YYYY')
                  : null;
                onChange(filterList[index], index, column);
              }}
              label='Min Date'
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: '100%' }}
              value={filterList[index][1] ? dayjs(filterList[index][1]) : null}
              onChange={(event) => {
                filterList[index][1] = event
                  ? dayjs(event).format('MM/DD/YYYY')
                  : null;
                onChange(filterList[index], index, column);
              }}
              label='Max Date'
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  );
};

DateColumnDisplay.propTypes = {
  filterList: PropTypes.array,
  onChange: PropTypes.func,
  index: PropTypes.number,
  column: PropTypes.object
};

export default DateColumnDisplay;
