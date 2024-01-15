import React from "react";
import brand from "enl-api/dummy/brand";
import { Helmet } from "react-helmet";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import SalaryYearlyWidget from "./Component/SalaryYearlyWidget";
import useStyles from "./dashboard-jss";
import StatisticsWidget from "./Component/StatisticsWidget";
import SalaryChartWidget from "./Component/SalaryChartWidget";
import OrgLevelWidget from "./Component/OrgLevelWidget";
import GrossBiChartWidget from "./Component/GrossBiChartWidget";
import GenderSalaryBiChartWidget from "./Component/GenderSalaryBiChartWidget";
import OvertimeWidget from "./Component/OvertimeWidget";
import AbscenceWidget from "./Component/AbscenceWidget";
import TaxInsWidget from "./Component/TaxInsWidget";
import MedicalInsWidget from "./Component/MedicalInsWidget";

import AbscencebichartWidget  from "./Component/AbscencebichartWidget";

function OtherEmpDashboard() {
  const title = brand.name + " - Management Dashboard";
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
          <MedicalInsWidget />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={4} xs={12}>
          <AbscencebichartWidget/>
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

export default OtherEmpDashboard;
