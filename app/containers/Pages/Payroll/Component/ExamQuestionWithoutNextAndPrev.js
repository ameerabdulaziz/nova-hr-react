import React, { useEffect, useState } from 'react';
import useStyles from '../../Payroll/Style';
import style from '../../../../styles/styles.scss'
import LinearProgress from '@mui/material/LinearProgress';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
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



const ExamQuestionWithoutNextAndPrev = ({
  examData,
//   setEndExam,
//   setStartExam,
  examQuestionsData,
//   setExamQuestionsData,
  nextQueFun,
  prevQueFun,
  saveAllQuestions,
  // question,
  // setQuestion
  questionNum,
//   setQuestionNum,
  question,
//   setQuestion,
  choices,
//   setChoices,
  // questionsAnswers,
//   setQuestionsAnswers,
allQuestionsAnswers,
finishExamFun
}) => {



    const { classes } = useStyles();
    const locale = useSelector(state => state.language.locale);
    

    console.log("questionNum =", questionNum);
    console.log("examQuestionsData =", examQuestionsData);
    console.log("allQuestionsAnswers =",allQuestionsAnswers);
 
    return(
        <>
        {examData?.competencyList.map((Qui,index)=>(
        <Grid item xs={12}  key={index}> 
        {/* <Grid item xs={12}  style={!setStartExam?  {display: 'none'} : {display: 'block'}}>  */}
   {index === 0 || (examData?.competencyList[index - 1].category !== examData?.competencyList[index].category) ? (
            <h1 className={`${classes.textSty} ${style.categorySty} ${style.categoryAllQueSty} ${locale === "en" ?  style.categoryEnSty : style.categoryArSty}`}>{Qui.category}</h1>
            ) : null}
                        <div className={`${style.examContainer2} ${style.examContainer2AllQue}`}>
                          
                            <div>
                              {/* <LinearProgress variant="determinate" value={((questionNum + 1)*100) / examData?.competencyList.length} />
                              <p>{questionNum + 1}/{examData?.competencyList.length}</p> */}
                              {/* <h1>
                                  Do you think to suggest our company to a friend or parent?
                              </h1> */}
                              <h1>
                                  {Qui?.competency}
                                  {/* {question?.competency} */}
                              </h1>
                              <FormControl style={{width: "100%"}}>
                                  <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      value={allQuestionsAnswers[`que${index + 1}`]?.checkedVal ? allQuestionsAnswers[`que${index + 1}`]?.checkedVal?.id : ""}
                                      // value={questionsAnswers[`que${index + 1}`]?.checkedVal ? questionsAnswers[`que${index + 1}`]?.checkedVal ?.id : ""}
                                    //   value={questionsAnswers.checkedVal ? questionsAnswers.checkedVal?.id : ""}
                                      // defaultValue="female"
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
                                                console.log("checl val =", e.target.value)
                                                saveAllQuestions(e, "radio",index)
                                                // setExamQuestionsData(prveState => [...prveState, 
                                                //     {
                                                //         question: question,
                                                //         checkedVal: e.target.value
                                                //     }
                                                //     ])
                                            }}
                                            />
                                        )
                                    })}
                                      
                                      {/* <FormControlLabel 
                                      value="Maybe" 
                                      control={<Radio checkedIcon={<CheckIcon className={style.checkedIconeSty}/>} icon={<RadioButtonUncheckedIcon className={style.iconeSty}/>} />} 
                                      label="Maybe" />
                                      
                                      <FormControlLabel 
                                      value="Probably" 
                                      control={<Radio checkedIcon={<CheckIcon className={style.checkedIconeSty}/>} icon={<RadioButtonUncheckedIcon className={style.iconeSty}/>} />} 
                                      label="Probably" />

                                      <FormControlLabel 
                                      value="100% Sure" 
                                      control={<Radio checkedIcon={<CheckIcon className={style.checkedIconeSty}/>} icon={<RadioButtonUncheckedIcon className={style.iconeSty}/>} />} 
                                      label="100% Sure" /> */}
                                  </RadioGroup>
                                  </FormControl>

                                  <p>
                                      In no, please describe with few words why
                                  </p>

                                  

                                  <TextareaAutosize
                                    color="neutral"
                                    minRows={3}
                                    placeholder="Type here additional info..."
                                    size="lg"
                                    // style={{width: "100%"}}
                                    onChange={(e) => { saveAllQuestions(e, "textarea",index)}}
                                    value={allQuestionsAnswers[`que${index + 1}`]?.textareaVal ? allQuestionsAnswers[`que${index + 1}`]?.textareaVal : ""}
                                    // value={allQuestionsAnswers[`que${index + 1}`]?.textareaVal}
                                    // value={questionsAnswers[`que${index + 1}`]?.textareaVal}
                                    // value={questionsAnswers.textareaVal}
                                    
                                />
                                <span>required</span>

                                <div></div>



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
                                 

                                  {/* <Grid item xs={6} md={3}  lg={2}>
                                    <Button
                                      variant="contained"
                                      size="medium"
                                      color="primary"
                                      // onClick={onCopy}
                                      // disabled={brCode? false : true}
                                      onClick={prevQueFun}
                                    //   style={{display:"none"}}
                                    >
                                 
                                      Prev
                                    </Button>
                                  </Grid> */}

                                  <Grid item xs={6} md={3} lg={2}>
                                    <Button
                                      variant="contained"
                                      size="medium"
                                      color="primary"
                                      onClick={finishExamFun}
                                      // disabled={examData.exampleRequired &&  allQuestionsAnswers.textareaVal.length !== 0 ? false : true}
                                    >
                                      
                                      finish
                                    </Button>
                                  </Grid>

                                 

                                  </Grid>
                                  ) : null}
                                </Grid>
                            </div>
                        </div>                   
                    </Grid>
                    ))}
                    </>
    )
}


export default ExamQuestionWithoutNextAndPrev;
