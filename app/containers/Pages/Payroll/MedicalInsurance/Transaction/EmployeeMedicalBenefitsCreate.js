import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { format } from 'date-fns';
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
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/EmployeeMedicalBenefitsData';
import messages from '../messages';

function EmployeeMedicalBenefitsCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;

  const title = localStorage.getItem('MenuName');

  const [employeeList, setEmployeeList] = useState([]);
  const [codesList, setCodesList] = useState([]);
  const [centersList, setCentersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formInfo, setFormInfo] = useState({
    id,

    employeeId: '',
    employeeName: '',
    trxDate: null,
    medItemCode: '',
    medCentId: '',
    totalvalue: '',
    employeeShare: '',
    notes: '',
  });

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const formData = { ...formInfo };

    formData.trxDate = formateDate(formData.trxDate);

    setIsLoading(true);

    try {
      await api(locale).save(formData);

      toast.success(notif.saved);
      history.push('/app/Pages/Minsurance/EmployeeMedicalBenefits');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList(false);
      setEmployeeList(employees);

      const centers = await GeneralListApis(locale).GetMedicalInsuranceCentersList();
      setCentersList(centers);

      const codes = await GeneralListApis(locale).GetMedicalInsuranceItemList();
      setCodesList(codes);

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

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

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
    history.push('/app/Pages/Minsurance/EmployeeMedicalBenefits');
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={intl.formatMessage(messages.applicationDate)}
                  value={formInfo.trxDate}
                  onChange={(date) => onDatePickerChange(date, 'trxDate')}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField required {...params} variant='outlined' />
                  )}
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
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'employeeId')}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.employeeName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={codesList}
                value={
                  codesList.find((item) => item.id === formInfo.medItemCode) ?? null
                }
                onChange={(_, value) => onAutoCompleteChange(value, 'medItemCode')
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.MedicalTypes)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={centersList}
                value={
                  centersList.find((item) => item.id === formInfo.medCentId) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'medCentId')
                }
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.medicalCenterId)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='totalvalue'
                value={formInfo.totalvalue}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.totalValue)}
                className={classes.field}
                variant='outlined'
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='employeeShare'
                value={formInfo.employeeShare}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.employeeShare)}
                className={classes.field}
                variant='outlined'
                required
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
                required
                multiline
                rows={1}
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

EmployeeMedicalBenefitsCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeMedicalBenefitsCreate);
