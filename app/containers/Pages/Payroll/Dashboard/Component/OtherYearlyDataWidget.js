import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import GraphicEq from "@mui/icons-material/GraphicEq";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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

const color = {
  main: colorfull[2],
  secondary: colorfull[3],
  third: colorfull[0],
  fourth: colorfull[1],
};

export const dataCrypto = [
  {
    name: "Mohamed wessam",
    Vacations: 40,
    Late: 124,
    OverTime: 17,
    WorkHours: 200,
    NotWorkHours: 24,
    Abscence: 9,
  },
  {
    name: "Adballah Ahmed",
    Vacations: 45,
    Late: 100,
    OverTime: 2,
    WorkHours: 100,
    NotWorkHours: 76,
    Abscence: 5,
  },
  {
    name: "Nermin Ahmed",
    Vacations: 27,
    Late: 20,
    OverTime: 0,
    WorkHours: 120,
    NotWorkHours: 56,
    Abscence: 5,
  },
  {
    name: "shymaa abdelhameed",
    Vacations: 50,
    Late: 120,
    OverTime: 29,
    WorkHours: 190,
    NotWorkHours: 0,
    Abscence: 3,
  },
  {
    name: "Noha Abd Elbasset",
    Vacations: 32,
    Late: 117,
    OverTime: 20,
    WorkHours: 100,
    NotWorkHours: 76,
    Abscence: 0,
  },
  {
    name: "Beshoy Atef",
    Vacations: 50,
    Late: 34,
    OverTime: 11,
    WorkHours: 160,
    NotWorkHours: 16,
    Abscence: 1,
  },
  {
    name: "Moaaz Mohamed",
    Vacations: 50,
    Late: 120,
    OverTime: 29,    
    WorkHours: 150,
    NotWorkHours: 16,
    Abscence: 3,
  },
];
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

  const { intl } = props;
  const { classes } = useStyles();

  return (
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
                    dataKey="WorkHours"
                    fill={color.secondary}
                  />
                  <Bar
                    stackId="5"
                    barSize={10}
                    fillOpacity="0.8"
                    dataKey="NotWorkHours"
                    fill={color.third}
                  />
                  {checked.indexOf("OverTime") > -1 && (
                    <Line
                      type="monotone"
                      stackId="4"
                      dataKey="OverTime"
                      strokeWidth={2}
                      stroke={color.main}
                    />
                  )}
                  {checked.indexOf("Vacations") > -1 && (
                    <Line
                      type="monotone"
                      stackId="3"
                      dataKey="Vacations"
                      strokeWidth={2}
                      stroke={color.third}
                    />
                  )}
                  {checked.indexOf("Late") > -1 && (
                    <Area
                      type="monotone"
                      stackId="1"
                      dataKey="Late"
                      stroke={color.fourth}
                      fill={color.fourth}
                    />
                  )}
                  {checked.indexOf("Abscence") > -1 && (
                    <Area
                      type="monotone"
                      stackId="6"
                      dataKey="Abscence"
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
  );
}

OtherYearlyDataWidget.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OtherYearlyDataWidget);
