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
import Box from "@mui/material/Box";
import img from "../../../../../../public/images/spinner.gif"
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
import Stack from "@mui/material/Stack";
import NotificationsActive from "@mui/icons-material/NotificationsActive";
import { useHistory } from "react-router-dom";
import style from "../../../../../styles/styles.scss";
import SITEMAP from "../../../../App/routes/sitemap";

function PerformanceChartWidget(props) {
  const { intl } = props;
  const history = useHistory();
  const { classes, cx } = useStyles();
  const [attendance, setaAttendance] = useState([]);
  const [barData, setBarData] = useState({
    vacation: 10,
    overTime: 50,
    permissions: 6,
    missions: 15,
    penalty: 3,
    rewards: 8,
  });
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

  const getdata = async () => {
    try {
      if (IsStaticDashboard == "false") {
        setIsLoading(true);
        const data = await api(locale).getAgeDemographics();
        setDataPerformance(data);

        const data2 = await api(locale).getEmpWithBestAtt();
        setaAttendance(data2);

        const data3 = await api(locale).getBarData();
        if (data3.length > 0) setBarData(data3[0]);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);


  const cardsRedirectFuc = (cardName) => {
    if (cardName === "Leaves") {
      history.push(SITEMAP.vacation.VacationTrxReport.route, { todayDateKey: true });
    }
    else if (cardName === "Mission") {
      history.push(SITEMAP.attendance.MissionTrxReport.route, { StatusId: 2, IsSubmitted: true, IsDeleted: false, todayDateKey: true });
    }
    else if (cardName === "Permission") {
      history.push(SITEMAP.attendance.PermissionTrxReport.route, { StatusId: 2, IsSubmitted: true, IsDeleted: false, todayDateKey: true });
    }
    else if (cardName === "Rewards") {
      history.push(SITEMAP.humanResources.RewardTransReport.route, { StatusId: 2, IsSubmitted: true, IsDeleted: false, todayDateKey: true });
    }
    else if (cardName === "Penalty") {
      history.push(SITEMAP.humanResources.PenaltyTransReport.route, { StatusId: 2, IsSubmitted: true, IsDeleted: false, todayDateKey: true });
    }
  }


  return (
    <PayRollLoader isLoading={isLoading}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12} style={{ paddingTop: "0px !important" }}>

          <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">

            <ul className={classes.bigResume}>
              <Grid container ml={6} >
                <Grid itam xs={6} md={4} lg={3} xl={2}>
                  <li onClick={() => { cardsRedirectFuc("Leaves") }} className={style.dashCardSty}>
                    <Avatar className={cx(classes.avatar, classes.orangeAvatar)}>
                      <HomeSharpIcon />
                    </Avatar>
                    <Typography variant="h6">
                      <span className={classes.orangeText}>{barData.vacation}</span>
                      <Typography noWrap>
                        <FormattedMessage {...messages.Vacations} />
                      </Typography>
                    </Typography>
                  </li>
                </Grid>
                <Grid itam xs={6} md={4} lg={3} xl={2}>
                  <li>
                    <Avatar className={cx(classes.avatar, classes.indigoAvatar)}>
                      <HotTubSharpIcon />
                    </Avatar>
                    <Typography variant="h6">
                      <span className={classes.indigoText}>{barData.overTime}</span>
                      <Typography noWrap>
                        <FormattedMessage {...messages.Overtime} />
                      </Typography>
                    </Typography>
                  </li>
                </Grid>
                <Grid itam xs={6} md={4} lg={3} xl={2}>
                  <li onClick={() => { cardsRedirectFuc("Mission") }} className={style.dashCardSty}>
                    <Avatar className={cx(classes.avatar, classes.blueAvatar)}>
                      <HikingSharpIcon />
                    </Avatar>
                    <Typography variant="h6">
                      <span className={classes.blueText}>{barData.missions}</span>
                      <Typography noWrap>
                        <FormattedMessage {...messages.Mession} />
                      </Typography>
                    </Typography>
                  </li>
                </Grid>
                <Grid itam xs={6} md={4} lg={3} xl={2}>
                  <li onClick={() => { cardsRedirectFuc("Permission") }} className={style.dashCardSty}>
                    <Avatar className={cx(classes.avatar, classes.purpleAvatar)}>
                      <HistoryToggleOffSharpIcon />
                    </Avatar>
                    <Typography variant="h6">
                      <span className={classes.purpleText}>
                        {barData.permissions}
                      </span>
                      <Typography noWrap>
                        <FormattedMessage {...messages.Permission} />
                      </Typography>
                    </Typography>
                  </li>
                </Grid>
                <Grid itam xs={6} md={4} lg={3} xl={2}>
                  <li onClick={() => { cardsRedirectFuc("Rewards") }} className={style.dashCardSty}>
                    <Avatar className={cx(classes.avatar, classes.tealAvatar)}>
                      <AddCard />
                    </Avatar>
                    <Typography variant="h6">
                      <span className={classes.tealText}>{barData.rewards}</span>
                      <Typography noWrap>
                        <FormattedMessage {...messages.rewards} />
                      </Typography>
                    </Typography>
                  </li>
                </Grid>
                <Grid itam xs={6} md={4} lg={3} xl={2}>
                  <li onClick={() => { cardsRedirectFuc("Penalty") }} className={style.dashCardSty}>
                    <Avatar className={cx(classes.avatar, classes.pinkAvatar)}>
                      <CreditCardOffIcon />
                    </Avatar>
                    <Typography variant="h6">
                      <span className={classes.pinkText}>{barData.penalty}</span>
                      <Typography noWrap>
                        <FormattedMessage {...messages.penalty} />
                      </Typography>
                    </Typography>
                  </li>
                </Grid>
              </Grid>
            </ul>

          </PapperBlock>

        </Grid>

        <Grid item md={12} xs={12} style={{ paddingTop: "0px !important" }}>
          <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <Typography className={classes.smallTitle} variant="button">
                  <StackedLineChartIcon className={classes.leftIcon} />
                  <FormattedMessage {...messages.ageChart} />
                </Typography>
                <Divider className={classes.divider} />

                <div className={classes.chartWrap}>
                  <div className={classes.chartFluid}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={dataPerformance}
                        width="100%"
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
              <Grid item lg={6} xs={12}>
                <Typography className={classes.smallTitle} variant="button">
                  <Check className={classes.leftIcon} />
                  <FormattedMessage {...messages.empwithbestAtt} />
                </Typography>
                <Divider className={classes.divider} />

                <div >
                  {attendance === false ? (

                    <Stack
                      direction="row"
                      sx={{ minHeight: "376px" }}
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <Box>
                        <NotificationsActive sx={{ color: "#a7acb2", fontSize: 30 }} />
                        <Typography color="#a7acb2" variant="body1">
                          <FormattedMessage {...messages.noData} />
                        </Typography>
                      </Box>
                    </Stack>
                  ) : attendance === undefined || attendance === null ? (

                    <Stack
                      direction="row"
                      sx={{ minHeight: "376px" }}
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <Box>
                        <img src={img} alt="loading" />
                      </Box>
                    </Stack>
                  ) : attendance.length > 0 ? (

                    <List>
                      {attendance.map((item, index) => (
                        <Fragment key={index}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar className={cx(classes.avatar, classes.purpleAvatar)}>
                                <Check />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name.slice(0, 25)} />
                            <ListItemText
                              primary={`${item.percentage}%`}
                              className={locale === "en" ? cx(classes.textRight) : cx(classes.textLeft)}
                            />
                          </ListItem>
                          <li className={cx(classes.paddingProgress)}>
                            <LinearProgress
                              variant="determinate"
                              className={cx(classes.blueProgress)}
                              value={item.percentage <= 100 ? item.percentage : 100}
                            />
                          </li>
                        </Fragment>
                      ))}
                    </List>
                  ) : (<Stack
                    direction="row"
                    sx={{ minHeight: "376px" }}
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                  >
                    <Box>
                      <img src={img} alt="loading" />
                    </Box>
                  </Stack>)}

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
