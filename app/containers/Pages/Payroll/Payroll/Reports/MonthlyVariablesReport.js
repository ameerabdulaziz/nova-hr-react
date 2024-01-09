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
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss';
import EmployeeData from '../../Component/EmployeeData';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import { formatNumber, formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/MonthlyVariablesReportData';
import messages from '../messages';

function MonthlyVariablesReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [companyList, setCompanyList] = useState([]);
  const [payTemplateList, setPayTemplateList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [elementsList, setElementsList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [formInfo, setFormInfo] = useState({
    EmployeeId: null,
    BranchId: null,
    TemplateId: null,
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

      const elements = await GeneralListApis(locale).GetElementList(2, 0, false);
      setElementsList(elements);
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
      },
    },

    {
      name: 'branchName',
      label: intl.formatMessage(messages.company),
      options: {
        filter: true,
      },
    },

    {
      name: 'hiringDate',
      label: intl.formatMessage(messages.hiringDate),
      options: {
        filter: true,
        customBodyRender: formateDate,
      },
    },

    {
      name: 'monthYear',
      label: intl.formatMessage(messages.monthYear),
      options: {
        filter: true,
      },
    },

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
      name: 'jobName',
      label: intl.formatMessage(messages.job),
      options: {
        filter: true,
      },
    },
  ];

  const [columns, setColumns] = useState(staticColumns);

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const ids = formInfo.ElmentIds.map(item => item.id);

      const params = {
        EmployeeId: formInfo.EmployeeId,
        BranchId: formInfo.BranchId,
        TemplateId: formInfo.TemplateId,
        YearId: formInfo.YearId,
        MonthId: formInfo.MonthId,
        isBankTransfere: formInfo.isBankTransfere === null ? null : Boolean(formInfo.isBankTransfere),
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

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    searchOpen: true,
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
  };

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

            <Grid item xs={12} md={6}>
              <Autocomplete
                options={elementsList}
                multiple
                disableCloseOnSelect
                className={`${style.AutocompleteMulSty} ${
                  locale === 'ar' ? style.AutocompleteMulStyAR : null
                }`}
                isOptionEqualToValue={(option, value) => option.id === value.id
                }
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

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={salaryTypesList}
                value={getAutoCompleteValue(
                  salaryTypesList,
                  formInfo.isBankTransfere
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id
                }
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

      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=''
          data={tableData}
          columns={columns}
          options={options}
        />
      </div>
    </PayRollLoader>
  );
}

MonthlyVariablesReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(MonthlyVariablesReport);
