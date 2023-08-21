import React, { useEffect, useState } from 'react';
import { PapperBlock } from 'enl-components';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MailSMSSettingData from './api/MailSMSSettingData';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import messages from './messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import useStyles from '../Style';
import Payrollmessages from '../messages';

function SMSSetting(props) {
const { classes } = useStyles();
const {intl} = props;
const Title = localStorage.getItem("MenuName");
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
      debugger;
    const response = await MailSMSSettingData().SaveSetting(data);
 
    if (response.status==200) {
      setdata((prevFilters) => ({
        ...prevFilters,
        id: response.data,
      })) ;

        toast.success(notif.saved);
      } else {
          toast.error(response.statusText);
      }
    }
    catch(e){
    toast.error(notif.error);
  }
  };
  const clear = (e) => {
    setdata({
      "id": 0,
    "type": 2,      
    "userName": "",
    "password": "",
    "serverName": "",
    "url": ""});
  };
  async function fetchData() {
    debugger ;
    const result = await MailSMSSettingData().GetSetting(2);
    if(result== "")
      setdata({
        "id": 0,
      "type": 2,      
      "userName": "",
      "password": "",
      "serverName": "",
      "url": ""});
    else
        setdata(result);

  }
  useEffect(() => {    
    fetchData();
  }, []);
  return (
    <div>
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        direction="row"
        justifyContent="center"
      >
        <Grid item xs={12} md={6}>
        <PapperBlock whiteBg icon="border_color" title={Title} desc="">
          
            <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
              justifyContent="center"
            >
              <Grid item xs={12} md={12}>
                <TextField
                  name="url"
                  id="url"
                  className={classes.field}
                  value={data.url}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(messages.portallink)}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="serverName"
                  name="serverName"
                  value={data.serverName}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(messages.sendername)}
                  required
                  className={classes.field} 
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="userName"
                  id="userName"
                  label={intl.formatMessage(messages.username)}
                  required
                  variant="outlined"
                  value={data.userName}
                  onChange={(e) => handleChange(e)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} md={12}>
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
                  autoComplete="new-password"
                />
              </Grid>
             </Grid>
              <div style={{paddingTop:"20px"}} >
                <Grid container spacing={3}>            
                    <Grid item xs={6} sm={3} >
                      <Button
                        variant="contained"
                        color="primary" 
                        type="submit"
                        size="medium"
                      >
                        <FormattedMessage {...Payrollmessages.save} />
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={3} >
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
    </div>
  );
}


export default injectIntl(SMSSetting);

