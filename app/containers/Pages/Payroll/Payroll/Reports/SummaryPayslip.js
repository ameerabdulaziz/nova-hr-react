import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import GeneralListApis from '../../api/GeneralListApis';
import { formatNumber } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/SummaryPayslipData';
import messages from '../messages';

function SummaryPayslip(props) {
  const { intl } = props;

  const Title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);

  const [tableData, setTableData] = useState([]);

  const [templateList, setTemplateList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [formInfo, setFormInfo] = useState({
    PayTemplateId: null,
    EmployeeId: null,
    cash: false,
    bankonly: false,
    EmpStatusId: 1,
    OrganizationId: '',
    BranchId: branchId,
  });

  const [reportCriteria, setReportCriteria] = useState({
    year: null,
    month: null,
    reportType: 'detail',
  });

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).GetList(formInfo, reportCriteria);
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
      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthsList(months);

      const templates = await GeneralListApis(locale).GetPayTemplateList();
      setTemplateList(templates);

      if (branchId) {
        const response = await GeneralListApis(locale).getOpenMonth(
          branchId,
          0
        );

        setReportCriteria((prev) => ({
          ...prev,
          month: response.monthId,
          year: response.yearId,
        }));
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

  const columns = [
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.department),
      options: {
        filter: true,
      },
    },

    {
      name: 'employeeCode',
      label: intl.formatMessage(messages.employeeCode),
      options: {
        filter: true,
      },
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
      options: {
        filter: true,
      },
    },

    {
      name: 'totDeser',
      label: intl.formatMessage(messages.allowances),
      options: {
        filter: true,
        customBodyRender: formatNumber,
      },
    },

    {
      name: 'totDed',
      label: intl.formatMessage(messages.deductions),
      options: {
        filter: true,
        customBodyRender: formatNumber,
      },
    },

    {
      name: 'netSal',
      label: intl.formatMessage(messages.netSalary),
      options: {
        filter: true,
        customBodyRender: formatNumber,
      },
    },
  ];

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    fetchTableData();
  };

  const onCheckboxChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
    }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onReportRadioInputChange = (evt) => {
    setReportCriteria((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onReportAutoCompleteChange = (value, name) => {
    setReportCriteria((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoader isLoading={isLoading}>
      <form onSubmit={onFormSubmit}>
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: '16px!important' }}>
            <Typography variant='h6'>
              {Title}
            </Typography>

            <Grid container mt={0} spacing={3}>
              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={templateList}
                  value={getAutoCompleteValue(
                    templateList,
                    formInfo.PayTemplateId
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'PayTemplateId')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.template)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={yearList}
                  value={getAutoCompleteValue(yearList, reportCriteria.year)}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onReportAutoCompleteChange(value, 'year')
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
                  options={monthsList}
                  value={getAutoCompleteValue(monthsList, reportCriteria.month)}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onReportAutoCompleteChange(value, 'month')
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

              <Grid item xs={12} md={3}>
                <Stack direction='row' spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={formInfo.cash}
                        name='cash'
                        onChange={onCheckboxChange}
                      />
                    }
                    label={intl.formatMessage(messages.cash)}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={formInfo.bankonly}
                        name='bankonly'
                        onChange={onCheckboxChange}
                      />
                    }
                    label={intl.formatMessage(messages.bankOnly)}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={12}>
                <Search
                  notShowDate
                  setsearchData={setFormInfo}
                  searchData={formInfo}
                  setIsLoading={setIsLoading}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'none' }}>
                <FormControl>
                  <RadioGroup
                    row
                    value={reportCriteria.reportType}
                    onChange={onReportRadioInputChange}
                    name='reportType'
                  >
                    <FormControlLabel
                      value='1'
                      control={<Radio />}
                      label={intl.formatMessage(messages.detailed)}
                    />
                    <FormControlLabel
                      value='2'
                      control={<Radio />}
                      label={intl.formatMessage(messages.groupByDepartment)}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button variant='contained' color='primary' type='submit'>
                  <FormattedMessage {...payrollMessages.search} />
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>

      <PayrollTable
        title=''
        data={tableData}
        columns={columns}
      />
    </PayRollLoader>
  );
}

SummaryPayslip.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SummaryPayslip);
