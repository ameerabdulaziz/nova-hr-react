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
import { useHistory, useLocation } from 'react-router';
import PayRollLoader from '../../Component/PayRollLoader';
import SaveButton from '../../Component/SaveButton';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/StopMedicalInsuranceData';
import messages from '../messages';

function StopMedicalInsuranceCreate(props) {
  const { intl } = props;
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
    employeeName: '',
    trxDate: null,
    insReason: '',
    notes: '',
  });

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const formData = { ...formInfo, trxDate: formateDate(formInfo.trxDate) };

    setIsLoading(true);

    try {
      await api(locale).save(formData);

      toast.success(notif.saved);
      history.push('/app/Pages/Minsurance/StopMedicalInsurance');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList(
        false,
        true
      );
      setEmployeeList(employees);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);
        setFormInfo(dataApi);
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

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/Minsurance/StopMedicalInsurance');
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item md={12}>
              <Grid container spacing={3} direction='row'>
                <Grid item xs={12} md={4}>
                  {id === 0 ? (
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

                <Grid item xs={12} md={4}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label={intl.formatMessage(messages.endDate)}
                      value={formInfo.trxDate}
                      onChange={(date) => onDatePickerChange(date, 'trxDate')}
                      renderInput={(params) => (
                        <TextField required {...params} fullWidth variant='outlined' />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name='insReason'
                    value={formInfo.insReason}
                    onChange={onInputChange}
                    label={intl.formatMessage(messages.reason)}
                    fullWidth
                    variant='outlined'
                    required
                    multiline
                    rows={1}
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name='notes'
                    value={formInfo.notes}
                    onChange={onInputChange}
                    label={intl.formatMessage(payrollMessages.notes)}
                    fullWidth
                    variant='outlined'
                    required
                    multiline
                    rows={1}
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item>
                      <SaveButton Id={id} processing={isLoading} />
                    </Grid>

                    <Grid item>
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
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

StopMedicalInsuranceCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(StopMedicalInsuranceCreate);
