import React, { useEffect, useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TimeSheetData from "../api/TimeSheetData";
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
import { PapperBlock } from "enl-components";
import useStyles from "../../Style";
import SaveButton from "../../Component/SaveButton";
import PayRollLoader from "../../Component/PayRollLoader";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextareaAutosize } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, parseISO } from "date-fns";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import EmployeeData from "../../Component/EmployeeData";
import SITEMAP from "../../../../App/routes/sitemap";

function TimeSheetCreate(props) {

  const locale = useSelector((state) => state.language.locale);
  const { state } = useLocation();
  const ID = state?.id;
  const [ProjectsData, setProjectsData] = useState([]);
  const [Project, setProject] = useState("");
  const [ActiveData, setActiveData] = useState([]);
  const [Active, setActive] = useState("");
  const [StageData, setStageData] = useState([]);
  const [Stage, setStage] = useState("");
  const [TasksData, setTasksData] = useState([]);
  const [Task, setTask] = useState("");
  const history = useHistory();
  const { intl } = props;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const maxDate = tomorrow.toISOString().split("T")[0];

  const [isLoading, setIsLoading] = useState(true);

  const { classes } = useStyles();

  const [DateError, setDateError] = useState({});

  const [getEditData, setGetEditData] = useState([]);

  const [data, setdata] = useState({
    employeeId: "",
    superEmployeeId:"",
    attendenceDate: new Date(),
    fromHours: "",
    toHours:"",
    NumberOfMinutes:"",
    timeSheetDetails: "",
  });




  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const bodyData = {
      id: ID ? ID : 0,
      employeeId: data.employeeId,
      projectTaskId: Task.id,
      activityTypeId: Active.id,
      fromTime: data.fromHours,
      toTime: data.toHours,
      minutes: data.NumberOfMinutes,
      workDetails: data.timeSheetDetails,
      TaskDate: dateFormatFun(data.attendenceDate),
    };


    try {

      let response = await TimeSheetData().save(bodyData);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.projectManagement.TimeSheet.route);
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
    
      const projects = await GeneralListApis(locale).GetProjectList();
      const Activelist = await GeneralListApis(locale).GetActivityTypeList();
      
      setProjectsData(projects);
      setActiveData(Activelist);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const getEditdata = async () => {
    try {
      setIsLoading(true);
      const data = await TimeSheetData(locale).GetById(ID);

      setGetEditData(data)

      setdata((prevFilters) => ({
        ...prevFilters,
        id: data.id,
        employeeId: data.employeeId,
        attendenceDate: data.taskDate,
        fromHours: data.fromTime,
        toHours: data.toTime,
        NumberOfMinutes: data.minutes,
        timeSheetDetails: data.workDetails,
      }));

      setProject(ProjectsData.find((item) => item.id === data?.projectId) ? ProjectsData.find((item) => item.id === data?.projectId) : "")
      setActive(ActiveData.find((item) => item.id === data?.activityTypeId) ? ActiveData.find((item) => item.id === data?.activityTypeId) : "")
      
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (ID && ActiveData.length !== 0 && ProjectsData.length !== 0 ) 
      {
         getEditdata();
      }
  }, [ID,ActiveData,ProjectsData]);

  function oncancel() {
    history.push(SITEMAP.projectManagement.TimeSheet.route);
  }

  const handleEmpChange = useCallback((id, name) => {
    if (name == "employeeId")
      setdata((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
      }));
    if (name == "superEmployeeId")
      setdata((prevFilters) => ({
        ...prevFilters,
        superEmployeeId: id,
      }));
  }, []);




  const getCurrentDateTime = () => {
    const current = new Date();
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(current.getDate()).padStart(2, '0');
    const hours = String(current.getHours()).padStart(2, '0');
    const minutes = String(current.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };


  useEffect(()=>{
    setdata((prevFilters) => ({
        ...prevFilters,
        fromHours: getCurrentDateTime(),
        toHours: getCurrentDateTime(),
      }));
  },[])


  const calculateDiffTimesFun = (startTime,endTime) => {

      const timeDifference = new Date(endTime) - new Date(startTime)

      const minutesDifference = Math.floor(timeDifference / (1000 * 60));

      setdata((prev) => ({
        ...prev,
        NumberOfMinutes: minutesDifference,
    }))
      
  }

  useEffect(()=>{
    if(data.fromHours.length !== 0 && data.toHours.length !== 0)
    {
      calculateDiffTimesFun(data.fromHours,data.toHours)
    }

  },[data.fromHours,data.toHours])


  const getStagesDataFun = async (id) => {
    const stageslist = await GeneralListApis(locale).GetStageList(id);
    setStageData(stageslist)
  }

  const getTasksDataFun = async (id) => {
    const taskslist = await GeneralListApis(locale).GetProjectTasksList(id);
    setTasksData(taskslist)
  }


  useEffect( ()=>{

      if(Project.length !== 0)
      {
        getStagesDataFun(Project.id)
      }
      else
      {
        setStageData([])
        setTasksData([])
      }

      setStage("")
      setTask("")

  },[Project])

  useEffect( ()=>{

        if(Stage.length !== 0)
          {
            getTasksDataFun(Stage.id)
          }
          else
          {
            setTasksData([])
          }

          setTask("")

  },[Stage])


  useEffect(()=>{
    
    if(Project.length !== 0 && StageData.length !== 0 && ID && getEditData.length !== 0)
      {        
        setStage(StageData.find((item) => item.id === getEditData?.projectStageId) ? StageData.find((item) => item.id === getEditData?.projectStageId) : "")
      }
  },[Project,ID,getEditData,StageData])

  useEffect(()=>{
    
    if(Stage.length !== 0 && TasksData.length !== 0 && ID && getEditData.length !== 0)
      {        
        setTask(TasksData.find((item) => item.id === getEditData?.projectTaskId) ? TasksData.find((item) => item.id === getEditData?.projectTaskId) : "")
      }
  },[Stage,ID,getEditData,TasksData])


  const onfieldChangeFun = (name,value) => {
    setdata((prev) => ({
      ...prev,
      [name]: value,
  }))
  }

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          ID
            ? intl.formatMessage(messages.editTimeSheet)
            : intl.formatMessage(messages.createTimeSheet)
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

                <Grid item xs={12} style={{paddingTop:"14px"}}>
                  <EmployeeData
                      handleEmpChange={handleEmpChange}
                      id={data.employeeId}             
                  />

                </Grid>

                <Grid item xs={12}  md={2}> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(messages.AttendenceDate)}
                          value={data.attendenceDate ? dayjs(data.attendenceDate) : null}
                        className={classes.field}
                        onChange={(value)=>{
                            onfieldChangeFun("attendenceDate",value)
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`startDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`startDate`]: false
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
                    name='FromHours'
                    required
                    value={data.fromHours }
                    label={intl.formatMessage(messages.FromHours)}
                    type='datetime-local'
                    onChange={(e)=>{
                        onfieldChangeFun("fromHours",e.target.value)
                    }
                    }
                    InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        max: `${new Date().toISOString().split("T")[0]}T23:59`, // Sets the max to the end of the current day
                      }}
                    fullWidth
                    autoComplete='off'
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    name='ToHours'
                    required
                    value={data.toHours}
                    // label="To Hours"
                    label={intl.formatMessage(messages.ToHours)}
                    type='datetime-local'
                    onChange={(e)=>{
                        onfieldChangeFun("toHours",e.target.value)
                    }}
                    InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        max: `${maxDate}T23:59`, // Allows selection up to the end of tomorrow
                      }}
                    fullWidth
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={2}>
                  <TextField
                    type="number"
                    id="NumberOfMinutes"
                    name="NumberOfMinutes"
                    value={data.NumberOfMinutes}
                    label={intl.formatMessage(messages.NumberOfMinutes)}
                    className={classes.field}
                    variant="outlined"
                    disabled
                    required
                    autoComplete="off"
                  />
                </Grid>

               <Grid container item spacing={3} alignItems="flex-start" direction="row">
                    <Grid item xs={12} md={3}>
                      <Autocomplete
                          id="ddlMenu"
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          value={Active.length != 0 && Active !== null ? Active : null}
                          options={ActiveData.length != 0 ? ActiveData : []}
                          getOptionLabel={(option) => (option ? option.name : "")}
                          renderOption={(props, option) => {
                          return (
                              <li {...props} key={option.id}>
                              {option.name}
                              </li>
                          );
                          }}
                          onChange={(event, value) => {
                            if (value !== null) {
                              setActive(value);
                            } else {
                              setActive("");
                            }
                          }}
                          renderInput={(params) => (
                          <TextField
                              {...params}
                              name="ActivityCode"
                              label={intl.formatMessage(messages.ActivityCode)}
                              margin="normal"
                              className={style.fieldsSty}
                              required
                          />
                          )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Autocomplete
                          id="ddlMenu"
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          value={Project.length != 0 && Project !== null ? Project : null}
                          options={ProjectsData.length != 0 ? ProjectsData : []}
                          getOptionLabel={(option) => (option ? option.name : "")}
                          renderOption={(props, option) => {
                          return (
                              <li {...props} key={option.id}>
                              {option.name}
                              </li>
                          );
                          }}
                          onChange={(event, value) => {
                            if (value !== null) {
                              setProject(value);
                            } else {
                              setProject("");
                            }
                          }}
                          renderInput={(params) => (
                          <TextField
                              {...params}
                              name="ProjectCode"
                              label={intl.formatMessage(messages.ProjectCode)}
                              margin="normal"
                              className={style.fieldsSty}
                              required
                          />
                          )}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={3}>
                      <Autocomplete
                          id="ddlMenu"
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          value={Stage.length != 0 && Stage !== null ? Stage : null}
                          options={StageData.length != 0 ? StageData : []}
                          getOptionLabel={(option) => (option ? option.name : "")}
                          renderOption={(props, option) => {
                          return (
                              <li {...props} key={option.id}>
                              {option.name}
                              </li>
                          );
                          }}
                          onChange={(event, value) => {
                            if (value !== null) {
                              setStage(value);
                            } else {
                              setStage("");
                            }
                          }}
                          renderInput={(params) => (
                          <TextField
                              {...params}
                              name="StageCode"
                              label={intl.formatMessage(messages.stageCode)}
                              margin="normal"
                              className={style.fieldsSty}
                              required
                          />
                          )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Autocomplete
                          id="ddlMenu"
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          value={Task.length != 0 && Task !== null ? Task : null}
                          options={TasksData.length != 0 ? TasksData : []}
                          getOptionLabel={(option) => (option ? option.name : "")}
                          renderOption={(props, option) => {
                          return (
                              <li {...props} key={option.id}>
                              {option.name}
                              </li>
                          );
                          }}
                          onChange={(event, value) => {
                            if (value !== null) {
                              setTask(value);
                            } else {
                              setTask("");
                            }
                          }}
                          renderInput={(params) => (
                          <TextField
                              {...params}
                              name="TaskCode"
                              label={intl.formatMessage(messages.TaskCode)}
                              margin="normal"
                              className={style.fieldsSty}
                              required
                          />
                          )}
                      />
                    </Grid>
              </Grid>

              <Grid item xs={9} >
                    <TextareaAutosize
                    name='timeSheetDetails'
                    value={data.timeSheetDetails}
                    onChange={(e)=>{ onfieldChangeFun("timeSheetDetails",e.target.value) }}
                      maxRows={3}
                      required
                      placeholder={intl.formatMessage(messages.timeSheetDetails)}
                      className={`${style.investigationAnswer} ${classes.textareaSty}`}
                      autoComplete='off'
                    />
                </Grid>

            </Grid>
                      
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
                <SaveButton Id={data.id} />
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

TimeSheetCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TimeSheetCreate);
