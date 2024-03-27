import {
  Autocomplete,
  Button,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import GeneralListApis from '../../api/GeneralListApis';
import EmployeeData from '../../Component/EmployeeData';
import PayRollLoader from '../../Component/PayRollLoader';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import useStyles from '../../Style';
import api from '../api/EmployeeObjectiveData';
import messages from '../messages';

function EmployeeObjectiveCreate(props) {
  const { intl } = props;
  const title = localStorage.getItem('MenuName');

  const history = useHistory();
  const location = useLocation();

  const id = location.state?.id ?? 0;

  const locale = useSelector((state) => state.language.locale);
  const authState = useSelector((state) => state.authReducer);
  const { isHR, isManagement } = authState.user;

  const isNormalEmployee = !isHR && !isManagement;

  const { classes } = useStyles();

  const [yearList, setYearList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);

  const [formInfo, setFormInfo] = useState({
    id,
    employeeId: null,
    evaluatorId: '',
    evalDate: '',
    yearId: null,
    monthId: null,

    dueDate: null,
    weight: '',
    execution: '',
    weightedScore: '',

    staffComment: '',
    evalNotes: '',
    objectiveDescription: '',
    measurementTool: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [dateError, setDateError] = useState({});

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);

      const formData = {
        ...formInfo,
        dueDate: formateDate(formInfo.dueDate),
      };

      await api(locale).save(formData);

      toast.success(notif.saved);
      history.push('/app/Pages/SmartObjective/EmployeeObjective');
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };


  function onCancelBtnClick() {
    history.push('/app/Pages/SmartObjective/EmployeeObjective');
  }

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthsList(months);

      if (id !== 0) {
        const dataApi = await api(locale).getById(id);

        setFormInfo(dataApi);
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  useEffect(() => {
    if (formInfo.execution && formInfo.weight) {
      const score = (parseFloat(formInfo.execution) * parseFloat(formInfo.weight)) / 100;

      setFormInfo((prev) => ({
        ...prev,
        weightedScore: score.toFixed(2)
      }));
    }
  }, [formInfo.weight, formInfo.execution]);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const handleEmpChange = useCallback((employeeId, name) => {
    if (name === 'employeeId') {
      setFormInfo((prevFilters) => ({
        ...prevFilters,
        employeeId,
      }));
    }
  }, []);

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} mt={0}>
            <Grid item xs={12} md={12}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={formInfo.employeeId}
                isdisabled={isNormalEmployee}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name='objectiveDescription'
                multiline
                rows={1}
                value={formInfo.objectiveDescription}
                onChange={onInputChange}
                label={intl.formatMessage(messages.objective)}
                fullWidth
                required
                variant='outlined'
                autoComplete='off'
                disabled={isNormalEmployee}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name='measurementTool'
                multiline
                rows={1}
                value={formInfo.measurementTool}
                required
                onChange={onInputChange}
                label={intl.formatMessage(messages.measurementTool)}
                fullWidth
                variant='outlined'
                disabled={isNormalEmployee}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.dueDate)}
                  disabled={isNormalEmployee}
                  value={formInfo.dueDate ? dayjs(formInfo.dueDate) : null}
                  className={classes.field}
                  onChange={(date) => {
                    setFormInfo((prevFilters) => ({
                      ...prevFilters,
                      dueDate: date,
                    }));
                  }}
                  onError={(error) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        dueDate: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        dueDate: false,
                      }));
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

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={yearList}
                disabled={isNormalEmployee}
                value={getAutoCompleteValue(yearList, formInfo.yearId)}
                onChange={(_, value) => onAutoCompleteChange(value, 'yearId')}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id + option.name}>
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    disabled={isNormalEmployee}
                    label={intl.formatMessage(payrollMessages.year)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={monthsList}
                disabled={isNormalEmployee}
                value={getAutoCompleteValue(monthsList, formInfo.monthId)}
                onChange={(_, value) => onAutoCompleteChange(value, 'monthId')}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id + option.name}>
                    {option.name}
                  </li>
                )}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    disabled={isNormalEmployee}
                    label={intl.formatMessage(payrollMessages.month)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='execution'
                value={formInfo.execution}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.achieved)}
                fullWidth
                required
                disabled={isNormalEmployee}
                variant='outlined'
                autoComplete='off'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>%</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='weight'
                value={formInfo.weight}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.weight)}
                fullWidth
                disabled={isNormalEmployee}
                required
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='weightedScore'
                value={formInfo.weightedScore}
                disabled
                label={intl.formatMessage(messages.weightedScore)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='evalNotes'
                multiline
                rows={1}
                value={formInfo.evalNotes}
                onChange={onInputChange}
                label={intl.formatMessage(messages.comment)}
                fullWidth
                disabled={isNormalEmployee}
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='staffComment'
                multiline
                rows={1}
                value={formInfo.staffComment}
                onChange={onInputChange}
                label={intl.formatMessage(messages.employeeComment)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item>
                  <Button variant='contained' type='submit'>
                    {intl.formatMessage(payrollMessages.save)}
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={onCancelBtnClick}
                  >
                    {intl.formatMessage(payrollMessages.cancel)}
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

EmployeeObjectiveCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeObjectiveCreate);
