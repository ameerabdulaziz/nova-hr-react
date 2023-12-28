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



const ExamQuestionWithoutNextAndPrev = ({
  examData,
  saveAllQuestions,
  choices,
allQuestionsAnswers,
finishExamFun,
textareaEmpTrainingVal,
intl
}) => {


    const { classes } = useStyles();
    const locale = useSelector(state => state.language.locale);
    
 console.log("allQuestionsAnswers =", allQuestionsAnswers);
    return(
        <>
        <form style={{width: "100%"}} onSubmit={(e)=>{ 
          e.preventDefault()
          finishExamFun()
          }}>
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
                                    {choices?.map((choice)=>{
                                        return (
                                            <FormControlLabel 
                                            key={choice.id}
                                            value={choice.id} 
                                            control={<Radio checkedIcon={<CheckIcon className={`${style.checkedIconeSty} ${classes.examMainSty}`}/>} icon={<RadioButtonUncheckedIcon className={style.iconeSty} />} />} 
                                            label={choice.name} 
                                            onChange={(e)=> {
                                                saveAllQuestions(e, "radio",index)
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
                                    // onChange={(e) => { saveAllQuestions(e, "textarea",index)}}
                                    onBlur={(e) => { saveAllQuestions(e, "textarea",index)}}
                                    defaultValue={ allQuestionsAnswers[`que${index + 1}`]?.textareaVal}
                                    // value={ allQuestionsAnswers[`que${index + 1}`]?.textareaVal}
                                    required={
                                      examData.exampleRequired 
                                      && allQuestionsAnswers[`que${index + 1}`]
                                       && allQuestionsAnswers[`que${index + 1}`]?.checkedVal 
                                      ? true : false}
                                />
                                

                                {  
                                (
                                examData.exampleRequired 
                                      && allQuestionsAnswers[`que${index + 1}`]
                                       && allQuestionsAnswers[`que${index + 1}`]?.checkedVal 
                                )
                                 ? <span className={style.errorMes}>This field is required</span> : (
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
                                    defaultValue={textareaEmpTrainingVal?.textareaEmpTraining ? textareaEmpTrainingVal?.textareaEmpTraining : ""} 
                                    // onChange={(e) => { saveAllQuestions(e, "textareaEmpTraining")}}
                                    // value={textareaEmpTrainingVal?.textareaEmpTraining ? textareaEmpTrainingVal?.textareaEmpTraining : ""} 
                                />

                            </>) : null}

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
