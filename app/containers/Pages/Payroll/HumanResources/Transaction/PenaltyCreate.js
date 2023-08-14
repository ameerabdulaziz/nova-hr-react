import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import ApiData from '../api/PenaltyTransData';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import { useParams ,useHistory } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {Button ,Grid,TextField, Autocomplete ,Typography,Paper} from "@mui/material";
import useStyles from '../../Style';
import PropTypes from 'prop-types';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import GeneralListApis from '../../api/GeneralListApis';
import { format } from "date-fns";


function PenaltyCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  let { id } = useParams();
  const { classes } = useStyles();
  
  const [data, setdata] = useState({
    "id": 0,
    "date":format(new Date(), "yyyy-MM-dd"),
    "docName":"",
    "employeeId":"",
    "employeeName":"",
    "elementId":"",
    "elementName":"",
    "monthId":"", 
    "monthName":"",
    "note":"",
    "penaltyDetailId":"",
    "penaltyTypeId":"",
    "penaltyTypeName" :"",
    "penaltyId":"",
    "penaltyName" :"",
    "superEmployeeId":"",
    "superEmployeeName":"",
    "value" :"",
    "yearId" :"",
    "yearName":"",
    "job":"",
    "organization":"",
    "hiringDate":"",
    "superJob":"",
    "superOrganization":"",
    "superHiringDate":""
  });
  const [YearList, setYearList] = useState([]);
  const [MonthList, setMonthList] = useState([]);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [SuperEmployeeList, setSuperEmployeeList] = useState([]);
  const [PenaltyList, setPenaltyList] = useState([]);
  const [PenaltyTypeList, setPenaltyTypeList] = useState([]);
  
  const history=useHistory();  

  const handleChange = (event) => {
    debugger ;

      if(event.target.name =="note")
    setdata((prevFilters) => ({
        ...prevFilters,
        note: event.target.value,
      }));
          
      if(event.target.name =="value")
      setdata((prevFilters) => ({
          ...prevFilters,
          value: event.target.value,
        }));
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();   
    try{
      debugger;  
      let response = await  ApiData(locale).Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/PenaltyTransList`);
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  }
  async function oncancel(){
    history.push(`/app/Pages/HR/PenaltyTransList`);
  }
  async function fetchData() {
    debugger ;
    const years = await GeneralListApis(locale).GetYears(locale);
    setYearList(years);

    const months = await GeneralListApis(locale).GetMonths(locale);
    setMonthList(months);

    const penalties = await GeneralListApis(locale).GetPenaltyList(locale);
    setPenaltyList(penalties);

    const employees = await GeneralListApis(locale).GetEmployeeList(locale);
    setEmployeeList(employees);
    setSuperEmployeeList(employees);


    const dataApi = await ApiData(locale).Get(id??0);
    if(dataApi.id!=0)
        setdata(dataApi);
  }
  
  useEffect(() => {    
    fetchData();
  }, []);

  async function getPenaltyData(id) {
    debugger;
    if (!id){
        setdata((prevFilters) => ({
            ...prevFilters,
            elementId:0,
            elementName:""
          })); 
          setPenaltyTypeList([]);
        return
    }
    const result = await ApiData(locale).GetPenaltyTypesListByPenltyId(id);
    setdata((prevFilters) => ({
        ...prevFilters,
        elementId:result.elementId,
        elementName:result.elementName
      }));   
      setPenaltyTypeList(result.penaltyTypeList);
    }
async function GetPenaltyDetails(id) {
    debugger;
    if (!id){
        setdata((prevFilters) => ({
            ...prevFilters,            
            value:"",
            })); 
        return
    }
    const result = await ApiData(locale).GetPenaltyDetails(id);
    setdata((prevFilters) => ({
        ...prevFilters,
        value:result.penaltyValue
        }));   
    }
        
  async function getEmployeeData(id,isSuper) {
    debugger;
    if (!id){
        if(isSuper)
            setdata((prevFilters) => ({
                ...prevFilters,
                superJob:"",
                superOrganization:"",
                superHiringDate:""
            }));   
          else
            setdata((prevFilters) => ({
                ...prevFilters,
                job:"",
                organization:"",
                hiringDate:""
            }));            
        return
    }
    const empdata = await GeneralListApis(locale).GetEmployeeData(id);
    if(isSuper)
        setdata((prevFilters) => ({
            ...prevFilters,
            superJob:empdata.jobName,
            superOrganization:empdata.organizationName,
            superHiringDate:empdata.hiringDate===null ? "" :empdata.hiringDate
        })); 
    else
        setdata((prevFilters) => ({
            ...prevFilters,
            job:empdata.jobName,
            organization:empdata.organizationName,
            hiringDate:empdata.hiringDate===null ? "" :empdata.hiringDate
        }));   
    }
  
  
  return (
    <div>
        <PapperBlock whiteBg icon="border_color" title={data.id==0?intl.formatMessage(messages.createRewardTitle):intl.formatMessage(messages.updateRewardTitle)} desc={""}>
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
                <Grid item xs={12} md={2}>
                    <Autocomplete  
                        id="yearid"                        
                        options={YearList}  
                        value={{id:data.yearId,name:data.yearName}}    
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
                                yearId:value.id,
                                yearName:value.name
                                }));     
                            } else {
                            setdata((prevFilters) => ({
                                ...prevFilters,
                                yearId:0,
                                yearName:""
                            })); 
                            }                               
                        }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="yearId"
                            required                              
                            label={intl.formatMessage(messages.yearName)}
                            />
                        )}
                    />  
                </Grid>
                <Grid item xs={12} md={2}>
                    <Autocomplete  
                        id="monthId"                        
                        options={MonthList}  
                        value={{id:data.monthId,name:data.monthName}}  
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
                                monthId:value.id,
                                monthName:value.name
                                }));     
                            } else {
                            setdata((prevFilters) => ({
                                ...prevFilters,
                                monthId:0,
                                monthName:""
                            })); 
                            }                               
                        }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="monthId"
                            required                              
                            label={intl.formatMessage(messages.monthName)}
                            />
                        )}
                    />  
                </Grid>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete  
                        id="penaltyId"                        
                        options={PenaltyList}  
                        value={{id:data.penaltyId,name:data.penaltyName}}   
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
                                penaltyId:value.id,
                                penaltyName:value.name
                                }));  
                                getPenaltyData(value.id);   
                            } else {
                            setdata((prevFilters) => ({
                                ...prevFilters,
                                penaltyId:0,
                                penaltyName:""
                            })); 
                            getPenaltyData(0);
                            }                               
                        }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="rewardsid"
                            required                              
                            label={intl.formatMessage(messages.penaltyName)}
                            />
                        )}
                    />  
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="elementName"
                        name="elementName"
                        value={data.elementName}               
                        label={intl.formatMessage(messages.elementName)}
                        className={classes.field}
                        variant="outlined"
                        disabled

                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete  
                        id="penaltyTypeId"                        
                        options={PenaltyTypeList}  
                        value={{penaltyDetailId:data.penaltyDetailId,id:data.penaltyTypeId,name:data.penaltyTypeName}}   
                        isOptionEqualToValue={(option, value) =>
                            value.penaltyDetailId === 0 || value.penaltyDetailId === "" ||option.penaltyDetailId === value.penaltyDetailId
                          }                   
                        getOptionLabel={(option) =>
                        option.name ? option.name : ""
                        }
                        onChange={(event, value) => {
                            if (value !== null) {
                                setdata((prevFilters) => ({
                                ...prevFilters,
                                penaltyTypeId:value.id,
                                penaltyTypeName:value.name,
                                penaltyDetailId:value.penaltyDetailId
                                }));  
                                GetPenaltyDetails(value.penaltyDetailId);   
                            } else {
                            setdata((prevFilters) => ({
                                ...prevFilters,
                                penaltyTypeId:0,
                                penaltyTypeName:"",
                                penaltyDetailId:value.penaltyDetailId
                            })); 
                            GetPenaltyDetails(0);
                            }                               
                        }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="penaltyTypeId"
                            required                              
                            label={intl.formatMessage(messages.penaltyTypeName)}
                            />
                        )}
                    />  
                </Grid>
                <Grid item xs={12} md={6}>                    
                    <TextField
                    id="value"
                    name="value"
                    value={data.value}
                    onChange={(e) => handleChange(e)}                 
                    label={intl.formatMessage(messages.value)}
                    required
                    className={classes.field}
                    variant="outlined"
                    //disabled={data.value ? true : false}
                    />
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
                <Grid item xs={12} md={4}>
                    <Autocomplete  
                        id="superempId"                        
                        options={SuperEmployeeList}  
                        value={{id:data.superEmployeeId,name:data.superEmployeeName}}     
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
                                superEmployeeId:value.id,
                                superEmployeeName:value.name
                                })); 
                                getEmployeeData(value.id,true)  ;       
                            } else {
                                setdata((prevFilters) => ({
                                    ...prevFilters,
                                    superEmployeeId:0,
                                    superEmployeeName:""
                                }));
                                getEmployeeData(0,true)  ;    
                            }                               
                        }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="superempId"
                            required                              
                            label={intl.formatMessage(messages.superEmployeeName)}
                            />
                        )}
                    />  
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        id="superJob"
                        name="superJob"
                        value={data.superJob}               
                        label={intl.formatMessage(messages.job)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        id="superOrganization"
                        name="superOrganization"
                        value={data.superOrganization}               
                        label={intl.formatMessage(messages.organization)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        id="superHiringDate"
                        name="superHiringDate"
                        value={data.superHiringDate===null ? "" :data.superHiringDate}      
                        label={intl.formatMessage(messages.hiringDate)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                    />
                </Grid>
                
                <Grid item xs={12} md={4}>                    
                    <TextField
                    id="note"
                    name="note"
                    value={data.note}
                    onChange={(e) => handleChange(e)}                        
                    label={intl.formatMessage(messages.note)}
                    className={classes.field}
                    variant="outlined"
                    />
                </Grid>
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
PenaltyCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(PenaltyCreate);

