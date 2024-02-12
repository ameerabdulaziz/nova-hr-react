import React, { useEffect, useState } from 'react';
import { PapperBlock } from 'enl-components';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MailSMSSettingData from './api/MailSMSSettingData';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import messages from './messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import useStyles from '../Style';
import PayRollLoader from '../Component/PayRollLoader';
import Payrollmessages from '../messages';
import SaveButton from '../Component/SaveButton';

function SMSSetting(props) {
const { classes } = useStyles();
const {intl} = props;
const Title = localStorage.getItem("MenuName");
const [processing, setprocessing] = useState(false);

const email = (value) =>
value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined;

  const [data, setdata] = useState(
    {
    "id": 0,
  "type": 2,
  "userName": "",
  "password": "",
  "serverName": "",
  stopSending: false,
  "url": ""});
  
  
  const handleChange = (event) => {
   
      if(event.target.name =="userName")
    setdata((prevFilters) => ({
        ...prevFilters,
        userName: event.target.value,
      }));
      if(event.target.name =="password")
    setdata((prevFilters) => ({
        ...prevFilters,
        password: event.target.value,
      }));

      if(event.target.name =="serverName")
      setdata((prevFilters) => ({
          ...prevFilters,
          serverName: event.target.value,
        }));
      if(event.target.name=="url")
      setdata((prevFilters) => ({
        ...prevFilters,
        url: event.target.value,
      }));

    
      
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    try{
    setprocessing(true); 
    const response = await MailSMSSettingData().SaveSetting(data);
 
      setdata((prevFilters) => ({
        ...prevFilters,
        id: response.data,
      })) ;

        toast.success(notif.saved);
    
    }
    catch(e){
    //
  } finally {
  setprocessing(false); 
  }
  };
  const clear = (e) => {
    setdata({
      "id": 0,
    "type": 2,      
    "userName": "",
    "password": "",
    "serverName": "",
    stopSending: false,
    "url": ""});
  };
  async function fetchData() {
    try {
      setprocessing(true);
    const result = await MailSMSSettingData().GetSetting(2);
    if(result== "")
      setdata({
        "id": 0,
      "type": 2,      
      "userName": "",
      "password": "",
      stopSending: false,
      "serverName": "",
      "url": ""});
    else
        setdata(result);
    } catch (error) {
      //
    } finally {
      setprocessing(false);
    }

  }
  useEffect(() => {    
    fetchData();
  }, []);

  const onCheckboxChange = (evt) => {
    setdata((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
    }));
  };

  return (
    <PayRollLoader isLoading={processing}>
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        direction="row"
        justifyContent="center"
      >
        <Grid item xs={12}>
        <PapperBlock whiteBg icon="border_color" title={Title} desc="">
          
            <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
            >
              <Grid item xs={12} md={3}>
                <TextField
                  name="url"
                  id="url"
                  className={classes.field}
                  value={data.url}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(messages.portallink)}
                  required
                  variant="outlined"
                  autoComplete='off'
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  id="serverName"
                  name="serverName"
                  value={data.serverName}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(messages.sendername)}
                  required
                  className={classes.field} 
                  variant="outlined"
                  autoComplete='off'
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  name="userName"
                  id="userName"
                  label={intl.formatMessage(messages.username)}
                  required
                  variant="outlined"
                  value={data.userName}
                  onChange={(e) => handleChange(e)}
                  // autoComplete="new-password"
                  fullWidth
                  autoComplete='off'
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(messages.password)}
                  required
                  className={classes.field}
                  variant="outlined"
                  type="password"
                  // autoComplete="new-password"
                  autoComplete='off'
                />
              </Grid>

                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={data.stopSending}
                        onChange={onCheckboxChange}
                        name='stopSending'
                      />
                    }
                    label={intl.formatMessage(messages.stopSending)}
                  />
                </Grid>

             </Grid>
              <div style={{paddingTop:"20px"}} >
                <Grid container spacing={3}>            
                    <Grid item  >
                      <SaveButton Id={data.id} processing={processing} />
                    </Grid>
                    <Grid item  >
                      <Button variant="contained"  size="medium" color="primary"  onClick={clear}>
                        <FormattedMessage {...Payrollmessages.reset} />
                      </Button>
                    </Grid>
                </Grid>
              </div>
            </form>
          </PapperBlock>
        </Grid>
      </Grid>
    </PayRollLoader>
  );
}


export default injectIntl(SMSSetting);

