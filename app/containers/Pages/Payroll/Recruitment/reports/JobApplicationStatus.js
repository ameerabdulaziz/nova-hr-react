import {
  Autocomplete,
  Button,
  Grid,
  TextField
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate, getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/JobApplicationStatusData';
import messages from '../messages';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function JobApplicationStatus(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const pageTitle = localStorage.getItem('MenuName');

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [dateError, setDateError] = useState({});
  const [tableData, setTableData] = useState([]);

  const [statusList, setStatusList] = useState([]);
  const [jobList, setJobList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    JobId: null,
    StatusId: null,
  });

  const getFilterHighlights = () => {
    const highlights = [];

    const status = getAutoCompleteValue(statusList, formInfo.StatusId);
    const job = getAutoCompleteValue(jobList, formInfo.JobId);

    if (status) {
      highlights.push({
        label: intl.formatMessage(messages.status),
        value: status.name,
      });
    }

    if (job) {
      highlights.push({
        label: intl.formatMessage(messages.job),
        value: job.name,
      });
    }

    if (formInfo.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(formInfo.FromDate),
      });
    }

    if (formInfo.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(formInfo.ToDate),
      });
    }

    setFilterHighlights(highlights);
  };

  const fetchTableData = async () => {
    setIsLoading(true);

    const formData = {
      ...formInfo,
      FromDate: formateDate(formInfo.FromDate),
      ToDate: formateDate(formInfo.ToDate),
    };

    try {
      const response = await api(locale).GetList(formData);
      setTableData(response);

      getFilterHighlights();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const jobs = await GeneralListApis(locale).GetJobList();
      setJobList(jobs);

      const appStatus = await GeneralListApis(locale).GetApplicationStatusList(
        true
      );
      setStatusList(appStatus);

      await fetchTableData();
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const columns = [
    {
      name: 'empName',
      label: intl.formatMessage(messages.applicantName),
    },

    {
      name: 'appDate',
      label: intl.formatMessage(messages.applicationDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.applicationDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
    },

    {
      name: 'phone',
      label: intl.formatMessage(messages.phone),
    },

    {
      name: 'email',
      label: intl.formatMessage(messages.email),
    },

    {
      name: 'hrStatus',
      label: intl.formatMessage(messages.hrAppStatus),
    },

    {
      name: 'mgrAppStatus',
      label: intl.formatMessage(messages.managerAppStatus),
    },

    {
      name: 'hrInterviewStatus',
      label: intl.formatMessage(messages.hrInterviewStatus),
    },

    {
      name: 'techInterviewStatus',
      label: intl.formatMessage(messages.technicalInterviewStatus),
    },
  ];

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    fetchTableData();
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

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Autocomplete
                options={statusList}
                value={getAutoCompleteValue(statusList, formInfo.StatusId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'StatusId')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.status)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(payrollMessages.fromdate)}
                  value={formInfo.FromDate ? dayjs(formInfo.FromDate) : null}
                  sx={{ width: '100%' }}
                  onChange={(date) => onDatePickerChange(date, 'FromDate')}
                  onError={(error) => {
                    setDateError((prevState) => ({
                      ...prevState,
                      FromDate: error !== null,
                    }));
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(payrollMessages.todate)}
                  value={formInfo.ToDate ? dayjs(formInfo.ToDate) : null}
                  sx={{ width: '100%' }}
                  onChange={(date) => onDatePickerChange(date, 'ToDate')}
                  onError={(error) => {
                    setDateError((prevState) => ({
                      ...prevState,
                      ToDate: error !== null,
                    }));
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={jobList}
                value={getAutoCompleteValue(jobList, formInfo.JobId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'JobId')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.jobName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Button variant='contained' color='primary' type='submit'>
                {intl.formatMessage(payrollMessages.search)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>

      <SimplifiedPayrollTable
        data={tableData}
        columns={columns}
        isLoading={isLoading}
        filterHighlights={filterHighlights}
      />
    </PayRollLoader>
  );
}

JobApplicationStatus.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobApplicationStatus);
