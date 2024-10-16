import React, {useState} from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import style from "../../../../styles/styles.scss";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, parseISO } from "date-fns";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import useStyles from "../Style";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
  import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import {
    Grid,
    Checkbox,
    Autocomplete,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CardContent,
    Card,
    Typography,
  } from "@mui/material";

function StagePopup({
    open,
    handleClose,
    stagesData,
}) {

    const { classes } = useStyles();
    const [DateError, setDateError] = useState({});
    const [tasks, setTasks] = useState({});



//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

  return (
    // <React.Fragment>
    //   <Button variant="outlined" onClick={handleClickOpen}>
    //     Open form dialog
    //   </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        // fullWidth
        // maxWidth="md"
        PaperProps={{
            // sx: { width: '60%' }  // Custom width
          }}
        // PaperProps={{
        //   component: 'form',
        //   onSubmit: (event) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const formJson = Object.fromEntries(formData.entries());
        //     const email = formJson.email;
        //     console.log(email);
        //     handleClose();
        //   },
        // }}
      >
        <DialogTitle>Add Stage</DialogTitle>
        <DialogContent>
            <Grid container item spacing={1} alignItems="flex-start" direction="row" >
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        id="ddlMenu"
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        // value={parent.length != 0 && parent !== null ? parent : null}
                        options={stagesData.length != 0 ? stagesData : []}
                        // options={[]}
                        getOptionLabel={(option) => (option ? option.name : "")}
                        renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                            {option.name}
                            </li>
                        );
                        }}
                        // onChange={(event, value) => {
                        //   if (value !== null) {
                        //     setParent(value);
                        //   } else {
                        //     setParent("");
                        //   }
                        // }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            name="Stage"
                            label="Stage"
                            // label={intl.formatMessage(messages.parentNameOrg)}
                            margin="normal"
                            className={style.fieldsSty}
                        />
                        )}
                    />
                </Grid>
            </Grid>

            <Grid container item spacing={1} alignItems="flex-start" direction="row" style={{marginTop:"10px"}} >
            <Grid item xs={12}  md={3}> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label="Start Date"
                        // label={intl.formatMessage(Payrollmessages.date)}
                        //   value={formInfo.expectedStartDate ? dayjs(formInfo.expectedStartDate) : null}
                        className={classes.field}
                        //   onChange={(date) => {
                        //     setDate(date)
                        // }}
                        onChange={(value)=>{
                            setFormInfo((prevFilters) => ({
                                ...prevFilters,
                                expectedStartDate: value,
                            }))
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`stageStartDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`stageStartDate`]: false
                              }))
                          }
                        }}
                        slotProps={{
                            textField: {
                                required: true,
                              },
                            }}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12}  md={3}> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label="End Date"
                        // label={intl.formatMessage(Payrollmessages.date)}
                        //   value={formInfo.expectedEndDate ? dayjs(formInfo.expectedEndDate) : null}
                        className={classes.field}
                        //   onChange={(date) => {
                        //     setDate(date)
                        // }}
                        onChange={(value)=>{
                            setFormInfo((prevFilters) => ({
                                ...prevFilters,
                                expectedStartDate: value,
                            }))
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`stageEndDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`stageEndDate`]: false
                              }))
                          }
                        }}
                        slotProps={{
                            textField: {
                                // required: true,
                              },
                            }}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={3}>
                    <TextField
                    name='stageWorkHours'
                    // value={formInfo.expectedWorkHours}
                    // onChange={onInputChange}
                    label="Stage Work Hours"
                    // label={intl.formatMessage(messages.incident)}
                    fullWidth
                    variant='outlined'
                    type="number"
                    autoComplete='off'
                    // multiline
                    // rows={1}
                    />
              </Grid>
            </Grid>
{/* /////////////// */}



<Card className={`${classes.card} ${style.tasksContainerSty}`}  >
                    <CardContent>
                        <Typography color='gray' variant='subtitle1' > {"Tasks"}  </Typography>

                        

            <Grid container spacing={3} direction='row' style={{marginTop: "0"}}>
            <Grid item xs={10} >
            <Grid container spacing={3} direction="row" style={{marginLeft: "0"}}>
            <Grid item xs={12} md={3}>
                    <TextField
                        name='TaskCode'
                        // value={formInfo.TaskNameEN}
                        // onChange={onInputChange}
                        label="Task Code"
                        // label={intl.formatMessage(messages.Question)}
                        fullWidth
                        required
                        variant='outlined'
                        autoComplete='off'
                    />
                 
              </Grid>

                <Grid item xs={5} md={3}>
                    <TextField
                        name='TaskNameEN'
                        // value={formInfo.TaskNameEN}
                        // onChange={onInputChange}
                        label="Task Name EN"
                        // label={intl.formatMessage(messages.Question)}
                        fullWidth
                        required
                        variant='outlined'
                        autoComplete='off'
                    />
                 
              </Grid>

              <Grid item xs={5} md={3}>
                    <TextField
                        name='TaskNameAR'
                        // value={formInfo.TaskNameAR}
                        // onChange={onInputChange}
                        label="Task Name AR"
                        required
                        // label={intl.formatMessage(messages.Question)}
                        fullWidth
                        variant='outlined'
                        autoComplete='off'
                    />

              </Grid>

              <Grid item xs={5} md={3}>
                    <TextField
                        name='TaskWorkHours'
                        // value={formInfo.TaskNameAR}
                        // onChange={onInputChange}
                        label="Task Work Hours"
                        required
                        // label={intl.formatMessage(messages.Question)}
                        fullWidth
                        variant='outlined'
                        autoComplete='off'
                    />

              </Grid>

              <Grid item xs={12}  md={3}> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label="Start Date"
                        // label={intl.formatMessage(Payrollmessages.date)}
                        //   value={formInfo.expectedStartDate ? dayjs(formInfo.expectedStartDate) : null}
                        className={classes.field}
                        //   onChange={(date) => {
                        //     setDate(date)
                        // }}
                        onChange={(value)=>{
                            setFormInfo((prevFilters) => ({
                                ...prevFilters,
                                expectedStartDate: value,
                            }))
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`stageStartDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`stageStartDate`]: false
                              }))
                          }
                        }}
                        slotProps={{
                            textField: {
                                required: true,
                              },
                            }}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12}  md={3}> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label="End Date"
                        // label={intl.formatMessage(Payrollmessages.date)}
                        //   value={formInfo.expectedEndDate ? dayjs(formInfo.expectedEndDate) : null}
                        className={classes.field}
                        //   onChange={(date) => {
                        //     setDate(date)
                        // }}
                        onChange={(value)=>{
                            setFormInfo((prevFilters) => ({
                                ...prevFilters,
                                expectedStartDate: value,
                            }))
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`stageEndDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`stageEndDate`]: false
                              }))
                          }
                        }}
                        slotProps={{
                            textField: {
                                // required: true,
                              },
                            }}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Autocomplete
                        id="ddlMenu"
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        // value={parent.length != 0 && parent !== null ? parent : null}
                        // options={stagesData.length != 0 ? stagesData : []}
                        options={[]}
                        getOptionLabel={(option) => (option ? option.name : "")}
                        renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                            {option.name}
                            </li>
                        );
                        }}
                        // onChange={(event, value) => {
                        //   if (value !== null) {
                        //     setParent(value);
                        //   } else {
                        //     setParent("");
                        //   }
                        // }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            name="organization"
                            label="organization"
                            // label={intl.formatMessage(messages.parentNameOrg)}
                            margin="normal"
                            className={style.fieldsSty}
                        />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <Autocomplete
                        id="ddlMenu"
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        // value={parent.length != 0 && parent !== null ? parent : null}
                        // options={stagesData.length != 0 ? stagesData : []}
                        options={[]}
                        getOptionLabel={(option) => (option ? option.name : "")}
                        renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                            {option.name}
                            </li>
                        );
                        }}
                        // onChange={(event, value) => {
                        //   if (value !== null) {
                        //     setParent(value);
                        //   } else {
                        //     setParent("");
                        //   }
                        // }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            name="jobLevel"
                            label="Job Level"
                            // label={intl.formatMessage(messages.parentNameOrg)}
                            margin="normal"
                            className={style.fieldsSty}
                        />
                        )}
                    />
                </Grid>
</Grid>
                </Grid>

                <Grid item xs={2}>
                <Grid container spacing={3} direction="row" style={{marginLeft: "0"}}>
              <Grid item xs={2} md={1}  
              container
              spacing={0}
              direction="column"
              justifyContent="center"
              >
                    <AddCircleOutlineIcon 
                      className={`${style.addIconSty} ${classes.colorSty}`}
                    //   onClick={()=>{
                        
                        
                    //     if(
                    //       taskFieldsValidationFun()
                    //     )
                    //     {
                    //       setTaskCounter(taskCounter + 1)
                    //       setTaskCounterVals(taskCounterVals + 1)
                    //       setTasks((prev)=>({
                    //         ...prev,
                    //         [`task${taskCounterVals + 1}`] : {
                    //           // [`taskCode${taskCounterVals + 1}`] : "",
                    //           [`taskNameEN${taskCounterVals + 1}`] : "",
                    //           [`taskNameAR${taskCounterVals + 1}`] : "",
                    //         }
                    //       }))
                    //   }
                    //   else
                    //   {
                    //     toast.error("you can not create new task before fill all task fields");
                    //   }
                    // }}
                      />
              </Grid>
              </Grid>
              </Grid>
            </Grid>


            { tasks && tasks.length !== 0 ? 
              (
               
                Object.keys(tasks).map((task,index)=>{
                  
                 return <Grid container spacing={3} direction='row' style={{marginTop: "0"}} key={index}>

                          <Grid item xs={5} md={4}>
                          <TextField
                            name='TaskNameEN'
                            // value={tasks[task][Object.keys(tasks[task])[0]]}
                            // onChange={(e)=>{
                            //     setTasks((prev)=>({
                            //       ...prev,
                            //         [task] : {
                            //           ...prev[`${task}`],
                            //           [`${Object.keys(tasks[task])[0]}`]: e.target.value
                            //           // [`${Object.keys(tasks[task])[1]}`]: e.target.value
                            //         } 
                            //     }))
                            //   }}
                              required
                            label="Task Name EN"
                            // label={intl.formatMessage(messages.Question)}
                            fullWidth
                            variant='outlined'
                            autoComplete='off'
                            />
 
                        </Grid>
                        <Grid item xs={5} md={4}>
                          <TextField
                            name='TaskNameAR'
                            // value={tasks[task][Object.keys(tasks[task])[1]]}
                            // onChange={(e)=>{
                            //     setTasks((prev)=>({
                            //       ...prev,
                            //         [task] : {
                            //           ...prev[`${task}`],
                            //           [`${Object.keys(tasks[task])[1]}`]: e.target.value
                            //           // [`${Object.keys(tasks[task])[2]}`]: e.target.value
                            //         }
                            //     }))
                            //   }}
                            label="Task Name AR"
                            // label={intl.formatMessage(messages.Question)}
                            fullWidth
                            required
                            variant='outlined'
                            autoComplete='off'
                            />

                        </Grid>
                        <Grid item xs={2} md={1}  
                        container
                        spacing={0}
                        direction="column"
                        justifyContent="center"
                        >
                          <RemoveCircleOutlineIcon 
                            className={`${style.addIconSty} ${classes.colorSty}`}
                            // onClick={()=>{
                            //     setTaskCounter(taskCounter - 1)
                            //   removeQueFun(task)
                            // }}
                            />
                        </Grid>
                    </Grid>
                  
                })
              ) : null
            }

            </CardContent>
            </Card>


          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button>save</Button>
        </DialogActions>
      </Dialog>
    // </React.Fragment>
  );
}


export default StagePopup;
