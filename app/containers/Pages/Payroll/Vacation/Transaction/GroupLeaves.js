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




const dateChangeFun = (date, type) => {

if(type === "startDate")
{
    if(data.Todate !== null)
    {
       let totalDaysVal = Math.floor( (new Date(data.Todate) - new Date(date)) / 1000 / 60 / 60 / 24) + 1

        if(totalDaysVal > 0)
        {
            setdata((prevFilters) => ({
                ...prevFilters,
                fromdate: format(new Date(date), "yyyy-MM-dd"),
                daysCount: totalDaysVal
            }));
        }
        else
        {
            toast.error(intl.formatMessage(messages.startEndDateError));
        }
    }
    else
    {
        setdata((prevFilters) => ({
            ...prevFilters,
            fromdate: format(new Date(date), "yyyy-MM-dd"),
        }));
    }
}
else if(type === "endDate")
{
    if(data.fromdate !== null)
            {
                let totalDaysVal = Math.floor( (new Date(date) - new Date(data.fromdate)) / 1000 / 60 / 60 / 24 ) + 1
                if(totalDaysVal > 0)
                {
                    setdata((prevFilters) => ({
                        ...prevFilters,
                        Todate:  format(new Date(date), "yyyy-MM-dd"),
                        daysCount: totalDaysVal
                    }));
                }
                else
                {
                    toast.error(intl.formatMessage(messages.startEndDateError));
                }
            }
            else
            {
                setdata((prevFilters) => ({
                    ...prevFilters,
                    Todate:  format(new Date(date), "yyyy-MM-dd"),
                }));
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
    
        setprocessing(false);
    }
    catch (err) {
      setprocessing(false);
      toast.error(err.response.data);
    }
  }

  
  const handleDelete = async (e) => {
    setdeleteprocessing(true);
    try{
       
      setdeleteprocessing(true); 
     
    let response = await  ApiData(locale).DeleteAll(data);

    if (response.status==200) 
    {
        toast.success(notif.saved);
        handleReset();
    }
    else 
    {
        toast.error(response.statusText);
    }
    
    setdeleteprocessing(false);

    }
    catch (err) {
      setprocessing(false);
      toast.error(err.response.data);
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
    
    
    const Leaves = await GeneralListApis(locale).GetVacList(false,true);
    setLeavesList(Leaves);
  }
  
  useEffect(() => {    
    fetchData();
  }, []);

async function getData() {
    
    // if(data.VacCode && data.fromdate&&data.Todate) {
    setpreviewprocessing(true);
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
                setpreviewprocessing(false);
            }
            else
            {
                handleReset();
                setpreviewprocessing(false);
            }
        }
        else
        {
            toast.error(intl.formatMessage(messages.noDataError))
            setpreviewprocessing(false);
        }
    // }
    // else
    // toast.error("Enter Leave Type, Start, End Date")
}


  
  return (
    <div>
        <PapperBlock whiteBg icon="border_color" title={Title} desc={""}>
        <form onSubmit={handleSubmit}>
            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                    
                    <Grid item xs={12} md={6}> 
                        <Card className={classes.card}>
                            <CardContent>
                                <Grid container spacing={3} alignItems="flex-start" direction="row">  
                              
                                    <Grid item xs={12}  md={6}>                
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DesktopDatePicker
                                                label={intl.formatMessage(Payrollmessages.date)}
                                                value={data?.TrxDate}
                                                onChange={(date) => { setdata((prevFilters) => ({...prevFilters,TrxDate: format(new Date(date), "yyyy-MM-dd"),}))}}
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
                                        />
                                    </Grid>                                    
                                </Grid> 
                            </CardContent> 
                        </Card>
                    </Grid>                
                    <Grid item xs={12} md={6}>  
                        <Grid item xs={12} md={12}>                                                            
                            <Card className={classes.card}>
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


                    <Grid item xs={12} md={12}
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row"
                        className={style.itemsStyle}
                        >
                
                    <Grid item xs={6} sm={4} md={2}>
                        <Button variant="contained" size="medium" style={{width:100}} color="primary" onClick={handleReset} >
                            <FormattedMessage {...Payrollmessages.add} /> 
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
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
                    <Grid item xs={6} sm={4} md={2}>                  
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
                    <Grid item xs={6} sm={4} md={2}>
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
        </form>
        </PapperBlock>
    
    </div>
  );
}
GroupLeaves.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(GroupLeaves);

