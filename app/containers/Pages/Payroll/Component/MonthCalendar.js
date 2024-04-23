import {
  Card,
  CardContent,
  Chip,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PapperBlock from '../../../../components/PapperBlock/PapperBlock';
import api from '../Dashboard/api';
import payrollMessages from '../messages';
import PayRollLoader from './PayRollLoader';

function MonthCalendar(props) {
  const { intl } = props;

  const currentDate = new Date();
  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const [groupedDocuments, setGroupedDocuments] = useState({});

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

  const fetchNeededData = async () => {
    try {
      setIsLoading(true);

      const documents = await api(locale).GetCalendarData();

      const groupedByDayNumber = {};

      documents.forEach((doc) => {
        const key = new Date(doc.date).getDate();

        if (!groupedByDayNumber[key]) {
          groupedByDayNumber[key] = [];
        }
        groupedByDayNumber[key].push(doc);
      });

      setGroupedDocuments(groupedByDayNumber);
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
          {currentDate.getDate() === i + 1 ? (
            <Chip
              size='small'
              label={i + 1}
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
          ) : (
            <div> {i + 1}</div>
          )}
          {groupedDocuments[i + 1] && (
            <Stack direction='column' spacing='3px'>
              {groupedDocuments[i + 1].map((item, index) => (
                <HRDivider action={item} key={index} />
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
        {/* <button onClick={onPrevClick} >prev</button>
      <button onClick={onNextClick}>next</button> */}

        <TableContainer>
          <Table size='small'>
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
    </PayRollLoader>
  );
}
const HRDivider = (props) => {
  const { action } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Popover
        sx={{
          pointerEvents: 'none',
        }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        disableRestoreFocus
      >
        <Card sx={{ p: '8px !important' }}>
          <CardContent>
            <Typography>{action.title}</Typography>
            <Typography>{action.details}</Typography>
          </CardContent>
        </Card>
      </Popover>

      <Divider
        onMouseEnter={(evt) => {
          setAnchorEl(evt.currentTarget);
        }}
        onMouseLeave={() => {
          setAnchorEl(null);
        }}
        sx={{
          borderColor: 'error.main', // TODO: create function for get color by docType
          borderWidth: '2px',
        }}
      />
    </>
  );
};

MonthCalendar.propTypes = {
  intl: PropTypes.object.isRequired,
};

HRDivider.propTypes = {
  action: PropTypes.object.isRequired,
};

export default injectIntl(MonthCalendar);
