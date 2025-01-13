import {
     Button, Grid, TextField, Card ,CardContent, Typography,
  } from '@mui/material';
  import notif from 'enl-api/ui/notifMessage';
  import { PapperBlock } from 'enl-components';
  import PropTypes from 'prop-types';
  import React, { useEffect, useState } from 'react';
  import { toast } from 'react-hot-toast';
  import { FormattedMessage, injectIntl } from 'react-intl';
  import { useSelector } from 'react-redux';
  import { useHistory, useLocation } from 'react-router-dom';
  import PayRollLoader from '../../Component/PayRollLoader'; 
  import SaveButton from '../../Component/SaveButton';
  import payrollMessages from '../../messages';
  import api from '../api/StageData';
  import messages from '../messages';
  import style from "../../../../../styles/styles.scss";
  import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
  import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
  import useStyles from '../../Style';
import SITEMAP from '../../../../App/routes/sitemap';

  
  function StageCreate(props) {
    const { intl } = props;
    const { classes } = useStyles();
    const pageTitle = localStorage.getItem('MenuName');
    const locale = useSelector((state) => state.language.locale);
    const location = useLocation();
    const id = location.state?.id ?? 0;
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [taskCounter, setTaskCounter] = useState(0);
    const [taskCounterVals, setTaskCounterVals] = useState(0);
    const [tasks, setTasks] = useState({});
    const [formInfo, setFormInfo] = useState({
      id,
      TaskNameEN: "",
      TaskNameAR: "",
      StageCode: "",
      StageNameEN: "",
      StageNameAR: "",
    });

    
  
    const onFormSubmit = async (evt) => {
      evt.preventDefault();
  
      let tasksArr = []
      let tasksKeys = []

      const data = {
        id: formInfo.id,
        stageCode: formInfo.StageCode,
        arName: formInfo.StageNameAR,
        enName: formInfo.StageNameEN,
      }

      // add first task
      tasksArr.push({
        id: formInfo.TaskId1 ? formInfo.TaskId1 : 0 ,
        stageId: formInfo.StageCode,
        arName: formInfo.TaskNameAR,
        enName: formInfo.TaskNameEN,
      })
      
      
      
      // add rest of Tasks
      Object.keys(tasks).map((item,index)=>{

        tasksKeys = Object.keys(tasks[item])

        tasksArr.push({
          enName: tasks[item][tasksKeys[0]],
          arName: tasks[item][tasksKeys[1]],
          id: tasks[item][tasksKeys[2]] ? tasks[item][tasksKeys[2]] : 0  ,
          stageId: formInfo.StageCode,
        })
        
      })
      

      data.pmStageTask = tasksArr

      setIsLoading(true);
  
      try {
        await api(locale).save(data);
  
        toast.success(notif.saved);
        history.push(SITEMAP.projectManagement.Stage.route);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    };
  
    const onInputChange = (evt) => {
      setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
    };
  
    const onCancelBtnClick = () => {
      history.push(SITEMAP.projectManagement.Stage.route);
    };


    const removeQueFun = (task,ans) => {
      const newObject = { ...tasks };
      delete newObject[task];
      setTasks(newObject)
    }


    const getEditdata =  async () => {
      setIsLoading(true);

      try {
        const data =  await api(locale).GetById(id);

        setFormInfo((prevState) => ({
          ...prevState, 
          id: data.id,
          StageCode: data.stageCode,
          StageNameEN: data.enName,
          StageNameAR: data.arName,
          TaskNameEN: data.pmStageTask.length !== 0 ? data.pmStageTask[0].enName : "",
          TaskNameAR: data.pmStageTask.length !== 0 ? data.pmStageTask[0].arName : "",
          TaskId1: data.pmStageTask.length !== 0 ? data.pmStageTask[0].id : "",
        }))

        setTaskCounter(data.pmStageTask.length > 1 ? data.pmStageTask.length - 1 : 0)
        setTaskCounterVals(data.pmStageTask.length > 1 ? data.pmStageTask.length - 1 : 0)

        if(data.pmStageTask.length > 1)
        {
          data.pmStageTask.map((item,index) =>{

            if(index !== 0)
              {
                setTasks((prev)=>({
                  ...prev,
                  [`tasks${index }`] : {
                    [`taskNameEN${index}`] : item.enName ? item.enName : "",
                    [`taskNameAR${index}`] : item.arName ? item.arName : "",
                    [`TaskId${index}`] : item.id ? item.id : "",
                  }         
                }))
              }

          })
          
        }
        
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    
    };


    useEffect(() => {
      if(id !== 0)
      {
        getEditdata()
      }
      }, [id]);


      const taskFieldsValidationFun = () => {
        if( Object.keys(tasks).length === 0)
        {
          if( formInfo.TaskNameEN.length !== 0  && formInfo.TaskNameAR.length !== 0 )
            {
              return true
            }
            else
            {
              return false
            }
        }
        else
        {
        let tasksCheck =  Object.keys(tasks).map((task)=>{

           if(Object.values(tasks[task]).every(value => {return value !== ''}) )
           {            
             return true
           }
           else
           {
            return false
           }
            
            
          })

          if(tasksCheck.includes(false))
          {
            return false
          }
          else
          {
            return true
          }
        }
      }

    return (
      <PayRollLoader isLoading={isLoading}>
        <PapperBlock whiteBg icon='border_color' desc='' title={pageTitle}>
          <form onSubmit={onFormSubmit}>
              <Grid
                container
                spacing={2}
                mt={0}
                alignItems="flex-start"
                direction="row"
                >
                  <Grid container spacing={3} direction='row' style={{marginTop: "0",marginLeft:"0",marginRight:"0"}}>
                      <Grid item xs={12} md={2}>
                          <TextField
                          name='StageCode'
                          value={formInfo.StageCode}
                          onChange={onInputChange}
                          label={intl.formatMessage(messages.stageCode)}
                          fullWidth
                          variant='outlined'
                          autoComplete='off'
                          />
                      </Grid>
                  </Grid>

                  <Grid container spacing={3} direction='row' style={{marginTop: "0",marginLeft:"0",marginRight:"0"}}>
                    <Grid item xs={12} md={4}>
                          <TextField
                          name='StageNameEN'
                          value={formInfo.StageNameEN}
                          onChange={onInputChange}
                          label={intl.formatMessage(messages.stageNameEN)}
                          fullWidth
                          variant='outlined'
                          autoComplete='off'
                          />
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} direction='row' style={{marginTop: "0",marginLeft:"0",marginRight:"0"}}>
                    <Grid item xs={12} md={4}>
                          <TextField
                          name='StageNameAR'
                          value={formInfo.StageNameAR}
                          onChange={onInputChange}
                          label={intl.formatMessage(messages.stageNameAr)}
                          fullWidth
                          variant='outlined'
                          autoComplete='off'
                          />
                    </Grid>
                  </Grid>
              </Grid>

            <Card className={`${classes.card} ${style.tasksContainerSty}`}  >
                <CardContent>
                  <Typography color='gray' variant='subtitle1' > {"Tasks"}  </Typography>
                  <Grid container spacing={3} direction='row' style={{marginTop: "0"}}>
                    <Grid item xs={5} md={4}>
                        <TextField
                            name='TaskNameEN'
                            value={formInfo.TaskNameEN}
                            onChange={onInputChange}
                            label={intl.formatMessage(messages.TaskNameEN)}
                            fullWidth
                            required
                            variant='outlined'
                            autoComplete='off'
                        />
                    </Grid>

                    <Grid item xs={5} md={4}>
                          <TextField
                              name='TaskNameAR'
                              value={formInfo.TaskNameAR}
                              onChange={onInputChange}
                              required
                              label={intl.formatMessage(messages.TaskNameAR)}
                              fullWidth
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
                      <AddCircleOutlineIcon 
                        className={`${style.addIconSty} ${classes.colorSty}`}
                        onClick={()=>{
                          
                          if(taskFieldsValidationFun())
                          {
                            setTaskCounter(taskCounter + 1)
                            setTaskCounterVals(taskCounterVals + 1)
                            setTasks((prev)=>({
                              ...prev,
                              [`task${taskCounterVals + 1}`] : {
                                [`taskNameEN${taskCounterVals + 1}`] : "",
                                [`taskNameAR${taskCounterVals + 1}`] : "",
                              }
                            }))
                        }
                        else
                        {
                          toast.error(intl.formatMessage(messages.tasksFillFieldsErr));
                        }
                      }}
                        />
                    </Grid>
                  </Grid>

                { tasks && tasks.length !== 0 ? 
                  ( Object.keys(tasks).map((task,index)=>{
                      
                    return <Grid container spacing={3} direction='row' style={{marginTop: "0"}} key={index}>
                              <Grid item xs={5} md={4}>
                                <TextField
                                  name='TaskNameEN'
                                  value={tasks[task][Object.keys(tasks[task])[0]]}
                                  onChange={(e)=>{
                                      setTasks((prev)=>({
                                        ...prev,
                                          [task] : {
                                            ...prev[`${task}`],
                                            [`${Object.keys(tasks[task])[0]}`]: e.target.value
                                          } 
                                      }))
                                    }}
                                    required
                                  label={intl.formatMessage(messages.TaskNameEN)}
                                  fullWidth
                                  variant='outlined'
                                  autoComplete='off'
                                  />
                              </Grid>
                              <Grid item xs={5} md={4}>
                                <TextField
                                  name='TaskNameAR'
                                  value={tasks[task][Object.keys(tasks[task])[1]]}
                                  onChange={(e)=>{
                                      setTasks((prev)=>({
                                        ...prev,
                                          [task] : {
                                            ...prev[`${task}`],
                                            [`${Object.keys(tasks[task])[1]}`]: e.target.value
                                          }
                                      }))
                                    }}
                                  label={intl.formatMessage(messages.TaskNameAR)}
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
                                  onClick={()=>{
                                      setTaskCounter(taskCounter - 1)
                                    removeQueFun(task)
                                  }}
                                  />
                              </Grid>
                          </Grid>
                      
                    })
                  ) : null
                }

                </CardContent>
            </Card>

            <Grid container spacing={3} direction='row' style={{marginTop: "0"}}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item>
                    <SaveButton Id={id} />
                  </Grid>
  
                  <Grid item>
                    <Button
                      variant='contained'
                      size='medium'
                      color='primary'
                      onClick={onCancelBtnClick}
                    >
                      <FormattedMessage {...payrollMessages.cancel} />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </PapperBlock>
      </PayRollLoader>
    );
  }
  
  StageCreate.propTypes = {
    intl: PropTypes.object.isRequired,
  };
  
  export default injectIntl(StageCreate);
  