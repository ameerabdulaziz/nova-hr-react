import React, { useEffect, useState, useCallback } from "react";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import OrganizationData from "../api/OrganizationData";
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
// import FormControlLabel from '@mui/material/FormControlLabel';
import { TextareaAutosize } from '@mui/material';
import StagePopup from "../../Component/StagePopup";
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

// import EmployeeData from "../../Component/EmployeeData";

function ProjectCreate(props) {
  const [id, setid] = useState(0);
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [note, setNote] = useState("");
  const [manPower, setManPower] = useState(0);
  const [worknatureAllowance, setWorknatureAllowance] = useState("");
  const [EmployeeData, setEmployeeData] = useState([]);
  const [stagesData, setStagesData] = useState([]);
  const [stage, setStage] = useState([]);
  const [Employee, setEmployee] = useState("");
  const [parent, setParent] = useState("");
  const locale = useSelector((state) => state.language.locale);
  const { state } = useLocation();
  const ID = state?.id;
//   const [EmployeesData, setEmployeesData] = useState([]);
  const [parentData, setParentData] = useState([]);
  const [errorMesManPower, setErrorMesManPower] = useState(false);
  const [errorMesWorknature, setErrorMesWorknature] = useState(false);
  const history = useHistory();
  const { intl } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [IsDisclaimer ,setIsDisclaimer] = useState(false)

  const { classes } = useStyles();

  const [DateError, setDateError] = useState({});

  const [open, setOpen] = useState(false);

  const [taskCounter, setTaskCounter] = useState(0);
  const [taskCounterVals, setTaskCounterVals] = useState(0);
  const [stagestaskCounter, setStagestaskCounter] = useState({});
  const [tasks, setTasks] = useState({});


  const [stages, setStages] = useState({});


  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [formInfo, setFormInfo] = useState({
    employeeId: "",
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
    // superEmployeeId:"",
    // attendenceDate: new Date(),
    // fromHours: "",
    // toHours:"",
  });
  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }








  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      id: id,
      arName: arName,
      enName: enName,
      parentId: parent.id ? parent.id : "",
      manPower: manPower.length !== 0 ? parseInt(manPower) : "",
      worknatureAllowance: parseInt(worknatureAllowance),
      note: note.length !== 0 ? note : "",
      employeeId: Employee.id ? Employee.id : "",
      isDisclaimer: IsDisclaimer
    };



    Array.from(e.target).forEach(element => {
      
      console.log("form date  =", element.name);
      console.log("form date val  =", element.value);
      

      
    });

    // try {

    //   let response = await OrganizationData().Save(data);

    //   if (response.status == 200) {
    //     toast.success(notif.saved);
    //     history.push(`/app/Pages/MainData/Organization`);
    //   } else {
    //     toast.error(response.statusText);
    //   }
    // } catch (err) {
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const getdata = async () => {
    try {
    
      const employees = await GeneralListApis(locale).GetEmployeeList();
      const Stages = await StageData(locale).GetList();
      // const Stages = await GeneralListApis(locale).GetStageList();
      

      
      

    //   const Departmentlist = await OrganizationData(locale).GetList();
    //   const Departments =Departmentlist.map((obj) => ({
    //     id: obj.id,
    //     name: locale=="en"?obj.enName:obj.arName,        
    //   }));

    //   var result

    setEmployeeData(employees);
    setStagesData(Stages)
    //   setParentData(Departments);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const getEditdata = async () => {
    // try {
    //   setIsLoading(true);
    //   const data = await OrganizationData().GetDataById(ID, locale);

    //   setid(data ? data[0].id : "");
    //   setArName(data ? data[0].arName : "");
    //   setEnName(data ? data[0].enName : "");
    //   setParent(data ? { id: data[0].parentId, name: data[0].parentName } : "");
    //   setManPower(data ? data[0].manPower : "");
    //   setWorknatureAllowance(data && data[0].worknatureAllowance ? data[0].worknatureAllowance : "");
    //   setNote(data && data[0].note ? data[0].note : "");
    //   setEmployee(
    //     data ? { id: data[0].employeeId, name: data[0].empName } : ""
    //   );
    //   setIsDisclaimer(data && data[0].isDisclaimer ? data[0].isDisclaimer : false)
    // } catch (e) {
    // } finally {
      setIsLoading(false);
    // }
  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (ID) {
      getEditdata();
    }
  }, [ID]);

  function oncancel() {
    history.push(`/app/Pages/ProjectManagment/TimeSheet`);
  }

  const errorMesFun = (e, type) => {
    let pattern = /^[0-9]+$/g;
    let result = pattern.test(e.target.value);
    if (type === "manPower") {
      setErrorMesManPower(result);
    } else {
      setErrorMesWorknature(result);
    }
  };


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


//   useEffect(()=>{
//     setdata((prevFilters) => ({
//         ...prevFilters,
//         fromHours: getCurrentDateTime(),
//         toHours: getCurrentDateTime(),
//       }));
//   },[])



  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };


  const removeQueFun = (stage,task) => {
    const newObject = { ...tasks };
    delete newObject[stage][task];
    setTasks(newObject)
  }



  const openStagePopup = () => {
    setOpen(true);
  }
  
  const closeStagePopup = () => {
    // setQuesPopupEditcardName("")
    setOpen(false);
  }

  // used to create tasks counter for each stage
  useEffect(()=>{
    if(stage.length !== 0)
    {
      setStagestaskCounter((prev)=>({
        ...prev,
        [`stage${stage.length}TaskCounter`]: 0
      }))
    }
  },[stage])



  const changeStageFun = (value) => {


    const unselectedOption = stage.find((option) => !value.includes(option));
    if(unselectedOption)
    {
      const index = stage.findIndex(obj => obj.id === unselectedOption.id);
      console.log("index =", index);
    }

    console.log("unselectedOption =", unselectedOption);
    

    if (value !== null) {

      // const sortedSelected = value.sort(
      //   (a, b) => options.indexOf(a) - options.indexOf(b)
      // );

            // setStage(sortedSelected);
            setStage(value);

            // setStagestaskCounter((prev)=>({
            //   ...prev,
            //   [`stage${stage.length}TaskCounter`]: 0
            // }))
          } else {
            setStage(null);
          }

  }


  console.log("stage =", stage);
  console.log("tasks =", tasks);
  console.log("tasks2 =", tasks.length !==0 && tasks[`stage${1}`] ? tasks[`stage${1}`] : null);

  console.log("stagestaskCounter =", stagestaskCounter);


  
  
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          ID
          ? "edit TimeSheet"
            : "create TimeSheet"
            // ? intl.formatMessage(messages.editOrganization)
            // : intl.formatMessage(messages.createOrganization)
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
                    label="Project Code"
                    // label={intl.formatMessage(messages.incident)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                    // multiline
                    // rows={1}
                    />
              </Grid>

             

            

              <Grid item xs={12} md={4}>
                    <TextField
                    name='EnName'
                    value={formInfo.EnName}
                    onChange={onInputChange}
                    label="Er Name"
                    // label={intl.formatMessage(messages.incident)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                    // multiline
                    // rows={1}
                    />
              </Grid>

              <Grid item xs={12} md={4}>
                    <TextField
                    name='ArName'
                    value={formInfo.ArName}
                    onChange={onInputChange}
                    label="Ar Name"
                    // label={intl.formatMessage(messages.incident)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                    // multiline
                    // rows={1}
                    />
              </Grid>



               <Grid container item spacing={3} alignItems="flex-start" direction="row">
               <Grid item xs={12} md={4}>
                <Autocomplete
                  id="ddlMenu"
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  options={EmployeeData.length != 0 ? EmployeeData : []}
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
                      setEmployee(value);
                    } else {
                      setEmployee(null);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="EmployeeName"
                      label="EmployeeName"
                    //   label={intl.formatMessage(messages.EmployeeName)}
                      margin="normal"
                      className={style.fieldsSty}
                    //   required
                    />
                  )}
                />
              </Grid>

                    <Grid item xs={12} md={4}>
                    <Autocomplete
                        id="ddlMenu"
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        // value={parent.length != 0 && parent !== null ? parent : null}
                        // options={parentData.length != 0 ? parentData : []}
                        options={[]}
                        getOptionLabel={(option) => (option ? option.name : "")}
                        renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                            {option.name}
                            </li>
                        );
                        }}
                        // onChange={(event, value) => {
                        //   if (value !== null) {
                        //     setParent(value);
                        //   } else {
                        //     setParent("");
                        //   }
                        // }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            name="ProjectType"
                            label="Project Type"
                            // label={intl.formatMessage(messages.parentNameOrg)}
                            margin="normal"
                            className={style.fieldsSty}
                        />
                        )}
                    />
                    </Grid>

                    <Grid item xs={12} md={4}>
                    <Autocomplete
                        id="ddlMenu"
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        // value={parent.length != 0 && parent !== null ? parent : null}
                        // options={parentData.length != 0 ? parentData : []}
                        options={[]}
                        getOptionLabel={(option) => (option ? option.name : "")}
                        renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                            {option.name}
                            </li>
                        );
                        }}
                        // onChange={(event, value) => {
                        //   if (value !== null) {
                        //     setParent(value);
                        //   } else {
                        //     setParent("");
                        //   }
                        // }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            name="Contract"
                            label="Contract"
                            // label={intl.formatMessage(messages.parentNameOrg)}
                            margin="normal"
                            className={style.fieldsSty}
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
                    label="Expected Work Hours"
                    // label={intl.formatMessage(messages.incident)}
                    fullWidth
                    variant='outlined'
                    type="number"
                    autoComplete='off'
                    // multiline
                    // rows={1}
                    />
              </Grid>

              <Grid item xs={12} md={4}>
                    <TextField
                    name='expectedCost'
                    value={formInfo.expectedCost}
                    onChange={onInputChange}
                    label="Expected Cost"
                    // label={intl.formatMessage(messages.incident)}
                    fullWidth
                    variant='outlined'
                    type="number"
                    autoComplete='off'
                    // multiline
                    // rows={1}
                    />
              </Grid>

              <Grid item xs={12} md={4}>
                    <TextField
                    name='profitMargin'
                    value={formInfo.profitMargin}
                    onChange={onInputChange}
                    label="Profit Margin"
                    // label={intl.formatMessage(messages.incident)}
                    fullWidth
                    variant='outlined'
                    type="number"
                    autoComplete='off'
                    // multiline
                    // rows={1}
                    />
              </Grid>

              <Grid item xs={12} md={4}>
                    <TextField
                    name='actualWorkHours'
                    value={formInfo.actualWorkHours}
                    onChange={onInputChange}
                    label="Actual Work Hours"
                    // label={intl.formatMessage(messages.incident)}
                    fullWidth
                    variant='outlined'
                    type="number"
                    autoComplete='off'
                    // multiline
                    // rows={1}
                    />
              </Grid>

              <Grid item xs={12} md={4}>
                    <TextField
                    name='actualCost'
                    value={formInfo.actualCost}
                    onChange={onInputChange}
                    label="Actual Cost"
                    // label={intl.formatMessage(messages.incident)}
                    fullWidth
                    variant='outlined'
                    type="number"
                    autoComplete='off'
                    // multiline
                    // rows={1}
                    />
              </Grid>

              <Grid item xs={12}  md={2}> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label="Expected Start Date"
                        // label={intl.formatMessage(Payrollmessages.date)}
                          value={formInfo.expectedStartDate ? dayjs(formInfo.expectedStartDate) : null}
                        className={classes.field}
                        //   onChange={(date) => {
                        //     setDate(date)
                        // }}
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
                                // required: true,
                              },
                            }}
                        />
                    </LocalizationProvider>
            </Grid>

            <Grid item xs={12}  md={2}> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label="Expected End Date"
                        // label={intl.formatMessage(Payrollmessages.date)}
                          value={formInfo.expectedEndDate ? dayjs(formInfo.expectedEndDate) : null}
                        className={classes.field}
                        //   onChange={(date) => {
                        //     setDate(date)
                        // }}
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
                                // required: true,
                              },
                            }}
                        />
                    </LocalizationProvider>
            </Grid>

            

            
            <Grid item xs={12}  md={4}> 
                    <Autocomplete
                          multiple  
                          className={`${style.AutocompleteMulSty} ${locale === "ar" ?  style.AutocompleteMulStyAR : null}`}
                          id="checkboxes-tags-demo"
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          options={stagesData.length != 0 ? stagesData: []}
                          disableCloseOnSelect
                          getOptionLabel={(option) =>(
                            option  ? option.enName : ""
                        )
                        }
                      //   onChange={(event, value) => {
                      //     if (value !== null) {
                      //       setStage(value);

                      //       // setStagestaskCounter((prev)=>({
                      //       //   ...prev,
                      //       //   [`stage${stage.length}TaskCounter`]: 0
                      //       // }))
                      //     } else {
                      //       setStage(null);
                      //     }

                          
                      // }}

                      onChange={(event, value)=>{
                        changeStageFun(value)
                      }}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.enName}
                            </li>
                          )}
                          style={{ width: 500 }}
                          renderInput={(params) => (
                            <TextField {...params} 
                            label="Stage"
                            // label={intl.formatMessage(messages.shift)}
                            />
                          )}
                        />
            </Grid>

              
           
            </Grid>

{/* //////////////////// */}

{stage.length !== 0 && (
<Grid item xs={12} >
              <h4>  Stages  </h4>
      </Grid>
)}


{stage.length !== 0 && (
  stage.map((item,index)=>{
    console.log("item =", item);

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
          <Grid item xs={12} >
              <h4>  {item.enName}  </h4>
        </Grid>
      <Grid item xs={12} >
      <Grid container item spacing={1} alignItems="flex-start" direction="row" >
      {/* <Grid item xs={12} md={6}>
          <Autocomplete
              id="ddlMenu"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              // value={parent.length != 0 && parent !== null ? parent : null}
              options={stagesData.length != 0 ? stagesData : []}
              // options={[]}
              getOptionLabel={(option) => (option ? option.name : "")}
              renderOption={(props, option) => {
              return (
                  <li {...props} key={option.id}>
                  {option.name}
                  </li>
              );
              }}
              // onChange={(event, value) => {
              //   if (value !== null) {
              //     setParent(value);
              //   } else {
              //     setParent("");
              //   }
              // }}
              renderInput={(params) => (
              <TextField
                  {...params}
                  name="Stage"
                  label="Stage"
                  // label={intl.formatMessage(messages.parentNameOrg)}
                  margin="normal"
                  className={style.fieldsSty}
              />
              )}
          />
      </Grid> */}
  </Grid>

  <Grid container item spacing={1} alignItems="flex-start" direction="row" style={{marginTop:"10px"}} >
  <Grid item xs={12}  md={3}> 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
              label="Start Date"
              // label={intl.formatMessage(Payrollmessages.date)}
              //   value={formInfo.expectedStartDate ? dayjs(formInfo.expectedStartDate) : null}
              className={classes.field}
              //   onChange={(date) => {
              //     setDate(date)
              // }}
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
                      // required: true,
                    },
                  }}
              />
          </LocalizationProvider>
      </Grid>

      <Grid item xs={12}  md={3}> 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
              label="End Date"
              // label={intl.formatMessage(Payrollmessages.date)}
              //   value={formInfo.expectedEndDate ? dayjs(formInfo.expectedEndDate) : null}
              className={classes.field}
              //   onChange={(date) => {
              //     setDate(date)
              // }}
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
                      // required: true,
                    },
                  }}
              />
          </LocalizationProvider>
      </Grid>

      <Grid item xs={12} md={3}>
          <TextField
          name='stageWorkHours'
          // value={formInfo.expectedWorkHours}
          // onChange={onInputChange}
          label="Stage Work Hours"
          // label={intl.formatMessage(messages.incident)}
          fullWidth
          variant='outlined'
          type="number"
          autoComplete='off'
          // multiline
          // rows={1}
          />
    </Grid>
  </Grid>
{/* /////////////// */}



<Card className={`${classes.card} ${style.tasksContainerSty}`}  >
          <CardContent>
              <Typography color='gray' variant='subtitle1' > {"Tasks"}  </Typography>

              

  <Grid container spacing={3} direction='row' style={{marginTop: "0"}}>
  <Grid item xs={11} >
  <Grid container spacing={3} direction="row" style={{marginLeft: "0"}}>
  <Grid item xs={12} md={3}>
          <TextField
              name='TaskCode'
              // value={formInfo.TaskNameEN}
              // onChange={onInputChange}
              label="Task Code"
              // label={intl.formatMessage(messages.Question)}
              fullWidth
              // required
              variant='outlined'
              autoComplete='off'
          />
       
    </Grid>

      <Grid item xs={5} md={3}>
          <TextField
              name='TaskNameEN'
              defaultValue={item.enName}
              // value={formInfo.TaskNameEN}
              // onChange={onInputChange}
              label="Task Name EN"
              // label={intl.formatMessage(messages.Question)}
              fullWidth
              // required
              variant='outlined'
              autoComplete='off'
          />
       
    </Grid>

    <Grid item xs={5} md={3}>
          <TextField
              name='TaskNameAR'
              // value={formInfo.TaskNameAR}
              // onChange={onInputChange}
              label="Task Name AR"
              // required
              // label={intl.formatMessage(messages.Question)}
              fullWidth
              variant='outlined'
              autoComplete='off'
          />

    </Grid>

    <Grid item xs={5} md={3}>
          <TextField
              name='TaskWorkHours'
              // value={formInfo.TaskNameAR}
              // onChange={onInputChange}
              label="Task Work Hours"
              // required
              // label={intl.formatMessage(messages.Question)}
              fullWidth
              variant='outlined'
              autoComplete='off'
          />

    </Grid>

    <Grid item xs={12}  md={3}> 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
              label="Start Date"
              // label={intl.formatMessage(Payrollmessages.date)}
              //   value={formInfo.expectedStartDate ? dayjs(formInfo.expectedStartDate) : null}
              className={classes.field}
              //   onChange={(date) => {
              //     setDate(date)
              // }}
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
                      // required: true,
                    },
                  }}
              />
          </LocalizationProvider>
      </Grid>

      <Grid item xs={12}  md={3}> 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
              label="End Date"
              // label={intl.formatMessage(Payrollmessages.date)}
              //   value={formInfo.expectedEndDate ? dayjs(formInfo.expectedEndDate) : null}
              className={classes.field}
              //   onChange={(date) => {
              //     setDate(date)
              // }}
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
                      // required: true,
                    },
                  }}
              />
          </LocalizationProvider>
      </Grid>

      <Grid item xs={12} md={3}>
          <Autocomplete
              id="ddlMenu"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              // value={parent.length != 0 && parent !== null ? parent : null}
              // options={stagesData.length != 0 ? stagesData : []}
              options={[]}
              getOptionLabel={(option) => (option ? option.name : "")}
              renderOption={(props, option) => {
              return (
                  <li {...props} key={option.id}>
                  {option.name}
                  </li>
              );
              }}
              // onChange={(event, value) => {
              //   if (value !== null) {
              //     setParent(value);
              //   } else {
              //     setParent("");
              //   }
              // }}
              renderInput={(params) => (
              <TextField
                  {...params}
                  name="organization"
                  label="organization"
                  // label={intl.formatMessage(messages.parentNameOrg)}
                  margin="normal"
                  className={style.fieldsSty}
              />
              )}
          />
      </Grid>

      <Grid item xs={12} md={3}>
          <Autocomplete
              id="ddlMenu"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              // value={parent.length != 0 && parent !== null ? parent : null}
              // options={stagesData.length != 0 ? stagesData : []}
              options={[]}
              getOptionLabel={(option) => (option ? option.name : "")}
              renderOption={(props, option) => {
              return (
                  <li {...props} key={option.id}>
                  {option.name}
                  </li>
              );
              }}
              // onChange={(event, value) => {
              //   if (value !== null) {
              //     setParent(value);
              //   } else {
              //     setParent("");
              //   }
              // }}
              renderInput={(params) => (
              <TextField
                  {...params}
                  name="jobLevel"
                  label="Job Level"
                  // label={intl.formatMessage(messages.parentNameOrg)}
                  margin="normal"
                  className={style.fieldsSty}
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
          <AddCircleOutlineIcon 
            className={`${style.addIconSty} ${classes.colorSty}`}
            onClick={()=>{
              
              
          //     if(
          //       taskFieldsValidationFun()
          //     )
          //     {
            
                setTaskCounter(taskCounter + 1)
                // setTaskCounterVals(taskCounterVals + 1)
                setTasks((prev)=>({
                  ...prev,
                  // [`task${taskCounterVals + 1}`] : {
                  //   // [`taskCode${taskCounterVals + 1}`] : "",
                  //   [`taskNameEN${taskCounterVals + 1}`] : "",
                  //   [`taskNameAR${taskCounterVals + 1}`] : "",
                  // }
                  [`stage${index + 1}`] : {
                    ...prev[`stage${index + 1}`],
                    [`task${taskCounter + 1}`]: {
                    [`taskNameEN${taskCounter + 1}`] : "",
                    [`taskNameAR${taskCounter + 1}`] : "",
                    }
                  }
                }))
          //   }
          //   else
          //   {
          //     toast.error("you can not create new task before fill all task fields");
          //   }
          }}
            />
    </Grid>
    </Grid>
    </Grid>
  </Grid>
<br/>

  { tasks && tasks.length !== 0 && tasks[`stage${index + 1}`] ? 
  // { tasks && tasks.length !== 0 ? 


// tasks[`stage${1}`]
    (
     
      Object.keys(tasks[`stage${index + 1}`]).map((task,index)=>{
        // Object.keys(tasks).map((task,index)=>{

        
        
       return <div>
       <Grid container spacing={3} direction='row' style={{marginTop: "0"}} key={index}>

                {/* <Grid item xs={5} md={4}>
                <TextField
                  name='TaskNameEN'
                  // value={tasks[task][Object.keys(tasks[task])[0]]}
                  // onChange={(e)=>{
                  //     setTasks((prev)=>({
                  //       ...prev,
                  //         [task] : {
                  //           ...prev[`${task}`],
                  //           [`${Object.keys(tasks[task])[0]}`]: e.target.value
                  //           // [`${Object.keys(tasks[task])[1]}`]: e.target.value
                  //         } 
                  //     }))
                  //   }}
                    // required
                  label="Task Name EN"
                  // label={intl.formatMessage(messages.Question)}
                  fullWidth
                  variant='outlined'
                  autoComplete='off'
                  />

              </Grid>
              <Grid item xs={5} md={4}>
                <TextField
                  name='TaskNameAR'
                  // value={tasks[task][Object.keys(tasks[task])[1]]}
                  // onChange={(e)=>{
                  //     setTasks((prev)=>({
                  //       ...prev,
                  //         [task] : {
                  //           ...prev[`${task}`],
                  //           [`${Object.keys(tasks[task])[1]}`]: e.target.value
                  //           // [`${Object.keys(tasks[task])[2]}`]: e.target.value
                  //         }
                  //     }))
                  //   }}
                  label="Task Name AR"
                  // label={intl.formatMessage(messages.Question)}
                  fullWidth
                  // required
                  variant='outlined'
                  autoComplete='off'
                  />

              </Grid> */}

<Grid item xs={11} >
  <Grid container spacing={3} direction="row" style={{marginLeft: "0"}}>
  <Grid item xs={12} md={3}>
          <TextField
              name='TaskCode'
              // value={formInfo.TaskNameEN}
              // onChange={onInputChange}
              label="Task Code"
              // label={intl.formatMessage(messages.Question)}
              fullWidth
              // required
              variant='outlined'
              autoComplete='off'
          />
       
    </Grid>

      <Grid item xs={5} md={3}>
          <TextField
              name='TaskNameEN'
              defaultValue={item.enName}
              // value={formInfo.TaskNameEN}
              // onChange={onInputChange}
              label="Task Name EN"
              // label={intl.formatMessage(messages.Question)}
              fullWidth
              // required
              variant='outlined'
              autoComplete='off'
          />
       
    </Grid>

    <Grid item xs={5} md={3}>
          <TextField
              name='TaskNameAR'
              // value={formInfo.TaskNameAR}
              // onChange={onInputChange}
              label="Task Name AR"
              // required
              // label={intl.formatMessage(messages.Question)}
              fullWidth
              variant='outlined'
              autoComplete='off'
          />

    </Grid>

    <Grid item xs={5} md={3}>
          <TextField
              name='TaskWorkHours'
              // value={formInfo.TaskNameAR}
              // onChange={onInputChange}
              label="Task Work Hours"
              // required
              // label={intl.formatMessage(messages.Question)}
              fullWidth
              variant='outlined'
              autoComplete='off'
          />

    </Grid>

    <Grid item xs={12}  md={3}> 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
              label="Start Date"
              // label={intl.formatMessage(Payrollmessages.date)}
              //   value={formInfo.expectedStartDate ? dayjs(formInfo.expectedStartDate) : null}
              className={classes.field}
              //   onChange={(date) => {
              //     setDate(date)
              // }}
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
                      // required: true,
                    },
                  }}
              />
          </LocalizationProvider>
      </Grid>

      <Grid item xs={12}  md={3}> 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
              label="End Date"
              // label={intl.formatMessage(Payrollmessages.date)}
              //   value={formInfo.expectedEndDate ? dayjs(formInfo.expectedEndDate) : null}
              className={classes.field}
              //   onChange={(date) => {
              //     setDate(date)
              // }}
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
                      // required: true,
                    },
                  }}
              />
          </LocalizationProvider>
      </Grid>

      <Grid item xs={12} md={3}>
          <Autocomplete
              id="ddlMenu"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              // value={parent.length != 0 && parent !== null ? parent : null}
              // options={stagesData.length != 0 ? stagesData : []}
              options={[]}
              getOptionLabel={(option) => (option ? option.name : "")}
              renderOption={(props, option) => {
              return (
                  <li {...props} key={option.id}>
                  {option.name}
                  </li>
              );
              }}
              // onChange={(event, value) => {
              //   if (value !== null) {
              //     setParent(value);
              //   } else {
              //     setParent("");
              //   }
              // }}
              renderInput={(params) => (
              <TextField
                  {...params}
                  name="organization"
                  label="organization"
                  // label={intl.formatMessage(messages.parentNameOrg)}
                  margin="normal"
                  className={style.fieldsSty}
              />
              )}
          />
      </Grid>

      <Grid item xs={12} md={3}>
          <Autocomplete
              id="ddlMenu"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              // value={parent.length != 0 && parent !== null ? parent : null}
              // options={stagesData.length != 0 ? stagesData : []}
              options={[]}
              getOptionLabel={(option) => (option ? option.name : "")}
              renderOption={(props, option) => {
              return (
                  <li {...props} key={option.id}>
                  {option.name}
                  </li>
              );
              }}
              // onChange={(event, value) => {
              //   if (value !== null) {
              //     setParent(value);
              //   } else {
              //     setParent("");
              //   }
              // }}
              renderInput={(params) => (
              <TextField
                  {...params}
                  name="jobLevel"
                  label="Job Level"
                  // label={intl.formatMessage(messages.parentNameOrg)}
                  margin="normal"
                  className={style.fieldsSty}
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
                    console.log("stage key =", `stage${index + 1}`);
                    console.log("task key =", task);
                    
                      // setTaskCounter(taskCounter - 1)
                    removeQueFun(`stage${index + 1}`,task)
                  }}
                  />
              </Grid>
              </Grid>
              </Grid>
              
          </Grid>
          <br/>
          </div>
        
      })
    ) : null
  }

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
                <SaveButton Id={id} />
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

              {/* <Grid item xs={12} md={2} lg={1}>
                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    onClick={()=>{
                      // setPopupType("create")
                      openStagePopup()
                    }}
                  >
                    Add Stage
                    <FormattedMessage {...messages.createQuestion} />
                  </Button>
                </Grid> */}
            </Grid>
          </Grid>

          {/* <StagePopup 
            open={open}
            handleClose={closeStagePopup}
            stagesData={stagesData}
          /> */}
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

ProjectCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ProjectCreate);
