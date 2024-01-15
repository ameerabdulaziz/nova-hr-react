import React from "react";
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
import useStyles from "./fluidChart-jss";
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

const color = {
  primary: colorfull[0],
  secondary: colorfull[1],
  third: colorfull[2],
  fourth: colorfull[3],
};

const dataSales = [
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
];
function EmpSalaryChartWidget(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();

  const locale = useSelector((state) => state.language.locale);
  return (
    <PapperBlock whiteBg noMargin title={""}>
      <div>
        <Typography className={classes.smallTitle} variant="button">
          <StackedLineChartIcon className={classes.leftIcon} />
          <FormattedMessage {...messages.grossSal} />
        </Typography>
        <Divider className={classes.divider} />

        <div className={classes.chartWrap}>
          <div className={classes.chartFluid}>
            <ResponsiveContainer width={550} height="100%">
              <BarChart
                data={dataSales}
                width={550}
                height={398}
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
                <CartesianAxis />
                <Tooltip />
                <Bar dataKey="gross" fill={color.primary} />
                <Bar dataKey="net" fill={color.secondary} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PapperBlock>
  );
}

EmpSalaryChartWidget.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmpSalaryChartWidget);
