import React, { useEffect, useState,useRef } from "react";
import ApiData from "../api/AssessmentReportData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import style from "../../../../../styles/styles.scss";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { getAutoCompleteValue } from "../../helpers";

function PeerAppraisalReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [Employee, setEmployee] = useState("");
  const [DepartmentList, setDepartmentList] = useState([]);
  const [Department, setDepartment] = useState("");
  const [MonthList, setMonthList] = useState([]);
  const [Month, setMonth] = useState("");
  const [YearList, setYearList] = useState([]);
  const [Year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [statusList, setStatusList] = useState([
    {id: 1 , name: intl.formatMessage(messages.Done)},
    {id: 2 , name: intl.formatMessage(messages.notDone)}
  ]);

  const [filterHighlights, setFilterHighlights] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(DepartmentList, Department);
    const employee = getAutoCompleteValue(EmployeeList, Employee);
    const selectedStatus = getAutoCompleteValue(statusList, status);
    const year = getAutoCompleteValue(YearList, Year);
    const month = getAutoCompleteValue(MonthList, Month);

    if (month) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.month),
        value: month.name,
      });
    }

    if (year) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.year),
        value: year.name,
      });
    }

    if (organization) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: organization.name,
      });
    }

    if (selectedStatus) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: selectedStatus.name,
      });
    }

    if (employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: employee.name,
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {
        try {
        setIsLoading(true);

        const dataApi = await ApiData(locale).PeerAppraisalReportApi(Year,Month,Employee,Department,status);

        setdata(dataApi);

        getFilterHighlights();
        } catch (err) {
        } finally {
        setIsLoading(false);
        }
  };

  async function fetchData() {
    setIsLoading(true);
    
    try {
      const empolyees = await GeneralListApis(locale).GetEmployeeList();
      const departments = await GeneralListApis(locale).GetDepartmentList();
      const months = await GeneralListApis(locale).GetMonths();
      const years = await GeneralListApis(locale).GetYears();

      setEmployeeList(empolyees)
      setDepartmentList(departments)
      setMonthList(months)
      setYearList(years)

    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);


  const columns = [
    {
      name: 'employeeId',
      options: {
        filter: false,
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: 'evaluatorEmployeeName',
      label: intl.formatMessage(messages.evaluatorEmployee),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.evaluatedEmployee),
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.organization),
    },
    {
      name: 'month',
      label: intl.formatMessage(messages.month),
    },
    {
      name: 'totalDegree',
      label: intl.formatMessage(messages.totalDegree),
    }
  ];

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3.5} xl={3}>
                <Autocomplete
                   options={EmployeeList.length != 0 ? EmployeeList: []}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(event, value) => {
                    if (value !== null) {
                        setEmployee(value.id);
                    } else {
                        setEmployee("");
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.employeeName)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4.5} xl={4}>
                      <Autocomplete
                      id="ddlMenu"   
                      isOptionEqualToValue={(option, value) => option.id === value.id}                      
                      options={DepartmentList.length != 0 ? DepartmentList: []}
                      getOptionLabel={(option) =>(
                          option  ? option.name : ""
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
                              setDepartment(value.id);
                          } else {
                              setDepartment("");
                          }
                      }}
                      renderInput={(params) => (
                      <TextField
                          {...params}
                          name="VacationType"
                          label={intl.formatMessage(messages.department)}
                          margin="normal" 
                          className={style.fieldsSty}
                          
                          />
                  )}
                  />
              </Grid>
              <Grid item xs={4} sm={6} md={3} lg={2} xl={1.5}>
                <Autocomplete
                    id="ddlMenu"   
                    isOptionEqualToValue={(option, value) => option.id === value.id}                      
                    options={MonthList.length != 0 ? MonthList: []}
                    getOptionLabel={(option) =>(
                        option  ? option.name : ""
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
                            setMonth(value.id);
                        } else {
                            setMonth("");
                        }
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        name="VacationType"
                        label={intl.formatMessage(messages.months)}
                        margin="normal" 
                        className={style.fieldsSty}
                        />
                    )}
                    /> 
              </Grid>
              <Grid item xs={4} sm={6} md={3} lg={2} xl={1.5}>
                  <Autocomplete
                  id="ddlMenu"   
                  isOptionEqualToValue={(option, value) => option.id === value.id}                      
                  options={YearList.length != 0 ? YearList: []}
                  getOptionLabel={(option) =>(
                      option  ? option.name : ""
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
                          setYear(value !== null ? value.id : null);
                      } else {
                          setYear("");
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
            <Grid item xs={4} sm={6} md={4} lg={3.5} xl={2}>
                <Autocomplete
                id="Status"
                options={statusList}
                isOptionEqualToValue={(option, value) => {
                    return (
                    option.id === value.id || value.id === 0 || value.id === ""
                    );
                }}
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                    setStatus(value !== null ? value.id : "")
                }}
                renderInput={(params) => (
                    <TextField
                    variant="outlined"
                    {...params}
                    name="Status"
                    label={intl.formatMessage(messages.status)}
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
                <FormattedMessage {...payrollMessages.search} />
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

PeerAppraisalReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(PeerAppraisalReport);
