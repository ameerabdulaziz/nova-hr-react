import React, { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import Hidden from "@mui/material/Hidden";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MonthCalendar from "../Component/MonthCalendar";
import PerformanceChartWidget2  from "./Component/PerformanceChartWidget2";
import LatePerMinWidget  from "./Component/LatePerMinWidget";
import NotificationWidget  from "./Component/NotificationWidget";
import EmpSalaryChartWidget  from "./Component/EmpSalaryChartWidget";
import AnnualAppraisalWidget  from "./Component/MonthlyAppraisalWidget";
import EmpOverTimeWidget  from "./Component/EmpOverTimeWidget";
import  AttAbscenceWidget  from "./Component/AttAbscenceWidget";
import  OvertimeLateWidget  from "./Component/OvertimeLateWidget";
import RewardsPenaltyWidget  from "./Component/RewardsPenaltyWidget";
import useStyles from "./dashboard-jss";
import SITEMAP from "../../../App/routes/sitemap";

function EmployeeDashboard() {
  const { classes } = useStyles();
  const history = useHistory();
  const IsHR = localStorage.getItem("IsHR");
  const IsManagement = localStorage.getItem("IsManagement");

  // const [title, setTitle] = useState(localStorage.getItem("MenuName"));

  useEffect(() => {
    localStorage.setItem("MenuName", "Dashboard")
    if (IsHR=="true") history.push(SITEMAP.global.AdminDashboard.route);
    else if (IsManagement=="true") history.push(SITEMAP.global.ManagementDashboard.route);
    else history.push(SITEMAP.global.EmployeeDashboard.route);
  }, []);

  return (
    <div>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <PerformanceChartWidget2 />
        </Grid>
      </Grid>
      {/* 3rd Section */}
       <Grid container spacing={3} className={classes.root}>
        <Grid item md={6} xs={12}>
          <Divider className={classes.divider} />
          <NotificationWidget />
          <Divider className={classes.divider} />
          <EmpOverTimeWidget />
          <Divider className={classes.divider} />
          <EmpSalaryChartWidget />
        </Grid>
        <Grid item md={6} xs={12}>
          <Hidden lgDown>
            <Divider className={classes.divider} />
          </Hidden>
          <MonthCalendar />
          <Divider className={classes.divider} />
          
          <LatePerMinWidget />
          <Divider className={classes.divider} />
          
          <AnnualAppraisalWidget />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={3}>
        <Grid item md={4} sm={12} xs={12}>
        <RewardsPenaltyWidget />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          
          <AttAbscenceWidget />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
        <OvertimeLateWidget></OvertimeLateWidget>
        </Grid>
      </Grid>
    </div>
  );
}

export default EmployeeDashboard;
