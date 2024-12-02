import React, { useEffect, useState } from "react";

import { purple, blue, cyan, pink } from "@mui/material/colors";
import "enl-styles/vendors/react-weather/GenericWeather.css";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PapperBlock } from "enl-components";
import useStyles from "./fluidChart-jss";
import FilterCenterFocus from "@mui/icons-material/PieChart";
import Divider from "@mui/material/Divider";
import messages from "./messages";
import { injectIntl, FormattedMessage } from "react-intl";
import PayRollLoader from "../../Component/PayRollLoader";
import api from "../api";
import { useSelector } from "react-redux";

const colorsPie = [purple[500], blue[500], cyan[500], pink[500]];
function OvertimeLateWidget(props) {
  const { classes, cx } = useStyles();
  const [data2, setData] = useState([
    {
      name: "Overtime",
      value: 20,
    },
    {
      name: "Early Departial",
      value: 3,
    },
    {
      name: "Late Arrival",
      value: 5,
    },
  ]);
  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const IsStaticDashboard = localStorage.getItem("IsStaticDashboard");

  const getdata = async () => {
    try {
      if (IsStaticDashboard == "false") {
        setIsLoading(true);

        const data2 = await api(locale).getOvertimeVSLate();
        setData(data2);
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
            <FormattedMessage {...messages.OvertimeLateWidget} />
          </Typography>
          <Divider className={classes.divider} />
          <div className={classes.chartWrap}>
            <div className={classes.bichartFluid}>
              <ResponsiveContainer width={350} height="100%">
                <PieChart width={300} height={275}>
                  <Pie
                    data={data2}
                    dataKey="value"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#FFFFFF"
                    paddingAngle={5}
                    label
                  >
                    {data2.length>0 && data2.map((entry, index) => (
                      <Cell
                        key={index.toString()}
                        fill={colorsPie[index % colorsPie.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    iconType="circle"
                    verticalALign="bottom"
                    iconSize={10}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Grid>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default OvertimeLateWidget;
