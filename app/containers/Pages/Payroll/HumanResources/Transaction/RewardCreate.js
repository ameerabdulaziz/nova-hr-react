import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import ApiData from '../api/RewardTransData';
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




function CreateReward(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation()
  const { id } = location.state??0;
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
    "payTemplateId":"",
    "payTemplateName" :"",
    "rewardsId":"",
    "rewardsName" :"",
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
  const [RewardsList, setRewardsList] = useState([]);
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
        history.push(`/app/Pages/HR/RewardTransList`);
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  }
async function oncancel(){
    history.push(`/app/Pages/HR/RewardTransList`);
  }
  async function fetchData() {
    debugger ;
    const years = await GeneralListApis(locale).GetYears(locale);
    setYearList(years);

    const months = await GeneralListApis(locale).GetMonths(locale);
    setMonthList(months);

    const rewards = await GeneralListApis(locale).GetRewards(locale);
    setRewardsList(rewards);

    const employees = await GeneralListApis(locale).GetEmployeeList(locale);
    setEmployeeList(employees);
    setSuperEmployeeList(employees);
/* 
    const payTemplates = await GeneralListApis(locale).GetPayTemplateList(locale);
    setPayTemplateList(payTemplates); */

    const dataApi = await ApiData(locale).Get(id??0);
    if(dataApi.id!=0)
        setdata(dataApi);
  }
  
  useEffect(() => {    
    fetchData();
  }, []);

  async function getRewardData(id) {
    debugger;
    if (!id){
        setdata((prevFilters) => ({
            ...prevFilters,
            elementId:0,
            elementName:"",
            payTemplateId:0,
            payTemplateName:"",
            value:""
          })); 
        return
    }
    const rewarddata = await ApiData(locale).GetRewardData(id);
    setdata((prevFilters) => ({
        ...prevFilters,
        elementId:rewarddata.elementId,
        elementName:rewarddata.elementName,
        payTemplateId:rewarddata.payTemplateId,
        payTemplateName:rewarddata.payTemplateName,
        value:rewarddata.value
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
  
    /* const useStyles = makeStyles()((theme) => ({
        divider: {
          display: 'block',
          margin: `${theme.spacing(3)} 0`,
        },
        bg: {
          padding: theme.spacing(2),
          marginBottom: theme.spacing(4),
          backgroundImage: `linear-gradient(-45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 33%, ${theme.palette.secondary.dark} 100%);`,
          textAlign: 'center',
          borderRadius: theme.rounded.small,
          '& h3': {
            color: theme.palette.common.white
          }
        },
        lineBackground: {
          width: '100%',
          maxWidth: 500,
        }
      })); */
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
                                        id="rewardsid"                        
                                        options={RewardsList}  
                                        value={{id:data.rewardsId,name:data.rewardsName}}   
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
                                                rewardsId:value.id,
                                                rewardsName:value.name
                                                }));  
                                                getRewardData(value.id);   
                                            } else {
                                            setdata((prevFilters) => ({
                                                ...prevFilters,
                                                rewardsId:0,
                                                rewardsName:""
                                            })); 
                                            getRewardData(0);
                                            }                               
                                        }}
                                        renderInput={(params) => (
                                        <TextField
                                            variant="outlined"                            
                                            {...params}
                                            name="rewardsid"
                                            required                              
                                            label={intl.formatMessage(messages.rewardsName)}
                                            />
                                        )}
                                    />  
                                </Grid>
                                <Grid item xs={12} md={2}>
                                <TextField
                                        id="payTemplateName"
                                        name="payTemplateName"
                                        value={data.payTemplateName}               
                                        label={intl.formatMessage(messages.payTemplateName)}
                                        className={classes.field}
                                        variant="outlined"
                                        disabled

                                    /> 
                                </Grid>
                                <Grid item xs={12} md={2}>
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
                                <Grid item xs={12} md={2}>                    
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
                            </Grid>
                        </CardContent>
                    </Card>
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
                        </Grid>
                    </CardContent>                
                </Card>
                </Grid>
                
                
                <Grid item xs={12} md={8}>                    
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
CreateReward.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(CreateReward);

