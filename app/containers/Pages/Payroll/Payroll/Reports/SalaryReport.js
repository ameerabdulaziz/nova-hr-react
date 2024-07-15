import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import EmployeeData from '../../Component/EmployeeData';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import GeneralListApis from '../../api/GeneralListApis';
import { formatNumber, formateDate, getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/SalaryReportData';
import messages from '../messages';

function SalaryReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const Title = localStorage.getItem('MenuName');

  const [companyList, setCompanyList] = useState([]);
  const [payTemplateList, setPayTemplateList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [formInfo, setFormInfo] = useState({
    EmployeeId: null,
    BranchId: branchId,
    TemplateId: 1,
    YearId: null,
    Type: '1',

    EmpStatusId: 1,
    OrganizationId: '',
  });

  const getFilterHighlights = () => {
    const highlights = [];

    const employee = getAutoCompleteValue(employeeList, formInfo.EmployeeId);
    const template = getAutoCompleteValue(payTemplateList, formInfo.TemplateId);
    const company = getAutoCompleteValue(companyList, formInfo.BranchId);
    const year = getAutoCompleteValue(yearList, formInfo.YearId);

    if (template) {
      highlights.push({
        label: intl.formatMessage(messages.template),
        value: template.name,
      });
    }

    if (year) {
      highlights.push({
        label: intl.formatMessage(messages.year),
        value: year.name,
      });
    }

    if (employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: employee.name,
      });
    }

    if (company) {
      highlights.push({
        label: intl.formatMessage(messages.company),
        value: company.name,
      });
    }

    setFilterHighlights(highlights);
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const payTemplate = await GeneralListApis(locale).GetPayTemplateList();
      setPayTemplateList(payTemplate);

      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      if (branchId) {
        const response = await GeneralListApis(locale).getOpenMonth(
          branchId,
          0
        );

        setFormInfo((prev) => ({
          ...prev,
          YearId: response.yearId,
        }));
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  const staticColumns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },

    {
      name: 'branchName',
      label: intl.formatMessage(messages.company),
    },

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
      name: 'jobName',
      label: intl.formatMessage(messages.job),
    },

    {
      name: 'hiringDate',
      label: intl.formatMessage(messages.hiringDate),
    },

    {
      name: 'monthYear',
      label: intl.formatMessage(messages.monthYear),
    },

    {
      name: 'netSal',
      label: intl.formatMessage(messages.netSalary),
      options: {
        filter: false,
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
      },
    },

    {
      name: 'insuCompValFixed',
      label: intl.formatMessage(messages.insuranceCompanyFixed),
      options: {
        filter: false,
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
      },
    },

    {
      name: 'insuEmpValFixed',
      label: intl.formatMessage(messages.insuranceEmployeeFixed),
      options: {
        filter: false,
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
      },
    },

    {
      name: 'taxVal',
      label: intl.formatMessage(messages.taxes),
      options: {
        filter: false,
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
      },
    },

    {
      name: 'totAllowances',
      label: intl.formatMessage(messages.totalAllownace),
      options: {
        filter: false,
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
      },
    },

    {
      name: 'totDed',
      label: intl.formatMessage(messages.totalDeduction),
      options: {
        filter: false,
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
      },
    },
  ];

  const [columns, setColumns] = useState(staticColumns);

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).GetList(formInfo);
      setTableData(response);

      const excludedProperties = [
        'branchName',
        'organizationName',
        'employeeCode',
        'employeeName',
        'hiringDate',
        'jobName',
        'monthYear',
        'insuCompValFixed',
        'insuEmpValFixed',
        'taxVal',
        'totAllowances',
        'totDed',
        'netSal',
      ];

      const newColumns = [];

      if (response.length > 0) {
        Object.keys(response[0]).forEach((key) => {
          if (!excludedProperties.includes(key)) {
            newColumns.push({
              name: key,
              label: key,
              options: {
                filter: false,
                customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
              },
            });
          }
        });
      }

      setColumns([...staticColumns, ...newColumns]);

      getFilterHighlights();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    fetchTableData();
  };

  const onRadioInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const handleEmpChange = useCallback(async (id, name) => {
    if (name === 'employeeId') {
      setFormInfo((prev) => ({
        ...prev,
        EmployeeId: id,
      }));
    }
  }, []);

  useEffect(() => {
    fetchNeededData();
  }, []);

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container mt={0} spacing={3}>
            <Grid item xs={12} md={3}>
              <Autocomplete
                options={companyList}
                value={getAutoCompleteValue(companyList, formInfo.BranchId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'BranchId')}
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
                options={payTemplateList}
                value={getAutoCompleteValue(
                  payTemplateList,
                  formInfo.TemplateId
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'TemplateId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.template)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={yearList}
                value={getAutoCompleteValue(yearList, formInfo.YearId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'YearId')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.year)}
                  />
                )}
              />
            </Grid>

            <Grid item md={3} xs={12}>
              <FormControl>
                <RadioGroup
                  row
                  value={formInfo.Type}
                  onChange={onRadioInputChange}
                  name='Type'
                >
                  <FormControlLabel
                    value='2'
                    control={<Radio />}
                    label={intl.formatMessage(messages.yearly)}
                  />
                  <FormControlLabel
                    value='1'
                    control={<Radio />}
                    label={intl.formatMessage(messages.monthly)}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={formInfo.EmployeeId}
                required={false}
                branchId={formInfo.BranchId}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant='contained' color='primary' type='submit'>
                {intl.formatMessage(payrollMessages.search)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>

      <PayrollTable title='' data={tableData} columns={columns} filterHighlights={filterHighlights} />
    </PayRollLoader>
  );
}

SalaryReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SalaryReport);
