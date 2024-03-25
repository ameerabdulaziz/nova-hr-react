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

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function Search(props) {
  const {
    intl,
    setsearchData,
    searchData,
    notShowDate,
    setIsLoading,
    notShowStatus,
    DateError,
    setDateError,
    requireEmployee,
    notShowEmployeeName,
    BranchIdRequired
  } = props;
  const { classes } = useStyles();
  const [EmployeeList, setEmployeeList] = useState([]);
  const [OrganizationList, setOrganizationList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const locale = useSelector((state) => state.language.locale);



  const handleChange = useCallback(async (name, value) => {
    if (name == "fromDate")
    {
 
      setsearchData((prevFilters) => ({
                ...prevFilters,
                FromDate: value ,
              }))
    }

    if (name == "toDate")
    {

      setsearchData((prevFilters) => ({
                ...prevFilters,
                ToDate: value 
              }))
    }

    if (name == "employeeId")
      setsearchData((prevFilters) => ({
        ...prevFilters,
        EmployeeId: value,
      }));

    if (name == "organizationId") {
      setIsLoading(true);
      const employees = await GeneralListApis(locale).GetEmployeeList(null, null, searchData.BranchId, value);

      setEmployeeList(employees);
      setsearchData((prevFilters) => ({
        ...prevFilters,
        OrganizationId: value,
        EmployeeId: "",
      }));
      setIsLoading(false);
    }

    if (name == "statusId")
      setsearchData((prevFilters) => ({
        ...prevFilters,
        EmpStatusId: value,
      }));

    if (name === 'BranchId') {
      setIsLoading(true);
      const employees = await GeneralListApis(locale).GetEmployeeList(null, null, value, searchData.OrganizationId);

      setEmployeeList(employees);

      const organizations = await GeneralListApis(locale).GetDepartmentList(value);
      setOrganizationList(organizations);

      setsearchData((prevFilters) => ({
        ...prevFilters,
        BranchId: value,
        OrganizationId: "",
        EmployeeId: ""
      }));
      setIsLoading(false);
    }
  }, []);

  async function fetchData() {
    setIsLoading(false);

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);
      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);
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
        <Grid item xs={12} md={3}>
          <Autocomplete
            options={companyList}
            value={searchData.BranchId ? companyList.find(item => item.id === searchData.BranchId) ?? null : null}
            isOptionEqualToValue={(option, value) => option.id === value.id
            }
            getOptionLabel={(option) => (option ? option.name : '')}
            renderOption={(propsOption, option) => (
              <li {...propsOption} key={option.id}>
                {option.name}
              </li>
            )}
            onChange={(event, value) => {
              handleChange("BranchId", value == null ? "" : value.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={intl.formatMessage(Payrollmessages.company)}
                required={BranchIdRequired ? BranchIdRequired : false}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Autocomplete
            id="organizationId"
            options={OrganizationList}
            isOptionEqualToValue={(option, value) =>
              value.id === 0 || value.id === "" || option.id === value.id
            }
            value={
              searchData.OrganizationId && OrganizationList.find( (item) => item.id === searchData.OrganizationId )
                ? OrganizationList.find(
                    (item) => item.id === searchData.OrganizationId
                  )
                : null
            }
            getOptionLabel={(option) => (option.name ? option.name : "")}
            onChange={(event, value) => {
              handleChange("organizationId", value == null ? "" : value.id);
            }}
            renderOption={(propsOption, option) => (
              <li {...propsOption} key={option.id}>
                {option.name}
              </li>
            )}
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
        {notShowEmployeeName ? ( 
          "" 
        ) : (
        <Grid item xs={12} md={3}>
          <Autocomplete
            id="employeeId"
            options={EmployeeList}
            isOptionEqualToValue={(option, value) =>
              value.id === 0 || value.id === "" || option.id === value.id
            }
            value={
              searchData.EmployeeId && EmployeeList.find((item) => item.id === searchData.EmployeeId)
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
                required={requireEmployee}
                label={intl.formatMessage(Payrollmessages.employeeName)}
              />
            )}
          />
        </Grid>
        )}

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

        {notShowDate ? (
          ""
        ) : (
          // <Grid item xs={12} md={2}>
          //   <LocalizationProvider dateAdapter={AdapterMoment}>
          //     <DesktopDatePicker
          //       label={intl.formatMessage(Payrollmessages.fromdate)}
          //       value={searchData.FromDate}
          //       onChange={(date) => {
          //         handleChange("fromDate", date);
          //       }}
          //       className={classes.field}
          //       renderInput={(params) => (
          //         <TextField {...params} variant="outlined" />
          //       )}
          //     />
          //   </LocalizationProvider>
          // </Grid>

          <Grid item xs={12} md={2}> 
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                       label={intl.formatMessage(Payrollmessages.fromdate)}
                        value={searchData.FromDate ? dayjs(searchData.FromDate) : searchData.FromDate}
                      className={classes.field}
                        onChange={(date) => {
                          handleChange("fromDate", date);
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`FromDate`]: true
                            }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`FromDate`]: false
                            }))
                        }
                      }}
                      />
                  </LocalizationProvider>
            </Grid>
        )}
        {notShowDate ? (
          ""
        ) : (
          // <Grid item xs={12} md={2}>
          //   <LocalizationProvider dateAdapter={AdapterMoment}>
          //     <DesktopDatePicker
          //       label={intl.formatMessage(Payrollmessages.todate)}
          //       value={searchData.ToDate}
          //       onChange={(date) => {
          //         handleChange("toDate", date);
          //       }}
          //       className={classes.field}
          //       renderInput={(params) => (
          //         <TextField {...params} variant="outlined" />
          //       )}
          //     />
          //   </LocalizationProvider>
          // </Grid>

          <Grid item xs={12} md={2}> 
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                       label={intl.formatMessage(Payrollmessages.todate)}
                        value={searchData.ToDate ? dayjs(searchData.ToDate) : searchData.ToDate}
                      className={classes.field}
                        onChange={(date) => {
                          handleChange("toDate", date);
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`toDate`]: true
                            }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`toDate`]: false
                            }))
                        }
                      }}
                      />
                  </LocalizationProvider>
            </Grid>
        )}
      </Grid>
    </div>
  );
}

const MemoedSearch = memo(Search);

export default injectIntl(MemoedSearch);
