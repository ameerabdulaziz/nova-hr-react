import React, { Fragment,useState ,useEffect} from "react";
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
import PayRollLoader from "../../Component/PayRollLoader";
import api from "../api";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  Cell,
} from "recharts";
import colorfull from "enl-api/palette/colorfull";
import messages from "./messages";
import useStyles from "./widget-jss";
import { PapperBlock } from "enl-components";
import {
  purple,
  red,
  pink,
  indigo,
  blue,
  cyan,
  teal,
} from "@mui/material/colors";

const colors = [
  red[500],
  pink[500],
  purple[500],
  indigo[500],
  blue[500],
  cyan[500],
  teal[500],
  red[200],
  pink[150],
  purple[900],
  indigo[800],
  blue[700],
];

const getPath = (x, y, width, height) =>
  `M${x},${y + height}
  C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
    x + width / 2
  }, ${y}
  C${x + width / 2},${y + height / 3} ${x + 2 * (width / 3)},${y + height} ${
    x + width
  }, ${y + height}
  Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return (
    <path
      d={getPath(x, y, width, height)}
      stroke="none"
      fillOpacity="0.8"
      fill={fill}
    />
  );
};

TriangleBar.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

TriangleBar.defaultProps = {
  x: 0,
  y: 0,
  fill: "#9f9f9f",
  width: 0,
  height: 0,
};
function PerformanceChartWidget2(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();
  const [vacations, setaVacations] = useState([
    {
      name: "Sick Vacation",
      percentage: "90",
    },
    {
      name: "Normal Vacation",
      percentage: "80",
    },
    {
      name: "3arda vacation",
      percentage: "70",
    },
    {
      name: "Holiday Vacation",
      percentage: "70",
    },
    {
      name: "Vacation Vacation",
      percentage: "60",
    },
  ]);
  const [data2, setData2] = useState([
    {
      name: "Jan",
      value: 40,
    },
    {
      name: "Feb",
      value: 45,
    },
    {
      name: "Mar",
      value: 27,
    },
    {
      name: "Apr",
      value: 50,
    },
    {
      name: "May",
      value: 32,
    },
    {
      name: "Jun",
      value: 50,
    },
    {
      name: "Jul",
      value: 24,
    },
    {
      name: "Aug",
      value: 32,
    },
    {
      name: "Sept",
      value: 40,
    },
    {
      name: "Oct",
      value: 50,
    },
    {
      name: "Nov",
      value: 50,
    },
    {
      name: "Dec",
      value: 79,
    },
  ]);

  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const IsStaticDashboard = localStorage.getItem("IsStaticDashboard");

  const getdata = async () => {
    try {
      if (IsStaticDashboard == "false") {
        setIsLoading(true);
        const data = await api(locale).getVacationsPercentage();
        setaVacations(data);

        const data2 = await api(locale).getMonthlyWorkHours();
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
      <Grid container spacing={2}>
        <Grid item md={12} xs={12} style={{ paddingTop: "0px !important" }}>
          <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
            <Grid container spacing={2}>
              <Grid item md={8} xs={12}>
                <Typography className={classes.smallTitle} variant="button">
                  <StackedLineChartIcon className={classes.leftIcon} />
                  <FormattedMessage {...messages.WorkingHoursWidget} />
                </Typography>
                <Divider className={classes.divider} />
                <div className={classes.chartWrap}>
                  <div className={classes.chartFluid}>
                    <ResponsiveContainer width={700} height="100%">
                      <BarChart
                        width={550}
                        height={300}
                        data={data2}
                        margin={{
                          top: 70,
                          right: 40,
                          left: 0,
                          bottom: 5,
                        }}
                      >
                        <XAxis dataKey="name" tickLine={false} />
                        <YAxis
                          axisLine={false}
                          tickSize={3}
                          tickLine={false}
                          tick={{ stroke: "none" }}
                        />
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <CartesianAxis vertical={false} />
                        <Tooltip />
                        <Bar
                          dataKey="value"
                          fill="#8884d8"
                          shape={TriangleBar}
                          label={{ position: "top" }}
                        >
                          {data2.map((entry, index) => (
                            <Cell
                              key={`cell-${index.toString()}`}
                              fill={colors[index % colors.length]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Grid>
              <Grid item md={4} xs={12}>
                <Typography className={classes.smallTitle} variant="button">
                  <Check className={classes.leftIcon} />
                  <FormattedMessage {...messages.Vacations} />
                </Typography>
                <Divider className={classes.divider} />
                <div className={classes.divnotification}>
                  {vacations.length > 0 ? (
                    <List>
                      {vacations.map((item, index) => (
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
                              primary={`${item.percentage}`}
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
                              value={100}
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
        </Grid>
      </Grid>
    </PayRollLoader>
  );
}

PerformanceChartWidget2.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PerformanceChartWidget2);
