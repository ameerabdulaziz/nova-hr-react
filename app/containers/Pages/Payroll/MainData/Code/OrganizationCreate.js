import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import OrganizationData from '../api/OrganizationData';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/Styles.scss'
import {  useHistory, useLocation  } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../messages';
import Payrollmessages from '../../messages';
import PropTypes from 'prop-types';
import GeneralListApis from '../../api/GeneralListApis'; 
import { PapperBlock } from 'enl-components';
import useStyles from '../../Style';
import SaveButton from '../../Component/SaveButton';




function CreateAndEditOrg(props) {
  const [id, setid] = useState(0);
  const [arName, setArName] = useState('');
  const [enName, setEnName] = useState('');
  const [note, setNote] = useState('');
  const [manPower, setManPower] = useState('');
  const [worknatureAllowance, setWorknatureAllowance] = useState("");
  const [Employee ,setEmployee] = useState("")
  const [parent ,setParent] = useState('')
  const [submitting ,setSubmitting] = useState(false)
  const [processing ,setProcessing] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const { state } = useLocation()
  const  ID  = state?.id
  const [EmployeesData, setEmployeesData] = useState([]);
  const [parentData, setParentData] = useState([]);
  const [errorMesManPower, setErrorMesManPower] = useState(false);
  const [errorMesWorknature, setErrorMesWorknature] = useState(false);
  const history=useHistory(); 
  const { intl } = props;



  const { classes } = useStyles();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    setProcessing(true)
    const data = {
      id: id,
      arName: arName,
      enName: enName,
      parentId: parent.id ? parent.id : "",
      manPower: manPower.length !== 0 ? parseInt(manPower) : "",
      worknatureAllowance: parseInt(worknatureAllowance),
      note: note.length !== 0 ? note : "",
      employeeId: Employee.id ? Employee.id : ""
    };


    try {
      let response = await OrganizationData().Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/MainData/Organization`);
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

  const employees = await GeneralListApis(locale).GetEmployeeList(locale);    
  const Departmentlist = await GeneralListApis(locale).GetDepartmentList(locale);  

  setEmployeesData(employees)
  setParentData(Departmentlist)
};

const getEditdata =  async () => {

  const data =  await OrganizationData().GetDataById(ID,locale);

  setid(data ? data[0].id : "")
  setArName(data ? data[0].arName : "")
  setEnName(data ? data[0].enName : "")
  setParent(data ? {id:data[0].parentId , name: data[0].parentName }  : "")
  setManPower(data ? data[0].manPower : "")
  setWorknatureAllowance(data ? data[0].worknatureAllowance : "")
  setNote(data ? data[0].note : "")
  setEmployee(data ? {id:data[0].employeeId , name: data[0].empName } : "")
};


useEffect(() => {
  getdata();
}, []);

useEffect(() => {
  if(ID)
  {
    getEditdata()
  }
  }, [ID]);


  function oncancel(){
    history.push(`/app/Pages/MainData/Organization`);
  }


  const errorMesFun = (e,type) => {
    
    let pattern = /^[0-9]+$/g;
    let result = pattern.test(e.target.value)
    if( type === "manPower")
    {
      setErrorMesManPower(result)
    }
    else
    {
      setErrorMesWorknature(result)
    }

  }




  return (
    <div>
      <PapperBlock whiteBg icon="border_color" 
          title={ID ?  
                    intl.formatMessage(messages.editOrganization)
                  :  intl.formatMessage(messages.createOrganization)
               } 
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
                    direction="row"> 
                      <Grid item xs={12}  md={4}> 
                          <TextField
                          name="arName"
                          id="arName"
                          placeholder={intl.formatMessage(messages.arName) }
                          label={intl.formatMessage(messages.arName)}
                          required
                          className={`${classes.field} ${style.fieldsSty}`}
                          margin="normal"
                          variant="outlined"
                          value={arName}
                          onChange={(e) => setArName(e.target.value)}
                          />
                      </Grid>
                      <Grid item xs={12}  md={4}> 
                          <TextField
                          name="enName"
                          id="enName"
                          placeholder={intl.formatMessage(messages.enName) }
                          label={intl.formatMessage(messages.enName)}
                          required
                          className={`${classes.field} ${style.fieldsSty}`}
                          margin="normal"
                          variant="outlined"
                          value={enName}
                          onChange={(e) => setEnName(e.target.value)}
                        />
                      </Grid>
                  </Grid>
                  <Grid item xs={12}  md={4}> 
                    <Autocomplete
                          id="ddlMenu"   
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          value={parent.length != 0 && parent !== null ? parent : null}                       
                          options={parentData.length != 0 ? parentData: []}
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
                                setParent(value);
                              } else {
                                setParent("");
                              }
                          }}
                          renderInput={(params) => (
                          <TextField
                              {...params}
                              name="Parent"
                              label={intl.formatMessage(messages.parentNameOrg) }
                              margin="normal" 
                              className={style.fieldsSty}
                              />
                              
                          )}
                      />
                  </Grid>

                  <Grid item xs={12}  md={4}> 
                    <Autocomplete
                          id="ddlMenu"    
                          isOptionEqualToValue={(option, value) => option.id === value.id}  
                          value={Employee.length != 0 && Employee !== null ? Employee : null}                   
                          options={EmployeesData.length != 0 ? EmployeesData : []}  
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
                              name="employeeId"
                              value={Employee}
                              label={intl.formatMessage(messages.empName) }
                              margin="normal"
                              className={style.fieldsSty}
                              />
                              
                          )}
                      />
                  </Grid>
                  <Grid item xs={12}  md={12} 
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"> 
                    
                    <Grid item xs={12}  md={2}> 
                        <TextField
                        name="manPower"
                        id="manPower"
                        inputProps={{ pattern: "^[0-9]+$" }}
                        placeholder={intl.formatMessage(messages.manPower) }
                        label={intl.formatMessage(messages.manPower) }
                        className={`${classes.field} ${style.fieldsSty}`}
                        margin="normal"
                        variant="outlined"
                        value={manPower}
                        type='text'
                        onChange={(e) =>{ 
                          setManPower(e.target.value)
                          errorMesFun(e,"manPower")
                        }}
                      />
                      {manPower.length > 0 && !errorMesManPower && (
                        <p className={style.errorMes}> <FormattedMessage {...messages.errorMes} /> </p>
                      )}
                    </Grid>
                    <Grid item xs={12}  md={2}> 
                        <TextField
                        name="worknatureAllowance"
                        id="worknatureAllowance"
                        placeholder={intl.formatMessage(messages.worknatureAllowance) }
                        label={intl.formatMessage(messages.worknatureAllowance) }
                        className={`${classes.field} ${style.fieldsSty}`}
                        margin="normal"
                        variant="outlined"
                        value={worknatureAllowance}
                        type='text'
                        onChange={(e) =>{ 
                          setWorknatureAllowance(e.target.value)
                          errorMesFun(e,"worknature")
                        }}
                        inputProps={{ pattern: "^[0-9]+$" }}
                      />
                      {worknatureAllowance?.length > 0 && !errorMesWorknature && (
                        <p className={style.errorMes}> <FormattedMessage {...messages.errorMes} /> </p>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}  md={8}> 
                      <TextField
                      name="note"
                      id="note"
                      placeholder={intl.formatMessage(messages.note) }
                      label={intl.formatMessage(messages.note) }
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
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
                    <SaveButton Id={id} processing={processing} />
                </Grid>
                <Grid item xs={3}  md={5} lg={3}>
                    <Button variant="contained" size="medium" color="primary" 
                    onClick={oncancel}
                     >
                       <FormattedMessage {...Payrollmessages.cancel} /> 
                    </Button>
                </Grid>
                </Grid>
              </Grid>
          </form>
      </PapperBlock>         

     
    </div>
  );
}

CreateAndEditOrg.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CreateAndEditOrg);
