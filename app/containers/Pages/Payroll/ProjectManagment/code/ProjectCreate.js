import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import style from "../../../../../styles/styles.scss";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import { FormattedMessage, injectIntl } from "react-intl";
import messages from "../messages";
import Payrollmessages from "../../messages";
import PropTypes from "prop-types";
import GeneralListApis from "../../api/GeneralListApis";
import ContractData from '../api/ContractData';
import ProjectData from '../api/ProjectData';
import { PapperBlock } from "enl-components";
import useStyles from "../../Style";
import SaveButton from "../../Component/SaveButton";
import PayRollLoader from "../../Component/PayRollLoader";
import {
    Button,
    Grid,
    Checkbox,
    TextField,
    Autocomplete,
    CardContent,
    Card,
    Typography
  } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, parseISO } from "date-fns";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import StageData from '../api/StageData';
import SITEMAP from "../../../../App/routes/sitemap";



function ProjectCreate(props) {

  const locale = useSelector((state) => state.language.locale);
  const { state } = useLocation();
  const ID = state?.id;
  const history = useHistory();
  const { intl } = props;
  const { classes } = useStyles();
  const [EmployeeData, setEmployeeData] = useState([]);
  const [projectTypeData, setProjectTypeData] = useState([]);
  const [contractData, setContractData] = useState([]);
  const [organizationData, setOrganizationData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [stagesData, setStagesData] = useState([]);
  const [stage, setStage] = useState([]);
  const [stageGenerate, setStageGenerate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [DateError, setDateError] = useState({});
  const [taskCounter, setTaskCounter] = useState(0);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [formInfo, setFormInfo] = useState({
    id:0,
    projectType: null,
    contract: null,
    employee: null,
    ProjectCode: "",
    EnName:"",
    ArName:"",
    expectedWorkHours:"",
    expectedCost:"",
    profitMargin:"",
    actualWorkHours:"",
    actualCost:"",
    expectedStartDate:null,
    expectedEndDate: null,
  });




  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    let stagesArr = []
    let stagesObj = {}
    let stageTasksArr = []
    let tasksCheck = true


    Object.keys(stageGenerate).map((stage)=>{

        stageTasksArr = []

        stagesObj = {
            id: stageGenerate[stage].id ? stageGenerate[stage].id : 0,
            projectId: stageGenerate[stage].projectId ? stageGenerate[stage].projectId : 0 ,
            stageId: stageGenerate[stage].stageId,
            stageWorkHours: stageGenerate[stage].stageWorkingHours,
            startDate: dateFormatFun(stageGenerate[stage].stageStartDate),
            endDate: dateFormatFun(stageGenerate[stage].stageEndDate),
        }


       Object.keys(stageGenerate[stage]).map((task)=>{

          if(task.includes("task"))
          {

            tasksCheck = false

            stageTasksArr.push({
              id: stageGenerate[stage][task].id !== 0 ? stageGenerate[stage][task].id : 0  ,
              projectStageId: stageGenerate[stage][task].stageId ,
              taskId: stageGenerate[stage][task].taskId ? stageGenerate[stage][task].taskId : null,
              taskCode: stageGenerate[stage][task].TaskCode,
              taskArName: stageGenerate[stage][task].arName,
              taskEnName: stageGenerate[stage][task].enName,
              taskWorkHours: stageGenerate[stage][task].TaskWorkHours,
              startDate: dateFormatFun(stageGenerate[stage][task].startDate),
              endDate: dateFormatFun(stageGenerate[stage][task].endDate),
              OrganizationIds: stageGenerate[stage][task].organization.length !== 0 ? `,${stageGenerate[stage][task].organization.map(obj => obj.id).join(',')},` : null,
              JobIds: stageGenerate[stage][task].job.length !== 0 ? `,${stageGenerate[stage][task].job.map(obj => obj.id).join(',')},` : null
            })
            
          }
          
        })

        stagesObj.pmProjectTask = stageTasksArr

        stagesArr.push(stagesObj)

    })

    if(tasksCheck)
    {
      toast.error(intl.formatMessage(messages.youMustToAddTasks));
      return;
    }


    const data = {
      id: formInfo.id,
      projectCode: formInfo.ProjectCode,
      arName: formInfo.ArName,
      enName: formInfo.EnName,
      projectTypeId: formInfo.projectType ? projectTypeData.find((item)=> item.id === formInfo.projectType.id).id : "",
      contractId: formInfo.contract ? contractData.find((item)=> item.id === formInfo.contract.id).id : "",
      employeeId: formInfo.employee ? EmployeeData.find((item)=> item.id === formInfo.employee.id).id : "",
      expectedWorkHours: formInfo.expectedWorkHours,
      expectedCost: formInfo.expectedCost,
      profitMargin: formInfo.profitMargin,
      actualWorkHours: formInfo.actualWorkHours,
      actualCost: formInfo.actualCost,
      expectedStartDate: dateFormatFun(formInfo.expectedStartDate),
      expectedEndDate: dateFormatFun(formInfo.expectedEndDate),
      pmProjectStage: stagesArr,
    };
    
    try {

      let response = await ProjectData().save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.projectManagement.Project.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const getdata = async () => {
    try {
    
      const employees = await GeneralListApis(locale).GetEmployeeList();
      const contracts = await ContractData(locale).GetList();
      const jobs = await GeneralListApis(locale).GetJobList();
      const projectTypes = await GeneralListApis(locale).GetProjectTypeList();
      const orgnization = await GeneralListApis(locale).GetDepartmentList();
      const Stages = await StageData(locale).GetList();
      
      setEmployeeData(employees);
      setProjectTypeData(projectTypes)
      setContractData(contracts)
      setOrganizationData(orgnization)
      setJobData(jobs)
      setStagesData(Stages)
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const getEditdata = async () => {
    try {
      setIsLoading(true);

      let stagesArr = []
      let counter = taskCounter
      let stages = {}
      let stageData 
      let stageGenerateGetEditData = {}
      let organizationsIdsData = []
      let jobsIdsData = []


      const data = await ProjectData(locale).GetById(ID);

      data.pmProjectStage.map((item)=>{

        stageData = stagesData.find((item2) => item2.id === item.stageId)
        
        // save stages data 
        stagesArr.push(stageData)


        // create generated stages with tasks formate to save it stageGenerate state
        stages = {}

        item.pmProjectTask.map((taskData)=>{

          organizationsIdsData = taskData.organizationIds.split(',').filter(Boolean).map(Number) 
          jobsIdsData = taskData.jobIds.split(',').filter(Boolean).map(Number) 


          stages[`task${counter + 1}`] = {
            id: taskData.id,
            stageId: taskData.projectStageId,
            taskId: taskData.taskId,
            enName: taskData.taskEnName,
            arName: taskData.taskArName,
            TaskCode: taskData.taskCode,
            TaskWorkHours: taskData.taskWorkHours,
            startDate: taskData.startDate,
            endDate: taskData.endDate,
            organization: organizationData.filter(obj => organizationsIdsData.includes(obj.id)),
            job: jobData.filter(obj => jobsIdsData.includes(obj.id)),
          }
  
          counter = counter + 1
        
      })
  
  
      stages.stageStartDate = item.startDate
      stages.stageEndDate = item.endDate
      stages.stageWorkingHours = item.stageWorkHours
      stages.stageId = item.stageId
      stages.id = item.id
      stages.projectId = item.projectId
  
      stageGenerateGetEditData[`stage${stageData.id}`] = stages
  
            setStageGenerate((prev)=>({
              ...prev,
              ...stageGenerateGetEditData          
            }))
      })

     
      setFormInfo((prev)=>({
        ...prev,
        id: data.id,
        employee: data.employeeId ?  EmployeeData.find((item) => item.id === data.employeeId) : null,
        projectType: data.projectTypeId ?  projectTypeData.find((item) => item.id === data.projectTypeId) : null,
        contract: data.contractId ?  contractData.find((item) => item.id === data.contractId) : null,
        ProjectCode: data.projectCode,
        EnName: data.enName,
        ArName: data.arName,
        expectedWorkHours: data.expectedWorkHours,
        expectedCost: data.expectedCost,
        profitMargin: data.profitMargin,
        actualWorkHours: data.actualWorkHours,
        actualCost: data.actualCost,
        expectedStartDate: data.expectedStartDate,
        expectedEndDate: data.expectedEndDate,
      }))

      setStage(stagesArr)
      setTaskCounter(counter)

     
    } catch (err) {      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (ID && EmployeeData.length !== 0 && projectTypeData.length !== 0 && contractData.length !== 0 && organizationData.length !== 0 && jobData.length !== 0) {
      getEditdata();
    }
  }, [ID,EmployeeData,projectTypeData,contractData,organizationData,jobData]);


  function oncancel() {
    history.push(SITEMAP.projectManagement.Project.route);
  }


  const onInputChange = (evt,name,val) => {
    
    if(name && (val || val === null))
    {
      setFormInfo((prev) => ({ ...prev, [name]: val }));
    }
    else
    {
      setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
    }
    
  };


  const removeTaskFun = (stage,task) => {

    const newObject = { ...stageGenerate };
    delete newObject[stage][task];
   
      setStageGenerate(newObject)
  }


  const changeStageFun = (value) => {
    
    let counter = taskCounter
    let stageData = {}

    value.pmStageTask.map((item)=>{

      stageData[`task${counter + 1}`] = {
        id: 0,
        stageId: item.stageId,
        taskId: item.id,
        enName: item.enName,
        arName: item.arName,
        TaskCode: "",
        TaskWorkHours: "",
        startDate: null,
        endDate: null,
        organization: [],
        job: [],
      }

      counter = counter + 1
      
    })


    stageData.stageStartDate = null
    stageData.stageEndDate = null
    stageData.stageWorkingHours = ""
    stageData.stageId = value.id


    if (value !== null) 
      {
           const unselectedOption = stage.find((option) => option.id === value.id);

            if(!unselectedOption)
            {
            setStage((prev)=>([
              ...prev,
              value
            ]));

            setStageGenerate((prev)=>({
              ...prev,
              [`stage${value.id}`] : stageData          
            }))

            setTaskCounter(counter)
          }
      } 
  }


  const removeStageFun = (id) => {

    const updatedArray = stage.filter(obj => obj.id !== id);
    delete stageGenerate[`stage${id}`];

    setStage(updatedArray)
  }


  const handelChangTasksFieldsFun = (item,task,name,value,stageFieldName) => {

      if(task && name)
      {
        setStageGenerate((prev)=>({
          ...prev,
          [`stage${item.id}`] : {
            ...prev[`stage${item.id}`],
              [`${task}`]: {
                ...prev[`stage${item.id}`][`${task}`],
                  [`${name}`]: value,
            }
          }              
        }))
      }
      else
      {
        setStageGenerate((prev)=>({
          ...prev,
          [`stage${item.id}`] : {
            ...prev[`stage${item.id}`],
            [`${stageFieldName}`]: value
          }              
        }))  
      }
  }

  
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          ID ? 
              intl.formatMessage(messages.editProject)
            : intl.formatMessage(messages.createProject)
        }
        desc={""}
      >          
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid
              item
              xs={12}
              md={12}
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
            >

              <Grid item xs={12} md={2}>
                 <TextField
                 name='ProjectCode'
                 value={formInfo.ProjectCode}
                 onChange={onInputChange}
                 label={intl.formatMessage(messages.ProjectCode)}
                 required
                 type="number"
                 fullWidth
                 variant='outlined'
                 autoComplete='off'
                 />
              </Grid>

              <Grid item xs={12} md={4}>
                    <TextField
                    name='EnName'
                    value={formInfo.EnName}
                    onChange={onInputChange}
                    required
                    label={intl.formatMessage(Payrollmessages.enName)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                    />
              </Grid>

              <Grid item xs={12} md={4}>
                    <TextField
                    name='ArName'
                    value={formInfo.ArName}
                    onChange={onInputChange}
                    required
                    label={intl.formatMessage(Payrollmessages.arName)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                    />
              </Grid>

               <Grid container item spacing={3} alignItems="flex-start" direction="row">
                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        id="ddlMenu"
                        name="employee"
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        value={formInfo.employee !== null ? formInfo.employee : null}
                        options={EmployeeData.length != 0 ? EmployeeData : []}
                        getOptionLabel={(option) => (option ? option.name : "")}
                        renderOption={(props, option) => {
                          return (
                            <li {...props} key={option.id}>
                              {option.name}
                            </li>
                          );
                        }}
                        onChange={(event, value)=>{onInputChange(event,"employee",value !== null ? value : null)}}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="EmployeeName"
                            label={intl.formatMessage(Payrollmessages.employeeName)}
                            margin="normal"
                            className={style.fieldsSty}
                            required
                          />
                        )}
                      />
                    </Grid>
              
                    <Grid item xs={12} md={4}>
                      <Autocomplete
                          id="ddlMenu"
                          name="projectType"
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          value={formInfo.projectType !== null ? formInfo.projectType : null}
                          options={projectTypeData.length != 0 ? projectTypeData : []}
                          getOptionLabel={(option) => (option ? option.name : "")}
                          renderOption={(props, option) => {
                          return (
                              <li {...props} key={option.id}>
                              {option.name}
                              </li>
                          );
                          }}
                          onChange={(event, value)=>{onInputChange(event,"projectType",value !== null ? value : null)}}
                          renderInput={(params) => (
                          <TextField
                              {...params}
                              name="ProjectType"
                              label={intl.formatMessage(messages.ProjectType)}
                              margin="normal"
                              className={style.fieldsSty}
                              required
                          />
                          )}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                          id="ddlMenu"
                          name="contract"
                          value={formInfo.contract !== null ? formInfo.contract : null}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          options={contractData.length != 0 ? contractData : []}
                          getOptionLabel={(option) => (option ? option.customerName : "")}
                          renderOption={(props, option) => {
                          return (
                              <li {...props} key={option.id}>
                              {option.customerName}
                              </li>
                          );
                          }}
                          onChange={(event, value)=>{onInputChange(event,"contract",value !== null ? value : null)}}
                          renderInput={(params) => (
                          <TextField
                              {...params}
                              name="Contract"
                              label={intl.formatMessage(messages.Contract)}
                              margin="normal"
                              className={style.fieldsSty}
                              required
                          />
                          )}
                      />
                    </Grid>

                </Grid>

                <Grid item xs={12} md={4}>
                        <TextField
                        name='expectedWorkHours'
                        value={formInfo.expectedWorkHours}
                        onChange={onInputChange}
                        required
                        label={intl.formatMessage(messages.expectedWorkHours)}
                        fullWidth
                        variant='outlined'
                        type="number"
                        autoComplete='off'
                        />
                  </Grid>

                  <Grid item xs={12} md={4}>
                        <TextField
                        name='expectedCost'
                        value={formInfo.expectedCost}
                        onChange={onInputChange}
                        required
                        label={intl.formatMessage(messages.expectedCost)}
                        fullWidth
                        variant='outlined'
                        type="number"
                        autoComplete='off'
                        />
                  </Grid>

                  <Grid item xs={12}  md={2}> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(messages.expectedStartDate)}
                        value={formInfo.expectedStartDate ? dayjs(formInfo.expectedStartDate) : null}
                        className={classes.field}
                        onChange={(value)=>{
                            setFormInfo((prevFilters) => ({
                                ...prevFilters,
                                expectedStartDate: value,
                            }))
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`expectedStartDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`expectedStartDate`]: false
                              }))
                          }
                        }}
                        slotProps={{
                            textField: {
                                required: true,
                              },
                            }}
                        />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12}  md={2}> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(messages.expectedEndDate)}
                        value={formInfo.expectedEndDate ? dayjs(formInfo.expectedEndDate) : null}
                        className={classes.field}
                        onChange={(value)=>{
                            setFormInfo((prevFilters) => ({
                                ...prevFilters,
                                expectedEndDate: value,
                            }))
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`expectedEndDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`expectedEndDate`]: false
                              }))
                          }
                        }}
                        slotProps={{
                            textField: {
                                required: true,
                              },
                            }}
                        />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name='actualWorkHours'
                      value={formInfo.actualWorkHours}
                      onChange={onInputChange}
                      required
                      label={intl.formatMessage(messages.actualWorkHours)}
                      fullWidth
                      variant='outlined'
                      type="number"
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name='actualCost'
                      value={formInfo.actualCost}
                      onChange={onInputChange}
                      required
                      label={intl.formatMessage(messages.actualCost)}
                      fullWidth
                      variant='outlined'
                      type="number"
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name='profitMargin'
                      value={formInfo.profitMargin}
                      onChange={onInputChange}
                      required
                      label={intl.formatMessage(messages.profitMargin)}
                      fullWidth
                      variant='outlined'
                      type="number"
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12}  md={4}> 
                    <Autocomplete
                      id="ddlMenu"
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      options={stagesData.length != 0 ? stagesData: []}
                      getOptionLabel={(option) => (option ? locale === "en" ? option.enName : option.arName : "")}
                      getOptionDisabled={(opt) => !stage.find((option) => option.id === opt.id) ? false : true }
                      renderOption={(props, option) => {
                      return (
                          <li {...props} key={option.id}>
                          {locale === "en" ? option.enName : option.arName }
                          </li>
                      );
                      }}
                      onChange={(event, value)=>{
                        if (value !== null) 
                          {
                            changeStageFun(value)
                          }
                      }}
                      renderInput={(params) => (
                      <TextField
                          {...params}
                          name="Stage"
                          label={intl.formatMessage(messages.Stage)}
                          margin="normal"
                          className={style.fieldsSty}
                          required={Object.keys(stageGenerate).length !== 0 ? false : true}
                      />
                      )}
                    />
                  </Grid> 
            </Grid>

      {/* stages generate sections */}

              {stage.length !== 0 && (
                <Grid item xs={12} >
                    <h4> {intl.formatMessage(messages.Stages)}  </h4>
                </Grid>
              )}

              {stage.length !== 0 && (
                stage.map((item,index)=>{

                return <Grid
                        item
                        xs={12}
                        md={12}
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row"
                        key={index}
                      >

                    <Grid item xs={12} >
                      <Card className={`${classes.card}`}  >
                        <CardContent>
                          <Grid
                          item
                          xs={12}
                          container
                          spacing={3}
                          alignItems="flex-start"
                          direction="row"
                        >
                          <Grid item xs={11} >
                            <h4>{locale === "en" ? item.enName : item.arName }</h4>
                          </Grid>

                          <Grid item xs={1} >
                            <RemoveCircleOutlineIcon 
                              className={`${style.addIconSty} ${classes.colorSty}`}
                              onClick={()=>{
                                removeStageFun(item.id)
                              }}
                              />
                          </Grid>
                        </Grid>

                    <Grid item xs={12} >
                      <Grid container item spacing={1} alignItems="flex-start" direction="row" style={{marginTop:"10px"}} >
                        <Grid item xs={12}  md={3}> 
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker 
                              name="startDate"
                              label={intl.formatMessage(messages.startDate)}
                              value={stageGenerate[`stage${item.id}`].stageStartDate ? dayjs(stageGenerate[`stage${item.id}`].stageStartDate) : null }
                              className={classes.field}
                              onChange={(date)=>{handelChangTasksFieldsFun(item,null,null,date,"stageStartDate")}}
                              onError={(error,value)=>{
                                if(error !== null)
                                {
                                  setDateError((prevState) => ({
                                      ...prevState,
                                        [`stageStartDate`]: true
                                    }))
                                }
                                else
                                {
                                  setDateError((prevState) => ({
                                      ...prevState,
                                        [`stageStartDate`]: false
                                    }))
                                }
                              }}
                              slotProps={{
                                  textField: {
                                      required: true,
                                    },
                                  }}
                              />
                          </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12}  md={3}> 
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                label={intl.formatMessage(messages.endDate)}
                                value={stageGenerate[`stage${item.id}`].stageEndDate ? dayjs(stageGenerate[`stage${item.id}`].stageEndDate) : null }
                                className={classes.field}
                                onChange={(date)=>{handelChangTasksFieldsFun(item,null,null,date,"stageEndDate")}}
                                onError={(error,value)=>{
                                  if(error !== null)
                                  {
                                    setDateError((prevState) => ({
                                        ...prevState,
                                          [`stageEndDate`]: true
                                      }))
                                  }
                                  else
                                  {
                                    setDateError((prevState) => ({
                                        ...prevState,
                                          [`stageEndDate`]: false
                                      }))
                                  }
                                }}
                                slotProps={{
                                    textField: {
                                        required: true,
                                      },
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                            name='stageWorkHours'
                            value={stageGenerate[`stage${item.id}`].stageWorkingHours ? stageGenerate[`stage${item.id}`].stageWorkingHours : "" }
                            onChange={(e)=>{handelChangTasksFieldsFun(item,null,null,Number(e.target.value),"stageWorkingHours")}}
                            required
                            label={intl.formatMessage(messages.stageWorkHours)}
                            fullWidth
                            variant='outlined'
                            type="number"
                            autoComplete='off'
                            />
                        </Grid>
                      </Grid>

                      {/* Generate tasks section */}

                      <Card className={`${classes.card} ${style.tasksContainerSty}`}  >
                        <CardContent>
                          <Typography color='gray' variant='subtitle1' > {intl.formatMessage(messages.Tasks)}  </Typography>
                        <br/>

                      { stageGenerate && stageGenerate.length !== 0 && stageGenerate[`stage${item.id}`] ? 

                        ( Object.keys(stageGenerate[`stage${item.id}`]).map((task,index)=>{

                          if(task.includes("task"))
                          {
                            
                          return <div key={index}>
                              <Grid container spacing={3} direction='row' style={{marginTop: "0"}} >

                                <Grid item xs={11} >
                                  <Grid container spacing={3} direction="row" style={{marginLeft: "0"}}>
                                    <Grid item xs={12} md={3}>
                                      <TextField
                                          name='TaskCode'
                                          value={stageGenerate[`stage${item.id}`][task]?.TaskCode }
                                          onChange={(e)=>{handelChangTasksFieldsFun(item,task,"TaskCode",e.target.value)}}
                                          label={intl.formatMessage(messages.TaskCode)}
                                          required
                                          type="number"
                                          fullWidth
                                          variant='outlined'
                                          autoComplete='off'
                                      />
                                    </Grid>

                                    <Grid item xs={5} md={3}>
                                      <TextField
                                          name='TaskNameEN'
                                          value={stageGenerate[`stage${item.id}`][task]?.enName }
                                          required
                                          label={intl.formatMessage(messages.TaskNameEN)}
                                          fullWidth
                                          onChange={(e)=>{
                                            handelChangTasksFieldsFun(item,task,"enName",e.target.value)
                                          }}
                                          variant='outlined'
                                          autoComplete='off'
                                      />
                                  </Grid>

                                  <Grid item xs={5} md={3}>
                                    <TextField
                                        name='TaskNameAR'
                                        value={stageGenerate[`stage${item.id}`][task]?.arName }
                                        onChange={(e)=>{handelChangTasksFieldsFun(item,task,"arName",e.target.value)}}
                                        required
                                        label={intl.formatMessage(messages.TaskNameAR)}
                                        fullWidth
                                        variant='outlined'
                                        autoComplete='off'
                                    />
                                  </Grid>

                                  <Grid item xs={5} md={3}>
                                    <TextField
                                        name='TaskWorkHours'
                                        value={stageGenerate[`stage${item.id}`][task]?.TaskWorkHours }
                                        onChange={(e)=>{handelChangTasksFieldsFun(item,task,"TaskWorkHours",e.target.value)}}
                                        type="number"
                                        required
                                        label={intl.formatMessage(messages.TaskWorkHours)}
                                        fullWidth
                                        variant='outlined'
                                        autoComplete='off'
                                    />
                                  </Grid>

                                  <Grid item xs={12}  md={3}> 
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker 
                                        label={intl.formatMessage(messages.startDate)}
                                        value={stageGenerate[`stage${item.id}`][task]?.startDate ? dayjs(stageGenerate[`stage${item.id}`][task].startDate) : null }
                                        onChange={(date)=>{handelChangTasksFieldsFun(item,task,"startDate",date)}}
                                        className={classes.field}
                                        onError={(error,value)=>{
                                          if(error !== null)
                                          {
                                            setDateError((prevState) => ({
                                                ...prevState,
                                                  [`taskStartDate`]: true
                                              }))
                                          }
                                          else
                                          {
                                            setDateError((prevState) => ({
                                                ...prevState,
                                                  [`taskStartDate`]: false
                                              }))
                                          }
                                        }}
                                        slotProps={{
                                            textField: {
                                                required: true,
                                              },
                                            }}
                                        />
                                    </LocalizationProvider>
                                  </Grid>

                                  <Grid item xs={12}  md={3}> 
                                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                                          <DatePicker 
                                          label={intl.formatMessage(messages.endDate)}
                                          value={stageGenerate[`stage${item.id}`][task]?.endDate ? dayjs(stageGenerate[`stage${item.id}`][task].endDate) : null }
                                          onChange={(date)=>{handelChangTasksFieldsFun(item,task,"endDate",date)}}
                                          className={classes.field}
                                          onError={(error,value)=>{
                                            if(error !== null)
                                            {
                                              setDateError((prevState) => ({
                                                  ...prevState,
                                                    [`taskEndDate`]: true
                                                }))
                                            }
                                            else
                                            {
                                              setDateError((prevState) => ({
                                                  ...prevState,
                                                    [`taskEndDate`]: false
                                                }))
                                            }
                                          }}
                                          slotProps={{
                                              textField: {
                                                  required: true,
                                                },
                                              }}
                                          />
                                      </LocalizationProvider>
                                  </Grid>

                                  <Grid item xs={12} md={6}></Grid>
                                    <Grid item xs={12} md={6}>
                                      <Autocomplete
                                        multiple  
                                        className={`${style.AutocompleteMulSty} ${locale === "ar" ?  style.AutocompleteMulStyAR : null}`}
                                        id="checkboxes-tags-demo"
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        options={organizationData.length != 0 ? organizationData: []}
                                        disableCloseOnSelect
                                        getOptionLabel={(option) =>(
                                          option  ? option.name : ""
                                      )
                                      }
                                      value={stageGenerate[`stage${item.id}`][task]?.organization ? stageGenerate[`stage${item.id}`][task].organization : [] }
                                      onChange={(event, value)=>{handelChangTasksFieldsFun(item,task,"organization",value !== null ? value : [])}}
                                      renderOption={(props, option, { selected }) => (
                                            <li {...props} key={option.id}>
                                              <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                              />
                                              {option.name}
                                            </li>
                                          )}
                                      renderInput={(params) => (
                                            <TextField {...params} 
                                            label={intl.formatMessage(messages.organization)}
                                            required={stageGenerate[`stage${item.id}`][task].organization.length !== 0 ? false : true}
                                            />
                                          )}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                      <Autocomplete
                                          multiple  
                                          className={`${style.AutocompleteMulSty} ${locale === "ar" ?  style.AutocompleteMulStyAR : null}`}
                                          id="checkboxes-tags-demo"
                                          isOptionEqualToValue={(option, value) => option.id === value.id}
                                          options={jobData.length != 0 ? jobData: []}
                                          disableCloseOnSelect
                                          getOptionLabel={(option) =>(
                                            option  ? option.name : ""
                                        )
                                        }
                                        value={stageGenerate[`stage${item.id}`][task]?.job ? stageGenerate[`stage${item.id}`][task].job : [] }
                                        onChange={(event, value)=>{handelChangTasksFieldsFun(item,task,"job",value !== null ? value : [])}}
                                        renderOption={(props, option, { selected }) => (
                                              <li {...props} key={option.id}>
                                                <Checkbox
                                                  icon={icon}
                                                  checkedIcon={checkedIcon}
                                                  style={{ marginRight: 8 }}
                                                  checked={selected}
                                                />
                                                {option.name}
                                              </li>
                                            )}
                                        renderInput={(params) => (
                                              <TextField {...params} 
                                              label={intl.formatMessage(messages.Job)}
                                              required={stageGenerate[`stage${item.id}`][task].job.length !== 0 ? false : true}
                                              />
                                            )}
                                          />
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Grid item xs={1}>
                                  <Grid container spacing={3} direction="row" style={{marginLeft: "0"}}>
                                    <Grid item xs={2} md={1}  
                                    container
                                    spacing={0}
                                    direction="column"
                                    justifyContent="center"
                                    >
                                      <RemoveCircleOutlineIcon 
                                        className={`${style.addIconSty} ${classes.colorSty}`}
                                        onClick={()=>{
                                            removeTaskFun(`stage${item.id}`,task)
                                        }}
                                        />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <br/>
                            </div>
                          }})
                        ) : null
                      }
                                <Grid 
                                  item xs={12}  
                                  container
                                  spacing={0}
                                  direction="row"
                                  justifyContent="center"
                                  >
                                    <AddCircleOutlineIcon 
                                      className={`${style.addIconSty} ${classes.colorSty}`}
                                      onClick={()=>{
                                        setStageGenerate((prev)=>({
                                          ...prev,
                                          [`stage${item.id}`] : {
                                            ...prev[`stage${item.id}`],
                                            [`task${taskCounter + 1}`]: {
                                                id: 0,
                                                stageId: item.id,
                                                taskId: null,
                                                enName: "",
                                                arName: "",
                                                TaskCode: "",
                                                TaskWorkHours: "",
                                                startDate: null,
                                                endDate: null,
                                                organization: [],
                                                job: [],
                                              }}              
                                            }))

                                              setTaskCounter(taskCounter + 1)
                                          }}
                                      />
                                </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>  
                })
              )}
          </Grid>

          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={12}></Grid>
            <Grid
              item
              xs={12}
              md={4}
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
              className={style.itemsStyle}
            >
              <Grid item xs={3} md={5} lg={3}>
                <SaveButton Id={formInfo.id} />
              </Grid>
              <Grid item xs={3} md={5} lg={3}>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={oncancel}
                >
                  <FormattedMessage {...Payrollmessages.cancel} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

ProjectCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ProjectCreate);
