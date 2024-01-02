import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/MonthOpenCloseAssData';
import messages from '../messages';

function MonthOpenCloseAss(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);

  const title = localStorage.getItem('MenuName');

  const [branchList, setBranchList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formInfo, setFormInfo] = useState({
    branchId: null,
    monthId: null,
    yearId: null,
    employeeId: null,
    title: '',
    arTitle: '',
  });

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    try {
      await api(locale).save(formInfo);
      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

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

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>

      <form onSubmit={onFormSubmit}>
        <Grid container spacing={2} direction='row'>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6'>{title}</Typography>

                <Grid container spacing={3} mt={0} direction='row'>

                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={branchList}
                      value={
                        branchList.find(
                          (item) => item.id === formInfo.branchId
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
                      onChange={(_, value) => onAutoCompleteChange(value, 'branchId')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(messages.branch)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={monthList}
                      value={
                        monthList.find(
                          (item) => item.id === formInfo.monthId
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

                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={yearList}
                      value={
                        yearList.find(
                          (item) => item.id === formInfo.yearId
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

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={formInfo.title}
                      label={intl.formatMessage(messages.title)}
                      name='title'
                      onChange={onInputChange}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={formInfo.arTitle}
                      label={intl.formatMessage(messages.arTitle)}
                      name='arTitle'
                      onChange={onInputChange}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Stack direction='row' gap={2}>
                      <Button
                        variant='contained'
                        size='medium'
                        color='secondary'
                      >
                        <FormattedMessage {...messages.openMonth} />
                      </Button>

                      <Button
                        variant='contained'
                        size='medium'
                        color='error'
                      >
                        <FormattedMessage {...messages.closeMonth} />
                      </Button>

                      <Button
                        variant='contained'
                        size='medium'
                        color='warning'
                      >
                        <FormattedMessage {...messages.stopEmployeeSelfAssessment} />
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6'>
                  {intl.formatMessage(messages.openAssessmentToEditFor)}
                </Typography>

                <Grid container mt={0} spacing={3} >
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={employeeList}
                      value={
                        employeeList.find(
                          (item) => item.id === formInfo.employeeId
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
                      onChange={(_, value) => onAutoCompleteChange(value, 'employeeId')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(messages.employeeName)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item>
                    <Button
                      variant='contained'
                      size='medium'
                      color='primary'
                    >
                      <FormattedMessage {...messages.reset} />
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6'>
                  {intl.formatMessage(messages.resetPeerAppraisalSetting)}
                </Typography>

                <Typography variant='body1' mt={3} color='gray' >
                  {intl.formatMessage(messages.thisActionWillResetPeerAppraisalForAllEmployeeInCurrentMonth)}
                </Typography>

                <Grid container mt={0} spacing={3} >
                  <Grid item>
                    <Button
                      variant='contained'
                      size='medium'
                      color='primary'
                    >
                      <FormattedMessage {...messages.reset} />
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </PayRollLoader>
  );
}

MonthOpenCloseAss.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(MonthOpenCloseAss);
