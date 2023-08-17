import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import ApiData from '../api/PromotionsData';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import { useParams ,useHistory } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {Button ,Grid,TextField, Autocomplete ,Typography,Paper,Card ,CardContent} from "@mui/material";
import useStyles from '../../Style';
import PropTypes from 'prop-types';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import GeneralListApis from '../../api/GeneralListApis';
import { format } from "date-fns";



function PromotionsCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  let { id } = useParams();
  const { classes } = useStyles();
  
  const [data, setdata] = useState({
    "id": 0,
    "date":format(new Date(), "yyyy-MM-dd"),
    "reason":"",
    "employeeId":"",
    "employeeName":"",
    "jobId":"",
    "job":"",
    "organization":"",
    "hiringDate":"",
    "oldJobId":"",
    "oldJob":"",
    "oldElemVal":"",
    "elemVal":""
  });
  const [EmployeeList, setEmployeeList] = useState([]);
  const [JobList, setJobList] = useState([]);
  const history=useHistory();  

  const handleSubmit = async (e) => {
    
    e.preventDefault();   
    try{
      debugger;  
      let response = await  ApiData(locale).Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/PromotionsList`);
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  }
  async function oncancel(){
    history.push(`/app/Pages/HR/PromotionsList`);
  }

  async function fetchData() {
    debugger ;
    
    const employees = await GeneralListApis(locale).GetEmployeeList(locale);
    setEmployeeList(employees);

    const jobs = await GeneralListApis(locale).GetJobsList(locale);
    setJobList(jobs);
    
    if(id)
    {
        const dataApi = await ApiData(locale).Get(id??0);    
        setdata(dataApi);
    }
  }
  
  useEffect(() => {    
    fetchData();
  }, []);

  async function getEmployeeData(id) {
    debugger;
    if (!id){       
            setdata((prevFilters) => ({
                ...prevFilters,
                oldJobId:"",
                oldJob:"",
                organization:"",
                hiringDate:"",
                oldElemVal:"",
            }));            
        return
    }
    const empdata = await GeneralListApis(locale).GetEmployeeData(id);
    
        setdata((prevFilters) => ({
            ...prevFilters,
            oldJobId:empdata.jobId,
            oldJob:empdata.jobName,
            organization:empdata.organizationName,
            hiringDate:empdata.hiringDate===null ? "" :empdata.hiringDate,
            oldElemVal:empdata.salary===null ? "" :empdata.salary
        }));   
  }
  
  return (
    <div>
        <PapperBlock whiteBg icon="border_color" title={data.id==0?intl.formatMessage(messages.PromotionsCreateTitle):intl.formatMessage(messages.PromotionsUpdateTitle)} desc={""}>
        <form onSubmit={handleSubmit}>
            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                <Grid item xs={12}  md={4}>                
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            label={intl.formatMessage(messages.date)}
                            value={data.date}
                            onChange={(date) => {debugger; setdata((prevFilters) => ({...prevFilters,date: format(new Date(date), "yyyy-MM-dd"),}))}}
                            className={classes.field}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </LocalizationProvider>
                </Grid>
               
                <Grid item xs={12} md={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Grid
                            container
                            spacing={3}
                            alignItems="flex-start"
                            direction="row">
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
                                <Grid item xs={12} md={2}>
                                    <TextField
                                        id="oldJob"
                                        name="oldJob"
                                        value={data.oldJob}               
                                        label={intl.formatMessage(messages.oldJob)}
                                        className={classes.field}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <TextField
                                        id="organization"
                                        name="organization"
                                        value={data.organization}               
                                        label={intl.formatMessage(messages.organization)}
                                        className={classes.field}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <TextField
                                        id="hiringDate"
                                        name="hiringDate"
                                        value={data.hiringDate===null ? "" :data.hiringDate}               
                                        label={intl.formatMessage(messages.hiringDate)}
                                        className={classes.field}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} md={2}>                    
                                    <TextField
                                    id="oldElemVal"
                                    name="oldElemVal"
                                    disabled
                                    value={data.oldElemVal}
                                    onChange={(e) => setdata((prevFilters) => ({
                                        ...prevFilters,
                                        oldElemVal: e.target.value,
                                    }))}                        
                                    label={intl.formatMessage(messages.oldElemVal)}
                                    className={classes.field}
                                    variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
               
                <Grid item xs={12} md={4}>
                    <Autocomplete  
                        id="job"                        
                        options={JobList}  
                        key={{id:data.jobId,name:data.job}}
                        value={{id:data.jobId,name:data.job}}     
                        isOptionEqualToValue={(option, value) =>
                            value.id === 0 || value.id === "" ||option.id === value.id
                        }                 
                        getOptionLabel={(option) =>
                        option.name ? option.name : ""
                        }
                        onChange={(event, value) => {
                            debugger;
                            if (value !== null) {
                                setdata((prevFilters) => ({
                                ...prevFilters,
                                jobId:value.id,
                                job:value.name
                                }));
                                
                            } else {
                                setdata((prevFilters) => ({
                                    ...prevFilters,
                                    jobId:0,
                                    job:""
                                })); 
                            }
                        }}
                        renderOption={(props, option) => {
                            return (
                              <li {...props} key={option.id}>
                                {option.name}
                              </li>
                            );
                          }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="job"
                            required                              
                            label={intl.formatMessage(messages.job)}
                            />
                        )}
                    />  
                </Grid>
                <Grid item xs={12} md={2}>                    
                    <TextField
                    id="elemVal"
                    name="elemVal"                    
                    required
                    value={data.elemVal}
                    onChange={(e) => setdata((prevFilters) => ({
                        ...prevFilters,
                        elemVal: e.target.value,
                      }))}                        
                    label={intl.formatMessage(messages.value)}
                    className={classes.field}
                    variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={8}>                    
                    <TextField
                    id="reason"
                    name="reason"
                    multiline
                    required
                    rows={2}
                    value={data.reason}
                    onChange={(e) => setdata((prevFilters) => ({
                        ...prevFilters,
                        reason: e.target.value,
                      }))}                        
                    label={intl.formatMessage(messages.reason)}
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
PromotionsCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(PromotionsCreate);

