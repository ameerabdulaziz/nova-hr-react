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
import PayRollLoader from "../../Component/PayRollLoader";
import api from "../api";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import { useSelector } from "react-redux";
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

function SalaryYearlyWidget(props) {
  const [coin, setCoin] = useState("BTC");
  const [checked, setChecked] = useState([
    "OverTime",
    "SocialInsurance",
    "MedicalInsurance",
    "Tax",
  ]);
  const [dataCrypto, setDataCrypto] = useState([
    {
      name: "2018",
      tax: 40,
      medicalInsurance: 124,
      overTime: 17,
      socialInsurance: 20,
      gross: 17,
      net: 20,
    },
    {
      name: "2019",
      tax: 45,
      medicalInsurance: 100,
      overTime: 2,
      socialInsurance: 100,
      gross: 2,
      net: 100,
    },
    {
      name: "2020",
      tax: 27,
      medicalInsurance: 20,
      overTime: 0,
      socialInsurance: 80,
      gross: 0,
      net: 80,
    },
    {
      name: "2021",
      tax: 50,
      medicalInsurance: 120,
      overTime: 29,
      socialInsurance: 14,
      gross: 29,
      net: 14,
    },
    {
      name: "2022",
      tax: 32,
      medicalInsurance: 117,
      overTime: 20,
      socialInsurance: 86,
      gross: 20,
      net: 86,
    },
    {
      name: "2023",
      tax: 50,
      medicalInsurance: 34,
      overTime: 11,
      socialInsurance: 29,
      gross: 11,
      net: 29,
    },
    {
      name: "2024",
      tax: 50,
      medicalInsurance: 120,
      overTime: 29,
      socialInsurance: 14,
      gross: 29,
      net: 14,
    },
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
  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const IsStaticDashboard = localStorage.getItem("IsStaticDashboard");

  const getdata = async () => {
    try {
      if (IsStaticDashboard == "false") {
        setIsLoading(true);
        const data = await api(locale).getSalaryYearly();
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
              <FormattedMessage {...messages.yearlySal} />
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
                      dataKey="gross"
                      fill={color.secondary}
                    />
                    <Bar
                      stackId="5"
                      barSize={10}
                      fillOpacity="0.8"
                      dataKey="net"
                      fill={color.third}
                    />
                    {checked.indexOf("Tax") > -1 && (
                      <Line
                        type="monotone"
                        stackId="4"
                        dataKey="tax"
                        strokeWidth={2}
                        stroke={color.main}
                      />
                    )}
                    {checked.indexOf("MedicalInsurance") > -1 && (
                      <Line
                        type="monotone"
                        stackId="3"
                        dataKey="medicalInsurance"
                        strokeWidth={2}
                        stroke={color.third}
                      />
                    )}
                    {checked.indexOf("OverTime") > -1 && (
                      <Area
                        type="monotone"
                        stackId="1"
                        dataKey="overTime"
                        stroke={color.fourth}
                        fill={color.fourth}
                      />
                    )}
                    {checked.indexOf("SocialInsurance") > -1 && (
                      <Area
                        type="monotone"
                        stackId="6"
                        dataKey="socialInsurance"
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
                  onClick={handleToggle("Tax")}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={checked.indexOf("Tax") !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary="Tax" />
                </ListItem>
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle("SocialInsurance")}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={checked.indexOf("SocialInsurance") !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary="Social Insurance" />
                </ListItem>
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle("MedicalInsurance")}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={checked.indexOf("MedicalInsurance") !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary="Medical Insurance" />
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
      </PapperBlock>
    </PayRollLoader>
  );
}

SalaryYearlyWidget.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SalaryYearlyWidget);
