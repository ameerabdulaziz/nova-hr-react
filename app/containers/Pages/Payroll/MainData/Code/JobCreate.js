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
import style from '../../../../../styles/Styles.scss'
import AddIcon from '@mui/icons-material/Add';
import {  useHistory , useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../messages';
import Payrollmessages from '../../messages';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
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
  const [jobType ,setJobType] = useState("")
  const [sancLevel ,setSancLevel] = useState("")
  const [jobNature ,setJobNature] = useState("")
  const [parent ,setParent] = useState('')
  const [submitting ,setSubmitting] = useState(false)
  const [processing ,setProcessing] = useState(false)
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
    setSubmitting(true)
    setProcessing(true)
    const data = {
      id: id,
      arName: arName,
      enName: enName,
      parentId: parent.id ? parent.id : "",
      jobNatureId: jobNature.id ? jobNature.id : "",
      jobTypeId: jobType.id ? jobType.id : "",
      sancLevelId: sancLevel.id ? sancLevel.id : "",
      jobCode: jobCode.length !== 0 ? jobCode : "",
      medicalInsuranceStartDay: medicalInsuranceStartDay.length !== 0 ? medicalInsuranceStartDay : "",
      isLeadershipPosition: isLeadershipPosition
      
    };

    try {
      let response = await JobData().Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/MainData/Job`);
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

  const data =  await JobData(locale).GetAllDataList();

  setJobsData(data)
};

const getEditdata =  async () => {

  const data =  await JobData().GetDataById(ID,locale);

  setid(data ? data[0].id : "")
  setArName(data ? data[0].arName : "")
  setEnName(data ? data[0].enName : "")
  setJobCode(data ? data[0].jobCode : "")
  setMedicalInsuranceStartDay(data ? data[0].medicalInsuranceStartDay : "")
  setIsLeadershipPosition(data ? data[0].isLeadershipPosition : "")
  setJobType(data ? {id:data[0].jobTypeId , name: data[0].jobTypeName } : "")
  setSancLevel(data ? {id:data[0].sancLevelId , name: data[0].sancLevelName } : "")
  setJobNature(data ? {id:data[0].jobNatureId , name: data[0].jobNatureName } : "")
  setParent(data ? {id:data[0].parentId , name: data[0].parentName }  : "")
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
  history.push(`/app/Pages/MainData/job`);
}



  return (
    <div>

      <FormPopup  
        handleClose={()=>handleClose("jobNature")}
        open={openJobNature}
        keyVal="Job Nature"
        Title={intl.formatMessage(messages.jobNatureName) }
        callFun={createJobDetailsFun}
        intl={intl}
        submitting={submitting}
        processing={processing}
      />

      <FormPopup  
        handleClose={()=>handleClose("jobType")}
        open={openJobType}
        keyVal="Job Type"
        Title={intl.formatMessage(messages.jobTypeName) }
        callFun={createJobDetailsFun}
        intl={intl}
        submitting={submitting}
        processing={processing}
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
                                value={jobNature.length != 0 && jobNature !== null? jobNature : null}        
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
                                    if (value !== null) {
                                      setJobNature(value);
                                    } else {
                                      setJobNature("");
                                    }
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
                                  value={jobType.length != 0 && jobType !== null ? jobType : null}  
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
                                      if (value !== null) {
                                        setJobType(value);
                                      } else {
                                        setJobType("");
                                      }
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
                        value={parent.length != 0 && parent !== null ? parent : null}                       
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
                            value={sancLevel.length != 0 && sancLevel !== null ? sancLevel : null}                   
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
                                if (value !== null) {
                                  setSancLevel(value);
                                } else {
                                  setSancLevel("");
                                }
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

CreateAndEditJob.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CreateAndEditJob);
