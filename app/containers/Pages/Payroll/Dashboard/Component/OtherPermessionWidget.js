import React, { useEffect, useState } from "react";
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
import PayRollLoader from "../../Component/PayRollLoader";
import api from "../api";
import { useSelector } from "react-redux";

function TaxInsWidget(props) {
  const { intl } = props;
  const { classes } = useStyles();

  const [data, setData] = useState([
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
        
        const data = await api(locale).getOtherPermession();
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
        <div>
          <Typography className={classes.smallTitle} variant="button">
            <FilterCenterFocus className={classes.leftIcon} />
            <FormattedMessage {...messages.OtherPermessionWidget} />
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

                  <Line
                    type="monotone"
                    dataKey="value"
                    strokeWidth={5}
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(TaxInsWidget);
