import React, { Fragment, useState } from "react";
import NotificationsActive from "@mui/icons-material/NotificationsActive";

import Typography from "@mui/material/Typography";
import { injectIntl, FormattedMessage } from "react-intl";
import messages from "./messages";
import Grid from "@mui/material/Grid";
import PapperBlock from "../PapperBlock/PapperBlock";
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

function GenderWidget(props) {
  const { intl } = props;
  const { classes } = useStyles();

  const data1 = [
    {
      name: "2019",
      male: 50,
      female: 100,
      all: 150,
    },
    {
      name: "2020",
      male: 60,
      female: 120,
      all: 180,
    },
    {
      name: "2021",
      male: 40,
      female: 70,
      all: 110,
    },
    {
      name: "2022",
      male: 100,
      female: 70,
      all: 170,
    },
    {
      name: "2023",
      male: 100,
      female: 100,
      all: 200,
    },
  ];

  return (
    <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
      <div>
        <Typography className={classes.smallTitle} variant="button">
          <FilterCenterFocus className={classes.leftIcon} />
          <FormattedMessage {...messages.gendercahrt} />
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.chartWrap}>
          <div className={classes.chartFluid}>
            <ResponsiveContainer width={550} height="80%">
              <LineChart
                width={550}
                height={398}
                data={data1}
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
                  dataKey="male"
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
                  dataKey="all"
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

export default injectIntl(GenderWidget);
