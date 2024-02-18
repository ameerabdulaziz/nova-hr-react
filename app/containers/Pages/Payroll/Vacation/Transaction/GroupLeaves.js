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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import GeneralListApis from '../../api/GeneralListApis';
import { format } from "date-fns";
import CircularProgress from '@mui/material/CircularProgress';
import NameList from '../../Component/NameList';
import style from '../../../../../styles/styles.scss'
import PayRollLoader from '../../Component/PayRollLoader';


function GroupLeaves(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");
  
  const [data, setdata] = useState({
    "TrxDate":null,
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



const dateChangeFun = (date, type) => {

if(type === "startDate")
{
    if(data.Todate !== null)
    {
       let totalDaysVal = Math.floor( (new Date(data.Todate) - new Date(date)) / 1000 / 60 / 60 / 24) + 1

        if(totalDaysVal > 0)
        {
            if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                if (!isNaN(new Date(date))) { 
                  setdata((prevFilters) => ({
                      ...prevFilters,
                      fromdate: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                      daysCount: totalDaysVal
                    }))
                }
                else
                {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    fromdate: null,
                    daysCount: totalDaysVal
                  }))
                } 
              }
        }
        else
        {
            toast.error(intl.formatMessage(messages.startEndDateError));
        }
    }
    else
    {
        if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
            if (!isNaN(new Date(date))) { 
              setdata((prevFilters) => ({
                  ...prevFilters,
                  fromdate: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                }))
            }
            else
            {
              setdata((prevFilters) => ({
                ...prevFilters,
                fromdate: null,
              }))
            } 
          }
    }
}
else if(type === "endDate")
{
    if(data.fromdate !== null)
            {
                let totalDaysVal = Math.floor( (new Date(date) - new Date(data.fromdate)) / 1000 / 60 / 60 / 24 ) + 2
                if(totalDaysVal > 0)
                {
                    if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                        if (!isNaN(new Date(date))) { 
                          setdata((prevFilters) => ({
                              ...prevFilters,
                              Todate: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                              daysCount: totalDaysVal
                            }))
                        }
                        else
                        {
                          setdata((prevFilters) => ({
                            ...prevFilters,
                            Todate: null,
                            daysCount: totalDaysVal
                          }))
                        } 
                      }
                }
                else
                {
                    toast.error(intl.formatMessage(messages.startEndDateError));
                }
            }
            else
            {
                if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                    if (!isNaN(new Date(date))) { 
                      setdata((prevFilters) => ({
                          ...prevFilters,
                          Todate: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                        }))
                    }
                    else
                    {
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        Todate: null,
                      }))
                    } 
                  }
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
    try{
       
      setprocessing(true); 
      setIsLoading(true);
      var SelectedIds = dataList.filter((row) => row.isSelected==true).map((obj) => {return  obj.id;});
      data.employeesId=SelectedIds ;

      if(SelectedIds.length > 0)
      {
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
        //   toast.error(err.response.data);
    } finally {
        setprocessing(false);
        setIsLoading(false);
    }
  }

  
  const handleDelete = async (e) => {
    setdeleteprocessing(true);
    setIsLoading(true);
    try{
       
     
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
    
    // if(data.VacCode && data.fromdate&&data.Todate) {
    setpreviewprocessing(true);
    setIsLoading(true);
    try {
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
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DesktopDatePicker
                                                label={intl.formatMessage(Payrollmessages.date)}
                                                value={data?.TrxDate}
                                                onChange={(date) => { 
                                                    if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                                                        if (!isNaN(new Date(date))) { 
                                                          setdata((prevFilters) => ({
                                                              ...prevFilters,
                                                              TrxDate: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                                                            }))
                                                        }
                                                        else
                                                        {
                                                          setdata((prevFilters) => ({
                                                            ...prevFilters,
                                                            TrxDate: null,
                                                          }))
                                                        } 
                                                      }
                                                }}
                                                className={classes.field}
                                                renderInput={(params) => <TextField {...params} variant="outlined" required />}
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
                                  
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <DesktopDatePicker
                                                        label={intl.formatMessage(messages.startDate)}
                                                        value={data?.fromdate}
                                                  
                                                        onChange={(date) => { dateChangeFun(date, "startDate")}}
                                                        className={classes.field}
                                                        renderInput={(params) => <TextField {...params} variant="outlined" name="startDate" required  />}
                                                        
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <DesktopDatePicker
                                                     
                                                    // label="end date"
                                                        label={intl.formatMessage(messages.endDate)}
                                                        value={data?.Todate}
                                                        onChange={(date) => { dateChangeFun(date, "endDate")}}
                                                        className={classes.field}
                                                        renderInput={(params) => <TextField {...params} variant="outlined" name="endDate"  required  />}
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

