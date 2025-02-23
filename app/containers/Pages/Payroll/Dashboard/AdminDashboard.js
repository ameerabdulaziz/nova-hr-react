import React,{useEffect,useState} from "react";
import Hidden from "@mui/material/Hidden";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MonthCalendar from "../Component/MonthCalendar";
import CounterIconsWidget from "./Component/CounterIconsWidget";
import PerformanceChartWidget from "./Component/PerformanceChartWidget";
import GenderWidget from "./Component/GenderWidget";
import NotificationWidget from "./Component/NotificationWidget";
import ServicePeriodWidget from "./Component/ServicePeriodWidget";
import NationalityWidget from "./Component/NationalityWidget";
import MaritalStatusWidget from "./Component/MaritalStatusWidget";
import OrgLevelWidget from "./Component/OrgLevelWidget";
import { useHistory } from "react-router-dom";
import AbscencebichartWidget from "./Component/AbscencebichartWidget";
import useStyles from "./dashboard-jss";
import SITEMAP from "../../../App/routes/sitemap";
import SalaryYearlyWidget from "./Component/SalaryYearlyWidget";

function AdminDashboard() {
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
      {/* 1st Section */}
      <Grid container spacing={0} className={classes.root}>
        <Grid item xs={12}>
          <CounterIconsWidget />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      {/* 2nd Section */}
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <PerformanceChartWidget />
        </Grid>
      </Grid>
      {/* 3rd Section */}
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={6} xs={12}>
          <Divider className={classes.divider} />
          <NotificationWidget />
          <Divider className={classes.divider} />
          <GenderWidget />
          <Divider className={classes.divider} />
          <NationalityWidget />
        </Grid>
        <Grid item md={6} xs={12}>
          <Hidden lgDown>
            <Divider className={classes.divider} />
          </Hidden>
          <MonthCalendar />
          <Divider className={classes.divider} />
        <SalaryYearlyWidget Filter={true} />

          <Divider className={classes.divider} />
          <ServicePeriodWidget />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={3}>
        <Grid item md={4} sm={12} xs={12}>
          <MaritalStatusWidget />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <AbscencebichartWidget />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <OrgLevelWidget></OrgLevelWidget>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminDashboard;
