import React from "react";
import Typography from "@mui/material/Typography";
import { injectIntl, FormattedMessage } from "react-intl";
import messages from "./messages";
import { PapperBlock } from "enl-components";
import Divider from "@mui/material/Divider";
import BarCharticon from "@mui/icons-material/BarChart";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useStyles from "./fluidChart-jss";
import { createTheme } from "@mui/material/styles";
import ThemePallete from "enl-api/palette/themePalette";

const theme = createTheme(ThemePallete.magentaTheme);
const color = {
  primary: theme.palette.primary.main,
  primaryDark: theme.palette.primary.dark,
  secondary: theme.palette.secondary.main,
  secondaryDark: theme.palette.secondary.dark,
};
const data1 = [
  {
    name: "Mohamed wessam",
    value: 40,
  },
  {
    name: "Adballah Ahmed",
    value: 45,
  },
  {
    name: "Nermin Ahmed",
    value: 27,
  },
  {
    name: "shymaa abdelhameed",
    value: 50,
  },
  {
    name: "Beshoy Atef",
    value: 32,
  },
  {
    name: "Noha Abd Elbasset",
    value: 50,
  },
  {
    name: "Moaaz Mohamed",
    value: 24,
  },
  {
    name: "Malek Mohamed",
    value: 32,
  },
];

function OthermessionWidget(props) {
  const { intl } = props;
  const { classes } = useStyles();

  return (
    <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
      <div>
        <Typography className={classes.smallTitle} variant="button">
          <BarCharticon className={classes.leftIcon} />
          <FormattedMessage {...messages.OthermessionWidget} />
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.chartWrap}>
          <div className={classes.chartFluid}>
            <ResponsiveContainer width={550} height="100%">
              <ComposedChart
                width={800}
                height={450}
                layout="vertical"
                data={data1}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  tickLine={false}
                  tick={{ stroke: "none" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ stroke: "none" }}
                  dataKey="name"
                  type="category"
                />
                <Tooltip />
                
                <Bar
                  dataKey="value"
                  barSize={20}
                  fillOpacity="0.8"
                  fill={color.primary}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PapperBlock>
  );
}

export default injectIntl(OthermessionWidget);
