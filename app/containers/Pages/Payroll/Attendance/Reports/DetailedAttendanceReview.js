
import React, { useEffect, useState } from "react";
import {
    Box,
  } from '@mui/material';
  import { useSelector } from 'react-redux';
  import style from '../../../../../styles/pagesStyle/DetailedAttendanceReportTemplateSty.scss'
  import ApiData from "../api/AttendanceReportsData";
  import { injectIntl } from 'react-intl';
  import DetailedAttendanceHeaderEmp from '../../reports-templates/DetailedAttendanceComponents/DetailedAttendanceHeaderEmp'; 
import DetailedAttendanceHeaderDate from '../../reports-templates/DetailedAttendanceComponents/DetailedAttendanceHeaderDate'; 
import DetailedAttendanceTable from '../../reports-templates/DetailedAttendanceComponents/DetailedAttendanceTable'; 
import DetailedAttendanceFooter from '../../reports-templates/DetailedAttendanceComponents/DetailedAttendanceFooter'; 
import messages from "../messages";


const PaymentSlipReview = (props) => {

    const [data, setData] = useState([]);
    const [sessionData, setSessionData] = useState([]);
    const locale = useSelector((state) => state.language.locale);
    const { intl } = props;
    

    const [employeeHeaders, setEmployeeHeaders] = useState([
        intl.formatMessage(messages.day), 
        intl.formatMessage(messages.date) , 
        intl.formatMessage(messages.signIn) , 
        intl.formatMessage(messages.signOut) , 
        intl.formatMessage(messages.workingHours) , 
        intl.formatMessage(messages.lateness),
        intl.formatMessage(messages.detailedAttendanceOverTime), 
        intl.formatMessage(messages.lessTime), 
        intl.formatMessage(messages.leave), 
        intl.formatMessage(messages.mission), 
        intl.formatMessage(messages.permission), 
        intl.formatMessage(messages.detailedAttendanceWeekend) ,
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
          intl.formatMessage(messages.detailedAttendanceOverTime), 
          intl.formatMessage(messages.lessTime), 
          intl.formatMessage(messages.leave), 
          intl.formatMessage(messages.mission), 
          intl.formatMessage(messages.permission), 
          intl.formatMessage(messages.detailedAttendanceWeekend) ,
          intl.formatMessage(messages.absence)
        ])




    const reviewDataFun = async () => {

        try {
       
          await ApiData(locale).DetailedAttendanceReportApi(sessionData.formData)
          .then(res =>{         
            setData(res)
          })
        } catch (err) {            
        } finally {
        }
      };


      useEffect(()=>{
        if(sessionData.length !== 0)
        {
          reviewDataFun()
        }
      },[sessionData])


      useEffect(()=>{

        if(sessionData.length === 0)
        {
          setSessionData(JSON.parse(sessionStorage.getItem("Review")))
        }


      },[JSON.parse(sessionStorage.getItem("Review"))])


      
    return (
        <>
        {sessionData.length !== 0 && (
          <Box>
              {data.map((empData,index)=>(
                
                  <div className={style.reviewContainerSty} key={index} >
                    {  sessionData.headerType === "employee" && (  <DetailedAttendanceHeaderEmp Data={empData} date={sessionData.searchData} /> ) }
                    {  sessionData.headerType === "date" && (  <DetailedAttendanceHeaderDate Data={empData} date={sessionData.searchData} /> ) }
                    
                    <DetailedAttendanceTable header={sessionData.headerType === "date" ? dateHeaders   : employeeHeaders } Data={empData.details} headerType={sessionData.headerType} />
                    {sessionData.headerType === "employee" && ( <DetailedAttendanceFooter  Data={empData} /> )}
                </div>
              ))}
      
           </Box>
        )}

      </>
    )
}



export default injectIntl(PaymentSlipReview);