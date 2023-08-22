import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import ApiData from '../api/CustodyTrxData';
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



function CustodyDeliveryCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  let { id } = useParams();
  const { classes } = useStyles();
  
  const [data, setdata] = useState({
    "id": 0,
    "date":format(new Date(), "yyyy-MM-dd"),       
    "trxType":1,
    "custodyId":"",
    "custodyName":"",
    "employeeId":"",  
    "employeeName":"",    
    "notes":"",
    "itemSerial":"",
    "custCount": "",
    "custodyPrice":"",
    "job":"",
    "organization":"",
    "hiringDate":"",
  });
  
  const [EmployeeList, setEmployeeList] = useState([]);
  const [CustodyList, setCustodyList] = useState([]);
  const history=useHistory();  

  const handleChange = (event) => {
    debugger ;

      if(event.target.name =="notes")
            setdata((prevFilters) => ({
        ...prevFilters,
        notes: event.target.value,
      }));
          
      if(event.target.name =="itemSerial")
            setdata((prevFilters) => ({
          ...prevFilters,
          itemSerial: event.target.value,
        }));

        if(event.target.name =="custCount")
            setdata((prevFilters) => ({
          ...prevFilters,
          custCount: event.target.value,
        }));
        
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();   
    try{
      debugger;  
      let response = await  ApiData(locale).Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/CustodyDeliveryList`);
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  }
async function oncancel(){
    history.push(`/app/Pages/HR/CustodyDeliveryList`);
  }
  async function fetchData() {
    debugger ;
  
    const custodies = await GeneralListApis(locale).GetCustodyList(locale);
    setCustodyList(custodies);

    const employees = await GeneralListApis(locale).GetEmployeeList(locale);
    setEmployeeList(employees);

    if(id)
    {
        const dataApi = await ApiData(locale).Get(id??0,1);
    
        setdata(dataApi);
    }
  }
  
  useEffect(() => {    
    fetchData();
  }, []);

  async function getEmployeeData(id) {
    debugger;
    if (!id)
    {
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
        <PapperBlock whiteBg icon="border_color" title={data.id==0?intl.formatMessage(messages.CustodyDeliveryCreateTitle):intl.formatMessage(messages.CustodyDeliveryEditTitle)} desc={""}>
        <form onSubmit={handleSubmit}>
            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                <Grid item xs={12}  md={2}>                
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
                <Grid item xs={12}  md={10}></Grid>
                
                <Grid item xs={12} md={6}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Grid
                            container
                            spacing={3}
                            alignItems="flex-start"
                            direction="row">
                                <Grid item xs={12} md={12}>
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
                                <Grid item xs={12} md={4}>
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
                                <Grid item xs={12} md={4}>
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
                                <Grid item xs={12} md={4}>
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
                <Grid item xs={12}  md={6}></Grid>
                <Grid item xs={12} md={4}>
                    <Autocomplete  
                        id="custodyId"                        
                        options={CustodyList}  
                        value={{id:data.custodyId,name:data.custodyName}}   
                        isOptionEqualToValue={(option, value) =>
                            value.id === 0 || value.id === "" ||option.id === value.id
                        }                   
                        getOptionLabel={(option) =>
                        option.name ? option.name : ""
                        }
                        onChange={(event, value) => {
                            
                            setdata((prevFilters) => ({
                            ...prevFilters,
                            custodyId:value !== null?value.id:0,
                            custodyName:value !== null?value.name:"",
                            custodyPrice:value !== null?value.custodyPrice:""
                            }));  
                                  
                            }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="custodyId"
                            required                              
                            label={intl.formatMessage(messages.custodyName)}
                            />
                        )}
                    />  
                </Grid>
                
                <Grid item xs={12} md={2}>
                    <TextField
                        id="custodyPrice"
                        name="custodyPrice"
                        value={data.custodyPrice}               
                        label={intl.formatMessage(Payrollmessages.price)}
                        className={classes.field}
                        variant="outlined"
                        disabled     
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        id="custCount"
                        name="custCount"
                        value={data.custCount}               
                        label={intl.formatMessage(Payrollmessages.count)}
                        className={classes.field}
                        variant="outlined"
                        onChange={(e) => handleChange(e)}       
                    />
                </Grid>
                
                <Grid item xs={12} md={8}>                    
                    <TextField
                    id="notes"
                    name="notes"
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
CustodyDeliveryCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(CustodyDeliveryCreate);

