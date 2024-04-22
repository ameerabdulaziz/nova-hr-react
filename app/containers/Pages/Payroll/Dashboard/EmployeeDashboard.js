import React, { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import brand from "enl-api/dummy/brand";
import { Helmet } from "react-helmet";
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

function EmployeeDashboard() {
  // const title = brand.name + " - HR Dashboard";
  const description = brand.desc;
  const { classes } = useStyles();
  const history = useHistory();
  const IsHR = localStorage.getItem("IsHR");
  const IsManagement = localStorage.getItem("IsManagement");

  // const [title, setTitle] = useState(localStorage.getItem("MenuName"));

  useEffect(() => {
    localStorage.setItem("MenuName", "Dashboard")
    if (IsHR=="true") history.push("/app");
    else if (IsManagement=="true") history.push("/app/ManagementDashboard");
    else history.push("/app/EmployeeDashboard");
  }, []);

  // useEffect(()=>{
  //   localStorage.setItem(
  //     "MenuName", "HR Dashboard2")
  // },[])

  console.log("tttt");
  return (
    <div>
      {/* <Helmet>
         //<title>{title}</title>
        <title>{brand.name + " - " + title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet> */}
      
      
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
