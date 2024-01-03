import React, { useEffect, useState } from 'react';
import useStyles from '../../Payroll/Style';
import style from '../../../../styles/pagesStyle/EmployeeAssessmentSty.scss'
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../Assessment/messages';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { format } from 'date-fns';
import { Box } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';



const ExamQuestionsPrint = ({
  examData,
  textareaEmpTrainingVal,
  OverallAppraisalVal,
  textareaNoteForEmployeeVal,
  AssessmentReviewLock,
  printDivRef,
  data
}) => {


    const { classes } = useStyles();
    const locale = useSelector(state => state.language.locale);

    
    return(
        <>
        <Box
        ref={printDivRef}
        sx={{
          display: 'none',
          '@media print': {
            display: 'block',
            direction: "ltr"
          },
        }}
      >

          <h1 className={`${style.printPageTitleSty} `}>
            {examData?.templateName}
          </h1>

                  {AssessmentReviewLock && (
                    <Grid item xs={12} className={`${style.printSty} ${style.printFiristSecSty}`} > 
                       <div className={`${style.examContainer2} ${style.userInfoContainer}`}>
                         
                           <div>

                           <Grid
                                 container
                                 spacing={3}
                                 direction="row"
                                 
                                 >
                           <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                   <p><FormattedMessage {...messages.department} />: </p> <p className={classes.textSty}>{examData?.organizationName}</p>
                               </div>
                           </Grid>

                           <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                   <p><FormattedMessage {...messages.employeeName} />: </p> <p className={classes.textSty}>{examData?.employeeName}</p>
                               </div>
                           </Grid>

                           <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                   <p><FormattedMessage {...messages.jobName} />: </p> <p className={classes.textSty}>{examData?.jobName}</p>
                               </div>
                           </Grid>


                           <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                   <p><FormattedMessage {...messages.hiringData} />: </p> <p className={classes.textSty}>{examData ?  format(new Date(examData.hiringDate), 'yyyy-MM-dd') : ""}</p>
                               </div>
                           </Grid>

                           <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                   <p><FormattedMessage {...messages.SalfEvaluation} />: </p> <p className={classes.textSty}>{data[0]?.SalfEvaluation}</p>
                               </div>
                           </Grid>

                           <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                   <p><FormattedMessage {...messages.ManagerEvaluation} />: </p> <p className={classes.textSty}>{data[0]?.ManagerEvaluation}</p>
                               </div>
                           </Grid>

                           </Grid>
                                                              
                           </div>
                       </div>                   
                   
                   </Grid>
                   )}


        {examData?.competencyList.map((Qui,index)=>(
        <Grid item xs={12}  key={index} className={`${style.printSty}`}> 

          {index === 0 || (examData?.competencyList[index - 1].category !== examData?.competencyList[index].category) ? (
            <h1 className={`${classes.textSty} ${style.categorySty} ${style.categoryAllQueSty} ${locale === "en" ?  style.categoryEnSty : style.categoryArSty}`}>{Qui.category}</h1>
            ) : null}
                        <div className={`${style.examContainer2} ${style.examContainer2AllQue} `}>
                          
                            <div >
                              <h1>
                                <HelpOutlineIcon />  {Qui?.competency}
                              </h1>

                              <div className={`${style.radioContainer} ${style.radioContainerAllQue} ${style.answersPrintSty}`}>
                                    {AssessmentReviewLock  && (
                                       <p><TaskAltIcon /> <FormattedMessage {...messages.EmployeeChoose} />: &nbsp; {examData?.competencyList[index]?.employeeChoiceName ? examData.competencyList[index].employeeChoiceName : ""} </p>
                                    )}
                                    {AssessmentReviewLock  && (
                                       <p><TaskAltIcon /> <FormattedMessage {...messages.ManagerChoose} />: &nbsp; {examData?.competencyList[index]?.mgrChoiceName ? examData.competencyList[index].mgrChoiceName : ""} </p>
                                    )}
                              </div>

                              <div className={`${style.radioContainer} ${style.radioContainerAllQue} ${style.answersPrintSty}`}>
                                    {AssessmentReviewLock  && (
                                       <p><TextFieldsIcon />&nbsp; {examData?.competencyList[index]?.employeeExample ? examData.competencyList[index].employeeExample : ""} </p>
                                    )}
                              </div>

                                <div className={`${style.lineStye} ${style.printLineStye}`}></div>


                           {examData?.competencyList.length ===  index + 1 ? (<>
                                <h1>
                                  <FormattedMessage {...messages.EmployeeTrainingRequest} />
                                </h1>
                               


                                <div className={`${style.radioContainer} ${style.radioContainerAllQue} ${style.answersPrintSty}`}>
                                    {AssessmentReviewLock  && (
                                       <p><TextFieldsIcon />  &nbsp; {textareaEmpTrainingVal ? textareaEmpTrainingVal : ""}  </p>
                                    )}
                              </div>


                            </>) : null}

                            {(examData?.competencyList.length ===  index + 1 ) && AssessmentReviewLock  && (<>
                                    <h1 className={style.textareaTitle}>
                                      <FormattedMessage {...messages.DirectedManagerOverallAppraisal} />
                                      
                                    </h1>
                          
                                    <div className={`${style.radioContainer} ${style.radioContainerAllQue} ${style.answersPrintSty}`}>
                                        {AssessmentReviewLock  && (
                                        <p><TextFieldsIcon />  &nbsp; {OverallAppraisalVal ? OverallAppraisalVal : ""}  </p>
                                        )}
                                    </div>

                                 </>)}

                                 {(examData?.competencyList.length ===  index + 1 ) && AssessmentReviewLock   && (<>
                                    <h1 className={style.textareaTitle}>
                                      <FormattedMessage {...messages.NoteForEmployee} />
                                      
                                    </h1>
                          
                                    <div className={`${style.radioContainer} ${style.radioContainerAllQue} ${style.answersPrintSty}`}>
                                        {AssessmentReviewLock  && (
                                        <p><TextFieldsIcon />  &nbsp; {textareaNoteForEmployeeVal ? textareaNoteForEmployeeVal : ""}  </p>
                                        )}
                                    </div>

                                 </>)}

                            </div>
                        </div>                   
                    </Grid>
                    ))}

                    </Box>
                    </>
    )
}


export default ExamQuestionsPrint;
