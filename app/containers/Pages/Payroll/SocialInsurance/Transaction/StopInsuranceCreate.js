import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PayRollLoader from '../../Component/PayRollLoader';
import SaveButton from '../../Component/SaveButton';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/StopInsuranceData';
import messages from '../messages';

function StopInsuranceCreate(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const id = location.state?.id ?? 0;
  const history = useHistory();

  const [employeeList, setEmployeeList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [formInfo, setFormInfo] = useState({
    id,

    employeeId: '',
    employeeName: '',
    insEndDate: null,
    insReason: '',
    notes: '',
    c6inDate: null,
    c6inNo: '',
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList(true);
      setEmployeeList(employees);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);
        setFormInfo(dataApi);
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const formData = {
      ...formInfo,
      c6inDate: formateDate(formInfo.c6inDate),
      insEndDate: formateDate(formInfo.insEndDate),
    };

    setIsLoading(true);

    try {
      await api(locale).save(formData);

      toast.success(notif.saved);
      history.push('/app/Pages/insurance/StopInsurance');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
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

  const onCancelBtnClick = () => {
    history.push('/app/Pages/insurance/StopInsurance');
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon='border_color'
        desc=''
        title={
          id === 0
            ? intl.formatMessage(messages.StopInsuranceCreateTitle)
            : intl.formatMessage(messages.StopInsuranceEditTitle)
        }
      >
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={3}>
              {id === 0 ? (
                <Autocomplete
                  options={employeeList}
                  value={
                    employeeList.find(
                      (alt) => alt.id === formInfo.employeeId
                    ) ?? null
                  }
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  onChange={(_, value) => {
                    setFormInfo((prev) => ({
                      ...prev,
                      employeeId: value !== null ? value.id : null,
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label={intl.formatMessage(messages.employeeName)}
                    />
                  )}
                />
              ) : (
                <TextField
                  name='employeeName'
                  value={formInfo.employeeName}
                  label={intl.formatMessage(messages.employeeName)}
                  fullWidth
                  variant='outlined'
                  disabled
                  autoComplete='off'
                />
              )}
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={intl.formatMessage(messages.endDate)}
                  value={formInfo.insEndDate}
                  onChange={(date) => {
                    setFormInfo((prevFilters) => ({
                      ...prevFilters,
                      insEndDate: date,
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      fullWidth
                      variant='outlined'
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item md={12}>
              <Grid container spacing={3} direction='row'>
                <Grid item xs={12} md={6}>
                  <TextField
                    name='insReason'
                    value={formInfo.insReason}
                    required
                    onChange={onInputChange}
                    label={intl.formatMessage(messages.reason)}
                    fullWidth
                    variant='outlined'
                    multiline
                    rows={1}
                    autoComplete='off'
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={12}>
              <Grid container spacing={3} direction='row'>
                <Grid item xs={12} md={6}>
                  <TextField
                    name='notes'
                    value={formInfo.notes}
                    required
                    onChange={onInputChange}
                    label={intl.formatMessage(messages.notes)}
                    fullWidth
                    multiline
                    rows={1}
                    variant='outlined'
                    autoComplete='off'
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={12}>
              <Grid container spacing={3} direction='row'>
                <Grid item xs={12} md={3}>
                  <TextField
                    name='c6inNo'
                    value={formInfo.c6inNo}
                    onChange={onNumericInputChange}
                    label={intl.formatMessage(messages.c6IncomingNumber)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label={intl.formatMessage(messages.c6DeliverDate)}
                      value={formInfo.c6inDate}
                      onChange={(date) => {
                        setFormInfo((prevFilters) => ({
                          ...prevFilters,
                          c6inDate: date,
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth variant='outlined' />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
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

StopInsuranceCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(StopInsuranceCreate);
