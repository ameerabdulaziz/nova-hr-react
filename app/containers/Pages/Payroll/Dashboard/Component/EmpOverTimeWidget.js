import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { injectIntl, FormattedMessage } from "react-intl";
import "enl-styles/vendors/rechart/styles.css";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import colorfull from "enl-api/palette/colorfull";
import messages from "./messages";
import useStyles from "./fluidChart-jss";
import { PapperBlock } from "enl-components";
import PayRollLoader from "../../Component/PayRollLoader";
import api from "../api";
import { useSelector } from "react-redux";

const color = {
  main: colorfull[2],
  secondary: colorfull[6],
  third: colorfull[0],
  fourth: colorfull[1],
};

function EmpOverTimeWidget(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();
  const [data2, setData2] = useState([
    {
      name: "Jan",
      value: 40,
    },
    {
      name: "Feb",
      value: 45,
    },
    {
      name: "Mar",
      value: 27,
    },
    {
      name: "Apr",
      value: 50,
    },
    {
      name: "May",
      value: 32,
    },
    {
      name: "Jun",
      value: 50,
    },
    {
      name: "Jul",
      value: 24,
    },
    {
      name: "Aug",
      value: 32,
    },
    {
      name: "Sept",
      value: 40,
    },
    {
      name: "Oct",
      value: 50,
    },
    {
      name: "Nov",
      value: 50,
    },
    {
      name: "Dec",
      value: 79,
    },
  ]);

  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const IsStaticDashboard = localStorage.getItem("IsStaticDashboard");

  const getdata = async () => {
    try {
      if (IsStaticDashboard == "false") {
        setIsLoading(true);
        
        const data2 = await api(locale).getMonthlyOvertime(true);
        setData2(data2);
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
        <div>
          <Typography className={classes.smallTitle} variant="button">
            <StackedLineChartIcon className={classes.leftIcon} />
            <FormattedMessage {...messages.OvertimeWidget} />
          </Typography>
          <Divider className={classes.divider} />

          <div className={classes.chartWrap}>
            <div className={classes.chartFluid}>
              <ResponsiveContainer width={550} height="100%">
                <ComposedChart
                  data={data2}
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
                  <Tooltip />
                  <Area
                    type="monotone"
                    stackId="3"
                    dataKey="value"
                    stroke="none"
                    fill={color.main}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </PapperBlock>
    </PayRollLoader>
  );
}

EmpOverTimeWidget.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmpOverTimeWidget);
