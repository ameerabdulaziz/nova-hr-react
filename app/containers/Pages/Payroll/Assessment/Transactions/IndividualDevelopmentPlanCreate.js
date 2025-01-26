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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
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
import { formateDate, uuid } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/IndividualDevelopmentPlanData';
import DevelopmentPlanPopup from '../components/IndividualDevelopmentPlan/DevelopmentPlanPopup';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function IndividualDevelopmentPlanCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const authState = useSelector((state) => state.authReducer);
  const id = location.state?.id ?? 0;
  const title = localStorage.getItem('MenuName');

  const { isHR } = authState.user;

  const [employeeList, setEmployeeList] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDevelopmentPlanPopupOpen, setIsDevelopmentPlanPopupOpen] = useState(false);
  const [selectedDevelopmentPlan, setSelectedDevelopmentPlan] = useState(null);
  const [dateError, setDateError] = useState({});

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

    asIndividualDevelopmentPlanDetails: [],
  });

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    setIsLoading(true);

    const formData = {
      id,
      yearId: 0,
      employeeId: formInfo.employeeId,

      insertDate: formateDate(formInfo.insertDate),
      asIndividualDevelopmentPlanDetails:
				formInfo.asIndividualDevelopmentPlanDetails.map((item) => ({
				  individualDevelopmentPlanId: id,
				  areasToImprove: item.areasToImprove,
				  targetPerformance: item.targetPerformance,
				  developmentActivitiesName: item.developmentActivitiesName,
				  resources: item.resources,
				  dateForCompletion: formateDate(item.dateForCompletion),
				  developmentActivities: item.developmentActivities,
				  otherDevelopmentActivities: item.otherDevelopmentActivities,
				})),
    };

    try {
      await api(locale).save(formData);
      toast.success(notif.saved);
      history.push(SITEMAP.assessment.IndividualDevelopmentPlan.route);
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
        setJobInfo({
          department: dataApi.department,
          hiringDate: dataApi.hiringDate,
          currentJob: dataApi.currentJob,
          reportingto: dataApi.reportingto,
          currentSalary: dataApi.currentSalary,
          duties: dataApi.duties,
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
      const dataApi = await api(locale).GetById(id, employeeId);

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

  const onEmployeeAutoCompleteChange = (value) => {
    setFormInfo((prev) => ({
      ...prev,
      employeeId: value !== null ? value.id : null,
    }));

    if (value !== null) {
      fetchEmployeeInfo(value.id);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onCancelBtnClick = () => {
    history.push(SITEMAP.assessment.IndividualDevelopmentPlan.route);
  };

  useEffect(() => {
    if (selectedDevelopmentPlan) {
      setIsDevelopmentPlanPopupOpen(true);
    }
  }, [selectedDevelopmentPlan]);

  const onDevelopmentPlanSave = (employee) => {
    if (selectedDevelopmentPlan) {
      const cloned = [...formInfo.asIndividualDevelopmentPlanDetails];
      const index = cloned.findIndex((item) => item.id === employee.id);
      if (index !== -1) {
        cloned[index] = employee;
        setFormInfo((prev) => ({
          ...prev,
          asIndividualDevelopmentPlanDetails: cloned,
        }));
      }
      setSelectedDevelopmentPlan(null);
    } else {
      setFormInfo((prev) => ({
        ...prev,
        asIndividualDevelopmentPlanDetails: [
          ...prev.asIndividualDevelopmentPlanDetails,
          { ...employee, id: uuid() },
        ],
      }));
    }

    setIsDevelopmentPlanPopupOpen(false);
  };

  const onPlanRemove = (id) => {
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

  const onDevelopmentPlanEdit = (item) => {
    setSelectedDevelopmentPlan(item);
  };

  const onDevelopmentPlanPopupBtnClick = () => {
    setIsDevelopmentPlanPopupOpen(true);
  };

  const getActivityName = (id) => {
    const item = activityList.find((item) => item.id === id);

    if (item) {
      return item.name;
    }

    return '';
  };

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

  return (
    <PayRollLoader isLoading={isLoading}>
      <DevelopmentPlanPopup
        isOpen={isDevelopmentPlanPopupOpen}
        setIsOpen={setIsDevelopmentPlanPopupOpen}
        onSave={onDevelopmentPlanSave}
        selectedPlan={selectedDevelopmentPlan}
        activityList={activityList}
        setSelectedPlan={setSelectedDevelopmentPlan}
      />

      <form onSubmit={onFormSubmit}>
        <Grid container spacing={2} direction='row'>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6'>{title}</Typography>

                <Grid container spacing={3} mt={0} direction='row'>
                  <Grid item xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={intl.formatMessage(messages.date)}
                        value={
                          formInfo.insertDate
                            ? dayjs(formInfo.insertDate)
                            : null
                        }
                        className={classes.field}
                        onChange={(date) => onDatePickerChange(date, 'insertDate')
                        }
                        onError={(error) => {
                          if (error !== null) {
                            setDateError((prevState) => ({
                              ...prevState,
                              insertDate: true,
                            }));
                          } else {
                            setDateError((prevState) => ({
                              ...prevState,
                              insertDate: false,
                            }));
                          }
                        }}
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
                <Grid
                  container
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Grid item>
                    <Typography variant='h6'>
                      {intl.formatMessage(messages.developmentPlan)}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Button
                      variant='contained'
                      onClick={onDevelopmentPlanPopupBtnClick}
                      color='primary'
                    >
                      {intl.formatMessage(messages.addDevelopmentPlan)}
                    </Button>
                  </Grid>
                </Grid>

                {formInfo.asIndividualDevelopmentPlanDetails.length > 0 ? (
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} size='small'>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            {intl.formatMessage(messages.areaToImprove)}
                          </TableCell>

                          <TableCell>
                            {intl.formatMessage(messages.targetOfPerformance)}
                          </TableCell>

                          <TableCell>
                            {intl.formatMessage(messages.developmentActivity)}
                          </TableCell>

                          <TableCell>
                            {intl.formatMessage(messages.resources)}
                          </TableCell>

                          <TableCell>
                            {intl.formatMessage(messages.dateForCompletion)}
                          </TableCell>

                          <TableCell>
                            {intl.formatMessage(messages.actions)}
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {formInfo.asIndividualDevelopmentPlanDetails.map(
                          (item) => (
                            <TableRow
                              key={item.id}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component='th' scope='row'>
                                {item.areasToImprove}
                              </TableCell>

                              <TableCell>{item.targetPerformance}</TableCell>

                              <TableCell>
                                {getActivityName(item.developmentActivities)}
                              </TableCell>

                              <TableCell>{item.resources}</TableCell>

                              <TableCell>
                                {formateDate(item.dateForCompletion)}
                              </TableCell>

                              <TableCell>
                                <Stack direction='row' gap={2}>
                                  <IconButton
                                    color='primary'
                                    size='small'
                                    onClick={() => onDevelopmentPlanEdit(item)}
                                  >
                                    <BorderColor />
                                  </IconButton>

                                  <IconButton
                                    color='error'
                                    size='small'
                                    onClick={() => onPlanRemove(item.id)}
                                  >
                                    <Delete />
                                  </IconButton>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
                        {intl.formatMessage(messages.noDevelopmentPlan)}
                      </Typography>
                    </Box>
                  </Stack>
                )}
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

IndividualDevelopmentPlanCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(IndividualDevelopmentPlanCreate);
