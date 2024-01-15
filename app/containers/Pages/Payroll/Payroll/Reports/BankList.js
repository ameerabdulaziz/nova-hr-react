import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  Stack,
  TextField
} from '@mui/material';
import { format } from 'date-fns';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import XLSX from 'xlsx-js-style';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import { formatNumber } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/BankListData';
import messages from '../messages';

function BankList(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);

  const Title = localStorage.getItem('MenuName');

  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [payTemplateList, setPayTemplateList] = useState([]);
  const [exportList, setExportList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [formInfo, setFormInfo] = useState({
    YearId: null,
    MonthId: null,
    BankId: null,
    OrganizationId: null,
    PayTemplateId: null,
    CurrencyId: null,
    BranchId: branchId
  });

  const [exportInfo, setExportInfo] = useState({
    type: 'export',
    template: 0,

    file: null,
    startWriteRows: 3,
    account: '',
    salary: '',
    iban: '',
    swift: '',
  });

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
      },
    },

    {
      name: 'organizationName',
      label: intl.formatMessage(messages.organization),
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

    {
      name: 'netSal',
      label: intl.formatMessage(messages.netSalary),
      options: {
        filter: true,
        customBodyRender: formatNumber,
      },
    },

    {
      name: 'accNo',
      label: intl.formatMessage(messages.bankNumber),
      options: {
        filter: true,
      },
    },

    {
      name: 'bnk_name',
      label: intl.formatMessage(messages.bankName),
      options: {
        filter: true,
      },
    },
  ];

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

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const payTemplate = await GeneralListApis(locale).GetPayTemplateList();
      setPayTemplateList(payTemplate);

      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthList(months);

      const department = await GeneralListApis(locale).GetDepartmentList();
      setDepartmentList(department);

      const bank = await GeneralListApis(locale).GetBankList();
      setBankList(bank);

      const currency = await GeneralListApis(locale).MdCurrency();
      setCurrencyList(currency);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const exportListResponse = await GeneralListApis(locale).GetBankListRpt();
      setExportList(exportListResponse);

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

    const body = {
      YearId: formInfo.YearId,
      MonthId: formInfo.MonthId,
      PayTemplateId: formInfo.PayTemplateId,
    };

    const params = {
      BankId: formInfo.BankId,
      OrganizationId: formInfo.OrganizationId,
      CurrencyId: formInfo.CurrencyId,
      BranchId: formInfo.BranchId,
    };

    try {
      const response = await api(locale).GetList(body, params);
      setTableData(response);
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

  // const onExportRadioInputChange = (evt) => {
  //   setExportInfo((prev) => ({
  //     ...prev,
  //     [evt.target.name]: evt.target.value,
  //   }));
  // };

  // const onNumericExportInputChange = (evt) => {
  //   setExportInfo((prev) => ({
  //     ...prev,
  //     [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
  //   }));
  // };

  // const onExportInputChange = (evt) => {
  //   setExportInfo((prev) => ({
  //     ...prev,
  //     [evt.target.name]: evt.target.value,
  //   }));
  // };

  const onExportAutoCompleteChange = (value, name) => {
    setExportInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  // const onExcelFileInputChange = (evt) => {
  //   const file = evt.target.files[0];

  //   console.log(file);

  //   if (file) {
  //     // check if uploaded file is larger than 1MB
  //     if (file.size < 10000000) {
  //       if (file.type === 'application/vnd.ms-excel') {
  //         setExportInfo((prev) => ({ ...prev, file }));
  //         const reader = new FileReader();

  //         reader.onload = (event) => {
  //           const workbook = XLSX.read(event.target.result);
  //           const sheets = workbook.SheetNames;

  //           if (sheets.length) {
  //             const rows = XLSX.utils.sheet_to_json(
  //               workbook.Sheets[sheets[0]],
  //               { raw: false }
  //             );
  //             console.log(rows);
  //           } else {
  //             toast.error(intl.formatMessage(messages.fileIsEmpty));
  //           }
  //         };

  //         reader.readAsArrayBuffer(file);
  //       } else {
  //         toast.error(intl.formatMessage(messages.fileExtensionShouldBeExcel));
  //       }
  //     } else {
  //       toast.error(intl.formatMessage(messages.fileSizeShouldBeLessThan10MB));
  //     }
  //   }
  // };

  const exportJsonToXLSX = (rows = [], sheetName = 'Payroll') => {
    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const fileName = getAutoCompleteValue(exportList, exportInfo.template)?.name ?? 'Payroll';

    XLSX.writeFile(workbook, fileName + '.xlsx');
  };

  // TODO: Mohammed Taysser
  // 1. move templates to separate file
  // 2. can convert rows from array to object's ??
  const getCIBTemplate = () => {
    const styles = {
      font: { bold: true, color: { rgb: '000000' } },
      fill: { fgColor: { rgb: '008000' } },
    };

    const headers = [
      { v: 'File_Date', s: styles },
      { v: 'Value_Date', s: styles },
      { v: 'Narrative', s: styles },
      { v: 'Currency', s: styles },
      { v: 'Creditor_BIC_Code', s: styles },
      { v: 'Account_Number', s: styles },
      { v: 'Account_Name', s: styles },
      { v: 'Debit_Amount', s: styles },
      { v: 'Credit_Amount', s: styles },
    ];

    const today = new Date();

    const debitAmount = tableData.reduce((acc, item) => acc + item.netSal, 0);

    const bank = getAutoCompleteValue(bankList, formInfo.BankId);

    const firstRow = [
      format(today, 'dd/MM/yyyy'), // File_Date
      format(today, 'dd/MM/yyyy'), // Value_Date
      'Salary', // Narrative
      'egp', // Currency
      'CIBEEGCXXXX', // Creditor_BIC_Code
      bank?.accNo ?? '', // Account_Number
      bank?.name ?? '', // Account_Name
      formatNumber(debitAmount), // Debit_Amount
      '', // Credit_Amount
    ];

    const lastRow = [
      '', // File_Date
      '', // Value_Date
      '', // Narrative
      '', // Currency
      '', // Creditor_BIC_Code
      '', // Account_Number
      tableData.length, // Account_Name
      formatNumber(debitAmount), // Debit_Amount
      {
        v: formatNumber(debitAmount),
        s: {
          font: { bold: true, color: { rgb: '000000' } },
          fill: { fgColor: { rgb: 'ffffcc' } },
        },
      }, // Credit_Amount
    ];

    const bodyRows = tableData.map((item) => [
      format(today, 'dd/MM/yyyy'), // File_Date
      format(today, 'dd/MM/yyyy'), // Value_Date
      'Salary', // Narrative
      'egp', // Currency
      'CIBEEGCXXXX', // Creditor_BIC_Code
      item.accNo ?? '0000', // Account_Number
      item.employeeName, // Account_Name
      '', // Debit_Amount
      {
        v: formatNumber(item.netSal),
        s: {
          font: { bold: true, color: { rgb: '000000' } },
          fill: { fgColor: { rgb: 'ffffcc' } },
        },
      }, // Credit_Amount
    ]);

    return [headers, firstRow, ...bodyRows, lastRow];
  };

  const getDefaultTemplate = () => {
    const headers = [
      'Beneficiary Account No',
      'Beneficiary Name',
      'Transaction Currency',
      'Payment Amount',
      'Employee ID',
    ];

    const rows = tableData.map((item) => [
      item.accNo, // Beneficiary Account No
      item.employeeName, // Beneficiary Name
      'EGP', // Transaction Currency
      formatNumber(item.netSal), // Payment Amount
      item.employeeCode, // Employee ID
    ]);

    return [headers, ...rows];
  };

  const getCridetAgricoleTemplate = () => {
    const rows = tableData.map((item) => [
      item.accNo,
      item.employeeName,
      'salary',
      formatNumber(item.netSal),
    ]);

    return rows;
  };

  const getHSBCTemplate = () => {
    const today = new Date();

    const styles = {
      font: { bold: true, color: { rgb: '000000' } },
    };
    const headers = [
      { v: 'Payment type', s: styles },
      { v: 'Debit Account Number', s: styles },
      { v: 'Debit Account Country', s: styles },
      { v: 'Debit Account Currency', s: styles },
      { v: 'Transaction currency', s: styles },
      { v: 'Transaction Amount', s: styles },
      { v: 'Value Date', s: styles },
      { v: 'First Party Reference', s: styles },
      { v: 'Payment Set Code', s: styles },
      { v: 'Bene Name', s: styles },
      { v: 'Address 1', s: styles },
      { v: 'Address 2', s: styles },
      { v: 'Address 3', s: styles },
      { v: 'Bene Account No', s: styles },
      { v: 'Bene Country Code', s: styles },
      { v: 'Second Party Reference', s: styles },
      { v: 'Second Party ID', s: styles },
      { v: 'LCC code/CBID code', s: styles },
      { v: 'ADVICE-TEXT', s: styles },
      { v: 'E-mail ID-1', s: styles },
      { v: 'Name of EM recepient 1', s: styles },
      { v: 'E-mail ID-2', s: styles },
      { v: 'Name of EM recepient 2', s: styles },
      { v: 'E-mail ID-3', s: styles },
      { v: 'Name of EM recepient 3', s: styles },
      { v: 'E-mail ID-4', s: styles },
      { v: 'Name of EM recepient 4', s: styles },
      { v: 'E-mail ID-5', s: styles },
      { v: 'Name of EM recepient 5', s: styles },
      { v: 'E-mail ID-6', s: styles },
      { v: 'Name of EM recepient 6', s: styles },
      { v: 'Remittance Information 1', s: styles },
      { v: 'Remittance Information 2', s: styles },
      { v: 'Remittance Information 3', s: styles },
      { v: 'Remittance Information 4', s: styles },
      { v: 'Charges Code', s: styles },
      { v: 'Purpose of Payment', s: styles },
      { v: 'SWIFT BIC / LCC Code Indicator', s: styles },
    ];

    const bank = getAutoCompleteValue(bankList, formInfo.BankId);

    const rows = tableData.map((item) => [
      'ACH', // Payment type
      bank?.accNo ?? '', // Debit Account Number
      'EG', // Debit Account Country
      'EGP', // Debit Account Currency
      'EGP', // Transaction currency
      formatNumber(item.netSal), // Transaction Amount
      format(today, 'yyyyMMdd'), // Value Date
      `${format(today, 'MMMM')} Salary yyy`, // First Party Reference
      '', // Payment Set Code
      item.employeeName, // Bene Name
      '', // Address 1
      '', // Address 2
      '', // Address 3
      item.accNo, // Bene Account No
      'EG', // Bene Country Code
      '', // Second Party Reference
      '', // Second Party ID
      '11111111', // LCC code/CBID code
      '', // ADVICE-TEXT
      '', // E-mail ID-1
      '', // Name of EM recepient 1
      '', // E-mail ID-2
      '', // Name of EM recepient 2
      '', // E-mail ID-3
      '', // Name of EM recepient 3
      '', // E-mail ID-4
      '', // Name of EM recepient 4
      '', // E-mail ID-5
      '', // Name of EM recepient 5
      '', // E-mail ID-6
      '', // Name of EM recepient 6
      '', // Remittance Information 1
      '', // Remittance Information 2
      '', // Remittance Information 3
      '', // Remittance Information 4
      '', // Charges Code
      'SALA', // Purpose of Payment
      '', // SWIFT BIC / LCC Code Indicator
    ]);

    return [headers, ...rows];
  };

  const onExportBtnClick = () => {
    switch (exportInfo.template) {
      case 12:
        exportJsonToXLSX(getCIBTemplate());
        break;

      case 2:
        exportJsonToXLSX(getHSBCTemplate(), 'HSBCnet File Upload');
        break;

      case 16:
        exportJsonToXLSX(getCridetAgricoleTemplate(), 'Bank_sheet');
        break;

      case 0:
      default:
        exportJsonToXLSX(getDefaultTemplate(), 'Bank File Upload');
        break;
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
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
                value={getAutoCompleteValue(
                  companyList,
                  formInfo.BranchId
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'BranchId')
                }
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
                    label={intl.formatMessage(messages.organization)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={currencyList}
                value={getAutoCompleteValue(
                  currencyList,
                  formInfo.CurrencyId
                )}
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

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              {/* <FormControl>
                <RadioGroup
                  row
                  value={exportInfo.type}
                  onChange={onExportRadioInputChange}
                  name='type'
                >
                  <FormControlLabel
                    value='export'
                    control={<Radio />}
                    label={intl.formatMessage(messages.exportToNewFile)}
                  />
                  <FormControlLabel
                    value='update'
                    control={<Radio />}
                    label={intl.formatMessage(messages.updateExistingFile)}
                  />
                </RadioGroup>
              </FormControl> */}
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={exportList}
                value={getAutoCompleteValue(exportList, exportInfo.template)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onExportAutoCompleteChange(value, 'template')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.exportTemplate)}
                  />
                )}
              />
            </Grid>

            {/* <Grid item xs={12} md={2}>
              <TextField
                name='account'
                value={exportInfo.account}
                required
                onChange={onExportInputChange}
                label={intl.formatMessage(messages.account)}
                fullWidth
                variant='outlined'
                disabled={exportInfo.type === 'export'}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                name='startWriteRows'
                value={exportInfo.startWriteRows}
                required
                onChange={onNumericExportInputChange}
                label={intl.formatMessage(messages.dataFromLineNumber)}
                fullWidth
                disabled={exportInfo.type === 'export'}
                variant='outlined'
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                name='iban'
                value={exportInfo.iban}
                required
                onChange={onNumericExportInputChange}
                label={intl.formatMessage(messages.iban)}
                fullWidth
                variant='outlined'
                disabled={exportInfo.type === 'export'}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                name='swift'
                value={exportInfo.swift}
                required
                onChange={onExportInputChange}
                label={intl.formatMessage(messages.swift)}
                fullWidth
                disabled={exportInfo.type === 'export'}
                variant='outlined'
              />
            </Grid> */}

            <Grid item xs={12}>
              <Stack spacing={2} direction='row'>
                <Button variant='contained' color='primary' type='submit'>
                  {intl.formatMessage(payrollMessages.search)}
                </Button>

                <Button
                  variant='contained'
                  color='primary'
                  onClick={onExportBtnClick}
                >
                  {intl.formatMessage(messages.export)}
                </Button>

                {/* <div>
                  <input
                    accept='application/vnd.ms-excel'
                    id='excel-attachment-button-file'
                    name='Competency'
                    type='file'
                    onChange={onExcelFileInputChange}
                    style={{ display: 'none' }}
                  />
                  <Button
                    variant='contained'
                    color='secondary'
                    htmlFor='excel-attachment-button-file'
                    component='label'
                    disabled={exportInfo.type === 'export'}
                  >
                    {intl.formatMessage(messages.upload)}
                  </Button>
                </div> */}
              </Stack>
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

BankList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(BankList);
