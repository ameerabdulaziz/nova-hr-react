import {
  Autocomplete, Button, Grid, Stack, TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import GeneralListApis from '../../api/GeneralListApis';
import PayRollLoader from '../../Component/PayRollLoader';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/TrainingRequestListData';
import TrainingList from '../components/TrainingRequestList/TrainingList';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function TrainingRequestListCreate(props) {
  const { intl } = props;

  const pageTitle = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const history = useHistory();

  const id = location.state?.id ?? 0;

  const [employeeList, setEmployeeList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  const [trainingCourse, setTrainingCourse] = useState([]);

  const [dateError, setDateError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    id,

    notes: '',
    trainingDate: dayjs().add(1, 'day'),
    courseId: null,
    trainingId: null,
    employeeId: null,
    requestDate: dayjs(),
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const employeesResponse = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employeesResponse);

      const courses = await GeneralListApis(locale).GetCourseList();
      setCourseList(courses);

      if (id) {
        const response = await api(locale).getById(id);
        const improvedResponse = {
          ...response,
          notes: response.notes ?? '',
          trainingDate: dayjs(response.trainingDate),
          requestDate: dayjs(response.requestDate),
        };

        setFormInfo(improvedResponse);

        const trainingCourses = await api(locale).getTrainingByCourseId(response.courseId);

        setTrainingCourse(trainingCourses);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    const body = {
      ...formInfo,
      trainingDate: formateDate(formInfo.trainingDate),
      requestDate: formateDate(formInfo.requestDate),
    };

    setIsLoading(true);

    try {
      await api(locale).save(body);

      toast.success(notif.saved);
      history.push(SITEMAP.training.TrainingRequestList.route);
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
    history.push(SITEMAP.training.TrainingRequestList.route);
  };

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onCourseAutoCompleteChange = async (value) => {
    setFormInfo((prev) => ({
      ...prev,
      courseId: value !== null ? value.id : null,
    }));

    if (value) {
      setIsLoading(true);

      try {
        const courses = await api(locale).getTrainingByCourseId(value.id);

        setTrainingCourse(courses);
      } catch (error) {
      //
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.requestDate)}
                  value={formInfo.requestDate}
                  sx={{ width: '100%' }}
                  disabled
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.trainingDate)}
                  value={
                    formInfo.trainingDate ? dayjs(formInfo.trainingDate) : null
                  }
                  sx={{ width: '100%' }}
                  onChange={(date) => onDatePickerChange(date, 'trainingDate')}
                  minDate={dayjs().add(1, 'day')}
                  onError={(error) => {
                    setDateError((prevState) => ({
                      ...prevState,
                      trainingDate: error !== null,
                    }));
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={employeeList}
                value={getAutoCompleteValue(employeeList, formInfo.employeeId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
                    label={intl.formatMessage(payrollMessages.employeeName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={courseList}
                value={getAutoCompleteValue(courseList, formInfo.courseId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onCourseAutoCompleteChange(value)}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.courseName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='notes'
                value={formInfo.notes}
                onChange={onInputChange}
                label={intl.formatMessage(messages.noteRequest)}
                fullWidth
                variant='outlined'
                autoComplete='off'
                multiline
                rows={1}
              />
            </Grid>

            {trainingCourse.length > 0 && (
              <Grid item xs={12}>
                <TrainingList
                  trainingCourse={trainingCourse}
                  setFormInfo={setFormInfo}
                  formInfo={formInfo}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Stack direction='row' gap={2}>
                <Button variant='contained' color='secondary' type='submit'>
                  {intl.formatMessage(payrollMessages.save)}
                </Button>

                <Button
                  variant='contained'
                  color='primary'
                  onClick={onCancelBtnClick}
                >
                  {intl.formatMessage(payrollMessages.cancel)}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

TrainingRequestListCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TrainingRequestListCreate);
