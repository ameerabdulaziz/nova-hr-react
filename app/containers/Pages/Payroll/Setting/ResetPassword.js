import React, { useEffect, useState ,useCallback } from 'react';
import {
    Button ,
    Grid,
    TextField,
    Autocomplete 
  } from "@mui/material";
import ResetPasswordData from './api/ResetPasswordData';
import GeneralListApis from '../api/GeneralListApis';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import messages from './messages';
import Payrollmessages from '../messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import useStyles from '../Style';
import { useSelector } from 'react-redux';
import { PapperBlock } from 'enl-components';

function ResetPassword(props) {
const {classes} = useStyles();  
const {intl} = props;
 
   
  const [departmentList, setDepartmentList] = useState([]);  
  const [department, setDepartment] = useState(); 
  const [employeeList, setemployeeList] = useState([]);  
  const [employee, setEmployee] =useState(); 
  const [password, setPassword] =useState('');   
  const locale = useSelector(state => state.language.locale);
  const Title = localStorage.getItem("MenuName");
  const handleSubmit = async (e) => {
    e.preventDefault();    
    try{
      if (!employee || !password){
        toast.error("Please Select Employee and enter Password")
        return
      }
      debugger;
    const response = await ResetPasswordData().ResetUserPassword(employee, password);
 
    if (response.status==200) {
        toast.success(notif.saved);
      } else {
          toast.error(response.statusText);
      }
    }
    catch(e){
    toast.error(notif.error);
  }
  };
  const resetAll = async() => {
    
    try {
      let response = await  ResetPasswordData().ResetAllUsersPassword();
      
      if (response.status==200) {
        toast.success(notif.saved);
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(notif.error);
    }
  };

  const GetDepartmentList = useCallback(async()=> {
    debugger ;
    const data = await GeneralListApis(locale).GetDepartmentList();
    
    setDepartmentList(data || []);
}, []);

const GetEmployeeListByDepartment = useCallback(async () => {
    try {
      debugger;
      if (!department){
        setemployeeList([]);
        return
      }
      const data = await GeneralListApis(locale).GetEmployeeListByDepartment(department);
      setemployeeList(data || []);
    } catch (err) {
      toast.error(err);
    }
  });

  useEffect(() => {    
    GetDepartmentList();
  }, []);
  
  useEffect(() => {
    
    GetEmployeeListByDepartment();
  }, [department]);

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
                <Autocomplete
                    id="ddldepartment"                        
                    options={departmentList}                        
                    getOptionLabel={(option) =>
                        option.name
                    }
                    onChange={(event, value) => {
                        debugger ;
                        if (value !== null) {
                            setDepartment(value.id);
                        } else {
                            setDepartment(null);
                        }
                        
                    }}
                    renderInput={(params) => (
                    <TextField
                        variant="outlined"                            
                        {...params}
                        name="department"
                        value={department}
                        label={intl.formatMessage(messages.chooseDept)}
                        margin="normal" />
                    )}
                />  
              </Grid>
              <Grid item xs={12} md={12}>
                <Autocomplete
                    id="ddlEmp"                        
                    options={employeeList}                        
                    getOptionLabel={(option) =>
                        option.name
                    }
                    onChange={(event, value) => {
                        debugger ;
                        if (value !== null) {
                            setEmployee(value.id);
                        } else {
                            setEmployee(null);
                        }
                        
                    }}
                    renderInput={(params) => (
                    <TextField
                        variant="outlined"                            
                        {...params}
                        name="employee"
                        value={employee}
                        label={intl.formatMessage(Payrollmessages.chooseEmp)}
                    />
                    )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}                  
                  label={intl.formatMessage(messages.password)}
                  required
                  className={classes.field}
                  variant="outlined"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
              <div style={{paddingTop:"20px"}}>
                <Grid container spacing={3}>            
                    <Grid item xs={12} sm={6}>
                        <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="medium"
                        >
                        <FormattedMessage {...messages.resetpassword} />
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" size="medium" color="primary" onClick={resetAll} >
                        <FormattedMessage {...messages.resetallpassword} />
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


export default injectIntl(ResetPassword);

