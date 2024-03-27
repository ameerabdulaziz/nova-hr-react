import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import AddCard from "@mui/icons-material/AddCard";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { injectIntl, FormattedMessage } from "react-intl";
import "enl-styles/vendors/rechart/styles.css";
import Check from "@mui/icons-material/CheckCircle";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import colorfull from "enl-api/palette/colorfull";
import messages from "./messages";
import useStyles from "./widget-jss";
import { PapperBlock } from "enl-components";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import HistoryToggleOffSharpIcon from "@mui/icons-material/HistoryToggleOffSharp";
import HikingSharpIcon from "@mui/icons-material/HikingSharp";
import HotTubSharpIcon from "@mui/icons-material/HotTubSharp";
import PayRollLoader from "../../Component/PayRollLoader";
import api from "../api";

function PerformanceChartWidget(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();
  const [attendance, setaAttendance] = useState([]);
  const [dataPerformance, setDataPerformance] = useState([
    {
      name: "22-Down",
      count: 20,
    },
    {
      name: "23-27",
      count: 100,
    },
    {
      name: "28-32",
      count: 80,
    },
    {
      name: "33-37",
      count: 14,
    },
    {
      name: "38-42",
      count: 86,
    },
    {
      name: "43-47",
      count: 29,
    },
    {
      name: "48-52",
      count: 40,
    },
    {
      name: "53-57",
      count: 30,
    },
    {
      name: "58-above",
      count: 30,
    },
  ]);
  const color = {
    main: colorfull[2],
    secondary: colorfull[6],
    third: colorfull[0],
    fourth: colorfull[1],
  };

  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const IsStaticDashboard = localStorage.getItem("IsStaticDashboard");

  const getAgeDemographics = async () => {
    try {
      debugger;
      if (IsStaticDashboard == "false") {
        setIsLoading(true);
        const data = await api(locale).getAgeDemographics();
        setDataPerformance(data);

        const data2 = await api(locale).getEmpWithBestAtt();
        setaAttendance(data2);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAgeDemographics();
  }, []);
  return (
    <PayRollLoader isLoading={isLoading}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12} style={{ paddingTop: "0px !important" }}>
          <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
            <ul className={classes.bigResume}>
              <li>
                <Avatar className={cx(classes.avatar, classes.orangeAvatar)}>
                  <HomeSharpIcon />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.orangeText}>40</span>
                  <Typography noWrap>
                    <FormattedMessage {...messages.Vacations} />
                  </Typography>
                </Typography>
              </li>
              <li>
                <Avatar className={cx(classes.avatar, classes.indigoAvatar)}>
                  <HotTubSharpIcon />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.indigoText}>125</span>
                  <Typography noWrap>
                    <FormattedMessage {...messages.Overtime} />
                  </Typography>
                </Typography>
              </li>
              <li>
                <Avatar className={cx(classes.avatar, classes.blueAvatar)}>
                  <HikingSharpIcon />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.blueText}>17</span>
                  <Typography noWrap>
                    <FormattedMessage {...messages.Mession} />
                  </Typography>
                </Typography>
              </li>
              <li>
                <Avatar className={cx(classes.avatar, classes.purpleAvatar)}>
                  <HistoryToggleOffSharpIcon />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.purpleText}>18</span>
                  <Typography noWrap>
                    <FormattedMessage {...messages.Permission} />
                  </Typography>
                </Typography>
              </li>
              <li>
                <Avatar className={cx(classes.avatar, classes.tealAvatar)}>
                  <AddCard />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.tealText}>8</span>
                  <Typography noWrap>
                    <FormattedMessage {...messages.rewards} />
                  </Typography>
                </Typography>
              </li>
              <li>
                <Avatar className={cx(classes.avatar, classes.pinkAvatar)}>
                  <CreditCardOffIcon />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.pinkText}>5</span>
                  <Typography noWrap>
                    <FormattedMessage {...messages.penalty} />
                  </Typography>
                </Typography>
              </li>
            </ul>
          </PapperBlock>
        </Grid>

        <Grid item md={12} xs={12} style={{ paddingTop: "0px !important" }}>
          <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
            <Grid container spacing={2}>
              <Grid item md={8} xs={12}>
                <Typography className={classes.smallTitle} variant="button">
                  <StackedLineChartIcon className={classes.leftIcon} />
                  <FormattedMessage {...messages.ageChart} />
                </Typography>
                <Divider className={classes.divider} />

                <div className={classes.chartWrap}>
                  <div className={classes.chartFluid}>
                    <ResponsiveContainer width={780} height="100%">
                      <ComposedChart
                        data={dataPerformance}
                        width={780}
                        height={300}
                      >
                        <XAxis dataKey="name" tickLine={false} />
                        <YAxis
                          axisLine={false}
                          tickSize={3}
                          tickLine={false}
                          tick={{ stroke: "none" }}
                        />
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          stackId="3"
                          dataKey="count"
                          stroke="none"
                          fill={color.main}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Grid>
              <Grid item md={4} xs={12}>
                <Typography className={classes.smallTitle} variant="button">
                  <Check className={classes.leftIcon} />
                  <FormattedMessage {...messages.empwithbestAtt} />
                </Typography>
                <Divider className={classes.divider} />

                <div className={classes.divnotification}>
                  <List>
                    {attendance.map((item, index) => (
                      <Fragment>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar
                              className={cx(
                                classes.avatar,
                                classes.purpleAvatar
                              )}
                            >
                              <Check />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={item.name} />

                          <ListItemText
                            primary={item.percentage}
                            className={
                              locale == "en"
                                ? cx(classes.textRight)
                                : cx(classes.textLeft)
                            }
                          />
                        </ListItem>
                        <li className={cx(classes.paddingProgress)}>
                          <LinearProgress
                            variant="determinate"
                            className={cx(classes.blueProgress)}
                            value={90}
                          />
                        </li>
                      </Fragment>
                    ))}
                  </List>
                </div>
              </Grid>
            </Grid>
          </PapperBlock>
        </Grid>
      </Grid>
    </PayRollLoader>
  );
}

PerformanceChartWidget.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PerformanceChartWidget);
