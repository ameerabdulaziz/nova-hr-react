import {
  Box, Chip, Popover, Stack, Typography
} from '@mui/material';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import payrollMessages from '../../messages';
import api from '../api/TrainingCalenderData';

function TrainingCalender(props) {
  const { intl } = props;

  const currentDate = new Date();
  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const [groupedDocuments, setGroupedDocuments] = useState({});
  const [anchorExtraEl, setAnchorExtraEl] = useState({});

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

  function groupEventsByDate(events) {
    const groupedEvents = {};

    events.forEach((event) => {
      const fromDate = new Date(event.fromDate);
      const toDate = new Date(event.toDate);

      // Loop through dates between fromDate and toDate
      const dates = [];
      const today = new Date(fromDate);
      while (today <= toDate) {
        dates.push(new Date(today));
        today.setDate(today.getDate() + 1);
      }

      dates.forEach((date) => {
        const dateString = date.getDate();
        if (!groupedEvents[dateString]) {
          groupedEvents[dateString] = [];
        }
        // Check if an event with the same docType exists for this date
        // const sameDocTypeEventExists = groupedEvents[dateString].some(existingEvent => existingEvent.docType === event.docType);
        // if (!sameDocTypeEventExists) {
        groupedEvents[dateString].push(event);
        // }
      });
    });

    return groupedEvents;
  }

  const fetchNeededData = async () => {
    try {
      setIsLoading(true);

      const documents = await api(locale).getList();

      setGroupedDocuments(groupEventsByDate(documents));
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const getCurrentDayLabel = (day) => {
    if (currentDate.getDate() === day) {
      return (
        <Chip
          size='small'
          label={day}
        
        />
      );
    }

    return <div> {day}</div>;
  };

  const getDividerByDay = (day) => {
    if (!groupedDocuments[day]) {
      return null;
    }

    return (
      <Divider
        orientation='vertical'
        flexItem
        sx={{
          borderColor: 'rgb(156, 39, 176)',
          height: '20px',
          borderWidth: '2px',
          cursor: 'pointer',
        }}
      />
    );
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

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
            height: '80px',
            width: '80px',
            verticalAlign: 'unset',
            border: '1px solid #e0f2f1',
          }}
        >
          {i + 1}
        </TableCell>
      );
    }

    // Add current month's days
    for (let i = 0; i < daysInMonth; i++) {
      const day = i + 1;

      days.push(
        <TableCell
          key={`current-${day}`}
          sx={{
            height: '80px',
            width: '80px',
            border: '1px solid #e0f2f1',
            verticalAlign: 'unset',
          }}
        >
          <Box
            onClick={(evt) => {
              setAnchorExtraEl((prev) => ({
                ...prev,
                [day]: evt.currentTarget,
              }));
            }}
            sx={{cursor: 'pointer'}}
          >
            {getCurrentDayLabel(day)}

            {groupedDocuments[day] && (
              <>
                <Stack spacing='3px' direction='row'>
                  {getDividerByDay(day)}
                </Stack>

                <Popover
                  anchorEl={anchorExtraEl[day]}
                  open={Boolean(anchorExtraEl[day])}
                  onClose={() => setAnchorExtraEl((prev) => ({ ...prev, [day]: null }))
                  }
                >
                  <Stack
                    sx={{
                      padding: '10px',
                      maxHeight: '500px',
                      overflowY: 'auto',
                    }}
                    direction='column'
                    spacing='5px'
                  >
                    {groupedDocuments[day].map((item, index) => (
                      <Stack
                        direction='row'
                        alignItems='center'
                        spacing={1}
                        key={index}
                      >
                        <Typography variant='body1'>{locale === 'en' ? item.arName : item.enName}</Typography>

                        <Typography variant='body2' color='gray'>
                          {item.courseName}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Popover>
              </>
            )}
          </Box>
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
            height: '80px',
            width: '80px',
            border: '1px solid #e0f2f1',
            verticalAlign: 'unset',
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

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        title={`${
          monthNames[currentDate.getMonth()]
        } ${currentDate.getFullYear()}`}
        icon='contacts'
        whiteBg
        noMargin
        desc=''
      >
        <TableContainer>
          <Table sx={{ mb: '0!important' }}>
            <TableHead>
              <TableRow>
                {dayNames.map((day, dayIndex) => (
                  <TableCell key={dayIndex} sx={{border: '1px solid #e0f2f1', padding: '5px 10px'}} >
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{generateCalendar()}</TableBody>
          </Table>
        </TableContainer>
      </PapperBlock>
    </PayRollLoader>
  );
}

TrainingCalender.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TrainingCalender);
