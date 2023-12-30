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
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;
  const title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [actionPlanResultList, setActionPlanResultList] = useState([]);
  const [effectiveList, setEffectiveList] = useState([]);

  const [jobInfo, setJobInfo] = useState({
    currentJob: '',
    reportingto: '',
    hiringDate: '',
    department: '',
    currentSalary: '',
    duties: '',
  });

  const [formInfo, setFormInfo] = useState({
    insertDate: new Date(),
    employeeId: null,

    areaOfStrength: '',
    areaForDevelopment: '',
    departmentStructureStatus: '',
    actionPlanToImprove: '',
    goals: '',
    trainingNeeds: '',
    other: '',
    actionPlanResultOther: '',
    effectiveOnOther: '',
    descriptionOfActionPlanResult: '',
    actionPlanResult: null,
    effectiveOn: null,
  });

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    const formData = {
      ...formInfo,
      insertDate: formateDate(formInfo.insertDate),
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

  async function fetchEmployeeInfo() {
    setIsLoading(true);

    try {
      const dataApi = await api(locale).GetById(id, formInfo.employeeId);

      setJobInfo({
        department: dataApi.department,
        hiringDate: dataApi.hiringDate,
        currentJob: dataApi.currentJob,
        reportingto: dataApi.reportingto,
        currentSalary: dataApi.currentSalary,
        duties: dataApi.duties ?? '',
      });
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (formInfo.employeeId !== null) {
      fetchEmployeeInfo();
    }
  }, [formInfo.employeeId]);

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
                        value={formInfo.insertDate}
                        onChange={(date) => onDatePickerChange(date, 'insertDate')
                        }
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
                      value={jobInfo.reportingto}
                      label={intl.formatMessage(messages.reportingTo)}
                      name='reportTo'
                      disabled
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={jobInfo.currentSalary}
                      label={intl.formatMessage(messages.currentSalary)}
                      name='currentSalary'
                      disabled
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name='hiringData'
                      value={formateDate(jobInfo.hiringDate) ?? ''}
                      label={intl.formatMessage(messages.hiringData)}
                      fullWidth
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name='jobDuties'
                      value={jobInfo.duties}
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
                <Typography variant='h6'>{title}</Typography>

                <Typography variant='body1' mt={3} color='gray'>
                  {intl.formatMessage(messages.careerDevPlanSection1Message)}
                </Typography>

                <Grid container spacing={3} mt={0} direction='row'>
                  <Grid item xs={12} md={6}>
                    <TextField
                      value={formInfo.areaOfStrength}
                      label={intl.formatMessage(messages.areaOfStrength)}
                      name='areaOfStrength'
                      multiline
                      rows={1}
                      onChange={onInputChange}
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      value={formInfo.areaForDevelopment}
                      label={intl.formatMessage(messages.areaForDevelopment)}
                      name='areaForDevelopment'
                      onChange={onInputChange}
                      fullWidth
                      multiline
                      rows={1}
                      required
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
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name='other'
                      value={formInfo.other}
                      label={intl.formatMessage(messages.other)}
                      fullWidth
                      multiline
                      rows={1}
                      onChange={onInputChange}
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

                  {formInfo.actionPlanResult === 0 && (
                    <Grid item xs={12} md={6}>
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
                      />
                    </Grid>
                  )}

                  {formInfo.effectiveOn === 0 && (
                    <Grid item xs={12} md={6}>
                      <TextField
                        name='effectiveOnOther'
                        value={formInfo.effectiveOnOther}
                        label={intl.formatMessage(messages.effectiveOnOther)}
                        fullWidth
                        required
                        onChange={onInputChange}
                        multiline
                        rows={1}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <TextField
                      name='descriptionOfActionPlanResult'
                      value={formInfo.descriptionOfActionPlanResult}
                      label={intl.formatMessage(
                        messages.descriptionOfActionPlanResult
                      )}
                      fullWidth
                      required
                      onChange={onInputChange}
                      multiline
                      rows={1}
                    />
                  </Grid>
                </Grid>
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

CareerDevPlanCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CareerDevPlanCreate);
