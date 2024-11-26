import { Grid, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { formateDate } from '../../../helpers';
import payrollMessages from '../../../messages';

function DateFilter(props) {
  const {
    intl, filterList, onChange, index, column
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
              onChange={(date) => {
                if (new Date(date).toString() !== 'Invalid Date') {
                  filterList[index][0] = formateDate(date);
                  onChange(filterList[index], index, column);
                }
              }}
              label={intl.formatMessage(payrollMessages.minDate)}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: '100%' }}
              value={filterList[index][1] ? dayjs(filterList[index][1]) : null}
              onChange={(date) => {
                if (new Date(date).toString() !== 'Invalid Date') {
                  filterList[index][1] = formateDate(date);
                  onChange(filterList[index], index, column);
                }
              }}
              label={intl.formatMessage(payrollMessages.maxDate)}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  );
}

DateFilter.propTypes = {
  filterList: PropTypes.array,
  onChange: PropTypes.func,
  index: PropTypes.number,
  column: PropTypes.object,
  intl: PropTypes.object,
};

export default injectIntl(DateFilter);
