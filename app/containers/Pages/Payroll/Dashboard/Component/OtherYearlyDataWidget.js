import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import GraphicEq from "@mui/icons-material/GraphicEq";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { injectIntl, FormattedMessage } from "react-intl";
import "enl-styles/vendors/rechart/styles.css";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import colorfull from "enl-api/palette/colorfull";
import messages from "./messages";
import useStyles from "./widget-jss";
import { PapperBlock } from "enl-components";
import PayRollLoader from "../../Component/PayRollLoader";
import api from "../api";
import { useSelector } from "react-redux";

const color = {
  main: colorfull[2],
  secondary: colorfull[3],
  third: colorfull[0],
  fourth: colorfull[1],
};

function OtherYearlyDataWidget(props) {
  const [coin, setCoin] = useState("BTC");
  const [checked, setChecked] = useState([
    "OverTime",
    "Vacations",
    "Late",
    "Abscence",
  ]);

  const handleChange = (event) => {
    setCoin(event.target.value);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const [dataCrypto, setDataCrypto] = useState([
    {
      name: "Mohamed wessam",
      vacations: 40,
      late: 124,
      overTime: 17,
      workHours: 200,
      notWorkHours: 24,
      abscence: 9,
    },
    {
      name: "Adballah Ahmed",
      vacations: 45,
      late: 100,
      overTime: 2,
      workHours: 100,
      notWorkHours: 76,
      abscence: 5,
    },
    {
      name: "Nermin Ahmed",
      vacations: 27,
      late: 20,
      overTime: 0,
      workHours: 120,
      notWorkHours: 56,
      abscence: 5,
    },
    {
      name: "shymaa abdelhameed",
      vacations: 50,
      late: 120,
      overTime: 29,
      workHours: 190,
      notWorkHours: 0,
      abscence: 3,
    },
    {
      name: "Noha Abd Elbasset",
      vacations: 32,
      late: 117,
      overTime: 20,
      workHours: 100,
      notWorkHours: 76,
      abscence: 0,
    },
    {
      name: "Beshoy Atef",
      vacations: 50,
      late: 34,
      overTime: 11,
      workHours: 160,
      notWorkHours: 16,
      abscence: 1,
    },
    {
      name: "Moaaz Mohamed",
      vacations: 50,
      late: 120,
      overTime: 29,
      workHours: 150,
      notWorkHours: 16,
      abscence: 3,
    },
  ]);

  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const IsStaticDashboard = localStorage.getItem("IsStaticDashboard");

  const getdata = async () => {
    try {
      if (IsStaticDashboard == "false") {
        setIsLoading(true);
        debugger;
        const data = await api(locale).getOtherYearlyData();

        setDataCrypto(data);
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
      <PapperBlock whiteBg noMargin title={""} desc="">
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Typography className={classes.smallTitle} variant="button">
              <StackedLineChartIcon className={classes.leftIcon} />
              <FormattedMessage {...messages.OtherYearlyDataWidget} />
            </Typography>
            <Divider className={classes.divider} />
            <div className={classes.chartWrap}>
              <div className={classes.chartFluid}>
                <ResponsiveContainer width={780} height="100%">
                  <ComposedChart data={dataCrypto}>
                    <XAxis dataKey="name" tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickSize={3}
                      tickLine={false}
                      tick={{ stroke: "none" }}
                    />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Tooltip />
                    <Bar
                      stackId="2"
                      barSize={10}
                      fillOpacity="0.8"
                      dataKey="workHours"
                      fill={color.secondary}
                    />
                    <Bar
                      stackId="5"
                      barSize={10}
                      fillOpacity="0.8"
                      dataKey="notWorkHours"
                      fill={color.third}
                    />
                    {checked.indexOf("OverTime") > -1 && (
                      <Line
                        type="monotone"
                        stackId="4"
                        dataKey="overTime"
                        strokeWidth={2}
                        stroke={color.main}
                      />
                    )}
                    {checked.indexOf("Vacations") > -1 && (
                      <Line
                        type="monotone"
                        stackId="3"
                        dataKey="vacations"
                        strokeWidth={2}
                        stroke={color.third}
                      />
                    )}
                    {checked.indexOf("Late") > -1 && (
                      <Area
                        type="monotone"
                        stackId="1"
                        dataKey="late"
                        stroke={color.fourth}
                        fill={color.fourth}
                      />
                    )}
                    {checked.indexOf("Abscence") > -1 && (
                      <Area
                        type="monotone"
                        stackId="6"
                        dataKey="abscence"
                        stroke={color.main}
                        fill={color.secondary}
                      />
                    )}
                    <Legend
                      iconType="circle"
                      verticalALign="bottom"
                      iconSize={10}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography className={classes.smallTitle} variant="button">
              <GraphicEq className={classes.leftIcon} />
              <FormattedMessage {...messages.chartIndicator} />
            </Typography>
            <Divider className={classes.divider} />
            <div className={classes.root}>
              <List component="nav">
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle("OverTime")}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={checked.indexOf("OverTime") !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary="OverTime" />
                </ListItem>
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle("Late")}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={checked.indexOf("Late") !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary="Late" />
                </ListItem>

                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle("Vacations")}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={checked.indexOf("Vacations") !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary="Vacations" />
                </ListItem>
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle("Abscence")}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={checked.indexOf("Abscence") !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary="Abscence" />
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
      </PapperBlock>
    </PayRollLoader>
  );
}

OtherYearlyDataWidget.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OtherYearlyDataWidget);
