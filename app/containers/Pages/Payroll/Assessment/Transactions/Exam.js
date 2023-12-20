import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ExamData from '../api/ExamData';
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
import examLogo from '../../Assets/exam-logo.png';
import  ExamQuestionNextAndPrev  from '../../Component/ExamQuestionNextAndPrev';


function BranchSalarySetting(props) {
  const [id, setid] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [processing ,setProcessing] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const { state } = useLocation()
  const history=useHistory(); 
  const { intl } = props;
  const { classes } = useStyles();
  const [examData, setExamData] = useState();
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


  const [startExam, setStartExam] = useState(false);




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
    try {
      const examQuestionsData = await ExamData(locale).Get();
      setExamData(examQuestionsData[0]);
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


  console.log("examData =",examData);

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
                  <Grid item xs={12} className={`${style.gridContainerSty} ${!startExam? style.HideContainers : style.showContainers }`}  
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
                                //  onClick={() => setStartExam(true)}
                                 >
                                  End Exam</Button>
                                  </div>

                            
                        </div>               
                    </Grid>
                    {/* /////////////// */}
                    <Grid item xs={12}  md={6} className={`${style.gridContainerSty} ${startExam? style.HideContainers : style.showContainers }`}  
                    // style={Object.assign({},
                    //  startExam?  {display: 'none'} : {display: 'block'},
                    // //  {padding:"0"}
                    //   )} 
                      > 
                    {/* <Grid item xs={12}  md={6} style={startExam?  {display: 'none'} : {display: 'block'}} >  */}
                        <div className={`${style.mainContainer} ${classes.examMainSty}`}>
                        <div>
                            <img src='https://www.ansonika.com/wilio/img/logo.png' />
                            <div>
                                <FacebookOutlinedIcon />
                                <TwitterIcon/>
                                <GoogleIcon/>
                                <LinkedInIcon/>
                            </div>
                            </div>
                            <div>
                                <img src='https://www.ansonika.com/wilio/img/info_graphic_1.svg' />
                                <h1>{examData?.templateName}</h1>
                                {/* <h1>Satisfaction Survey</h1> */}
                                {/* <p>
                                    Tation argumentum et usu, dicit viderer evertitur te has. Eu dictas concludaturque usu, facete detracto patrioque an per, lucilius pertinacia eu vel. Adhuc invidunt duo ex. Eu tantas dolorum ullamcorper qui.
                                </p> */}

                                <Button 
                                variant="contained"
                                size="medium"
                                color="primary"
                                >
                                  Purchase this template
                                </Button>
                                {/* <button>Purchase this template</button> */}
                            </div>

                            
                        </div>               
                    </Grid>

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
                                <h1 className={`${classes.textSty}`}>{examData?.templateName}</h1>
                                <p>
                                    {examData?.templateDesc}
                                </p>

                                <Button
                                variant="contained"
                                size="medium"
                                color="primary"
                                 onClick={() => setStartExam(true)}
                                 >
                                  Start</Button>
                                {/* <button onClick={() => setStartExam(true)}>Start</button> */}
                            </div>
                    </div>
                    </Grid>

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
                      startExam && (
                        <ExamQuestionNextAndPrev />
                      )
                    }

{/* /////////// */}
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
                              <CircularProgress variant="determinate" value={100} />
                              <CircularProgress variant="determinate" value={90} />
                              <Typography position='absolute' className={`${classes.textSty}`}>{90}%</Typography>
                          </Box>
                            <Typography >completed questions</Typography>

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
                            <Grid item xs={12} md={3}  lg={6}>
                              <Button
                                variant="contained"
                                size="medium"
                                color="primary"
                                // onClick={onCopy}
                              >
                                save
                              </Button>
                              </Grid>

                              <Grid item xs={12} md={3}  lg={6}>
                              <Button
                                variant="contained"
                                size="medium"
                                color="primary"
                                // onClick={onCopy}
                              >
                                submit
                              </Button>
                              </Grid>
                          </Grid>

                          {/* </Grid> */}


                        {/* </div> */}
                      </div>
                    </Grid>

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

    </PayRollLoader>
  );
}

BranchSalarySetting.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(BranchSalarySetting); 
