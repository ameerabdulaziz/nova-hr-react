import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import SalaryYearlyWidget from "./Component/SalaryYearlyWidget";
import useStyles from "./dashboard-jss";
import StatisticsWidget from "./Component/StatisticsWidget";
import SalaryChartWidget from "./Component/SalaryChartWidget";
import GrossBiChartWidget from "./Component/GrossBiChartWidget";
import GenderSalaryBiChartWidget from "./Component/GenderSalaryBiChartWidget";
import OvertimeWidget from "./Component/OvertimeWidget";
import AbscenceWidget from "./Component/AbscenceWidget";
import TaxInsWidget from "./Component/TaxInsWidget";
import VacWidget from "./Component/VacWidget";

import AbscencebichartWidget from "./Component/AbscencebichartWidget";

function ManagementDashboard() {
  const { classes } = useStyles();
  const history = useHistory();
  const IsHR = localStorage.getItem("IsHR");
  const IsManagement = localStorage.getItem("IsManagement");

  useEffect(() => {
    localStorage.setItem("MenuName", "Dashboard")
    if (IsHR=="true") history.push("/app");
    else if (IsManagement=="true") history.push("/app/ManagementDashboard");
    else history.push("/app/EmployeeDashboard");
  }, []);
  return (
    <div>
      <StatisticsWidget />
      <Divider className={classes.divider} />
      <SalaryChartWidget />
      <Divider className={classes.divider} />
      <SalaryYearlyWidget />
      <Divider className={classes.divider} />
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={6} xs={12}>
          <OvertimeWidget />
        </Grid>
        <Grid item md={6} xs={12}>
          <AbscenceWidget />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={6} xs={12}>
          <TaxInsWidget />
        </Grid>
        <Grid item md={6} xs={12}>
          <VacWidget />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={4} xs={12}>
          <AbscencebichartWidget />
        </Grid>

        <Grid item md={4} xs={12}>
          <GrossBiChartWidget></GrossBiChartWidget>
        </Grid>
        <Grid item md={4} xs={12}>
          <GenderSalaryBiChartWidget></GenderSalaryBiChartWidget>
        </Grid>
      </Grid>
    </div>
  );
}

export default ManagementDashboard;
