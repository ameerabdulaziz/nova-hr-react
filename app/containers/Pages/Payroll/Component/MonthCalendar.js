import { Chip, Stack } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import PapperBlock from '../../../../components/PapperBlock/PapperBlock';
import payrollMessages from '../messages';

const EXAMPLE_DATA = [
  {
    title: 'Sample Title 1',
    description: 'This is the description for sample title 1.',
    id: 1,
    date: '2024-01-02',
  },
];

function MonthCalendar(props) {
  const { intl } = props;

  const [currentDate, setCurrentDate] = useState(new Date());

  const dayNames = [
    intl.formatMessage(payrollMessages.sunday),
    intl.formatMessage(payrollMessages.monday),
    intl.formatMessage(payrollMessages.tuesday),
    intl.formatMessage(payrollMessages.wednesday),
    intl.formatMessage(payrollMessages.thursday),
    intl.formatMessage(payrollMessages.friday),
    intl.formatMessage(payrollMessages.saturday),
  ];

  const monthNames = [
    intl.formatMessage(payrollMessages.january),
    intl.formatMessage(payrollMessages.february),
    intl.formatMessage(payrollMessages.march),
    intl.formatMessage(payrollMessages.april),
    intl.formatMessage(payrollMessages.may),
    intl.formatMessage(payrollMessages.june),
    intl.formatMessage(payrollMessages.july),
    intl.formatMessage(payrollMessages.august),
    intl.formatMessage(payrollMessages.september),
    intl.formatMessage(payrollMessages.october),
    intl.formatMessage(payrollMessages.november),
    intl.formatMessage(payrollMessages.december),
  ];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const organizedData = EXAMPLE_DATA.reduce((prev, current) => {
      const day = new Date(current.date).getDate();
      if (!prev[day]) {
        prev[day] = [];
      }
      prev[day].push(current);
      return prev;
    }, {});

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];

    // Add previous month's days
    const previousMonthDays = getDaysInMonth(year, month - 1);

    for (
      let i = previousMonthDays - firstDayOfMonth;
      i < previousMonthDays;
      i++
    ) {
      days.push(
        <TableCell
          key={`prev-${i}`}
          sx={{
            color: '#999',
            height: '50px',
            width: '50px',
            px: 0,
            verticalAlign: 'unset',
          }}
        >
          {i + 1}
        </TableCell>
      );
    }

    // Add current month's days
    for (let i = 0; i < daysInMonth; i++) {
      days.push(
        <TableCell
          key={`current-${i}`}
          sx={{
            height: '50px',
            width: '50px',
            px: 0,
            verticalAlign: 'unset',
          }}
        >
          {/* TODO: Handel if data is larger, show only 3 maybe with modal */}
          <div> {i + 1}</div>
          {organizedData[i + 1] && (
            <Stack direction='column' spacing='3px'>
              {organizedData[i + 1].map((item) => (
                <div key={item.id}>
                  <Chip
                    size='small'
                    label={item.title}
                    variant='outlined'
                    sx={{
                      height: 'auto',
                      '& .MuiChip-label': {
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        maxWidth: '50px',
                        fontSize: '10px',
                      },
                    }}
                  />
                </div>
              ))}
            </Stack>
          )}
        </TableCell>
      );
    }

    // Add next month's days
    const remainingDays = 7 - (days.length % 7);
    for (let i = 0; i < remainingDays; i++) {
      days.push(
        <TableCell
          key={`next-${i}`}
          sx={{
            color: '#999',
            height: '50px',
            width: '50px',
            verticalAlign: 'unset',
            px: 0,
          }}
        >
          {i + 1}
        </TableCell>
      );
    }

    const weeks = [];
    let week = [];

    days.forEach((day, index) => {
      if (index % 7 === 0 && index !== 0) {
        weeks.push(
          <TableRow key={`${weeks.length}-${index}`}>{week}</TableRow>
        );
        week = [];
      }
      week.push(day);
    });

    weeks.push(
      <TableRow key={`${weeks.length}-${days.length}`}>{week}</TableRow>
    );

    return weeks;
  };

  // const onPrevClick = ()=>{
  //   setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  // }

  // const onNextClick = ()=>{
  //   setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  // }

  return (
    <PapperBlock
      title={`${
        monthNames[currentDate.getMonth()]
      } ${currentDate.getFullYear()}`}
      icon='contacts'
      whiteBg
      noMargin
      desc=''
    >
      {/* <button onClick={onPrevClick} >prev</button>
      <button onClick={onNextClick}>next</button> */}

      <TableContainer>
        <Table size='small' sx={{ mb: 0 }} >
          <TableHead>
            <TableRow>
              {dayNames.map((day, dayIndex) => (
                <TableCell sx={{ px: 0, fontSize: '12px' }} key={dayIndex}>
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{generateCalendar()}</TableBody>
        </Table>
      </TableContainer>
    </PapperBlock>
  );
}

MonthCalendar.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(MonthCalendar);
