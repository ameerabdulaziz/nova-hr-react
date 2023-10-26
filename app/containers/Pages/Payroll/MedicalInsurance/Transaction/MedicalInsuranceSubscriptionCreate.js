import {
  Autocomplete,
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
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import SaveButton from '../../Component/SaveButton';
import useStyles from '../../Style';
import messages from '../messages';

function MedicalInsuranceSubscriptionCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);

  const title = localStorage.getItem('MenuName');

  const [insuranceCompanyList, setInsuranceCompanyList] = useState([]);
  const [insuranceCategoryList, setInsuranceCategoryList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);
  const [employeeList, setEmployeeList] = useState([
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    employeeId: '',
    subscriptionDate: null,
    insuranceCompany: '',
    insuranceCategory: '',

    year: '',
    month: '',

    companyShare: '',
    employeeShare: '',

    childrenNumbers: '',
    childrenValue: '',

    fatherNumbers: '',
    fatherValue: '',

    wifeValue: '',
    wifeNumbers: '',
  });

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const formData = { ...formInfo };

    formData.subscriptionDate = formateDate(formData.subscriptionDate);

    setIsLoading(true);

    console.log(formData);

    try {
      // await api(locale).save(formData);

      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>

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

                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={insuranceCompanyList}
                        value={
                          insuranceCompanyList.find(
                            (item) => item.id === formInfo.insuranceCompany
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => onAutoCompleteChange(value, 'insuranceCompany')}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label={intl.formatMessage(messages.insuranceCompany)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={insuranceCategoryList}
                        value={
                          insuranceCategoryList.find(
                            (item) => item.id === formInfo.insuranceCategory
                          ) ?? null
                        }
                        onChange={(_, value) => onAutoCompleteChange(value, 'insuranceCategory')}
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

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.subscriptionDate)}
                          value={formInfo.subscriptionDate}
                          onChange={date => onDatePickerChange(date, 'subscriptionDate')}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField required {...params} variant='outlined' />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={yearList}
                        value={
                          yearList.find(
                            (item) => item.id === formInfo.year
                          ) ?? null
                        }
                        onChange={(_, value) => onAutoCompleteChange(value, 'year')}
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

                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={monthsList}
                        value={
                          monthsList.find(
                            (item) => item.id === formInfo.month
                          ) ?? null
                        }
                        onChange={(_, value) => onAutoCompleteChange(value, 'month')}
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

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='employeeShare'
                        value={formInfo.employeeShare}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.employeeShare)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='companyShare'
                        value={formInfo.companyShare}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.companyShare)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>

                  <Grid container spacing={3} direction='row'>

                    <Grid item md={12}>
                      <Grid container spacing={3} direction='row'>
                        <Grid item xs={12} md={3}>
                          <TextField
                            name='fatherNumbers'
                            value={formInfo.fatherNumbers}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(messages.fatherNumbers)}
                            className={classes.field}
                            variant='outlined'
                          />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField
                            name='fatherValue'
                            value={formInfo.fatherValue}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(messages.value)}
                            className={classes.field}
                            variant='outlined'
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item md={12}>
                      <Grid container spacing={3} direction='row'>
                        <Grid item xs={12} md={3}>
                          <TextField
                            name='wifeNumbers'
                            value={formInfo.wifeNumbers}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(messages.wifeNumbers)}
                            className={classes.field}
                            variant='outlined'
                          />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField
                            name='wifeValue'
                            value={formInfo.wifeValue}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(messages.value)}
                            className={classes.field}
                            variant='outlined'
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item md={12}>
                      <Grid container spacing={3} direction='row'>
                        <Grid item xs={12} md={3}>
                          <TextField
                            name='childrenNumbers'
                            value={formInfo.childrenNumbers}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(messages.childrenNumbers)}
                            className={classes.field}
                            variant='outlined'
                          />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField
                            name='childrenValue'
                            value={formInfo.childrenValue}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(messages.value)}
                            className={classes.field}
                            variant='outlined'
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <SaveButton processing={isLoading} />
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
