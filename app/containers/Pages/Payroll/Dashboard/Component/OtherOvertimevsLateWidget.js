import React, { Fragment,useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import colorfull from "enl-api/palette/colorfull";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { injectIntl, FormattedMessage } from "react-intl";
import messages from "./messages";
import useStyles from "./widget-jss";
import { PapperBlock } from "enl-components";
import Check from "@mui/icons-material/CheckCircle";
import LinearProgress from "@mui/material/LinearProgress";
import HotTubSharpIcon from "@mui/icons-material/HotTubSharp";
import AddCard from "@mui/icons-material/AddCard";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import NotificationsActive from "@mui/icons-material/NotificationsActive";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PayRollLoader from "../../Component/PayRollLoader";
import api from "../api";
import { useSelector } from "react-redux";

const color = {
  primary: colorfull[0],
  secondary: colorfull[1],
  third: colorfull[2],
  fourth: colorfull[3],
};


function OtherOvertimevsLateWidget(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();

  const [dataSales,setData] = useState([
    {
      name: 'Mohamed wessam',
      overtime: 40,
      late: 124,
    },
    {
      name: 'Adballah Ahmed',
      overtime: 45,
      late: 100,
    },
    {
      name: 'Nermin Ahmed',
      overtime: 27,
      late: 20,
    },
    {
      name: 'shymaa abdelhameed',
      overtime: 50,
      late: 120,
    },
    {
      name: 'Beshoy Atef',
      overtime: 32,
      late: 117,
    },
    {
      name: 'Noha Abd Elbasset',
      overtime: 50,
      late: 34,
    },
    {
      name: 'Moaaz Mohamed',
      overtime: 24,
      late: 40,
    },
    {
      name: 'Malek Mohamed',
      overtime: 32,
      late: 117,
    },
    {
      name: 'Mrwan Mohamed',
      overtime: 40,
      late: 20,
    },
    {
      name: 'Ahmed Hanfy',
      overtime: 27,
      late: 20,
    },
    {
      name: 'Ahmed Eltokhey',
      overtime: 50,
      late: 113,
    },
    {
      name: 'Ahmed awad',
      overtime: 79,
      late: 101,
    },
  ]);

  const [barData, setBarData] = useState({
    vacation: 0,
    overTime: 0,
    penalty: 0,
    rewards: 0,
  });
  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const IsStaticDashboard = localStorage.getItem("IsStaticDashboard");
  const [attendance, setaAttendance] = useState([
    {
      name: "Nermen Ahmed",
      percentage: "50",
    },
    {
      name: "Ahmed Awad",
      percentage: "60",
    },
    {
      name: "Wessam Mohamed",
      percentage: "70",
    },
    {
      name: "Noha Abdelbaset",
      percentage: "80",
    },
    {
      name: "Shymaa Abdelhameed",
      percentage: "90",
    },
  ]);

  const getdata = async () => {
    try {
      if (IsStaticDashboard == "false") {
        setIsLoading(true);
        
        const data2 = await api(locale).getMonthlyOvertimeAndLate();
        setData(data2);

        const data = await api(locale).getEmpWithBestAtt();
        setaAttendance(data);

        const data3 = await api(locale).getBarData(true);
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

  return (
    <PayRollLoader isLoading={isLoading}>
    <PapperBlock whiteBg noMargin title={""}>
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <Typography className={classes.smallTitle} variant="button">
            <StackedLineChartIcon className={classes.leftIcon} />
            <FormattedMessage {...messages.OtherOvertimevsLateWidget} />
          </Typography>
          <Divider className={classes.divider} />

          <ul className={classes.bigResume}>
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
            <li>
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
            <li>
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
            <li>
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
          </ul>

          <div className={classes.chartWrap}>
            <div className={classes.chartFluid}>
              <ResponsiveContainer width={780} height="100%">
                <BarChart data={dataSales} width={780} height={300}>
                  <XAxis dataKey="name" tickLine={false} />
                  <YAxis
                    axisLine={false}
                    tickSize={3}
                    tickLine={false}
                    tick={{ stroke: "none" }}
                  />
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <CartesianAxis />
                  <Tooltip />
                  <Bar dataKey="overtime" fill={color.primary} />
                  <Bar dataKey="late" fill={color.secondary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography className={classes.smallTitle} variant="button">
            <Check className={classes.leftIcon} />
            <FormattedMessage {...messages.empwithWorstAtt} />
          </Typography>
          <Divider className={classes.divider} />

          <div className={classes.divnotification}>
                  {attendance.length > 0 ? (
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
                              primary={`${item.percentage}%`}
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
                              className={cx(classes.redProgress)}
                              value={item.percentage}
                            />
                          </li>
                        </Fragment>
                      ))}
                    </List>
                  ) : (
                    <Stack
                      direction="row"
                      sx={{ minHeight: "376px" }}
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <Box>
                        <NotificationsActive
                          sx={{ color: "#a7acb2", fontSize: 30 }}
                        />
                        <Typography color="#a7acb2" variant="body1">
                          <FormattedMessage {...messages.noData} />
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </div>
        </Grid>
      </Grid>
    </PapperBlock>
    </PayRollLoader>
  );
}

OtherOvertimevsLateWidget.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OtherOvertimevsLateWidget);
