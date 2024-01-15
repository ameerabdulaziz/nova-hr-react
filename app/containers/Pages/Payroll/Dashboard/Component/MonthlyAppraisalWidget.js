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

function MonthlyAppraisalWidget(props) {
  const { intl } = props;
  const { classes } = useStyles();

  
const data = [
  {
    name: 'Jan',
    Appraisal: 40,
  },
  {
    name: 'Feb',
    Appraisal: 50,
  },
  {
    name: 'Mar',
    Appraisal: 60,
  },
  {
    name: 'Apr',
    Appraisal: 90,
  },
  {
    name: 'May',
    Appraisal: 80,
  },
  {
    name: 'Jun',
    Appraisal: 40,
  },
  {
    name: 'Jul',
    Appraisal: 50,
  },
  {
    name: 'Aug',
    Appraisal: 60,
  },
  {
    name: 'Sept',
    Appraisal: 55,
  },
  {
    name: 'Oct',
    Appraisal: 60,
  },
  {
    name: 'Nov',
    Appraisal: 80,
  },
  {
    name: 'Dec',
    Appraisal: 100,
  },
];

  return (
    <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
      <div>
        <Typography className={classes.smallTitle} variant="button">
          <FilterCenterFocus className={classes.leftIcon} />
          <FormattedMessage {...messages.MonthlyAppraisalWidget} />
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
                  dataKey="Appraisal"
                  strokeWidth={5}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
               
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PapperBlock>
  );
}

export default injectIntl(MonthlyAppraisalWidget);
