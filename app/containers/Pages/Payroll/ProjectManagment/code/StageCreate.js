import {
    Autocomplete, Button, Grid, TextField, TextareaAutosize, Card ,CardContent, Typography,
  } from '@mui/material';
  import notif from 'enl-api/ui/notifMessage';
  import { PapperBlock } from 'enl-components';
  import PropTypes from 'prop-types';
  import React, { useEffect, useState, useRef } from 'react';
  import { toast } from 'react-hot-toast';
  import { FormattedMessage, injectIntl } from 'react-intl';
  import { useSelector } from 'react-redux';
  import { useHistory, useLocation } from 'react-router-dom';
  import PayRollLoader from '../../Component/PayRollLoader'; 
  import SaveButton from '../../Component/SaveButton';
  import GeneralListApis from '../../api/GeneralListApis';
  import { ServerURL } from '../../api/ServerConfig';
  import { getFormData } from '../../helpers';
  import payrollMessages from '../../messages';
  import api from '../api/StageData';
  import messages from '../../messages';
  import style from "../../../../../styles/styles.scss";
  import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
  import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
  import useStyles from '../../Style';
  import { useReactToPrint } from 'react-to-print';
//   import EmployeeInvestigationPrint from './PrintTemplate/EmployeeInvestigationPrint';
  import AttachFileIcon from '@mui/icons-material/AttachFile';
  import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
  import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
  import IconButton from '@mui/material/IconButton';
  import Tooltip from '@mui/material/Tooltip';
//   import FileViewerPopup from "../../../../../../components/Popup/fileViewerPopup";
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import dayjs from 'dayjs';
  
  function StageCreate(props) {
    const { intl } = props;
    const { classes } = useStyles();
    const pageTitle = localStorage.getItem('MenuName');
  
    const locale = useSelector((state) => state.language.locale);
    const location = useLocation();
  
    const id = location.state?.id ?? 0;
  
    const history = useHistory();
  
    const [isLoading, setIsLoading] = useState(false);
  
    const [printData, setPrintData] = useState({});
    const printDivRef = useRef(null);

    const [employeeList, setEmployeeList] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedFileType, setUploadedFileType] = useState(null);
    const [validImageTypes, setValidImageTypes] = useState([
      "image/jpg",
      "jpg",
      "image/jpeg",
      "jpeg",
      "image/png",
      "png",
      "image/apng",
      "apng",
      "image/webp",
      "webp",
      "image/svg+xml",
      "svg+xml",
    ]);
    const [validPDFTypes, setValidPDFTypes] = useState([
      "application/pdf",
      ".pdf",
      "pdf",
    ]);
  
    const [DateError, setDateError] = useState({});
    const [taskCounter, setTaskCounter] = useState(0);
    const [taskCounterVals, setTaskCounterVals] = useState(0);
    const [tasks, setTasks] = useState({});
    const [openParentPopup, setOpenParentPopup] = useState(false);
    const [formInfo, setFormInfo] = useState({
      id,
      // date: "",
      // investigator: "",
      // employee: "",
      // incidentDate: "",
      // incident: "",
      // InvestigationResult: '',
      // TaskCode: "",
      TaskNameEN: "",
      TaskNameAR: "",
      // uploadedFile: null,
      StageCode: "",
      StageNameEN: "",
      StageNameAR: "",
    });

    

    
  
    // const fetchNeededData = async () => {
    //   setIsLoading(true);
  
    //   try {

    //     const employees = await GeneralListApis(locale).GetEmployeeList();
    //     setEmployeeList(employees || []);

    //   } catch (err) {
    //     //
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
  
    // useEffect(() => {
    //   fetchNeededData();
    // }, []);
  
    const onFormSubmit = async (evt) => {
      evt.preventDefault();

     // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(payrollMessages.DateNotValid));
        return;
      }
  
      let tasksArr = []
      let tasksKeys = []

      const data = {
        id: formInfo.id,
        stageCode: formInfo.StageCode,
        arName: formInfo.StageNameAR,
        enName: formInfo.StageNameEN,
        // pmStageTask:[]
      }

      // add first task
      tasksArr.push({
        id: formInfo.TaskId1 ? formInfo.TaskId1 : 0 ,
        stageId: formInfo.StageCode,
        // taskId: formInfo.TaskId1 ? formInfo.TaskId1 : 0,
        // stageId: formInfo.TaskStageId1 ? formInfo.TaskStageId1 : 0,
        arName: formInfo.TaskNameAR,
        enName: formInfo.TaskNameEN,
      })
      
      
      
      // add rest of Tasks
      Object.keys(tasks).map((item,index)=>{

       
        

        tasksKeys = Object.keys(tasks[item])

        console.log("task 22 =", tasks[item] );
        console.log("task 33 =", tasksKeys);

        tasksArr.push({
          enName: tasks[item][tasksKeys[0]],
          arName: tasks[item][tasksKeys[1]],
          id: tasks[item][tasksKeys[2]] ? tasks[item][tasksKeys[2]] : 0  ,
          stageId: formInfo.StageCode,
          // stageId: tasks[item][tasksKeys[2]],
        })
        
      })
      

      data.pmStageTask = tasksArr


      console.log("data =", data);
      

      setIsLoading(true);
  
      try {
        await api(locale).save(data);
        // // await api(locale).save(getFormData(data));
  
        toast.success(notif.saved);
        history.push('/app/Pages/ProjectManagment/Stage');
      } catch (error) {
        //
        console.log("error =",error);
        
      } finally {
        setIsLoading(false);
      }
    };
  
    const onInputChange = (evt) => {
      setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
    };
  
    const onCancelBtnClick = () => {
      history.push('/app/Pages/ProjectManagment/Stage');
    };


    const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;



    const removeQueFun = (task,ans) => {
      const newObject = { ...tasks };
      delete newObject[task];
      setTasks(newObject)
    }


    const onBeforeGetContent = () => {
      setIsLoading(true);
    };
  
    const onAfterPrint = () => {
      setIsLoading(false);

      setPrintData([])
    };
  
    const onPrintError = () => {
      setIsLoading(false);
    };


    // const printJS = useReactToPrint({
    //   content: () => printDivRef?.current,
    //   onBeforeGetContent,
    //   onAfterPrint,
    //   onPrintError,
    //   documentTitle: intl.formatMessage(messages.EmpInvestigation),
    // });


    const onPrintClick = async (type) => {
      setPrintData({
        formInfo: formInfo,
        tasks
      })
    };



    // useEffect(()=>{
    //   if(Object.keys(printData).length !== 0)
    //   {
    //     printJS();
    //   }
    // },[printData])





    const getEditdata =  async () => {
      setIsLoading(true);

      try {
        const data =  await api(locale).GetById(id);

        setFormInfo((prevState) => ({
          ...prevState, 
          id: data.id,
          StageCode: data.stageCode,
          StageNameEN: data.enName,
          StageNameAR: data.arName,
          TaskNameEN: data.pmStageTask.length !== 0 ? data.pmStageTask[0].enName : "",
          TaskNameAR: data.pmStageTask.length !== 0 ? data.pmStageTask[0].arName : "",
          TaskId1: data.pmStageTask.length !== 0 ? data.pmStageTask[0].id : "",
          // date: data.trxDate ? data.trxDate : null,
          // investigator: (data && data.investigatorId ? employeeList.find((item)=> item.id === data.investigatorId) : ""),
          // employee: (data && data.employeeId ? employeeList.find((item)=> item.id === data.employeeId) : ""),
          // incidentDate: data.incidentDate ? data.incidentDate : null,
          // incident: data.incident ? data.incident : null,
          // InvestigationResult: data.investigationResult ? data.investigationResult : null,
          // Question: data.details.length !== 0 ? data.details[0].question : "",
          // Answer: data.details.length !== 0 ? data.details[0].answer : "",
        }))

        setTaskCounter(data.pmStageTask.length > 1 ? data.pmStageTask.length - 1 : 0)
        setTaskCounterVals(data.pmStageTask.length > 1 ? data.pmStageTask.length - 1 : 0)

        if(data.pmStageTask.length > 1)
        {
          data.pmStageTask.map((item,index) =>{

            if(index !== 0)
              {
                setTasks((prev)=>({
                  ...prev,
                  [`tasks${index }`] : {
                    [`taskNameEN${index}`] : item.enName ? item.enName : "",
                    [`taskNameAR${index}`] : item.arName ? item.arName : "",
                    [`TaskId${index}`] : item.id ? item.id : "",
                  }         
                }))
              }

          })
          
        }
        
        
        // setUploadedFile(
        //   data && data.docName ? ` ${ServerURL}${data.docName} ` : ""
        // );
        // setUploadedFileType(
        //   data && data.docName
        //     ? ` ${ServerURL}${data.docName} `
        //         .split(/[#?]/)[0]
        //         .split(".")
        //         .pop()
        //         .trim()
        //     : null
        // );
        
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    
    };


    useEffect(() => {
      if(id !== 0)
      {
        getEditdata()
      }
      }, [id]);



    //   const uploadFileFun = (e) => {
    //     // check if uploaded file is larger than 1MB
    //     if (e.target.files[0]) {
    //       if (e.target.files[0].size < 10000000) {
    //         if (validImageTypes.includes(e.target.files[0].type)) {
    //           setUploadedFileType(e.target.files[0].type);
    //         } else if (validPDFTypes.includes(e.target.files[0].type)) {
    //           setUploadedFileType(e.target.files[0].type);
    //         }
    
    //         setUploadedFile(e.target.files[0]);
    //       } else {
    //         toast.error(intl.formatMessage(messages.uploadFileErrorMes));
    //       }
    //     }
    //   };


      const handleClickOpen = (item) => {
        setOpenParentPopup(true);
      };
    
      const handleClose = () => {
        setOpenParentPopup(false);
      };



      const taskFieldsValidationFun = () => {
        if( Object.keys(tasks).length === 0)
        {
          if(
            // formInfo.TaskCode.length !== 0  &&
            formInfo.TaskNameEN.length !== 0 
            && formInfo.TaskNameAR.length !== 0 )
            {
              return true
            }
            else
            {
              return false
            }
        }
        else
        {
        let x =  Object.keys(tasks).map((task)=>{
            console.log("task =", task);
            console.log("task2 =", tasks[task]);
            console.log("task3 =", Object.values(tasks[task]).every(value => {return value !== ''}));

            
           if(Object.values(tasks[task]).every(value => {return value !== ''}) )
           {
            console.log("in1");
            
             return true
           }
           else
           {
            console.log("in2");
            return false
           }
            
            
          })

          console.log("jjj1 =", x);
          console.log("jjj =", x.includes(false));

          if(x.includes(false))
          {
            return false
          }
          else
          {
            return true
          }
          

          // return x.some(element => element !== false)
        }
      }



      console.log("tasks = ", tasks);
      console.log("formInfo = ", formInfo);
      console.log("isLoading = ", isLoading);
      
      // console.log("test =", Object.values(tasks?.task1).every(value => { return console.log("val =", value);
      //  } ));
      
      

    return (
      <PayRollLoader isLoading={isLoading}>
        <PapperBlock whiteBg icon='border_color' desc='' title={pageTitle}>
          <form onSubmit={onFormSubmit}>
            {/* <Grid container spacing={3} direction='row' style={{marginTop: "0"}}>
                
            </Grid> */}
{/* /////////// */}


            {/* <Grid item xs={12}> 
                  <Card className={classes.card} sx={{mt:'0!important'}} >
                    <CardContent>
                        <Typography color='gray' variant='subtitle1' > {"Stage"}  </Typography> */}

                      <Grid
                        container
                        spacing={2}
                        mt={0}
                        alignItems="flex-start"
                        direction="row"
                        >
                            <Grid container spacing={3} direction='row' style={{marginTop: "0",marginLeft:"0"}}>
                            <Grid item xs={12} md={2}>
                    <TextField
                    name='StageCode'
                    value={formInfo.StageCode}
                    onChange={onInputChange}
                    label="Stage Code"
                    // label={intl.formatMessage(messages.incident)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                    // multiline
                    // rows={1}
                    />
              </Grid>
              </Grid>

              <Grid container spacing={3} direction='row' style={{marginTop: "0",marginLeft:"0"}}>

              <Grid item xs={12} md={4}>
                    <TextField
                    name='StageNameEN'
                    value={formInfo.StageNameEN}
                    onChange={onInputChange}
                    label="Stage Name EN"
                    // label={intl.formatMessage(messages.incident)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                    // multiline
                    // rows={1}
                    />
              </Grid>

              </Grid>

              <Grid container spacing={3} direction='row' style={{marginTop: "0",marginLeft:"0"}}>

              <Grid item xs={12} md={4}>
                    <TextField
                    name='StageNameAR'
                    value={formInfo.StageNameAR}
                    onChange={onInputChange}
                    label="Stage Name AR"
                    // label={intl.formatMessage(messages.incident)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                    // multiline
                    // rows={1}
                    />
              </Grid>
              </Grid>
                        </Grid>
                    {/* </CardContent>
                </Card>
            </Grid> */}











            {/* ///////////////// */}

            <Card className={`${classes.card} ${style.tasksContainerSty}`}  >
                    <CardContent>
                        <Typography color='gray' variant='subtitle1' > {"Tasks"}  </Typography>

                      {/* <Grid
                        container
                        spacing={2}
                        mt={0}
                        alignItems="flex-start"
                        direction="row"
                        > */}

            <Grid container spacing={3} direction='row' style={{marginTop: "0"}}>
                {/* <Grid item xs={5} md={2}>
                  <TextField
                    name='TaskCode'
                    value={formInfo.TaskCode}
                    onChange={onInputChange}
                    label="Task Code"
                    // label={intl.formatMessage(messages.Question)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                  />
                </Grid> */}
                <Grid item xs={5} md={4}>
                    <TextField
                        name='TaskNameEN'
                        value={formInfo.TaskNameEN}
                        onChange={onInputChange}
                        label="Task Name EN"
                        // label={intl.formatMessage(messages.Question)}
                        fullWidth
                        required
                        variant='outlined'
                        autoComplete='off'
                    />
                  {/* <TextareaAutosize
                  name='Answer'
                  value={formInfo.Answer}
                   onChange={onInputChange}
                    maxRows={2}
                    placeholder="Name EN"
                    // placeholder={intl.formatMessage(messages.Answer)}
                    className={`${style.investigationAnswer} ${classes.textareaSty}`}
                    autoComplete='off'
                  /> */}
              </Grid>

              <Grid item xs={5} md={4}>
                    <TextField
                        name='TaskNameAR'
                        value={formInfo.TaskNameAR}
                        onChange={onInputChange}
                        label="Task Name AR"
                        required
                        // label={intl.formatMessage(messages.Question)}
                        fullWidth
                        variant='outlined'
                        autoComplete='off'
                    />

              </Grid>
              <Grid item xs={2} md={1}  
              container
              spacing={0}
              direction="column"
              justifyContent="center"
              >
                    <AddCircleOutlineIcon 
                      className={`${style.addIconSty} ${classes.colorSty}`}
                      onClick={()=>{
                        console.log("taskFieldsValidationFun() =", taskFieldsValidationFun());
                        
                        if(
                          // formInfo.TaskCode.length !== 0 
                          // && formInfo.TaskNameEN.length !== 0 
                          // && formInfo.TaskNameAR.length !== 0 
                          taskFieldsValidationFun()
                        )
                        {
                          setTaskCounter(taskCounter + 1)
                          setTaskCounterVals(taskCounterVals + 1)
                          setTasks((prev)=>({
                            ...prev,
                            [`task${taskCounterVals + 1}`] : {
                              // [`taskCode${taskCounterVals + 1}`] : "",
                              [`taskNameEN${taskCounterVals + 1}`] : "",
                              [`taskNameAR${taskCounterVals + 1}`] : "",
                            }
                          }))
                      }
                      else
                      {
                        toast.error("you can not create new task before fill all task fields");
                      }
                    }}
                      />
              </Grid>
            </Grid>


            { tasks && tasks.length !== 0 ? 
              (
               
                Object.keys(tasks).map((task,index)=>{
                  
                 return <Grid container spacing={3} direction='row' style={{marginTop: "0"}} key={index}>
                          {/* <Grid item xs={5} md={2}>
                            <TextField
                              name='TaskCode'
                              value={tasks[task][Object.keys(tasks[task])[0]]}
                              onChange={(e)=>{
                                setTasks((prev)=>({
                                  ...prev,
                                    [task] : {
                                      ...prev[`${task}`],
                                      [`${Object.keys(tasks[task])[0]}`]: e.target.value
                                    }
                                }))
                              }}
                              label="Task Code"
                            //   label={intl.formatMessage(messages.Question)}
                              fullWidth
                              variant='outlined'
                              autoComplete='off'
                            />
                          </Grid> */}
                          <Grid item xs={5} md={4}>
                          <TextField
                            name='TaskNameEN'
                            // value={formInfo.Question}
                            value={tasks[task][Object.keys(tasks[task])[0]]}
                            // value={tasks[task][Object.keys(tasks[task])[1]]}
                            // onChange={onInputChange}
                            onChange={(e)=>{
                                setTasks((prev)=>({
                                  ...prev,
                                    [task] : {
                                      ...prev[`${task}`],
                                      [`${Object.keys(tasks[task])[0]}`]: e.target.value
                                      // [`${Object.keys(tasks[task])[1]}`]: e.target.value
                                    } 
                                }))
                              }}
                              required
                            label="Task Name EN"
                            // label={intl.formatMessage(messages.Question)}
                            fullWidth
                            variant='outlined'
                            autoComplete='off'
                            />
                            {/* <TextareaAutosize
                              value={tasks[que][Object.keys(tasks[que])[1]]}
                              maxRows={2}
                              placeholder="Answer"
                            //   placeholder={intl.formatMessage(messages.Answer)}
                              className={`${style.investigationAnswer} ${classes.textareaSty}`}
                              onChange={(e)=>{
                                setTasks((prev)=>({
                                  ...prev,
                                  [que] : {
                                    ...prev[`${que}`],
                                    [`${Object.keys(tasks[que])[1]}`]: e.target.value
                                  }
                                }))
                              }}
                              autoComplete='off'
                            /> */}
                        </Grid>
                        <Grid item xs={5} md={4}>
                          <TextField
                            name='TaskNameAR'
                            // value={formInfo.Question}
                            value={tasks[task][Object.keys(tasks[task])[1]]}
                            // value={tasks[task][Object.keys(tasks[task])[2]]}
                            // onChange={onInputChange}
                            onChange={(e)=>{
                                setTasks((prev)=>({
                                  ...prev,
                                    [task] : {
                                      ...prev[`${task}`],
                                      [`${Object.keys(tasks[task])[1]}`]: e.target.value
                                      // [`${Object.keys(tasks[task])[2]}`]: e.target.value
                                    }
                                }))
                              }}
                            label="Task Name AR"
                            // label={intl.formatMessage(messages.Question)}
                            fullWidth
                            required
                            variant='outlined'
                            autoComplete='off'
                            />
                            {/* <TextareaAutosize
                              value={tasks[que][Object.keys(tasks[que])[1]]}
                              maxRows={2}
                              placeholder="Answer"
                            //   placeholder={intl.formatMessage(messages.Answer)}
                              className={`${style.investigationAnswer} ${classes.textareaSty}`}
                              onChange={(e)=>{
                                setTasks((prev)=>({
                                  ...prev,
                                  [que] : {
                                    ...prev[`${que}`],
                                    [`${Object.keys(tasks[que])[1]}`]: e.target.value
                                  }
                                }))
                              }}
                              autoComplete='off'
                            /> */}
                        </Grid>
                        <Grid item xs={2} md={1}  
                        container
                        spacing={0}
                        direction="column"
                        justifyContent="center"
                        >
                          <RemoveCircleOutlineIcon 
                            className={`${style.addIconSty} ${classes.colorSty}`}
                            onClick={()=>{
                                setTaskCounter(taskCounter - 1)
                              removeQueFun(task)
                            }}
                            />
                        </Grid>
                    </Grid>
                  
                })
              ) : null
            }

            </CardContent>
            </Card>


            <Grid container spacing={3} direction='row' style={{marginTop: "0"}}>
             

              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item>
                    <SaveButton Id={id} />
                  </Grid>
  
                  <Grid item>
                    <Button
                      variant='contained'
                      size='medium'
                      color='primary'
                      onClick={onCancelBtnClick}
                    >
                      <FormattedMessage {...payrollMessages.cancel} />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </PapperBlock>



      {/* <EmployeeInvestigationPrint 
        printDivRef={printDivRef} 
        data={printData}
      /> */}


      {/* <FileViewerPopup
        handleClose={handleClose}
        open={openParentPopup}
        uploadedFileType={uploadedFileType}
        uploadedFile={uploadedFile}
        validImageTypes={validImageTypes}
        validPDFTypes={validPDFTypes}
      /> */}



      </PayRollLoader>
    );
  }
  
  StageCreate.propTypes = {
    intl: PropTypes.object.isRequired,
  };
  
  export default injectIntl(StageCreate);
  