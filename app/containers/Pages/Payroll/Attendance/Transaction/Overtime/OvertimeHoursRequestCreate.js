import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import {  LocalizationProvider } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import PayRollLoader from '../../../Component/PayRollLoader';
import SaveButton from '../../../Component/SaveButton';
import useStyles from '../../../Style';
import GeneralListApis from '../../../api/GeneralListApis';
import payrollMessages from '../../../messages';
import api from '../../api/OvertimeHoursRequestData';
import messages from '../../messages';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Payrollmessages from "../../../messages";

function OvertimeHoursRequestCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;

  const title = localStorage.getItem('MenuName');

  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formInfo, setFormInfo] = useState({
    id,

    employeeId: '',
    trxDate: new Date(),
    startTime: '',
    endTime: '',
    minutesCount: '',
    notes: '',
  });

  const [DateError, setDateError] = useState({});

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    const formData = {
      id,

      employeeId: formInfo.employeeId,
      trxDate: formateDate(formInfo.trxDate),
      startTime: formInfo.startTime,
      endTime: formInfo.endTime,
      minutesCount: formInfo.minutesCount,
      notes: formInfo.notes,
    };

    setIsLoading(true);

    try {
      await api(locale).save(formData);
      toast.success(notif.saved);
      history.push('/app/Pages/Att/OvertimeHoursRequest');
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
        setFormInfo({
          ...dataApi,
          startTime: format(new Date(dataApi.startTime), 'hh:mm:ss'),
          endTime: format(new Date(dataApi.endTime), 'hh:mm:ss'),
        });
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

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const calculateMinutesDiff = (firstTime, secondTime) => {
    if (firstTime && secondTime) {
      return Math.round(
        (new Date(0, 0, 0, firstTime.split(':')[0], firstTime.split(':')[1])
					- new Date(
					  0,
					  0,
					  0,
					  secondTime.split(':')[0],
					  secondTime.split(':')[1]
					))
					/ 60000
      );
    }

    return 0;
  };

  const onTimePickerChange = (evt) => {
    if (evt.target.name === 'startTime') {
      if (formInfo.endTime) {
        setFormInfo((prev) => ({
          ...prev,
          [evt.target.name]: evt.target.value,
          minutesCount: calculateMinutesDiff(
            formInfo.endTime,
            evt.target.value
          ),
        }));
      } else {
        setFormInfo((prev) => ({
          ...prev,
          [evt.target.name]: evt.target.value,
        }));
      }
    } else if (evt.target.name === 'endTime') {
      if (formInfo.startTime) {
        setFormInfo((prev) => ({
          ...prev,
          [evt.target.name]: evt.target.value,
          minutesCount: calculateMinutesDiff(
            evt.target.value,
            formInfo.startTime
          ),
        }));
      } else {
        setFormInfo((prev) => ({
          ...prev,
          [evt.target.name]: evt.target.value,
        }));
      }
    }
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/Att/OvertimeHoursRequest');
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={3}>
              <Autocomplete
                options={employeeList}
                value={
                  employeeList.find(
                    (item) => item.id === formInfo.employeeId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'employeeId')
                }
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.employeeName)}
                  />
                )}
              />
            </Grid>

                <Grid item xs={12} md={3}>  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                        label={intl.formatMessage(payrollMessages.date)}
                        value={formInfo.trxDate ? dayjs(formInfo.trxDate) : null}
                        className={classes.field}
                        onChange={(date) => {
                          onDatePickerChange(date, 'trxDate')
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`trxDate`]: true
                            }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`trxDate`]: false
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
          </Grid>

          <Grid container spacing={3} mt={0} direction='row'>
            <Grid item xs={12} md={3}>
              <TextField
                value={formInfo.startTime}
                label={intl.formatMessage(messages.startTime)}
                type='time'
                name='startTime'
                onChange={onTimePickerChange}
                className={classes.field}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                value={formInfo.endTime}
                label={intl.formatMessage(messages.endTime)}
                type='time'
                name='endTime'
                onChange={onTimePickerChange}
                className={classes.field}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                value={formInfo.minutesCount}
                label={intl.formatMessage(messages.minutesCount)}
                name='minutesCount'
                disabled
                className={classes.field}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='notes'
                value={formInfo.notes}
                onChange={onInputChange}
                label={intl.formatMessage(payrollMessages.notes)}
                className={classes.field}
                variant='outlined'
                multiline
                rows={1}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={1}>
                  <SaveButton Id={id} processing={isLoading} />
                </Grid>

                <Grid item xs={12} md={1}>
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

OvertimeHoursRequestCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OvertimeHoursRequestCreate);
