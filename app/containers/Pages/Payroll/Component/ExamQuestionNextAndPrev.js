import React, { useEffect, useState,  } from 'react';
import useStyles from '../../Payroll/Style';
import style from '../../../../styles/pagesStyle/EmployeeAssessmentSty.scss'
import LinearProgress from '@mui/material/LinearProgress';
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



const ExamQuestionNextAndPrev =  ({
  examData,
  nextQueFun,
  prevQueFun,
  saveQuestions,
  questionNum,
  question,
  choices,
  questionsAnswers,
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
        <Grid item xs={12}  > 
      <form onSubmit={(e)=>{ 
          e.preventDefault()
          if(examData?.competencyList.length >= questionNum + 1)
          {
            nextQueFun()
          }
          }}>
       
        {examData?.competencyList.length >= questionNum + 1  && (<>
                    <h1 className={`${classes.textSty} ${style.categorySty} ${locale === "en" ?  style.categoryEnSty : style.categoryArSty}`}>{question?.category}</h1>
                    </>)}
                        <div className={`${style.examContainer}`}>
                          
                            <div>
                            {examData?.competencyList.length >= questionNum + 1 && (<>
                              <LinearProgress variant="determinate" value={((questionNum + 1)*100) / examData?.competencyList.length} />
                              <p>{questionNum + 1}/{examData?.competencyList.length}</p>

                              <h1>
                                  {question?.competency}
                              </h1>
                              <FormControl style={{width: "100%"}}>
                                  <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      value={  (questionsAnswers[`que${questionNum + 1}`]?.checkedVal ? questionsAnswers[`que${questionNum + 1}`]?.checkedVal?.id : "")}
                                      name="radio-buttons-group"
                                     className={style.radioContainer}
                                  >
                                    {AssessmentReviewLock  && (
                                      <p><TaskAltIcon /> Employee Choose: {examData?.competencyList[questionNum]?.employeeChoiceName ? examData.competencyList[questionNum].employeeChoiceName : ""} </p>
                                      // <p><TaskAltIcon /> Employee Choose: {(questionsAnswers[`que${questionNum + 1}`]?.checkedVal ? questionsAnswers[`que${questionNum + 1}`]?.checkedVal?.name : "")} </p>
                                    )}

                                    {choices?.map((choice,index)=>{
                                        return (
                                            <FormControlLabel 
                                            // style={{backgroundColor: "#f00"}}
                                            key={choice.id}
                                            value={choice.id} 
                                            control={<Radio checkedIcon={<CheckIcon className={`${style.checkedIconeSty} ${classes.examMainSty}`}/>} icon={<RadioButtonUncheckedIcon className={style.iconeSty} />} />} 
                                            label={choice.name} 
                                            onChange={(e)=> {
                                                saveQuestions(e, "radio")
                                            }}
                                            />
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
                                    onChange={(e) => { saveQuestions(e, "textarea")}}
                                    value={questionsAnswers[`que${questionNum + 1}`]?.textareaVal ? questionsAnswers[`que${questionNum + 1}`]?.textareaVal : ""}
                                    required={
                                      examData.exampleRequired 
                                      && questionsAnswers[`que${questionNum + 1}`]
                                       && questionsAnswers[`que${questionNum + 1}`]?.checkedVal 
                                      ? true : false}
                                      disabled={AssessmentReviewLock}
                                />
                                {(
                                examData.exampleRequired 
                              && questionsAnswers[`que${questionNum + 1}`]
                              && questionsAnswers[`que${questionNum + 1}`]?.checkedVal 
                                )
                                 ? <span> <FormattedMessage {...messages.ThisFieldIsRequired} /></span> : (
                                  null
                                )}

                                </>)}

                                {examData?.competencyList.length < questionNum + 1   && (<>
                                <h1 className={style.textareaTitle}>
                                  <FormattedMessage {...messages.EmployeeTrainingRequest} />
                                </h1>
                      
                                <TextareaAutosize
                                    color="neutral"
                                    minRows={3}
                                    placeholder={intl.formatMessage(messages.TypeHereAdditionalInfo)}
                                    size="lg"
                                    onChange={(e) => { saveQuestions(e, "textareaEmpTraining")}}
                                    value={textareaEmpTrainingVal? textareaEmpTrainingVal: ""}
                                    // value={textareaEmpTrainingVal?.textareaEmpTraining ? textareaEmpTrainingVal?.textareaEmpTraining : ""}
                                />
                                 </>)}

                                 {(examData?.competencyList.length < questionNum + 1) && AssessmentReviewLock  && (<>
                                    <h1 className={style.textareaTitle}>
                                      {/* <FormattedMessage {...messages.EmployeeTrainingRequest} /> */}
                                      Directed Manager Overall Appraisal
                                    </h1>
                          
                                    <TextareaAutosize
                                        color="neutral"
                                        minRows={3}
                                        placeholder={intl.formatMessage(messages.TypeHereAdditionalInfo)}
                                        size="lg"
                                        onChange={(e) => { saveQuestions(e, "OverallAppraisal")}}
                                        value={OverallAppraisalVal ? OverallAppraisalVal : ""}
                                        // value={OverallAppraisalVal?.OverallAppraisal ? OverallAppraisalVal?.OverallAppraisal : ""}
                                    />
                                 </>)}

                                 {(examData?.competencyList.length < questionNum + 1) && AssessmentReviewLock   && (<>
                                    <h1 className={style.textareaTitle}>
                                      {/* <FormattedMessage {...messages.EmployeeTrainingRequest} /> */}
                                      Note For Employee
                                    </h1>
                          
                                    <TextareaAutosize
                                        color="neutral"
                                        minRows={3}
                                        placeholder={intl.formatMessage(messages.TypeHereAdditionalInfo)}
                                        size="lg"
                                        onChange={(e) => { saveQuestions(e, "NoteForEmployee")}}
                                        value={textareaNoteForEmployeeVal ? textareaNoteForEmployeeVal : ""}
                                        // value={textareaNoteForEmployeeVal?.NoteForEmployee ? textareaNoteForEmployeeVal?.NoteForEmployee : ""}
                                    />
                                 </>)}

                                 <div className={style.lineStye}></div>

                                <Grid
                                  container
                                  spacing={3}
                                  alignItems="flex-end"
                                  direction="row"
                                  
                                  >
                                  
                    
                                    <Grid item xs={12}
                                    container
                                    spacing={3}
                                    alignItems="flex-start"
                                    direction="row"
                                    className={`${style.itemsStyle} ${style.nextPrevBtnSty}`}
                                    justifyContent="end"
                                    >
                                 

                                  <Grid item xs={6} md={3}  lg={2}>
                                    <Button
                                      variant="contained"
                                      size="medium"
                                      color="primary"
                                      onClick={prevQueFun}
                                      className={style.prevBtnSty}
                                    >
                                   <FormattedMessage {...messages.Prev} />
                                    </Button>
                                  </Grid>

                              {examData?.competencyList.length >= questionNum + 1  && (<>
                                  <Grid item xs={6} md={3} lg={2}>
                                    <Button
                                      variant="contained"
                                      size="medium"
                                      color="primary"
                                      type='submit'
                                    >
                                      <FormattedMessage {...messages.Next} />
                                    </Button>
                                  </Grid>
                                  </>)}

                                  {examData?.competencyList.length < questionNum + 1   && (<>
                                  <Grid item xs={6} md={3} lg={2}>
                                    <Button
                                      variant="contained"
                                      size="medium"
                                      color="primary"
                                      type='submit'
                                      onClick={finishExamFun}
                                    >
                                       <FormattedMessage {...messages.finish} />
                                    </Button>
                                  </Grid>
                                  </>)}

                                 

                                  </Grid>
                                </Grid>
                            </div>
                        </div>                   
                    </form>
                    </Grid>
                    </>
    )
}


export default ExamQuestionNextAndPrev;
