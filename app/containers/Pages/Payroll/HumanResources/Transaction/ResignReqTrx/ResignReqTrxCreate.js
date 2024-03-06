import DevicesIcon from '@mui/icons-material/Devices';
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
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
import style from '../../../../../../styles/pagesStyle/ResignReqTrxSty.scss';
import PayRollLoader from '../../../Component/PayRollLoader';
import useStyles from '../../../Style';
import GeneralListApis from '../../../api/GeneralListApis';
import { formateDate } from '../../../helpers';
import payrollMessages from '../../../messages';
import api from '../../api/ResignReqTrxData';
import messages from '../../messages';

function ResignReqTrxCreate(props) {
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
    jobDescription: []
  });

  const [formInfo, setFormInfo] = useState({
    id,
    date: new Date(),
    resignReasonId: null,
    notes: '',
    lworkingDay: new Date(),
    mob: '',
    telNumber: '',
    emailAddress: '',
    employeeAddress: '',
    employeeCustodyList: [],
  });

  const [resignReasonsList, setResignReasonsList] = useState([]);
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
        lworkingDay: formateDate(formInfo.lworkingDay),
        employeeCustodyList: null,
        employeeId: userInfo.id,
      };

      await api(locale).save(formData);

      toast.success(notif.saved);
      history.push('/app/Pages/HR/ResignReqTrx');
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };
  function oncancel() {
    history.push('/app/Pages/HR/ResignReqTrx');
  }

  async function fetchData() {
    setIsLoading(true);

    try {
      const reason = await GeneralListApis(locale).GetResignReasonList();
      setResignReasonsList(reason);

      const info = await api(locale).getUserInfo();
      setUserInfo(info);

      if (id !== 0) {
        const dataApi = await api(locale).getById(id);

        setFormInfo(dataApi);
      } else {
        setFormInfo((prev) => ({
          ...prev,
          employeeAddress: info.address ?? '',
          mob: info.mobile ?? '',
        }));
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

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} mt={0} >
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
                  label={intl.formatMessage(messages.resignationDate)}
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
                  className={classes.field}
                  label={intl.formatMessage(messages.lastWorkingDay)}
                  value={
                    formInfo.lworkingDay ? dayjs(formInfo.lworkingDay) : null
                  }
                  onChange={(date) => {
                    setFormInfo((prevFilters) => ({
                      ...prevFilters,
                      lworkingDay: date,
                    }));
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        lworkingDay: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        lworkingDay: false,
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
              <TextField
                name='mob'
                value={formInfo.mob}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.mobileNumber)}
                fullWidth
                variant='outlined'
                required
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='telNumber'
                value={formInfo.telNumber}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.homeNumber)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='emailAddress'
                type='email'
                value={formInfo.emailAddress}
                onChange={onInputChange}
                label={intl.formatMessage(messages.personalEmail)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={resignReasonsList}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option.name ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'resignReasonId')
                }
                value={getAutoCompleteValue(
                  resignReasonsList,
                  formInfo.resignReasonId
                )}
                renderInput={(params) => (
                  <TextField
                    variant='outlined'
                    {...params}
                    required
                    label={intl.formatMessage(messages.resignReasonName)}
                  />
                )}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                name='employeeAddress'
                multiline
                rows={1}
                value={formInfo.employeeAddress}
                onChange={onInputChange}
                label={intl.formatMessage(messages.address)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item md={6} xs={12}>
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

            {formInfo.employeeCustodyList.length > 0 && (
              <Grid item xs={12}>
                <Card
                  className={`${classes.card} ${style.cardContainer}`}
                  sx={{ mt: '0!important' }}
                >
                  <CardContent>
                    <Typography variant='h5' mb={3}>
                      {intl.formatMessage(messages.custodies)}
                    </Typography>

                    <Grid container spacing={3}>
                      {formInfo.employeeCustodyList.map((item, index) => (
                        <Grid item xs={12} md={3} lg={3} key={index}>
                          <div className={style.custodiesContainer}>
                            <DevicesIcon className={classes.textSty} />
                            <span>{item}</span>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}

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
ResignReqTrxCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ResignReqTrxCreate);
