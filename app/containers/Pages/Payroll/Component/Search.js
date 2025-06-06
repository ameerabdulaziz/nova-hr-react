import React, { memo, useState, useEffect, useCallback } from "react";
import Payrollmessages from "../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import useStyles from "../Style";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import GeneralListApis from "../api/GeneralListApis";
import { useSelector } from "react-redux";
import { Grid, TextField, Autocomplete } from "@mui/material";
import { format } from "date-fns";
import { formateDate, getAutoCompleteValue } from '../helpers';
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
    BranchIdRequired,
    notShowOrganization,
    notShowCompany,
    company,
    minDate,
    minDateData,
    setPrintFilterData,
  } = props;
  const { classes } = useStyles();
  const [EmployeeList, setEmployeeList] = useState([]);
  const [OrganizationList, setOrganizationList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const locale = useSelector((state) => state.language.locale);



  const handleChange = useCallback(async (name, value, valData) => {
    if (name == "fromDate")
    {
 
      setsearchData((prevFilters) => ({
                ...prevFilters,
                FromDate: value ,
              }))

      if(setPrintFilterData)
      {
        setPrintFilterData((prevFilters) => ({
          ...prevFilters,
          FromDate: value ,
        }))
      }
    }

    if (name == "toDate")
    {

      setsearchData((prevFilters) => ({
                ...prevFilters,
                ToDate: value 
              }))

      if(setPrintFilterData)
        {
          setPrintFilterData((prevFilters) => ({
            ...prevFilters,
            ToDate: value ,
          }))
        }
    }

    if (name == "employeeId")
    {
      setsearchData((prevFilters) => ({
        ...prevFilters,
        EmployeeId: value,
      }));

      if(setPrintFilterData)
        {
          setPrintFilterData((prevFilters) => ({
            ...prevFilters,
            Employee: valData ,
          }))
        }
    }

    if (name == "organizationId") {
      setIsLoading(true);
      const employees = await GeneralListApis(locale).GetEmployeeList(null, null, searchData.BranchId, value);

      setEmployeeList(employees);
      setsearchData((prevFilters) => ({
        ...prevFilters,
        OrganizationId: value,
        EmployeeId: "",
      }));

      if(setPrintFilterData)
        {
          setPrintFilterData((prevFilters) => ({
            ...prevFilters,
            Organization: valData,
            Employee: "",
          }))
        }

      setIsLoading(false);
    }

    if (name == "statusId")
    {
      setsearchData((prevFilters) => ({
        ...prevFilters,
        EmpStatusId: value,
      }));

      if(setPrintFilterData)
        {
          setPrintFilterData((prevFilters) => ({
            ...prevFilters,
            EmpStatus: valData,
          }))
        }
    }

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

      if(setPrintFilterData)
        {
          setPrintFilterData((prevFilters) => ({
            ...prevFilters,
            Branch: valData,
            Organization: "",
            Employee: ""
          }))
        }

      setIsLoading(false);
    }
  }, []);

  async function fetchData() {
    setIsLoading(false);

    try {
      if(!notShowEmployeeName)
      {
        const employees = await GeneralListApis(locale).GetEmployeeList();
        setEmployeeList(employees);
      }

      if(!notShowOrganization)
      {
        const organizations = await GeneralListApis(locale).GetDepartmentList(company ? company : null);
        setOrganizationList(organizations);
      }

      if(!notShowStatus)
      {
        const status = await GeneralListApis(locale).GetEmpStatusList();
        setStatusList(status);

         // set EmpStatus defualt value
         if(setPrintFilterData && status && status.length !== 0 && searchData.EmpStatusId)
          {
            setPrintFilterData((prevFilters) => ({
              ...prevFilters,
              EmpStatus: getAutoCompleteValue(status, searchData.EmpStatusId),
            }))
          }
      }

      if(!notShowCompany)
      {
        const company = await GeneralListApis(locale).GetBranchList();
        setCompanyList(company);

         // set company defualt value
         if(setPrintFilterData && company && company.length !== 0 && searchData.BranchId)
          {
            setPrintFilterData((prevFilters) => ({
              ...prevFilters,
              Branch: getAutoCompleteValue(company, searchData.BranchId),
            }))
          }
      }


      


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
      {notShowCompany ? (
        ""
        ) : (
        <Grid item xs={12} md={6}>
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
              handleChange("BranchId", value == null ? "" : value.id, value == null ? "" : value);
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
        )}

      {notShowOrganization ? (
        ""
        ) : (
        <Grid item xs={12} md={6}>
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
              handleChange("organizationId", value == null ? "" : value.id, value == null ? "" : value);
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
        )}

        {notShowEmployeeName ? ( 
          "" 
        ) : (
        <Grid item xs={12} md={6}>
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
              handleChange("employeeId", value == null ? "" : value.id, value == null ? "" : value);
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
          <Grid item xs={12} md={6}>
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
                handleChange("statusId", value == null ? "" : value.id, value == null ? "" : value);
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
          <Grid item xs={6} md={3}> 
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
                      minDate={minDate && minDateData ? dayjs(minDateData.FromDate) : ""}
                      />
                  </LocalizationProvider>
            </Grid>
        )}
        {notShowDate ? (
          ""
        ) : (
          <Grid item xs={6} md={3}> 
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
                      minDate={minDate && minDateData ? dayjs(minDateData.FromDate) : ""}
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
