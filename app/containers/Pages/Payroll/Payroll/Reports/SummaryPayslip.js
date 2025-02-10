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
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import Search from '../../Component/Search';
import GeneralListApis from '../../api/GeneralListApis';
import { formatNumber, getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/SummaryPayslipData';
import messages from '../messages';

function SummaryPayslip(props) {
  const { intl } = props;

  const pageTitle = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);

  const [tableData, setTableData] = useState([]);

  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [templateList, setTemplateList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [filterHighlights, setFilterHighlights] = useState([]);
  const [formInfo, setFormInfo] = useState({
    PayTemplateId: 1,
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

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      formInfo.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, formInfo.EmployeeId);
    const status = getAutoCompleteValue(statusList, formInfo.EmpStatusId);
    const company = getAutoCompleteValue(companyList, formInfo.BranchId);
    const year = getAutoCompleteValue(yearList, reportCriteria.year);
    const month = getAutoCompleteValue(monthsList, reportCriteria.month);
    const template = getAutoCompleteValue(templateList, formInfo.PayTemplateId);

    if (organization) {
      highlights.push({
        label: intl.formatMessage(messages.organization),
        value: organization.name,
      });
    }

    if (employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: employee.name,
      });
    }

    if (year) {
      highlights.push({
        label: intl.formatMessage(messages.year),
        value: year.name,
      });
    }

    if (month) {
      highlights.push({
        label: intl.formatMessage(messages.month),
        value: month.name,
      });
    }

    if (template) {
      highlights.push({
        label: intl.formatMessage(messages.template),
        value: template.name,
      });
    }

    if (status) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: status.name,
      });
    }

    if (company) {
      highlights.push({
        label: intl.formatMessage(messages.company),
        value: company.name,
      });
    }

    if (formInfo.cash) {
      highlights.push({
        label: intl.formatMessage(messages.cash),
        value: formInfo.cash
          ? intl.formatMessage(payrollMessages.yes)
          : intl.formatMessage(payrollMessages.no),
      });
    }

    if (formInfo.bankonly) {
      highlights.push({
        label: intl.formatMessage(messages.bankOnly),
        value: formInfo.bankonly
          ? intl.formatMessage(payrollMessages.yes)
          : intl.formatMessage(payrollMessages.no),
      });
    }

    setFilterHighlights(highlights);
  };

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).GetList(formInfo, reportCriteria);
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
      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthsList(months);

      const templates = await GeneralListApis(locale).GetPayTemplateList();
      setTemplateList(templates);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);

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
    },

    {
      name: 'employeeCode',
      label: intl.formatMessage(messages.employeeCode),
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'totDeser',
      label: intl.formatMessage(messages.allowances),
      options: {
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
      },
    },

    {
      name: 'totDed',
      label: intl.formatMessage(messages.deductions),
      options: {
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
      },
    },

    {
      name: 'netSal',
      label: intl.formatMessage(messages.netSalary),
      options: {
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
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


  const openMonthDateWithCompanyChangeFun = async (BranchId,EmployeeId) => {

    let OpenMonthData 

    try
    {
      if(yearList.length !== 0 && monthsList.length !== 0)
      {
        if(!EmployeeId)
        {
          OpenMonthData = await GeneralListApis(locale).getOpenMonth( BranchId,0);
        }
        else
        {
          OpenMonthData = await GeneralListApis(locale).getOpenMonth( 0,EmployeeId);
        }

          setReportCriteria((prev) => ({
            ...prev,
            year : OpenMonthData ? OpenMonthData.yearId : null,
            month: OpenMonthData ? OpenMonthData.monthId : null
          }));
      }
    }
    catch(err)
    {}

  }


  useEffect(()=>{
    if((formInfo.BranchId || formInfo.BranchId !== "") && (!formInfo.EmployeeId ||formInfo.EmployeeId === ""))
    {      
      openMonthDateWithCompanyChangeFun(formInfo.BranchId)
    }

    if((!formInfo.BranchId || formInfo.BranchId === "") && (formInfo.EmployeeId  || formInfo.EmployeeId !== ""))
    {
      openMonthDateWithCompanyChangeFun(0, formInfo.EmployeeId)
    }

    if((!formInfo.BranchId || formInfo.BranchId === "") && (!formInfo.EmployeeId || formInfo.EmployeeId === ""))
    {
      setReportCriteria((prev) => ({
        ...prev,
        year : null,
        month: null
      }));
    }

  },[formInfo.BranchId, formInfo.EmployeeId,yearList,monthsList])

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <form onSubmit={onFormSubmit}>
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: '16px!important' }}>
            <Typography variant='h6'>{pageTitle}</Typography>

            <Grid container mt={0} spacing={3}>
              <Grid item container spacing={2} xl={6} >

              <Grid item xs={12} md={6} lg={4} xl={8}>
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

              <Grid item xs={6} md={3} xl={4}>
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

              <Grid item xs={6} md={3} xl={2.2}>
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

              <Grid item >
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

              <Grid item xs={12} sx={{ display: 'none' }} xl={4.4}>
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

              </Grid>

              <Grid item xs={12} md={12} xl={6}>
                <Search
                  notShowDate
                  setsearchData={setFormInfo}
                  searchData={formInfo}
                  setIsLoading={setIsLoading}
                  company={formInfo.BranchId}
                />
              </Grid>              

              <Grid item xs={12}>
                <Button variant='contained' color='primary' type='submit'>
                  {intl.formatMessage(payrollMessages.search)}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>

      <SimplifiedPayrollTable
        title=''
        data={tableData}
        columns={columns}
        filterHighlights={filterHighlights}
      />
    </PayRollLoaderInForms>
  );
}

SummaryPayslip.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SummaryPayslip);
