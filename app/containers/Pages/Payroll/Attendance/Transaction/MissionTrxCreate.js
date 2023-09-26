import React, { useState, useEffect } from 'react';
import { PapperBlock } from 'enl-components';
import ApiData from '../api/MissionTrxData';
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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import EmployeeData from '../../Component/EmployeeData';
import SaveButton from '../../Component/SaveButton';


function MissionTrxCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
 
  const location = useLocation()
  const { id } = location.state??0;
  const { classes } = useStyles();
  
  const [data, setdata] = useState({
    "id": 0,
    "fromDate":format(new Date(), "yyyy-MM-dd"),
    "toDate":format(new Date(), "yyyy-MM-dd"),
    "employeeId":"",
    "employeeName":"",
    "missionId":"",
    "missionName":"",
    "startTime":"", 
    "endTime":"",    
    "minutesCount":"",
    "exemptEntryRec" :false,
    "exemptLeaveRec":false,
    "missionDestination" :"",
    "isOverTime":false,
    "isMustAttend" :false,
    "transportationExpenses":"",
    "notes":"",
    "job":"",
    "organization":"",
    "hiringDate":"",
  });
  
  const [MissionsList, setMissionsList] = useState([]);
  const history=useHistory();  
  const [processing, setprocessing] = useState(false);

  const handleChange = (event) => {
    

      if(event.target.name =="notes")
       setdata((prevFilters) => ({
        ...prevFilters,
        notes: event.target.value,
      }));

        if(event.target.name =="transportationExpenses")
        setdata((prevFilters) => ({
            ...prevFilters,
            transportationExpenses: event.target.value,
            }));

        if(event.target.name =="missionDestination")
        setdata((prevFilters) => ({
            ...prevFilters,
            missionDestination: event.target.value,
        }));

        if(event.target.name =="startTime")
        {
            
           
            if(data.endTime!="")
            {
                
                var diff = Math.round((new Date(0,0,0,data.endTime.split(':')[0],data.endTime.split(':')[1]) - new Date(0,0,0,event.target.value.split(':')[0],event.target.value.split(':')[1])) / 60000);
                
                    setdata((prevFilters) => ({
                        ...prevFilters,
                        startTime: event.target.value,
                        minutesCount: diff
                    }));
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
                
                    setdata((prevFilters) => ({
                        ...prevFilters,
                        endTime: event.target.value,
                        minutesCount: diff
                    }));
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
      
        let response = await  ApiData(locale).Save(data);

        if (response.status==200) {
            toast.success(notif.saved);
            history.push(`/app/Pages/Att/MissionTrx`);
        } else {
            toast.error(response.statusText);
        }
        setprocessing(false); 
    }
    catch (err) {
      setprocessing(false);
      toast.error(err.response.data);
    }
  }
async function oncancel(){
    history.push(`/app/Pages/Att/MissionTrx`);
  }
  async function fetchData() {
    
    
    const Missions = await GeneralListApis(locale).GetMissionList(locale);
    setMissionsList(Missions);

    if(id)
    {
        const dataApi = await ApiData(locale).Get(id);        
        setdata(dataApi);
    }
  }
  
  useEffect(() => {    
    fetchData();
  }, []);



  return (
    <div>
        <PapperBlock whiteBg icon="border_color" title={data.id==0?intl.formatMessage(messages.MissionTrxCreateTitle):intl.formatMessage(messages.MissioTrxUpdateTitle)} desc={""}>
        <form onSubmit={handleSubmit}>
            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                <Grid item xs={12}  md={2}>                
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            label={intl.formatMessage(Payrollmessages.fromdate)}
                            value={data.fromDate}
                            onChange={(date) => { setdata((prevFilters) => ({...prevFilters,fromDate: format(new Date(date), "yyyy-MM-dd"),}))}}
                            className={classes.field}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}  md={2}>                
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            label={intl.formatMessage(Payrollmessages.todate)}
                            value={data.toDate}
                            onChange={(date) => { setdata((prevFilters) => ({...prevFilters,toDate: format(new Date(date), "yyyy-MM-dd"),}))}}
                            className={classes.field}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={2}>
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
                <Grid item xs={12} md={2}>
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
                <Grid item xs={12} md={2}>                    
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
                   
                <Grid item xs={12} md={12}>
                    <EmployeeData data={data} setdata={setdata}></EmployeeData>
                </Grid>
               
                <Grid item xs={12} md={4}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Grid
                            container
                            spacing={3}
                            alignItems="flex-start"
                            direction="row">
                                <Grid item xs={12}  md={8}>
                                    <FormControlLabel
                                        control={(
                                        <Checkbox
                                            checked={data.isOverTime}
                                            onChange={(e) => setdata((prevFilters) => ({
                                                ...prevFilters,
                                                isOverTime: e.target.checked,
                                                }))}   
                                            value={data.calcLate}
                                            color="primary"
                                        />
                                        )}
                                        label={intl.formatMessage(messages.isOverTime)}
                                    />
                                    
                                </Grid> 
                                
                                <Grid item xs={12}  md={8}>
                                    <FormControlLabel
                                        control={(
                                        <Checkbox
                                            checked={data.isMustAttend}
                                            onChange={(e) => setdata((prevFilters) => ({
                                                ...prevFilters,
                                                isMustAttend: e.target.checked,
                                                }))}   
                                            value={data.isMustAttend}
                                            color="primary"
                                        />
                                        )}
                                        label={intl.formatMessage(messages.isMustAttend)}
                                    />
                                    
                                </Grid>
                                <Grid item xs={12}  md={8}>
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
                                <Grid item xs={12}  md={8}>
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
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>                    
                    <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row">
                        
                        <Grid item xs={12} md={4}>
                            <Autocomplete  
                                id="missionid"                        
                                options={MissionsList}  
                                value={{id:data.missionId,name:data.missionName}}   
                                isOptionEqualToValue={(option, value) =>
                                    value.id === 0 || value.id === "" ||option.id === value.id
                                }                   
                                getOptionLabel={(option) =>
                                option.name ? option.name : ""
                                }
                                onChange={(event, value) => {
                                    
                                        setdata((prevFilters) => ({
                                        ...prevFilters,
                                        missionId:value !== null?value.id:0,
                                        missionName:value !== null?value.name:"",
                                        transportationExpenses:value !== null?value.transportaion:"",
                                        }));   
                                    }}
                                renderInput={(params) => (
                                <TextField
                                    variant="outlined"                            
                                    {...params}
                                    name="missionid"
                                    required                              
                                    label={intl.formatMessage(messages.missionName)}
                                    />
                                )}
                            />  
                        </Grid>
                        <Grid item xs={12} md={3}>                    
                            <TextField
                            id="transportationExpenses"
                            name="transportationExpenses"
                            value={data.transportationExpenses}
                            onChange={(e) => handleChange(e)}                        
                            label={intl.formatMessage(messages.transportationExpenses)}
                            className={classes.field}
                            variant="outlined"
                            />
                        </Grid>  
                        <Grid item xs={12} md={12}>                    
                            <TextField
                            id="missionDestination"
                            name="missionDestination"
                            value={data.missionDestination}
                            onChange={(e) => handleChange(e)}                        
                            label={intl.formatMessage(messages.missionDestination)}
                            className={classes.field}
                            variant="outlined"
                            multiline
                            rows={2}
                            />
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
                            multiline
                            rows={2}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={12} md={1}>                  
                    <SaveButton Id={id} processing={processing} />
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
MissionTrxCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(MissionTrxCreate);

