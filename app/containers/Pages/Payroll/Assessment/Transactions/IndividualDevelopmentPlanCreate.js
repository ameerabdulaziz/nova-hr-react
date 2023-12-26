import { BorderColor, Delete } from '@mui/icons-material';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { format } from 'date-fns';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/IndividualDevelopmentPlanData';
import EmploymentPopup from '../components/IndividualDevelopmentPlan/EmploymentPopup';
import messages from '../messages';

const uuid = () => {
  const S4 = () => ((1 + Math.random()) * 0x10000 || 0).toString(16).substring(1);
  return (
    S4()
    + S4()
    + '-'
    + S4()
    + '-'
    + S4()
    + '-'
    + S4()
    + '-'
    + S4()
    + S4()
    + S4()
  );
};

function IndividualDevelopmentPlanCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;
  const title = localStorage.getItem('MenuName');

  const [employeeList, setEmployeeList] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isEmployeePopupOpen, setIsEmployeePopupOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [jobInfo, setJobInfo] = useState({
    currentJob: '',
    reportTo: '',
    hiringData: '',
    department: '',
    salary: '',
    jobDuties: '',
  });

  const [formInfo, setFormInfo] = useState({
    id,

    date: new Date(),
    employeeId: null,

    asIndividualDevelopmentPlanDetails: [],
  });

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    const formData = {
      ...formInfo,
      date: formateDate(formInfo.date),
    };

    try {
      await api(locale).save(formData);
      toast.success(notif.saved);
      history.push('/app/Pages/Assessment/IndividualDevelopmentPlan');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const activity = await api(locale).GetDevelopmentActivitiesList();
      setActivityList(activity);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);

        setFormInfo(dataApi);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/Assessment/IndividualDevelopmentPlan');
  };

  useEffect(() => {
    if (selectedEmployee) {
      setIsEmployeePopupOpen(true);
    }
  }, [selectedEmployee]);

  const onEmployeeSave = (item) => {
    if (selectedEmployee) {
      const cloned = [...formInfo.asIndividualDevelopmentPlanDetails];
      const index = cloned.findIndex((item) => item.id === item.id);
      if (index !== -1) {
        cloned[index] = item;
        setFormInfo((prev) => ({
          ...prev,
          asIndividualDevelopmentPlanDetails: cloned,
        }));
      }
      setSelectedEmployee(null);
    } else {
      setFormInfo((prev) => ({
        ...prev,
        asIndividualDevelopmentPlanDetails: [
          ...prev.asIndividualDevelopmentPlanDetails,
          { ...item, id: uuid() },
        ],
      }));
    }

    setIsEmployeePopupOpen(false);
  };

  const onEmployeeRemove = (id) => {
    const cloned = [...formInfo.asIndividualDevelopmentPlanDetails];
    const indexToRemove = cloned.findIndex((item) => item.id === id);

    if (indexToRemove !== -1) {
      cloned.splice(indexToRemove, 1);
      setFormInfo((prev) => ({
        ...prev,
        asIndividualDevelopmentPlanDetails: cloned,
      }));
    }
  };

  const onEmployeeEdit = (skill) => {
    setSelectedEmployee(skill);
  };

  const onEmployeePopupBtnClick = () => {
    setIsEmployeePopupOpen(true);
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <EmploymentPopup
        isOpen={isEmployeePopupOpen}
        setIsOpen={setIsEmployeePopupOpen}
        onSave={onEmployeeSave}
        selectedEmployee={selectedEmployee}
        activityList={activityList}
        setSelectedEmployee={setSelectedEmployee}
      />

      <form onSubmit={onFormSubmit}>
        <Grid container spacing={2} direction='row'>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6'>{title}</Typography>

                <Grid container spacing={3} mt={0} direction='row'>
                  <Grid item xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        label={intl.formatMessage(messages.date)}
                        value={formInfo.date}
                        onChange={(date) => onDatePickerChange(date, 'date')}
                        className={classes.field}
                        renderInput={(params) => (
                          <TextField required {...params} variant='outlined' />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={employeeList}
                      value={
                        employeeList.find(
                          (item) => item.id === formInfo.employeeId
                        ) ?? null
                      }
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={(_, value) => onAutoCompleteChange(value, 'employeeId')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(messages.employeeName)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={jobInfo.currentJob}
                      label={intl.formatMessage(messages.currentJobName)}
                      name='currentJob'
                      disabled
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={jobInfo.department}
                      label={intl.formatMessage(messages.department)}
                      name='department'
                      disabled
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={jobInfo.reportTo}
                      label={intl.formatMessage(messages.reportingTo)}
                      name='reportTo'
                      disabled
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={jobInfo.salary}
                      label={intl.formatMessage(messages.currentSalary)}
                      name='currentSalary'
                      disabled
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name='hiringData'
                      value={formateDate(jobInfo.hiringData)}
                      label={intl.formatMessage(messages.hiringData)}
                      fullWidth
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name='jobDuties'
                      value={jobInfo.jobDuties}
                      label={intl.formatMessage(messages.currentMainJobDuties)}
                      fullWidth
                      disabled
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Grid
                  container
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Grid item>
                    <Typography variant='h6'>
                      {intl.formatMessage(messages.employees)}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Button
                      variant='contained'
                      onClick={onEmployeePopupBtnClick}
                      color='primary'
                    >
                      {intl.formatMessage(messages.addEmployee)}
                    </Button>
                  </Grid>
                </Grid>

                {formInfo.asIndividualDevelopmentPlanDetails.length > 0 ? (
                  <Grid container spacing={3} mt={0} alignItems='stretch'>
                    {formInfo.asIndividualDevelopmentPlanDetails.map((item) => (
                      <Grid item xs={12} key={item.id} md={4}>
                        <Card
                          variant='outlined'
                          sx={{
                            position: 'relative',
                            overflow: 'visible',
                          }}
                        >
                          <IconButton
                            size='small'
                            sx={{
                              right: '5px',
                              position: 'absolute',
                              top: '-12px',
                              backgroundColor: '#eee',
                            }}
                            onClick={() => onEmployeeEdit(item)}
                          >
                            <BorderColor sx={{ fontSize: '1rem' }} />
                          </IconButton>

                          <IconButton
                            size='small'
                            color='error'
                            sx={{
                              right: '35px',
                              position: 'absolute',
                              top: '-12px',
                              backgroundColor: '#eee',
                            }}
                            onClick={() => onEmployeeRemove(item.id)}
                          >
                            <Delete sx={{ fontSize: '1rem' }} />
                          </IconButton>

                          <CardContent sx={{ p: '16px!important' }}>
                            <Typography variant='body2' color='text.secondary'>
                              {activityList.find(
                                (activity) => activity.id === item.levelId
                              )?.name ?? ''}
                            </Typography>

                            <Typography>{item.description}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Stack
                    direction='row'
                    sx={{ minHeight: 200 }}
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                  >
                    <Box>
                      <SensorOccupiedIcon
                        sx={{ color: '#a7acb2', fontSize: 30 }}
                      />
                      <Typography color='#a7acb2' variant='body1'>
                        {intl.formatMessage(messages.noEmployees)}
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Stack direction='row' gap={2}>
                  <Button
                    variant='contained'
                    type='submit'
                    size='medium'
                    color='secondary'
                  >
                    <FormattedMessage {...payrollMessages.save} />
                  </Button>

                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    onClick={onCancelBtnClick}
                  >
                    <FormattedMessage {...payrollMessages.cancel} />
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </PayRollLoader>
  );
}

IndividualDevelopmentPlanCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(IndividualDevelopmentPlanCreate);
