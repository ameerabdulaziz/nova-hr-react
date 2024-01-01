import React, { useEffect, useState } from 'react';
import useStyles from '../../Payroll/Style';
import style from '../../../../styles/pagesStyle/EmployeeAssessmentSty.scss'
import { TextareaAutosize } from '@mui/base';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../Assessment/messages';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { format } from 'date-fns';



const ExamQuestionWithoutNextAndPrev = ({
  examData,
  saveAllQuestions,
  choices,
  allQuestionsAnswers,
  finishExamFun,
  textareaEmpTrainingVal,
  OverallAppraisalVal,
  textareaNoteForEmployeeVal,
  intl,
  AssessmentReviewLock
}) => {


    const { classes } = useStyles();
    const locale = useSelector(state => state.language.locale);
    
    return(
        <>
        <form style={{width: "100%"}} onSubmit={(e)=>{ 
          e.preventDefault()
          finishExamFun()
          }}>

                  {AssessmentReviewLock && (
                    <Grid item xs={12}  > 
                       <div className={`${style.examContainer2} ${style.userInfoContainer}`}>
                         
                           <div>

                           <Grid
                                 container
                                 spacing={3}
                                 direction="row"
                                 
                                 >
                           <Grid item xs={12} md={6} >
                               <div className={`${style.userInfoSty}`}>
                                   <p><FormattedMessage {...messages.department} />: </p> <p className={classes.textSty}>{examData?.organizationName}</p>
                               </div>
                           </Grid>

                           <Grid item xs={12} md={6} >
                               <div className={`${style.userInfoSty}`}>
                                   <p><FormattedMessage {...messages.employeeName} />: </p> <p className={classes.textSty}>{examData?.employeeName}</p>
                               </div>
                           </Grid>

                           <Grid item xs={12} md={6} >
                               <div className={`${style.userInfoSty}`}>
                                   <p><FormattedMessage {...messages.jobName} />: </p> <p className={classes.textSty}>{examData?.jobName}</p>
                               </div>
                           </Grid>

                           <Grid item xs={12} md={6} >
                               <div className={`${style.userInfoSty}`}>
                                   <p><FormattedMessage {...messages.BirthDate} />: </p> <p className={classes.textSty}>{examData ? format(new Date(examData.birthDate), 'yyyy-MM-dd') : ""}</p>
                               </div>
                           </Grid>

                           <Grid item xs={12} md={6} >
                               <div className={`${style.userInfoSty}`}>
                                   <p><FormattedMessage {...messages.hiringData} />: </p> <p className={classes.textSty}>{examData ?  format(new Date(examData.hiringDate), 'yyyy-MM-dd') : ""}</p>
                               </div>
                           </Grid>

                           </Grid>
                                                              
                           </div>
                       </div>                   
                   
                   </Grid>
                   )}


        {examData?.competencyList.map((Qui,index)=>(
        <Grid item xs={12}  key={index}> 

          {index === 0 || (examData?.competencyList[index - 1].category !== examData?.competencyList[index].category) ? (
            <h1 className={`${classes.textSty} ${style.categorySty} ${style.categoryAllQueSty} ${locale === "en" ?  style.categoryEnSty : style.categoryArSty}`}>{Qui.category}</h1>
            ) : null}
                        <div className={`${style.examContainer2} ${style.examContainer2AllQue}`}>
                          
                            <div>
                              <h1>
                                  {Qui?.competency}
                              </h1>
                              <FormControl style={{width: "100%"}}>
                                  <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      value={allQuestionsAnswers[`que${index + 1}`]?.checkedVal ? allQuestionsAnswers[`que${index + 1}`]?.checkedVal?.id : ""}
                                      name="radio-buttons-group"
                                     className={`${style.radioContainer} ${style.radioContainerAllQue}`}
                                     row
                                  >
                                    {AssessmentReviewLock  && (
                                       <p><TaskAltIcon /> <FormattedMessage {...messages.EmployeeChoose} />: &nbsp; {examData?.competencyList[index]?.employeeChoiceName ? examData.competencyList[index].employeeChoiceName : ""} </p>
                                    )}
                                    {choices?.map((choice)=>{
                                        return (
                                          <Grid item xs={6} key={choice.id}> 
                                            <FormControlLabel 
                                            key={choice.id}
                                            value={choice.id} 
                                            control={<Radio checkedIcon={<CheckIcon className={`${style.checkedIconeSty} ${classes.examMainSty}`}/>} icon={<RadioButtonUncheckedIcon className={style.iconeSty} />} />} 
                                            label={choice.name} 
                                            onChange={(e)=> {
                                                saveAllQuestions(e, "radio",index)
                                            }}
                                            />
                                          </Grid>
                                        )
                                    })}
                                      
                                  </RadioGroup>
                                  </FormControl>

                                  <p>
                                      <FormattedMessage {...messages.pleaseDescribeWithFewWordsWhy} />
                                  </p>

                                  

                                  <TextareaAutosize
                                    color="neutral"
                                    minRows={3}
                                    placeholder={intl.formatMessage(messages.TypeHereAdditionalInfo)}
                                    size="lg"
                                    // onChange={(e) => { saveAllQuestions(e, "textarea",index)}}
                                    onBlur={(e) => { saveAllQuestions(e, "textarea",index)}}
                                    defaultValue={ allQuestionsAnswers[`que${index + 1}`]?.textareaVal}
                                    // value={ allQuestionsAnswers[`que${index + 1}`]?.textareaVal}
                                    required={
                                      examData.exampleRequired 
                                      && allQuestionsAnswers[`que${index + 1}`]
                                       && allQuestionsAnswers[`que${index + 1}`]?.checkedVal 
                                      ? true : false}
                                      disabled={AssessmentReviewLock}
                                />
                                

                                {  
                                (
                                   examData.exampleRequired 
                                && allQuestionsAnswers[`que${index + 1}`]
                                && allQuestionsAnswers[`que${index + 1}`]?.checkedVal 
                                && allQuestionsAnswers[`que${index + 1}`]?.textareaVal?.length === 0 
                                )
                                 ? <span className={style.errorMes}><FormattedMessage {...messages.ThisFieldIsRequired} /></span> : (
                                  null
                                )}

                                <div className={style.lineStye}></div>


                           {examData?.competencyList.length ===  index + 1 ? (<>
                                <h1>
                                  <FormattedMessage {...messages.EmployeeTrainingRequest} />
                                </h1>
                               

                                <TextareaAutosize
                                    color="neutral"
                                    minRows={3}
                                    placeholder={intl.formatMessage(messages.TypeHereAdditionalInfo)}
                                    size="lg"
                                    onBlur={(e) => { saveAllQuestions(e, "textareaEmpTraining")}}
                                    defaultValue={textareaEmpTrainingVal ? textareaEmpTrainingVal : ""} 
                                    // onChange={(e) => { saveAllQuestions(e, "textareaEmpTraining")}}
                                    // value={textareaEmpTrainingVal ? textareaEmpTrainingVal : ""} 
                                />

                            </>) : null}

                            {(examData?.competencyList.length ===  index + 1 ) && AssessmentReviewLock  && (<>
                                    <h1 className={style.textareaTitle}>
                                      <FormattedMessage {...messages.DirectedManagerOverallAppraisal} />
                                      
                                    </h1>
                          
                                    <TextareaAutosize
                                        color="neutral"
                                        minRows={3}
                                        placeholder={intl.formatMessage(messages.TypeHereAdditionalInfo)}
                                        size="lg"
                                        onBlur={(e) => { saveAllQuestions(e, "OverallAppraisal")}}
                                        defaultValue={OverallAppraisalVal ? OverallAppraisalVal : ""}
                                    />
                                 </>)}

                                 {(examData?.competencyList.length ===  index + 1 ) && AssessmentReviewLock   && (<>
                                    <h1 className={style.textareaTitle}>
                                      <FormattedMessage {...messages.NoteForEmployee} />
                                      
                                    </h1>
                          
                                    <TextareaAutosize
                                        color="neutral"
                                        minRows={3}
                                        placeholder={intl.formatMessage(messages.TypeHereAdditionalInfo)}
                                        size="lg"
                                        onBlur={(e) => { saveAllQuestions(e, "NoteForEmployee")}}
                                        defaultValue={textareaNoteForEmployeeVal ? textareaNoteForEmployeeVal : ""}
                                    />
                                 </>)}

                                <Grid
                                  container
                                  spacing={3}
                                  alignItems="flex-end"
                                  direction="row"
                                  
                                  >
                                  
                                      {examData?.competencyList.length ===  index + 1 ? (
                    
                                    <Grid item xs={12}
                                    container
                                    spacing={3}
                                    alignItems="flex-start"
                                    direction="row"
                                    className={`${style.itemsStyle} ${style.nextPrevBtnSty}`}
                                    justifyContent="end"
                                    >
                                 

                                  <Grid item xs={6} md={3} lg={2}>
                                    <Button
                                      variant="contained"
                                      size="medium"
                                      color="primary"
                                      type='submit'
                                    >
                                      <FormattedMessage {...messages.finish} />
                                    </Button>
                                  </Grid>

                                  </Grid>
                                  ) : null}
                                </Grid>
                            </div>
                        </div>                   
                    </Grid>
                    ))}

                    </form>
                    </>
    )
}


export default ExamQuestionWithoutNextAndPrev;
