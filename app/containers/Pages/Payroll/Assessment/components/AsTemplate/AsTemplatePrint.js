import React, { useEffect, useState,useRef } from 'react';
import useStyles from '../../../Style';
import style from '../../../../../../styles/pagesStyle/EmployeeAssessmentSty.scss'
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../../messages';
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

                         
                           </Grid>
                                                              
                           </div>
                       </div>                   
                   
                   </Grid>
                   )}


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
                                      name="radio-buttons-group"
                                     className={`${style.radioContainer} ${style.radioContainerAllQue} `}
                                     row
                                  >
                     
                                    
                                    {examData?.choiceList.map((choice,index)=>(

                                        <Grid item xs={6} key={choice.id} > 
                                            <FormControlLabel 
                                            key={choice.id}
                                            value={choice.id} 
                                            control={<Radio checkedIcon={<CheckIcon className={`${style.checkedIconeSty} ${classes.examMainSty}`}/>} icon={<RadioButtonUncheckedIcon className={style.iconeSty} />} />} 
                                            label={choice.name} 
                                            className={`${style.radioPrintSty}`}
                                            />
                                          </Grid>
                                    ))}
                                      
                                  </RadioGroup>
                                  </FormControl>


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

                            </div>
                        </div>                   
                    </Grid>
                    ))}

                    </Box>

    )
}


export default AsTemplatePrint;
