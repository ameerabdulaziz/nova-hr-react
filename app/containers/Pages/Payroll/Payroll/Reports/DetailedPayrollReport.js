import {
  Autocomplete,
  Button,
  // FormControl,
  // FormControlLabel,
  Grid,
  // Radio,
  // RadioGroup,
  TextField,
} from "@mui/material";
import { PapperBlock } from "enl-components";
import PropTypes, { number, object } from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import EmployeeData from "../../Component/EmployeeData";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import GeneralListApis from "../../api/GeneralListApis";
import { formatNumber, formateDate, getAutoCompleteValue } from "../../helpers";
import payrollMessages from "../../messages";
import api from "../api/DetailedPayrollReportData";
import messages from "../messages";
import style from "../../../../../styles/styles.scss";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { getDateColumnOptions } from "../../Component/PayrollTable/utils.payroll-table";

function DetailedPayrollReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const pageTitle = localStorage.getItem("MenuName");

  const [companyList, setCompanyList] = useState([]);
  const [payTemplateList, setPayTemplateList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [jobLevelList, setJobLevelList] = useState([]);
  const [filterHighlights, setFilterHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [formInfo, setFormInfo] = useState({
    EmployeeId: null,
    BranchId: branchId,
    TemplateId: [1],
    YearId: null,
    MonthId: null,
    isBankTransfere: null,
    isInsured: null,
    isVal: 1,
    CurrencyId: null,
    JobLevelId: null,
    EmpStatusId: 1,
    OrganizationId: "",
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
    const insurance = getAutoCompleteValue(insuranceList, formInfo.isInsured);
    const currency = getAutoCompleteValue(currencyList, formInfo.CurrencyId);

    if (currency) {
      highlights.push({
        label: intl.formatMessage(messages.currency),
        value: currency.name,
      });
    }

    if (employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: employee.name,
      });
    }

    if (insurance) {
      highlights.push({
        label: intl.formatMessage(messages.insurance),
        value: insurance.name,
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

    setFilterHighlights(highlights);
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const payTemplate = await GeneralListApis(locale).GetPayTemplateList();
      setPayTemplateList(payTemplate);

      setFormInfo((prev) => ({ ...prev, TemplateId: [payTemplate[0]] }))

      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthList(months);

      const currency = await GeneralListApis(locale).MdCurrency();
      setCurrencyList(currency);

      const Jobleveldata = await GeneralListApis(locale).GetJobLevelList();
      setJobLevelList(Jobleveldata || []);

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
      name: "id",
      options: {
        display: false,
        print: false,
      },
    },

    {
      name: "branchName",
      label: intl.formatMessage(messages.company),
    },

    {
      name: "organizationName",
      label: intl.formatMessage(messages.department),
    },

    {
      name: "employeeCode",
      label: intl.formatMessage(messages.employeeCode),
    },

    {
      name: "employeeName",
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: "jobName",
      label: intl.formatMessage(messages.job),
    },

    {
      name: "hiringDate",
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
      name: "monthYear",
      label: intl.formatMessage(messages.monthYear),
    },

    {
      name: "netSal",
      label: intl.formatMessage(messages.netSalary),
      options: {
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
      },
    },

    {
      name: "insuCompValFixed",
      label: intl.formatMessage(messages.insuranceCompanyFixed),
      options: {
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
      },
    },

    {
      name: "insuEmpValFixed",
      label: intl.formatMessage(messages.insuranceEmployeeFixed),
      options: {
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
      },
    },

    {
      name: "taxVal",
      label: intl.formatMessage(messages.taxes),
      options: {
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
      },
    },

    {
      name: "totAllowances",
      label: intl.formatMessage(messages.totalAllownace),
      options: {
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
      },
    },

    {
      name: "totDed",
      label: intl.formatMessage(messages.totalDeduction),
      options: {
        customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
      },
    },
  ];

  const [columns, setColumns] = useState(staticColumns);

  const getFilterParams = () => {
    const params = {
      EmployeeId: formInfo.EmployeeId,
      BranchId: formInfo.BranchId,
      TemplateId: formInfo.TemplateId.map((item) => item.id),
      YearId: formInfo.YearId,
      MonthId: formInfo.MonthId,
      isInsured:
        formInfo.isInsured === null ? "" : Boolean(formInfo.isInsured),
      isBankTransfere: formInfo.isBankTransfere === null ? "" : Boolean(formInfo.isBankTransfere),
      //isVal: formInfo.isVal,
      CurrencyId: formInfo.CurrencyId === null ? "" : formInfo.CurrencyId,
      JobLevelId: formInfo.JobLevelId === null ? "" : formInfo.JobLevelId,
    };

    return params;
  };

  const fetchTableData = async () => {
    setIsLoading(true);
    const isBankTransfere =
      formInfo.isBankTransfere === null
        ? null
        : Boolean(formInfo.isBankTransfere);

    try {
      const response = await api(locale).GetList(getFilterParams());
      setTableData(response);

      const excludedProperties = [
        "branchName",
        "organizationName",
        "employeeCode",
        "employeeName",
        "hiringDate",
        "jobName",
        "monthYear",
        "insuCompValFixed",
        "insuEmpValFixed",
        "taxVal",
        "totAllowances",
        "totDed",
        "netSal",
      ];

      const newColumns = [];

      if (response.length > 0) {
        Object.keys(response[0]).forEach((key) => {
          if (!excludedProperties.includes(key)) {
            newColumns.push({
              name: key,
              label: key,
              options: {
                customBodyRender: (value) => formatNumber(value),
              },
            });
          } else {
            var filterdobj = staticColumns.filter((i) => i.name == key);
            newColumns.push(filterdobj[0]);
          }
        });
      }

      setColumns(newColumns);

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
    if (name === "employeeId") {
      setFormInfo((prev) => ({
        ...prev,
        EmployeeId: id,
      }));
    }
  }, []);

  useEffect(() => {
    fetchNeededData();
  }, []);

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

  const exportExcelAPI = async () => {
    try {
      setIsLoading(true);

      const payload = {
        templateId: formInfo.TemplateId.map((item) => item.id),
        request: {
          lang: locale,
          headers: columns
            .filter((item) => item?.options?.download !== false)
            .map((column) => ({
              key: column.name,
              value: column.label,
            })),
        },
      };

      const exportedFile = await api(locale).exportList(
        payload,
        getFilterParams()
      );

      const url = window.URL.createObjectURL(new Blob([exportedFile]));
      const link = document.createElement('a');

      link.href = url;

      link.setAttribute(
        'download',
        `${pageTitle}-${formateDate(new Date(), 'yyyy-MM-dd-HH-mm-SS')}.xlsx`
      );
      document.body.appendChild(link);

      link.click();
      link?.parentNode?.removeChild(link);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={pageTitle} desc="">
        <form onSubmit={onFormSubmit}>
          <Grid container mt={0} spacing={3} >
            <Grid item container spacing={2} xl={12}>


              <Grid item xs={12} md={6} lg={4} xl={3} >
                <Autocomplete
                  options={companyList}
                  value={getAutoCompleteValue(companyList, formInfo.BranchId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => (option ? option.name : "")}
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

              <Grid item xs={12} md={6} lg={8} xl={9} ></Grid>

              <Grid item xs={12} lg={7} xl={5}  >
                <Autocomplete
                  options={payTemplateList}
                  multiple
                  disableCloseOnSelect
                  className={`${style.AutocompleteMulSty} ${locale === "ar" ? style.AutocompleteMulStyAR : null
                    }`}
                  value={formInfo.TemplateId}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  renderOption={(optionProps, option, { selected }) => (
                    <li {...optionProps} key={optionProps.id}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  // onChange={(_, value) =>
                  //   onAutoCompleteChange(value, "TemplateId")
                  // }
                  onChange={(_, value) =>
                    setFormInfo((prev) => ({ ...prev, TemplateId: value }))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}

                      label={intl.formatMessage(messages.template)}
                    />
                  )}
                />
              </Grid> 

              <Grid item xs={12}  lg={5} xl={7}></Grid>

              <Grid item xs={6} lg={3} xl={1.5}>
                <Autocomplete
                  options={salaryTypesList}
                  value={getAutoCompleteValue(
                    salaryTypesList,
                    formInfo.isBankTransfere
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) =>
                    onAutoCompleteChange(value, "isBankTransfere")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.salaryType)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6} lg={3} xl={2}>
                <Autocomplete
                  options={insuranceList}
                  value={getAutoCompleteValue(insuranceList, formInfo.isInsured)}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) =>
                    onAutoCompleteChange(value, "isInsured")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.insurance)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6} lg={3} xl={2.5}>

                <Autocomplete
                  options={currencyList}
                  value={getAutoCompleteValue(currencyList, formInfo.CurrencyId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) =>
                    onAutoCompleteChange(value, "CurrencyId")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.currency)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6} lg={3} xl={2}>

                <Autocomplete
                  id="ddljobLevelId"
                  options={jobLevelList || []}
                  // value={jobLevelId}
                  value={getAutoCompleteValue(jobLevelList, formInfo.JobLevelId)}
                  isOptionEqualToValue={(option, value) =>
                    value.id === 0 || value.id === "" || option.id === value.id
                  }
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {option.name}
                      </li>
                    );
                  }}
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  onChange={(_, value) =>
                    onAutoCompleteChange(value, "JobLevelId")
                  }
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      name="jobLevelId"
                      label={intl.formatMessage(messages.joblevel)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}  xl={4}></Grid>

              <Grid item xs={6} md={3} lg={2} xl={1.5}>
                <Autocomplete
                  options={yearList}
                  value={getAutoCompleteValue(yearList, formInfo.YearId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, "YearId")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={intl.formatMessage(messages.year)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6} md={3} lg={2} xl={1.5}>
                <Autocomplete
                  options={monthList}
                  value={getAutoCompleteValue(monthList, formInfo.MonthId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, "MonthId")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={intl.formatMessage(messages.month)}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} lg={8} xl={8}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={formInfo.EmployeeId}
                required={false}
                branchId={formInfo.BranchId}
              />
            </Grid>

            <Grid item xs={12}></Grid>

            <Grid item >
              <Button variant="contained" color="primary" type="submit">
                {intl.formatMessage(payrollMessages.search)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>

      <SimplifiedPayrollTable
        title=""
        data={tableData}
        columns={columns}
        exportExcelAPI={exportExcelAPI}
        filterHighlights={filterHighlights}
      />
    </PayRollLoaderInForms>
  );
}

DetailedPayrollReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(DetailedPayrollReport);
