import React from "react";
import brand from "enl-api/dummy/brand";
import { Helmet } from "react-helmet";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import OtherYearlyDataWidget from "./Component/OtherYearlyDataWidget";
import useStyles from "./dashboard-jss";
import StatisticsWidget from "./Component/StatisticsWidget";
import OtherOvertimevsLateWidget from "./Component/OtherOvertimevsLateWidget";
import OrgLevelWidget from "./Component/OrgLevelWidget";
import OtherActualAttWidget from "./Component/OtherActualAttWidget";
import OtherActualHoursBiWidget from "./Component/OtherActualHoursBiWidget";
import OtherWorkHoursWidget from "./Component/OtherWorkHoursWidget";
import OtherVacationsWidget from "./Component/OtherVacationsWidget";
import OtherPermessionWidget from "./Component/OtherPermessionWidget";
import OthermessionWidget from "./Component/OthermessionWidget";

import OtherAttbichartWidget from "./Component/OtherAttbichartWidget";

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

      <OtherOvertimevsLateWidget />
      <Divider className={classes.divider} />
      <OtherYearlyDataWidget />
      <Divider className={classes.divider} />
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={6} xs={12}>
          <OtherWorkHoursWidget />
        </Grid>
        <Grid item md={6} xs={12}>
          <OtherVacationsWidget />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={6} xs={12}>
          <OtherPermessionWidget />
        </Grid>
        <Grid item md={6} xs={12}>
          <OthermessionWidget />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={4} xs={12}>
          <OtherActualAttWidget />
        </Grid>

        <Grid item md={4} xs={12}>
          <OtherAttbichartWidget />
        </Grid>
        <Grid item md={4} xs={12}>
          <OtherActualHoursBiWidget />
        </Grid>
      </Grid>
    </div>
  );
}

export default OtherEmpDashboard;
