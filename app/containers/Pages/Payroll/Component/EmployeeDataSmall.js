import React, { useState, memo, useEffect } from "react";
import {
    TextField,
    Grid,
    Autocomplete,
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import Payrollmessages from "../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import useStyles from "../Style";
import GeneralListApis from "../api/GeneralListApis";
import { useSelector } from "react-redux";

function EmployeeDataSmall(props) {
    const {
        intl,
        handleEmpChange,
        isSuper,
        GetEmployeePenalties,
        GetSalary,
        GetworkingYears,
        id,
        branchId, isdisabled, IsSecuredData,
        required = true,
        empid,
        LastAttLog
    } = props;
    const { classes, cx } = useStyles();
    const locale = useSelector((state) => state.language.locale);
    const [EmployeeList, setEmployeeList] = useState([]);
    const [data, setdata] = useState("");

    async function fetchData() {
        const employees = await GeneralListApis(locale).GetEmployeeList(false, false, branchId, null, IsSecuredData);
        setEmployeeList(employees);
    }

    useEffect(() => {
        fetchData();
        getEmployeeData(id);
    }, [id, branchId]);

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
                handleEmpChange("", "employeeId", name);
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
            GetworkingYears ? true : false,
            LastAttLog ? true : false,
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
            handleEmpChange(id, "employeeId", empdata.name, empdata.hiringDate, empdata.workingYears, empdata.lastAttLog);
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

                        <Grid item xs={12} md={4.5} >
                            <Autocomplete
                                id={isSuper ? "superEmployeeId" : "employeeId"}
                                options={EmployeeList}
                                value={data.length !== 0 ? {
                                    id: isSuper ? data.superEmployeeId : data.employeeId,
                                    name: isSuper ? data.superEmployeeName : data.employeeName,
                                } : null}
                                getOptionDisabled={(option) => isdisabled ?? false}
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

                        <Grid item xs={6}  md={2.5}>
                            <Typography variant="body1" gutterBottom>

                            <div style={{textAlign: "center"}}>
                                <div style={{fontSize :"10px" }}> {intl.formatMessage(Payrollmessages.job)} </div>
                                {data.job  ? 
                                <div style={{fontSize :"15px" }}>{data.job }</div>
                                : ""}
                            </div>  
                            </Typography>
                            
                        </Grid>
                        <Grid item xs={6}  md={2.5}>
                        <Typography variant="body1" gutterBottom>
                           
                           <div style={{textAlign: "center"}}>
                                <div style={{fontSize :"10px" }}> {intl.formatMessage(Payrollmessages.organizationName)} </div>
                                {data.organization  ?  
                                <div style={{fontSize :"15px" }}>{data.organization }</div>
                                : ""}
                            </div>  
                          
                            </Typography>
                        </Grid>
                        <Grid item xs={6}  md={2.5}>
                        <Typography variant="body1" gutterBottom>
                           
                            <div style={{textAlign: "center"}}>
                                <div style={{fontSize :"10px" }}> {intl.formatMessage(Payrollmessages.hiringDate)} </div>
                               {data.hiringDate ?  
                                <div style={{fontSize :"15px" }}>{data.hiringDate }</div>
                                : ""}
                            </div>  
                          
                            </Typography>
                        </Grid>
                        {/* <Grid item xs={3}>
                        <Typography variant="body1" gutterBottom>
                            {intl.formatMessage(Payrollmessages.hiringDate)}: 
                            {data.hiringDate}
                            </Typography>
                         
                        </Grid> */}

                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}

const MemoedEmployeeData = memo(EmployeeDataSmall);

export default injectIntl(MemoedEmployeeData);
