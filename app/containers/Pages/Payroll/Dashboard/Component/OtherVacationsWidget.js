import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { injectIntl, FormattedMessage } from "react-intl";
import "enl-styles/vendors/rechart/styles.css";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";

import { PapperBlock } from "enl-components";
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
import useStyles from "./widget-jss";
import PayRollLoader from "../../Component/PayRollLoader";
import api from "../api";
import { useSelector } from "react-redux";

const color = {
  main: colorfull[2],
  secondary: colorfull[6],
  third: colorfull[0],
  fourth: colorfull[1],
};

function OtherVacationsWidget(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();
  const [data2, setData2] = useState([
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
  ]);

  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const IsStaticDashboard = localStorage.getItem("IsStaticDashboard");

  const getdata = async () => {
    try {
      if (IsStaticDashboard == "false") {
        setIsLoading(true);
        
        const data = await api(locale).getOtherVacations();

        setData2(data);
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
            <FormattedMessage {...messages.OtherVacationsWidget} />
          </Typography>
          <Divider className={classes.divider} />

          <div className={classes.chartWrap}>
            <div className={classes.chartFluid}>
              <ResponsiveContainer width={550} height="100%">
                <ComposedChart data={data2} width={550} height={300}>
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

OtherVacationsWidget.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OtherVacationsWidget);
