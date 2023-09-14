import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LeaveOpenBalanceData from '../api/LeaveOpenBalanceData';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/Styles.scss'
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../messages';
import Payrollmessages from '../../messages';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import GeneralListApis from '../../api/GeneralListApis'; 
import { PapperBlock } from 'enl-components';
import useStyles from '../../Style';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {Card ,CardContent} from "@mui/material";




function LeaveOpenBalance(props) {
  const [id, setid] = useState(0);
  const [Employee, setEmployee] = useState('');
  const [LeaveType, setLeaveType] = useState('');
  const [UpdateCurrentBalance, setUpdateCurrentBalance] = useState(false);
  const [Day, setDay] = useState(0);
  const [OpenBalance, setOpenBalance] = useState('');
  const [Balance, setBalance] = useState('');
  const [PostedBalance, setPostedBalance] = useState(0);
  const [yearId, setYearId] = useState('');
  const [oldBal, setOldBal] = useState('');

  const [submitting ,setSubmitting] = useState(false)
  const [processing ,setProcessing] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const [EmployeeData, setEmployeeData] = useState([]);
  const [LeaveData, setLeaveData] = useState([]);
  const { intl } = props;
  const { classes } = useStyles();




  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    setProcessing(true)


    const data = {
        id: id,
        employeeId: Employee.id,
        vacCode: LeaveType.id,
        vacCount: Number(Day),
        vacBalance: Number(OpenBalance),
        currentBalance: Number(Balance),
        postedBal: Number(PostedBalance),
        updateBalance: UpdateCurrentBalance,
        yearId: yearId,
        oldBal: oldBal,
    };



    try {
      let response = await LeaveOpenBalanceData().Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
      } else {
          toast.error(response.statusText);
      }
      setSubmitting(false)
      setProcessing(false)
    } catch (err) {
      toast.error(notif.error);
      setSubmitting(false)
      setProcessing(false)
    }
    
  };
 


const getdata =  async () => {

  const EmployeeList = await GeneralListApis(locale).GetEmployeeList(locale);    
  const LeaveList = await GeneralListApis(locale).GetVacList(true);    

  setEmployeeData(EmployeeList)
  setLeaveData(LeaveList)
};

const getEditdata =  async () => {

  const data =  await LeaveOpenBalanceData().GetDataById(Employee.id,LeaveType.id);

  setid(data ? data.id : "")
  setDay(data ? data.vacCount : "") 
  setOpenBalance(data ? data.vacBalance : "") 
  setBalance(data ? data.currentBalance : "") 
  setPostedBalance(data ? data.postedBal : "") 
  setYearId(data ? data.yearId : "") 
  setOldBal(data ? data.oldBal : "") 
};


useEffect(() => {
  getdata();
}, []);

useEffect(() => {
  if(Employee.length !== 0 && LeaveType.length !== 0)
  {
    getEditdata()
  }
  }, [Employee,LeaveType]);


  
  

  return (
    <div>
      <PapperBlock whiteBg icon="border_color" 
          title={ intl.formatMessage(messages.LeavesOpenBalanceTitle) } 
          desc={""}>
            <form onSubmit={handleSubmit}>

            <Grid
              container
              spacing={3}
              alignItems="flex-start"
              direction="row">
            
              <Grid item xs={12}  md={12} 
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                className={style.gridSty}
                > 
                    
                  <Grid item xs={12}  md={4} > 
                        <Autocomplete
                            id="ddlMenu"   
                            isOptionEqualToValue={(option, value) => option.id === value.id}                   
                            options={EmployeeData.length != 0 ? EmployeeData: []}
                            getOptionLabel={(option) =>(
                                option  ? option.name : ""
                            )
                            }
                            renderOption={(props, option) => {
                                return (
                                <li {...props} key={option.id}>
                                    {option.name}
                                </li>
                                );
                            }}
                            onChange={(event, value) => {
                                if (value !== null) {
                                    setEmployee(value);
                                } else {
                                    setEmployee("");
                                }
                            }}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                name="EmployeeName"
                                label={intl.formatMessage(messages.EmployeeName) }
                                margin="normal" 
                                className={style.fieldsSty}
                                required
                                />
                                
                            )}
                            /> 
            
                  </Grid>
                
              </Grid>

              <Grid item xs={12}  md={12} 
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                className={style.gridSty}
              > 
                    
                <Grid item xs={12}  md={4}> 
                        <Autocomplete
                            id="ddlMenu"   
                            isOptionEqualToValue={(option, value) => option.id === value.id}                  
                            options={LeaveData.length != 0 ? LeaveData: []}
                            getOptionLabel={(option) =>(
                                option  ? option.name : ""
                            )
                            }
                            renderOption={(props, option) => {
                                return (
                                <li {...props} key={option.id}>
                                    {option.name}
                                </li>
                                );
                            }}
                            onChange={(event, value) => {
                                if (value !== null) {
                                    setLeaveType(value);
                                } else {
                                    setLeaveType("");
                                }
                            }}
                            
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                name="LeaveType"
                                label={intl.formatMessage(messages.LeaveType) }
                                margin="normal" 
                                className={style.fieldsSty}
                                required
                                />
                                
                            )}
                            /> 
              
                </Grid>
              </Grid>
                    
              

              <Grid item xs={12}  md={12}  className={style.gridSty}> 
                  <Card className={classes.card}>
                    <CardContent className={style.CardContentSty}>
                      <Grid item xs={12}  md={12} 
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row"
                        >
    
                        <Grid item xs={12}  md={2} lg={1} > 
                          <TextField
                            name="usedLeaves"
                            id="usedLeaves"
                            placeholder={intl.formatMessage(messages.usedLeaves) }
                            label={intl.formatMessage(messages.usedLeaves)}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            type='number'
                            value={Day}
                            onChange={(e) => setDay(e.target.value)}
                            inputProps={{ pattern: "^[0-9.]+$" }}
                            disabled
                          />
                        </Grid>

                        <Grid item xs={12}  md={2} lg={1} > 
                            <TextField
                            name="OpenBalance"
                            id="OpenBalance"
                            placeholder={intl.formatMessage(messages.OpenBalance) }
                            label={intl.formatMessage(messages.OpenBalance)}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            type='text'
                              value={OpenBalance}
                              onChange={(e) => setOpenBalance(e.target.value)}
                              inputProps={{ pattern: "^[0-9.]+$" }}
                              required
                            />
                        </Grid>

                        <Grid item xs={12}  md={2}  lg={1}> 
                            <TextField
                            name="Balance"
                            id="Balance"
                            placeholder={intl.formatMessage(messages.Balance) }
                            label={intl.formatMessage(messages.Balance)}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            type='text'
                              value={Balance}
                              onChange={(e) => setBalance(e.target.value)}
                              inputProps={{ pattern: "^[0-9.]+$" }}
                              disabled
                            />
                        </Grid>

                        <Grid item xs={12}  md={2} lg={1} > 
                            <TextField
                            name="PostedBalance"
                            id="PostedBalance"
                            placeholder={intl.formatMessage(messages.PostedBalance) }
                            label={intl.formatMessage(messages.PostedBalance)}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            type='text'
                              value={PostedBalance}
                              onChange={(e) => setPostedBalance(e.target.value)}
                              inputProps={{ pattern: "^[0-9.]+$" }}
                            />
                        </Grid>
                      </Grid>

                    </CardContent>
                  </Card>
                </Grid>


                <Grid item xs={12}  md={12} 
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                className={style.gridSty}
              > 
                <Grid item xs={12}  md={12}> 
                  <FormControlLabel  
                    control={ 
                      <Switch  
                      checked={UpdateCurrentBalance} 
                      onChange={() => {
                          setUpdateCurrentBalance(!UpdateCurrentBalance)
                      }}
                      color="primary" 
                      className={style.BtnSty}
                      />} 
                      label={intl.formatMessage(messages.UpdateCurrentBalance) }
                    /> 
                </Grid>
                
              </Grid>

            </Grid>


              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                 
                  <Grid item xs={12} md={12}></Grid>
                  <Grid item xs={12} md={4}
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                  className={style.itemsStyle}
                  >
                <Grid item xs={3}  md={5} lg={3}>                  
                    <Button variant="contained" type="submit" size="medium" color="primary"  disabled={submitting || processing}>
                    {processing && (
                      <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                    )}
                       <FormattedMessage {...Payrollmessages.save} /> 
                    </Button>
                </Grid>

                </Grid>
              </Grid>
          </form>
      </PapperBlock>         

     
    </div>
  );
}

LeaveOpenBalance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(LeaveOpenBalance); 
