import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete,
  Button,
  Checkbox,
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
import style from '../../../../../styles/styles.scss';
import EmployeeData from '../../Component/EmployeeData';
import PayRollLoader from '../../Component/PayRollLoader';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import GeneralListApis from '../../api/GeneralListApis';
import { formatNumber, getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/MonthlyVariablesReportData';
import messages from '../messages';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function MonthlyVariablesReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const pageTitle = localStorage.getItem('MenuName');

  const [companyList, setCompanyList] = useState([]);
  const [payTemplateList, setPayTemplateList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [elementsList, setElementsList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [formInfo, setFormInfo] = useState({
    EmployeeId: null,
    BranchId: branchId,
    TemplateId: 1,
    YearId: null,
    MonthId: null,
    ElmentIds: [],
    isBankTransfere: null,
    isVal: 1,

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

  const valueTypesList = [
    {
      id: 1,
      name: intl.formatMessage(messages.enteredValues),
    },
    {
      id: 2,
      name: intl.formatMessage(messages.CalculatedValue),
    },
  ];

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const payTemplate = await GeneralListApis(locale).GetPayTemplateList();
      setPayTemplateList(payTemplate);

      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthList(months);

      const elements = await GeneralListApis(locale).GetElementList(
        2,
        0,
        false
      );
      setElementsList(elements);

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
        download: false,
        print: false,
      },
    },

    {
      name: 'branchName',
      label: intl.formatMessage(messages.company),
    },

    {
      name: 'hiringDate',
      label: intl.formatMessage(messages.hiringDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.hiringDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'monthYear',
      label: intl.formatMessage(messages.monthYear),
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
  ];

  const [columns, setColumns] = useState(staticColumns);

  const getFilterHighlights = () => {
    const highlights = [];

    const year = getAutoCompleteValue(yearList, formInfo.YearId);
    const month = getAutoCompleteValue(monthList, formInfo.MonthId);
    const template = getAutoCompleteValue(payTemplateList, formInfo.TemplateId);
    const company = getAutoCompleteValue(companyList, formInfo.BranchId);
    const salaryType = getAutoCompleteValue(
      salaryTypesList,
      formInfo.isBankTransfere
    );
    const employee = getAutoCompleteValue(employeeList, formInfo.EmployeeId);
    const valueType = getAutoCompleteValue(valueTypesList, formInfo.isVal);

    if (employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: employee.name,
      });
    }

    if (salaryType) {
      highlights.push({
        label: intl.formatMessage(messages.salaryType),
        value: salaryType.name,
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

    if (company) {
      highlights.push({
        label: intl.formatMessage(messages.company),
        value: company.name,
      });
    }

    if (valueType) {
      highlights.push({
        label: intl.formatMessage(messages.CalculatedValue),
        value: valueType.name,
      });
    }

    if (formInfo.ElmentIds.length > 0) {
      highlights.push({
        label: intl.formatMessage(messages.element),
        value: formInfo.ElmentIds.map((item) => item.name).join(' , '),
      });
    }

    setFilterHighlights(highlights);
  };

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const ids = formInfo.ElmentIds.map((item) => item.id);
      const isBankTransfere = formInfo.isBankTransfere === null
        ? null
        : Boolean(formInfo.isBankTransfere);

      const params = {
        EmployeeId: formInfo.EmployeeId,
        BranchId: formInfo.BranchId,
        TemplateId: formInfo.TemplateId,
        YearId: formInfo.YearId,
        MonthId: formInfo.MonthId,
        isBankTransfere,
        isVal: formInfo.isVal,
      };

      const response = await api(locale).GetList(params, ids);
      setTableData(response);

      const excludedProperties = [
        'branchName',
        'hiringDate',
        'monthYear',
        'organizationName',
        'employeeCode',
        'employeeName',
        'jobName',
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
                customBodyRender: formatNumber,
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

  const onMultiAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onRadioInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };


  async function onCompanyAutocompleteChange(value) {
    setIsLoading(true);

    setFormInfo((prev) => ({
      ...prev,
      BranchId: value !== null ? value.id : null,
    }));

    try {
      const response = await GeneralListApis(locale).getOpenMonth(
        value !== null ? value.id : 0,
        0
      );

      setFormInfo((prev) => ({
        ...prev,
        MonthId: response.monthId,
        YearId: response.yearId,
      }));
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

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
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container mt={0} spacing={3} >

            <Grid spacing={2} item container xs={12} xl={7}>

            <Grid item xs={12} md={4}>
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
                onChange={(_, value) => onCompanyAutocompleteChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.company)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={6} md={3}>
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
            <Grid item xs={0} md={1}></Grid>

            <Grid item xs={5} md={3}>
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


            <Grid item xs={6}>
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

            </Grid>

            <Grid item xs={12} md={7} xl={5}>
              <Autocomplete
                options={elementsList}
                multiple
                disableCloseOnSelect
                className={`${style.AutocompleteMulSty} ${
                  locale === 'ar' ? style.AutocompleteMulStyAR : null
                }`}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={formInfo.ElmentIds}
                renderOption={(optionProps, option, { selected }) => (
                  <li {...optionProps} key={optionProps.id}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                      checkedIcon={<CheckBoxIcon fontSize='small' />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onMultiAutoCompleteChange(value, 'ElmentIds')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.element)}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={7} xl={7}>
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

      <SimplifiedPayrollTable
        title=''
        data={tableData}
        columns={columns}
        filterHighlights={filterHighlights}
      />
    </PayRollLoader>
  );
}

MonthlyVariablesReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(MonthlyVariablesReport);
