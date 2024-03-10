import {
  Autocomplete,
  Button,
  Grid,
  TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/HrEmployeeDocumentTrxData';
import messages from '../messages';

function HrEmployeeDocumentTrxCreate(props) {
  const { intl } = props;
  const title = localStorage.getItem('MenuName');

  const history = useHistory();
  const location = useLocation();
  const id = location.state?.id ?? 0;

  const locale = useSelector((state) => state.language.locale);

  const { classes } = useStyles();

  const [userInfo, setUserInfo] = useState({
    id: '',
    employeeCode: '',
    name: '',
    address: null,
    hiringDate: '',
    workEmail: '',
    telPhone: '',
    mobile: '',
    jobName: '',
    organizationName: '',
    photo: '',
    reportToName: '',
    socialStatusName: '',
    employeeJobKpi: [],
    jobDescription: [],
  });

  const [formInfo, setFormInfo] = useState({
    id,
    date: null,
    returnDate: null,
    empDocumentId: null,
    notes: '',
  });

  const [documentTypeList, setDocumentTypeList] = useState([]);
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
        date: formateDate(formInfo.date),
        returnDate: formateDate(formInfo.returnDate),
        employeeId: userInfo.id,
      };

      await api(locale).save(formData);

      toast.success(notif.saved);
      history.push('/app/Pages/HR/HrEmployeeDocumentTrx');
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };
  function oncancel() {
    history.push('/app/Pages/HR/HrEmployeeDocumentTrx');
  }

  async function fetchData() {
    setIsLoading(true);

    try {
      const docs = await api(locale).getDocList();
      setDocumentTypeList(docs);

      const info = await api(locale).getUserInfo();
      setUserInfo(info);

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
    fetchData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

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
            <Grid item xs={12} md={3}>
              <TextField
                value={userInfo.name}
                label={intl.formatMessage(messages.employeeName)}
                fullWidth
                variant='outlined'
                autoComplete='off'
                disabled
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                value={userInfo.jobName}
                label={intl.formatMessage(messages.job)}
                fullWidth
                variant='outlined'
                autoComplete='off'
                disabled
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                value={userInfo.organizationName}
                label={intl.formatMessage(messages.department)}
                fullWidth
                variant='outlined'
                autoComplete='off'
                disabled
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                value={formateDate(userInfo.hiringDate)}
                label={intl.formatMessage(messages.hiringDate)}
                fullWidth
                variant='outlined'
                autoComplete='off'
                disabled
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.date)}
                  value={formInfo.date ? dayjs(formInfo.date) : null}
                  className={classes.field}
                  onChange={(date) => {
                    setFormInfo((prevFilters) => ({
                      ...prevFilters,
                      date,
                    }));
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        date: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        date: false,
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.returnDate)}
                  value={formInfo.returnDate ? dayjs(formInfo.returnDate) : null}
                  className={classes.field}
                  onChange={(date) => {
                    setFormInfo((prevFilters) => ({
                      ...prevFilters,
                      returnDate: date,
                    }));
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        returnDate: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        returnDate: false,
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
                options={documentTypeList}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option.name ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'empDocumentId')
                }
                value={getAutoCompleteValue(
                  documentTypeList,
                  formInfo.empDocumentId
                )}
                renderInput={(params) => (
                  <TextField
                    variant='outlined'
                    {...params}
                    required
                    label={intl.formatMessage(messages.docName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='notes'
                multiline
                rows={1}
                value={formInfo.notes}
                onChange={onInputChange}
                label={intl.formatMessage(payrollMessages.notes)}
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
                    onClick={oncancel}
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
HrEmployeeDocumentTrxCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(HrEmployeeDocumentTrxCreate);
