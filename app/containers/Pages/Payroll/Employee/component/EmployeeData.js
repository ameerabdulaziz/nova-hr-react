import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../api/EmployeeData";
import messages from "../messages";
import hrmessages from "../../HumanResources/messages";
import payrollMessages from "../../messages";
import PayrollTable from "../../Component/PayrollTable";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { Button, Grid, TextField, Card, CardContent } from "@mui/material";
import useStyles from "../../Style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import SaveButton from "../../Component/SaveButton";
import PayRollLoader from "../../Component/PayRollLoader";
import DecryptUrl from "../../Component/DecryptUrl";

function EmployeeData(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { resignReasonId } = location.state ?? 0;
  const { resignReasonName } = location.state ?? 0;  
  const { lworkingDay } = location.state ?? 0;
  const { classes } = useStyles();
  const [data, setdata] = useState({
    id: 0,
    employeeCode: 0,
    name: "",
    organizationName: "",
    jobName: "",
    companyName: null,
    subDate: null,
    subMonthlyFees: 0,
    cmpFees: 0,
    privlMedCareNumber: null,
    loan: 0,
    courses: [],
    vacations: [],
  });
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  async function CreatResign() {
    history.push(`/app/Pages/HR/ResignTrxCreate`,{
      employeeId:data.id,
      resignReasonId:resignReasonId,
      resignReasonName:resignReasonName,
      lworkingDay:lworkingDay
    });
  }
  async function fetchData() {
    try {
      debugger;
      if (id) {
        const dataApi = await ApiData(locale).GetEmpData(id ?? 0);
        setdata(dataApi);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const coursesColumns = [
    {
      name: "courseName",
      label: intl.formatMessage(hrmessages.courseName),
    },
    {
      name: "startDate",
      label: intl.formatMessage(hrmessages.commStartDate),
    },
    {
      name: "finishDate",
      label: intl.formatMessage(hrmessages.commEndDate),
    },

    {
      name: "courseCost",
      label: intl.formatMessage(payrollMessages.price),
    },
    {
      name: "commStartDate",
      label: intl.formatMessage(hrmessages.commStartDate),
    },
    {
      name: "commEndDate",
      label: intl.formatMessage(hrmessages.commEndDate),
    },
    {
      name: "notes",
      label: intl.formatMessage(payrollMessages.notes),
      options: {
        customBodyRender: (value) =>
          value ? (
            <div style={{ maxWidth: "200px", width: "max-content" }}>
              {value}
            </div>
          ) : (
            ""
          ),
      },
    },
  ];
  const vacationsColumns = [
    {
      name: "id",
      label: intl.formatMessage(payrollMessages.code),
    },
    {
      name: "arName",
      label: intl.formatMessage(payrollMessages.arName),
    },
    {
      name: "enName",
      label: intl.formatMessage(payrollMessages.enName),
    },

    {
      name: "vacBalance",
      label: intl.formatMessage(payrollMessages.balance),
    },
  ];

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={intl.formatMessage(messages.EmployeeDataTitle)}
        desc={""}
      >
        <form>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={2}>
              <TextField
                id="employeeCode"
                name="employeeCode"
                value={data.employeeCode}
                label={intl.formatMessage(messages.employeeCode)}
                className={classes.field}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                id="name"
                name="name"
                value={data.name}
                label={intl.formatMessage(messages.employeeName)}
                className={classes.field}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="loan"
                name="loan"
                value={data.loan}
                label={intl.formatMessage(messages.loan)}
                className={classes.field}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="organizationName"
                name="organizationName"
                value={data.organizationName}
                label={intl.formatMessage(payrollMessages.organizationName)}
                className={classes.field}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                id="jobName"
                name="jobName"
                value={data.jobName}
                label={intl.formatMessage(messages.job)}
                className={classes.field}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>
            
            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="companyName"
                        name="companyName"
                        value={data.companyName}
                        label={intl.formatMessage(messages.companyName)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        id="privlMedCareNumber"
                        name="privlMedCareNumber"
                        value={data.privlMedCareNumber}
                        label={intl.formatMessage(messages.privlMedCareNumber)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete="off"
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={2}>
                      <TextField
                        id="subDate"
                        name="subDate"
                        value={data.subDate}
                        label={intl.formatMessage(messages.subDate)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        id="subMonthlyFees"
                        name="subMonthlyFees"
                        value={data.subMonthlyFees}
                        label={intl.formatMessage(messages.subMonthlyFees)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        id="cmpFees"
                        name="cmpFees"
                        value={data.cmpFees}
                        label={intl.formatMessage(messages.cmpFees)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete="off"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <PayrollTable
                isLoading={isLoading}
                showLoader
                title={intl.formatMessage(payrollMessages.course)}
                data={data.courses}
                columns={coursesColumns}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <PayrollTable
                isLoading={isLoading}
                showLoader
                title={intl.formatMessage(messages.vacation)}
                data={data.vacations}
                columns={vacationsColumns}
              />
            </Grid>
            {/* 
            <Grid item xs={12} md={1}>
              <SaveButton Id={id} />
            </Grid> */}
            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={CreatResign}
              >
                <FormattedMessage {...messages.creatResign} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}
EmployeeData.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(EmployeeData);
