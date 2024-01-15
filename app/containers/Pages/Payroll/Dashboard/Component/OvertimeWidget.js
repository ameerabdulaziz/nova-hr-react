import React, { Fragment, useState } from "react";
import NotificationsActive from "@mui/icons-material/NotificationsActive";

import Typography from "@mui/material/Typography";
import { injectIntl, FormattedMessage } from "react-intl";
import messages from "./messages";
import { PapperBlock } from "enl-components";
import Divider from "@mui/material/Divider";
import FilterCenterFocus from "@mui/icons-material/Eject";
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
import PropTypes from "prop-types";
import {
  purple,
  red,
  pink,
  indigo,
  blue,
  cyan,
  teal,
} from "@mui/material/colors";
import useStyles from "./fluidChart-jss";

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

function OvertimeWidget(props) {
  const { intl } = props;
  const { classes } = useStyles();

  return (
    <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
      <div>
        <Typography className={classes.smallTitle} variant="button">
          <FilterCenterFocus className={classes.leftIcon} />
          <FormattedMessage {...messages.OvertimeWidget} />
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.chartWrap}>
          <div className={classes.chartFluid}>
            <ResponsiveContainer width={550} height="100%">
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
      </div>
    </PapperBlock>
  );
}

export default injectIntl(OvertimeWidget);
