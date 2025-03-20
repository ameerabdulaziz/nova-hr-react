import {
    Box, Chip, Stack, Typography, Grid
  } from '@mui/material';
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
  import PayRollLoaderInForms from '../../../Component/PayRollLoaderInForms';
  import payrollMessages from '../../../messages';
  import useStyles from '../../../Style';
  import EmployeeDataSmall from "../../../Component/EmployeeDataSmall";
  import api from '../../api/EmployeeScheduleData';
  import EmployeeSchedulePopup from '../../components/EmployeeSchedule/EmployeeSchedulePopup';
  
  function EmployeeSchedule(props) {
    const { intl } = props;
  
    const { classes } = useStyles();
  
    const currentDate = new Date();
    const locale = useSelector((state) => state.language.locale);
    const { branchId = null } = useSelector((state) => state.authReducer.user);
    const Thema = useSelector((state) => state.ui.type);
    const [isLoading, setIsLoading] = useState(false);
    const [calendarShiftsData, setCalendarShiftsData] = useState({});
    const [EmployeeId, setEmployeeId] = useState("");
    const [EmployeeName, setEmployeeName] = useState("");
    const [BranchId, setBranchId] = useState(branchId);
    const [open, setOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState();
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
  
    const getCurrentDayLabel = (day) => {
      if (currentDate.getDate() === day) {
        return <Chip size='small' label={day} className={classes['bg-theme']} />;
      }
  
      return <Box sx={{ fontSize: '15px' }}> {day}</Box>;
    };
  
    const getShiftByDay = (day) => {
      if (!calendarShiftsData[day]) {
        return null;
      }
  
      return (
        <Stack spacing='3px'>
          {
            <Typography
              key={calendarShiftsData[day].shiftId}
              sx={{
                fontSize: '11px',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                width: '100px',
              }}
            >
              {calendarShiftsData[day].shiftName}
            </Typography>
          }
        </Stack>
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
              border: '1px solid #d5d5d5',
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
              border: '1px solid #d5d5d5',
              verticalAlign: 'unset',
            }}
            style={{backgroundColor:calendarShiftsData[day - 1] && calendarShiftsData[day - 1].isWeekEnd ? `${Thema == "dark" ? "rgb(73 73 73)" :"#efefef"}`  : ""} }
          >
            <Box
              onClick={(evt) => {
                handleClickOpen(calendarShiftsData[day - 1])
              }}
              sx={{ cursor: 'pointer' }}
            >
              {getCurrentDayLabel(day)}
  
              {getShiftByDay(day - 1)}

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
              border: '1px solid #d5d5d5',
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


    const handleEmpChange = (id, nameKey ,name) => {
      setEmployeeId(id);
      setEmployeeName(name)
    }

    const GetEmployeeShiftCalendarFun = async () => {

      try
      {
        const paramData = {
          EmployeeId : EmployeeId
        }
        const response = await api(locale).GetList(paramData);

        setCalendarShiftsData(response)
        
      }
      catch(err)
      {}
    }


    useEffect(()=>{
      if(EmployeeId !== "")
      {
        GetEmployeeShiftCalendarFun()
      }
      else
      {
        setCalendarShiftsData({})
      }
    },[EmployeeId])


    const handleClickOpen = (dayData) => {
      setSelectedDay(dayData)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <PayRollLoaderInForms isLoading={isLoading}>
        <PapperBlock
          title={`${
            monthNames[currentDate.getMonth()]
          } ${currentDate.getFullYear()}`}
          icon='contacts'
          whiteBg
          noMargin
          desc=''
        >
          <Grid item xs={12} md={11} lg={10.5} xl={7}>
            <EmployeeDataSmall
              handleEmpChange={handleEmpChange}
              id={EmployeeId}
              branchId={BranchId}
            ></EmployeeDataSmall>
          </Grid>

          <TableContainer>
            <Table sx={{ mb: '0!important' }}>
              <TableHead>
                <TableRow>
                  {dayNames.map((day, dayIndex) => (
                    <TableCell
                      key={dayIndex}
                      sx={{ border: '1px solid white', padding: '5px 10px', textAlign: 'center' }}
                      className={classes['bg-theme']}
                    >
                      {day}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{generateCalendar()}</TableBody>
            </Table>
          </TableContainer>


          <EmployeeSchedulePopup 
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
          selectedDay={selectedDay}
          EmployeeId={EmployeeId}
          EmployeeName={EmployeeName}
          GetEmployeeShiftCalendarFun={GetEmployeeShiftCalendarFun}
          />
        </PapperBlock>
      </PayRollLoaderInForms>
    );
  }
  
  EmployeeSchedule.propTypes = {
    intl: PropTypes.object.isRequired,
  };
  
  export default injectIntl(EmployeeSchedule);
  