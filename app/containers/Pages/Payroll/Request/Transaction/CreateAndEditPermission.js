import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PermissionsData from '../api/PermissionsData';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss'
import {  useHistory, useLocation  } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../../Request/messages';
import Payrollmessages from '../../messages';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import GeneralListApis from '../../api/GeneralListApis'; 
import { PapperBlock } from 'enl-components';
import useStyles from '../../Style';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import dayjs from 'dayjs';
// import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import { format } from "date-fns";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {Card ,CardContent} from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import  TextareaAutosize  from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import FormControl from '@mui/material/FormControl';




function CreateAndEditPermission(props) {
  const [id, setid] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [note, setNote] = useState('');
  const [manPower, setManPower] = useState('');
  const [totalMinutes, setTotalMinutes] = useState("");
  const [Employee ,setEmployee] = useState("") 
  const [EmployeeName ,setEmployeeName] = useState('') 
  const [PermissionType ,setPermissionType] = useState('') 
  const [BackupEmployee ,setBackupEmployee] = useState('')
  const [PermissionReason ,setPermissionReason] = useState('')  
  const [submitting ,setSubmitting] = useState(false)
  const [processing ,setProcessing] = useState(false)
  const [checkIn ,setCheckIn] = useState(false)
  const [checkOut ,setCheckOut] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const [EmployeesData, setEmployeesData] = useState([]);
  const [permissionData, setPermissionData] = useState([]);
  const [errorMes, setErrorMes] = useState(false);
  const [permissionDate, setPermissionDate] = useState(null);
  const { state } = useLocation()
  const  ID  = state?.id
  const history=useHistory(); 
  // const [value, setValue] = useState(dayjs('2022-04-17T15:30'));
  const { intl } = props;


  // const StyledTextarea = styled(TextareaAutosize)(
  //   ({ theme }) => `
  //   width: 100%;
  //   font-family: IBM Plex Sans, sans-serif;
  //   font-size: 0.875rem;
  //   font-weight: 400;
  //   line-height: 1.5;
  //   padding: 12px;
  //   border-radius: 12px 12px 0 12px;
  //   background:  '#fff';
  //   border-color: rgba(0, 0, 0, 0.23);
  
  //   &:hover {
  //     border-color: #000000;
  //   }
  
  //   &:focus {
  //     border-color: #3f51b5;
  //   }
  
  //   // firefox
  //   &:focus-visible {
  //     outline: 0;
  //   }
  // `,
  // );



  const { classes } = useStyles();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    setProcessing(true)
    const data = {
      id: id,
      employeeId: EmployeeName.id ? EmployeeName.id : "",
      permissionId: PermissionType.id ? PermissionType.id : "",
      date: permissionDate,
      startTime: startTime,
      endTime: endTime,
      minutesCount: totalMinutes,
      alternativeEmployeeId: BackupEmployee.id ?  BackupEmployee.id : "",
      notes: PermissionReason,
      exemptEntryRec: checkIn,
      exemptLeaveRec: checkOut
    };


    console.log("data =", data);


    try {
      let response = await PermissionsData().Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/Request/Permissions`);
      } else {
          toast.error(response.statusText);
      }
      setSubmitting(false)
      setProcessing(false)
    } catch (err) {
      toast.error(notif.error);
      setSubmitting(false)
      setProcessing(false)
    }
    
  };
 


const getdata =  async () => {

  const employees = await GeneralListApis(locale).GetEmployeeList(locale);    
  const Permissionlist = await GeneralListApis(locale).GetPermissionList(locale);  

  setEmployeesData(employees)
  setPermissionData(Permissionlist)
};

const getEditdata =  async () => {

  const data =  await PermissionsData().GetDataById(ID,locale);

  console.log("data by id =", data);

  setid(data ? data.id : "")
  setEmployeeName(data ? {id:data.employeeId , name: data.employeeName }  : "")
  setPermissionType(data ? {id:data.permissionId , name: data.permissionName }  : "")
  setPermissionDate(data ? data.date : "")
  setStartTime(data ? data.startTime : "")
  setEndTime(data ? data.endTime : "") 
  setTotalMinutes(data ? data.minutesCount : "")
  setBackupEmployee(data ? {id:data.alternativeEmployeeId , name: data.alternativeEmployeeName }  : "")
  setPermissionReason(data ? data.notes : "")
  setCheckIn(data ? data.exemptEntryRec : false)
  setCheckOut(data ? data.exemptLeaveRec : false)
};


useEffect(() => {
  getdata();
}, []);

useEffect(() => {
  if(ID)
  {
    getEditdata()
  }
  }, [ID]);

  useEffect(() => {
    if(startTime.length !== 0 &&  endTime.length !== 0)
    {
      // let start = new Date(startTime)
      // let end = new Date(endTime)
      // let sub = Math.abs( start - end ) 

      let selectedDate = new Date(permissionDate);
      let DateTime = selectedDate.toISOString();
      let date = DateTime.split('T')[0];
      let selectedStartTime = startTime;
      let selectedEndTime = endTime;
      let start = new Date(date + 'T' + selectedStartTime);
      let end = new Date(date + 'T' + selectedEndTime);
      if(end > start)
      {
        let sub = Math.abs( end - start ) 
        let minutes = Math.floor(sub / 60000);
        setTotalMinutes(minutes)
        setErrorMes(false)
      }
      else
      {
        console.log("no");
        setTotalMinutes("")
        setErrorMes(true)
      }
      



      // console.log("start2 =",typeof startTime);
      // console.log("end =", Date.parse( endTime));
      // console.log("sub =", sub);

    }
  }, [startTime , endTime]);


  function oncancel(){
    history.push(`/app/Pages/Request/Permissions`);
  }


const TimeFun = (e, type) => {
  
  
  if(type === "StartTime")
  {
    console.log("time =", e.target.value);
    setStartTime(e.target.value)
  }
  else
  {
    console.log("time2 =", e.target.value);
    setEndTime(e.target.value)
  }
}




  return (
    <div>
      <PapperBlock whiteBg icon="border_color" 
          title={ID ?  
                    intl.formatMessage(messages.editPermissionRequest)
                  :  intl.formatMessage(messages.createPermissionRequest)
               } 
          desc={""}>
            <form onSubmit={handleSubmit}>

            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
            <Grid item xs={12}  md={12} 
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
              className={style.gridSty}
              > 


              <Grid item xs={12}  md={4} > 
                <Autocomplete
                    id="ddlMenu"   
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    value={EmployeeName.length != 0 && EmployeeName !== null ? EmployeeName : null}                       
                    options={EmployeesData.length != 0 ? EmployeesData: []}
                    getOptionLabel={(option) =>(
                      option  ? option.name : ""
                    )
                    }
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                    onChange={(event, value) => {
                        if (value !== null) {
                          setEmployeeName(value);
                        } else {
                          setEmployeeName("");
                        }
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        name="EmployeeName"
                        label={intl.formatMessage(messages.employeeName) }
                        margin="normal" 
                        className={style.fieldsSty}
                        required
                        />
                        
                    )}
                />
                  </Grid>
                </Grid>
                    
                <Grid item xs={12}  md={12} 
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                className={style.gridSty}
                > 
                    
                <Grid item xs={12}  md={4}> 
                <Autocomplete
                  id="ddlMenu"   
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  value={PermissionType.length != 0 && PermissionType !== null ? PermissionType : null}                       
                  options={permissionData.length != 0 ? permissionData: []}
                  getOptionLabel={(option) =>(
                    option  ? option.name : ""
                  )
                  }
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {option.name}
                      </li>
                    );
                  }}
                  onChange={(event, value) => {
                      if (value !== null) {
                        setPermissionType(value);
                      } else {
                        setPermissionType("");
                      }
                  }}
                  renderInput={(params) => (
                  <TextField
                      {...params}
                      name="PermissionType"
                      label={intl.formatMessage(messages.permissionType) }
                      margin="normal" 
                      className={style.fieldsSty}
                      required
                      />
                      
                  )}
                  />
                </Grid>
                
                </Grid>

                <Grid item xs={12}  md={12}  className={style.gridSty}> 
                <Card className={classes.card}>
                    <CardContent className={style.CardContentSty}>
                    <Grid item xs={12}  md={12} 
                      container
                      spacing={3}
                      alignItems="flex-start"
                      direction="row">
                <Grid item xs={12}  md={3}> 
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          label={intl.formatMessage(Payrollmessages.date)}
                          value={permissionDate}
                          onChange={(date) => { setPermissionDate( format(new Date(date), "yyyy-MM-dd"))}}
                          className={classes.field}
                          renderInput={(params) => <TextField {...params} variant="outlined" required />}
                        />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12}  md={2} className={` ${locale === "ar" ?  style.timeContainer : null}`}> 
                  {/* <div className={classes.picker}> */}
                    <TextField
                      id="datetime-local"
                      label={intl.formatMessage(messages.startTime)}
                      type="time"
                      value={startTime}
                      // type="datetime-local"
                      // defaultValue="2017-05-24T10:30"
                      // variant="standard"
                      onChange={(e) => { TimeFun(e, "StartTime")}}
                      sx={{ width: "100%" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  {/* </div> */}
                  {errorMes && (
                        <p className={style.errorMes}> <FormattedMessage {...messages.permissionStartTimeErrorMes} /> </p>
                      )}
                  </Grid>
                    
                  <Grid item xs={12}  md={2} className={` ${locale === "ar" ?  style.timeContainer : null}`}> 
                      <TextField
                        id="datetime-local"
                        label={intl.formatMessage(messages.endTime)}
                        type="time"
                        value={endTime}
                        // type="datetime-local"
                        // defaultValue="2017-05-24T10:30"
                        // variant="standard"
                        onChange={(e) => { TimeFun(e, "EndTime")}}
                        sx={{ width: "100%" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        required
                      />
                  </Grid>
                  <Grid item xs={12}  md={2} className={style.totalMinutesContainer}> 
                      <TextField
                      name="Totalno.ofMinutes"
                      id="Totalno.ofMinutes"
                      placeholder={intl.formatMessage(messages.minutesCount)}
                      label={intl.formatMessage(messages.minutesCount)}
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={totalMinutes}
                      type='text'
                      disabled
                    />
                  </Grid>
                    </Grid>
                    </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}  md={12} 
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                    className={style.gridSty}
                    > 

                    <Grid item xs={12}  md={4}> 
                    <Autocomplete
                          id="ddlMenu"   
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          value={BackupEmployee.length != 0 && BackupEmployee !== null ? BackupEmployee : null}                       
                          options={EmployeesData.length != 0 ? EmployeesData: []}
                          getOptionLabel={(option) =>(
                            option  ? option.name : ""
                          )
                          }
                          renderOption={(props, option) => {
                            return (
                              <li {...props} key={option.id}>
                                {option.name}
                              </li>
                            );
                          }}
                          onChange={(event, value) => {
                              if (value !== null) {
                                setBackupEmployee(value);
                              } else {
                                setBackupEmployee("");
                              }
                          }}
                          renderInput={(params) => (
                          <TextField
                              {...params}
                              name="BackupEmployee"
                              label={intl.formatMessage(messages.BackupEmployee)}
                              // label={intl.formatMessage(messages.parentNameOrg) }
                              margin="normal" 
                              className={style.fieldsSty}
                              />
                          )}
                      />
                  </Grid>
                  </Grid>

                  <Grid item xs={12}  md={12} className={style.gridSty}> 
                    {/* <StyledTextarea
                      aria-label="minimum height"
                      minRows={3}
                      placeholder="Permission Reason"
                      // value={PermissionReason}
                      // onChange={(e)=>  setPermissionReason(e.currentTarget.value)}
                      // onChange={(e)=>  setPermissionReason(e.target.value)}
                    /> */}

                      <TextareaAutosize 
                        className={style.TextareaAutosizeSty}
                        aria-label="minimum height"
                        minRows={3}
                        placeholder={intl.formatMessage(messages.PermissionReason)}
                        value={PermissionReason}
                        onChange={(e)=>  setPermissionReason(e.target.value)}
                      />
                    
                  </Grid>

                  <Grid item xs={12}  md={5} className={style.gridSty}> 
                    <Card className={classes.card}>
                      {/* <FormattedMessage {...messages.AccessToTimeInOUT} /> */}
                          <CardContent className={style.CardContentSty}>
                          <FormControlLabel  
                                control={ 
                                  <Switch  
                                  checked={checkIn} 
                                  onChange={() => 
                                    setCheckIn(!checkIn)
                                  }
                                  color="primary" 
                                  className={style.BtnSty}
                                  />} 
                                label={intl.formatMessage(messages.checkIn) }
                                /> 

                                <FormControlLabel  
                                control={ 
                                  <Switch  
                                  checked={checkOut} 
                                  onChange={() => 
                                    setCheckOut(!checkOut)
                                  }
                                  color="primary" 
                                  className={style.BtnSty}
                                  />} 
                                label={intl.formatMessage(messages.checkOut) }
                                /> 
                          </CardContent>
                    </Card>
                    
                  </Grid>

                  </Grid>
              
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                 
                  <Grid item xs={12} md={12}></Grid>
                  <Grid item xs={12} md={4}
                  // <Grid item xs={12} md={4}
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                  className={style.itemsStyle}
                  >
                <Grid item xs={3}  md={5} lg={3}>                  
                {/* <Grid item xs={12}  md={5} lg={3}>                   */}
                    <Button variant="contained" type="submit" size="medium" color="primary"  disabled={submitting || processing}>
                    {processing && (
                      <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                    )}
                       <FormattedMessage {...Payrollmessages.save} /> 
                    </Button>
                </Grid>
                <Grid item xs={3}  md={5} lg={3}>
                {/* <Grid item xs={12}  md={5} lg={3}> */}
                    <Button variant="contained" size="medium" color="primary" 
                    onClick={oncancel}
                     >
                       <FormattedMessage {...Payrollmessages.cancel} /> 
                    </Button>
                </Grid>
                </Grid>
              </Grid>
          </form>
      </PapperBlock>         

     
    </div>
  );
}

CreateAndEditPermission.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CreateAndEditPermission);
