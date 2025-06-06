import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import EmployeeAssessmentData from '../api/EmployeeAssessmentData';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/pagesStyle/EmployeeAssessmentSty.scss'
import {  useHistory, useLocation  } from 'react-router-dom';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../messages';
import PropTypes from 'prop-types';
import useStyles from '../../Style';
import PayRollLoader from '../../Component/PayRollLoader';
import {Box, Card ,CardContent, CircularProgress, Typography } from "@mui/material";
import examLogo from '../../Assets/Employee-Assessment/exam-logo.png';
import examLogo2 from '../../Assets/Employee-Assessment/info_graphic_1.svg';
import finishLogo from '../../Assets/Employee-Assessment/tht1.png';
import  ExamQuestionNextAndPrev  from '../../Component/ExamQuestionNextAndPrev';
import  ExamQuestionWithoutNextAndPrev  from '../../Component/ExamQuestionWithoutNextAndPrev';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';



function EmployeeAssessment(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [processing ,setProcessing] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const { state } = useLocation()
  const history=useHistory(); 
  const { intl } = props;
  const { classes } = useStyles();

 
  const [examData, setExamData] = useState();
  const [startExam, setStartExam] = useState(false);
  const [endExam, setEndExam] = useState(false);

    const [questionNum, setQuestionNum] = useState(0)
    const [question, setQuestion] = useState()
    const [choices, setChoices] = useState()
    const [questionsAnswers, setQuestionsAnswers] = useState([])
    const [allQuestionsAnswers, setAllQuestionsAnswers] = useState({})

    const [uncompletedQuestionsList, setUncompletedQuestionsList] = useState([]);
    const [textareaEmpTrainingVal, setTextareaEmpTrainingVal] = useState("");
    const [saveBtnLock, setSaveBtnLock] = useState(false);
   




    useEffect(()=>{
      if(examData)
      {
        setQuestion(examData?.competencyList[0])
        setChoices(examData?.choiceList)
      }
    },[examData])


    const nextQueFun = () => {
     
      if(examData?.competencyList.length !== questionNum )
      {
          setQuestionNum(  questionNum + 1 )
          setQuestion(examData?.competencyList[questionNum + 1])
      }
  }


  
  const prevQueFun = () => {
    if(questionNum  !== 0)
    {
        setQuestionNum(  questionNum - 1 )
        setQuestion(examData?.competencyList[questionNum - 1])
    }
}

  const saveQuestions = (e, type) => {

    if(type === "radio")
    {
      setQuestionsAnswers(prveState => (
      {
        ...prveState,
        [`que${questionNum + 1}`] : {
          ...prveState[`que${questionNum + 1}`],
          checkedVal: choices.find((choice) => choice.id === Number( e.target.value)),
          question: question
        }
    }
    ))
    }

    if(type === "textarea")
    {
      setQuestionsAnswers(prveState => (
        {
          ...prveState,
          [`que${questionNum + 1}`] : {
            ...prveState[`que${questionNum + 1}`],
          textareaVal: e.target.value,
          question: question
          }
      }
      ))
    }


    if(type === "textareaEmpTraining")
    {
      setTextareaEmpTrainingVal(e.target.value)
    }
 
  }
 

  const saveAllQuestions = (e, type,index) => {

    if(type === "radio")
    {
      setAllQuestionsAnswers(prveState => (
        {
          ...prveState,
          [`que${index + 1}`] : {
            ...prveState[`que${index + 1}`],
            checkedVal: choices.find((choice) => choice.id === Number( e.target.value)),
            question: examData.competencyList[index]
          }
      }
      ))
    }

    if(type === "textarea")
    {
      setAllQuestionsAnswers(prveState => (
        {
          ...prveState,
          [`que${index + 1}`] : {
            ...prveState[`que${index + 1}`],
          textareaVal: e.target.value,
          question: examData.competencyList[index]
          }
      }
      ))
    }


    if(type === "textareaEmpTraining")
    {
      setTextareaEmpTrainingVal(e.target.value)
    }

  }


  const checkUnansweredQuestionsFun = () => {
    let questionNums = []
    examData.competencyList.map((que,index)=>{
      
    if(examData.showStyle === 1)
    {

      if(!Object.keys(questionsAnswers).some(function(k) { return questionsAnswers[k]?.question?.competencyId === que.competencyId; }))
      {
        questionNums.push(index + 1)
      }

    }

    if(examData.showStyle === 2)
    {
      if(!Object.keys(allQuestionsAnswers).some(function(k) { return allQuestionsAnswers[k]?.question?.competencyId === que.competencyId; }))
      {
        questionNums.push(index + 1)
      }

    }

    })

    setUncompletedQuestionsList(questionNums)
  }


  const backToExamFun = (queNum) => {
    setStartExam(true)
    setEndExam(false)
    setQuestionNum(queNum - 1)
    setQuestion(examData?.competencyList[queNum - 1])
  }

  const finishExamFun = () => {
    setEndExam(true)
    checkUnansweredQuestionsFun()
    
  }


  async function fetchData() {
    try {
      const examQuestionsData = await EmployeeAssessmentData(locale).Get();
      setExamData(examQuestionsData[0]);
      

          examQuestionsData[0].competencyList.map((queData, index)=>{
        if(queData.employeeChoiceID !== null || queData.employeeExample.length !== 0)
        {

          if(examQuestionsData[0].showStyle === 1)
          {
          setQuestionsAnswers(prveState => (
     
            {
              ...prveState,
              [`que${index + 1}`] : {
                ...prveState[`que${index + 1}`],
                checkedVal: examQuestionsData[0].choiceList.find((choice) => choice.id === queData.employeeChoiceID) ? examQuestionsData[0].choiceList.find((choice) => choice.id === queData.employeeChoiceID) : null,
                question: queData,
                textareaVal: queData.employeeExample
              }
          }
          ))
        }

        if(examQuestionsData[0].showStyle === 2)
        {
        setAllQuestionsAnswers(prveState => (
     
            {
              ...prveState,
              [`que${index + 1}`] : {
                ...prveState[`que${index + 1}`],
                checkedVal: examQuestionsData[0].choiceList.find((choice) => choice.id === queData.employeeChoiceID) ? examQuestionsData[0].choiceList.find((choice) => choice.id === queData.employeeChoiceID) : null,
                question: queData,
                textareaVal: queData.employeeExample
              }
          }
          ))
        }


        setTextareaEmpTrainingVal(examQuestionsData[0].staffTrainingReq)

        }
      })

      

    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);





  const submitFun = async (buttonType) => {
    setIsLoading(true)
    setProcessing(true)

    examData.competencyList.map((que,index)=>{

      if(examData.showStyle === 1)
      {

      if(Object.keys(questionsAnswers).some(function(k) { return questionsAnswers[k].question.competencyId === que.competencyId; }))
      {
        
        Object.keys(questionsAnswers).forEach((key, index) => {
          if(questionsAnswers[key].question.competencyId === que.competencyId)
          {

            if(questionsAnswers[key].checkedVal && questionsAnswers[key].checkedVal.id )
            {
              que.employeeChoiceID = questionsAnswers[key]?.checkedVal?.id
            }

            if(questionsAnswers[key].textareaVal )
            {
              que.employeeExample = questionsAnswers[key].textareaVal
            }

          }
          });
      }
    }
    else if(examData.showStyle === 2)
    {
      if(Object.keys(allQuestionsAnswers).some(function(k) { return allQuestionsAnswers[k]?.question?.competencyId === que.competencyId; }))
      {
  
        Object.keys(allQuestionsAnswers).forEach((key, index) => {
          if(allQuestionsAnswers[key]?.question?.competencyId === que.competencyId)
          {
            if(allQuestionsAnswers[key].checkedVal && allQuestionsAnswers[key].checkedVal.id )
            {
              que.employeeChoiceID = allQuestionsAnswers[key]?.checkedVal?.id
            }

            if(allQuestionsAnswers[key].textareaVal )
            {
              que.employeeExample = allQuestionsAnswers[key].textareaVal
            }

          }
          });
      }
    }

    })



    let data = {
      "assessmentId": examData.assessmentId,
      "templateId":examData.templateId,
      "staffTrainingReq":  textareaEmpTrainingVal,
      "isClosed": buttonType === "save" ? false :  true ,
      "competencyList": examData.competencyList
    }



    try {
      let response = await EmployeeAssessmentData().Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
    
        if(buttonType === "submit")
        {
          fetchData();
          setStartExam(false)
          setEndExam(false)
          setQuestionNum(0)
        }

        if(buttonType === "save")
        {

          setSaveBtnLock(true)
        }

      } else {
          toast.error(response.statusText);
      }
      setIsLoading(false)
      setProcessing(false)
    } catch (err) {
      //
    } finally {
      setIsLoading(false)
      setProcessing(false)
    }
  }


  const endExamFun = () => {
    let lock = true
    // used in if user click on finish button and he choose radio without textarea, do not close exam until he enter data
    Object.keys(questionsAnswers).forEach(function(key, index) {
      if(!Object.keys(questionsAnswers[key]).some(key => key === 'textareaVal'))
      {
        lock = false
      }
    });

    if(!lock)
    {
      toast.error(intl.formatMessage(messages.textareaErrMes));
    }
    else
    {
      setEndExam(true)
    }

  }
    
  
  return (
    <PayRollLoader isLoading={isLoading} whiteBg icon="border_color" >
        <Card >
            <CardContent  className={style.examCardContentSty}>
                <Grid item xs={12}  md={12} 
                container
                alignItems="flex-start"
                direction="row"
                >
                  {/* Banner */}
                  {( startExam && !endExam) && (
                  <Grid item xs={12} className={`${style.gridContainerSty} `}  
                      > 
                          <div className={` ${style.panarContainer} ${classes.examMainSty}`}>
                          <div>
                              <img src={examLogo2} />
                              <div>
                                  <p>{examData?.templateName}</p>
                              </div>
                          </div>
                          <div>
                            <Button
                                variant="contained"
                                size="medium"
                                color="primary"
                                onClick={() => endExamFun()}
                                 >
                                  <FormattedMessage {...messages.AssessmentFinish} />
                            </Button>
                          </div>
                        </div>               
                    </Grid>
                    )}
                     {/* start page left side */}
                    {!startExam && (
                    <Grid item xs={12}  md={6} className={`${style.gridContainerSty} `} > 
                        <div className={`${style.mainContainer} ${classes.examMainSty}`}>
                            <div>
                                <img src={examLogo2} />
                                <h1 className={`${classes.textSty}`}>{ examData ? examData.isClosed ? <FormattedMessage {...messages.AssessmentUnderReview} />  :  examData?.templateName :  <FormattedMessage {...messages.AssessmentDurationEnded} /> }</h1>
                            </div>
                        </div>               
                    </Grid>
                    )}

                  {/* start page right side */}
                  {!startExam && (
                    <Grid item xs={12} md={6} className={`${style.gridContainerSty} `} > 
                      <div className={`${style.startExamContainer}`}>
                        <div>
                          <img src={examLogo} />
                          <h1 className={`${classes.textSty}`}>{ examData ? examData.isClosed ? <FormattedMessage {...messages.AssessmentUnderReview} /> :  examData?.templateName : <FormattedMessage {...messages.AssessmentDurationEnded} />}</h1>
                            {examData && (
                              <p>
                                {examData?.templateDesc}
                              </p>
                            )}
                            {examData && (examData.isClosed === false) && (
                                <Button
                                variant="contained"
                                size="medium"
                                color="primary"
                                 onClick={() => setStartExam(true)}
                                 >
                                  <FormattedMessage {...messages.Start} />
                                </Button>
                            )}
                        </div>
                      </div>
                    </Grid>
                  )}

                    {(startExam && !endExam && (examData.showStyle === 1)) && (
                        <ExamQuestionNextAndPrev 
                        examData={examData} 
                        questionNum={questionNum}
                        question={question}
                        choices={choices}
                        questionsAnswers={questionsAnswers}
                        nextQueFun={nextQueFun}
                        prevQueFun={prevQueFun}
                        saveQuestions={saveQuestions}
                        finishExamFun={finishExamFun}
                        textareaEmpTrainingVal={textareaEmpTrainingVal}
                        intl={intl}
                        />
                    )}

                    {(startExam && !endExam && (examData.showStyle === 2)) && (
                          <ExamQuestionWithoutNextAndPrev 
                          examData={examData} 
                          choices={choices}
                          allQuestionsAnswers={allQuestionsAnswers}
                          saveAllQuestions={saveAllQuestions}
                          finishExamFun={finishExamFun}
                          textareaEmpTrainingVal={textareaEmpTrainingVal}
                          intl={intl}
                          />
                    )}
                {/* End window */}
                  {endExam && (
                    <Grid item xs={12} >
                      <div className={ `${style.resultContainerSty} ${classes.containerSty}`}>
                          <div className={`${classes.examMainSty}`}>
                            <img src={finishLogo} />
                            <h1 >
                                <FormattedMessage {...messages.ThankYouForCompleteTheAssessment} />
                            </h1>
                          </div>

                          <div>
                            <Typography >
                              <FormattedMessage {...messages.completedQuestions} />
                              </Typography>
                            <Box >
                              <CircularProgress variant="determinate" value={100}  />

                          {examData.showStyle === 1 && (<>
                              <CircularProgress variant="determinate" style={{transform: 'scaleX(-1) rotate(-90deg'}}  value={(Object.keys(questionsAnswers).length*100)/examData?.competencyList.length} />
                              <Typography position='absolute' className={`${classes.textSty}`}>{(Object.keys(questionsAnswers).length*100)/examData?.competencyList.length}%</Typography>
                          </>)}

                          {examData.showStyle === 2 && (<>
                              <CircularProgress variant="determinate" style={{transform: 'scaleX(-1) rotate(-90deg'}}  value={(Object.keys(allQuestionsAnswers ).length*100)/examData?.competencyList.length} />
                              <Typography position='absolute' className={`${classes.textSty}`}>{(Object.keys(allQuestionsAnswers ).length*100)/examData?.competencyList.length}%</Typography>
                          </>)}

                          </Box>

                          {uncompletedQuestionsList.length !== 0 && (
                            <p className={classes.textSty}>
                              <FormattedMessage {...messages.ThereAreQuestionsThatYouDidNotAnswerWhichAre} /> ( {uncompletedQuestionsList.toString()} ).
                            </p>
                            )}
                        </div>

                        <Grid item xs={12}
                          container
                          spacing={3}
                          direction="row"
                          >

                          {uncompletedQuestionsList.length !== 0 && (
                            <Grid item xs={12}  lg={4}>
                              <Button
                                variant="contained"
                                size="medium"
                                color="primary"
                                onClick={()=>backToExamFun(uncompletedQuestionsList[0])}
                              >
                                <FormattedMessage {...messages.BackToAssessment} />
                              </Button>
                              </Grid>
                          )}


                            <Grid item xs={12}   lg={uncompletedQuestionsList.length !== 0 ? 4 : 6}>
                              <Button
                                variant="contained"
                                size="medium"
                                color="primary"
                                onClick={()=>submitFun("save")}
                                disabled={saveBtnLock}
                              >
                                <FormattedMessage {...messages.save} />
                              </Button>
                              </Grid>

                              <Grid item xs={12}  lg={uncompletedQuestionsList.length !== 0 ? 4 : 6}>
                              <Button
                                variant="contained"
                                size="medium"
                                color="primary"
                                onClick={()=>submitFun("submit")}
                                disabled={uncompletedQuestionsList.length === 0 ? false : true}
                              >
                                <FormattedMessage {...messages.submit} />
                              </Button>
                              </Grid>
                          </Grid>

                      </div>
                    </Grid>
                    )}

                </Grid>
            </CardContent>
        </Card>
    </PayRollLoader>
  );
}

EmployeeAssessment.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeAssessment); 
