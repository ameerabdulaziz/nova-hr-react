import React from "react";
import PropTypes from "prop-types";
import { alpha, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  CartesianAxis,
} from "recharts";
import colorfull from "enl-api/palette/colorfull";
import { injectIntl } from "react-intl";
import useStyles from "./widget-jss";
import MangementCounterWidget from "./MangementCounterWidget";
import CounterTrading from "./CounterTrading";
import messages from "./messages";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import HotTubSharpIcon from "@mui/icons-material/HotTubSharp";
import GridViewIcon from "@mui/icons-material/GridView";
import HikingSharpIcon from "@mui/icons-material/HikingSharp"; 


function StatisticsWidget2(props) {
  const { classes } = useStyles();

  const data1 = [
    {
      name: "Page A",
      salary: 4000,
      tax: 2400,
      sIns: 2400,
    },
    {
      name: "Page B",
      salary: 3000,
      tax: 1398,
      sIns: 2210,
    },
    {
      name: "Page C",
      salary: 2000,
      tax: 9800,
      sIns: 2290,
    },
    {
      name: "Page D",
      salary: 2780,
      tax: 3908,
      sIns: 2000,
    },
    {
      name: "Page E",
      salary: 1890,
      tax: 4800,
      sIns: 2181,
    },
  ];

  return (
    <div className={classes.rootCounter}>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <CounterTrading
            color={colorfull[4]}
            start={0}
            end={217.89}
            duration={3}
            title="Overtime"
            logo={<HotTubSharpIcon />}
            position="up"
            value={10}
            lowest={5000}
            highest={25000}
          >
            <LineChart width={240} height={60} data={data1}>
              <Line
                type="monotone"
                dataKey="salary"
                stroke="#FFFFFF"
                strokeWidth={2}
              />
            </LineChart>
          </CounterTrading>
        </Grid>
        <Grid item md={3} xs={12}>
          <CounterTrading
            color={colorfull[1]}
            start={0}
            end={60000}
            duration={3}
            title="Delays"
            logo={<GridViewIcon />}
            position="down"
            value={15}
            lowest={1000}
            highest={3000}
          >
            <LineChart width={240} height={60} data={data1}>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="tax"
                stroke="#FFFFFF"
                strokeWidth={2}
              />
            </LineChart>
          </CounterTrading>
        </Grid>
        <Grid item md={3} xs={12}>
          <CounterTrading
            color={"#12bbd1"}
            start={0}
            end={50000}
            duration={3}
            title="Vacations"
            logo={<HomeSharpIcon />}
            position="up"
            value={20}
            lowest={200}
            highest={1000}
          >
            <LineChart width={240} height={60} data={data1}>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sIns"
                stroke="#FFFFFF"
                strokeWidth={2}
              />
            </LineChart>
          </CounterTrading>
        </Grid>
        <Grid item md={3} xs={12}>
          <CounterTrading
            color={colorfull[5]}
            start={0}
            end={20000}
            duration={3}
            title="Missions"
            logo={<HikingSharpIcon />}
            position="down"
            value={30}
            lowest={350}
            highest={200}
          >
            <LineChart width={240} height={60} data={data1}>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sIns"
                stroke="#FFFFFF"
                strokeWidth={2}
              />
            </LineChart>
          </CounterTrading>
        </Grid>
      </Grid>
    </div>
  );
}

StatisticsWidget2.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(StatisticsWidget2);
