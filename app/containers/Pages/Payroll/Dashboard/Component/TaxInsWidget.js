import React, { Fragment, useState } from "react";
import NotificationsActive from "@mui/icons-material/NotificationsActive";

import Typography from "@mui/material/Typography";
import { injectIntl, FormattedMessage } from "react-intl";
import messages from "./messages";
import Grid from "@mui/material/Grid";
import { PapperBlock } from "enl-components";
import Divider from "@mui/material/Divider";
import FilterCenterFocus from "@mui/icons-material/LineAxis";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import useStyles from "./fluidChart-jss";

function TaxInsWidget(props) {
  const { intl } = props;
  const { classes } = useStyles();

  
const data = [
  {
    name: 'Jan',
    tax: 40,
    ins: 70,
  },
  {
    name: 'Feb',
    tax: 50,
    ins: 60,
  },
  {
    name: 'Mar',
    tax: 60,
    ins: 70,
  },
  {
    name: 'Apr',
    tax: 90,
    ins: 100,
  },
  {
    name: 'May',
    tax: 80,
    ins: 70,
  },
  {
    name: 'Jun',
    tax: 40,
    ins: 50,
  },
  {
    name: 'Jul',
    tax: 50,
    ins: 70,
  },
  {
    name: 'Aug',
    tax: 60,
    ins: 85,
  },
  {
    name: 'Sept',
    tax: 55,
    ins: 40,
  },
  {
    name: 'Oct',
    tax: 60,
    ins: 70,
  },
  {
    name: 'Nov',
    tax: 80,
    ins: 20,
  },
  {
    name: 'Dec',
    tax: 100,
    ins: 100,
  },
];

  return (
    <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
      <div>
        <Typography className={classes.smallTitle} variant="button">
          <FilterCenterFocus className={classes.leftIcon} />
          <FormattedMessage {...messages.TaxInsWidget} />
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.chartWrap}>
          <div className={classes.chartFluid}>
            <ResponsiveContainer width={550} height="100%">
              <LineChart
                width={550}
                height={300}
                data={data}
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
                <Legend
                  iconType="circle"
                  verticalALign="bottom"
                  iconSize={10}
                />
                <Line
                  type="monotone"
                  dataKey="tax"
                  strokeWidth={5}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="female"
                  strokeWidth={5}
                  stroke="#82ca9d"
                />
                <Line
                  type="monotone"
                  dataKey="ins"
                  strokeWidth={5}
                  stroke="#b3d4fc"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PapperBlock>
  );
}

export default injectIntl(TaxInsWidget);
