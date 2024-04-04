import React, { useState, useEffect, useCallback } from 'react';
import { PapperBlock } from 'enl-components';
import ApiData from '../api/GroupLeavesData';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import { injectIntl, FormattedMessage } from 'react-intl';
import {Button ,Grid,TextField, Autocomplete ,Card ,CardContent} from "@mui/material";
import useStyles from '../../Style';
import PropTypes from 'prop-types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import GeneralListApis from '../../api/GeneralListApis';
import { format } from "date-fns";
import CircularProgress from '@mui/material/CircularProgress';
import NameList from '../../Component/NameList';
import PayRollLoader from '../../Component/PayRollLoader';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';



function GroupLeaves(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");
  
  const [data, setdata] = useState({
    "TrxDate":new Date(),
    "VacCode":null,
    "fromdate":null, 
    "Todate":null,    
    "daysCount":"",   
    "vacReson":"",
    "employeesId":[],
  });
  
  const [dataList, setdataList] = useState([]);
  const [leavesList, setLeavesList] = useState([]);
  const [processing, setprocessing] = useState(false);
  const [previewprocessing, setpreviewprocessing] = useState(false);
  const [deleteprocessing, setdeleteprocessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [DateError, setDateError] = useState({});
  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }

  useEffect(()=>{
    dateChangeFun(dateFormatFun(new Date()), "startDate")
    // dateChangeFun(new Date(), "endDate")
  },[])

  useEffect(()=>{
    // dateChangeFun(new Date(), "startDate")
    dateChangeFun(dateFormatFun(new Date()), "endDate")
  },[data.fromdate])



const dateChangeFun = (date, type) => {

    if(type === "startDate")
    {
        if(data.Todate !== null)
        {
        let totalDaysVal = Math.floor( (new Date(data.Todate).setHours(0, 0, 0) - new Date(date)) / 1000 / 60 / 60 / 24) + 1

            if(totalDaysVal > 0)
            {
                setdata((prevState) => ({
                    ...prevState,
                    fromdate: dateFormatFun(date) ,
                    daysCount: totalDaysVal
                }))
            }
            else
            {
                setdata((prevState) => ({
                    ...prevState,
                    daysCount: ""
                }))
                toast.error(intl.formatMessage(messages.startEndDateError));
            }
        }
        else
        {
            setdata((prevState) => ({
                ...prevState,
                fromdate: dateFormatFun(date) ,
            }))
        }
    }
    else if(type === "endDate")
    {
        if(data.fromdate !== null)
            {
                let totalDaysVal = Math.floor( (new Date(date) - new Date(data.fromdate).setHours(0, 0, 0)) / 1000 / 60 / 60 / 24 ) + 1
                if(totalDaysVal > 0)
                {
                    setdata((prevState) => ({
                        ...prevState,
                        Todate: dateFormatFun(date),
                        daysCount: totalDaysVal
                        }))
                    }
                    else
                    {
                        setdata((prevState) => ({
                            ...prevState,
                            daysCount: ""
                        }))
                        toast.error(intl.formatMessage(messages.startEndDateError));
                    }
                }
                else
                {
                    setdata((prevState) => ({
                        ...prevState,
                        Todate: dateFormatFun(date) ,
                    }))
                }
    }
}


  const handleChange = (event) => {

      if(event.target.name =="ReasonForLeave")
       setdata((prevFilters) => ({
        ...prevFilters,
        vacReson: event.target.value,
      }));
          
      if(event.target.name =="plateMin")
       setdata((prevFilters) => ({
          ...prevFilters,
          plateMin: event.target.value,
        }));

        if(event.target.name =="pminusMin")
        setdata((prevFilters) => ({
            ...prevFilters,
            pminusMin: event.target.value,
            }));

        if(event.target.name =="prasedMin")
        setdata((prevFilters) => ({
            ...prevFilters,
            prasedMin: event.target.value,
        }));
    
    };


  const handleSubmit = async (e) => {
    
    e.preventDefault();   

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
        return;
      }

      if(data.daysCount === "")
      {
        toast.error(intl.formatMessage(messages.startEndDateError));
        return;
      }

    try{
       
      setprocessing(true); 
      setIsLoading(true);
      var SelectedIds = dataList.filter((row) => row.isSelected==true).map((obj) => {return  obj.id;});
      data.employeesId=SelectedIds ;

      if(SelectedIds.length > 0)
      {
        data.TrxDate = dateFormatFun(data.TrxDate)

            let response = await  ApiData(locale).SaveAll(data);

            if (response.status==200) {
                toast.success(notif.saved);
                handleReset();
            }
            else 
            {
                toast.error(response.statusText);
            }
    }
    else
    {
        toast.error(intl.formatMessage(messages.employeesErrorMes));
    }
    
    }
    catch (err) {
    } finally {
        setprocessing(false);
        setIsLoading(false);
    }
  }

  
  const handleDelete = async (e) => {
    setdeleteprocessing(true);
    setIsLoading(true);

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
        return;
      }

    try{
       
        data.TrxDate = dateFormatFun(data.TrxDate)
     
    let response = await  ApiData(locale).DeleteAll(data);

    if (response.status==200) 
    {
        toast.success(notif.saved);
        handleReset();
    }
    
    }
    catch (err) {
        //
    } finally {
        setdeleteprocessing(false);
        setprocessing(false);
        setIsLoading(false);
        }
  }

  const handleReset = async (e) => {
    setdataList([]);
    setdata({
        "id": 0,
        "TrxDate":null,
        "VacCode":null,
        "fromdate":null, 
        "Todate":null,    
        "daysCount":"",   
        "vacReson":"",
        "employeesId":[],
      });
  }
  async function fetchData() {
    
    try {
        setIsLoading(true);
        const Leaves = await GeneralListApis(locale).GetVacList(false,true);
        setLeavesList(Leaves);
    } catch (error) {
        // 
    } finally {
        setIsLoading(false);
    }
  }
  
  useEffect(() => {    
    fetchData();
  }, []);

async function getData() {

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
        return;
      }
    
    // if(data.VacCode && data.fromdate&&data.Todate) {
    setpreviewprocessing(true);
    setIsLoading(true);
    try {

        data.TrxDate = dateFormatFun(data.TrxDate)

        const result = await ApiData(locale).getVacations(data);
    
            if(result.employees.length !== 0 &&  result.vacation !== null)
            {
        
            setdataList(result.employees.map((obj) => {
                return {
                    ...obj,
                    isSelected: true,
                }}) || []);
    
                
                if(result.vacation)
                {
                    setdata(result.vacation);
                }
                else
                {
                    handleReset();
                }
                setpreviewprocessing(false);
            }
            else
            {
                setpreviewprocessing(false);
            }
        
    } catch (error) {
        // 
    } finally {
        setIsLoading(false);
        setpreviewprocessing(false);
    }
    // }
    // else
    // toast.error("Enter Leave Type, Start, End Date")
}


  return (
    <PayRollLoader isLoading={isLoading}>
        <PapperBlock whiteBg icon="border_color" title={Title} desc={""}>
        <form onSubmit={handleSubmit}>
            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                    
                    <Grid item xs={12} md={9}> 
                        <Card className={classes.card} sx={{m:'0!important'}} >
                            <CardContent>
                                <Grid container spacing={3} alignItems="flex-start" direction="row">  
                              
 
                                        <Grid item xs={12}  md={6}>  
                                    
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker 
                                                label={intl.formatMessage(Payrollmessages.date)}
                                                value={data?.TrxDate ? dayjs(data?.TrxDate) : null}
                                                className={classes.field}
                                                    onChange={(date) => {
                                                        setdata((prevFilters) => ({
                                                            ...prevFilters,
                                                            TrxDate: date ,
                                                        }))
                                                }}
                                                onError={(error,value)=>{
                                                    if(error !== null)
                                                    {
                                                    setDateError((prevState) => ({
                                                        ...prevState,
                                                            [`TrxDate`]: true
                                                        }))
                                                    }
                                                    else
                                                    {
                                                    setDateError((prevState) => ({
                                                        ...prevState,
                                                            [`TrxDate`]: false
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


                                    <Grid item xs={12} md={6}>
                                        <Autocomplete  
                                            id="vacationType"                        
                                            options={leavesList}  
                                            value={ data.VacCode && leavesList.length !== 0  ? leavesList.find((item)=> item.id === data.VacCode)  : null}       
                                            isOptionEqualToValue={(option, value) => option.id === value.id}                
                                            getOptionLabel={(option) =>
                                            option.name ? option.name : ""
                                            }
                                            renderOption={(props, option) => {
                                                return (
                                                <li {...props} key={option.id}>
                                                    {option.name}
                                                </li>
                                                );
                                            }}
                                            onChange={(event, value) => {
                                                
                                                    setdata((prevFilters) => ({
                                                    ...prevFilters,
                                                    VacCode:value !== null?value.id:null,
                                                    }));   
                                                }}
                                            renderInput={(params) => (
                                            <TextField
                                                variant="outlined"                            
                                                {...params}
                                                name="vacationType"
                                                required                              
                                                label={intl.formatMessage(messages.VacationType)}
                                                />
                                            )}
                                        />  
                                    </Grid> 
                                   
                                    <Grid item xs={12} md={12}>
                                        <Grid
                                        container
                                        spacing={3}
                                        alignItems="flex-start"
                                        direction="row">

                                        <Grid item xs={12} md={4}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker 
                                                label={intl.formatMessage(messages.startDate)}
                                                value={data.fromdate ? dayjs(data.fromdate) : null}
                                                className={classes.field}
                                                onChange={(date) => {
                                                    dateChangeFun(date, "startDate")
                                                }}
                                                onError={(error,value)=>{
                                                    if(error !== null)
                                                    {
                                                    setDateError((prevState) => ({
                                                        ...prevState,
                                                            [`fromdate`]: true
                                                        }))
                                                    }
                                                    else
                                                    {
                                                    setDateError((prevState) => ({
                                                        ...prevState,
                                                            [`fromdate`]: false
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

                                            <Grid item xs={12} md={4}>
                                            
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker 
                                                    label={intl.formatMessage(messages.endDate)}
                                                    value={data.Todate ? dayjs(data.Todate) : null}
                                                    className={classes.field}
                                                    onChange={(date) => {
                                                        dateChangeFun(date, "endDate")
                                                    }}
                                                    onError={(error,value)=>{
                                                        if(error !== null)
                                                        {
                                                        setDateError((prevState) => ({
                                                            ...prevState,
                                                                [`Todate`]: true
                                                            }))
                                                        }
                                                        else
                                                        {
                                                        setDateError((prevState) => ({
                                                            ...prevState,
                                                                [`Todate`]: false
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

                                            <Grid item xs={12} md={4}>                    
                                                <TextField
                                                id="daysCount"
                                                name="daysCount"
                                                value={data?.daysCount}
                                                onChange={(e) => handleChange(e)}                 
                                                label={intl.formatMessage(messages.totalDays)}
                                                required
                                                className={classes.field}
                                                variant="outlined"
                                                disabled
                                                autoComplete='off'
                                                />
                                            </Grid>
                                        
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12}>                    
                                        <TextField
                                        id="ReasonForLeave"
                                        name="ReasonForLeave"
                                        value={data?.vacReson}   
                                        onChange={(e) => handleChange(e)}                   
                                        label={intl.formatMessage(messages.ReasonForVacation)}
                                        className={classes.field}
                                        variant="outlined"
                                        autoComplete='off'
                                        />
                                    </Grid>                                    
                                </Grid> 
                            </CardContent> 
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                    <Grid container spacing={2} direction='column' >
                
                    <Grid item >
                        <Button variant="contained" size="medium" style={{width:100}} color="primary" onClick={handleReset} >
                            <FormattedMessage {...Payrollmessages.add} /> 
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button variant="contained" size="medium" style={{width:100}} color="primary" onClick={getData} disabled={previewprocessing} >
                        {previewprocessing && (
                            <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                            />
                            )} 
                        <FormattedMessage {...Payrollmessages.preview} /> 
                        </Button>
                    </Grid>
                    <Grid item >                  
                        <Button variant="contained" type="submit" size="medium" style={{width:100}} color="secondary" disabled={ processing} >
                            {processing && (
                            <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                            />
                            )} 
                        <FormattedMessage {...Payrollmessages.save} /> 
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button variant="contained" size="medium" style={{width:100}} color="primary" onClick={handleDelete} disabled={deleteprocessing}  >
                        {deleteprocessing && (
                            <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                            />
                            )} 
                        <FormattedMessage {...Payrollmessages.delete} /> 
                        </Button>
                    </Grid>

                </Grid>                
                    </Grid>
                    <Grid item xs={12} >  
                            <Card className={classes.card} sx={{m:'0!important'}} >
                                <CardContent>                                
                                    <NameList
                                        dataList={dataList}            
                                        setdataList={setdataList}
                                        Key={"Employee"}
                                    />
                                </CardContent>
                            </Card>
                    </Grid>   


            </Grid>            
        </form>
        </PapperBlock>
    
    </PayRollLoader>
  );
}
GroupLeaves.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(GroupLeaves);

