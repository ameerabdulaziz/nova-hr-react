import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import ApiData from '../api/LayOffNoticeData';
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

import { useLocation } from "react-router-dom";



function LayOffNoticeCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation()
  const { id } = location.state??0;
  const { classes } = useStyles();
  
  const [data, setdata] = useState({
    "id": 0,
    "noticeDate":format(new Date(), "yyyy-MM-dd"),
    "reason":"",
    "employeeId":"",
    "employeeName":"",
    "job":"",
    "organization":"",
    "hiringDate":"",
  });
  const [EmployeeList, setEmployeeList] = useState([]);
  const history=useHistory();  

  const handleSubmit = async (e) => {
    
    e.preventDefault();   
    try{
      debugger;  
      let response = await  ApiData(locale).Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/LayOffNoticeList`);
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  }
  async function oncancel(){
    history.push(`/app/Pages/HR/LayOffNoticeList`);
  }

  async function fetchData() {
    debugger ;
    
    const employees = await GeneralListApis(locale).GetEmployeeList(locale);
    setEmployeeList(employees);
    
    const dataApi = await ApiData(locale).Get(id??0);
    if(dataApi.id!=0)
        setdata(dataApi);
  }
  
  useEffect(() => {    
    fetchData();
  }, []);

  async function getEmployeeData(id,isSuper) {
    debugger;
    if (!id){       
            setdata((prevFilters) => ({
                ...prevFilters,
                job:"",
                organization:"",
                hiringDate:""
            }));            
        return
    }
    const empdata = await GeneralListApis(locale).GetEmployeeData(id);
    
        setdata((prevFilters) => ({
            ...prevFilters,
            job:empdata.jobName,
            organization:empdata.organizationName,
            hiringDate:empdata.hiringDate===null ? "" :empdata.hiringDate
        }));   
  }
  
  return (
    <div>
        <PapperBlock whiteBg icon="border_color" title={data.id==0?intl.formatMessage(messages.LayOffNoticeCreateTitle):intl.formatMessage(messages.LayOffNoticeUpdateTitle)} desc={""}>
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
                            value={data.noticeDate}
                            onChange={(date) => {debugger; setdata((prevFilters) => ({...prevFilters,noticeDate: format(new Date(date), "yyyy-MM-dd"),}))}}
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
                                        id="job"
                                        name="job"
                                        value={data.job}               
                                        label={intl.formatMessage(messages.job)}
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
                            </Grid>
                        </CardContent>
                    </Card>
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
LayOffNoticeCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(LayOffNoticeCreate);

