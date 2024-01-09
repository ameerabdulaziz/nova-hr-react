import React from "react";
import PropTypes from "prop-types";
import "enl-styles/vendors/react-weather/GenericWeather.css";
import { PieChart, Pie, Cell,Tooltip,Legend
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
import PapperBlock from "../PapperBlock/PapperBlock";
import useStyles from "./widget-jss";
import FilterCenterFocus from "@mui/icons-material/PieChartOutlineRounded";
import Divider from "@mui/material/Divider";
import messages from "./messages";
import { injectIntl, FormattedMessage } from "react-intl";
import ThemePallete from 'enl-api/palette/themePalette';
import { createTheme } from '@mui/material/styles';

function MaritalStatusWidget(props) {
  
  const { classes, cx } = useStyles();
  const data6 = [
    {
      name: "Single",
      value: 50,
    },
    {
      name: "Married",
      value: 40,
    },
    {
      name: "Divorced",
      value: 60,
    },
    {
      name: "Widowed",
      value: 10,
    },
  ];
  const colors = [
   
    red[500], pink[500], purple[500], indigo[500], blue[500], cyan[500], teal[500]
  ];

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
  const color = ({
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
  });

  return (
    <PapperBlock whiteBg noMargin title={""} icon="timeline" desc=""> 
    <Grid item md={12} xs={12}>
          <Typography className={classes.smallTitle} variant="button">
            <FilterCenterFocus className={classes.leftIcon} />
            <FormattedMessage {...messages.marital} />
          </Typography>
          <Divider className={classes.divider} />
     
        <PieChart
          width={350}
          height={400}
          margin={{
            left: 20,
            bottom: 5,
          }}
        >
          <Legend layout="horizontal" verticalAlign="top" align="left" />
          <Pie data={data6}   dataKey="value"   innerRadius={80} outerRadius={160} >
          {data6.map((entry, index) => (
              <Cell
                key={index.toString()}
                fill={colors[index % colors.length]}
              />
            ))}
           </Pie>
           <Tooltip />
        </PieChart>
        </Grid>
    </PapperBlock>
  );
}

export default MaritalStatusWidget;
