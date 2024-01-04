import React, { useEffect, useState,useRef } from 'react';
import useStyles from '../../../Style';
import style from '../../../../../../styles/pagesStyle/EmployeeAssessmentSty.scss'
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../../messages';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { format } from 'date-fns';
import { Box } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import api from '../../api/AsTemplateData';
import { useReactToPrint } from 'react-to-print';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';



const AsTemplatePrint = ({
//   examData,
//   textareaEmpTrainingVal,
//   OverallAppraisalVal,
//   textareaNoteForEmployeeVal,
//   AssessmentReviewLock,
//   printDivRef,
//   data
intl,
printId,
setPrintId
}) => {


    const { classes } = useStyles();
    const locale = useSelector(state => state.language.locale);

    const [examData, setExamData] = useState();
    const [printData, setPrintData] = useState([]);
    const [allQuestionsAnswers, setAllQuestionsAnswers] = useState({})
    const [textareaEmpTrainingVal, setTextareaEmpTrainingVal] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [AssessmentReviewLock, setAssessmentReviewLock] = useState(true);
    const [question, setQuestion] = useState()
    const [choices, setChoices] = useState()
    // const [data, setdata] = useState([]);




    useEffect(()=>{
        if(printId)
        {
            printFun(printId)
        }
    },[printId])

    const printFun = async (assessmentId) => {
        try {
            setIsLoading(true);
        const examQuestionsData = await api(locale).GetDataById(assessmentId);
        setExamData(examQuestionsData[0]);
        setPrintData(examQuestionsData[0])
    
        examQuestionsData[0].competencyList.map((queData, index)=>{
            if(queData.employeeChoiceID !== null || queData.employeeExample.length !== 0)
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
    
            setTextareaEmpTrainingVal(examQuestionsData[0].staffTrainingReq)
    
            // setOverallAppraisalVal(examQuestionsData[0].mgrStaffAllert)
    
            // setTextareaNoteForEmployeeVal(examQuestionsData[0].mgrComment)
    
            }
          })
        } catch (err) {
        } finally {
          setIsLoading(false);
        }
    }
    
    
    
    useEffect(()=>{
        if(examData)
        {
          setQuestion(examData?.competencyList[0])
          setChoices(examData?.choiceList)
        }
      },[examData])
    
    const printDivRef = useRef(null);
    
    
    const onBeforeGetContent = () => {
        setIsLoading(true);
      };
    
      const onAfterPrint = () => {
        setIsLoading(false);
        setPrintData([])
        setPrintId()
      };
    
      const onPrintError = () => {
        setIsLoading(false);
      };
    
    const printJS = useReactToPrint({
        content: () => printDivRef?.current,
        onBeforeGetContent,
        onAfterPrint,
        onPrintError,
        documentTitle: intl.formatMessage(messages.AssessmentReport),
      });
    
    
      useEffect(()=>{
        if(printData.length !== 0)
        {
          printJS();
        }
      },[printData])
    


      console.log("examData =", examData);
      console.log("choices =", choices);
    
    return(

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
                           <Grid item xs={12} >
                               <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                  <p></p><p className={classes.textSty}>{examData?.templateDesc}</p>
                               </div>
                           </Grid>

                           {/* <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                   <p><FormattedMessage {...messages.employeeName} />: </p> <p className={classes.textSty}>{examData?.employeeName}</p>
                               </div>
                           </Grid>

                           <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                   <p><FormattedMessage {...messages.jobName} />: </p> <p className={classes.textSty}>{examData?.jobName}</p>
                               </div>
                           </Grid> */}


                           {/* <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                   <p><FormattedMessage {...messages.hiringData} />: </p> <p className={classes.textSty}>{examData ?  format(new Date(examData.hiringDate), 'yyyy-MM-dd') : ""}</p>
                               </div>
                           </Grid> */}

                           {/* <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                   <p><FormattedMessage {...messages.SalfEvaluation} />: </p> <p className={classes.textSty}>{data[0]?.SalfEvaluation}</p>
                               </div>
                           </Grid> */}

                           {/* <Grid item xs={4} >
                               <div className={`${style.userInfoSty} ${style.printTitlesSty}`}>
                                   <p><FormattedMessage {...messages.ManagerEvaluation} />: </p> <p className={classes.textSty}>{data[0]?.ManagerEvaluation}</p>
                               </div>
                           </Grid> */}

                           </Grid>
                                                              
                           </div>
                       </div>                   
                   
                   </Grid>
                   )}

{/* {choices?.map((choice,index)=>( */}
{/* {examData?.choiceList.map((Qui,index)=>(
                                        // console.log("choice 22 =", choice);
                                        // return (
                                            <p key={index}>testtt66</p>
                                        // )
                                    ))} */}


        {examData?.competencyList.map((Qui,index)=>(
        <Grid container item xs={12}  key={index} className={`${style.printSty}`}> 

          {index === 0 || (examData?.competencyList[index - 1].category !== examData?.competencyList[index].category) ? (
            <h1 className={`${classes.textSty} ${style.categorySty} ${style.categoryAllQueSty} ${locale === "en" ?  style.categoryEnSty : style.categoryArSty}`}>{Qui.category}</h1>
            ) : null}
                        <div className={`${style.examContainer2} ${style.examContainer2AllQue} `}>
                          
                            <div >
                              <h1>
                                <HelpOutlineIcon />  {Qui?.competency}
                              </h1>

                              <FormControl style={{width: "100%"}}>
                                  <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                    //   value={allQuestionsAnswers[`que${index + 1}`]?.checkedVal ? allQuestionsAnswers[`que${index + 1}`]?.checkedVal?.id : ""}
                                      name="radio-buttons-group"
                                     className={`${style.radioContainer} ${style.radioContainerAllQue} `}
                                     row
                                  >
                                    {/* {AssessmentReviewLock  && (
                                       <p><TaskAltIcon /> <FormattedMessage {...messages.EmployeeChoose} />: &nbsp; {examData?.competencyList[index]?.employeeChoiceName ? examData.competencyList[index].employeeChoiceName : ""} </p>
                                    )} */}
                     
                                    
                                    {examData?.choiceList.map((choice,index)=>(
                                        // console.log("choice 22 =", choice);
                                        // return (
                                            // <p key={index}>testtt66</p>
                                        // )

                                        <Grid item xs={6} key={choice.id} > 
                                            <FormControlLabel 
                                            key={choice.id}
                                            value={choice.id} 
                                            control={<Radio checkedIcon={<CheckIcon className={`${style.checkedIconeSty} ${classes.examMainSty}`}/>} icon={<RadioButtonUncheckedIcon className={style.iconeSty} />} />} 
                                            label={choice.name} 
                                            className={`${style.radioPrintSty}`}
                                            // onChange={(e)=> {
                                            //     saveAllQuestions(e, "radio",index)
                                            // }}
                                            />
                                          </Grid>
                                    ))}
                                      
                                  </RadioGroup>
                                  </FormControl>

                              {/* <div className={`${style.radioContainer} ${style.radioContainerAllQue} ${style.answersPrintSty}`}>
                                    {AssessmentReviewLock  && (
                                       <p><TaskAltIcon /> <FormattedMessage {...messages.EmployeeChoose} />: &nbsp; {examData?.competencyList[index]?.employeeChoiceName ? examData.competencyList[index].employeeChoiceName : ""} </p>
                                    )}
                                    {AssessmentReviewLock  && (
                                       <p><TaskAltIcon /> <FormattedMessage {...messages.ManagerChoose} />: &nbsp; {examData?.competencyList[index]?.mgrChoiceName ? examData.competencyList[index].mgrChoiceName : ""} </p>
                                    )}
                              </div> */}

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

                            {/* {(examData?.competencyList.length ===  index + 1 ) && AssessmentReviewLock  && (<>
                                    <h1 className={style.textareaTitle}>
                                      <FormattedMessage {...messages.DirectedManagerOverallAppraisal} />
                                      
                                    </h1>
                          
                                    <div className={`${style.radioContainer} ${style.radioContainerAllQue} ${style.answersPrintSty}`}>
                                        {AssessmentReviewLock  && (
                                        <p><TextFieldsIcon />  &nbsp; {OverallAppraisalVal ? OverallAppraisalVal : ""}  </p>
                                        )}
                                    </div>

                                 </>)} */}

                                 {/* {(examData?.competencyList.length ===  index + 1 ) && AssessmentReviewLock   && (<>
                                    <h1 className={style.textareaTitle}>
                                      <FormattedMessage {...messages.NoteForEmployee} />
                                      
                                    </h1>
                          
                                    <div className={`${style.radioContainer} ${style.radioContainerAllQue} ${style.answersPrintSty}`}>
                                        {AssessmentReviewLock  && (
                                        <p><TextFieldsIcon />  &nbsp; {textareaNoteForEmployeeVal ? textareaNoteForEmployeeVal : ""}  </p>
                                        )}
                                    </div>

                                 </>)} */}

                            </div>
                        </div>                   
                    </Grid>
                    ))}

                    </Box>

    )
}


export default AsTemplatePrint;
