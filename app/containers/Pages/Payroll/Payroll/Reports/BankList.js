import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import XLSX from 'xlsx-js-style';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import GeneralListApis from '../../api/GeneralListApis';
import { formatNumber, formateDate, getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/BankListData';
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
  const [exportList, setExportList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);

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

    if (sheetSty === "headerSty") {
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

    const fileName = getAutoCompleteValue(exportList, exportInfo.template)?.name ?? 'Payroll';

    if (fileType !== "csv") {
      XLSX.writeFile(workbook, fileName + '.xlsx');
    }
    else {
      XLSX.writeFile(workbook, fileName + '.CSV');
    }

  };

  // TODO: Mohammed Taysser
  // 1. move templates to separate file
  // 2. can convert rows from array to object's ??
  const getCIBTemplate = () => {

    const numberFormatSty = { numFmt: '0' } // make cell type number

    const styles = {
      font: { bold: true, color: { rgb: '000000' } },
      fill: { fgColor: { rgb: '008000' } },
    };

    const textSty = { numFmt: '@' }  // make cell type text
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

    if (formInfo.exportSectionAndCode) {
      headers.push({ v: 'Employee Code', s: styles })
      headers.push({ v: 'Section', s: styles })
      headers.push({ v: 'Administration', s: styles })
    }

    const today = new Date();

    const debitAmount = tableData.reduce((acc, item) => acc + (item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? item.netSal : 0), 0);

    const bank = getAutoCompleteValue(bankList, formInfo.BankId);

    const firstRow = [
      formateDate(today, 'dd/MM/yyyy'), // File_Date
      formateDate(today, 'dd/MM/yyyy'), // Value_Date
      'Salary', // Narrative
      'egp', // Currency
      'CIBEEGCXXXX', // Creditor_BIC_Code
      bank?.bnkAcc ?? '', // Account_Number
      bank?.name ?? '', // Account_Name
      { v: debitAmount.toFixed(2), s: numberFormatSty }, // Debit_Amount
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
      { v: debitAmount.toFixed(2), s: numberFormatSty }, // Debit_Amount
      {
        v: debitAmount.toFixed(2),
        s: {
          font: { bold: true, color: { rgb: '000000' } },
          fill: { fgColor: { rgb: 'ffffcc' } },
          numFmt: '0'
        },
      }, // Credit_Amount
    ];

    const bodyRows = tableData.map((item) => [

      ...(item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? [ // used for do not list employees without netSal in sheet

        formateDate(today, 'dd/MM/yyyy'), // File_Date
        formateDate(today, 'dd/MM/yyyy'), // Value_Date
        'Salary', // Narrative
        'egp', // Currency
        'CIBEEGCXXXX', // Creditor_BIC_Code
        item.bnkAcc ? { v: item.bnkAcc, s: textSty } : '0000', // Account_Number
        item.employeeName, // Account_Name
        '', // Debit_Amount
        {
          v: item.netSal.toFixed(2),
          s: {
            font: { bold: true, color: { rgb: '000000' } },
            fill: { fgColor: { rgb: 'ffffcc' } },
            numFmt: '0'
          },
        }, // Credit_Amount
        ...(formInfo.exportSectionAndCode ? [item.employeeCode, item.organizationName ,item.parentname] : []) // Employee Code and Section

      ] : [])
    ]).filter(
      arr => arr.length > 0 && arr[0] !== undefined // used to remove empty arrays from generated array
    );




    return [headers, firstRow, ...bodyRows, lastRow];
  };

  const getDefaultTemplate = () => {

    const textSty = { numFmt: '@' } // make cell type text
    const numberFormatSty = { numFmt: '0' } // make cell type number


    const total = tableData.reduce((summation, item) => summation + (item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? item.netSal : 0), 0)

    const headers = [
      'Beneficiary Account No',
      'Beneficiary Name',
      'Transaction Currency',
      'Payment Amount',
      'Employee ID',
    ];

    if (formInfo.exportSectionAndCode) {
      headers.push('Employee Code')
      headers.push('Section')
      headers.push('Administration')
    }

    const rows = tableData.map((item) => [
      ...(item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? [ // used for do not list employees without netSal in sheet
        { v: item.bnkAcc, s: textSty }, // Beneficiary Account No
        item.employeeName, // Beneficiary Name
        'EGP', // Transaction Currency
        { v: item.netSal.toFixed(2), s: numberFormatSty }, // Payment Amount
        // formatNumber(item.netSal), // Payment Amount
        item.employeeCode, // Employee ID
        ...(formInfo.exportSectionAndCode ? [item.employeeCode, item.organizationName ,item.parentname] : []) // Employee Code and Section
      ] : [])
    ]).filter(
      arr => arr.length > 0 && arr[0] !== undefined // used to remove empty arrays from generated array
    );


    const footer = [
      '',
      '',
      'Total',
      { v: total.toFixed(2), s: numberFormatSty }
    ]

    return [headers, ...rows, footer];
  };

  const getCridetAgricoleTemplate = () => {

    const numberFormatSty = { numFmt: '0' } // make cell type number

    const total = tableData.reduce((summation, item) => summation + (item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? item.netSal : 0), 0)

    const rows = tableData.map((item) => [
      ...(item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? [ // used for do not list employees without netSal in sheet
        item.bnkAcc,
        item.employeeName,
        'salary',
        { v: item.netSal.toFixed(2), s: numberFormatSty },
        ...(formInfo.exportSectionAndCode ? [item.employeeCode, item.organizationName , item.parentname] : []) // Employee Code and Section
      ] : [])
    ]).filter(
      arr => arr.length > 0 && arr[0] !== undefined // used to remove empty arrays from generated array
    );

    const footer = [
      '',
      '',
      'Total',
      { v: total.toFixed(2), s: numberFormatSty }
    ]

    return [...rows, footer];
  };

  const getHSBCTemplate = () => {
    const today = new Date();
    const numberFormatSty = { numFmt: '0' } // make cell type number

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

    if (formInfo.exportSectionAndCode) {
      headers.push({ v: 'Employee Code', s: styles })
      headers.push({ v: 'Section', s: styles })
      headers.push({ v: 'Administration', s: styles })
    }

    const bank = getAutoCompleteValue(bankList, formInfo.BankId);

    const total = tableData.reduce((summation, item) => summation + (item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? item.netSal : 0), 0)

    const rows = tableData.map((item) => [
      ...(item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? [ // used for do not list employees without netSal in sheet
        'ACH', // Payment type
        bank?.bnkAcc ?? '', // Debit Account Number
        'EG', // Debit Account Country
        'EGP', // Debit Account Currency
        'EGP', // Transaction currency
        { v: item.netSal.toFixed(2), s: numberFormatSty }, // Transaction Amount
        formateDate(today, 'yyyyMMdd'), // Value Date
        `${formateDate(today, 'MMMM')} Salary yyy`, // First Party Reference
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
        ...(formInfo.exportSectionAndCode ? [item.employeeCode, item.organizationName ,item.parentname] : []) // Employee Code and Section
      ] : [])
    ]).filter(
      arr => arr.length > 0 && arr[0] !== undefined  // used to remove empty arrays from generated array
    );


    const footer = [
      '',
      '',
      '',
      '',
      'Total',
      { v: total.toFixed(2), s: numberFormatSty }
    ]

    return [headers, ...rows, footer];
  };

  const getQNBTemplate = () => {

    const textSty = { numFmt: '@' } // make cell type text
    const numberFormatSty = { numFmt: '0' } // make cell type number

    const headers = [
      'Branch code',
      'Customer ID ',
      'Account Number',
      'Employee Name',
      'Code',
      'Reason',
      'Amount',
    ];

    if (formInfo.exportSectionAndCode) {
      headers.push('Employee Code')
      headers.push('Section')
      headers.push('Administration')
    }

    const total = tableData.reduce((summation, item) => summation + (item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? item.netSal : 0), 0)

    const rows = tableData.map((item) => [
      ...(item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? [ // used for do not list employees without netSal in sheet
        item.bnkBrcode, // Branch code
        item.bnkEmpCode, // Customer ID
        { v: item.bnkAcc, s: textSty }, // Account Number
        item.employeeName, // Employee Name
        item.bnkBrcode, // Code
        '', // Reason
        { v: item.netSal.toFixed(2), s: numberFormatSty }, // Amount
        ...(formInfo.exportSectionAndCode ? [item.employeeCode, item.organizationName , item.parentname] : []) // Employee Code and Section
      ] : [])
    ]).filter(
      arr => arr.length > 0 && arr[0] !== undefined // used to remove empty arrays from generated array
    );

    const footer = [
      '',
      '',
      '',
      '',
      '',
      'Total',
      { v: total.toFixed(2), s: numberFormatSty }
    ]

    return [headers, ...rows, footer];
  };

  const getQNBArabicTemplate = () => {

    const numberFormatSty = { numFmt: '0' } // make cell type number

    const totalAmount = tableData.reduce((summation, item) => summation + (item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? item.netSal : 0), 0)

    const styles = {
      font: { bold: true, color: { rgb: '000000' } },
      fill: { fgColor: { rgb: 'e7e7e7' } },
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },    // Thin black border on top
        bottom: { style: 'thin', color: { rgb: '000000' } }, // Thin black border on bottom
        left: { style: 'thin', color: { rgb: '000000' } },  // Thin black border on left
        right: { style: 'thin', color: { rgb: '000000' } }  // Thin black border on right
      },
    };


    const styles2 = {
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },    // Thin black border on top
        bottom: { style: 'thin', color: { rgb: '000000' } }, // Thin black border on bottom
        left: { style: 'thin', color: { rgb: '000000' } },  // Thin black border on left
        right: { style: 'thin', color: { rgb: '000000' } }  // Thin black border on right
      },
    }

    //  const textSty = { numFmt: '@' } // make cell type text

    const title1 = [
      'السادة بنك قطر الوطنى',
    ]

    const title2 = [
      'يرجى التكرم بخصم',
      { v: totalAmount.toFixed(2), s: numberFormatSty }
    ]

    const title3 = [
      'من حسابكم رقم',
      tableData[0]?.accNo,
      'وأضافة الى الحسابات ادناه حسب الجدول التالى:',
    ]

    const headers = [
      { v: 'BRANCH CODE', s: styles },
      { v: 'ID', s: styles },
      { v: 'ACCOUNT Number', s: styles },
      { v: 'Name', s: styles },
      { v: 'Code SN', s: styles },
      { v: 'Reason', s: styles },
      { v: 'Amount', s: styles },
    ];

    if (formInfo.exportSectionAndCode) {
      headers.push({ v: 'Employee Code', s: styles })
      headers.push({ v: 'Section', s: styles })
      headers.push({ v: 'Administration', s: styles })
    }

    const rows = tableData.map((item) => [
      ...(item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? [ // used for do not list employees without netSal in sheet
        { v: item.bnkBrcode, s: styles2 }, // Branch code
        { v: '', s: styles2 },  // ID
        { v: item.bnkAcc, s: styles2 }, // Account Number
        { v: item.employeeName, s: styles2 }, // Employee Name
        { v: item.bnkBrcode, s: styles2 }, // Code
        { v: '', s: styles2 }, // Reason
        { v: item.netSal.toFixed(2), s: { ...styles2, ...numberFormatSty } },  // Amount
        ...(formInfo.exportSectionAndCode ? [{ v: item.employeeCode, s: styles2 }, { v: item.organizationName, s: styles2 } , { v: item.parentname, s: styles2 }] : []) // Employee Code and Section
      ] : [])
    ]).filter(
      arr => arr.length > 0 && arr[0] !== undefined // used to remove empty arrays from generated array
    );

    const footer = [
      '',
      '',
      '',
      '',
      '',
      'الاجمالى',
      { v: totalAmount.toFixed(2), s: numberFormatSty }
    ]

    return [title1, title2, title3, "", headers, ...rows, footer];
  };



  const getCIBSmsTemplate = () => {

    const textSty = { numFmt: '@' } // make cell type text
    const numberFormatSty = { numFmt: '0' } // make cell type number
    const customSty = { numFmt: '##' }  // make cell custom format ( show number in cell without fractions and Rounding a decimal number )
    const bank = getAutoCompleteValue(bankList, formInfo.BankId);
    const company = getAutoCompleteValue(companyList, formInfo.BranchId)
    const totalAmount = tableData.reduce((summation, item) => summation + (item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? item.netSal : 0), 0)

    const headers = [
      'SALARY 1',
      'ACCOUNT NAME',
      'COMPANY NAME',
      'ACCOUNT NO',
    ];

    if (formInfo.exportSectionAndCode) {
      headers.push('Employee Code')
      headers.push('Section')
      headers.push('Administration')
      
    }

    const rows = tableData.map((item) => [
      ...(item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? [ // used for do not list employees without netSal in sheet
        { v: item.netSal.toFixed(2), s: numberFormatSty }, // SALARY 1
        item.employeeName ?? '', // ACCOUNT NAME
        company?.name ?? '', // COMPANY NAME
        { v: item.bnkAcc, s: textSty }, // ACCOUNT NO
        ...(formInfo.exportSectionAndCode ? [item.employeeCode, item.organizationName ,item.parentname] : []) // Employee Code and Section
      ] : [])
    ]).filter(
      arr => arr.length > 0 && arr[0] !== undefined // used to remove empty arrays from generated array
    );

    const footer = [
      { v: totalAmount.toFixed(2), s: numberFormatSty },
      'Total',
    ]

    return [headers, ...rows, '', footer];
  };


  const getAAIBTemplate = () => {

    const textSty = { numFmt: '@' } // make cell type text
    const numberFormatSty = { numFmt: '0' } // make cell type number
    const customSty = { numFmt: '##' } // make cell custom format ( show number in cell without fractions and Rounding a decimal number )
    const headers = [
      'Org_Cus_Num',
      'Emp_Ref_Num',
      'Emp_Name',
      'NID',
      'Emp_Acc_Num',
      'Curr',
      '', // Amount
      'Hiring Date',
      'Emp_Position',
      'SDU',
    ];

    if (formInfo.exportSectionAndCode) {
      headers.push('Employee Code')
      headers.push('Section')
      headers.push('Administration')
    }

    const total = tableData.reduce((summation, item) => summation + (item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? item.netSal : 0), 0)

    const rows = tableData.map((item, index) => [
      ...(item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? [ // used for do not list employees without netSal in sheet
        item.accNo, // Org_Cus_Num
        index + 1, // Emp_Ref_Num
        item.employeeName, // Emp_Name
        '', // NID
        { v: item.bnkAcc, s: textSty }, // Emp_Acc_Num
        'EGP', // Curr
        { v: item.netSal.toFixed(2), s: numberFormatSty }, // Amount
        '', // Hiring Date
        '', // Emp_Position
        '', // SDU
        ...(formInfo.exportSectionAndCode ? [item.employeeCode, item.organizationName ,item.parentname] : []) // Employee Code and Section
      ] : [])
    ]).filter(
      arr => arr.length > 0 && arr[0] !== undefined // used to remove empty arrays from generated array
    );

    const footer = [
      '',
      '',
      '',
      '',
      '',
      'Total',
      { v: total.toFixed(2), s: numberFormatSty },
    ]

    return [headers, ...rows, footer];
  };

  const getABSmsTemplate = () => {

    const textSty = { numFmt: '@' }  // make cell type text
    const numberFormatSty = { numFmt: '0' } // make cell type number
    const customSty = { numFmt: '##' } // make cell custom format ( show number in cell without fractions and Rounding a decimal number )
    const headers = [
      'Employee Name',
      'Account',
      'Amount',
    ];

    if (formInfo.exportSectionAndCode) {
      headers.push('Employee Code')
      headers.push('Section')
      headers.push('Administration')
    }

    const total = tableData.reduce((summation, item) => summation + (item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? item.netSal : 0), 0)


    const rows = tableData.map((item, index) => [
      ...(item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? [ // used for do not list employees without netSal in sheet
        item.employeeName, // Employee Name
        { v: item.bnkAcc, s: textSty }, // Account
        { v: item.netSal.toFixed(2), s: numberFormatSty }, // Amount
        ...(formInfo.exportSectionAndCode ? [item.employeeCode, item.organizationName , item.parentname] : []) // Employee Code and Section
      ] : [])
    ]).filter(
      arr => arr.length > 0 && arr[0] !== undefined // used to remove empty arrays from generated array
    );


    const footer = [
      '',
      'Total',
      { v: total.toFixed(2), s: numberFormatSty },
    ]

    return [headers, ...rows, footer];
  };

  const getCSVFileTemplate = () => {

    const textSty = { numFmt: '@' } // make cell type text
    const headers = [
      'مسلسل',
      'رقم الحساب',
      'الاسم',
      'جيروكود ',
      'المبلغ',
    ];

    if (formInfo.exportSectionAndCode) {
      headers.push('Employee Code')
      headers.push('Section')
      headers.push('Administration')
    }


    const total = tableData.reduce((summation, item) => summation + (item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? item.netSal : 0), 0)

    const rows = tableData.map((item, index) => [
      ...(item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? [ // used for do not list employees without netSal in sheet
        index + 1, // مسلسل
        item.bnkAcc, // رقم الحساب
        item.employeeName, // الاسم
        '', // جيروكود
        item.netSal.toFixed(2), // Amount
        ...(formInfo.exportSectionAndCode ? [item.employeeCode, item.organizationName ,item.parentname] : []) // Employee Code and Section
      ] : [])
    ]).filter(
      arr => arr.length > 0 && arr[0] !== undefined // used to remove empty arrays from generated array
    );


    const footer = [
      '',
      '',
      '',
      'Total',
      total.toFixed(2),
    ]

    return [headers, ...rows, footer];
  };


  const getNBETemplate = () => {

    const numberFormatSty = { numFmt: '0' } // make cell type number
    const textSty = { numFmt: '@' }  // make cell type text

    let totalAmount = tableData.reduce((summation, item) => summation + (item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? item.netSal : 0), 0)

    const styles = {
      font: { bold: true, color: { rgb: '000000' } },
      fill: { fgColor: { rgb: 'e7e7e7' } },
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },    // Thin black border on top
        bottom: { style: 'thin', color: { rgb: '000000' } }, // Thin black border on bottom
        left: { style: 'thin', color: { rgb: '000000' } },  // Thin black border on left
        right: { style: 'thin', color: { rgb: '000000' } }  // Thin black border on right
      },
    };

    const styles2 = {
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },    // Thin black border on top
        bottom: { style: 'thin', color: { rgb: '000000' } }, // Thin black border on bottom
        left: { style: 'thin', color: { rgb: '000000' } },  // Thin black border on left
        right: { style: 'thin', color: { rgb: '000000' } }  // Thin black border on right
      },
    }



    const title1 = [
      'السادة / بنك الاتحاد الوطنى',
    ]

    const title2 = [
      'يرجى التكرم بخصم',
      { v: totalAmount.toFixed(2), s: numberFormatSty }
    ]

    const title3 = [
      'من حسابنا لديكم رقم',
      tableData[0]?.accNo,
      'وأضافة الى الحسابات ادناه حسب الجدول التالى:',
    ]

    const headers = [
      { v: 'SN', s: styles },
      { v: 'ACCOUNT Number', s: styles },
      { v: 'Currency', s: styles },
      { v: 'Staff name', s: styles },
      { v: 'Net salary', s: styles },
    ];

    if (formInfo.exportSectionAndCode) {
      headers.push({ v: 'Employee Code', s: styles })
      headers.push({ v: 'Section', s: styles })
      headers.push({ v: 'Administration', s: styles })
    }

    const rows = tableData.map((item, index) => [
      ...(item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? [ // used for do not list employees without netSal in sheet
        { v: index + 1, s: styles2 }, // SN
        { v: item.bnkAcc, s: styles2 }, // ACCOUNT Number
        { v: "EGP", s: styles2 }, // Currency
        { v: item.employeeName, s: styles2 },  // Staff name
        { v: item.netSal.toFixed(2), s: { ...styles2, ...numberFormatSty } }, // Net salary
        ...(formInfo.exportSectionAndCode ? [{ v: item.employeeCode, s: styles2 }, { v: item.organizationName, s: styles2 } ,{ v: item.parentname, s: styles2 }] : []) // Employee Code and Section
      ] : [])
    ]).filter(
      arr => arr.length > 0 && arr[0] !== undefined  // used to remove empty arrays from generated array
    );

    const footer = [
      '',
      '',
      '',
      'الاجمالى',
      { v: totalAmount.toFixed(2), s: numberFormatSty }
    ]

    return [title1, title2, title3, "", headers, ...rows, footer];
  };

  const getNBXFileTemplate = () =>{

    const numberFormatSty = { numFmt: '0' } 

    const total = tableData.reduce((summation, item) => summation + (item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? item.netSal : 0), 0)

    const headers = [
      'TransactionID',
      'CreditorName',
      'CreditorAccountNumber',
      'CreditorBank',
      'CreditorBankBranch',
      'TransactionAmount',
      'TransactionPurpose',
      'Comments',
    ];

    if (formInfo.exportSectionAndCode) {
      headers.push('Employee Code')
      headers.push('Section')
      headers.push('Administration')
    }

    const rows = tableData.map((item) => [
      ...(item.netSal !== null && item.netSal !== undefined && item.netSal.length !== 0 && item.netSal > 0 ? [ 
       "",
       item.employeeName ,
       item.bnkAcc,
       "NBK",
       item.bnkBrcode,
       { v: item.netSal.toFixed(2), s: numberFormatSty }, 
       "SALA",
       "",
        ...(formInfo.exportSectionAndCode ? [item.employeeCode, item.organizationName , item.parentname] : []) 
      ] : [])
    ]).filter(
      arr => arr.length > 0 && arr[0] !== undefined 
    );


    const footer = [
      '',
      '',
      '',
      '',
      'total',
      { v: total.toFixed(2), s: numberFormatSty },
      '',
      '',
    ]

    return [headers, ...rows, footer];

  }


  const onExportBtnClick = () => {

    switch (exportInfo.template) {
      case 12:
        exportJsonToXLSX(getCIBTemplate());
        break;

      case 2:
        exportJsonToXLSX(getHSBCTemplate(), 'HSBCnet File Upload');
        break;

      case 3:
        exportJsonToXLSX(getNBETemplate(), 'NBE File Upload', 'headerSty');
        break;

      case 4:
        exportJsonToXLSX(getQNBTemplate(), 'QNB File Upload');
        break;

      case 5:
        exportJsonToXLSX(getQNBArabicTemplate(), 'QNB Arabic File Upload', 'headerSty');
        break;

      case 16:
        exportJsonToXLSX(getCridetAgricoleTemplate(), 'Bank_sheet');
        break;

      case 17:
        exportJsonToXLSX(getCIBSmsTemplate(), 'CIB Sms File Upload');
        break;

      case 18:
        exportJsonToXLSX(getAAIBTemplate(), 'AAIB File Upload');
        break;

      case 19:
        exportJsonToXLSX(getABSmsTemplate(), 'AB SMS File Upload');
        break;

      case 30:
        exportJsonToXLSX(getCSVFileTemplate(), 'CSV File Upload', null, "csv");
        break;

      case 31:
        exportJsonToXLSX(getNBXFileTemplate(), 'NBX الكويتى الوطنى');
        break;

      default:
        exportJsonToXLSX(getDefaultTemplate(), 'Bank File Upload');
        break;
    }
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
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container mt={0} spacing={3}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
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

            <Grid item xs={12} md={6} lg={4} xl={3}>
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

            <Grid item xs={12} md={6} lg={4} xl={3}>
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

            <Grid item xs={12} md={6} lg={4} xl={3}>
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

            <Grid item xs={12} md={6} lg={4} xl={3}>
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

            <Grid item xs={12} md={3} lg={2} xl={1.5}>
              <Grid item >
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
                /></Grid>
            </Grid>

            <Grid item xs={12} md={3} lg={2} xl={1.5}>
              <Grid item >
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
                /></Grid>
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

            <Grid item xs={12} md={6} lg={4} xl={3}>
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

            <Grid item >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => {
                        setFormInfo((prev) => ({
                          ...prev,
                          exportSectionAndCode: e.target.checked,
                        }))
                      }}
                    />
                  }
                  label={intl.formatMessage(messages.exportSectionAndCode)} />
                {/* label="Export section and code" /> */}
              </FormGroup>
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

      <SimplifiedPayrollTable title='' data={tableData} columns={columns} filterHighlights={filterHighlights} />
    </PayRollLoaderInForms>
  );
}

BankList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(BankList);
