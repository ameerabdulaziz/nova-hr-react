import React from "react";
import brand from "enl-api/dummy/brand";
import { Helmet } from "react-helmet";
import Hidden from "@mui/material/Hidden";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MonthCalendar from "../Component/MonthCalendar";
import CounterIconsWidget  from "./Component/CounterIconsWidget";
import PerformanceChartWidget  from "./Component/PerformanceChartWidget";
import GenderWidget  from "./Component/GenderWidget";
import NotificationWidget  from "./Component/NotificationWidget";
import ServicePeriodWidget  from "./Component/ServicePeriodWidget";
import NationalityWidget  from "./Component/NationalityWidget";
import  MaritalStatusWidget  from "./Component/MaritalStatusWidget";
import OrganizationWidget  from "./Component/OrganizationWidget";
import useStyles from "./dashboard-jss";

function AdminDashboard() {
  const title = brand.name + " - Personal Dashboard";
  const description = brand.desc;
  const { classes } = useStyles();
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
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
          <ServicePeriodWidget />

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
          <OrganizationWidget />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
         <MaritalStatusWidget />
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminDashboard;
