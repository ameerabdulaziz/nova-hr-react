import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "enl-styles/vendors/react-weather/GenericWeather.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  purple,
  red,
  pink,
  indigo,
  blue,
  cyan,
  teal,
} from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PapperBlock } from "enl-components";
import useStyles from "./fluidChart-jss";
import FilterCenterFocus from "@mui/icons-material/PieChart";
import Divider from "@mui/material/Divider";
import messages from "./messages";
import { injectIntl, FormattedMessage } from "react-intl";
import ThemePallete from "enl-api/palette/themePalette";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import PayRollLoader from "../../Component/PayRollLoader";
import api from "../api";

function AbscencebichartWidget(props) {
  const { classes, cx } = useStyles();
  const [data6,setData] = useState([
    {
      name: "Nermin Ahmed",
      count: 30.5,
    },
    {
      name: "Noha Abdelbaset",
      count: 40.6,
    },
    {
      name: "Shymaa Abdelhameed",
      count: 30.7,
    },
  ]);
  const colors = [purple[500], indigo[500], blue[500]];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  renderCustomizedLabel.propTypes = {
    cx: PropTypes.number,
    cy: PropTypes.number,
    midAngle: PropTypes.number,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    percent: PropTypes.number,
  };

  renderCustomizedLabel.defaultProps = {
    cx: 0,
    cy: 0,
    midAngle: 0,
    innerRadius: 0,
    outerRadius: 0,
    percent: 0,
  };
  const theme = createTheme(ThemePallete.purpleTheme);
  const color = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
  };

  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const IsStaticDashboard = localStorage.getItem("IsStaticDashboard");
  const getdata = async () => {
    try {
      if (IsStaticDashboard == "false") {
        setIsLoading(true);

        const data = await api(locale).getEmpWithHighestAbscence();
        setData(data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
        <Grid item md={12} xs={12}>
          <Typography className={classes.smallTitle} variant="button">
            <FilterCenterFocus className={classes.leftIcon} />
            <FormattedMessage {...messages.AbscencebichartWidget} />
          </Typography>
          <Divider className={classes.divider} />
          <div className={classes.chartWrap}>
            <div className={classes.bichartFluid}>
              <ResponsiveContainer width={350} height="100%">
                <PieChart
                  width={350}
                  height={350}
                  margin={{
                    top: 5,
                    //right: 20,
                    left: 20,
                    bottom: 2,
                  }}
                >
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="left"
                  />
                  <Pie
                    dataKey="count"
                    data={data6}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    legendType="circle"
                  >
                    {data6.map((entry, index) => (
                      <Cell
                        key={index.toString()}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Grid>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default AbscencebichartWidget;
