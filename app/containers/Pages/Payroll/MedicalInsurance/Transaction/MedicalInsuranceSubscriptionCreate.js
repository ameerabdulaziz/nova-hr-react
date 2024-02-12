import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Grid, TextField
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
import api from '../api/MedicalInsuranceSubscriptionData';
import messages from '../messages';

function MedicalInsuranceSubscriptionCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;

  const title = localStorage.getItem('MenuName');

  const [insuranceCompanyList, setInsuranceCompanyList] = useState([]);
  const [insuranceCategoryList, setInsuranceCategoryList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);
  const [employeeList, setEmployeeList] = useState([
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [fixedBoxState, setFixedBoxState] = useState({
    cmpShare: '',
    employeeShare: '',
    familyMemberValue: ''
  });

  const [formInfo, setFormInfo] = useState({
    id,

    employeeId: '',
    employeeName: '',
    subDate: null,
    insCmpId: '',
    medInsuCatId: '',

    yearId: '',
    monthId: '',

    cmpFees: '',
    subMonthlyFees: '',

    childrenNo: '',
    childrenValue: '',

    fathersNo: '',
    fathersValue: '',

    wivesValue: '',
    wivesNo: '',
  });

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const formData = { ...formInfo };

    formData.subDate = formateDate(formData.subDate);

    setIsLoading(true);

    try {
      await api(locale).save(formData);

      toast.success(notif.saved);
      history.push('/app/Pages/Minsurance/MedicalInsuranceSubscription');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthsList(months);

      const category = await GeneralListApis(locale).GetMinsuranceCategoryList();
      setInsuranceCategoryList(category);

      const company = await GeneralListApis(locale).GetMinsuranceCompanyList();
      setInsuranceCompanyList(company);

      const employees = await GeneralListApis(locale).GetEmployeeList(false);
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

  const getCategoryInfo = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).MinsuranceCategory(formInfo.medInsuCatId);

      setFixedBoxState(
        {
          cmpShare: response.cmpShare,
          employeeShare: response.employeeShare,
          familyMemberValue: response.familyMemberValue
        }
      );

      setFormInfo(prev => ({
        ...prev,
        cmpFees: response.cmpShare,
        subMonthlyFees: response.employeeShare,

        childrenValue: prev.childrenNo * response.familyMemberValue,
        fathersValue: prev.fathersNo * response.familyMemberValue,
        wivesValue: prev.wivesNo * response.familyMemberValue,
      }));
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (formInfo.medInsuCatId) {
      getCategoryInfo();
    }
  }, [formInfo.medInsuCatId]);

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value !== null ? value.id : null }));
  };

  const onEmployeeAutoCompleteChange = (value) => {
    setFormInfo((prev) => ({ ...prev, employeeId: value !== null ? value.id : null, employeeName: value !== null ? value.name : null }));
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/Minsurance/MedicalInsuranceSubscription');
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={6}>
              <Card className={classes.card}>
                <CardContent>

                  <Grid container spacing={3} direction='row'>
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        options={employeeList}
                        value={
                          employeeList.find(
                            (item) => item.id === formInfo.employeeId
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => onEmployeeAutoCompleteChange(value)}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label={intl.formatMessage(messages.employeeName)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        options={insuranceCompanyList}
                        value={
                          insuranceCompanyList.find(
                            (item) => item.id === formInfo.insCmpId
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => onAutoCompleteChange(value, 'insCmpId')}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label={intl.formatMessage(messages.insuranceCompany)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        options={insuranceCategoryList}
                        value={
                          insuranceCategoryList.find(
                            (item) => item.id === formInfo.medInsuCatId
                          ) ?? null
                        }
                        onChange={(_, value) => onAutoCompleteChange(value, 'medInsuCatId')}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => (option ? option.name : '')}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label={intl.formatMessage(messages.insuranceCategory)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.subscriptionDate)}
                          value={formInfo.subDate}
                          onChange={date => onDatePickerChange(date, 'subDate')}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField required {...params} variant='outlined' />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        options={yearList}
                        value={
                          yearList.find(
                            (item) => item.id === formInfo.yearId
                          ) ?? null
                        }
                        onChange={(_, value) => onAutoCompleteChange(value, 'yearId')}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => (option ? option.name : '')}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label={intl.formatMessage(messages.year)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        options={monthsList}
                        value={
                          monthsList.find(
                            (item) => item.id === formInfo.monthId
                          ) ?? null
                        }
                        onChange={(_, value) => onAutoCompleteChange(value, 'monthId')}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => (option ? option.name : '')}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label={intl.formatMessage(messages.month)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name='subMonthlyFees'
                        value={formInfo.subMonthlyFees}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.employeeShare)}
                        className={classes.field}
                        variant='outlined'
                        required
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name='cmpFees'
                        value={formInfo.cmpFees}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.companyShare)}
                        className={classes.field}
                        variant='outlined'
                        required
                        autoComplete='off'
                      />
                    </Grid>

                  </Grid>
                </CardContent>
              </Card>

              <Card className={classes.card} sx={{ mt: 3 }} >
                <CardContent>

                  <Grid container spacing={3} direction='row'>

                    <Grid item md={12}>
                      <Grid container spacing={3} direction='row'>
                        <Grid item xs={12} md={6}>
                          <TextField
                            name='fathersNo'
                            value={formInfo.fathersNo}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(messages.fatherNumbers)}
                            className={classes.field}
                            required
                            variant='outlined'
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            name='fathersValue'
                            value={formInfo.fathersValue}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(messages.value)}
                            className={classes.field}
                            required
                            variant='outlined'
                            autoComplete='off'
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item md={12}>
                      <Grid container spacing={3} direction='row'>
                        <Grid item xs={12} md={6}>
                          <TextField
                            name='wivesNo'
                            value={formInfo.wivesNo}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(messages.wifeNumbers)}
                            className={classes.field}
                            required
                            variant='outlined'
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            name='wivesValue'
                            value={formInfo.wivesValue}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(messages.value)}
                            className={classes.field}
                            required
                            variant='outlined'
                            autoComplete='off'
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item md={12}>
                      <Grid container spacing={3} direction='row'>
                        <Grid item xs={12} md={6}>
                          <TextField
                            name='childrenNo'
                            value={formInfo.childrenNo}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(messages.childrenNumbers)}
                            className={classes.field}
                            required
                            variant='outlined'
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            name='childrenValue'
                            value={formInfo.childrenValue}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(messages.value)}
                            className={classes.field}
                            required
                            variant='outlined'
                            autoComplete='off'
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={6}>

              <Card className={classes.card}>
                <CardContent>

                  <Grid container spacing={3} direction='row'>
                    <Grid item xs={12} md={6}>
                      <TextField
                        name='employeeShare'
                        disabled
                        value={fixedBoxState.employeeShare}
                        label={intl.formatMessage(messages.employeeShare)}
                        className={classes.field}
                        variant='outlined'
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name='cmpShare'
                        disabled
                        value={fixedBoxState.cmpShare}
                        label={intl.formatMessage(messages.companyShare)}
                        className={classes.field}
                        variant='outlined'
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name='subMonthlyFees'
                        disabled
                        value={fixedBoxState.familyMemberValue}
                        label={intl.formatMessage(messages.familyMemberValue)}
                        className={classes.field}
                        variant='outlined'
                        autoComplete='off'
                      />
                    </Grid>

                  </Grid>
                </CardContent>
              </Card>

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

MedicalInsuranceSubscriptionCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(MedicalInsuranceSubscriptionCreate);
