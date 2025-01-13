import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
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
import { formateDate, getDefaultYearAndMonth } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/MedicalInsuranceSubscriptionData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function MedicalInsuranceSubscriptionCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;

  const title = localStorage.getItem('MenuName');

  const [dateError, setDateError] = useState({});

  const [insuranceCompanyList, setInsuranceCompanyList] = useState([]);
  const [insuranceCategoryList, setInsuranceCategoryList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [fixedBoxState, setFixedBoxState] = useState({
    cmpShare: '',
    employeeShare: '',
    familyMemberValue: '',
  });

  const [formInfo, setFormInfo] = useState({
    id,

    employeeId: '',
    employeeName: '',
    subDate: new Date(),
    insCmpId: '',
    medInsuCatId: '',

    yearId: '',
    monthId: '',

    cmpFees: '',
    subMonthlyFees: '',

    privlMedCareNumber: '',
    medCareEndDate: new Date(),

    childrenNo: '',
    childrenValue: '',

    fathersNo: '',
    fathersValue: '',

    wivesValue: '',
    wivesNo: '',
  });

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    const formData = {
      ...formInfo,
      medCareEndDate: formateDate(formInfo.medCareEndDate),
      subDate: formateDate(formInfo.subDate),
    };

    setIsLoading(true);

    try {
      await api(locale).save(formData);

      toast.success(notif.saved);
      history.push(SITEMAP.medicalInsurance.MedicalInsuranceSubscription.route);
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

      const category = await GeneralListApis(
        locale
      ).GetMinsuranceCategoryList();
      setInsuranceCategoryList(category);

      const company = await GeneralListApis(locale).GetMinsuranceCompanyList();
      setInsuranceCompanyList(company);

      const employees = await GeneralListApis(locale).GetEmployeeList(false);
      setEmployeeList(employees);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);
        setFormInfo(dataApi);
      } else {
        const today = getDefaultYearAndMonth(years);

        setFormInfo((prev) => ({
          ...prev,
          yearId: today.yearId,
          monthId: today.monthId,
        }));
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
      const response = await api(locale).MinsuranceCategory(
        formInfo.medInsuCatId
      );

      setFixedBoxState({
        cmpShare: response.cmpShare,
        employeeShare: response.employeeShare,
        familyMemberValue: response.familyMemberValue,
      });

      setFormInfo((prev) => ({
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
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onEmployeeAutoCompleteChange = (value) => {
    setFormInfo((prev) => ({
      ...prev,
      employeeId: value !== null ? value.id : null,
      employeeName: value !== null ? value.name : null,
    }));
  };

  const onCancelBtnClick = () => {
    history.push(SITEMAP.medicalInsurance.MedicalInsuranceSubscription.route);
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
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

            <Grid item xs={12} md={4}>
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

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={insuranceCategoryList}
                value={
                  insuranceCategoryList.find(
                    (item) => item.id === formInfo.medInsuCatId
                  ) ?? null
                }
                onChange={(_, value) => onAutoCompleteChange(value, 'medInsuCatId')
                }
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

            <Grid item xs={12}>
              <Card className={classes.card} sx={{ mt: '0!important' }}>
                <CardContent>
                  <Grid container spacing={3} direction='row'>
                    <Grid item xs={12} md={4}>
                      <TextField
                        name='employeeShare'
                        disabled
                        value={fixedBoxState.employeeShare}
                        label={intl.formatMessage(messages.employeeShare)}
                        fullWidth
                        variant='outlined'
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        name='cmpShare'
                        disabled
                        value={fixedBoxState.cmpShare}
                        label={intl.formatMessage(messages.companyShare)}
                        fullWidth
                        variant='outlined'
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        name='subMonthlyFees'
                        disabled
                        value={fixedBoxState.familyMemberValue}
                        label={intl.formatMessage(messages.familyMemberValue)}
                        fullWidth
                        variant='outlined'
                        autoComplete='off'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.subscriptionDate)}
                  value={formInfo.subDate ? dayjs(formInfo.subDate) : null}
                  className={classes.field}
                  onChange={(date) => onDatePickerChange(date, 'subDate')}
                  onError={(error) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        subDate: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        subDate: false,
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
                  label={intl.formatMessage(messages.medicalEndDate)}
                  value={
                    formInfo.medCareEndDate
                      ? dayjs(formInfo.medCareEndDate)
                      : null
                  }
                  className={classes.field}
                  onChange={(date) => onDatePickerChange(date, 'medCareEndDate')
                  }
                  onError={(error) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        medCareEndDate: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        medCareEndDate: false,
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
                name='privlMedCareNumber'
                value={formInfo.privlMedCareNumber}
                required
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.medicalCardNumber)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3} direction='row'>
                <Grid item xs={12} md={2}>
                  <Autocomplete
                    options={yearList}
                    value={
                      yearList.find((item) => item.id === formInfo.yearId)
                      ?? null
                    }
                    onChange={(_, value) => onAutoCompleteChange(value, 'yearId')
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
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

                <Grid item xs={12} md={2}>
                  <Autocomplete
                    options={monthsList}
                    value={
                      monthsList.find((item) => item.id === formInfo.monthId)
                      ?? null
                    }
                    onChange={(_, value) => onAutoCompleteChange(value, 'monthId')
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
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

                <Grid item xs={12} md={2}>
                  <TextField
                    name='subMonthlyFees'
                    value={formInfo.subMonthlyFees}
                    onChange={onNumericInputChange}
                    label={intl.formatMessage(messages.employeeShare)}
                    fullWidth
                    variant='outlined'
                    required
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={2}>
                  <TextField
                    name='cmpFees'
                    value={formInfo.cmpFees}
                    onChange={onNumericInputChange}
                    label={intl.formatMessage(messages.companyShare)}
                    fullWidth
                    variant='outlined'
                    required
                    autoComplete='off'
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                name='fathersNo'
                value={formInfo.fathersNo}
                onChange={(evt) => {
                  const value = evt.target.value.replace(/[^\d]/g, '');

                  setFormInfo((prev) => ({
                    ...prev,
                    fathersNo: value,
                    fathersValue: value * fixedBoxState.familyMemberValue,
                  }));
                }}
                label={intl.formatMessage(messages.fatherNumbers)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                name='fathersValue'
                value={formInfo.fathersValue}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.value)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                name='wivesNo'
                value={formInfo.wivesNo}
                onChange={(evt) => {
                  const value = evt.target.value.replace(/[^\d]/g, '');

                  setFormInfo((prev) => ({
                    ...prev,
                    wivesNo: value,
                    wivesValue: value * fixedBoxState.familyMemberValue,
                  }));
                }}
                label={intl.formatMessage(messages.wifeNumbers)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                name='wivesValue'
                value={formInfo.wivesValue}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.value)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                name='childrenNo'
                value={formInfo.childrenNo}
                onChange={(evt) => {
                  const value = evt.target.value.replace(/[^\d]/g, '');

                  setFormInfo((prev) => ({
                    ...prev,
                    childrenNo: value,
                    childrenValue: value * fixedBoxState.familyMemberValue,
                  }));
                }}
                label={intl.formatMessage(messages.childrenNumbers)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                name='childrenValue'
                value={formInfo.childrenValue}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.value)}
                fullWidth
                variant='outlined'
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
