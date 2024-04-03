import React, { Fragment,useState ,useEffect} from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import CardGiftcard from "@mui/icons-material/CardGiftcard";
import LocalLibrary from "@mui/icons-material/LocalLibrary";
import Computer from "@mui/icons-material/Computer";
import Toys from "@mui/icons-material/Toys";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Style from "@mui/icons-material/Style";
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
import { useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import HotTubSharpIcon from "@mui/icons-material/HotTubSharp";
import AddCard from "@mui/icons-material/AddCard";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
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
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import NotificationsActive from '@mui/icons-material/NotificationsActive';

const color = {
  primary: colorfull[0],
  secondary: colorfull[1],
  third: colorfull[2],
  fourth: colorfull[3],
};


function SalaryChartWidget(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();

  const [attendance, setaAttendance] = useState([
    {
      name: "Nermen Ahmed" ,
      percentage: "90",
    },
    {
      name: "Ahmed Awad" ,
      percentage: "80",
    },
    {
      name: "Wessam Mohamed" ,
      percentage: "70",
    },
    {
      name: "Noha Abdelbaset" ,
      percentage: "70",
    },
    {
      name: "Shymaa Abdelhameed" ,
      percentage: "60",
    },
  ]);
  const [barData, setBarData] = useState({
    vacation: 0,
    overTime: 0,
    permissions: 0,
    missions: 0,
    penalty: 0,
    rewards: 0,
  });
  const [dataSales, setDataSales] = useState([
    {
      name: "Jan",
      gross: 40,
      net: 124,
    },
    {
      name: "Feb",
      gross: 45,
      net: 100,
    },
    {
      name: "Mar",
      gross: 27,
      net: 20,
    },
    {
      name: "Apr",
      gross: 50,
      net: 120,
    },
    {
      name: "May",
      gross: 32,
      net: 117,
    },
    {
      name: "Jun",
      gross: 50,
      net: 34,
    },
    {
      name: "Jul",
      gross: 24,
      net: 40,
    },
    {
      name: "Aug",
      gross: 32,
      net: 117,
    },
    {
      name: "Sept",
      gross: 40,
      net: 20,
    },
    {
      name: "Oct",
      gross: 27,
      net: 20,
    },
    {
      name: "Nov",
      gross: 50,
      net: 113,
    },
    {
      name: "Dec",
      gross: 79,
      net: 101,
    },
  ]);
  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const IsStaticDashboard = localStorage.getItem("IsStaticDashboard");

  const getdata = async () => {
    try {
      if (IsStaticDashboard == "false") {
        setIsLoading(true);
        const data = await api(locale).getMonthlySalary();
        setDataSales(data);

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

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg noMargin title={""}>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Typography className={classes.smallTitle} variant="button">
              <StackedLineChartIcon className={classes.leftIcon} />
              <FormattedMessage {...messages.grossSal} />
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
                    <Bar dataKey="gross" fill={color.primary} />
                    <Bar dataKey="net" fill={color.secondary} />
                  </BarChart>
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
              {attendance.length > 0 ? (
                <List>
                  {attendance.map((item, index) => (
                    <Fragment>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            className={cx(classes.avatar, classes.purpleAvatar)}
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
                          className={cx(classes.blueProgress)}
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

SalaryChartWidget.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SalaryChartWidget);
