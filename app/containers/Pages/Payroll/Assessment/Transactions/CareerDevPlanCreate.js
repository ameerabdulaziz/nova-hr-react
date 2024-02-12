import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
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
import api from '../api/CareerDevPlanData';
import messages from '../messages';

function CareerDevPlanCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const authState = useSelector((state) => state.authReducer);
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;
  const title = localStorage.getItem('MenuName');

  const { isHR } = authState.user;

  const [isLoading, setIsLoading] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const actionPlanResultList = [
    {
      name: intl.formatMessage(messages.newJobTitle),
      id: 1,
    },
    {
      name: intl.formatMessage(messages.salaryReview),
      id: 2,
    },
    {
      name: intl.formatMessage(messages.promotion),
      id: 3,
    },
    {
      name: intl.formatMessage(messages.transferInAnotherDepartment),
      id: 4,
    },
    {
      name: intl.formatMessage(messages.other),
      id: 5,
    },
  ];

  const effectiveList = [
    {
      name: intl.formatMessage(messages['1-3-years']),
      id: 3,
    },
    {
      name: intl.formatMessage(messages['3-5-years']),
      id: 4,
    },
    {
      name: intl.formatMessage(messages.immediately),
      id: 1,
    },
    {
      name: intl.formatMessage(messages.nextQuarter),
      id: 2,
    },
    {
      name: intl.formatMessage(messages.other),
      id: 5,
    },
  ];

  const [jobInfo, setJobInfo] = useState({
    currentJob: '',
    reportingto: '',
    hiringDate: '',
    department: '',
    currentSalary: '',
    duties: '',
  });

  const [formInfo, setFormInfo] = useState({
    insDate: new Date(),
    employeeId: null,

    areasOfStrength: '',
    areasForDevelopment: '',
    departmentStructureStatus: '',
    actionPlanToImprove: '',
    goals: '',
    trainingNeeds: '',
    others: '',
    actionPlanResult: null,
    actionPlanResultOther: '',
    actionPlanResultDescription: '',
    effectiveOn: null,
    effectiveOnOtherValue: null,
    action: 0,
  });

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    const formData = {
      ...formInfo,
      insDate: formateDate(formInfo.insDate),
      effectiveOnOtherValue: formateDate(formInfo.effectiveOnOtherValue),
    };

    try {
      await api(locale).save(formData);
      toast.success(notif.saved);
      history.push('/app/Pages/Assessment/CareerDevPlan');
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

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);

        setFormInfo(dataApi);

        setJobInfo({
          department: dataApi.department,
          hiringDate: dataApi.hiringDate,
          currentJob: dataApi.currentJob,
          reportingto: dataApi.reportingto,
          currentSalary: dataApi.currentSalary,
          duties: dataApi.duties ?? '',
        });
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchEmployeeInfo(employeeId) {
    setIsLoading(true);

    try {
      const dataApi = await api(locale).GetEmployeeData(employeeId);

      setJobInfo({
        department: dataApi.department,
        hiringDate: dataApi.hiringDate,
        currentJob: dataApi.currentJob,
        reportingto: dataApi.reportingto,
        currentSalary: dataApi.currentSalary,
        duties: dataApi.duties,
      });
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function onActionBtnClick(actionId) {
    setIsLoading(true);

    try {
      await api(locale).saveAction(id, actionId);
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

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onEmployeeAutoCompleteChange = (value) => {
    setFormInfo((prev) => ({
      ...prev,
      employeeId: value !== null ? value.id : null,
    }));

    if (value !== null) {
      fetchEmployeeInfo(value.id);
    }
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/Assessment/CareerDevPlan');
  };

  return (
    <PayRollLoader isLoading={isLoading}>
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
                        value={formInfo.insDate}
                        onChange={(date) => onDatePickerChange(date, 'insDate')}
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
                      onChange={(_, value) => onEmployeeAutoCompleteChange(value)
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
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={jobInfo.department}
                      label={intl.formatMessage(messages.department)}
                      name='department'
                      disabled
                      fullWidth
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={jobInfo.reportingto}
                      label={intl.formatMessage(messages.reportingTo)}
                      name='reportTo'
                      disabled
                      fullWidth
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={jobInfo.currentSalary}
                      label={intl.formatMessage(messages.currentSalary)}
                      name='currentSalary'
                      disabled
                      fullWidth
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name='hiringData'
                      value={formateDate(jobInfo.hiringDate) ?? ''}
                      label={intl.formatMessage(messages.hiringData)}
                      fullWidth
                      disabled
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name='jobDuties'
                      value={jobInfo.duties}
                      label={intl.formatMessage(messages.currentMainJobDuties)}
                      fullWidth
                      disabled
                      autoComplete='off'
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6'>{title}</Typography>

                <Typography variant='body1' mt={3} color='gray'>
                  {intl.formatMessage(messages.careerDevPlanSection1Message)}
                </Typography>

                <Grid container spacing={3} mt={0} direction='row'>
                  <Grid item xs={12} md={6}>
                    <TextField
                      value={formInfo.areasOfStrength}
                      label={intl.formatMessage(messages.areaOfStrength)}
                      name='areasOfStrength'
                      multiline
                      rows={1}
                      onChange={onInputChange}
                      fullWidth
                      required
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      value={formInfo.areasForDevelopment}
                      label={intl.formatMessage(messages.areaForDevelopment)}
                      name='areasForDevelopment'
                      onChange={onInputChange}
                      fullWidth
                      multiline
                      rows={1}
                      required
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      value={formInfo.departmentStructureStatus}
                      label={intl.formatMessage(
                        messages.departmentStructureStatus
                      )}
                      name='departmentStructureStatus'
                      onChange={onInputChange}
                      fullWidth
                      required
                      multiline
                      rows={1}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      value={formInfo.actionPlanToImprove}
                      label={intl.formatMessage(messages.actionPlanToImprove)}
                      name='actionPlanToImprove'
                      onChange={onInputChange}
                      fullWidth
                      required
                      multiline
                      rows={1}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='goals'
                      value={formInfo.goals}
                      label={intl.formatMessage(messages.goals)}
                      fullWidth
                      required
                      multiline
                      rows={1}
                      onChange={onInputChange}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='trainingNeeds'
                      value={formInfo.trainingNeeds}
                      label={intl.formatMessage(messages.trainingNeeds)}
                      fullWidth
                      required
                      multiline
                      rows={1}
                      onChange={onInputChange}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name='others'
                      value={formInfo.others}
                      label={intl.formatMessage(messages.other)}
                      fullWidth
                      multiline
                      rows={1}
                      onChange={onInputChange}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={actionPlanResultList}
                      value={
                        actionPlanResultList.find(
                          (item) => item.id === formInfo.actionPlanResult
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
                      onChange={(_, value) => onAutoCompleteChange(value, 'actionPlanResult')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(messages.actionPlanResult)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={effectiveList}
                      value={
                        effectiveList.find(
                          (item) => item.id === formInfo.effectiveOn
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
                      onChange={(_, value) => onAutoCompleteChange(value, 'effectiveOn')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(messages.effectiveOn)}
                        />
                      )}
                    />
                  </Grid>

                  {formInfo.effectiveOn === 5 && (
                    <Grid item xs={12} md={4}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.effectiveOnOther)}
                          value={formInfo.effectiveOnOtherValue}
                          onChange={(date) => onDatePickerChange(date, 'effectiveOnOtherValue')
                          }
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField
                              required
                              {...params}
                              variant='outlined'
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  )}

                  {formInfo.actionPlanResult === 5 && (
                    <Grid item xs={12} md={12}>
                      <TextField
                        name='actionPlanResultOther'
                        value={formInfo.actionPlanResultOther}
                        label={intl.formatMessage(
                          messages.actionPlanResultOther
                        )}
                        fullWidth
                        required
                        onChange={onInputChange}
                        multiline
                        rows={1}
                        autoComplete='off'
                      />
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <TextField
                      name='actionPlanResultDescription'
                      value={formInfo.actionPlanResultDescription}
                      label={intl.formatMessage(
                        messages.descriptionOfActionPlanResult
                      )}
                      fullWidth
                      required
                      onChange={onInputChange}
                      multiline
                      rows={1}
                      autoComplete='off'
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {isHR && id !== 0 && (
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ p: '16px!important' }}>
                  <Stack direction='row' gap={2}>
                    <Button
                      variant='contained'
                      color='success'
                      onClick={() => onActionBtnClick(1)}
                    >
                      <FormattedMessage {...messages.accept} />
                    </Button>

                    <Button
                      variant='contained'
                      color='error'
                      onClick={() => onActionBtnClick(2)}
                    >
                      <FormattedMessage {...messages.refuse} />
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )}

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

CareerDevPlanCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CareerDevPlanCreate);
