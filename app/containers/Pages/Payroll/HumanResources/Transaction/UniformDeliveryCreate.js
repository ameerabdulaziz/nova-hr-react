import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import ApiData from '../api/UniformTrxData';
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



function UniformDeliveryCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation()
  const { id } = location.state??0;
  const { classes } = useStyles();
  
  const [data, setdata] = useState({
    "id": 0,
    "date":format(new Date(), "yyyy-MM-dd"),       
    "trxType":1,
    "uniformId":"",
    "uniformName":"",
    "employeeId":"",  
    "employeeName":"",    
    "notes":"",
    "quantity": "",
    "uniformPrice":"",
    "job":"",
    "organization":"",
    "hiringDate":"",
  });
  
  const [UniformList, setUniformList] = useState([]);
  const history=useHistory();  
  const [processing, setprocessing] = useState(false);

  const handleChange = (event) => {
    debugger ;

      if(event.target.name =="notes")
            setdata((prevFilters) => ({
        ...prevFilters,
        notes: event.target.value,
      }));
          

        if(event.target.name =="quantity")
            setdata((prevFilters) => ({
          ...prevFilters,
          quantity: event.target.value,
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
        history.push(`/app/Pages/HR/UniformDeliveryList`);
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  }
async function oncancel(){
    history.push(`/app/Pages/HR/UniformDeliveryList`);
  }
  async function fetchData() {
    debugger ;
  
    const custodies = await GeneralListApis(locale).GetUniformList(locale);
    setUniformList(custodies);

    if(id)
    {
        const dataApi = await ApiData(locale).Get(id,1);
    
        setdata(dataApi);
    }
  }
  
  useEffect(() => {    
    fetchData();
  }, []);

  
  return (
    <div>
        <PapperBlock whiteBg icon="border_color" title={data.id==0?intl.formatMessage(messages.UniformDeliveryCreateTitle):intl.formatMessage(messages.UniformDeliveryEditTitle)} desc={""}>
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
                    <EmployeeData data={data} setdata={setdata}></EmployeeData>
                </Grid>
                <Grid item xs={12}  md={6}></Grid>
                <Grid item xs={12} md={4}>
                    <Autocomplete  
                        id="uniformId"                        
                        options={UniformList}  
                        value={{id:data.uniformId,name:data.uniformName}}   
                        isOptionEqualToValue={(option, value) =>
                            value.id === 0 || value.id === "" ||option.id === value.id
                        }                   
                        getOptionLabel={(option) =>
                        option.name ? option.name : ""
                        }
                        onChange={(event, value) => {
                            
                            setdata((prevFilters) => ({
                            ...prevFilters,
                            uniformId:value !== null?value.id:0,
                            uniformName:value !== null?value.name:"",
                            uniformPrice:value !== null?value.uniformPrice:""
                            }));  
                                  
                            }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="uniformId"
                            required                              
                            label={intl.formatMessage(messages.uniformName)}
                            />
                        )}
                    />  
                </Grid>
                
                <Grid item xs={12} md={2}>
                    <TextField
                        id="uniformPrice"
                        name="uniformPrice"
                        value={data.uniformPrice}               
                        label={intl.formatMessage(Payrollmessages.price)}
                        className={classes.field}
                        variant="outlined"
                        disabled     
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        id="quantity"
                        name="quantity"
                        value={data.quantity}               
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
UniformDeliveryCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(UniformDeliveryCreate);

