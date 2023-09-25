import React, { useState, useEffect, useCallback } from 'react';
import { PapperBlock } from 'enl-components';
import ApiData from '../api/PermissionTrxData';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {Button ,Grid,TextField, Autocomplete ,Card ,CardContent} from "@mui/material";
import useStyles from '../../Style';
import PropTypes from 'prop-types';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import GeneralListApis from '../../api/GeneralListApis';
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import NameList from '../../Component/NameList';


function PermissionTrxCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation()
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");
  
  const [data, setdata] = useState({
    "date":format(new Date(), "yyyy-MM-dd"),
    "permissionId":"",
    "permissionName":"",
    "startTime":"", 
    "endTime":"",    
    "minutesCount":"",
    "exemptEntryRec" :false,
    "exemptLeaveRec":false,
    "calcLate" :false,
    "calcMinus":false,
    "plateMin":"",
    "pminusMin" :"",
    "dedRased" :false,
    "prasedMin":"",    
    "notes":"",
    "maxRepeated":"",
    "maxMinuteNo" :"",
    "employeesId":[],    
    "isNotUpdate":false
  });
  
  const [dataList, setdataList] = useState([]);
  const [PermissionsList, setPermissionsList] = useState([]);
  const [processing, setprocessing] = useState(false);
  const [previewprocessing, setpreviewprocessing] = useState(false);
  const [deleteprocessing, setdeleteprocessing] = useState(false);

  const handleChange = (event) => {
    

      if(event.target.name =="notes")
       setdata((prevFilters) => ({
        ...prevFilters,
        notes: event.target.value,
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

        if(event.target.name =="startTime")
        {
            
           
            if(data.endTime!="")
            {
                
                var diff = Math.round((new Date(0,0,0,data.endTime.split(':')[0],data.endTime.split(':')[1]) - new Date(0,0,0,event.target.value.split(':')[0],event.target.value.split(':')[1])) / 60000);
                if(diff<=maxMinuteNo)
                    setdata((prevFilters) => ({
                        ...prevFilters,
                        startTime: event.target.value,
                        minutesCount: diff
                    }));
                else
                {
                    toast.error("max minutes count is"+data.maxMinuteNo);
                }
            }
            else
                setdata((prevFilters) => ({
                    ...prevFilters,
                    startTime: event.target.value,
                }));
        }
        
        if(event.target.name =="endTime")
        {
            
           
            if(data.startTime!="")
            {
                
                var diff = Math.round((new Date(0,0,0,event.target.value.split(':')[0],event.target.value.split(':')[1]) - new Date(0,0,0,data.startTime.split(':')[0],data.startTime.split(':')[1])) / 60000);
                
                if(diff<=data.maxMinuteNo)
                    setdata((prevFilters) => ({
                        ...prevFilters,
                        endTime: event.target.value,
                        minutesCount: diff
                    }));
                else
                {
                    toast.error("max minutes count is"+data.maxMinuteNo);
                 }
            }
            else
                setdata((prevFilters) => ({
                    ...prevFilters,
                    endTime: event.target.value,
                }));
        }
        
        
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();   
    try{
       
      setprocessing(true); 
      var SelectedIds = dataList.filter((row) => row.isSelected==true).map((obj) => {return  obj.id;});
      data.employeesId=SelectedIds ;
    let response = await  ApiData(locale).SaveAll(data);

    if (response.status==200) {
        toast.success(notif.saved);
        handleReset();}
    else 
        toast.error(response.statusText);
    
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

    if (response.status==200) {
        toast.success(notif.saved);
        handleReset();}
    else 
        toast.error(response.statusText);
    
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
        "date":format(new Date(), "yyyy-MM-dd"),
        "permissionId":"",
        "permissionName":"",
        "startTime":"", 
        "endTime":"",    
        "minutesCount":"",
        "exemptEntryRec" :false,
        "exemptLeaveRec":false,
        "calcLate" :false,
        "calcMinus":false,
        "plateMin":"",
        "pminusMin" :"",
        "dedRased" :false,
        "prasedMin":"",    
        "notes":"",
        "maxRepeated":"",
        "maxMinuteNo" :"",
        "isNotUpdate":false
      });
  }
  async function fetchData() {
    
    
    const Permissions = await GeneralListApis(locale).GetPermissionList(locale);
    setPermissionsList(Permissions);
  }
  
  useEffect(() => {    
    fetchData();
  }, []);

async function getData() {
    
    if(data.permissionId && data.startTime&&data.endTime) {
    setpreviewprocessing(true);
    const result = await ApiData(locale).getPermissions(data);
   
    setdataList(result.employees.map((obj) => {
        return {
            ...obj,
            isSelected: true,
        }}) || []);
        
        if(result.permission)
            setdata(result.permission);
        else
            handleReset();
    setpreviewprocessing(false);
    }
    else
    toast.error("Enter Permission, Start, End Time")
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
                                    <Grid item xs={12}  md={12}>
                                        <FormControlLabel
                                            control={(
                                            <Checkbox
                                                checked={data.isNotUpdate}
                                                onChange={(e) =>{ setdata((prevFilters) => ({
                                                    ...prevFilters,
                                                    isNotUpdate: e.target.checked,
                                                    }))}  } 
                                                value={data.isNotUpdate}
                                                color='primary'
                                                /* labelStyle={{color:"red !important"}} */
                                            />
                                            )}
                                            label={intl.formatMessage(messages.isNotUpdate)}
                                        />                        
                                    </Grid>                                
                                    <Grid item xs={12}  md={6}>                
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DesktopDatePicker
                                                label={intl.formatMessage(Payrollmessages.date)}
                                                value={data.date}
                                                onChange={(date) => { setdata((prevFilters) => ({...prevFilters,date: format(new Date(date), "yyyy-MM-dd"),}))}}
                                                className={classes.field}
                                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Autocomplete  
                                            id="permissionid"                        
                                            options={PermissionsList}  
                                            value={{id:data.permissionId,name:data.permissionName}}   
                                            isOptionEqualToValue={(option, value) =>
                                                value.id === 0 || value.id === "" ||option.id === value.id
                                            }                   
                                            getOptionLabel={(option) =>
                                            option.name ? option.name : ""
                                            }
                                            onChange={(event, value) => {
                                                
                                                    setdata((prevFilters) => ({
                                                    ...prevFilters,
                                                    permissionId:value !== null?value.id:0,
                                                    permissionName:value !== null?value.name:"",
                                                    maxRepeated:value !== null?value.maxRepeated:"",
                                                    maxMinuteNo:value !== null?value.maxMinuteNo:""
                                                    }));   
                                                }}
                                            renderInput={(params) => (
                                            <TextField
                                                variant="outlined"                            
                                                {...params}
                                                name="permissionid"
                                                required                              
                                                label={intl.formatMessage(messages.permissionName)}
                                                />
                                            )}
                                        />  
                                    </Grid> 
                                    <Grid item xs={12} md={8}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <Grid
                                                container
                                                spacing={7}
                                                alignItems="flex-start"
                                                direction="row">
                                                <Grid item xs={12}  md={8}>
                                                        <FormControlLabel
                                                            control={(
                                                            <Checkbox
                                                                checked={data.calcLate}
                                                                onChange={(e) => setdata((prevFilters) => ({
                                                                    ...prevFilters,
                                                                    calcLate: e.target.checked,
                                                                    calcMinus: !e.target.checked,
                                                                    dedRased: !e.target.checked,
                                                                    pminusMin:"",
                                                                    prasedMin:"",
                                                                    }))}   
                                                                value={data.calcLate}
                                                                color="primary"
                                                            />
                                                            )}
                                                            label={intl.formatMessage(messages.calcLate)}
                                                        />
                                                        
                                                    </Grid> 
                                                    <Grid   item xs={12}  md={4}>
                                                        <TextField
                                                        id="plateMin"
                                                        name="plateMin"
                                                        value={data.plateMin}
                                                        onChange={(e) => handleChange(e)}                        
                                                        label={""}
                                                        className={classes.field}
                                                        variant="outlined"
                                                        disabled={!data.calcLate}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}  md={8}>
                                                        <FormControlLabel
                                                            control={(
                                                            <Checkbox
                                                                checked={data.calcMinus}
                                                                onChange={(e) => setdata((prevFilters) => ({
                                                                    ...prevFilters,
                                                                    calcMinus: e.target.checked,
                                                                    calcLate: !e.target.checked,
                                                                    dedRased: !e.target.checked,
                                                                    plateMin:"",
                                                                    prasedMin:"",
                                                                    }))}   
                                                                value={data.calcMinus}
                                                                color="primary"
                                                            />
                                                            )}
                                                            label={intl.formatMessage(messages.calcMinus)}
                                                        />
                                                        
                                                    </Grid>
                                                    <Grid item xs={12}  md={4}>
                                                        <TextField
                                                            id="pminusMin"
                                                            name="pminusMin"
                                                            value={data.pminusMin}
                                                            onChange={(e) => handleChange(e)}                        
                                                            label={""}
                                                            className={classes.field}
                                                            variant="outlined"
                                                            disabled={!data.calcMinus}
                                                            />
                                                    </Grid> 
                                                    <Grid item xs={12}  md={8}>
                                                        <FormControlLabel
                                                            control={(
                                                            <Checkbox
                                                                checked={data.dedRased}
                                                                onChange={(e) => setdata((prevFilters) => ({
                                                                    ...prevFilters,
                                                                    dedRased: e.target.checked,
                                                                    calcMinus: !e.target.checked,
                                                                    calcLate: !e.target.checked,
                                                                    plateMin:"",
                                                                    pminusMin:"",
                                                                    }))}   
                                                                value={data.dedRased}
                                                                color="primary"
                                                            />
                                                            )}
                                                            label={intl.formatMessage(messages.dedRased)}
                                                        />
                                                        
                                                    </Grid> 
                                                    <Grid item xs={12}  md={4}>
                                                        <TextField
                                                            id="prasedMin"
                                                            name="prasedMin"
                                                            value={data.prasedMin}
                                                            onChange={(e) => handleChange(e)}                        
                                                            label={""}
                                                            className={classes.field}
                                                            variant="outlined"
                                                            disabled={!data.dedRased}
                                                            />
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Grid
                                        container
                                        spacing={3}
                                        alignItems="flex-start"
                                        direction="row">
                                            <Grid item xs={12} md={12}>
                                    <TextField
                                    id="startTime"
                                    name="startTime"                                
                                    value={data.startTime}
                                    label={intl.formatMessage(messages.startTime)}
                                    type="time"
                                    onChange={(e) => handleChange(e)}
                                    className={classes.field}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    id="endTime"
                                                    name="endTime"                                
                                                    value={data.endTime}
                                                    label={intl.formatMessage(messages.endTime)}
                                                    type="time"
                                                    onChange={(e) => handleChange(e)}
                                                    className={classes.field}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>                
                                            <Grid item xs={12} md={12}>                    
                                                <TextField
                                                id="minutesCount"
                                                name="minutesCount"
                                                value={data.minutesCount}
                                                onChange={(e) => handleChange(e)}                 
                                                label={intl.formatMessage(messages.minutesCount)}
                                                required
                                                className={classes.field}
                                                variant="outlined"
                                                disabled
                                                />
                                            </Grid>
                                            <Grid item xs={12}  md={12}>
                                            <FormControlLabel
                                                control={(
                                                <Checkbox
                                                    checked={data.exemptEntryRec}
                                                    onChange={(e) => setdata((prevFilters) => ({
                                                        ...prevFilters,
                                                        exemptEntryRec: e.target.checked,
                                                        }))}   
                                                    value={data.exemptEntryRec}
                                                    color="primary"
                                                />
                                                )}
                                                label={intl.formatMessage(messages.exemptEntryRec)}
                                            />
                                            </Grid> 
                                            <Grid item xs={12}  md={12}>
                                                <FormControlLabel
                                                    control={(
                                                    <Checkbox
                                                        checked={data.exemptLeaveRec}
                                                        onChange={(e) => setdata((prevFilters) => ({
                                                            ...prevFilters,
                                                            exemptLeaveRec: e.target.checked,
                                                            }))}   
                                                        value={data.exemptLeaveRec}
                                                        color="primary"
                                                    />
                                                    )}
                                                    label={intl.formatMessage(messages.exemptLeaveRec)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12}>                    
                                        <TextField
                                        id="notes"
                                        name="notes"
                                        value={data.notes}
                                        onChange={(e) => handleChange(e)}                        
                                        label={intl.formatMessage(Payrollmessages.notes)}
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
                
                    <Grid item xs={12} md={2}>
                        <Button variant="contained" size="medium" style={{width:100}} color="primary" onClick={handleReset} >
                            <FormattedMessage {...Payrollmessages.add} /> 
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={2}>
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
                    <Grid item xs={12} md={2}>                  
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
                    <Grid item xs={12} md={2}>
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
        </form>
        </PapperBlock>
    
    </div>
  );
}
PermissionTrxCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(PermissionTrxCreate);

