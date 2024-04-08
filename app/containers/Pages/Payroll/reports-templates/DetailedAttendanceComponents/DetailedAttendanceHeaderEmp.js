import { Grid, Stack } from '@mui/material';
  import React from 'react';
  import style from "../../../../../styles/pagesStyle/DetailedAttendanceReportTemplateSty.scss";
  import { useSelector } from "react-redux";
  import { format } from "date-fns";
  import messages from "../../Attendance/messages";
  import {  FormattedMessage } from "react-intl";
  import { formateDate } from "../../helpers";

  
  function DetailedAttendanceHeaderEmp({Data,date}) {

    const locale = useSelector((state) => state.language.locale);
    const company = useSelector((state) => state.authReducer.companyInfo);

    return (
      <div className={style.headerContainer}>
         <Stack spacing={2} mb={2}>
          <div>
            <img src={company?.logo} alt='' height={45} />
          </div>
        </Stack>
      <Grid item xs={12} md={12}>
        <h1><FormattedMessage {...messages.DetailedAttendanceAndLeaveReport} /></h1>
       </Grid>

       <Grid container spacing={3} alignItems="flex-start" direction="row">
          <Grid
                  item
                  xs={12}
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                >
                    <Grid item xs={4} className={`${style.sectionSty} ${style.imgSectionSty}`}>

                  {Data.details[0].employeeImage !== null && (
                    <img src={`data:image/jpeg;base64,${Data.details[0].employeeImage}`} />
                  )}    
                    </Grid>

                    <Grid item xs={4} className={style.sectionSty}>
                    <Grid item xs={12} md={12}>
                          <p><FormattedMessage {...messages.Employee} />:</p>
                        </Grid>
                
                          <Grid item xs={12} 
                          container
                          spacing={3}
                          alignItems="flex-start"
                          direction="row"
                          style={locale === "en" ? {textAlign: "left"} : {textAlign: "right"}}
                          >
                            <Grid item xs={4} >
                              <span><FormattedMessage {...messages.Name} /></span>
                            </Grid>
                            <Grid item xs={8} >
                              <span>{Data.employeeName}</span>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} 
                          container
                          spacing={3}
                          alignItems="flex-start"
                          direction="row"
                          style={locale === "en" ? {textAlign: "left"} : {textAlign: "right"}}
                          >
                            <Grid item xs={4} >
                              <span><FormattedMessage {...messages.InsuranceNo} /></span>
                            </Grid>
                            <Grid item xs={8} >
                              <span>{Data.socialInsuranceId}</span>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} 
                          container
                          spacing={3}
                          alignItems="flex-start"
                          direction="row"
                          style={locale === "en" ? {textAlign: "left"} : {textAlign: "right"}}
                          >
                            <Grid item xs={4} >
                              <span><FormattedMessage {...messages.job} /></span>
                            </Grid>
                            <Grid item xs={8} >
                              <span>{Data.jobName}</span>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} 
                          container
                          spacing={3}
                          alignItems="flex-start"
                          direction="row"
                          style={locale === "en" ? {textAlign: "left"} : {textAlign: "right"}}
                          >
                            <Grid item xs={4} >
                              <span><FormattedMessage {...messages.shift} /></span>
                            </Grid>
                            <Grid item xs={8} >
                              <span>{Data.shiftname}</span>
                            </Grid>
                          </Grid>


                          <Grid item xs={12} 
                          container
                          spacing={3}
                          alignItems="flex-start"
                          direction="row"
                          style={locale === "en" ? {textAlign: "left"} : {textAlign: "right"}}
                          >
                            <Grid item xs={4} >
                              <span><FormattedMessage {...messages.orgName} /></span>
                            </Grid>
                            <Grid item xs={8} >
                              <span>{Data.organizationName}</span>
                            </Grid>
                          </Grid>
    
                    </Grid>


                    <Grid item xs={4} className={style.sectionSty}>
                    <Grid item xs={12} md={12}>
                          <p><FormattedMessage {...messages.Report} />:</p>
                        </Grid>
                
                          <Grid item xs={12} 
                          container
                          spacing={3}
                          alignItems="flex-start"
                          direction="row"
                          >
                            <Grid item xs={4} >
                              <span><FormattedMessage {...messages.PrintDate} /></span>
                            </Grid>
                            <Grid item xs={8} >
                              <span>{format(new Date(), "yyyy-MM-dd")}</span>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} 
                          container
                          spacing={3}
                          alignItems="flex-start"
                          direction="row"
                          >
                            <Grid item xs={4} >
                              <span><FormattedMessage {...messages.printTime} /></span>
                            </Grid>
                            <Grid item xs={8} >
                              <span>{format(new Date(), "hh:mm aaaa")}</span>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} 
                          container
                          spacing={3}
                          alignItems="flex-start"
                          direction="row"
                          >
                            <Grid item xs={4} >
                              <span><FormattedMessage {...messages.date} /></span>
                            </Grid>
                            <Grid item xs={8} >
                              <span>{formateDate(date.FromDate)} - {formateDate(date.ToDate)}</span>
                            </Grid>
                          </Grid>
                       
                    </Grid>

                </Grid>
            </Grid>
  
      </div>
    );
  }
  
  
  export default DetailedAttendanceHeaderEmp;
  