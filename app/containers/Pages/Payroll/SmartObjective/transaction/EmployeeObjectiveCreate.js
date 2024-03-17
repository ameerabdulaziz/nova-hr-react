import {
  Button,
  Grid,
  InputAdornment,
  TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
// import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
// import api from '../api/EmployeeObjectiveData';
import EmployeeData from '../../Component/EmployeeData';
import messages from '../messages';

function EmployeeObjectiveCreate(props) {
  const { intl } = props;
  const title = localStorage.getItem('MenuName');

  const history = useHistory();
  const location = useLocation();

  const id = location.state?.id ?? 0;

  const locale = useSelector((state) => state.language.locale);

  const { classes } = useStyles();

  const [formInfo, setFormInfo] = useState({
    id,
    employeeId: null,

    dueDate: null,
    weight: '',
    achieved: '',
    weightedScore: '',

    employeeComment: '',
    comment: '',
    objective: '',
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

      const formDate = {
        ...formInfo,
        dueDate: formateDate(formInfo.dueDate),
      };

      console.log(formDate);

      // await api(locale).save(formData);

      // toast.success(notif.saved);
      // history.push('/app/Pages/SmartObjective/EmployeeObjective');
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };
  function onCancelBtnClick() {
    history.push('/app/Pages/SmartObjective/EmployeeObjective');
  }

  async function fetchData() {
    setIsLoading(true);

    try {
      // if (id !== 0) {
      //   const dataApi = await api(locale).getById(id);

      //   setFormInfo(dataApi);
      // }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const handleEmpChange = useCallback((id, name) => {
    if (name === 'employeeId') {
      setFormInfo((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
      }));
    }
  }, []);

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} mt={0}>
            <Grid item xs={12} md={12}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={formInfo.employeeId}
              />
            </Grid>

            <Grid item xs={12} md={6} >
              <TextField
                name='objective'
                multiline
                rows={1}
                value={formInfo.objective}
                onChange={onInputChange}
                label={intl.formatMessage(messages.objective)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={6} >
              <TextField
                name='measurementTool'
                multiline
                rows={1}
                value={formInfo.measurementTool}
                onChange={onInputChange}
                label={intl.formatMessage(messages.measurementTool)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.dueDate)}
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

            <Grid item xs={12} md={3} >
              <TextField
                name='achieved'
                value={formInfo.achieved}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.achieved)}
                fullWidth
                required
                variant='outlined'
                autoComplete='off'
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} md={3} >
              <TextField
                name='weight'
                value={formInfo.weight}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.weight)}
                fullWidth
                required
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={3} >
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
                name='comment'
                multiline
                rows={1}
                value={formInfo.comment}
                onChange={onInputChange}
                label={intl.formatMessage(messages.comment)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='employeeComment'
                multiline
                rows={1}
                value={formInfo.employeeComment}
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
