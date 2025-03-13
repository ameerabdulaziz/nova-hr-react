import React, { useEffect, useState } from 'react';
import useStyles from '../../../Style';
import style from '../../../../../../styles/pagesStyle/EmployeeAssessmentSty.scss'
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../../messages';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { format } from 'date-fns';
import { Box, Stack, Avatar } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import payrollMessages from "../../../messages";



const ExamQuestionsPrint = ({
  examData,
  printDivRef,
  data,
  intl
}) => {


    const { classes } = useStyles();
    const locale = useSelector(state => state.language.locale);
    const company = useSelector((state) => state.authReducer.companyInfo);
    
    return(
        <>

        <Box
        ref={printDivRef}
        sx={{
          height:"0px",
          visibility:"hidden",
          '@media print': {
            height:"100%",
            visibility:"visible",
            direction: "ltr"
          },
        }}
      >
        <Stack spacing={2} mb={2} mx={4} mt={4} >
          <div>
            <img src={company?.logo} alt='' height={45} />
          </div>
        </Stack>

        <h1 className={`${style.printPageTitleSty} `}>
            {examData[0]?.templateName} &nbsp;&nbsp; <span>{data[0]?.month} / {data[0]?.year}</span>
          </h1>

            <h1 className={`${style.printPageTitleSty} `}>
                <FormattedMessage {...messages.evaluatedEmployeeData} />
            </h1>

            <Grid item xs={12} className={`${style.printSty} ${style.printFiristSecSty}`} > 
                <div className={`${style.examContainer2} ${style.userInfoContainer}`} >
                         
                    <div>
                        <Grid
                          container
                          spacing={3}
                          direction="row"
                         >
                           <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printAveragePeerAppraisalTitlesSty}`}>
                               <p> {intl.formatMessage(payrollMessages.employeeCode)}: </p> <p className={classes.textSty}>{data[0]?.employeeCode}</p>
                               </div>
                           </Grid>

                           <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printAveragePeerAppraisalTitlesSty}`}>
                               <p>{intl.formatMessage(payrollMessages.employeeName)}: </p> <p className={classes.textSty}>{data[0]?.employeeName}</p> 
                               </div>
                           </Grid>

                           <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printAveragePeerAppraisalTitlesSty}`}>
                                   <p>{intl.formatMessage(messages.organization)}: </p> <p className={classes.textSty}>{data[0]?.organizationName}</p>
                               </div>
                           </Grid>

                           <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printAveragePeerAppraisalTitlesSty}`}>
                                   <p>{intl.formatMessage(messages.jobName)} </p> <p className={classes.textSty}>{data[0]?.jobName}</p>
                               </div>
                           </Grid>

                           <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printAveragePeerAppraisalTitlesSty}`}>
                                   <p>{intl.formatMessage(messages.evaluators)} </p> <p className={classes.textSty}>{data[0]?.evaluators}</p>
                               </div>
                           </Grid>

                           <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printAveragePeerAppraisalTitlesSty}`}>
                                   <p>{intl.formatMessage(messages.evaluatorsDone)} </p> <p className={classes.textSty}>{data[0]?.evaluatorsDone}</p>
                               </div>
                           </Grid>

                           {data[0] && data[0].hiringDate && (
                            <Grid item xs={4} >
                                <div className={`${style.userInfoSty} ${style.printAveragePeerAppraisalTitlesSty}`}>
                                    <p>{intl.formatMessage(payrollMessages.hiringDate)} </p> <p className={classes.textSty}>{format(new Date(data[0]?.hiringDate) , "yyyy-MM-dd")}</p>
                                </div>
                            </Grid>
                            )}

                        </Grid>                                
                    </div>
                </div>                   
                   
            </Grid>

            

            {examData.map((Data,index)=>{

                return <div key={index}>

                    <Grid item xs={12} className={`${style.printSty} ${style.printFiristSecSty}`} style={{pageBreakBefore:"always"}} > 
                            <h1 className={`${style.printPageTitleSty} `}>
                                <FormattedMessage {...messages.evaluatorEmployeeData} />
                            </h1>

                            <div className={`${style.examContainer2} ${style.userInfoContainer}`}>
                                <div>
                                    <Grid
                                    container
                                    spacing={3}
                                    direction="row"
                                    >
                                    <Grid item xs={4} >
                                        <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                        <p> {intl.formatMessage(payrollMessages.employeeName)}: </p> <p className={classes.textSty}>{Data.evaluatorName}</p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={4} >
                                        <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                        <p><FormattedMessage {...messages.department} />: </p> <p className={classes.textSty}>{Data.organizationName}</p> 
                                        </div>
                                    </Grid>

                                    <Grid item xs={4} >
                                        <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                            <p><FormattedMessage {...messages.jobName} />: </p> <p className={classes.textSty}>{Data.jobName}</p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={4} >
                                        <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                            <p>{intl.formatMessage(messages.totalEvaluation)}: </p> <p className={classes.textSty}>{Data.totalGrade}</p>
                                        </div>
                                    </Grid>
                                    </Grid>                                
                                </div>
                            </div>                   
                            
                        </Grid>
                
                        {Data?.competencyList.map((Qui,index)=>(
                            <Grid item xs={12}  key={index} className={`${style.printSty}`}> 

                                {index === 0 || (Data?.competencyList[index - 1].category !== Data?.competencyList[index].category) ? (
                                    <h1 className={`${classes.textSty} ${style.categorySty} ${style.categoryAllQueSty} ${locale === "en" ?  style.categoryEnSty : style.categoryArSty}`}>{Qui.category}</h1>
                                    ) : null}

                                    <div className={`${style.examContainer2} ${style.examContainer2AllQue} `}>
                                        
                                        <div>
                                            <h1>
                                                <HelpOutlineIcon />  {Qui?.competency}
                                            </h1>

                                            <div className={`${style.radioContainer} ${style.radioContainerAllQue} ${style.answersPrintSty}`}>
                                                    <p><TaskAltIcon /> <FormattedMessage {...messages.EmployeeChoose} />: &nbsp; {Data?.competencyList[index]?.employeeChoiceName ? Data.competencyList[index].employeeChoiceName : ""} </p>
                                            </div>

                                            <div className={`${style.radioContainer} ${style.radioContainerAllQue} ${style.answersPrintSty}`}>
                                                    <p><TextFieldsIcon />&nbsp; {Data?.competencyList[index]?.employeeExample ? Data.competencyList[index].employeeExample : ""} </p>
                                            </div>

                                            <div className={`${style.lineStye} ${style.printLineStye}`}></div>

                                        </div>
                                    </div>                   
                            </Grid>
                        ))}
                </div>
            })}
        </Box>
    </>
    )
}


export default injectIntl(ExamQuestionsPrint);
