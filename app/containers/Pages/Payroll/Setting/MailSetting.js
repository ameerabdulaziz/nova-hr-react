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
import SaveButton from '../Component/SaveButton';


function MailSetting(props) {
  
const {classes} = useStyles();  
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
  "type": 1,
  "bscMail":'',
  "mailPort": '',
  "userName": "",
  "password": "",
  "serverName": "",
  "url": ""});

  const handleChange = (event) => {
    if(event.target.name =="bscMail")
    setdata((prevFilters) => ({
        ...prevFilters,
        bscMail: event.target.value,
      }));
      
    
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

      if(event.target.name=="mailPort")
      setdata((prevFilters) => ({
        ...prevFilters,
        mailPort: event.target.value,
      }));
      
      
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    try{
    setprocessing(true); 
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
  setprocessing(false); 
  };
  const clear = (e) => {
    setdata({
      "id": 0,
    "type": 1,
    "bscMail":'',
    "mailPort": '',
    "userName": "",
    "password": "",
    "serverName": "",
    "url": ""});
  };
  async function fetchData() {
    
    const result = await MailSMSSettingData().GetSetting(1);
    if(result== "")
      setdata({
        "id": 0,
      "type": 1,
      "bscMail":'',
      "mailPort": '',
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
        <Grid item xs={12}>
          <PapperBlock whiteBg icon="border_color" title={Title} desc="">
          
            <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>           
            <Grid item xs={12} md={4}>
                <TextField                    
                  type="email"                  
                  error={email === 'Invalid email'}
                  autoComplete="email"
                  name="bscMail"
                  id="bscMail"
                  label={intl.formatMessage(messages.email)}
                  required
                  className={classes.field}
                  variant="outlined"
                  value={data.bscMail}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  name="userName"
                  id="userName"
                  label={intl.formatMessage(messages.username)}
                  required
                  className={classes.field}
                  variant="outlined"
                  value={data.userName}
                  onChange={(e) => handleChange(e)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={4}>
                <TextField
                  id="serverName"
                  name="serverName"
                  value={data.serverName}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(messages.servername)}
                  required
                  className={classes.field}  
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={4}>
                <TextField
                  name="mailPort"
                  id="mailPort"
                  className={classes.field}
                  value={data.mailPort}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(messages.portno)}
                  required
                  variant="outlined"
                />
              </Grid>
              </Grid>
              <div style={{paddingTop:"20px"}}>
                <Grid container spacing={3}>            
                    <Grid item >
                      <SaveButton Id={data.id} processing={processing} />
                    </Grid>
                    <Grid item >
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


export default injectIntl(MailSetting);

