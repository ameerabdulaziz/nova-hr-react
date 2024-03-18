import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
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
import { formatNumber, formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/DetailedPayrollReportData';
import messages from '../messages';

function DetailedPayrollReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const Title = localStorage.getItem('MenuName');

  const [companyList, setCompanyList] = useState([]);
  const [payTemplateList, setPayTemplateList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [formInfo, setFormInfo] = useState({
    EmployeeId: null,
    BranchId: branchId,
    TemplateId: 1,
    YearId: null,
    MonthId: null,
    isBankTransfere: null,
    isInsured: null,
    isVal: 1,
    CurrencyId: null,

    EmpStatusId: 1,
    OrganizationId: '',
  });

  const salaryTypesList = [
    {
      id: 1,
      name: intl.formatMessage(messages.bank),
    },
    {
      id: 0,
      name: intl.formatMessage(messages.cash),
    },
  ];

  const insuranceList = [
    {
      id: 1,
      name: intl.formatMessage(messages.insured),
    },
    {
      id: 0,
      name: intl.formatMessage(messages.unInsured),
    },
  ];

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const payTemplate = await GeneralListApis(locale).GetPayTemplateList();
      setPayTemplateList(payTemplate);

      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthList(months);

      const currency = await GeneralListApis(locale).MdCurrency();
      setCurrencyList(currency);

      if (branchId) {
        const response = await GeneralListApis(locale).getOpenMonth(
          branchId,
          0
        );

        setFormInfo((prev) => ({
          ...prev,
          MonthId: response.monthId,
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
      options: {
        customBodyRender: (value) => <pre>{formateDate(value)}</pre>,
      },
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
        customBodyRender: (value) =><pre> {formatNumber(value)} </pre>,
      },
    },
  ];

  const [columns, setColumns] = useState(staticColumns);

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const params = {
        EmployeeId: formInfo.EmployeeId,
        BranchId: formInfo.BranchId,
        TemplateId: formInfo.TemplateId,
        YearId: formInfo.YearId,
        MonthId: formInfo.MonthId,
        isInsured:
					formInfo.isInsured === null ? null : Boolean(formInfo.isInsured),
        isBankTransfere:
					formInfo.isBankTransfere === null
					  ? null
					  : Boolean(formInfo.isBankTransfere),
        isVal: formInfo.isVal,
        CurrencyId: formInfo.CurrencyId,
      };

      const response = await api(locale).GetList(params);
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
                customBodyRender: (value) => formatNumber(value),
              },
            });
          }
        });
      }

      setColumns([...staticColumns, ...newColumns]);
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

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

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

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={monthList}
                value={getAutoCompleteValue(monthList, formInfo.MonthId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'MonthId')}
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
              <Autocomplete
                options={salaryTypesList}
                value={getAutoCompleteValue(
                  salaryTypesList,
                  formInfo.isBankTransfere
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'isBankTransfere')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.salaryType)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={insuranceList}
                value={getAutoCompleteValue(insuranceList, formInfo.isInsured)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'isInsured')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.insurance)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={currencyList}
                value={getAutoCompleteValue(currencyList, formInfo.CurrencyId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'CurrencyId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.currency)}
                  />
                )}
              />
            </Grid>

            <Grid item md={3} xs={12}>
              <FormControl>
                <RadioGroup
                  row
                  value={formInfo.isVal}
                  onChange={onRadioInputChange}
                  name='isVal'
                >
                  <FormControlLabel
                    value='1'
                    control={<Radio />}
                    label={intl.formatMessage(messages.enteredValues)}
                  />
                  <FormControlLabel
                    value='2'
                    control={<Radio />}
                    label={intl.formatMessage(messages.CalculatedValue)}
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

      <PayrollTable title='' data={tableData} columns={columns} />
    </PayRollLoader>
  );
}

DetailedPayrollReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(DetailedPayrollReport);
