import {
    Autocomplete,
    Button,
    Grid,
    Stack,
    TextField,
  } from '@mui/material';
  import { PapperBlock } from 'enl-components';
  import PropTypes from 'prop-types';
  import React, { useEffect, useState } from 'react';
  import { injectIntl } from 'react-intl';
  import { useSelector } from 'react-redux';
  import XLSX from 'xlsx-js-style';
  import PayRollLoader from '../../Component/PayRollLoader';
  import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
  import GeneralListApis from '../../api/GeneralListApis';
  import { formatNumber, formateDate, getAutoCompleteValue } from '../../helpers';
  import payrollMessages from '../../messages';
  import api from '../api/WBSData';
  import messages from '../messages';
  
  function BankList(props) {
    const { intl } = props;
    const locale = useSelector((state) => state.language.locale);
    const { branchId = null } = useSelector((state) => state.authReducer.user);
    const pageTitle = localStorage.getItem('MenuName');
  
    const [yearList, setYearList] = useState([]);
    const [monthList, setMonthList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [payTemplateList, setPayTemplateList] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const [currencyList, setCurrencyList] = useState([]);
    const [SelectedRows, setSelectedRows] = useState([]);
    const [SelectedRowsData, setSelectedRowsData] = useState([]);
    const [filterHighlights, setFilterHighlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [formInfo, setFormInfo] = useState({
      YearId: null,
      MonthId: null,
      BankId: null,
      OrganizationId: null,
      PayTemplateId: 1,
      CurrencyId: null,
      BranchId: branchId,
      exportSectionAndCode: false
    });
    
    const columns = [
      {
        name: 'id',
        options: {
          filter: false,
          display: false,
          print: false,
        },
      },
  
      {
        name: 'organizationName',
        label: intl.formatMessage(messages.organization),
      },
  
      {
        name: 'employeeCode',
        label: intl.formatMessage(messages.employeeCode),
      },
  
      {
        name: 'employeeName',
        label: intl.formatMessage(payrollMessages.employeeName),
      },
  
      {
        name: 'jobName',
        label: intl.formatMessage(messages.job),
      },
  
      {
        name: 'netSal',
        label: intl.formatMessage(messages.netSalary),
        options: {
          filter: true,
          customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
        },
      },
  
      {
        name: 'accNo',
        label: intl.formatMessage(messages.bankNumber),
      },
  
      {
        name: 'bnk_name',
        label: intl.formatMessage(messages.bankName),
      },
    ];


    const options = {
        selectableRows: 'multiple',
        customToolbarSelect: () => null,
        onRowSelectionChange: (rows, allRows, rowsSelectedIndexes) => {
          const selectedTableRows = tableData.filter((_, index) => rowsSelectedIndexes.includes(index))
          
            setSelectedRows(rowsSelectedIndexes);
            setSelectedRowsData(selectedTableRows)
        },
        rowsSelected: SelectedRows
      };
  
    const getFilterHighlights = () => {
      const highlights = [];
  
      const company = getAutoCompleteValue(companyList, formInfo.BranchId);
      const year = getAutoCompleteValue(yearList, formInfo.YearId);
      const month = getAutoCompleteValue(monthList, formInfo.MonthId);
      const template = getAutoCompleteValue(payTemplateList, formInfo.PayTemplateId);
      const department = getAutoCompleteValue(departmentList, formInfo.OrganizationId);
      const bank = getAutoCompleteValue(bankList, formInfo.BankId);
      const currency = getAutoCompleteValue(currencyList, formInfo.CurrencyId);
  
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
  
      if (department) {
        highlights.push({
          label: intl.formatMessage(messages.department),
          value: department.name,
        });
      }
  
      if (bank) {
        highlights.push({
          label: intl.formatMessage(messages.bank),
          value: bank.name,
        });
      }
  
      if (currency) {
        highlights.push({
          label: intl.formatMessage(messages.currency),
          value: currency.name,
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
        const payTemplate = await GeneralListApis(locale).GetPayTemplateList();
        setPayTemplateList(payTemplate);
  
        const years = await GeneralListApis(locale).GetYears();
        setYearList(years);
  
        const months = await GeneralListApis(locale).GetMonths();
        setMonthList(months);
  
        const department = await GeneralListApis(locale).GetDepartmentList(branchId);
        setDepartmentList(department);
  
        const bank = await GeneralListApis(locale).GetBankList();
        setBankList(bank);
  
        const company = await GeneralListApis(locale).GetBranchList();
        setCompanyList(company);
  
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
  
    const fetchTableData = async () => {
      setIsLoading(true);
  
      const params = {
        BankId: formInfo.BankId ? formInfo.BankId : "",
        OrganizationId: formInfo.OrganizationId ? formInfo.OrganizationId : "",
        BranchId: formInfo.BranchId ? formInfo.BranchId : "",
      };
  
      try {
        const response = await api(locale).GetList(formInfo.YearId,formInfo.MonthId,formInfo.PayTemplateId,params);
        setTableData(response);
  
        getFilterHighlights();
      } catch (error) {
        //        
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchNeededData();
    }, []);
  
    const onFormSubmit = (evt) => {
      evt.preventDefault();
  
      fetchTableData();
    };
  
    const onAutoCompleteChange = (value, name) => {
      setFormInfo((prev) => ({
        ...prev,
        [name]: value !== null ? value.id : null,
      }));
    };
  
    const exportJsonToXLSX = (rows = [], sheetName = 'Payroll', sheetSty, fileType) => {
      const worksheet = XLSX.utils.aoa_to_sheet(rows);
  
      const workbook = XLSX.utils.book_new();
      const startRowNumSty = sheetSty === "headerSty" ? 4 : 0
  
       // Calculate column widths dynamically
       const colWidths = rows[startRowNumSty].map((_, colIndex) => {
        const colContent = rows.map(row => (row[colIndex]?.v || row[colIndex] || "").toString());
        const maxLength = Math.max(...colContent.map(str => str.length), 10); // Minimum width of 10
        return { wch: maxLength };
      });
      
      if(sheetSty === "headerSty")
      { 
        // Set row height for a specific row (e.g., Row 5)
        worksheet["!rows"] = [
          undefined,         // Row 1: No height adjustment
          undefined,         // Row 2: No height adjustment
          undefined,         // Row 3: No height adjustment
          undefined,         // Row 4: No height adjustment
          { hpt: 25 },       // Row 5: Height in points
        ];
      }
      
  
      // Assign calculated widths to the worksheet
          worksheet["!cols"] = colWidths;
  
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
      // const fileName = getAutoCompleteValue(exportList, exportInfo.template)?.name ?? 'Payroll';
      const fileName = "Employee Bank Sheet WBS";
  
      XLSX.writeFile(workbook, fileName + '.xlsx');
        
    };
  
    // TODO: Mohammed Taysser
    // 1. move templates to separate file
    // 2. can convert rows from array to object's ??
    const getDefaultTemplate = () => {
  
      const headers = [
        'Organization',
        'Employee Code',
        'Employee Name',
        'Job',
        'Net Salary',
        'Bank Number',
        'Bank Name',
      ];

      const rows = SelectedRowsData.map((item) => [
          item.organizationName, // Organization
          item.employeeCode, // Employee Code
          item.employeeName, // Employee Name
          item.jobName, // Job
          formatNumber(item.netSal), // Net Salary
          item.accNo, // Bank Number
          item.bnk_name, // Bank Name
      ])
  
      return [headers, ...rows];
    };
    
    const onExportBtnClick = async () => {

      // used to get selected rows data ids
      const selectedIds =  SelectedRowsData.map(obj => obj.id)

      try
      {
        const response = await api(locale).Save(selectedIds);


        if(response.status === 200)
        {
            exportJsonToXLSX(getDefaultTemplate(), 'Bank File Upload');

            setSelectedRows([]);
            setSelectedRowsData([])

            fetchTableData()
            
        }        
      }
      catch(err){}
    };
  
    async function onCompanyAutocompleteChange(value) {
      setIsLoading(true);
  
      setFormInfo((prev) => ({
        ...prev,
        BranchId: value !== null ? value.id : null,
        OrganizationId: null,
      }));
  
      try {
        const response = await GeneralListApis(locale).getOpenMonth(
          value !== null ? value.id : 0,
          0
        );
  
  
        const organizations = await GeneralListApis(locale).GetDepartmentList(value ? value.id : null);
        setDepartmentList(organizations)
  
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
  
    return (
      <PayRollLoader isLoading={isLoading}>
        <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
          <form onSubmit={onFormSubmit}>
            <Grid container mt={0} spacing={3}>
              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={bankList}
                  value={getAutoCompleteValue(bankList, formInfo.BankId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'BankId')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.bank)}
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
                  options={payTemplateList}
                  value={getAutoCompleteValue(
                    payTemplateList,
                    formInfo.PayTemplateId
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
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
                      required
                      label={intl.formatMessage(messages.template)}
                    />
                  )}
                />
              </Grid>
  
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
                  onChange={(_, value) => onCompanyAutocompleteChange(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.company)}
                    />
                  )}
                />
              </Grid>
  
              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={departmentList}
                  value={getAutoCompleteValue(
                    departmentList,
                    formInfo.OrganizationId
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'OrganizationId')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(payrollMessages.organizationName)}
                    />
                  )}
                />
              </Grid>
  
              <Grid item xs={12}>
                <Stack spacing={2} direction='row'>
                  <Button variant='contained' color='primary' type='submit'>
                    {intl.formatMessage(payrollMessages.search)}
                  </Button>
  
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={onExportBtnClick}
                    disabled={SelectedRows.length === 0 ? true : false}
                  >
                    {intl.formatMessage(messages.export)}
                  </Button>
  
                </Stack>
              </Grid>
            </Grid>
          </form>
        </PapperBlock>
  
        <SimplifiedPayrollTable 
            title='' 
            data={tableData} 
            columns={columns} 
            options={options}
            filterHighlights={filterHighlights} 
            />
      </PayRollLoader>
    );
  }
  
  BankList.propTypes = {
    intl: PropTypes.object.isRequired,
  };
  
  export default injectIntl(BankList);
  