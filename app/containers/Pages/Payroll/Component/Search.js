import React, { memo, useState, useEffect, useCallback } from "react";
import Payrollmessages from "../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import useStyles from "../Style";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GeneralListApis from "../api/GeneralListApis";
import { useSelector } from "react-redux";
import { Grid, TextField, Autocomplete } from "@mui/material";
import { format } from "date-fns";

function Search(props) {
  const {
    intl,
    setsearchData,
    searchData,
    notShowDate,
    setIsLoading,
    notShowStatus,
  } = props;
  const { classes } = useStyles();
  const [EmployeeList, setEmployeeList] = useState([]);
  const [OrganizationList, setOrganizationList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const locale = useSelector((state) => state.language.locale);

  const handleChange = useCallback(async (name, value) => {
    if (name == "fromDate")
      setsearchData((prevFilters) => ({
        ...prevFilters,
        FromDate: value == null ? null : format(new Date(value), "yyyy-MM-dd"),
      }));

    if (name == "toDate")
      setsearchData((prevFilters) => ({
        ...prevFilters,
        ToDate: value == null ? null : format(new Date(value), "yyyy-MM-dd"),
      }));

    if (name == "employeeId")
      setsearchData((prevFilters) => ({
        ...prevFilters,
        EmployeeId: value,
      }));

    if (name == "organizationId") {
      debugger ;
      var employees = [];
      if (value) {
        employees = await GeneralListApis(locale).GetEmployeeListByDepartment(
          value
        );
      } else {
        employees = await GeneralListApis(locale).GetEmployeeList();
      }
      setEmployeeList(employees);
      setsearchData((prevFilters) => ({
        ...prevFilters,
        OrganizationId: value,
        EmployeeId: "",
      }));
    }

    if (name == "statusId")
      setsearchData((prevFilters) => ({
        ...prevFilters,
        EmpStatusId: value,
      }));
  }, []);

  async function fetchData() {
    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);
      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Grid container spacing={2} alignItems="flex-start" direction="row">
        {notShowDate ? (
          ""
        ) : (
          <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label={intl.formatMessage(Payrollmessages.fromdate)}
                value={searchData.FromDate}
                onChange={(date) => {
                  handleChange("fromDate", date);
                }}
                className={classes.field}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </LocalizationProvider>
          </Grid>
        )}
        {notShowDate ? (
          ""
        ) : (
          <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label={intl.formatMessage(Payrollmessages.todate)}
                value={searchData.ToDate}
                onChange={(date) => {
                  handleChange("toDate", date);
                }}
                className={classes.field}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </LocalizationProvider>
          </Grid>
        )}
        <Grid item xs={12} md={3}>
          <Autocomplete
            id="organizationId"
            options={OrganizationList}
            isOptionEqualToValue={(option, value) =>
              value.id === 0 || value.id === "" || option.id === value.id
            }
            value={
              searchData.OrganizationId
                ? OrganizationList.find(
                    (item) => item.id === searchData.OrganizationId
                  )
                : null
            }
            getOptionLabel={(option) => (option.name ? option.name : "")}
            onChange={(event, value) => {
              handleChange("organizationId", value == null ? "" : value.id);
            }}
            renderInput={(params) => (
              <TextField
                variant="outlined"
                {...params}
                name="OrganizationId"
                label={intl.formatMessage(Payrollmessages.organizationName)}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Autocomplete
            id="employeeId"
            options={EmployeeList}
            isOptionEqualToValue={(option, value) =>
              value.id === 0 || value.id === "" || option.id === value.id
            }
            value={
              searchData.EmployeeId
                ? EmployeeList.find(
                    (item) => item.id === searchData.EmployeeId
                  )
                : null
            }
            getOptionLabel={(option) => (option.name ? option.name : "")}
            onChange={(event, value) => {
              handleChange("employeeId", value == null ? "" : value.id);
            }}
            renderInput={(params) => (
              <TextField
                variant="outlined"
                {...params}
                name="employeeId"
                label={intl.formatMessage(Payrollmessages.employeeName)}
              />
            )}
          />
        </Grid>
        {notShowStatus ? (
          ""
        ) : (
          <Grid item xs={12} md={2}>
            <Autocomplete
              id="EmpStatusId"
              options={statusList}
              value={
                statusList.length > 0 &&
                statusList.find(
                  (item) => item.id === searchData.EmpStatusId
                ) !== undefined
                  ? statusList.find(
                      (item) => item.id === searchData.EmpStatusId
                    )
                  : { id: 0, name: "" }
              }
              isOptionEqualToValue={(option, value) => {
                return (
                  option.id === value.id || value.id === 0 || value.id === ""
                );
              }}
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                handleChange("statusId", value == null ? "" : value.id);
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="EmpStatusId"
                  label={intl.formatMessage(Payrollmessages.Empstatus)}
                />
              )}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

const MemoedSearch = memo(Search);

export default injectIntl(MemoedSearch);
