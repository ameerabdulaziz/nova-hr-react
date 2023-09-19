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
import CircularProgress from '@mui/material/CircularProgress';
import EmployeeData from '../../Component/EmployeeData';

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
  const [RewardsList, setRewardsList] = useState([]);
  const history=useHistory();  
  const [processing, setprocessing] = useState(false);

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
      setprocessing(true);  
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
    setprocessing(false);  
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

    
    if(id)
    {
        const dataApi = await ApiData(locale).Get(id);
        setdata(dataApi);
    }
        
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
                    <EmployeeData data={data} setdata={setdata}></EmployeeData>
                </Grid>
                <Grid item xs={12} md={12}>
                    <EmployeeData data={data} setdata={setdata} isSuper={true}></EmployeeData>
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
                    <Button variant="contained" type="submit" size="medium" color="secondary" disabled={ processing} >
                        {processing && (
                        <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                        />
                        )} 
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

