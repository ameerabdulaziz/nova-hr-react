import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Legend,
} from "recharts";
import colorfull from "enl-api/palette/colorfull";
import { injectIntl } from "react-intl";
import useStyles from "./widget-jss";
import CounterTrading from "./CounterTrading";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import HotTubSharpIcon from "@mui/icons-material/HotTubSharp";
import GridViewIcon from "@mui/icons-material/GridView";
import HikingSharpIcon from "@mui/icons-material/HikingSharp";
import PayRollLoader from "../../Component/PayRollLoader";
import api from "../api";
import { useSelector } from "react-redux";

function StatisticsWidget2(props) {
  const { classes } = useStyles();

  const [data1, setData1] = useState([
    {
      name: "jan",
      overtime: 3000,
      delay: 4000,
      vacations: 2400,
      missions: 2400,
    },
    {
      name: "jan",
      overtime: 2000,
      delay: 3000,
      vacations: 1398,
      missions: 2210,
    },
    {
      name: "jan",
      overtime: 2500,
      delay: 2000,
      vacations: 9800,
      missions: 2290,
    },
    {
      name: "jan",
      overtime: 2000,
      delay: 2780,
      vacations: 3908,
      missions: 2000,
    },
    {
      name: "jan",
      overtime: 3000,
      delay: 1890,
      vacations: 4800,
      missions: 2181,
    },
  ]);

  const [data2, setData2] = useState([
    {
      title: "Overtime",
      value: 100000,
      lowest: 5000,
      highest: 25000,
      percentage: 10,
      position: "up",
    },
    {
      title: "Delay",
      value: 15000,
      lowest: 1000,
      highest: 3000,
      percentage: 15,
      position: "down",
    },
    {
      title: "Vacations",
      value: 20000,
      lowest: 200,
      highest: 1000,
      percentage: 20,
      position: "up",
    },
    {
      title: "Missions",
      value: 30000,
      lowest: 350,
      highest: 500,
      percentage: 30,
      position: "down",
    },
  ]);

  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const IsStaticDashboard = localStorage.getItem("IsStaticDashboard");

  const getdata = async () => {
    try {
      debugger;
      if (IsStaticDashboard == "false") {
        setIsLoading(true);
         const data = await api(locale).getMonthlyAttData();
        setData1(data);

        const data2 = await api(locale).getAttData();
        setData2(data2);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <PayRollLoader isLoading={isLoading}>
      <div className={classes.rootCounter}>
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <CounterTrading
              color={colorfull[4]}
              start={0}
              end={data2[0].value}
              duration={3}
              title={data2[0].title}
              logo={<HotTubSharpIcon />}
              position={data2[0].position}
              value={data2[0].percentage}
              lowest={data2[0].lowest}
              highest={data2[0].highest}
            >
              <LineChart width={240} height={60} data={data1}>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="overtime"
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
              end={data2[1].value}
              duration={3}
              title={data2[1].title}
              logo={<GridViewIcon />}
              position={data2[1].position}
              value={data2[1].percentage}
              lowest={data2[1].lowest}
              highest={data2[1].highest}
            >
              <LineChart width={240} height={60} data={data1}>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="delay"
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
              end={data2[2].value}
              duration={3}
              title={data2[2].title}
              logo={<HomeSharpIcon />}
              position={data2[2].position}
              value={data2[2].percentage}
              lowest={data2[2].lowest}
              highest={data2[2].highest}
            >
              <LineChart width={240} height={60} data={data1}>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="vacations"
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
              end={data2[3].value}
              duration={3}
              title={data2[3].title}
              logo={<HikingSharpIcon />}
              position={data2[3].position}
              value={data2[3].percentage}
              lowest={data2[3].lowest}
              highest={data2[3].highest}
            >
              <LineChart width={240} height={60} data={data1}>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="missions"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
              </LineChart>
            </CounterTrading>
          </Grid>
        </Grid>
      </div>
    </PayRollLoader>
  );
}

StatisticsWidget2.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(StatisticsWidget2);
