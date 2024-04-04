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
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/JobApplicationStatusData';
import messages from '../messages';

function JobApplicationStatus(props) {
  const { intl } = props;
  const { classes } = useStyles();

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

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
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
      await fetchTableData();
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const columns = [
    {
      name: 'empName',
      label: intl.formatMessage(messages.applicantName),
      options: {
        filter: true,
      },
    },

    {
      name: 'appDate',
      label: intl.formatMessage(messages.applicationDate),
      options: {
        filter: true,
        customBodyRender: (value) => <pre>{formateDate(value)}</pre>,
      },
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
      options: {
        filter: true,
      },
    },

    {
      name: 'phone',
      label: intl.formatMessage(messages.phone),
      options: {
        filter: true,
      },
    },

    {
      name: 'email',
      label: intl.formatMessage(messages.email),
      options: {
        filter: true,
      },
    },

    {
      name: 'hrStatus',
      label: intl.formatMessage(messages.hrAppStatus),
      options: {
        filter: true,
      },
    },

    {
      name: 'mgrAppStatus',
      label: intl.formatMessage(messages.managerAppStatus),
      options: {
        filter: true,
      },
    },

    {
      name: 'hrInterviewStatus',
      label: intl.formatMessage(messages.hrInterviewStatus),
      options: {
        filter: true,
      },
    },

    {
      name: 'techInterviewStatus',
      label: intl.formatMessage(messages.technicalInterviewStatus),
      options: {
        filter: true,
      },
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
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={statusList}
                    value={
                      statusList.find(
                        (item) => item.id === formInfo.StatusId
                      ) ?? null
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) => onAutoCompleteChange(value, 'StatusId')
                    }
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
                      value={
                        formInfo.FromDate ? dayjs(formInfo.FromDate) : null
                      }
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
                    value={
                      jobList.find((item) => item.id === formInfo.JobId) ?? null
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) => onAutoCompleteChange(value, 'JobId')
                    }
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
                    <FormattedMessage {...payrollMessages.search} />
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
      </PapperBlock>

      <PayrollTable data={tableData} columns={columns} isLoading={isLoading} />
    </PayRollLoader>
  );
}

JobApplicationStatus.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobApplicationStatus);
