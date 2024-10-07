import React, { useState ,useEffect} from "react";
import Typography from "@mui/material/Typography";
import { injectIntl, FormattedMessage } from "react-intl";
import messages from "./messages";
import { PapperBlock } from "enl-components";
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
import { createTheme } from "@mui/material/styles";
import ThemePallete from "enl-api/palette/themePalette";
import PayRollLoader from "../../Component/PayRollLoader";
import api from "../api";
import { useSelector } from "react-redux";

const theme = createTheme(ThemePallete.magentaTheme);
const color = {
  primary: theme.palette.primary.main,
  primaryDark: theme.palette.primary.dark,
  secondary: theme.palette.secondary.main,
  secondaryDark: theme.palette.secondary.dark,
};

function NationalityWidget(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const [data1, setData1] = useState([
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
  ]);
  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const IsStaticDashboard = localStorage.getItem("IsStaticDashboard");

  const getNationalty = async () => {
    try {
      if (IsStaticDashboard == "false") {
        setIsLoading(true);

        const data1 = await api(locale).getNationalty();
        setData1(data1);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNationalty();
  }, []);
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
        <div>
          <Typography className={classes.smallTitle} variant="button">
            <BarCharticon className={classes.leftIcon} />
            <FormattedMessage {...messages.Nationalitycahrt} />
          </Typography>
          <Divider className={classes.divider} />
          <div className={classes.chartWrap}>
            <div className={classes.chartFluid}>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart
                  width="100%"
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
        </div>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(NationalityWidget);
