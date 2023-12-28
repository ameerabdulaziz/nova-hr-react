import React, { useEffect, useState,useRef  } from 'react';
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
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../Assessment/messages';



const ExamQuestionNextAndPrev =  ({
  examData,
  setEndExam,
  setStartExam,
  examQuestionsData,
  setExamQuestionsData,
  nextQueFun,
  prevQueFun,
  saveQuestions,
  // question,
  // setQuestion
  questionNum,
  setQuestionNum,
  question,
  setQuestion,
  choices,
  setChoices,
  questionsAnswers,
  setQuestionsAnswers,
  finishExamFun,
  textareaEmpTrainingVal,
  intl

}) => {


    // const [questionNum, setQuestionNum] = useState(0)
    const { classes } = useStyles();
    const locale = useSelector(state => state.language.locale);
    const ref  = useRef(null);
    // const [question, setQuestion] = useState(examData?.competencyList[0])
    // const [choices, setChoices] = useState(examData?.choiceList)
    // // const [examQuestionsData, setExamQuestionsData] = useState([])
    // const [questionsAnswers, setQuestionsAnswers] = useState({checkedVal : null, textareaVal: ""})
    

    


    useEffect(() => {
console.log("ref666 =",ref);

      // if(examQuestionsData[0].exampleRequired)
        // {
          focusFieldFun()
        // }
    }, [questionNum]);

    const focusFieldFun = () => {   
      if(examData.exampleRequired)
      {
        ref?.current?.focus()
      }   
    }

//     const nextQueFun = () => {
//         if(examData?.competencyList.length !== questionNum + 1)
//         {
//             setQuestionNum(  questionNum + 1 )
//             setQuestion(examData?.competencyList[questionNum + 1])

        
//         // setQuestionNum((prevState) => ({
//         //     ...prevState,
//         //     questionNum: questionNum + 1
//         // }))
//         // setQuestion(examData?.competencyList[questionNum]?.competency)

// // ////////////////

// // add
// if(!examQuestionsData.some(el => el.question.competencyId === question.competencyId)
//     && questionsAnswers.checkedVal !== null
//     // && questionsAnswers.textareaVal.length !== 0
// )
// {
//   setExamQuestionsData(prveState => [...prveState, 
//     {
//         question: question,
//         checkedVal:  questionsAnswers.checkedVal,
//         textarea: questionsAnswers.textareaVal
//     }
//     ])
// } 

// // update
//  if(examQuestionsData.some(el => el.question.competencyId === question.competencyId)
//     && questionsAnswers.checkedVal !== null
//     // && questionsAnswers.textareaVal.length !== 0
//  )
//   {
//     setExamQuestionsData(prveState => 
      
//       prveState.map((que)=> {
//         console.log("que2 =",que);
//         if(que.question.competencyId === question.competencyId)
//         {
//          return {...que, 
            
//                 // question: question,
//                 checkedVal:  questionsAnswers.checkedVal,
//                 textarea: questionsAnswers.textareaVal
            
//           }
//         }
//         return que
//       })


//       // /////////////////////////////
      
//       // [...prveState, 
//       // {
//       //     question: question,
//       //     checkedVal:  choices.filter((choice) => choice.id === Number( e.target.value))
//       //     // checkedVal: e.target.value
//       // }
//       // ]
//       )
//   }


//   setQuestionsAnswers({checkedVal : null, textareaVal: ""})
//         }


//         if(examData?.competencyList.length === questionNum + 1)
//         {
//           setEndExam(true)
//           // setStartExam(false)
//         }
//     }




//     const prevQueFun = () => {
//       if(questionNum  !== 0)
//       {
//           setQuestionNum(  questionNum - 1 )
//           setQuestion(examData?.competencyList[questionNum - 1])

      
//       // setQuestionNum((prevState) => ({
//       //     ...prevState,
//       //     questionNum: questionNum + 1
//       // }))
//       // setQuestion(examData?.competencyList[questionNum]?.competency)

// // ////////////////

// // add
// if(!examQuestionsData.some(el => el.question.competencyId === question.competencyId)
//     && questionsAnswers.checkedVal !== null
// )
// {
// setExamQuestionsData(prveState => [...prveState, 
//   {
//       question: question,
//       checkedVal:  questionsAnswers.checkedVal,
//       textarea: questionsAnswers.textareaVal
//   }
//   ])
// } 

// // update
// if(examQuestionsData.some(el => el.question.competencyId === question.competencyId)
//     && questionsAnswers.checkedVal !== null
// )
// {
//   setExamQuestionsData(prveState => 
    
//     prveState.map((que)=> {
//       console.log("que2 =",que);
//       if(que.question.competencyId === question.competencyId)
//       {
//        return {...que, 
          
//               // question: question,
//               checkedVal:  questionsAnswers.checkedVal,
//               textarea: questionsAnswers.textareaVal
          
//         }
//       }
//       return que
//     })


//     // /////////////////////////////
    
//     // [...prveState, 
//     // {
//     //     question: question,
//     //     checkedVal:  choices.filter((choice) => choice.id === Number( e.target.value))
//     //     // checkedVal: e.target.value
//     // }
//     // ]
//     )
// }


// setQuestionsAnswers({checkedVal : null, textareaVal: ""})
//       }
//   }












//     const saveQuestions = (e, type) => {

//       if(type === "radio")
//       {
//         setQuestionsAnswers(prveState => (
//           {
//             ...prveState,
//             checkedVal: choices.find((choice) => choice.id === Number( e.target.value))
//         }
//         ))
//       }

//       if(type === "textarea")
//       {
//         setQuestionsAnswers(prveState => (
//           {
//             ...prveState,
//             textareaVal: e.target.value
//         }
//         ))
//       }


//       // console.log("tesrt =",choices.filter((choice) => choice.id === Number( e.target.value)));
//       console.log("que =", examQuestionsData.some(el => el.question.competencyId === question.competencyId));

//       // if(examQuestionsData.length === 0 )
//       // {
//       //   setExamQuestionsData(prveState => [...prveState, 
//       //     {
//       //         question: question,
//       //         checkedVal:  choices.find((choice) => choice.id === Number( e.target.value))
//       //         // checkedVal: e.target.value
//       //     }
//       //     ])
//       // }


//       // //////////////////////

//       // if(!examQuestionsData.some(el => el.question.competencyId === question.competencyId))
//       // {
//       //   setExamQuestionsData(prveState => [...prveState, 
//       //     {
//       //         question: question,
//       //         checkedVal:  choices.find((choice) => choice.id === Number( e.target.value))
//       //         // checkedVal: e.target.value
//       //     }
//       //     ])
//       // } 

//       //  if(examQuestionsData.some(el => el.question.competencyId === question.competencyId))
//       //   {
//       //     setExamQuestionsData(prveState => 
            
//       //       prveState.map((que)=> {
//       //         console.log("que2 =",que);
//       //         if(que.question.competencyId === question.competencyId)
//       //         {
//       //          return {...que, 
                  
//       //                 // question: question,
//       //                 checkedVal:  choices.find((choice) => choice.id === Number( e.target.value))
//       //                 // checkedVal: e.target.value
                  
//       //           }
//       //         }
//       //         return que
//       //       })


//       //       // /////////////////////////////
            
//       //       // [...prveState, 
//       //       // {
//       //       //     question: question,
//       //       //     checkedVal:  choices.filter((choice) => choice.id === Number( e.target.value))
//       //       //     // checkedVal: e.target.value
//       //       // }
//       //       // ]
//       //       )
//       //   }
      
      
//     }

    console.log("questionNum =", questionNum);
    console.log("examQuestionsData =", examQuestionsData);
    console.log("questionsAnswers =",questionsAnswers);
    console.log("test =",questionsAnswers?.[questionNum]);
    console.log("test2 =",questionsAnswers?.[questionNum]?.question?.competencyId);
    console.log("test3 =",questionsAnswers?.[questionNum]?.checkedVal?.id);


    console.log("questionsAnswers77777 =",questionsAnswers[`que${questionNum + 1}`]);
 
    return(
      <>
        <Grid item xs={12}  > 
      <form onSubmit={(e)=>{ 
          e.preventDefault()
          if(examData?.competencyList.length >= questionNum + 1)
          {
            nextQueFun()
          }

          // if(examData?.competencyList.length < questionNum + 1 )
          // {
          //   finishExamFun()
          // }
          }}>
       
        {/* <Grid item xs={12}  style={!setStartExam?  {display: 'none'} : {display: 'block'}}>  */}
        {examData?.competencyList.length >= questionNum + 1  && (<>
                    <h1 className={`${classes.textSty} ${style.categorySty} ${locale === "en" ?  style.categoryEnSty : style.categoryArSty}`}>{question?.category}</h1>
                    </>)}
                        <div className={`${style.examContainer}`}>
                          
                            <div>
                            {examData?.competencyList.length >= questionNum + 1 && (<>
                              <LinearProgress variant="determinate" value={((questionNum + 1)*100) / examData?.competencyList.length} />
                              <p>{questionNum + 1}/{examData?.competencyList.length}</p>
                              {/* <h1>
                                  Do you think to suggest our company to a friend or parent?
                              </h1> */}
                              <h1>
                                  {question?.competency}
                              </h1>
                              <FormControl style={{width: "100%"}}>
                                  <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      // value={question?.competencyId === questionsAnswers?.[questionNum]?.question?.competencyId ? questionsAnswers?.[questionNum]?.checkedVal?.id : ""}
                                      value={  (questionsAnswers[`que${questionNum + 1}`]?.checkedVal ? questionsAnswers[`que${questionNum + 1}`]?.checkedVal?.id : "")}
                                      // value={questionsAnswers.checkedVal ? questionsAnswers.checkedVal?.id : ""}
                                      // defaultValue="female"
                                      name="radio-buttons-group"
                                     className={style.radioContainer}
                                  >
                                    {choices?.map((choice,index)=>{
                                        return (
                                            <FormControlLabel 
                                            key={choice.id}
                                            value={choice.id} 
                                            control={<Radio checkedIcon={<CheckIcon className={`${style.checkedIconeSty} ${classes.examMainSty}`}/>} icon={<RadioButtonUncheckedIcon className={style.iconeSty} />} />} 
                                            label={choice.name} 
                                            onChange={(e)=> {
                                                console.log("checl val =", e.target.value)
                                                saveQuestions(e, "radio")
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
                                      {/* please describe with few words why */}
                                      <FormattedMessage {...messages.pleaseDescribeWithFewWordsWhy} />
                                  </p>

                                  

                                  <TextareaAutosize
                                    color="neutral"
                                    minRows={3}
                                    placeholder={intl.formatMessage(messages.TypeHereAdditionalInfo)}
                                    // placeholder="Type here additional info..."
                                    size="lg"
                                    // style={{width: "100%"}}
                                    onChange={(e) => { saveQuestions(e, "textarea")}}
                                    // value={ questionsAnswers[`que${questionNum + 1}`]?.textareaVal }
                                    value={questionsAnswers[`que${questionNum + 1}`]?.textareaVal ? questionsAnswers[`que${questionNum + 1}`]?.textareaVal : ""}
                                    // value={questionsAnswers.textareaVal}
                                    // ref={ref}
                                    required={
                                      examData.exampleRequired 
                                      && questionsAnswers[`que${questionNum + 1}`]
                                       && questionsAnswers[`que${questionNum + 1}`]?.checkedVal 
                                      ? true : false}
                                />
                                {  
                                // !examData.exampleRequired ||
                                // !questionsAnswers[`que${questionNum + 1}`] || 
                                (
                                //   questionsAnswers[`que${questionNum + 1}`] 
                                // && questionsAnswers[`que${questionNum + 1}`]?.textareaVal
                                // && questionsAnswers[`que${questionNum + 1}`]?.textareaVal.length !== 0 
                                examData.exampleRequired 
                                      && questionsAnswers[`que${questionNum + 1}`]
                                       && questionsAnswers[`que${questionNum + 1}`]?.checkedVal 
                                )
                                 ? <span> <FormattedMessage {...messages.ThisFieldIsRequired} /></span> : (
                                  null
                                )}

                                </>)}

                                {/* <div className={style.lineStye}></div> */}

                                {examData?.competencyList.length < questionNum + 1   && (<>
                                <p>
                                  {/* Employee training request */}
                                  <FormattedMessage {...messages.EmployeeTrainingRequest} />
                                </p>
                               

                                <TextareaAutosize
                                    color="neutral"
                                    minRows={3}
                                    placeholder={intl.formatMessage(messages.TypeHereAdditionalInfo)}
                                    // placeholder="Type here additional info..."
                                    size="lg"
                                    // style={{width: "100%"}}
                                    onChange={(e) => { saveQuestions(e, "textareaEmpTraining")}}
                                    // value={ questionsAnswers[`que${questionNum + 1}`]?.textareaVal }
                                    value={textareaEmpTrainingVal?.textareaEmpTraining ? textareaEmpTrainingVal?.textareaEmpTraining : ""}
                                    // value={questionsAnswers?.textareaEmpTraining ? questionsAnswers?.textareaEmpTraining : ""}
                                    // value={questionsAnswers.textareaEmpTraining?.textareaEmpTraining ? questionsAnswers.textareaEmpTraining?.textareaEmpTraining : ""}
                                    // value={questionsAnswers.textareaVal}
                                    // inputRef={inputRef} 
                                    // slotProps={{ textarea: { ref:inputRef } }}
                                    
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
                                      // onClick={onCopy}
                                      // disabled={brCode? false : true}
                                      onClick={prevQueFun}
                                    >
                                   <FormattedMessage {...messages.Prev} />
                                      {/* Prev */}
                                    </Button>
                                  </Grid>

                              {examData?.competencyList.length >= questionNum + 1  && (<>
                                  <Grid item xs={6} md={3} lg={2}>
                                    <Button
                                      variant="contained"
                                      size="medium"
                                      color="primary"
                                      type='submit'
                                      // onClick={nextQueFun}
                                      // onSubmit={nextQueFun}
                                      
                                      // disabled={
                                      //   questionsAnswers[`que${questionNum + 1}`]
                                      //  && questionsAnswers[`que${questionNum + 1}`]?.checkedVal 
                                       
                                      //   // !examData.exampleRequired 
                                      //   // ||  (
                                      //   //   questionsAnswers[`que${questionNum + 1}`] 
                                      //   // && questionsAnswers[`que${questionNum + 1}`]?.textareaVal 
                                      //   // && questionsAnswers[`que${questionNum + 1}`]?.textareaVal.length !== 0)  
                                      //   // ? false : true}
                                      //   ? true : false}
                                      // disabled={examData.exampleRequired &&  questionsAnswers.textareaVal.length !== 0 ? false : true}
                                    >
                                      <FormattedMessage {...messages.Next} />
                                      {/* Next */}
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
                                      // onSubmit={finishExamFun}
                                      onClick={finishExamFun}
                                      // disabled={examData.exampleRequired &&  allQuestionsAnswers.textareaVal.length !== 0 ? false : true}
                                    >
                                       <FormattedMessage {...messages.finish} />
                                      {/* finish */}
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
