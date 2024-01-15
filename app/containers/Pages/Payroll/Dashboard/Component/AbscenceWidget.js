import React from "react";
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
import { right } from "@popperjs/core";

const data2 = [
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
];
const color = {
  main: colorfull[2],
  secondary: colorfull[6],
  third: colorfull[0],
  fourth: colorfull[1],
};
// debugger;
function AbscenceWidget(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  return (
    <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
      <div>
        <Typography className={classes.smallTitle} variant="button">
          <StackedLineChartIcon className={classes.leftIcon} />
          <FormattedMessage {...messages.AbscenceWidget} />
        </Typography>
        <Divider className={classes.divider} />

        <div className={classes.chartWrap}>
          <div className={classes.chartFluid}>
            <ResponsiveContainer width={550} height="100%">
              <ComposedChart data={data2} width={550} height={300}>
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
                  dataKey="value"
                  stroke="none"
                  fill={color.main}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PapperBlock>
  );
}

AbscenceWidget.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AbscenceWidget);
