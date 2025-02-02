import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import style from '../../../../../styles/styles.scss'
import ApiData from "../api/PayrollReportsData";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import { toast } from "react-hot-toast";
import { format } from 'date-fns';
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { getAutoCompleteValue } from "../../helpers";

function SalaryComparisonReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    BranchId: branchId,
  });

  const [MonthList, setMonthList] = useState([]);
  const [YearList, setYearList] = useState([]);
  const [Month1, setMonth1] = useState(null);
  const [Year1, setYear1] = useState(null);
  const [Month2, setMonth2] = useState(null);
  const [Year2, setYear2] = useState(null);
  const [constElementsList, setConstElementsList] = useState([]);
  const [constElement, setConstElement] = useState(null);
  const [valElementsList, setValElementsList] = useState([]);
  const [ValElement, setValElement] = useState(null);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      searchData.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, searchData.EmployeeId);
    const status = getAutoCompleteValue(statusList, searchData.EmpStatusId);
    const company = getAutoCompleteValue(companyList, searchData.BranchId);

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

    if (status) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.status),
        value: status.name,
      });
    }

    if (company) {
      highlights.push({
        label: intl.formatMessage(messages.company),
        value: company.name,
      });
    }

    if (Month1) {
      highlights.push({
        label: intl.formatMessage(messages.month),
        value: Month1.name,
      });
    }

    if (Month2) {
      highlights.push({
        label: intl.formatMessage(messages.month),
        value: Month2.name,
      });
    }

    if (Year1) {
      highlights.push({
        label: intl.formatMessage(messages.year),
        value: Year1.name,
      });
    }

    if (Year2) {
      highlights.push({
        label: intl.formatMessage(messages.year),
        value: Year2.name,
      });
    }

    if (constElement && constElement.length > 0) {
      highlights.push({
        label: intl.formatMessage(messages.constElement),
        value: constElement.map((item) => item.name).join(' , '),
      });
    }

    if (ValElement && ValElement.length > 0) {
      highlights.push({
        label: intl.formatMessage(messages.valElement),
        value: ValElement.map((item) => item.name).join(' , '),
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {

    if (Year1 && Year2 && Month1 && Month2 && (constElement || ValElement)) {

      let constElementsData = ""
      let ValElementData = ""

      if (constElement !== null) {
        // used to reformat elements data ( combobox ) before send it to api
        constElement.map((ele, index) => {
          constElementsData += `${ele.id}`
          if (index + 1 !== constElement.length) {
            constElementsData += ","
          }
        })
      }

      if (ValElement !== null) {
        // used to reformat elements data ( combobox ) before send it to api
        ValElement.map((ele, index) => {
          ValElementData += `${ele.id}`
          if (index + 1 !== ValElement.length) {
            ValElementData += ","
          }
        })
      }


      try {
        setIsLoading(true);

        let formData = {
          EmployeeId: searchData.EmployeeId,
          EmployeeStatusId: searchData.EmpStatusId,
          OrganizationId: searchData.OrganizationId,
          VarElementIds: ValElementData,
          ConstElementIds: constElementsData,
          BranchId: searchData.BranchId
        };
        Object.keys(formData).forEach((key) => {
          formData[key] = formData[key] === null ? "" : formData[key];
        });


        const dataApi = await ApiData(locale).GetSalaryComparisonReport(Year1, Month1, Year2, Month2, formData);
        setdata(dataApi);

        getFilterHighlights();
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }
    else {
      toast.error(intl.formatMessage(messages.YouMustToChooseAllYears_AllMonthsAndAtLeastOneElement));
    }
  };

  async function fetchData() {
    try {
      const constElements = await GeneralListApis(locale).GetElementList(1, 1);
      const valElements = await GeneralListApis(locale).GetElementList(2);
      const months = await GeneralListApis(locale).GetMonths();
      const years = await GeneralListApis(locale).GetYears();

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);

      setConstElementsList(constElements)
      setValElementsList(valElements)

      setMonthList(months)
      setYearList(years)

    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "id",
      options: {
        display: false,
      },
    },
    {
      name: "employeeCode",
      label: intl.formatMessage(messages.EmpCode),
      options: {
        filter: true,
      },
    },
    {
      name: "employeeName",
      label: intl.formatMessage(messages.employeeName),
      options: {
        filter: true,
      },
    },

    {
      name: "elementName",
      label: intl.formatMessage(messages.element),
      options: {
        filter: true,
      },
    },
    {
      name: "v1",
      label: `${Month1 ? Month1.name : format(new Date(), 'MMM')} / ${Year1 ? Year1.name : format(new Date(), 'yyyy')}`,
      options: {
        filter: true,
      },
    },
    {
      name: "v2",
      label: `${Month2 ? Month2.name : format(new Date(), 'MMM')} / ${Year2 ? Year2.name : format(new Date(), 'yyyy')}`,
      options: {
        filter: true,
      },
    },
  ];



  function getPreviousMonth(monthAbbrev, year) {

    const date = new Date(`1 ${monthAbbrev} ${year}`);

    date.setMonth(date.getMonth() - 1);

    const previousMonth = date.toLocaleString("en-US", { month: "short" });
    const previousYear = date.getFullYear();

    return { month: previousMonth, year: previousYear };
  }

  const openMonthDateWithCompanyChangeFun = async (BranchId, EmployeeId) => {

    let OpenMonthData
    let selectedYear
    let selectedMonth
    let prevYear
    let prevMonth

    try {
      if (YearList.length !== 0 && MonthList.length !== 0) {
        if (!EmployeeId) {
          OpenMonthData = await GeneralListApis(locale).getOpenMonth(BranchId, 0);
        }
        else {
          OpenMonthData = await GeneralListApis(locale).getOpenMonth(0, EmployeeId);
        }

        selectedYear = YearList.find(item => item.id == OpenMonthData.yearId)
        selectedMonth = MonthList.find(item => item.id == OpenMonthData.monthId)


        if (selectedYear && selectedMonth) {
          const { month: previousMonth, year: previousYear } = getPreviousMonth(selectedMonth.name, selectedYear.name);

          prevYear = YearList.find(item => item.name == previousYear)
          prevMonth = MonthList.find(item => item.name == previousMonth)

          setYear2(prevYear ? prevYear : null)
          setMonth2(prevMonth ? prevMonth : null)
        }
        else {
          setYear2(null)
          setMonth2(null)
        }

        setYear1(selectedYear ? selectedYear : null)
        setMonth1(selectedMonth ? selectedMonth : null)

      }
    }
    catch (err) {

    }

  }


  useEffect(() => {
    if ((searchData.BranchId || searchData.BranchId !== "") && (!searchData.EmployeeId || searchData.EmployeeId === "")) {
      openMonthDateWithCompanyChangeFun(searchData.BranchId)
    }

    if ((!searchData.BranchId || searchData.BranchId === "") && (searchData.EmployeeId || searchData.EmployeeId !== "")) {
      openMonthDateWithCompanyChangeFun(0, searchData.EmployeeId)
    }

    if ((!searchData.BranchId || searchData.BranchId === "") && (!searchData.EmployeeId || searchData.EmployeeId === "")) {
      setYear1(null)
      setMonth1(null)
      setYear2(null)
      setMonth2(null)
    }

  }, [searchData.BranchId, searchData.EmployeeId, YearList, MonthList])


  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={5}>
            <Search
              setsearchData={setsearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              notShowDate={true}
              company={searchData.BranchId}
            ></Search>
          </Grid>

          <Grid item container spacing={2} lg={4} >

          <Grid item xs={6} md={4}  lg={6} >

            <Autocomplete
              id="ddlMenu"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={MonthList.length != 0 ? MonthList : []}
              value={Month1}
              getOptionLabel={(option) => (
                option ? option.name : ""
              )
              }
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                );
              }}
              onChange={(event, value) => {
                if (value !== null) {
                  setMonth1(value);
                } else {
                  setMonth1("");
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="VacationType"
                  label={intl.formatMessage(messages.Month)}
                  margin="normal"
                  className={style.fieldsSty}

                />
              )}
            />
          </Grid>

          <Grid item xs={6} md={4} lg={6}>

            <Autocomplete
              id="ddlMenu"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={YearList.length != 0 ? YearList : []}
              value={Year1}
              getOptionLabel={(option) => (
                option ? option.name : ""
              )
              }
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                );
              }}
              onChange={(event, value) => {
                if (value !== null) {
                  setYear1(value);
                } else {
                  setYear1(null);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="VacationType"
                  label={intl.formatMessage(messages.year)}
                  margin="normal"
                  className={style.fieldsSty}

                />
              )}
            />
          </Grid>

          <Grid item xs={6} md={4} lg={6}>

            <Autocomplete
              id="ddlMenu"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={MonthList.length != 0 ? MonthList : []}
              value={Month2}
              getOptionLabel={(option) => (
                option ? option.name : ""
              )
              }
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                );
              }}
              onChange={(event, value) => {
                if (value !== null) {
                  setMonth2(value);
                } else {
                  setMonth2("");
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="VacationType"
                  label={intl.formatMessage(messages.Month)}
                  margin="normal"
                  className={style.fieldsSty}

                />
              )}
            />
          </Grid>

          <Grid item xs={6} md={4} lg={6}>

            <Autocomplete
              id="ddlMenu"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={YearList.length != 0 ? YearList : []}
              value={Year2}
              getOptionLabel={(option) => (
                option ? option.name : ""
              )
              }
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                );
              }}
              onChange={(event, value) => {
                if (value !== null) {
                  setYear2(value);
                } else {
                  setYear2(null);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="VacationType"
                  label={intl.formatMessage(messages.year)}
                  margin="normal"
                  className={style.fieldsSty}

                />
              )}
            />
          </Grid>  

          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <Autocomplete
              multiple
              className={`${style.AutocompleteMulSty} ${locale === "ar" ? style.AutocompleteMulStyAR : null}`}
              id="checkboxes-tags-demo"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={constElementsList.length != 0 ? constElementsList : []}
              disableCloseOnSelect
              getOptionLabel={(option) => (
                option ? option.name : ""
              )
              }
              onChange={(event, value) => {
                if (value !== null && value.length !== 0) {
                  setConstElement(value);
                } else {
                  setConstElement(null);
                }
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField {...params}
                  label={intl.formatMessage(messages.constElement)}
                />
              )}
            />

          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <Autocomplete
              multiple
              className={`${style.AutocompleteMulSty} ${locale === "ar" ? style.AutocompleteMulStyAR : null}`}
              id="checkboxes-tags-demo"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={valElementsList.length != 0 ? valElementsList : []}
              disableCloseOnSelect
              getOptionLabel={(option) => (
                option ? option.name : ""
              )
              }
              onChange={(event, value) => {
                if (value !== null && value.length !== 0) {
                  setValElement(value);
                } else {
                  setValElement(null);
                }
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField {...params}
                  label={intl.formatMessage(messages.valElement)}
                />
              )}
            />

          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...Payrollmessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>

      <SimplifiedPayrollTable
        title=""
        data={data}
        filterHighlights={filterHighlights}
        columns={columns}
      />
    </PayRollLoaderInForms>
  );
}

SalaryComparisonReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(SalaryComparisonReport);
