import React, { useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TableCell from '@mui/material/TableCell';
import css from 'enl-styles/Table.scss';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const useStyles = makeStyles()(() => ({
  datepicker: {
    '& button': {
      top: 0
    }
  }
}));

function DatePickerCell(props) {
  const { classes, cx } = useStyles();
  const theme = useTheme();
  const {
    edited,
    cellData,
    branch,
    updateRow,
    setDateError
  } = props;

  const [state] = useState({
    event: {
      target: {
        name: cellData.type, // eslint-disable-line
        value: cellData.value, // eslint-disable-line
      }
    }
  });

  const handleDateChange = useCallback(date => {
    const { event } = state;
    event.target.value = date;
    console.log("event =", event);
    updateRow(event, branch);
  }, [updateRow, branch]);

  const { event } = state;
  return (
    <TableCell textalign="center" className={classes.datepicker}>


        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
          name={cellData.type}
            value={event.target.value ? dayjs(event.target.value) : null}
            className={cx(css.crudInput, theme.palette.mode === 'dark' ? css.lightTxt : css.darkTxt, cellData.disabled ? css.crudInputId : null)}
            disabled={cellData.disabled ? true : !edited}
            onChange={(date) => {
              handleDateChange(date)
          }}
          onError={(error,value)=>{
            if(error !== null)
            {
              setDateError((prevState) => ({
                  ...prevState,
                    [`valueDate`]: true
                }))
            }
            else
            {
              setDateError((prevState) => ({
                  ...prevState,
                    [`valueDate`]: false
                }))
            }
          }}
          />
      </LocalizationProvider>
    </TableCell>
  );
}

DatePickerCell.propTypes = {
  cellData: PropTypes.object.isRequired,
  updateRow: PropTypes.func.isRequired,
  edited: PropTypes.bool.isRequired,
  branch: PropTypes.string.isRequired,
};

export default DatePickerCell;
