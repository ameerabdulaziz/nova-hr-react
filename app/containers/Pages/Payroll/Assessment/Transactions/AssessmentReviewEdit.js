import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AssessmentReviewData from '../api/AssessmentReviewData';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/pagesStyle/EmployeeAssessmentSty.scss'
// import style from '../../../../../styles/styles.scss'
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
import PersonIcon from '@mui/icons-material/Person';
import { format } from 'date-fns';



function AssessmentReviewEdit(props) {
  const [id, setid] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [processing ,setProcessing] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const { state } = useLocation()
  const  ID  = state?.id
  const history=useHistory(); 
  const { intl } = props;
  const { classes } = useStyles();

 
  const [examData, setExamData] = useState();
  const [startExam, setStartExam] = useState(false);
  const [endExam, setEndExam] = useState(false);
  const [userInfo, setUserInfo] = useState(false);

    const [questionNum, setQuestionNum] = useState(0)
    const [question, setQuestion] = useState()
    const [choices, setChoices] = useState()
    const [questionsAnswers, setQuestionsAnswers] = useState([])
    const [allQuestionsAnswers, setAllQuestionsAnswers] = useState({})

    const [uncompletedQuestionsList, setUncompletedQuestionsList] = useState([]);
    const [textareaEmpTrainingVal, setTextareaEmpTrainingVal] = useState("");
    const [OverallAppraisalVal, setOverallAppraisalVal] = useState("");
    const [textareaNoteForEmployeeVal, setTextareaNoteForEmployeeVal] = useState("");
    const [AssessmentReviewLock, setAssessmentReviewLock] = useState(true);
   

    console.log("textareaEmpTrainingVal =", textareaEmpTrainingVal);
    console.log("OverallAppraisalVal =", OverallAppraisalVal);
    console.log("textareaNoteForEmployeeVal =", textareaNoteForEmployeeVal);


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
      // setTextareaEmpTrainingVal(prveState => (
      //   {
      //     ...prveState,
      //     [`textareaEmpTraining`] : e.target.value
      // }
      // ))
      setTextareaEmpTrainingVal(e.target.value)
    }

    if(type === "OverallAppraisal")
    {
      // setOverallAppraisalVal(prveState => (
      //   {
      //     ...prveState,
      //     [`OverallAppraisal`] : e.target.value
      // }
      // ))
      setOverallAppraisalVal( e.target.value)
    }


    if(type === "NoteForEmployee")
    {
      // setTextareaNoteForEmployeeVal(prveState => (
      //   {
      //     ...prveState,
      //     [`NoteForEmployee`] : e.target.value
      // }
      // ))
      setTextareaNoteForEmployeeVal(e.target.value)
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
      // setTextareaEmpTrainingVal(prveState => (
      //   {
      //     ...prveState,
      //     [`textareaEmpTraining`] : e.target.value
      // }
      // ))
      setTextareaEmpTrainingVal(e.target.value)
    }

    if(type === "OverallAppraisal")
    {
      // setOverallAppraisalVal(prveState => (
      //   {
      //     ...prveState,
      //     [`OverallAppraisal`] : e.target.value
      // }
      // ))
      setOverallAppraisalVal( e.target.value)
    }


    if(type === "NoteForEmployee")
    {
      // setTextareaNoteForEmployeeVal(prveState => (
      //   {
      //     ...prveState,
      //     [`NoteForEmployee`] : e.target.value
      // }
      // ))
      setTextareaNoteForEmployeeVal(e.target.value)
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
      const examQuestionsData = await AssessmentReviewData(locale).GetDataById(ID);
      setExamData(examQuestionsData[0]);
      // setExamData(testData);

      // testData.competencyList.map((queData, index)=>{
        examQuestionsData[0].competencyList.map((queData, index)=>{
        if(queData.employeeChoiceID !== null || queData.employeeExample.length !== 0)
        {

          // if(testData.showStyle === 1)
          if(examQuestionsData[0].showStyle === 1)
          {
          setQuestionsAnswers(prveState => (
     
            {
              ...prveState,
              [`que${index + 1}`] : {
                ...prveState[`que${index + 1}`],
                // checkedVal: testData.choiceList.find((choice) => choice.id === queData.employeeChoiceID) ? testData.choiceList.find((choice) => choice.id === queData.employeeChoiceID) : null,
                checkedVal: examQuestionsData[0].choiceList.find((choice) => choice.id === queData.employeeChoiceID) ? examQuestionsData[0].choiceList.find((choice) => choice.id === queData.employeeChoiceID) : null,
                question: queData,
                textareaVal: queData.employeeExample
              }
          }
          ))
        }

        // if(testData.showStyle === 2)
        if(examQuestionsData[0].showStyle === 2)
        {
        setAllQuestionsAnswers(prveState => (
     
            {
              ...prveState,
              [`que${index + 1}`] : {
                ...prveState[`que${index + 1}`],
                // checkedVal: testData.choiceList.find((choice) => choice.id === queData.employeeChoiceID) ? testData.choiceList.find((choice) => choice.id === queData.employeeChoiceID) : null,
                checkedVal: examQuestionsData[0].choiceList.find((choice) => choice.id === queData.employeeChoiceID) ? examQuestionsData[0].choiceList.find((choice) => choice.id === queData.employeeChoiceID) : null,
                question: queData,
                textareaVal: queData.employeeExample
              }
          }
          ))
        }


        // setTextareaEmpTrainingVal(prveState => (
        //   {
        //     ...prveState,
        //     [`textareaEmpTraining`] : testData.staffTrainingReq
        //     // [`textareaEmpTraining`] : examQuestionsData[0].staffTrainingReq
        // }
        // ))
        // setTextareaEmpTrainingVal(testData.staffTrainingReq)
        setTextareaEmpTrainingVal(examQuestionsData[0].staffTrainingReq)


        // setOverallAppraisalVal(prveState => (
        //   {
        //     ...prveState,
        //     [`OverallAppraisal`] : testData.mgrStaffAllert
        //     // [`textareaEmpTraining`] : examQuestionsData[0].staffTrainingReq
        // }
        // ))
        // setOverallAppraisalVal(testData.mgrStaffAllert)
        setOverallAppraisalVal(examQuestionsData[0].mgrStaffAllert)


        // setTextareaNoteForEmployeeVal(prveState => (
        //   {
        //     ...prveState,
        //     [`NoteForEmployee`] : testData.mgrComment
        //     // [`textareaEmpTraining`] : examQuestionsData[0].staffTrainingReq
        // }
        // ))
        // setTextareaNoteForEmployeeVal(testData.mgrComment)
        setTextareaNoteForEmployeeVal(examQuestionsData[0].mgrComment)

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
              que.mgrChoiceId = questionsAnswers[key]?.checkedVal?.id
              // que.employeeChoiceID = questionsAnswers[key]?.checkedVal?.id
            }

            // if(questionsAnswers[key].textareaVal )
            // {
            //   que.employeeExample = questionsAnswers[key].textareaVal
            // }

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
              que.mgrChoiceId = allQuestionsAnswers[key]?.checkedVal?.id
              // que.employeeChoiceID = allQuestionsAnswers[key]?.checkedVal?.id
            }

            // if(allQuestionsAnswers[key].textareaVal )
            // {
            //   que.employeeExample = allQuestionsAnswers[key].textareaVal
            // }

          }
          });
      }
    }

    })



    let data = 
    // {
    //   "assessmentID": examData.assessmentId,
    //   "TemplateId":examData.templateId,
    //   "trainingReq":  textareaEmpTrainingVal.textareaEmpTraining,
    //   "assclosed": buttonType === "save" ? false :  true ,
    //   "competencyList": examData.competencyList
    // }
    {
      "assessmentID":  examData.assessmentId,
      "templateId": examData.templateId,
      "trainingReq": textareaEmpTrainingVal,
      // "trainingReq": textareaEmpTrainingVal.textareaEmpTraining,
      "isClosed": buttonType === "save" ? false :  true ,
      "mgrComment": textareaNoteForEmployeeVal,
      "mgrEmployeeAllert": OverallAppraisalVal,
      "competencyList": examData.competencyList
      // "competencyList": [
      //   {
      //     "competencyID": 0,
      //     "totalGrade": 0,
      //     "categoryID": 0,
      //     "employeeChoiceID": 0,
      //     "employeeExample": "string",
      //     "notEffective": true,
      //     "mgrChoiceID": 0
      //   }
      // ]
    }

    
console.log("api data =", data);


    // try {
    //   let response = await EmployeeAssessmentData().Save(data);

    //   if (response.status==200) {
    //     toast.success(notif.saved);
    
    //   } else {
    //       toast.error(response.statusText);
    //   }
    //   setIsLoading(false)
    //   setProcessing(false)
    // } catch (err) {
    //   //
    // } finally {
    //   setIsLoading(false)
    //   setProcessing(false)
    // }
  }


  const testData = {
    "assessmentId": 16,
    "employeeName": "Ahmed awad",
    "birthDate": "2020-10-10T00:00:00",
    "hiringDate": "2021-08-10T00:00:00",
    "organizationName": "HR",
    "jobName": "Manager Support",
    "staffTrainingReq": "training test2",
    "templateId": 2,
    "templateName": "Assessment for emplouee evaluation",
    "templateDesc": "“The content has been classified as confidential and may be legally protected from disclosure, you are hereby notified that any use, dissemination, copying, or storage of this content or its attachments is strictly prohibited. In case of any disclosure of this content, you will be subjected to an HR Investigation.”",
    "showStyle": 2,
    "exampleRequired": true,
    "rev": false,
    "choiceList": [
        {
            "id": 1,
            "name": "Weak",
            "fromPer": 0.0,
            "toPer": 25.0,
            "choiceGrade": 0.0
        },
        {
            "id": 2,
            "name": "Moderate",
            "fromPer": 26.0,
            "toPer": 50.0,
            "choiceGrade": 0.0
        },
        {
            "id": 3,
            "name": "Strong",
            "fromPer": 51.0,
            "toPer": 75.0,
            "choiceGrade": 0.0
        },
        {
            "id": 4,
            "name": "Very Strong",
            "fromPer": 76.0,
            "toPer": 89.0,
            "choiceGrade": 0.0
        },
        {
            "id": 5,
            "name": "Exceptional",
            "fromPer": 90.0,
            "toPer": 100.0,
            "choiceGrade": 0.0
        },
        {
            "id": 6,
            "name": "ght",
            "fromPer": 12.0,
            "toPer": 12.0,
            "choiceGrade": 12.0
        },
        {
            "id": 7,
            "name": "11111",
            "fromPer": 451.0,
            "toPer": 451.0,
            "choiceGrade": 1.0
        }
    ],
    "mgrComment": null,
    "mgrStaffAllert": null,
    "competencyList": [
        {
            "competencyId": 3,
            "competency": "Understanding of Scope & Deliverable",
            "totalGrade": 10.0,
            "categoryId": 2,
            "category": "Core Competencies",
            "employeeChoiceID": 1,
            "employeeChoiceName": "Weak",
            "employeeExample": "dsd",
            "notEffective": false,
            "mgrChoiceId": null,
            "mgrChoiceName": null
        },
        {
            "competencyId": 4,
            "competency": "Control of Personal Work Plan (time management & productivity)",
            "totalGrade": 10.0,
            "categoryId": 2,
            "category": "Core Competencies",
            "employeeChoiceID": 2,
            "employeeChoiceName": "Moderate",
            "employeeExample": "sss",
            "notEffective": false,
            "mgrChoiceId": null,
            "mgrChoiceName": null
        },
        {
            "competencyId": 5,
            "competency": "Leadership Skills & Decision Making",
            "totalGrade": 10.0,
            "categoryId": 2,
            "category": "Core Competencies",
            "employeeChoiceID": 3,
            "employeeChoiceName": "Strong",
            "employeeExample": "sss",
            "notEffective": false,
            "mgrChoiceId": null,
            "mgrChoiceName": null
        },
        {
            "competencyId": 6,
            "competency": "Basic Technical Knowledge of Associated Trades",
            "totalGrade": 10.0,
            "categoryId": 3,
            "category": "Technical Competencies",
            "employeeChoiceID": 4,
            "employeeChoiceName": "Very Strong",
            "employeeExample": "vvv",
            "notEffective": false,
            "mgrChoiceId": null,
            "mgrChoiceName": null
        },
        {
            "competencyId": 7,
            "competency": "Coordination Skills with Associated Trades",
            "totalGrade": 10.0,
            "categoryId": 3,
            "category": "Technical Competencies",
            "employeeChoiceID": 5,
            "employeeChoiceName": "Exceptional",
            "employeeExample": "yyy",
            "notEffective": false,
            "mgrChoiceId": null,
            "mgrChoiceName": null
        },
        {
            "competencyId": 8,
            "competency": "Multi-faceted Problem Solving",
            "totalGrade": 10.0,
            "categoryId": 3,
            "category": "Technical Competencies",
            "employeeChoiceID": 6,
            "employeeChoiceName": "ght",
            "employeeExample": "jjjj",
            "notEffective": false,
            "mgrChoiceId": null,
            "mgrChoiceName": null
        },
        {
            "competencyId": 9,
            "competency": "Establishing and Maintaining Good & Efficient Relations with Project Stakeholders",
            "totalGrade": 10.0,
            "categoryId": 4,
            "category": "Functional Competencies",
            "employeeChoiceID": 7,
            "employeeChoiceName": "11111",
            "employeeExample": "eewwe",
            "notEffective": false,
            "mgrChoiceId": null,
            "mgrChoiceName": null
        },
        {
            "competencyId": 10,
            "competency": "Recognition & Management of Firm Responsibilities",
            "totalGrade": 10.0,
            "categoryId": 4,
            "category": "Functional Competencies",
            "employeeChoiceID": 1,
            "employeeChoiceName": "Weak",
            "employeeExample": "ffew",
            "notEffective": false,
            "mgrChoiceId": null,
            "mgrChoiceName": null
        },
        {
            "competencyId": 11,
            "competency": "Ability to Meet Firm Objectives",
            "totalGrade": 10.0,
            "categoryId": 5,
            "category": "Organizational Competencies",
            "employeeChoiceID": 2,
            "employeeChoiceName": "Moderate",
            "employeeExample": "csca",
            "notEffective": false,
            "mgrChoiceId": null,
            "mgrChoiceName": null
        },
        {
            "competencyId": 12,
            "competency": "Hard Work",
            "totalGrade": 10.0,
            "categoryId": 5,
            "category": "Organizational Competencies",
            "employeeChoiceID": 7,
            "employeeChoiceName": "11111",
            "employeeExample": "test1",
            "notEffective": true,
            "mgrChoiceId": null,
            "mgrChoiceName": null
        }
    ]
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
                  {( startExam && !endExam) && (
                  <Grid item xs={12} className={`${style.gridContainerSty} ${!startExam ? style.HideContainers : style.showContainers }`}  
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
                                 onClick={() => setEndExam(true)}
                                 >
                                  <FormattedMessage {...messages.AssessmentFinish} />
                            </Button>

                            <p>
                                Ali Omar
                            </p>
                            <PersonIcon />
                                  </div>

                            
                        </div>               
                    </Grid>
                    )}

                    {!startExam && (
                    <Grid item xs={12}  md={6} className={`${style.gridContainerSty} ${startExam? style.HideContainers : style.showContainers }`}  
                      > 
                        <div className={`${style.mainContainer} ${classes.examMainSty}`}>

                            <div>
                                <img src={examLogo2} />
                                <h1 className={`${classes.textSty}`}>{ examData ? examData.isClosed ? <FormattedMessage {...messages.AssessmentUnderReview} />  :  examData?.templateName :  <FormattedMessage {...messages.AssessmentDurationEnded} /> }</h1>
                            </div>

                            
                        </div>               
                    </Grid>
                    )}


                  {!startExam && (
                    <Grid item xs={12} md={6} className={`${style.gridContainerSty} ${startExam? style.HideContainers : style.showContainers }`}  
                      > 
                    
                    <div className={`${style.startExamContainer}`}>
                    <div>
                                
                                <img src={examLogo} />
                                <h1 className={`${classes.textSty}`}>{ examData ? examData.isClosed ? <FormattedMessage {...messages.AssessmentUnderReview} /> :  examData?.templateName : <FormattedMessage {...messages.AssessmentDurationEnded} />}</h1>
                                {examData && (
                                <p>
                                    {examData?.templateDesc}
                                </p>
                                )}

                            {examData && (
                                <Button
                                variant="contained"
                                size="medium"
                                color="primary"
                                 onClick={() => {
                                  setUserInfo(true)
                                  setStartExam(true)
                                }}
                                //  onClick={() => setStartExam(true)}
                                 >
                                  <FormattedMessage {...messages.Start} />
                                </Button>
                                  )}
                            </div>
                    </div>
                    </Grid>
                    )}

                    {
                      (startExam && !endExam && !userInfo && (examData.showStyle === 1)) && (
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
                        OverallAppraisalVal={OverallAppraisalVal}
                        textareaNoteForEmployeeVal={textareaNoteForEmployeeVal}
                        intl={intl}
                        AssessmentReviewLock={AssessmentReviewLock}
                        />
                      )
                    }


                  {
                      (startExam && !endExam && !userInfo && (examData.showStyle === 2)) && (
                        <ExamQuestionWithoutNextAndPrev 
                          examData={examData} 
                          choices={choices}
                          allQuestionsAnswers={allQuestionsAnswers}
                          saveAllQuestions={saveAllQuestions}
                          finishExamFun={finishExamFun}
                          textareaEmpTrainingVal={textareaEmpTrainingVal}
                          OverallAppraisalVal={OverallAppraisalVal}
                          textareaNoteForEmployeeVal={textareaNoteForEmployeeVal}
                          intl={intl}
                          AssessmentReviewLock={AssessmentReviewLock}
                        />

                      )}
           
              

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

                    {/* /// */}

                  {userInfo && (
                    <Grid item xs={12}  > 
                       
       
                        {/* <div className={``}> */}
                        <div className={`${style.examContainer} ${style.userInfoContainer}`}>
                          
                            <div>

                            <Grid
                                  container
                                  spacing={3}
                                //   alignItems="flex-end"
                                  direction="row"
                                  
                                  >
                            <Grid item xs={12} md={6} >
                                <div className={`${style.userInfoSty}`}>
                                    <p>Department: </p> <p className={classes.textSty}>{examData?.organizationName}</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} md={6} >
                                <div className={`${style.userInfoSty}`}>
                                    <p>Employee: </p> <p className={classes.textSty}>{examData?.employeeName}</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} md={6} >
                                <div className={`${style.userInfoSty}`}>
                                    <p>Job Title: </p> <p className={classes.textSty}>{examData?.jobName}</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} md={6} >
                                <div className={`${style.userInfoSty}`}>
                                    <p>Birth Date: </p> <p className={classes.textSty}>{examData ? format(new Date(examData.birthDate), 'yyyy-MM-dd') : ""}</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} md={6} >
                                <div className={`${style.userInfoSty}`}>
                                    <p>Hiring date: </p> <p className={classes.textSty}>{examData ?  format(new Date(examData.hiringDate), 'yyyy-MM-dd') : ""}</p>
                                </div>
                            </Grid>

                            </Grid>
                                

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
                                 

                                  {/* <Grid item xs={6} md={3}  lg={2}>
                                    <Button
                                      variant="contained"
                                      size="medium"
                                      color="primary"
                                      onClick={prevQueFun}
                                    >
                                   <FormattedMessage {...messages.Prev} />
                                    </Button>
                                  </Grid> */}

                              {examData?.competencyList.length >= questionNum + 1  && (<>
                                  <Grid item xs={6} md={3} lg={2}>
                                    <Button
                                      variant="contained"
                                      size="medium"
                                      color="primary"
                                      onClick={() => {
                                        setStartExam(true)
                                        setUserInfo(false)
                                      }}
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
                    
                    </Grid>

                  )}

                    {/* ///////// */}

                </Grid>
            </CardContent>
        </Card>

    </PayRollLoader>
  );
}

AssessmentReviewEdit.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AssessmentReviewEdit); 
