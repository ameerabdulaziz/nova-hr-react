import React, { useEffect, useState } from 'react';

import { PapperBlock } from 'enl-components';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import PayRollLoaderInForms from '../Component/PayRollLoaderInForms';


function MailSetting(props) {
  
const {classes} = useStyles();  
const {intl} = props;
const Title = localStorage.getItem("MenuName");
const [processing, setprocessing] = useState(false);   
const email = (value) =>
value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined;

    const [mailTest, setMailTest] = useState("")

  const [data, setdata] = useState(
    {
    "id": 0,
  "type": 1,
  "bscMail":'',
  "mailPort": '',
  "userName": "",
  "password": "",
  "serverName": "",
  stopSending: false,
  enableSsl: false,
  jobAdvMails: '',
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

      if(event.target.name=="jobAdvMails")
      setdata((prevFilters) => ({
        ...prevFilters,
        jobAdvMails: event.target.value,
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
    "type": 1,
    "bscMail":'',
    "mailPort": '',
    "userName": "",
    "password": "",
    "serverName": "",
    stopSending: false,
    "url": ""});
  };
  async function fetchData() {
    setprocessing(true);
    
    try {
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
      stopSending: false,
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

  const mailTestChangeFun = (e) =>{
    setMailTest(e.target.value)
  }

  const mailTestFun = async (e) =>{
    e.preventDefault();  

    try
    {
      setprocessing(true); 
      const response = await MailSMSSettingData().testMail(mailTest);

      toast(response);
      
    }
    catch(err)
    {

    }
    finally {
      setprocessing(false);
    }
  }


  return (
    <PayRollLoaderInForms isLoading={processing}>
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
            <Grid item xs={12} md={4} lg={3} xl={3}>
                <TextField                    
                  type="email"                  
                  error={email === 'Invalid email'}
                  // autoComplete="email"
                  name="bscMail"
                  id="bscMail"
                  label={intl.formatMessage(messages.email)}
                  required
                  className={classes.field}
                  variant="outlined"
                  value={data.bscMail}
                  onChange={(e) => handleChange(e)}
                  autoComplete='off'
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3} xl={2}>
                <TextField
                  name="userName"
                  id="userName"
                  label={intl.formatMessage(messages.username)}
                  required
                  className={classes.field}
                  variant="outlined"
                  value={data.userName}
                  onChange={(e) => handleChange(e)}
                  // autoComplete="new-password"
                  autoComplete='off'
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3} xl={2}>
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
              <Grid item xs={12} md={4} lg={3} xl={2}>
                <TextField
                  id="serverName"
                  name="serverName"
                  value={data.serverName}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(messages.servername)}
                  required
                  className={classes.field}  
                  variant="outlined"
                  autoComplete='off'
                />
              </Grid>
              
              <Grid item xs={12} md={4} lg={3} xl={2}>
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
              <Grid item xs={6} md={4} lg={2} xl={1}>
                <TextField
                  name="mailPort"
                  id="mailPort"
                  className={classes.field}
                  value={data.mailPort}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(messages.portno)}
                  required
                  variant="outlined"
                  autoComplete='off'
                />
              </Grid>

                <Grid item xs={12} md={5} lg={4} xl={3}>
                  <TextField
                    name="jobAdvMails"
                    label={intl.formatMessage(messages.emailsCommaSeparated)}
                    className={classes.field}
                    variant="outlined"
                    value={data.jobAdvMails}
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                  />
                </Grid>

                <Grid item>
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

                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={data.enableSsl}
                        onChange={onCheckboxChange}
                        name='enableSsl'
                      />
                    }
                    label={intl.formatMessage(messages.enableSsl)}
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


      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        direction="row"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <PapperBlock whiteBg icon="border_color" title={intl.formatMessage(messages.mailTest)} desc="">
            <form onSubmit={mailTestFun}>
              <Grid
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
              >
                <Grid item xs={12} md={4}>
                  <TextField                    
                    type="email"                  
                    error={email === 'Invalid email'}
                    name="bscMail"
                    id="bscMail"
                    label={intl.formatMessage(messages.email)}
                    required
                    className={classes.field}
                    variant="outlined"
                    value={mailTest}
                    onChange={(e) => mailTestChangeFun(e)}
                    autoComplete='off'
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button type='submit' variant="contained"  size="medium" color="primary" >
                    <FormattedMessage {...messages.Test} />
                  </Button>
                </Grid>
              </Grid>
            </form>
          </PapperBlock>
        </Grid>
      </Grid>



    </PayRollLoaderInForms>
  );
}


export default injectIntl(MailSetting);

