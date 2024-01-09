import React from "react";
import Typography from "@mui/material/Typography";
import { injectIntl, FormattedMessage } from "react-intl";
import messages from "./messages";
import PapperBlock from "../PapperBlock/PapperBlock";
import Divider from "@mui/material/Divider";
import BarCharticon from "@mui/icons-material/BarChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useStyles from "./fluidChart-jss";
import { createTheme } from '@mui/material/styles';
import ThemePallete from 'enl-api/palette/themePalette';

const theme = createTheme(ThemePallete.magentaTheme);
const color = {
  primary: theme.palette.primary.main,
  primaryDark: theme.palette.primary.dark,
  secondary: theme.palette.secondary.main,
  secondaryDark: theme.palette.secondary.dark,
};
const data1 = [
  {
    name: "Egyptian",
    count: 4000,
  },
  {
    name: "Aphghan",
    count: 3000,
  },
  {
    name: "Albanian",
    count: 2000,
  },
  {
    name: "American",
    count: 2780,
  },
  {
    name: "Hindi",
    count: 4800,
  },  
  {
    name: "French",
    count: 3490,
  },
  {
    name: "others",
    count: 2390,
  },
];
function NationalityWidget(props) {
  const { intl } = props;
  const { classes } = useStyles();

  return (
    <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
      <div>
        <Typography className={classes.smallTitle} variant="button">
          <BarCharticon className={classes.leftIcon} />
          <FormattedMessage {...messages.Nationalitycahrt} />
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.chartFluid}>
          <ResponsiveContainer width={550} height="80%">
            <BarChart
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
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={color.primary}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={color.primaryDark}
                    stopOpacity={1}
                  />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={color.secondary}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={color.secondaryDark}
                    stopOpacity={1}
                  />
                </linearGradient>
              </defs>
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
              <Bar dataKey="count" fillOpacity="1" fill="url(#colorUv)" />              
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PapperBlock>
  );
}

export default injectIntl(NationalityWidget);
