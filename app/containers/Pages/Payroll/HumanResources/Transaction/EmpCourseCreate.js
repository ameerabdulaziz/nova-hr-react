import React, { useState, useEffect } from 'react';
import { PapperBlock } from 'enl-components';
import ApiData from '../api/EmpCourseData';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import {Button ,Grid,TextField, Autocomplete ,Card ,CardContent} from "@mui/material";
import useStyles from '../../Style';
import PropTypes from 'prop-types';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import GeneralListApis from '../../api/GeneralListApis';
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';




function EmpCourseCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation()
  const { id } = location.state??0;
  const { classes } = useStyles();
  
  const [data, setdata] = useState({
    "id": 0,
    "startDate":format(new Date(), "yyyy-MM-dd"),   
    "finishDate":format(new Date(), "yyyy-MM-dd"),     
    "commStartDate":format(new Date(), "yyyy-MM-dd"),   
    "commEndDate":format(new Date(), "yyyy-MM-dd"),     
    "employeeId":"",   
    "employeeName":"",    
    "courseId":"",   
    "courseName":"",  
    "gradeId": "",   
    "gradeName": "",    
    "centerId":"",   
    "centerName":"",    
    "courseCost": "", 
    "notes":"",    
  });
  const [EmployeeList, setEmployeeList] = useState([]);
  const [CourseList, setCourseList] = useState([]);
  const [GradeList, setGradeList] = useState([]);
  const [CenterList, setCenterList] = useState([]);
  const history=useHistory();  

  const handleChange = (event) => {
    debugger ;

      if(event.target.name =="notes")
        setdata((prevFilters) => ({
        ...prevFilters,
        note: event.target.value,
      }));
          
      if(event.target.name =="courseCost")
        setdata((prevFilters) => ({
          ...prevFilters,
          courseCost: event.target.value,
        }));        
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();   
    try{
      debugger;  
      let response = await  ApiData(locale).Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/EmpCourseList`);
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  }
  async function oncancel(){
    history.push(`/app/Pages/HR/EmpCourseList`);
  }
  async function fetchData() {
    debugger ;
   
    const courses = await GeneralListApis(locale).GetCourseList();
    setCourseList(courses);

    const grades = await GeneralListApis(locale).GetGradeList();
    setGradeList(grades);    

    const centers = await GeneralListApis(locale).GetTrainingCenterList();
    setCenterList(centers);
    
    const employees = await GeneralListApis(locale).GetEmployeeList();
    setEmployeeList(employees);

    if(id)
    {
        const dataApi = await ApiData(locale).Get(id??0);
    
        setdata(dataApi);
    }
  }
  
  useEffect(() => {    
    fetchData();
  }, []);

  return (
    <div>
        <PapperBlock whiteBg icon="border_color" title={data.id==0?intl.formatMessage(messages.EmpCourseCreateTitle):intl.formatMessage(messages.EmpCourseUpdateTitle)} desc={""}>
        <form onSubmit={handleSubmit}>
            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                <Grid item xs={12}  md={3}>                
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            label={intl.formatMessage(messages.date)}
                            value={data.startDate}
                            onChange={(date) => {debugger; setdata((prevFilters) => ({...prevFilters,startDate: format(new Date(date), "yyyy-MM-dd"),}))}}
                            className={classes.field}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}  md={3}>                
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            label={intl.formatMessage(messages.date)}
                            value={data.finishDate}
                            onChange={(date) => {debugger; setdata((prevFilters) => ({...prevFilters,finishDate: format(new Date(date), "yyyy-MM-dd"),}))}}
                            className={classes.field}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}  md={3}>                
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            label={intl.formatMessage(messages.date)}
                            value={data.commStartDate}
                            onChange={(date) => {debugger; setdata((prevFilters) => ({...prevFilters,commStartDate: format(new Date(date), "yyyy-MM-dd"),}))}}
                            className={classes.field}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}  md={3}>                
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            label={intl.formatMessage(messages.date)}
                            value={data.commEndDate}
                            onChange={(date) => {debugger; setdata((prevFilters) => ({...prevFilters,commEndDate: format(new Date(date), "yyyy-MM-dd"),}))}}
                            className={classes.field}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Autocomplete  
                        id="employeeId"                        
                        options={EmployeeList}  
                        value={{id:data.employeeId,name:data.employeeName}}     
                        isOptionEqualToValue={(option, value) =>
                            value.id === 0 || value.id === "" ||option.id === value.id
                        }                 
                        getOptionLabel={(option) =>
                        option.name ? option.name : ""
                        }
                        onChange={(event, value) => {
                            if (value !== null) {
                                setdata((prevFilters) => ({
                                ...prevFilters,
                                employeeId:value.id,
                                employeeName:value.name
                                }));
                                getEmployeeData(value.id,false)  ;   
                            } else {
                                setdata((prevFilters) => ({
                                    ...prevFilters,
                                    employeeId:0,
                                    employeeName:""
                                })); 
                                getEmployeeData(0,false)  ;   
                            }
                        }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="employeeId"
                            required                              
                            label={intl.formatMessage(messages.employeeName)}
                            />
                        )}
                    />  
                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete  
                        id="courseId"                        
                        options={CourseList}  
                        value={{id:data.courseId,name:data.courseName}}   
                        isOptionEqualToValue={(option, value) =>
                            value.id === 0 || value.id === "" ||option.id === value.id
                        }                   
                        getOptionLabel={(option) =>
                        option.name ? option.name : ""
                        }
                        onChange={(event, value) => {
                            
                                setdata((prevFilters) => ({
                                ...prevFilters,
                                courseId:value !== null?value.id:0,
                                courseName:value !== null?value.name:""
                                }));  
                                
                            }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="courseId"
                            required                              
                            label={intl.formatMessage(messages.resignReasonName)}
                            />
                        )}
                    />  
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <Autocomplete  
                        id="gradeId"                        
                        options={GradeList}  
                        value={{id:data.gradeId,name:data.gradeName}}   
                        isOptionEqualToValue={(option, value) =>
                            value.id === 0 || value.id === "" ||option.id === value.id
                        }                   
                        getOptionLabel={(option) =>
                        option.name ? option.name : ""
                        }
                        onChange={(event, value) => {
                            
                                setdata((prevFilters) => ({
                                ...prevFilters,
                                gradeId:value !== null?value.id:0,
                                gradeName:value !== null?value.name:""
                                }));  
                                
                            }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="gradeId"
                            required                              
                            label={intl.formatMessage(messages.resignReasonName)}
                            />
                        )}
                    />  
                </Grid>

                <Grid item xs={12} md={4}>
                    <Autocomplete  
                        id="centerId"                        
                        options={CenterList}  
                        value={{id:data.centerId,name:data.centerName}}   
                        isOptionEqualToValue={(option, value) =>
                            value.id === 0 || value.id === "" ||option.id === value.id
                        }                   
                        getOptionLabel={(option) =>
                        option.name ? option.name : ""
                        }
                        onChange={(event, value) => {
                            
                                setdata((prevFilters) => ({
                                ...prevFilters,
                                centerId:value !== null?value.id:0,
                                centerName:value !== null?value.name:""
                                }));  
                                
                            }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="centerId"
                            required                              
                            label={intl.formatMessage(messages.resignReasonName)}
                            />
                        )}
                    />  
                </Grid>
                
                <Grid item xs={12} md={2}>                    
                    <TextField
                    id="courseCost"
                    name="courseCost"
                    value={data.courseCost}
                    onChange={(e) => handleChange(e)}                        
                    label={intl.formatMessage(messages.settlementV)}
                    className={classes.field}
                    variant="outlined"
                    required
                    />
                </Grid>
                
                <Grid item xs={12} md={8}>                    
                    <TextField
                    id="note"
                    name="note"
                    value={data.notes}
                    onChange={(e) => handleChange(e)}                        
                    label={intl.formatMessage(messages.note)}
                    className={classes.field}
                    variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={4}></Grid>
                
                <Grid item xs={12} md={1}>                  
                    <Button variant="contained" type="submit" size="medium" color="primary" >
                       <FormattedMessage {...Payrollmessages.save} /> 
                    </Button>
                </Grid>
                <Grid item xs={12} md={1}>
                    <Button variant="contained" size="medium" color="primary" onClick={oncancel} >
                       <FormattedMessage {...Payrollmessages.cancel} /> 
                    </Button>
                </Grid>
                

            </Grid>            
        </form>
        </PapperBlock>
    
    </div>
  );
}
EmpCourseCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(EmpCourseCreate);

