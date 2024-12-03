import { Grid } from '@mui/material';
  import React from 'react';
  import style from "../../../../../styles/pagesStyle/DetailedAttendanceReportTemplateSty.scss";
  import { FormattedMessage } from "react-intl";
  import messages from "../../Attendance/messages";
  
  function DetailedAttendanceFooter({Data}) {

    console.log("Data foo= ", Data);
    

    return (
      <div className={style.FooterContainer}>
  
       <Grid container spacing={3} alignItems="flex-start" direction="row">
          <Grid
                  item
                  xs={12}
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                >
                    <Grid item xs={3} className={`${style.sectionSty} ${style.footerSectionSty}`}>
                        <Grid item xs={12} md={12}>
                          <p><FormattedMessage {...messages.TotalOfLatenessAndLessTime} /></p>
                        </Grid>
                
                          <Grid item xs={12} >
                            <div style={{display:"flex", justifyContent:"space-between",paddingTop:0,paddingBottom:5}}>
                              <span><FormattedMessage {...messages.lateness} /></span>
                              <span>{Data.totalLateMin}</span>
                              <span>( <FormattedMessage {...messages.Hour} /> )</span>
                            </div>
                            </Grid>

                          <Grid item xs={12} >
                            <div style={{display:"flex", justifyContent:"space-between",paddingTop:0,paddingBottom:5}}>
                              <span><FormattedMessage {...messages.lessTime} /></span>
                              <span>{Data.totalLessTime}</span>
                              <span>( <FormattedMessage {...messages.Hour} /> )</span>
                            </div>
                          </Grid>

                          <Grid item xs={12} >
                            <div style={{display:"flex", justifyContent:"space-between",paddingTop:0,paddingBottom:5}}>
                              <span><FormattedMessage {...messages.LateTime} /></span>
                              <span>{Data.lateTimeEleVal}</span>
                              <span></span>
                            </div>
                          </Grid>

                          <Grid item xs={12} >
                            <div style={{display:"flex", justifyContent:"space-between",paddingTop:0,paddingBottom:5}}>
                              <span><FormattedMessage {...messages.lateTimeMinus} /></span>
                              <span>{Data.lateTimeMinusElVal}</span>
                              <span></span>
                            </div>
                          </Grid>

                    </Grid>



                    <Grid item xs={3} className={`${style.sectionSty} ${style.footerSectionSty} ${style.footerSecSectionSty}`}>
                        <Grid item xs={12} md={12}>
                          <p><FormattedMessage {...messages.OverTime} />:</p>
                        </Grid>
                
                          <Grid item xs={12} >
                            <div style={{display:"flex", justifyContent:"space-between",paddingTop:0,paddingBottom:5}}>
                              <span><FormattedMessage {...messages.Normal} /></span>
                              <span>{Data.totalExtraTime}</span>
                              <span style={{borderRight: "1px solid #000"}}></span>
                              <span>{Data.totalExtraTimeval}</span>
                              <span>( <FormattedMessage {...messages.Minute} /> )</span>
                            </div>
                            </Grid>

                            <Grid item xs={12} >
                            <div style={{display:"flex", justifyContent:"space-between",paddingTop:0,paddingBottom:5}}>
                              <span><FormattedMessage {...messages.Leaves} /></span>
                              <span>{Data.totalVacTime}</span>
                              <span style={{borderRight: "1px solid #000"}}></span>
                              <span>{Data.totalVacTimeval}</span>
                              <span>( <FormattedMessage {...messages.Minute} /> )</span>
                            </div>
                            </Grid>
 
                            <p></p>

                          <Grid item xs={12} >
                            <div style={{display:"flex", justifyContent:"space-between",paddingTop:0,paddingBottom:5}}>
                              <span><FormattedMessage {...messages.Total} /></span>
                              <span>{Data.totalOvertime}</span>
                              <span>( <FormattedMessage {...messages.Hour} /> )</span>
                            </div>
                            </Grid>

                    </Grid>




                    <Grid item xs={3} className={`${style.sectionSty} ${style.footerSectionSty}`}>
                        <Grid item xs={12} md={12}>
                          <p><FormattedMessage {...messages.LeavesDays} />:</p>
                        </Grid>
                
                          <Grid item xs={12} >
                            <div style={{display:"flex", justifyContent:"space-between",paddingTop:0,paddingBottom:5}}>
                              <span><FormattedMessage {...messages.detailedAttendanceWeekendFooter} /></span>
                              <span>{Data.totalShiftVacancy}</span>
                              <span>( <FormattedMessage {...messages.Day} /> )</span>
                            </div>
                            </Grid>

                          <Grid item xs={12} >
                            <div style={{display:"flex", justifyContent:"space-between",paddingTop:0,paddingBottom:5}}>
                              <span><FormattedMessage {...messages.Leaves} /></span>
                              <span>{Data.totalVac}</span>
                              <span>( <FormattedMessage {...messages.Day} /> )</span>
                            </div>
                            </Grid>

                          <Grid item xs={12} >
                            <div style={{display:"flex", justifyContent:"space-between",paddingTop:0,paddingBottom:5}}>
                              <span><FormattedMessage {...messages.absence} /></span>
                              <span>{Data.totalAbsence}</span>
                              <span>( <FormattedMessage {...messages.Day} /> )</span>
                            </div>
                            </Grid>

                    </Grid>


                    <Grid item xs={3} className={`${style.sectionSty} ${style.footerSectionSty}`}>
                        <Grid item xs={12} md={12}>
                          <p><FormattedMessage {...messages.WorkingDays} />:</p>
                        </Grid>
                
                          <Grid item xs={12} >
                            <div style={{display:"flex", justifyContent:"space-between",paddingTop:0,paddingBottom:5}}>
                              <span><FormattedMessage {...messages.Work} /></span>
                              <span>{Data.totalWorkDays}</span>
                              <span>( <FormattedMessage {...messages.Day} /> )</span>
                            </div>
                            </Grid>

                          <Grid item xs={12} >
                            <div style={{display:"flex", justifyContent:"space-between",paddingTop:0,paddingBottom:5}}>
                              <span><FormattedMessage {...messages.mission} /></span>
                              <span>{Data.totalMission}</span>
                              <span>( <FormattedMessage {...messages.Day} /> )</span>
                            </div>
                            </Grid>

                          <Grid item xs={12} >
                            <div style={{display:"flex", justifyContent:"space-between",paddingTop:0,paddingBottom:5}}>
                              <span><FormattedMessage {...messages.workingHours} /></span>
                              <span>{Data.totalWorkHours}</span>
                              <span>( <FormattedMessage {...messages.Hour} /> )</span>
                            </div>
                            </Grid>

                    </Grid>

                </Grid>
            </Grid>
  
      </div>
    );
  }
  

  
  export default DetailedAttendanceFooter;
  