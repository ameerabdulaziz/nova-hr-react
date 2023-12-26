import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import EmployeeAssessmentData from '../api/EmployeeAssessmentData';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss'
import {  useHistory, useLocation  } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../messages';
import PropTypes from 'prop-types';
import GeneralListApis from '../../api/GeneralListApis'; 
import { PapperBlock } from 'enl-components';
import useStyles from '../../Style';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveButton from '../../Component/SaveButton';
import PayRollLoader from '../../Component/PayRollLoader';
import {Box, Card ,CardContent, InputAdornment, CircularProgress, Typography } from "@mui/material";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import LinearProgress from '@mui/material/LinearProgress';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import Textarea from '@mui/joy/Textarea';
// import  TextareaAutosize  from '@mui/base/TextareaAutosize';
import { TextareaAutosize } from '@mui/base';
import examLogo from '../../Assets/Employee-Assessment/exam-logo.png';
import  ExamQuestionNextAndPrev  from '../../Component/ExamQuestionNextAndPrev';
import  ExamQuestionWithoutNextAndPrev  from '../../Component/ExamQuestionWithoutNextAndPrev';
import  logo  from '../../Assets/Employee-Assessment/1.png';
import EmployeeAssessmentPopup from "../../Component/EmployeeAssessmentPopup";



function EmployeeAssessment(props) {
  const [id, setid] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [processing ,setProcessing] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const { state } = useLocation()
  const history=useHistory(); 
  const { intl } = props;
  const { classes } = useStyles();

  const [brCode, setBrCode] = useState(null);
  const [data, setdata] = useState({
    PersonalExemption: "",
    specialNeedsExemption: "",
    FirstBracketLimit: "",
    FirstBracketTax: "",
    SecondBracketLimit: "",
    SecondBracketTax: "",
    ThirdBracketLimit: "",
    ThirdBracketTax: "",
    FourthBracketLimit: "",
    FourthBracketTax: "",
    FifthBracketLimit: "",
    FifthBracketTax: "",
    SixthBracketLimit: "",
    SixthBracketTax: "",
    seventhBracketLimit: "",
    seventhBracketTax: "",
    EighthBracketLimit: "",
    EighthBracketTax: "",
    EpidemicsContribution: "",
    DisplayName: "",
    FixedElementsSILimit: "",
    CompanyShare: "",
    TheEmployeesShareOfSI: "",
  });

// ///////////
const [examData, setExamData] = useState();
  const [startExam, setStartExam] = useState(false);
  const [endExam, setEndExam] = useState(false);
  const [examQuestionsData, setExamQuestionsData] = useState([])

  // ///
  const [questionNum, setQuestionNum] = useState(0)
    const [question, setQuestion] = useState()
    const [choices, setChoices] = useState()
    const [questionsAnswers, setQuestionsAnswers] = useState([])
    // const [questionsAnswers, setQuestionsAnswers] = useState({checkedVal : null, textareaVal: ""})
    const [allQuestionsAnswers, setAllQuestionsAnswers] = useState({})

    const [openParentPopup, setOpenParentPopup] = useState(false);
    const [uncompletedQuestionsList, setUncompletedQuestionsList] = useState([]);


    const testDate =     {
      "assessmentId": 0,
      "staffTrainingReq": "",
      "templateName": "Assessment for emplouee evaluation",
      "templateDesc": "“The content has been classified as confidential and may be legally protected from disclosure, you are hereby notified that any use, dissemination, copying, or storage of this content or its attachments is strictly prohibited. In case of any disclosure of this content, you will be subjected to an HR Investigation.”",
      "showStyle": 2,
      "exampleRequired": true,
      "isClosed": false,
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
      "competencyList": [
          {
              "competencyId": 3,
              "competency": "Understanding of Scope & Deliverable",
              "totalGrade": 10.0,
              "categoryId": 2,
              "category": "Core Competencies",
              "employeeChoiceID": 1,
              "employeeExample": "",
              "notEffective": false
          },
          {
              "competencyId": 4,
              "competency": "Control of Personal Work Plan (time management & productivity)",
              "totalGrade": 10.0,
              "categoryId": 2,
              "category": "Core Competencies",
              "employeeChoiceID": null,
              "employeeExample": "aaa",
              "notEffective": false
          },
          {
              "competencyId": 5,
              "competency": "Leadership Skills & Decision Making",
              "totalGrade": 10.0,
              "categoryId": 2,
              "category": "Core Competencies",
              "employeeChoiceID": null,
              "employeeExample": "",
              "notEffective": false
          },
          {
              "competencyId": 6,
              "competency": "Basic Technical Knowledge of Associated Trades",
              "totalGrade": 10.0,
              "categoryId": 3,
              "category": "Technical Competencies",
              "employeeChoiceID": null,
              "employeeExample": "",
              "notEffective": false
          },
          {
              "competencyId": 7,
              "competency": "Coordination Skills with Associated Trades",
              "totalGrade": 10.0,
              "categoryId": 3,
              "category": "Technical Competencies",
              "employeeChoiceID": null,
              "employeeExample": "",
              "notEffective": false
          },
          {
              "competencyId": 8,
              "competency": "Multi-faceted Problem Solving",
              "totalGrade": 10.0,
              "categoryId": 3,
              "category": "Technical Competencies",
              "employeeChoiceID": null,
              "employeeExample": "",
              "notEffective": false
          },
          {
              "competencyId": 9,
              "competency": "Establishing and Maintaining Good & Efficient Relations with Project Stakeholders",
              "totalGrade": 10.0,
              "categoryId": 4,
              "category": "Functional Competencies",
              "employeeChoiceID": null,
              "employeeExample": "",
              "notEffective": false
          },
          {
              "competencyId": 10,
              "competency": "Recognition & Management of Firm Responsibilities",
              "totalGrade": 10.0,
              "categoryId": 4,
              "category": "Functional Competencies",
              "employeeChoiceID": null,
              "employeeExample": "",
              "notEffective": false
          },
          {
              "competencyId": 11,
              "competency": "Ability to Meet Firm Objectives",
              "totalGrade": 10.0,
              "categoryId": 5,
              "category": "Organizational Competencies",
              "employeeChoiceID": null,
              "employeeExample": "",
              "notEffective": false
          },
          {
              "competencyId": 12,
              "competency": "Hard Work",
              "totalGrade": 10.0,
              "categoryId": 5,
              "category": "Organizational Competencies",
              "employeeChoiceID": null,
              "employeeExample": "",
              "notEffective": true
          }
      ]
  }

console.log("testDate =", testDate);

    useEffect(()=>{
      if(examData)
      {
        setQuestion(examData?.competencyList[0])
        setChoices(examData?.choiceList)
      }
    },[examData])



    const addAndUpdateQuestions = () => {
console.log("tessss =" , examQuestionsData.some(el => el.question.competencyId === question.competencyId));
console.log("tessss2 =" , questionsAnswers.checkedVal);
      // add
        if(!examQuestionsData.some(el => el.question.competencyId === question.competencyId)
        && questionsAnswers.checkedVal !== null
        // && questionsAnswers.textareaVal.length !== 0
        )
        {
          console.log("inn2");
        setExamQuestionsData(prveState => [...prveState, 
        {
            question: question,
            checkedVal:  questionsAnswers.checkedVal,
            textarea: questionsAnswers.textareaVal,
            // questionNum: questionNum + 1
        }
        ])
        } 

        // update
        if(examQuestionsData.some(el => el.question.competencyId === question.competencyId)
        && questionsAnswers.checkedVal !== null
        // && questionsAnswers.textareaVal.length !== 0
        )
        {
        setExamQuestionsData(prveState => 
          
          prveState.map((que)=> {
            console.log("que2 =",que);
            if(que.question.competencyId === question.competencyId)
            {
            return {...que, 
                
                    // question: question,
                    checkedVal:  questionsAnswers.checkedVal,
                    textarea: questionsAnswers.textareaVal,
                    // questionNum: questionNum + 1
              }
            }
            return que
          })


          // /////////////////////////////
          
          // [...prveState, 
          // {
          //     question: question,
          //     checkedVal:  choices.filter((choice) => choice.id === Number( e.target.value))
          //     // checkedVal: e.target.value
          // }
          // ]
          )
        }
    }


    const nextQueFun = () => {
      if(examData?.competencyList.length !== questionNum + 1)
      {
        console.log("inn5");
          setQuestionNum(  questionNum + 1 )
          setQuestion(examData?.competencyList[questionNum + 1])


          // addAndUpdateQuestions()

      
      // setQuestionNum((prevState) => ({
      //     ...prevState,
      //     questionNum: questionNum + 1
      // }))
      // setQuestion(examData?.competencyList[questionNum]?.competency)

// ////////////////

// // add
// if(!examQuestionsData.some(el => el.question.competencyId === question.competencyId)
//   && questionsAnswers.checkedVal !== null
//   // && questionsAnswers.textareaVal.length !== 0
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
//   && questionsAnswers.checkedVal !== null
//   // && questionsAnswers.textareaVal.length !== 0
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

///////////////////www
// setQuestionsAnswers({
//   checkedVal : examQuestionsData.some(el => el.question.competencyId === examData?.competencyList[questionNum + 1].competencyId) ? 
//     examQuestionsData[examQuestionsData.findIndex(x => x.question.competencyId === examData?.competencyList[questionNum + 1].competencyId)].checkedVal  
//     // choices.find((choice) => choice.id === Number( examQuestionsData[questionNum - 1].checkedVal.id))  
//     : null
//     ,
//   textareaVal: examQuestionsData.some(el => el.question.competencyId === examData?.competencyList[questionNum + 1].competencyId) ? 
//     examQuestionsData[examQuestionsData.findIndex(x => x.question.competencyId === examData?.competencyList[questionNum + 1].competencyId)].textarea 
//     : ""
//     // examQuestionsData[questionNum - 1].textarea : ""
// })
//////////////////


// setQuestionsAnswers({
//   checkedVal : examQuestionsData.some(el => el.question.competencyId === examData?.competencyList[questionNum + 1].competencyId) ? 
//     choices.find((choice) => choice.id === Number( examQuestionsData[questionNum + 1].checkedVal.id))  
//     : null
//     ,
//   textareaVal: examQuestionsData.some(el => el.question.competencyId === examData?.competencyList[questionNum + 1].competencyId) ? 
//     examQuestionsData[questionNum + 1].textarea : ""
// })
// setQuestionsAnswers({checkedVal : null, textareaVal: ""})
      }

      addAndUpdateQuestions()

      if(examData?.competencyList.length === questionNum + 1)
      {
        console.log("inn");
        setEndExam(true)
        // setStartExam(false)

        checkUnansweredQuestionsFun()
      }
  }


  // useEffect(()=>{
  //   if(examData?.competencyList.length === questionNum + 1)
  //   {
  //     console.log("inn33");
  //     // setEndExam(true)
  //     // setStartExam(false)

  //     // checkUnansweredQuestionsFun()
  //   }

  // },[examQuestionsData])
  




  const prevQueFun = () => {
    if(questionNum  !== 0)
    {
        setQuestionNum(  questionNum - 1 )
        setQuestion(examData?.competencyList[questionNum - 1])

        addAndUpdateQuestions()

    
    // setQuestionNum((prevState) => ({
    //     ...prevState,
    //     questionNum: questionNum + 1
    // }))
    // setQuestion(examData?.competencyList[questionNum]?.competency)

// ////////////////

// // add
// if(!examQuestionsData.some(el => el.question.competencyId === question.competencyId)
//   && questionsAnswers.checkedVal !== null
// )
// {
// setExamQuestionsData(prveState => [...prveState, 
// {
//     question: question,
//     checkedVal:  questionsAnswers.checkedVal,
//     textarea: questionsAnswers.textareaVal
// }
// ])
// } 

// // update
// if(examQuestionsData.some(el => el.question.competencyId === question.competencyId)
//   && questionsAnswers.checkedVal !== null
// )
// {
// setExamQuestionsData(prveState => 
  
//   prveState.map((que)=> {
//     console.log("que2 =",que);
//     if(que.question.competencyId === question.competencyId)
//     {
//      return {...que, 
        
//             // question: question,
//             checkedVal:  questionsAnswers.checkedVal,
//             textarea: questionsAnswers.textareaVal
        
//       }
//     }
//     return que
//   })


//   // /////////////////////////////
  
//   // [...prveState, 
//   // {
//   //     question: question,
//   //     checkedVal:  choices.filter((choice) => choice.id === Number( e.target.value))
//   //     // checkedVal: e.target.value
//   // }
//   // ]
//   )
// }

console.log("prev =", examQuestionsData.some(el => el.question.competencyId === examData?.competencyList[questionNum - 1].competencyId));
console.log("prev2 =", examData?.competencyList[questionNum - 1]);
console.log("prev3 =", examQuestionsData[questionNum - 1]);
console.log("prev4 =", examQuestionsData);
console.log("prev45 =", questionNum - 1);
console.log("prev5 =", examQuestionsData.findIndex(x => x.question.competencyId === examData?.competencyList[questionNum - 1].competencyId));

/////////////wwww
// setQuestionsAnswers({
//   checkedVal : examQuestionsData.some(el => el.question.competencyId === examData?.competencyList[questionNum - 1].competencyId) ? 
//     examQuestionsData[examQuestionsData.findIndex(x => x.question.competencyId === examData?.competencyList[questionNum - 1].competencyId)].checkedVal  
//     // choices.find((choice) => choice.id === Number( examQuestionsData[questionNum - 1].checkedVal.id))  
//     : null
//     ,
//   textareaVal: examQuestionsData.some(el => el.question.competencyId === examData?.competencyList[questionNum - 1].competencyId) ? 
//     examQuestionsData[examQuestionsData.findIndex(x => x.question.competencyId === examData?.competencyList[questionNum - 1].competencyId)].textarea 
//     : ""
//     // examQuestionsData[questionNum - 1].textarea : ""
// })
///////////////////////

// setQuestionsAnswers({checkedVal : null, textareaVal: ""})
    }
}












  const saveQuestions = (e, type) => {

    if(type === "radio")
    {

      
    //   setQuestionsAnswers(prveState => [
    //     ...prveState,
    //     {
    //       // ...prveState,
    //       // checkedVal: choices.find((choice) => choice.id === Number( e.target.value))
          
    //       // [`que${questionNum + 1}`] : {
    //         ...prveState[`que${questionNum + 1}`],
    //         checkedVal: choices.find((choice) => choice.id === Number( e.target.value)),
    //         question: question
    //       // }
    //   }
    // ])
    setQuestionsAnswers(prveState => (
     
      {
        // ...prveState,
        // checkedVal: choices.find((choice) => choice.id === Number( e.target.value))
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
          // ...prveState,
          // textareaVal: e.target.value
          ...prveState,
          [`que${questionNum + 1}`] : {
            ...prveState[`que${questionNum + 1}`],
          textareaVal: e.target.value,
          question: question
          }
      }
      ))
    }


    // console.log("tesrt =",choices.filter((choice) => choice.id === Number( e.target.value)));
    console.log("que =", examQuestionsData.some(el => el.question.competencyId === question.competencyId));

    // if(examQuestionsData.length === 0 )
    // {
    //   setExamQuestionsData(prveState => [...prveState, 
    //     {
    //         question: question,
    //         checkedVal:  choices.find((choice) => choice.id === Number( e.target.value))
    //         // checkedVal: e.target.value
    //     }
    //     ])
    // }


    // //////////////////////

    // if(!examQuestionsData.some(el => el.question.competencyId === question.competencyId))
    // {
    //   setExamQuestionsData(prveState => [...prveState, 
    //     {
    //         question: question,
    //         checkedVal:  choices.find((choice) => choice.id === Number( e.target.value))
    //         // checkedVal: e.target.value
    //     }
    //     ])
    // } 

    //  if(examQuestionsData.some(el => el.question.competencyId === question.competencyId))
    //   {
    //     setExamQuestionsData(prveState => 
          
    //       prveState.map((que)=> {
    //         console.log("que2 =",que);
    //         if(que.question.competencyId === question.competencyId)
    //         {
    //          return {...que, 
                
    //                 // question: question,
    //                 checkedVal:  choices.find((choice) => choice.id === Number( e.target.value))
    //                 // checkedVal: e.target.value
                
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
    
    
  }
 

  // ///////////

  const saveAllQuestions = (e, type,index) => {

    if(type === "radio")
    {
      setAllQuestionsAnswers(prveState => (
      // setQuestionsAnswers(prveState => (
        {
          ...prveState,
          [`que${index + 1}`] : {
            ...prveState[`que${index + 1}`],
            checkedVal: choices.find((choice) => choice.id === Number( e.target.value)),
            question: question
          }
      }
      ))
    }

    if(type === "textarea")
    {
      setAllQuestionsAnswers(prveState => (
      // setQuestionsAnswers(prveState => (
        {
          ...prveState,
          [`que${index + 1}`] : {
            ...prveState[`que${index + 1}`],
          textareaVal: e.target.value,
          question: question
          }
      }
      ))
    }
    console.log("que =", examQuestionsData.some(el => el.question.competencyId === question.competencyId));

  }


  const checkUnansweredQuestionsFun = () => {
    let questionNums = []
    console.log("que66 =", examData.competencyList);
    examData.competencyList.map((que,index)=>{
      
      console.log("questionsAnswers[`que${index + 1}`] =", questionsAnswers[`que${index + 1}`]);
      console.log("questionsAnswers2`] =", questionsAnswers);
      console.log("que55 =", que);

      // Object.keys(questionsAnswers).forEach(function(key) {
      // console.log("key =", questionsAnswers[key]);
      // console.log("chek =", questionsAnswers[key].question.competencyId !== que.competencyId);

      // if( questionsAnswers[key].question.competencyId !== que.competencyId)
      // {
      //   console.log("teeeee =", que);
      //   questionNums.push(index + 1)
      // }
      // });


    // let y =  Object.keys(questionsAnswers).some(function(k) { return questionsAnswers[k].question.competencyId === que.competencyId; });

    // console.log("y888 =", y);

    if(examData.showStyle === 1)
    {

      if(!Object.keys(questionsAnswers).some(function(k) { return questionsAnswers[k].question.competencyId === que.competencyId; }))
      {
        questionNums.push(index + 1)
      }

    }

    if(examData.showStyle === 2)
    {

      if(!Object.keys(allQuestionsAnswers).some(function(k) { return allQuestionsAnswers[k].question.competencyId === que.competencyId; }))
      {
        console.log("tyyyyy =" , index);
        questionNums.push(index + 1)
      }

    }
      //   if(!questionsAnswers[`que${index + 1}`].some(el => el.question.competencyId === que.competencyId))
      //   // if(!examQuestionsData.some(el => el.question.competencyId === que.competencyId))
      //   {
      //     questionNums.push(index + 1)
      //   }
    })
    console.log("questionNums =", questionNums);
    setUncompletedQuestionsList(questionNums)
  }




  const handleClickOpen = (item) => {
    checkUnansweredQuestionsFun()
    setOpenParentPopup(true);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };


  const backToExamFun = (queNum) => {
    // startExam && !endExam
    setStartExam(true)
    setEndExam(false)
    setQuestionNum(queNum - 1)
    setQuestion(examData?.competencyList[queNum - 1])
  }




  const finishExamFun = () => {

    setEndExam(true)
    checkUnansweredQuestionsFun()
  }


  /////////////////////




  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setProcessing(true)

    const apiData = {
      brCode: brCode,
      personalexemption: data.PersonalExemption,
      personalexemption2:  data.specialNeedsExemption,
      firstbracketlimit:  data.FirstBracketLimit,
      firstbrackettax:  data.FirstBracketTax,
      secondbracketlimit:  data.SecondBracketLimit,
      secondbrackettax: data.SecondBracketTax,
      thirdbracketlimit:  data.ThirdBracketLimit,
      thirdbrackettax: data.ThirdBracketTax,
      fourthbracketlimit: data.FourthBracketLimit,
      fourthbracketTax:  data.FourthBracketTax,
      fifthbracketlimit: data.FifthBracketLimit,
      fifthbracketTax:  data.FifthBracketTax,
      bracketlimit6: data.SixthBracketLimit,
      bracketTax6:  data.SixthBracketTax,
      bracketlimit7:  data.seventhBracketLimit,
      bracketTax7:   data.seventhBracketTax,
      bracketlimit8: data.EighthBracketLimit,
      bracketTax8:  data.EighthBracketTax,
      covidP:  data.EpidemicsContribution,
      covidLbl:   data.DisplayName,
      fixedElementsSilimit:  data.FixedElementsSILimit,
      fixedElementsCompRate:  data.CompanyShare,
      fixedElementsEmpRate:  data.TheEmployeesShareOfSI,
    };


    // try {
    //   let response = await BranchSalarySettingData().Save(apiData);

    //   if (response.status==200) {
    //     toast.success(notif.saved);
    //     setBrCode(null)
    //     setdata({
    //       PersonalExemption: "",
    //       specialNeedsExemption: "",
    //       FirstBracketLimit: "",
    //       FirstBracketTax: "",
    //       SecondBracketLimit: "",
    //       SecondBracketTax: "",
    //       ThirdBracketLimit: "",
    //       ThirdBracketTax: "",
    //       FourthBracketLimit: "",
    //       FourthBracketTax: "",
    //       FifthBracketLimit: "",
    //       FifthBracketTax: "",
    //       SixthBracketLimit: "",
    //       SixthBracketTax: "",
    //       seventhBracketLimit: "",
    //       seventhBracketTax: "",
    //       EighthBracketLimit: "",
    //       EighthBracketTax: "",
    //       EpidemicsContribution: "",
    //       DisplayName: "",
    //       FixedElementsSILimit: "",
    //       CompanyShare: "",
    //       TheEmployeesShareOfSI: "",
    //     })
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
    
  };
 

  async function fetchData() {
    // setExamData(testDate);
    try {
      const examQuestionsData = await EmployeeAssessmentData(locale).Get();
      setExamData(examQuestionsData[0]);
      // setExamData(testDate);

      examQuestionsData[0].competencyList.map((queData, index)=>{
        if(queData.employeeChoiceID !== null || queData.employeeExample.length !== 0)
        {
          console.log("queData =", queData);

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
        {console.log("enter");
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



 const departmentChangeFun = async (id) => {
    if (id) {
      const dataList = await BranchSalarySettingData().Get(id);

      setdata({
        PersonalExemption: dataList.personalexemption  ? dataList.personalexemption : "",
        specialNeedsExemption: dataList.personalexemption2  ? dataList.personalexemption2 : "" ,
        FirstBracketLimit: dataList.firstbracketlimit  ? dataList.firstbracketlimit : "" ,
        FirstBracketTax: dataList.firstbrackettax  ? dataList.firstbrackettax : "" ,
        SecondBracketLimit: dataList.secondbracketlimit  ? dataList.secondbracketlimit : "" ,
        SecondBracketTax: dataList.secondbrackettax  ? dataList.secondbrackettax : "" ,
        ThirdBracketLimit: dataList.thirdbracketlimit  ? dataList.thirdbracketlimit : "" ,
        ThirdBracketTax: dataList.thirdbrackettax  ? dataList.thirdbrackettax : "" ,
        FourthBracketLimit: dataList.fourthbracketlimit  ? dataList.fourthbracketlimit : "" ,
        FourthBracketTax: dataList.fourthbracketTax  ? dataList.fourthbracketTax : "" ,
        FifthBracketLimit: dataList.fifthbracketlimit  ? dataList.fifthbracketlimit : "" ,
        FifthBracketTax: dataList.fifthbracketTax  ? dataList.fifthbracketTax : "" ,
        SixthBracketLimit: dataList.bracketlimit6  ? dataList.bracketlimit6 : "" ,
        SixthBracketTax: dataList.bracketTax6  ? dataList.bracketTax6 : "" ,
        seventhBracketLimit: dataList.bracketlimit7  ? dataList.bracketlimit7 : "" ,
        seventhBracketTax: dataList.bracketTax7  ? dataList.bracketTax7 : "" ,
        EighthBracketLimit: dataList.bracketlimit8  ? dataList.bracketlimit8 : "" ,
        EighthBracketTax: dataList.bracketTax8  ? dataList.bracketTax8 : "" ,
        EpidemicsContribution: dataList.covidP  ? dataList.covidP : "" ,
        DisplayName: dataList.covidLbl  ? dataList.covidLbl : "" ,
        FixedElementsSILimit: dataList.fixedElementsSilimit  ? dataList.fixedElementsSilimit : "" ,
        CompanyShare: dataList.fixedElementsCompRate  ? dataList.fixedElementsCompRate : "" ,
        TheEmployeesShareOfSI: dataList.fixedElementsEmpRate  ? dataList.fixedElementsEmpRate : "",
      });
    }
  }



  async function onCopy() {
    
    try {
      setIsLoading(true);
      let response = await BranchSalarySettingData().CopyToAllBranches(brCode);

      if (response.status == 200) {
        toast.success(notif.saved);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }


  const submitFun = async (buttonType) => {
    setIsLoading(true)
    setProcessing(true)

    // let arr = []

    console.log("tesppp =", questionsAnswers);
    console.log("tesppp examData =", examData);

    examData.competencyList.map((que,index)=>{

      if(Object.keys(questionsAnswers).some(function(k) { return questionsAnswers[k].question.competencyId === que.competencyId; }))
      {
        console.log("que88 =",que);
        
        Object.keys(questionsAnswers).forEach((key, index) => {
          if(questionsAnswers[key].question.competencyId === que.competencyId)
          {
            // console.log("questionsAnswers[key].question.competencyId =", questionsAnswers[key].question.competencyId);
            // console.log("que.competencyId =", que.competencyId);
            // console.log(`${key}: ${questionsAnswers[key]}`);
            // console.log("tes777 =", questionsAnswers[key]);
            // console.log("tes88 =", questionsAnswers[key].checkedVal);
            // console.log("tes10 =", questionsAnswers[key]?.checkedVal?.id);
            // console.log("tes11 =", que.employeeChoiceID);
            // console.log("tes12 =", questionsAnswers[key]?.checkedVal?.id);

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
        // arr.push(que)

        console.log("que99 =",que);
      }

    })

    // console.log("save =", arr);


    let data = {
      "assessmentID": 0,
      "TemplateId":2,
      "trainingReq": "string",
      "assclosed": buttonType === "save" ? false :  true ,
      // "assclosed": false,
      "competencyList": examData.competencyList
    }

    console.log("req data =", data);


    // try {
    //   let response = await EmployeeAssessmentData().Save(data);

    //   if (response.status==200) {
    //     toast.success(notif.saved);
      
    //     setdata({
         
    //     })
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


  console.log("examData =",examData);
  console.log("startExam =",startExam);
  console.log("endExam =",endExam);
  console.log("question =",question);
  console.log("questionNum =",questionNum);
  console.log("uncompletedQuestionsList =",uncompletedQuestionsList);
  console.log("questionsAnswers222 =",questionsAnswers);
  console.log("questionsAnswers233 =",Object.keys(questionsAnswers).length);
  console.log("allQuestionsAnswers =", allQuestionsAnswers);
  
  
  
  return (
    <PayRollLoader isLoading={isLoading} whiteBg icon="border_color" >




        <Card >
            <CardContent  className={style.examCardContentSty}>
                <Grid item xs={12}  md={12} 
                container
                // spacing={3}
                alignItems="flex-start"
                direction="row"
                // style={{display:"contents"}}
                >
                  {( startExam && !endExam) && (
                  <Grid item xs={12} className={`${style.gridContainerSty} ${!startExam ? style.HideContainers : style.showContainers }`}  
                  // style={Object.assign({},
                  //    !startExam?  {display: 'none'} : {display: 'block'},
                  //   //  {padding:"0"}
                  //     )}
                      > 
                  {/* <Grid item xs={12}  style={!startExam?  {display: 'none'} : {display: 'block'}}>  */}
                        <div className={` ${style.panarContainer} ${classes.examMainSty}`}>
                        <div>
                            <img src='https://www.ansonika.com/wilio/img/info_graphic_1.svg' />
                            <div>
                                <p>Panar Title </p>
                            </div>
                            </div>
                            
                          <div>
                            <Button
                                variant="contained"
                                size="medium"
                                color="primary"
                                 onClick={() => setEndExam(true)}
                                 >
                                  End Exam</Button>
                                  </div>

                            
                        </div>               
                    </Grid>
                    )}
                    {/* /////////////// */}
                    {!startExam && (
                    <Grid item xs={12}  md={6} className={`${style.gridContainerSty} ${startExam? style.HideContainers : style.showContainers }`}  
                    // style={Object.assign({},
                    //  startExam?  {display: 'none'} : {display: 'block'},
                    // //  {padding:"0"}
                    //   )} 
                      > 
                    {/* <Grid item xs={12}  md={6} style={startExam?  {display: 'none'} : {display: 'block'}} >  */}
                        <div className={`${style.mainContainer} ${classes.examMainSty}`}>
                        {/* <div>
                            <img src='https://www.ansonika.com/wilio/img/logo.png' />
                            <div>
                                <FacebookOutlinedIcon />
                                <TwitterIcon/>
                                <GoogleIcon/>
                                <LinkedInIcon/>
                            </div>
                            </div> */}
                            <div>
                                <img src='https://www.ansonika.com/wilio/img/info_graphic_1.svg' />
                                <h1 className={`${classes.textSty}`}>{ examData ?  examData?.templateName : "Assessment duration ended"}</h1>
                                {/* <h1>Satisfaction Survey</h1> */}
                                <p>
                                    {/* {examData?.templateDesc} */}
                                </p>
                                {/* <p>
                                    Tation argumentum et usu, dicit viderer evertitur te has. Eu dictas concludaturque usu, facete detracto patrioque an per, lucilius pertinacia eu vel. Adhuc invidunt duo ex. Eu tantas dolorum ullamcorper qui.
                                </p> */}

                                {/* <Button 
                                variant="contained"
                                size="medium"
                                color="primary"
                                >
                                  Purchase this template
                             
                                </Button> */}
                                {/* <button>Purchase this template</button> */}
                            </div>

                            
                        </div>               
                    </Grid>
                    )}


                  {!startExam && (
                    <Grid item xs={12} md={6} className={`${style.gridContainerSty} ${startExam? style.HideContainers : style.showContainers }`}  
                    // style={Object.assign({},
                    //  startExam?  {display: 'none'} : {display: 'block'},
                    // //  {padding:"0"}
                    //   )}
                      > 
                    {/* <Grid item xs={12} md={6} style={startExam?  {display: 'none'} : {display: 'block'}}>  */}
                    
                    <div className={`${style.startExamContainer}`}>
                    <div>
                                
                                <img src={examLogo} />
                                <h1 className={`${classes.textSty}`}>{ examData ?  examData?.templateName : "Assessment duration ended"}</h1>
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
                                 onClick={() => setStartExam(true)}
                                 >
                                  Start
                                </Button>
                                  )}
                                {/* <button onClick={() => setStartExam(true)}>Start</button> */}
                            </div>
                    </div>
                    </Grid>
                    )}

                    {/* <Grid item xs={12}  className={`${!startExam? style.HideContainers : style.showContainers }`}
                    // style={!startExam?  {display: 'none'} : {display: 'block'}}
                    > 
                    <h1 className={`${classes.textSty} ${style.categorySty} ${locale === "en" ?  style.categoryEnSty : style.categoryArSty}`}>Category</h1>
                        <div className={`${style.examContainer2}`}>
                          
                            <div>
                              <LinearProgress variant="determinate" value={80} />
                              <p>4/5</p>
                              <h1>
                                  Do you think to suggest our company to a friend or parent?
                              </h1>
                              <FormControl style={{width: "100%"}}>
                                  <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      // defaultValue="female"
                                      name="radio-buttons-group"
                                     className={style.radioContainer}
                                  >
                                      <FormControlLabel 
                                      value="No" 
                                      control={<Radio checkedIcon={<CheckIcon className={style.checkedIconeSty}/>} icon={<RadioButtonUncheckedIcon className={style.iconeSty} />} />} 
                                      label="No" 
                                      />
                                      
                                      <FormControlLabel 
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
                                      label="100% Sure" />
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
                                    
                                />

                                <div></div>

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
                                    >
                                   
                                      Prev
                                    </Button>
                                  </Grid>

                                  <Grid item xs={6} md={3} lg={2}>
                                    <Button
                                      variant="contained"
                                      size="medium"
                                      color="primary"
                                      // onClick={onCopy}
                                      // disabled={brCode? false : true}
                                    >
                                      
                                      Next
                                    </Button>
                                  </Grid>

                                 

                                  </Grid>
                                </Grid>
                            </div>
                        </div>                   
                    </Grid> */}

                    {/* ///// */}
{/* !startExam? style.HideContainers : style.showContainers */}




                    {
                      (startExam && !endExam && (examData.showStyle === 1)) && (
                        <ExamQuestionNextAndPrev 
                        examData={examData} 
                        setEndExam={setEndExam}
                        setStartExam={setStartExam}
                        examQuestionsData={examQuestionsData}
                        setExamQuestionsData={setExamQuestionsData}
                        questionNum={questionNum}
                        setQuestionNum={setQuestionNum}
                        question={question}
                        setQuestion={setQuestion}
                        choices={choices}
                        setChoices={setChoices}
                        questionsAnswers={questionsAnswers}
                        setQuestionsAnswers={setQuestionsAnswers}
                        nextQueFun={nextQueFun}
                        prevQueFun={prevQueFun}
                        saveQuestions={saveQuestions}
                        // question={question}
                        // setQuestion={setQuestion}
                        />
                      )
                    }


                  {/* {examData?.competencyList.map((Qui,index)=>( */}

                  {
                      (startExam && !endExam && (examData.showStyle === 2)) && (
                        <ExamQuestionWithoutNextAndPrev 
                          examData={examData} 
                          // setEndExam={setEndExam}
                          // setStartExam={setStartExam}
                          examQuestionsData={examQuestionsData}
                          // setExamQuestionsData={setExamQuestionsData}
                          questionNum={questionNum}
                          // setQuestionNum={setQuestionNum}
                          // question={Qui}
                          question={question}
                          // setQuestion={setQuestion}
                          choices={choices}
                          // setChoices={setChoices}
                          allQuestionsAnswers={allQuestionsAnswers}
                          // questionsAnswers={questionsAnswers}
                          // setQuestionsAnswers={setQuestionsAnswers}
                          nextQueFun={nextQueFun}
                          prevQueFun={prevQueFun}
                          saveAllQuestions={saveAllQuestions}
                          // category={(examData?.competencyList[index - 1].category !== examData?.competencyList[index].category) ? examData?.competencyList[index].category : null}
                          finishExamFun={finishExamFun}
                        />

                      )}
                  {/* ))} */}

{/* /////////// */}

                    {endExam && (
                    <Grid item xs={12} >
                      <div className={ `${style.resultContainerSty} ${classes.containerSty}`}>
                        <div className={`${classes.examMainSty}`}>
                          <img src='https://jthemes.net/themes/html/neonwizard-react/thankyou/assets/img/tht1.png' />
                          <h1 >
                              Thank you for complete the exam
                          </h1>
                          </div>

                          {/* <p>
                              You’ll receive your first email within the next 24 hours. Then you’ll get a lesson each week.
                          </p> */}

                          <div>
                            <Box >
                              <CircularProgress variant="determinate" value={100}  />
                              <CircularProgress variant="determinate" style={{transform: 'scaleX(-1) rotate(-90deg'}}  value={(Object.keys(questionsAnswers).length*100)/examData?.competencyList.length} />
                              {/* <CircularProgress variant="determinate" style={{transform: 'scaleX(-1) rotate(-90deg'}}  value={(examQuestionsData.length*100)/examData?.competencyList.length} /> */}
                              <Typography position='absolute' className={`${classes.textSty}`}>{(Object.keys(questionsAnswers).length*100)/examData?.competencyList.length}%</Typography>
                              {/* <Typography position='absolute' className={`${classes.textSty}`}>{(examQuestionsData.length*100)/examData?.competencyList.length}%</Typography> */}
                          </Box>
                            <Typography >completed questions</Typography>

                          {uncompletedQuestionsList.length !== 0 && (
                            <p>
                              There are questions that you did not answer, which are ( {uncompletedQuestionsList.toString()} ).
                            </p>
                            )}
                        </div>

                        

                        {/* <div> */}
                          
                        {/* <Grid
                                  container
                                  spacing={3}
                                  alignItems="flex-end"
                                  direction="row"
                                  
                                  > */}


                        <Grid item xs={12}
                          container
                          spacing={3}
                          // alignItems="flex-start"
                          direction="row"
                          // className={`${style.itemsStyle} ${style.nextPrevBtnSty}`}
                          //  justifyContent="end"
                          >

                          {uncompletedQuestionsList.length !== 0 && (
                            <Grid item xs={12} md={3}  lg={4}>
                              <Button
                                variant="contained"
                                size="medium"
                                color="primary"
                                onClick={()=>backToExamFun(uncompletedQuestionsList[0])}
                              >
                                Back to Exam
                              </Button>
                              </Grid>
                          )}


                            <Grid item xs={12} md={3}  lg={uncompletedQuestionsList.length !== 0 ? 4 : 6}>
                              <Button
                                variant="contained"
                                size="medium"
                                color="primary"
                                onClick={()=>submitFun("save")}
                              >
                                save
                              </Button>
                              </Grid>

                              <Grid item xs={12} md={3}  lg={uncompletedQuestionsList.length !== 0 ? 4 : 6}>
                              <Button
                                variant="contained"
                                size="medium"
                                color="primary"
                                onClick={()=>submitFun("submit")}
                                disabled={uncompletedQuestionsList.length === 0 ? false : true}
                              >
                                submit
                              </Button>
                              </Grid>
                          </Grid>

                          {/* </Grid> */}


                        {/* </div> */}
                      </div>
                    </Grid>
                    )}

                </Grid>
            </CardContent>
        </Card>






      {/* <PapperBlock whiteBg icon="border_color" 
          title={ intl.formatMessage(messages.payrollMainParameters)  } 
          desc={""}>
            <form onSubmit={handleSubmit}>

            <p>0 of 3 completed</p>
            <LinearProgress variant="determinate" value={10} style={{height: "5px"}}/>
 

            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="female" control={<Radio checkedIcon={<CheckIcon/>} icon={<RadioButtonUncheckedIcon/>} />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                </FormControl>



  
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                 
                  <Grid item xs={12} md={12}></Grid>
                  <Grid item xs={12} md={4}
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                  className={style.itemsStyle}
                  >
                <Grid item xs={3}  md={5} lg={3}>                  
                    <SaveButton Id={id} processing={processing} />
                </Grid>

                <Grid item xs={12} md={2}>
                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={onCopy}
                    disabled={brCode? false : true}
                  >
                    <FormattedMessage {...messages.copytoAllBr} />
                  </Button>
                </Grid>

                </Grid>
              </Grid>
          </form>
      </PapperBlock>          */}


<EmployeeAssessmentPopup
        handleClose={handleClose}
        open={openParentPopup}
        messageData={`There are questions that you did not answer, which are (${uncompletedQuestionsList.toString()}). Do you want to return to the exam?`}
        callFun={()=>backToExamFun(uncompletedQuestionsList[0])}
      />

    </PayRollLoader>
  );
}

EmployeeAssessment.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeAssessment); 
