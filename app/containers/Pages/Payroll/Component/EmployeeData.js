import React, { useState, memo, useEffect } from "react";
import {
  TextField,
  Grid,
  Autocomplete,
  Card,
  CardContent,
} from "@mui/material";
import Payrollmessages from "../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import useStyles from "../Style";
import GeneralListApis from "../api/GeneralListApis";

import { useSelector } from "react-redux";

function EmployeeData(props) {
  const {
    intl,
    handleEmpChange,
    isSuper,
    GetEmployeePenalties,
    GetSalary,
    GetworkingYears,
    id,
    branchId,isdisabled,IsSecuredData,
    required = true,
    empid
  } = props;
  const { classes, cx } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [data, setdata] = useState("");

  async function fetchData() {
    const employees = await GeneralListApis(locale).GetEmployeeList(false,false,branchId,null,IsSecuredData);

    setEmployeeList(employees);
  }

  useEffect(() => {

    fetchData();
    getEmployeeData(id);
  }, [id,branchId]);
  async function getEmployeeData(id, name) {
    if (!id) {
      if (isSuper) {
        handleEmpChange("", "superEmployeeId");
        setdata((prevFilters) => ({
          ...prevFilters,
          superEmployeeId: id,
          superEmployeeName: name,
          superJob: "",
          superOrganization: "",
          superHiringDate: "",
        }));
      } else {
        handleEmpChange("", "employeeId",name);
        setdata((prevFilters) => ({
          ...prevFilters,
          employeeId: id,
          employeeName: name,
          job: "",
          organization: "",
          hiringDate: "",
        }));

        if (GetEmployeePenalties)
          setdata((prevFilters) => ({
            ...prevFilters,
            month: "",
            sixMonth: "",
            year: "",
            hiringDateNo: "",
            lastDate: "",
          }));
        if (GetSalary)
          setdata((prevFilters) => ({
            ...prevFilters,
            jobId: "",
            oldElemVal: "",
          }));
        if (GetworkingYears)
          setdata((prevFilters) => ({
            ...prevFilters,
            workingYears: "",
          }));
      }
      return;
    }
    
    const empdata = await GeneralListApis(locale).GetEmployeeData(
      id,
      GetworkingYears ? true : false
    );
    if (isSuper) {
      setdata((prevFilters) => ({
        ...prevFilters,
        superEmployeeId: id,
        superEmployeeName: empdata.name,
        superJob: empdata.jobName,
        superOrganization: empdata.organizationName,
        superHiringDate: empdata.hiringDate === null ? "" : empdata.hiringDate,
      }));
      handleEmpChange(id, "superEmployeeId");
    } else {
      setdata((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
        employeeName: empdata.name,
        job: empdata.jobName,
        organization: empdata.organizationName,
        hiringDate: empdata.hiringDate === null ? "" : empdata.hiringDate,
        HasAlternativeEmp: empdata.hasAlternativeEmp,
      }));
      handleEmpChange(id, "employeeId",empdata.name, empdata.hiringDate,empdata.workingYears);
      handleEmpChange(empdata.hasAlternativeEmp, "HasAlternativeEmp");
      if (GetEmployeePenalties) {
        const result = await GeneralListApis(locale).GetEmployeePenalties(id);
        setdata((prevFilters) => ({
          ...prevFilters,
          month: result.month,
          sixMonth: result.sixMonth,
          year: result.year,
          hiringDateNo: result.hiringDate,
          lastDate: result.lastDate,
        }));
      }

      if (GetSalary)
        setdata((prevFilters) => ({
          ...prevFilters,
          jobId: empdata.jobId,
          oldElemVal: empdata.salary === null ? "" : empdata.salary,
        }));

      if (GetworkingYears)
        setdata((prevFilters) => ({
          ...prevFilters,
          workingYears:
            empdata.workingYears != null ? empdata.workingYears : "",
        }));
    }
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={4}>
              <Autocomplete
                id={isSuper ? "superEmployeeId" : "employeeId"}
                options={EmployeeList}
                value={data.length !== 0 ?{
                  id: isSuper ? data.superEmployeeId : data.employeeId,
                  name: isSuper ? data.superEmployeeName : data.employeeName,
                }: null}
                getOptionDisabled={(option) => isdisabled??false}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  getEmployeeData(
                    value !== null ? value.id : 0,
                    value !== null ? value.name : ""
                  );
                }}
                disabled={empid ? true : false}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="employeeId"
                    required={required}
                    label={intl.formatMessage(
                      isSuper
                        ? Payrollmessages.superEmployeeName
                        : Payrollmessages.employeeName
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id={isSuper ? "superJob" : "job"}
                name={isSuper ? "superJob" : "job"}
                value={  data.length !== 0 ?  isSuper ? data.superJob : data.job  : ""}
                // value={isSuper ? data.superJob : data.job}
                label={intl.formatMessage(Payrollmessages.job)}
                className={classes.field}
                variant="outlined"
                disabled
                InputLabelProps={{ shrink: data.superJob || data.job  ? true:false}}
                // InputLabelProps={{ shrink: isSuper ? data.superJob : data.job }}
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id={isSuper ? "superOrganization" : "organization"}
                name={isSuper ? "superOrganization" : "organization"}
                value={ data.length !== 0 ? isSuper  ? data.superOrganization : data.organization  : ""}
                // value={isSuper ? data.superOrganization : data.organization}
                label={intl.formatMessage(Payrollmessages.organizationName)}
                className={classes.field}
                variant="outlined"
                disabled
                InputLabelProps={{
                  shrink: data.superOrganization||data.organization ?true:false
                  // shrink: isSuper ? data.superOrganization : data.organization,
                }}
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id={isSuper ? "superHiringDate" : "hiringDate"}
                name={isSuper ? "superHiringDate" : "hiringDate"}
                value={
                  data.length !== 0 ?   
                    isSuper && data.superHiringDate && data.superHiringDate !== null ? data.superHiringDate
                       : data.hiringDate && data.hiringDate !== null ?
                          data.hiringDate : ""
                  : ""
                    
                }
                // value={
                //   isSuper
                //     ? data.superHiringDate === null
                //       ? ""
                //       : data.superHiringDate
                //     : data.hiringDate === null
                //     ? ""
                //     : data.hiringDate
                // }
                label={intl.formatMessage(Payrollmessages.hiringDate)}
                className={classes.field}
                variant="outlined"
                disabled
                InputLabelProps={{
                  shrink: (data.superHiringDate && data.superHiringDate.length !== 0) || (data.hiringDate && data.hiringDate.length !== 0) ? true : false
                }}
                // InputLabelProps={{
                //   shrink: isSuper
                //     ? data.superHiringDate === null
                //       ? ""
                //       : data.superHiringDate
                //     : data.hiringDate === null
                //     ? ""
                //     : data.hiringDate,
                // }}
                autoComplete='off'
              />
            </Grid>
            {GetSalary ? (
              <Grid item xs={12} md={2}>
                <TextField
                  id="oldElemVal"
                  name="oldElemVal"
                  disabled
                  value={data.length !== 0? data.oldElemVal : ""}
                  onChange={(e) =>
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      oldElemVal: e.target.value,
                    }))
                  }
                  label={intl.formatMessage(Payrollmessages.oldElemVal)}
                  className={classes.field}
                  variant="outlined"
                  InputLabelProps={{ shrink: data.length !== 0 && data.oldElemVal ? true : false }}
                  // InputLabelProps={{ shrink: data.oldElemVal }}
                  autoComplete='off'
                />
              </Grid>
            ) : GetworkingYears ? (
              <Grid item xs={12} md={2}>
                <TextField
                  id="workingYears"
                  name="workingYears"
                  value={data.length !== 0 && data.workingYears !== null? data.workingYears : "" }
                  // value={data.workingYears === null ? "" : data.workingYears}
                  label={intl.formatMessage(Payrollmessages.workingYears)}
                  className={classes.field}
                  variant="outlined"
                  disabled
                  InputLabelProps={{
                    shrink: data.length !== 0 && data.workingYears ? true : false,
                    // shrink: data.workingYears === null ? "" : data.workingYears,
                  }}
                  autoComplete='off'
                />
              </Grid>
            ) : (
              null
            )}

            {GetEmployeePenalties ? (
              <Grid item xs={6} md={2}>
                <TextField
                  id="month"
                  name="month"
                  value={data.length !== 0 && data.month ? data.month : ""}
                  label={intl.formatMessage(Payrollmessages.month)}
                  className={classes.field}
                  variant="outlined"
                  disabled
                  InputLabelProps={{ shrink: data.month !== 0 && data.month  ?true:false}}
                  // InputLabelProps={{ shrink: data.month==0||""?true:false}}
                  autoComplete='off'
                />
              </Grid>
            ) : (
              ""
            )}
            {GetEmployeePenalties ? (
              <Grid item xs={6} md={2}>
                <TextField
                  id="sixMonth"
                  name="sixMonth"
                  value={data.length !== 0 && data.sixMonth ? data.sixMonth : ""}
                  label={intl.formatMessage(Payrollmessages.sixMonth)}
                  className={classes.field}
                  variant="outlined"
                  disabled
                  InputLabelProps={{ shrink: data.sixMonth !== 0 && data.sixMonth ?true:false }}
                  // InputLabelProps={{ shrink: data.sixMonth==0||""?true:false }}
                  autoComplete='off'
                />
              </Grid>
            ) : (
              ""
            )}
            {GetEmployeePenalties ? (
              <Grid item xs={6} md={2}>
                <TextField
                  id="year"
                  name="year"
                  value={data.length !== 0 && data.year? data.year : ""}
                  label={intl.formatMessage(Payrollmessages.year)}
                  className={classes.field}
                  variant="outlined"
                  disabled
                  InputLabelProps={{ shrink: data.year !== 0 && data.year ?true:false }}
                  // InputLabelProps={{ shrink: data.year==0||""?true:false }}
                  autoComplete='off'
                />
              </Grid>
            ) : (
              ""
            )}
            {GetEmployeePenalties ? (
              <Grid item xs={6} md={2}>
                <TextField
                  id="hiringDateNo"
                  name="hiringDateNo"
                  value={data.length !== 0 && data.hiringDateNo? data.hiringDateNo : ""}
                  label={intl.formatMessage(Payrollmessages.hiringDateNo)}
                  className={classes.field}
                  variant="outlined"
                  disabled
                  InputLabelProps={{ shrink: data.hiringDateNo !== 0 && data.hiringDateNo  ?true:false }}
                  // InputLabelProps={{ shrink: data.hiringDateNo==0||""?true:false }}
                  autoComplete='off'
                />
              </Grid>
            ) : (
              ""
            )}
            {GetEmployeePenalties ? (
              <Grid item xs={6} md={2}>
                <TextField
                  id="lastDate"
                  name="lastDate"
                  value={data.length !== 0 && data.lastDate? data.lastDate : ""}
                  label={intl.formatMessage(Payrollmessages.lastDate)}
                  className={classes.field}
                  variant="outlined"
                  disabled
                  InputLabelProps={{ shrink: data.lastDate !== 0 && data.lastDate ?true:false }}
                  // InputLabelProps={{ shrink: data.lastDate==0||""?true:false }}
                  autoComplete='off'
                />
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

const MemoedEmployeeData = memo(EmployeeData);

export default injectIntl(MemoedEmployeeData);
