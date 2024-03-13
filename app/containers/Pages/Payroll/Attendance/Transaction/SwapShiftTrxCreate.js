import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/SwapShiftTrxData';
import messages from '../messages';

function SwapShiftTrxCreate(props) {
  const { intl } = props;

  const title = localStorage.getItem('MenuName');

  const history = useHistory();
  const { classes } = useStyles();

  const locale = useSelector((state) => state.language.locale);

  const [shiftList, setShiftList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateError, setDateError] = useState({});
  const [formInfo, setFormInfo] = useState({
    attendanceDate: null,
    shiftId: null,
    swapShiftId: null,
    swapStartTime: '',
    swapEndTime: '',
    workHours: '',
  });

  const extractTime = (time) => {
    const date = new Date();
    const splittedTime = time.split(':');
    date.setHours(splittedTime[0]);
    date.setMinutes(splittedTime[1]);
    return date.getTime();
  };

  useEffect(() => {
    if (formInfo.swapEndTime && formInfo.swapStartTime) {
      const timeDifference = extractTime(formInfo.swapEndTime) - extractTime(formInfo.swapStartTime);
      const diffToMinutes = timeDifference / (60 * 60 * 1000);
      const workHours = diffToMinutes < 0 ? diffToMinutes * -1 : diffToMinutes;
      const formattedHours = workHours % 1 === 0 ? `${workHours}` : `${workHours.toFixed(3)}`;

      setFormInfo((prevFilters) => ({
        ...prevFilters,
        workHours: formattedHours,
      }));
    }
  }, [formInfo.swapStartTime, formInfo.swapEndTime]);

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
        id: 0,
        attendanceDate: formateDate(formInfo.attendanceDate),
        shiftId: formInfo.shiftId,
        swapShiftId: formInfo.swapShiftId,
        notes: '',
      };

      await api(locale).save(formData);

      history.push('/app/Pages/Att/SwapShiftTrx');
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  function onCancel() {
    history.push('/app/Pages/Att/SwapShiftTrx');
  }

  async function fetchData() {
    setIsLoading(true);

    try {
      const shifts = await GeneralListApis(locale).GetShiftList();
      setShiftList(shifts);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchAttendanceDateInfo() {
    setIsLoading(true);

    try {
      const shiftInfo = await api(locale).getAttendanceDate(formateDate(formInfo.attendanceDate));

      setFormInfo((prev) => ({
        ...prev,
        shiftId: shiftInfo.shiftCode,
        swapStartTime: shiftInfo.startTime,
        swapEndTime: shiftInfo.endTime,
      }));
    } catch (err) {
      setFormInfo((prev) => ({
        ...prev,
        shiftId: null,
        swapStartTime: '',
        swapEndTime: '',
        workHours: '',
      }));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (formInfo.attendanceDate) {
      fetchAttendanceDateInfo();
    }
  }, [formInfo.attendanceDate]);

  useEffect(() => {
    fetchData();
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
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.AttendanceDate)}
                  minDate={dayjs()}
                  value={
                    formInfo.attendanceDate
                      ? dayjs(formInfo.attendanceDate)
                      : null
                  }
                  className={classes.field}
                  onChange={(date) => {
                    setFormInfo((prevFilters) => ({
                      ...prevFilters,
                      attendanceDate: date,
                    }));
                  }}
                  onError={(error) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        attendanceDate: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        attendanceDate: false,
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
                options={shiftList}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option.name ? option.name : '')}
                value={getAutoCompleteValue(shiftList, formInfo.shiftId)}
                disabled
                renderInput={(params) => (
                  <TextField
                    variant='outlined'
                    {...params}
                    disabled
                    label={intl.formatMessage(messages.shiftName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={shiftList}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option.name ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'swapShiftId')
                }
                value={getAutoCompleteValue(shiftList, formInfo.swapShiftId)}
                renderInput={(params) => (
                  <TextField
                    variant='outlined'
                    {...params}
                    required
                    label={intl.formatMessage(messages.swapShift)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='swapStartTime'
                value={formInfo.swapStartTime}
                label={intl.formatMessage(messages.startTime)}
                type='time'
                fullWidth
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='swapEndTime'
                value={formInfo.swapEndTime}
                label={intl.formatMessage(messages.endTime)}
                type='time'
                fullWidth
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='workHours'
                value={formInfo.workHours}
                disabled
                label={intl.formatMessage(messages.hours)}
                fullWidth
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
                    onClick={onCancel}
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
SwapShiftTrxCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(SwapShiftTrxCreate);
