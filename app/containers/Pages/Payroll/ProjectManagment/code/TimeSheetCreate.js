import React, { useEffect, useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextareaAutosize } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, parseISO } from "date-fns";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import EmployeeData from "../../Component/EmployeeData";

function TimeSheetCreate(props) {
  const [id, setid] = useState(0);
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [note, setNote] = useState("");
  const [manPower, setManPower] = useState(0);
  const [worknatureAllowance, setWorknatureAllowance] = useState("");
  const [Employee, setEmployee] = useState("");
  const [parent, setParent] = useState("");
  const locale = useSelector((state) => state.language.locale);
  const { state } = useLocation();
  const ID = state?.id;
  const [EmployeesData, setEmployeesData] = useState([]);
  const [parentData, setParentData] = useState([]);
  const [errorMesManPower, setErrorMesManPower] = useState(false);
  const [errorMesWorknature, setErrorMesWorknature] = useState(false);
  const history = useHistory();
  const { intl } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [IsDisclaimer ,setIsDisclaimer] = useState(false)

  const { classes } = useStyles();

  const [DateError, setDateError] = useState({});

  const [data, setdata] = useState({
    employeeId: "",
    superEmployeeId:"",
    attendenceDate: new Date(),
    fromHours: "",
    toHours:"",
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
    // try {
    
    //   const employees = await GeneralListApis(locale).GetEmployeeList();
      

    //   const Departmentlist = await OrganizationData(locale).GetList();
    //   const Departments =Departmentlist.map((obj) => ({
    //     id: obj.id,
    //     name: locale=="en"?obj.enName:obj.arName,        
    //   }));

    //   var result

    //   setEmployeesData(employees);
    //   setParentData(Departments);
    // } catch (err) {
    // } finally {
      setIsLoading(false);
    // }
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


  useEffect(()=>{
    setdata((prevFilters) => ({
        ...prevFilters,
        fromHours: getCurrentDateTime(),
        toHours: getCurrentDateTime(),
      }));
  },[])

console.log("gg =", new Date());


  

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

<Grid item xs={12} style={{paddingTop:"14px"}}>
                <EmployeeData
                    handleEmpChange={handleEmpChange}
                    id={data.employeeId}             
                />

                {/* <TextField
                  name="contractCode"
                  id="contractCode"
                  placeholder="Contract Code"
                  label="Contract Code"
                  // placeholder={intl.formatMessage(messages.arName)}
                  // label={intl.formatMessage(messages.arName)}
                  required
                  type="number"
                  className={`${classes.field} ${style.fieldsSty}`}
                  margin="normal"
                  variant="outlined"
                  value={arName}
                  onChange={(e) => setArName(e.target.value)}
                  autoComplete='off'
                /> */}
              </Grid>

<Grid item xs={12}  md={2}> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label="Attendence Date"
                        // label={intl.formatMessage(Payrollmessages.date)}
                          value={data.attendenceDate ? dayjs(data.attendenceDate) : null}
                        className={classes.field}
                        //   onChange={(date) => {
                        //     setDate(date)
                        // }}
                        onChange={(value)=>{
                            setdata((prevFilters) => ({
                                ...prevFilters,
                                attendenceDate: value,
                            }))
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
            <Grid item xs={12} md={2}>
              <TextField
                name='FromHours'
                
                value={data.fromHours }
                label="From Hours"
                // label={intl.formatMessage(messages.interviewTime)}
                type='datetime-local'
                // onChange={(evt) => onPopupInputChange(evt)}
                // variant="standard"
                // focused
                onChange={(e)=>{
                    console.log("test",e.target.value);

                    setdata((prevFilters) => ({
                        ...prevFilters,
                        fromHours: e.target.value,
                    }))
                }
                }
                InputLabelProps={{
                    shrink: true,
                  }}
                fullWidth
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                name='ToHours'
                // value={"2024-10-09T14:30"}
                value={data.toHours}
                label="To Hours"
                // label={intl.formatMessage(messages.interviewTime)}
                type='datetime-local'
                // onChange={(evt) => onPopupInputChange(evt)}
                // variant="standard"
                // focused
                onChange={(e)=>{
                    setdata((prevFilters) => ({
                        ...prevFilters,
                        toHours:  e.target.value,
                      }))
                }}
                InputLabelProps={{
                    shrink: true,
                  }}
                fullWidth
                autoComplete='off'
              />
            </Grid>

            {/* <Grid item xs={12} md={2}>
              <TextField
                // value={data.allowFromTime}
                label="From Hours"
                // label={intl.formatMessage(messages.startTime)}
                type="time"
                name="FromHours"
                // onChange={onTimePickerChange}
                className={classes.field}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                // value={data.allowToTime}
                label="To Hours"
                // label={intl.formatMessage(messages.endTime)}
                type="time"
                name="ToHours"
                // onChange={onTimePickerChange}
                className={classes.field}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid> */}
            <Grid item xs={12} md={2}>
              <TextField
                type="number"
                id="NumberOfMinutes"
                name="NumberOfMinutes"
                // value={data.minutesCount}
                // onChange={(e) => handleChange(e)}
                label="Number of minutes"
                // label={intl.formatMessage(messages.minutesCount)}
                // required
                className={classes.field}
                variant="outlined"
                // disabled
                autoComplete="off"
              />
            </Grid>


              

             
              

               <Grid container item spacing={3} alignItems="flex-start" direction="row">
                    <Grid item xs={12} md={3}>
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
                            name="ActivityCode"
                            label="Active Code"
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
                            name="ProjectCode"
                            label="Project Code"
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
                            name="StageCode"
                            label="Stage Code"
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
                            name="TaskCode"
                            label="Task Code"
                            // label={intl.formatMessage(messages.parentNameOrg)}
                            margin="normal"
                            className={style.fieldsSty}
                        />
                        )}
                    />
                    </Grid>
            </Grid>

            <Grid item xs={9} >
                  <TextareaAutosize
                  name='Description'
                  // value={formData.Answer1}
                  //  onChange={onInputChange}
                    maxRows={3}
                    placeholder="Description"
                    // placeholder={intl.formatMessage(messages.Answer)}
                    className={`${style.investigationAnswer} ${classes.textareaSty}`}
                    autoComplete='off'
                  />
              </Grid>

            
            {/* <Grid item xs={12}  md={2}> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label="Contract End Date"
                        // label={intl.formatMessage(Payrollmessages.date)}
                        //   value={date ? dayjs(date) : null}
                        className={classes.field}
                        //   onChange={(date) => {
                        //     setDate(date)
                        // }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`endDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`endDate`]: false
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
            </Grid> */}

              
              {/* <Grid item xs={12} md={4}>
                <TextField
                  name="customerNameAR"
                  id="customerNameAR"
                  placeholder="Customer name AR"
                  label="Customer name AR"
                  // placeholder={intl.formatMessage(messages.enName)}
                  // label={intl.formatMessage(messages.enName)}
                  required
                  className={`${classes.field} ${style.fieldsSty}`}
                  margin="normal"
                  variant="outlined"
                  value={enName}
                  onChange={(e) => setEnName(e.target.value)}
                  autoComplete='off'
                />
              </Grid> */}
            </Grid>
            {/* <Grid container item spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={4}>
                <TextField
                  name="contractValue"
                  id="contractValue"
                  placeholder="Contract Value"
                  label="Contract Value"
                  // placeholder={intl.formatMessage(messages.enName)}
                  // label={intl.formatMessage(messages.enName)}
                //   required
                  type="number"
                  className={`${classes.field} ${style.fieldsSty}`}
                  margin="normal"
                  variant="outlined"
                  value={enName}
                  onChange={(e) => setEnName(e.target.value)}
                  autoComplete='off'
                />
              </Grid>
              </Grid> */}
           

{/*               
              <Grid container item spacing={3} alignItems="flex-start" direction="row">
                <Grid item xs={12} md={4}>
                    <TextField
                      name="customerPhone"
                      id="customerPhone"
                      placeholder="Customer mobile number"
                      label="Customer mobile number"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      // required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={enName}
                      onChange={(e) => setEnName(e.target.value)}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="customerEmail"
                      id="customerEmail"
                      placeholder="Customer Email"
                      label="Customer Email"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      // required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={enName}
                      onChange={(e) => setEnName(e.target.value)}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="website"
                      id="website"
                      placeholder="Customer web site"
                      label="Customer web site"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      // required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={enName}
                      onChange={(e) => setEnName(e.target.value)}
                      autoComplete='off'
                    />
                  </Grid>

              </Grid> */}

{/* 
              <Grid container item spacing={3} alignItems="flex-start" direction="row">
                <Grid item xs={12} md={4}>
                    <TextField
                      name="magName"
                      id="magName"
                      placeholder="Account manager name"
                      label="Account manager name"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      // required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={enName}
                      onChange={(e) => setEnName(e.target.value)}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="phone"
                      id="phone"
                      placeholder="Account manager phone"
                      label="Account manager phone"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      // required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={enName}
                      onChange={(e) => setEnName(e.target.value)}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="managerEmail"
                      id="managerEmail"
                      placeholder="Account manager Email"
                      label="Account manager Email"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      // required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={enName}
                      onChange={(e) => setEnName(e.target.value)}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="jobTitle"
                      id="jobTitle"
                      placeholder="Account manager job Title"
                      label="Account manager job Title"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      // required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={enName}
                      onChange={(e) => setEnName(e.target.value)}
                      autoComplete='off'
                    />
                  </Grid>

              </Grid> */}
            
           
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
