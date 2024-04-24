import {
  Box,
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
  const [anchorExtraEl, setAnchorExtraEl] = useState(null);

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

  const getCurrentDayLabel = (day) => {
    if (currentDate.getDate() === day) {
      return (
        <Chip
          size='small'
          label={day}
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
      );
    }

    return <div> {day}</div>;
  };

  const getDividerByDay = (day) => {
    if (!groupedDocuments[day]) {
      return null;
    }

    const slicedDocuments = groupedDocuments[day].length > 10
      ? groupedDocuments[day].slice(0, 10)
      : groupedDocuments[day];

    return slicedDocuments.map((item, index) => (
      <HRDivider action={item} key={index} />
    ));
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
      const day = i + 1;

      days.push(
        <TableCell
          key={`current-${day}`}
          sx={{
            height: '50px',
            width: '50px',
            px: 0,
            verticalAlign: 'unset',
          }}
        >
          {getCurrentDayLabel(day)}

          {groupedDocuments[day] && (
            <>
              <Stack spacing='3px' direction='row'>
                {getDividerByDay(day)}
              </Stack>

              {groupedDocuments[day].length > 10 && (
                <>
                  <div
                    style={{
                      fontSize: '11px',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                    onClick={(evt) => {
                      setAnchorExtraEl(evt.currentTarget);
                    }}
                  >
                    +{groupedDocuments[day].length - 10}{' '}
                    {intl.formatMessage(payrollMessages.more)}
                  </div>

                  <Popover
                    anchorEl={anchorExtraEl}
                    open={Boolean(anchorExtraEl)}
                    onClose={() => setAnchorExtraEl(null)}
                    disableRestoreFocus
                  >
                    <Stack
                      sx={{
                        padding: '10px',
                        width: '200px',
                        maxHeight: '400px',
                        overflowY: 'auto',
                      }}
                      direction='column'
                      spacing={1}
                    >
                      {groupedDocuments[day].map((item, index) => (
                        <Box key={index}>
                          <Typography>{item.title}</Typography>
                          <Typography variant='body1' color='gray'>
                            {item.details}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Popover>
                </>
              )}
            </>
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
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <Card sx={{ p: '8px !important' }}>
          <CardContent>
            <Typography>{action.title}</Typography>
            <Typography variant='body1' color='gray'>
              {action.details}
            </Typography>
          </CardContent>
        </Card>
      </Popover>

      <Divider
        orientation='vertical'
        flexItem
        onClick={(evt) => {
          setAnchorEl(evt.currentTarget);
        }}
        sx={{
          borderColor: 'error.main', // TODO: create function for get color by docType
          height: '10px',
          borderWidth: '2px',
          cursor: 'pointer',
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
