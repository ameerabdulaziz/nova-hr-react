import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import AddCard from '@mui/icons-material/AddCard';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { injectIntl, FormattedMessage } from "react-intl";
import "enl-styles/vendors/rechart/styles.css";
import Check from '@mui/icons-material/CheckCircle';
import WorkingHoursWidget from './WorkingHoursWidget';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
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



const data2 = [
  {
    name: 'Jan',
    value: 40,
  },
  {
    name: 'Feb',
    value: 45,
  },
  {
    name: 'Mar',
    value: 27,
  },
  {
    name: 'Apr',
    value: 50,
  },
  {
    name: 'May',
    value: 32,
  },
  {
    name: 'Jun',
    value: 50,
  },
  {
    name: 'Jul',
    value: 24,
  },
  {
    name: 'Aug',
    value: 32,
  },
  {
    name: 'Sept',
    value: 40,
  },
  {
    name: 'Oct',
    value: 50,
  },
  {
    name: 'Nov',
    value: 50,
  },
  {
    name: 'Dec',
    value: 79,
  },
];

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
  const locale = useSelector((state) => state.language.locale);
  return (
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
                  shape={<TriangleBar />}
                  label={{ position: "top" }}
                >
                  {data2.map((entry, index) => (
                    <Cell
                      key={`cell-${index.toString()}`}
                      fill={colors[index % 20]}
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
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        className={cx(classes.avatar, classes.purpleAvatar)}
                      >
                        <Check />
                      </Avatar>
                      
                    </ListItemAvatar>
                    <ListItemText primary="Sick Vacation" />
                                        
                    <ListItemText primary="90%" className={(locale=="en"?cx(classes.textRight):cx(classes.textLeft))}/>
                    
                  </ListItem>
                  <li  className={cx(classes.paddingProgress)}>
                  <LinearProgress variant="determinate" className={cx(classes.blueProgress)} value={90} />
                  </li>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        className={cx(classes.avatar, classes.purpleAvatar)}
                      >
                        <Check /> 
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Normal Vacations" />
                    
                    <ListItemText primary="80%" className={(locale=="en"?cx(classes.textRight):cx(classes.textLeft))}/>
                    
                  </ListItem>
                  <li  className={cx(classes.paddingProgress)}>
                  <LinearProgress variant="determinate" className={cx(classes.blueProgress)} value={80} />
                  </li>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        className={cx(classes.avatar, classes.purpleAvatar)}
                      >
                        <Check />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="3arda Vacation" />
                                        
                    <ListItemText primary="70%" className={(locale=="en"?cx(classes.textRight):cx(classes.textLeft))}/>
                    
                  </ListItem>
                  <li  className={cx(classes.paddingProgress)}>
                  <LinearProgress variant="determinate" className={cx(classes.blueProgress)} value={70} />
                  </li>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        className={cx(classes.avatar, classes.purpleAvatar)}
                      >
                        <Check />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Holiday Vacation" />
                                        
                    <ListItemText primary="70%" className={(locale=="en"?cx(classes.textRight):cx(classes.textLeft))}/>
                    
                  </ListItem>
                  <li  className={cx(classes.paddingProgress)}>
                  <LinearProgress variant="determinate" className={cx(classes.blueProgress)} value={70} />
                  </li>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        className={cx(classes.avatar, classes.purpleAvatar)}
                      >
                        <Check />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation Vacation" />
                                        
                    <ListItemText primary="70%" className={(locale=="en"?cx(classes.textRight):cx(classes.textLeft))}/>
                    
                  </ListItem>
                  <li  className={cx(classes.paddingProgress)}>
                  <LinearProgress variant="determinate" className={cx(classes.blueProgress)} value={70} />
                  </li>
                </List>
              </div>
            </Grid> 
          </Grid>
        </PapperBlock>
      </Grid>
    </Grid>
  );
}

PerformanceChartWidget2.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PerformanceChartWidget2);
