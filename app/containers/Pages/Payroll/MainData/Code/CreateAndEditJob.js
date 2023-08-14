import React, { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CompanyData from '../api/CompanyData';
import Autocomplete from '@mui/material/Autocomplete';
import JobData from '../api/JobData';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchAction , fetchAllJobsAction} from '../../../../../containers/Tables/reducers/crudTbActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import  FormPopup  from '../../../../../components/FormPopup/FormPopup';
import style from '../../../../../styles/Styles.scss'
import AddIcon from '@mui/icons-material/Add';
import { useParams  } from 'react-router-dom';


// validation functions
// const required = (value) => (value == null ? 'Required' : undefined);
// const email = (value) =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? 'Invalid email'
//     : undefined;

const useStyles = makeStyles()((theme) => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  field: {
    width: '100%',
    marginBottom: 20,
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  menu: {
    width: 200,
  },
}));

function CreateAndEditJob() {
  const [id, setid] = useState(0);
  const [arName, setArName] = useState('');
  const [enName, setEnName] = useState('');
  const [jobCode, setJobCode] = useState('');
  const [medicalInsuranceStartDay, setMedicalInsuranceStartDay] = useState('');
  const [isLeadershipPosition, setIsLeadershipPosition] = useState(false);
  const [jobType ,setJobType] = useState("")
  const [sancLevel ,setSancLevel] = useState("")
  const [jobNature ,setJobNature] = useState("")
  const [organization ,setOrganization] = useState("")
  const [parent ,setParent] = useState("")
  const fetchData = useDispatch();
  const branch = 'jobsAllData' ;
  const locale = useSelector(state => state.language.locale);
  const jobsData = useSelector(state => state.jobs.jobsAllData);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [openOrganization, setOpenOrganization] = useState(false);
  const [openJobNature, setOpenJobNature] = useState(false);
  const [openJobType, setOpenJobType] = useState(false);
  const [openSancLevel, setOpenSancLevel] = useState(false);
  const [editData, setEditData] = useState();
  let { ID } = useParams();



  const trueBool = true;
  const { classes } = useStyles();
  // const { pristine, submitting, init } = props;
  const handleSubmit = async (e) => {
    e.preventDefault();
    // debugger;
    const data = {
      id: id,
      arName: arName,
      enName: enName,
      parentId: parent,
      organizationId: organization,
      jobNatureId: jobNature,
      jobTypeId: jobType,
      sancLevelId: sancLevel,
      jobCode: jobCode,
      medicalInsuranceStartDay: medicalInsuranceStartDay,
      isLeadershipPosition: isLeadershipPosition
      
    };
    console.log("data2 =", data);
    const dataApi = await JobData().Save(data);
    
  };
  const clear = (e) => {
    setName();
    setEnName();
    setphone();
    setmail();
    setaddress();
  };
//   useEffect(() => {
//     async function fetchData() {
//       // You can await here
//       const dataApi = await CompanyData().GetList();
//       debugger;
//       if (dataApi.length > 0) {
//         setid(dataApi[0].id);
//         setName(dataApi[0].arName);
//         setEnName(dataApi[0].enName);
//         setphone(dataApi[0].phone);
//         setmail(dataApi[0].mail);
//         setaddress(dataApi[0].address);
//       }
//     }
//     fetchData();
//     // if (!data.length) { fetchData(); }
//   }, []);


// const topFilms = [
//   { title: 'The Shawshank Redemption', year: 1994 },
//   { title: 'The Godfather', year: 1972 },
//   { title: 'The Godfather: Part II', year: 1974 },
//   { title: 'The Dark Knight', year: 2008 },
//   { title: '12 Angry Men', year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: 'Pulp Fiction', year: 1994 },
//   {
//     title: 'The Lord of the Rings: The Return of the King',
//     year: 2003,
//   }
// ]

const getdata =  async () => {

  const data =  await JobData(locale).GetAllDataList();

  fetchData(fetchAllJobsAction(data));
};

const getEditdata =  async () => {

  const data =  await JobData().GetDataById(ID);

  setArName(data ? data.arName : "")
  setEnName(data ? data.enName : "")
  setJobCode(data ? data.jobCode : "")
  setMedicalInsuranceStartDay(data ? data.medicalInsuranceStartDay : "")
  setIsLeadershipPosition(data ? data.isLeadershipPosition : "")
  setJobType(data ? data.jobType : "")
  setSancLevel(data ? data.sancLevel : "")
  setJobNature(data ? data.jobNature : "")
  setOrganization(data ? data.organization : "")
  setParent(data ? data.parent : "")
  // fetchData(fetchAllJobsAction(data));
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
  if(key === "parent")
  {
    setOpenParentPopup(true);
  }
  else if(key === "organization")
  {
    setOpenOrganization(true)
  }
  else if(key === "jobNature")
  {
    setOpenJobNature(true)
  }
  else if(key === "jobType")
  {
    setOpenJobType(true)
  }
  else if(key === "sancLevel")
  {
    setOpenSancLevel(true)
  }
};

const handleClose = (key) => {
  if(key === "parent")
  {
    setOpenParentPopup(false);
  }
  else if(key === "organization")
  {
    setOpenOrganization(false)
  }
  else if(key === "jobNature")
  {
    setOpenJobNature(false)
  }
  else if(key === "jobType")
  {
    setOpenJobType(false)
  }
  else if(key === "sancLevel")
  {
    setOpenSancLevel(false)
  }
};


 console.log("isLeadershipPosition =",isLeadershipPosition);

  return (
    <div>

      <FormPopup  
        handleClose={()=>handleClose("parent")}
        open={openParentPopup}
        keyVal="Parent"
      />

      <FormPopup  
        handleClose={()=>handleClose("organization")}
        open={openOrganization}
        keyVal="Organization"
      />

      <FormPopup  
        handleClose={()=>handleClose("jobNature")}
        open={openJobNature}
        keyVal="Job Nature"
      />

      <FormPopup  
        handleClose={()=>handleClose("jobType")}
        open={openJobType}
        keyVal="Job Type"
      />

      <FormPopup  
        handleClose={()=>handleClose("sancLevel")}
        open={openSancLevel}
        keyVal="sanc Level"
      />
        
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        direction="row"
        justifyContent="center"
      >
        <Grid item xs={12} md={6}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              {ID ?  "Edit" : "Create" } Job
            </Typography>

            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  name="arName"
                  id="arName"
                  placeholder="AR Name"
                  label="AR Name"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                  value={arName}
                  onChange={(e) => setArName(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  name="enName"
                  id="enName"
                  placeholder="EN Name"
                  label="EN Name"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                  value={enName}
                  onChange={(e) => setEnName(e.target.value)}
                />
              </div>
              <div className={style.comboBoxContainer}>
                {/* <TextField
                  name="parentId"
                  id="parentId"
                  placeholder="Parent Id"
                  label="Parent Id"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                //   value={name}
                  onChange={(e) => setParentId(e.target.value)}
                /> */}
                <Autocomplete
                        id="ddlMenu"   
                        value={parent}                        
                        // value={{id: 6, name: "CEO"}}                        
                        options={jobsData ? jobsData.parentList: []}
                        // options={topFilms}
                        getOptionLabel={(option) =>(
                          // option.title
                          option ? option.name : ""
                          // option ? option.title : ""
                          // locale=="en"?option.enName:option.arName
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
                              setParent(value.id);
                            } else {
                              setParent("");
                            }
                        }}
                        renderInput={(params) => (
                        <TextField
                            // variant="standard"
                            {...params}
                            name="Parent"
                            // value={parent}
                            label="Parent"
                            margin="normal" 
                            required
                            />
                            
                        )}
                    />

                <Button variant="outlined" onClick={()=>handleClickOpen("parent")}>
                    <AddIcon />
                </Button>
              </div>
              <div className={style.comboBoxContainer}>
                {/* <TextField
                  name="organizationId"
                  id="organizationId"
                  placeholder="Organization Id"
                  label="Organization Id"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                //   value={name}
                  onChange={(e) => setOrganizationId(e.target.value)}
                /> */}
                <Autocomplete
                        id="ddlMenu"         
                        options={jobsData ? jobsData.organizationList : []}               
                        // options={topFilms}
                        getOptionLabel={(option) =>(
                          // option.title
                          option ? option.name : ""
                          // locale=="en"?option.enName:option.arName
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
                              setOrganization(value.id);
                            } else {
                              setOrganization("");
                            }
                        }}
                        renderInput={(params) => (
                        <TextField
                            // variant="standard"
                            {...params}
                            name="Organization"
                            value={organization}
                            label="Organization"
                            margin="normal" 
                            required
                            />
                            
                        )}
                    />

                <Button variant="outlined" onClick={()=>handleClickOpen("organization")}>
                    <AddIcon />
                </Button>
              </div>
              <div className={style.comboBoxContainer}>
                {/* <TextField
                  name="jobNatureId"
                  id="jobNatureId"
                  placeholder="Job Nature Id"
                  label="Job Nature Id"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                //   value={name}
                  onChange={(e) => setJobNatureId(e.target.value)}
                /> */}

                  <Autocomplete
                        id="ddlMenu"         
                        options={jobsData ? jobsData.jobNatureList : []}                
                        // options={topFilms}
                        getOptionLabel={(option) =>(
                          // option.title
                          option ? option.name : ""
                          // locale=="en"?option.enName:option.arName
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
                              setJobNature(value.id);
                            } else {
                              setJobNature("");
                            }
                        }}
                        renderInput={(params) => (
                        <TextField
                            // variant="standard"
                            {...params}
                            name="JobNature"
                            value={jobNature}
                            label="Job Nature"
                            margin="normal"
                            required
                             />
                            
                        )}
                    />

                <Button variant="outlined" onClick={()=>handleClickOpen("jobNature")}>
                    <AddIcon />
                </Button>
              </div>
              <div className={style.comboBoxContainer}>
                {/* <TextField
                  name="jobTypeId"
                  id="jobTypeId"
                  placeholder="Job Type Id"
                  label="Job Type Id"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                //   value={name}
                  onChange={(e) => setJobTypeId(e.target.value)}
                /> */}
                <Autocomplete
                        id="ddlMenu"         
                        options={jobsData ? jobsData.jobTypeList: []}                 
                        // options={topFilms}
                        getOptionLabel={(option) =>(
                          // option.title
                          option ? option.name : ""
                          // locale=="en"?option.enName:option.arName
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
                              setJobType(value.id);
                            } else {
                              setJobType("");
                            }
                        }}
                        renderInput={(params) => (
                        <TextField
                            // variant="standard"
                            {...params}
                            name="JobType"
                            value={jobType}
                            label="Job Type"
                            margin="normal" 
                            required
                            />
                            
                        )}
                    />

                <Button variant="outlined" onClick={()=>handleClickOpen("jobType")}>
                    <AddIcon />
                </Button>
              </div>
              <div className={style.comboBoxContainer}>
                {/* <TextField
                  name="sancLevelId"
                  id="sancLevelId"
                  placeholder="Sanc Level Id"
                  label="Sanc Level Id"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                //   value={name}
                  onChange={(e) => setSancLevelId(e.target.value)}
                /> */}
                <Autocomplete
                        id="ddlMenu"                        
                        options={jobsData ? jobsData.sancLevelList : []}  
                        getOptionLabel={(option) =>(
                          // option.title
                          option ? option.name : ""
                          // locale=="en"?option.enName:option.arName
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
                              setSancLevel(value.id);
                            } else {
                              setSancLevel("");
                            }
                        }}
                        renderInput={(params) => (
                        <TextField
                            // variant="standard"
                            {...params}
                            name="SancLevel"
                            value={sancLevel}
                            label="Sanc Level"
                            margin="normal"
                            required
                             />
                            
                        )}
                    />

                <Button variant="outlined" onClick={()=>handleClickOpen("sancLevel")}>
                    <AddIcon />
                </Button>
              </div>
              <div>
                <TextField
                  name="jobCode"
                  id="jobCode"
                  placeholder="Job Code"
                  label="Job Code"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                  value={jobCode}
                  onChange={(e) => setJobCode(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  name="medicalInsuranceStartDay"
                  id="medicalInsuranceStartDay"
                  placeholder="Medical Insurance Start Day"
                  label="Medical Insurance Start Day"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                  value={medicalInsuranceStartDay}
                  type='number'
                  onChange={(e) => setMedicalInsuranceStartDay(e.target.value)}
                />
              </div>
              <div>
                {/* <TextField
                  name="isLeadershipPosition"
                  id="isLeadershipPosition"
                  placeholder="Is Leader ship Position"
                  label="Leader ship Position"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                //   value={name}
                  onChange={(e) => setIsLeadershipPosition(e.target.value)}
                /> */}
                <FormControlLabel required 
                control={ 
                  <Switch  
                  checked={isLeadershipPosition} 
                  onChange={() => 
                    setIsLeadershipPosition(!isLeadershipPosition)
                  }
                  color="secondary"
                  />} 
                label="Leader ship Position" 
                />
              </div>
              
            
              

              
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  //disabled={submitting}
                >
                  Submit
                </Button>
                {/* <Button type="reset" onClick={clear}>
                  Reset
                </Button> */}
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}



export default CreateAndEditJob;
