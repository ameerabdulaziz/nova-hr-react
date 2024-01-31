import { Box, Stack, Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import DetailedAttendanceHeaderEmp from './DetailedAttendanceComponents/DetailedAttendanceHeaderEmp'; 
import DetailedAttendanceHeaderDate from './DetailedAttendanceComponents/DetailedAttendanceHeaderDate'; 
import DetailedAttendanceTable from './DetailedAttendanceComponents/DetailedAttendanceTable'; 
import DetailedAttendanceFooter from './DetailedAttendanceComponents/DetailedAttendanceFooter'; 
import messages from "../Attendance/messages";
import { useSelector } from 'react-redux';

function DetailedAttendanceReportTemplate(props) {

  const { intl } = props;

  const company = useSelector((state) => state.authReducer.companyInfo);

  const [employeeHeaders, setEmployeeHeaders] = useState([
    intl.formatMessage(messages.day), 
    intl.formatMessage(messages.date) , 
    intl.formatMessage(messages.signIn) , 
    intl.formatMessage(messages.signOut) , 
    intl.formatMessage(messages.workingHours) , 
    intl.formatMessage(messages.lateness),
    intl.formatMessage(messages.OverTime), 
    intl.formatMessage(messages.lessTime), 
    intl.formatMessage(messages.leave), 
    intl.formatMessage(messages.mission), 
    intl.formatMessage(messages.permission), 
    intl.formatMessage(messages.weekend) ,
    intl.formatMessage(messages.absence), 
    intl.formatMessage(messages.Manual)
  ])

    const [dateHeaders, setDateHeaders] = useState([
      intl.formatMessage(messages.EmpCode), 
      intl.formatMessage(messages.employeeName), 
      intl.formatMessage(messages.signIn), 
      intl.formatMessage(messages.signOut), 
      intl.formatMessage(messages.workingHours), 
      intl.formatMessage(messages.lateness),
      intl.formatMessage(messages.OverTime), 
      intl.formatMessage(messages.lessTime), 
      intl.formatMessage(messages.leave), 
      intl.formatMessage(messages.mission), 
      intl.formatMessage(messages.permission), 
      intl.formatMessage(messages.weekend) ,
      intl.formatMessage(messages.absence)
    ])


  return (
    <>
      <Box
        ref={props.printDivRef}
        sx={{
          display: 'none',
          '@media print': {
            display: 'block',
            direction: "ltr"
          },
        }}
      >
        <Stack spacing={2} mb={2}>
          <Avatar src={company?.logo} variant="square" />
        </Stack>

            {props.data.map((empData,index)=>(
                <div key={index}>
                  {  props.headerType === "employee" && (  <DetailedAttendanceHeaderEmp Data={empData} date={props.date} /> ) }
                  {  props.headerType === "date" && (  <DetailedAttendanceHeaderDate Data={empData} date={props.date} /> ) }
                  
                  <DetailedAttendanceTable header={props.headerType === "date" ? dateHeaders   : employeeHeaders } Data={empData.details} headerType={props.headerType} />
                  <DetailedAttendanceFooter  Data={empData} />
              </div>
            ))}
        
      </Box>
    </>
  );
}

DetailedAttendanceReportTemplate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(DetailedAttendanceReportTemplate);
