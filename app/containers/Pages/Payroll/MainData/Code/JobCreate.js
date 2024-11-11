import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import JobData from '../api/JobData';
import { useSelector } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import  FormPopup  from '../../../../../components/Popup/FormPopup';
import style from '../../../../../styles/styles.scss'
import AddIcon from '@mui/icons-material/Add';
import {  useHistory , useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../messages';
import Payrollmessages from '../../messages';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import PayRollLoader from '../../Component/PayRollLoader';
import { PapperBlock } from 'enl-components';
import useStyles from '../../Style';
import SaveButton from '../../Component/SaveButton';



function CreateAndEditJob(props) {
  const [id, setid] = useState(0);
  const [arName, setArName] = useState('');
  const [enName, setEnName] = useState('');
  const [jobCode, setJobCode] = useState('');
  const [medicalInsuranceStartDay, setMedicalInsuranceStartDay] = useState('');
  const [isLeadershipPosition, setIsLeadershipPosition] = useState(false);
  const [jobType ,setJobType] = useState(null)
  const [sancLevel ,setSancLevel] = useState(null)
  const [jobNature ,setJobNature] = useState(null)
  const [parent ,setParent] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const locale = useSelector(state => state.language.locale);
  const [openJobNature, setOpenJobNature] = useState(false);
  const [openJobType, setOpenJobType] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  const { state } = useLocation()
  const  ID  = state?.id
  const history=useHistory(); 
  const { intl } = props;
  const { classes } = useStyles();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      id,
      arName,
      enName,
      parentId: parent?.id ? parent.id : "",
      jobNatureId: jobNature?.id ? jobNature.id : "",
      jobTypeId: jobType?.id ? jobType.id : "",
      sancLevelId: sancLevel?.id ? sancLevel.id : "",
      jobCode: jobCode?.length !== 0 ? jobCode : "",
      medicalInsuranceStartDay: medicalInsuranceStartDay?.length !== 0 ? medicalInsuranceStartDay : "",
      isLeadershipPosition,
      
    };

    try {
      await JobData().Save(data);

      history.push(`/app/Pages/MainData/Job`);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
    
  };
 


const getdata =  async () => {
  setIsLoading(true);

  try {
      const data =  await JobData(locale).GetAllDataList();

      setJobsData(data)
  } catch (error) {
    //
  } finally {
    setIsLoading(false);
  }
};

const getEditdata = async () => {
  setIsLoading(true);

  try {
    const data = await JobData().GetDataById(ID, locale);

    if (data && data[0]) {
      setid(data[0].id ?? "");
      setArName(data[0].arName ?? "");
      setEnName(data[0].enName ?? "");
      setJobCode(data[0].jobCode ?? "");
      setMedicalInsuranceStartDay(data[0].medicalInsuranceStartDay ?? "");
      setIsLeadershipPosition(data[0].isLeadershipPosition ?? "");
      setJobType(
        data[0].jobTypeId
          ? { id: data[0].jobTypeId, name: data[0].jobTypeName }
          : null
      );
      setSancLevel(
        data[0].sancLevelId
          ? { id: data[0].sancLevelId, name: data[0].sancLevelName }
          : null
      );
      setJobNature(
        data[0].jobNatureId
          ? { id: data[0].jobNatureId, name: data[0].jobNatureName }
          : null
      );
      setParent(
        data[0].parentId
          ? { id: data[0].parentId, name: data[0].parentName }
          : null
      );
    }
  } catch (error) {
    //
  } finally {
    setIsLoading(false);
  }
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




const handleClickOpen = (key) => {
 if(key === "jobNature")
  {
    setOpenJobNature(true)
  }
  else if(key === "jobType")
  {
    setOpenJobType(true)
  }
};

const handleClose = (key) => {
 if(key === "jobNature")
  {
    setOpenJobNature(false)
  }
  else if(key === "jobType")
  {
    setOpenJobType(false)
  }
};

const createJobDetailsFun = async (arVal,enVal, jobDetailsType) => {
  
  const data = {
    id: 0,
    arName: arVal,
    enName: enVal
  };

  let URLType = jobDetailsType === "Job Nature" ? "MdJobNatures" :  jobDetailsType === "Job Type" ? "MdJobsTypes" : null;
  try {
    let response = await JobData().SaveJobDetails(URLType , data);

    if (response.status==200) {
      toast.success(notif.saved);
      getdata();
    } else {
        toast.error(response.statusText);
    }
  } catch (err) {
    toast.error(notif.error);
  }
}


function oncancel(){
  history.push(`/app/Pages/MainData/Job`);
}



  return (
    <PayRollLoader isLoading={isLoading}>

      <FormPopup  
        handleClose={()=>handleClose("jobNature")}
        open={openJobNature}
        keyVal="Job Nature"
        Title={intl.formatMessage(messages.jobNatureName) }
        callFun={createJobDetailsFun}
        intl={intl}
        submitting={isLoading}
        processing={isLoading}
      />

      <FormPopup  
        handleClose={()=>handleClose("jobType")}
        open={openJobType}
        keyVal="Job Type"
        Title={intl.formatMessage(messages.jobTypeName) }
        callFun={createJobDetailsFun}
        intl={intl}
        submitting={isLoading}
        processing={isLoading}
      />

        <PapperBlock whiteBg icon="border_color" 
          title={ID ?  
                    intl.formatMessage(messages.editJob)
                  :  intl.formatMessage(messages.createJob)
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
                          autoComplete='off'
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
                          autoComplete='off'
                        />
                      </Grid>
                    </Grid>

                    

                    <Grid item xs={12}  md={12} 
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"> 

                    <Grid item xs={12}  md={4}> 
                      <div className={locale === "en" ?  style.comboBoxContainer : style.comboBoxContainerAR}>

                          <Autocomplete
                                id="ddlMenu"   
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                value={jobNature}        
                                options={jobsData.length != 0 ? jobsData.jobNatureList : []}                
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
                                  setJobNature(value);
                                }}
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="JobNature"
                                    value={jobNature}
                                    label={intl.formatMessage(messages.jobNatureName) }
                                    margin="normal"
                                    className={style.fieldsSty}
                                    />
                                    
                                )}
                            />

                        <Button variant="outlined" onClick={()=>handleClickOpen("jobNature")}>
                            <AddIcon />
                        </Button>
                      </div>
                    
                    </Grid>

                    <Grid item xs={12}  md={4}> 
                      <div className={locale === "en" ?  style.comboBoxContainer : style.comboBoxContainerAR}>
                          <Autocomplete
                                  id="ddlMenu"  
                                  isOptionEqualToValue={(option, value) => option.id === value.id}       
                                  value={jobType}  
                                  options={jobsData.length != 0 ? jobsData.jobTypeList: []}                 
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
                                    setJobType(value);
                                  }}
                                  renderInput={(params) => (
                                  <TextField
                                      {...params}
                                      name="JobType"
                                      value={jobType}
                                      label={intl.formatMessage(messages.jobTypeName) }
                                      margin="normal" 
                                      className={style.fieldsSty}
                                      />
                                      
                                  )}
                              />

                          <Button variant="outlined" onClick={()=>handleClickOpen("jobType")}>
                              <AddIcon />
                          </Button>
                        </div>
                    </Grid>

                    </Grid>

                    <Grid item xs={12}  md={12} 
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"> 

                    <Grid item xs={12}  md={4}> 
                    <Autocomplete
                        id="ddlMenu"   
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={parent}                       
                        options={jobsData.length != 0 ? jobsData.parentList: []}
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
                          setParent(value);
                        }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            name="Parent"
                            label={intl.formatMessage(messages.parentName) }
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
                            value={sancLevel}                   
                            options={jobsData.length != 0 ? jobsData.sancLevelList : []}  
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
                              setSancLevel(value);
                            }}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                name="SancLevel"
                                value={sancLevel}
                                label={intl.formatMessage(messages.sancLevelName) }
                                margin="normal"
                                className={style.fieldsSty}
                                />
                                
                            )}
                        />
                    </Grid>

                    </Grid>


                    <Grid item xs={12}  md={2}> 
                        <TextField
                          name="jobCode"
                          id="jobCode"
                          placeholder={intl.formatMessage(messages.jobCode) }
                          label={intl.formatMessage(messages.jobCode) }
                          className={`${classes.field} ${style.fieldsSty}`}
                          margin="normal"
                          variant="outlined"
                          value={jobCode}
                          onChange={(e) => setJobCode(e.target.value)}
                          autoComplete='off'
                        />
                    </Grid>

                    <Grid item xs={12}  md={2}> 
                      <TextField
                        name="medicalInsuranceStartDay"
                        id="medicalInsuranceStartDay"
                        placeholder={intl.formatMessage(messages.medicalInsuranceStartDay) }
                        label={intl.formatMessage(messages.medicalInsuranceStartDay) }
                        className={`${classes.field} ${style.fieldsSty}`}
                        margin="normal"
                        variant="outlined"
                        value={medicalInsuranceStartDay}
                        type='number'
                        onChange={(e) => setMedicalInsuranceStartDay(e.target.value)}
                        autoComplete='off'
                      />
                    </Grid>


                    <Grid item xs={12}  md={4}> 
                      <FormControlLabel  
                        control={ 
                          <Switch  
                          checked={isLeadershipPosition} 
                          onChange={() => 
                            setIsLeadershipPosition(!isLeadershipPosition)
                          }
                          color="primary" 
                          />} 
                        label={intl.formatMessage(messages.isLeadershipPosition) }
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
                    <SaveButton Id={id} processing={isLoading} />
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
    </PayRollLoader>
  );
}

CreateAndEditJob.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CreateAndEditJob);
