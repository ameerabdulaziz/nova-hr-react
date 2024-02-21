import {
  Autocomplete,
  Button, Checkbox, FormControlLabel,
  Grid,
  Stack,
  TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../Component/PayRollLoader';
import GeneralListApis from '../api/GeneralListApis';
import { formateDate } from '../helpers';
import api from './api/OpenCloseMonthData';
import messages from './messages';

function OpenCloseMonth(props) {
  const { intl } = props;

  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const locale = useSelector((state) => state.language.locale);
  const title = localStorage.getItem('MenuName');

  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formInfo, setFormInfo] = useState({
    id: 0,
    openUserId: 0,
    yearId: null,
    monthId: null,
    organizationId: branchId,
    fromDate: null,
    todate: null,
    fromDateAtt: null,
    todateAtt: null,
    requestEndDate: null,
    lastDayToApproveEmployeeRequests: false,
    stopAttendance: false,
    closedMonth: false,
  });

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const company = await GeneralListApis(locale).GetBranchList(true);
      setCompanyList(company);

      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthList(months);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const getBranchInfo = async () => {
    if (formInfo.organizationId) {
      setIsLoading(true);

      try {
        const response = await api(locale).Get(formInfo.organizationId);

        setFormInfo({
          id: response.id,
          openUserId: response.openUserId,
          yearId: response.yearId,
          monthId: response.monthId,
          organizationId: response.organizationId,
          fromDate: response.fromDate,
          todate: response.todate,
          fromDateAtt: response.fromDateAtt,
          todateAtt: response.todateAtt,
          requestEndDate: response.requestEndDate,
          lastDayToApproveEmployeeRequests: Boolean(response.lastDayToApproveEmployeeRequests),
          stopAttendance: response.stopAttendance,
          closedMonth: Boolean(response.closedMonth)
        });
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getBranchInfo();
  }, [formInfo.organizationId]);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    /* assigning the name of the submit button that triggered the form submission to the variable
    `submiter`. This can be useful if you have multiple submit buttons in the
    form and you want to determine which button was clicked when handling the
    form submission. */
    const submitter = evt.nativeEvent.submitter.name;

    setIsLoading(true);

    const body = {
      ...formInfo,
      payTemplateId: 1,
      requestEndDate: formateDate(formInfo.requestEndDate) ?? '',
      fromDate: formateDate(formInfo.fromDate),
      todate: formateDate(formInfo.todate),
      fromDateAtt: formateDate(formInfo.fromDateAtt),
      todateAtt: formateDate(formInfo.todateAtt),
    };

    try {
      if (submitter === 'openMonth') {
        await api(locale).OpenMonth(body);
        toast.success(intl.formatMessage(messages.monthOpenedSuccessfully));
        setFormInfo((prev) => ({ ...prev, closedMonth: false }));
      } else if (submitter === 'updateDate') {
        await api(locale).UpdateDate(body);
        toast.success(intl.formatMessage(messages.dateUpdateSuccessfully));
      } else if (submitter === 'closeMonth') {
        await api(locale).CloseMonth(body);
        toast.success(intl.formatMessage(messages.monthClosedSuccessfully));
        setFormInfo((prev) => ({ ...prev, closedMonth: true }));
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onCheckboxChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
    }));
  };

  const onDatePickerChange = (value, name) => {
    if (Object.prototype.toString.call(new Date(value)) === '[object Date]') {
      if (!isNaN(new Date(value))) {
        setFormInfo((prev) => ({
          ...prev,
          [name]: value === null ? null : formateDate((value)),
        }));
      } else {
        setFormInfo((prev) => ({
          ...prev,
          [name]: null,
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

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoader isLoading={isLoading}>
      <form onSubmit={onFormSubmit}>
        <PapperBlock whiteBg icon='border_color' title={title} desc=''>

          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Autocomplete
                options={companyList}
                value={getAutoCompleteValue(companyList, formInfo.organizationId)}
                isOptionEqualToValue={(option, value) => option.id === value.id
                }
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'organizationId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.company)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={yearList}
                value={getAutoCompleteValue(yearList, formInfo.yearId)}
                isOptionEqualToValue={(option, value) => option.id === value.id
                }
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'yearId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.year)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={monthList}
                value={getAutoCompleteValue(monthList, formInfo.monthId)}
                isOptionEqualToValue={(option, value) => option.id === value.id
                }
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'monthId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.month)}
                  />
                )}
              />
            </Grid>

          </Grid>

          <Grid container spacing={2} mt={0} >

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={intl.formatMessage(messages.fromDate)}
                  value={formInfo.fromDate}
                  onChange={(date) => onDatePickerChange(date, 'fromDate')}
                  renderInput={(params) => (
                    <TextField required {...params} variant='outlined' />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={intl.formatMessage(messages.toDate)}
                  value={formInfo.todate}
                  onChange={(date) => onDatePickerChange(date, 'todate')}
                  renderInput={(params) => (
                    <TextField required {...params} variant='outlined' />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={intl.formatMessage(messages.attendancePeriodFromDate)}
                  value={formInfo.fromDateAtt}
                  onChange={(date) => onDatePickerChange(date, 'fromDateAtt')}
                  renderInput={(params) => (
                    <TextField required {...params} variant='outlined' />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={intl.formatMessage(messages.attendancePeriodToDate)}
                  value={formInfo.todateAtt}
                  onChange={(date) => onDatePickerChange(date, 'todateAtt')}
                  renderInput={(params) => (
                    <TextField required {...params} variant='outlined' />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formInfo.lastDayToApproveEmployeeRequests}
                    onChange={onCheckboxChange}
                    name='lastDayToApproveEmployeeRequests'
                  />
                }
                label={intl.formatMessage(
                  messages.lastDayToApproveEmployeeRequests
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={intl.formatMessage(messages.lastApprovalDate)}
                  value={formInfo.requestEndDate}
                  onChange={(date) => onDatePickerChange(date, 'requestEndDate')}
                  disabled={!formInfo.lastDayToApproveEmployeeRequests}
                  renderInput={(params) => (
                    <TextField required {...params} disabled={!formInfo.lastDayToApproveEmployeeRequests} variant='outlined' />
                  )}
                />
              </LocalizationProvider>
            </Grid>

          </Grid>

          <Stack direction='row' spacing={2} mt={3}>
            <Button
              type='submit'
              variant='contained'
              name='openMonth'
              disabled={!formInfo.closedMonth}
            >
              {intl.formatMessage(messages.openMonth)}
            </Button>

            <Button
              type='submit'
              variant='contained' color='secondary'
              name='updateDate'
              disabled={formInfo.closedMonth}
            >
              {intl.formatMessage(messages.updateDate)}
            </Button>

            <Button
              type='submit'
              variant='contained' color='error'
              name='closeMonth'
              disabled={formInfo.closedMonth}
            >
              {intl.formatMessage(messages.closeMonth)}
            </Button>
          </Stack>
        </PapperBlock>
      </form>
    </PayRollLoader>
  );
}

OpenCloseMonth.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OpenCloseMonth);
