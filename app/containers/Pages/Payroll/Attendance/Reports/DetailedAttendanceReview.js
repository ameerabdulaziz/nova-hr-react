
import React, { useEffect, useState } from "react";
import {
    Box,
  } from '@mui/material';
  import DecryptUrl from "../../Component/DecryptUrl";
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

    const empid = DecryptUrl();
    const [data, setData] = useState([]);
    const locale = useSelector((state) => state.language.locale);
    const { intl } = props;
    

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




    const reviewDataFun = async () => {

        try {
       
          await ApiData(locale).DetailedAttendanceReportApi(empid.formData)
          .then(res =>{         
            setData(res)
          })
        } catch (err) {            
        } finally {
        }
      };


      useEffect(()=>{
        reviewDataFun()
      },[])


    return (
        <>
        
        <Box>
            {data.map((empData,index)=>(
                <div className={style.reviewContainerSty} key={index} >
                  {  empid.headerType === "employee" && (  <DetailedAttendanceHeaderEmp Data={empData} date={empid.searchData} /> ) }
                  {  empid.headerType === "date" && (  <DetailedAttendanceHeaderDate Data={empData} date={empid.searchData} /> ) }
                  
                  <DetailedAttendanceTable header={empid.headerType === "date" ? dateHeaders   : employeeHeaders } Data={empData.details} headerType={empid.headerType} />
                  {empid.headerType === "employee" && ( <DetailedAttendanceFooter  Data={empData} /> )}
              </div>
            ))}
        
      </Box>
      </>
    )
}



export default injectIntl(PaymentSlipReview);