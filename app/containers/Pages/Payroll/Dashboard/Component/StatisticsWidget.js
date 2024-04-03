import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { LineChart, Line, Tooltip } from "recharts";
import colorfull from "enl-api/palette/colorfull";
import { injectIntl } from "react-intl";
import useStyles from "./widget-jss";
import CounterTrading from "./CounterTrading";
import Money from "@mui/icons-material/Money";
import BalconyIcon from "@mui/icons-material/Balcony";
import GridViewIcon from "@mui/icons-material/GridView";
import OrgLevelWidget from "./OrgLevelWidget";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import PayRollLoader from "../../Component/PayRollLoader";
import api from "../api";
import { useSelector } from "react-redux";

function StatisticsWidget(props) {
  const { classes } = useStyles();

  const [data1, setData1] = useState([
    {
      mIns: 3000,
      salary: 4000,
      tax: 2400,
      sIns: 2400,
    },
    {
      mIns: 2000,
      salary: 3000,
      tax: 1398,
      sIns: 2210,
    },
    {
      mIns: 2500,
      salary: 2000,
      tax: 9800,
      sIns: 2290,
    },
    {
      mIns: 2000,
      salary: 2780,
      tax: 3908,
      sIns: 2000,
    },
    {
      mIns: 3000,
      salary: 1890,
      tax: 4800,
      sIns: 2181,
    },
  ]);

  const [data2, setData2] = useState([
    {
      title: "Salary",
      value: 100000,
      lowest: 5000,
      highest: 25000,
      percentage: 10,
      position: "up",
    },
    {
      title: "Tax",
      value: 15000,
      lowest: 1000,
      highest: 3000,
      percentage: 15,
      position: "down",
    },
    {
      title: "Social Ins",
      value: 20000,
      lowest: 200,
      highest: 1000,
      percentage: 20,
      position: "up",
    },
    {
      title: "Medical Ins",
      value: 30000,
      lowest: 350,
      highest: 500,
      percentage: 30,
      position: "down",
    },
  ]);
  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const IsStaticDashboard = localStorage.getItem("IsStaticDashboard");

  const getdata = async () => {
    try {
      if (IsStaticDashboard == "false") {
        setIsLoading(true);
        const data = await api(locale).getMonthlyPyarollData();
        setData1(data);

        const data2 = await api(locale).getPyarollData();
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
      <div className={classes.rootCounter}>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <CounterTrading
                  color={colorfull[4]}
                  start={0}
                  end={data2[0].value}
                  duration={3}
                  title={data2[0].title}
                  logo={<Money />}
                  position={data2[0].position}
                  value={data2[0].percentage}
                  lowest={data2[0].lowest}
                  highest={data2[0].highest}
                >
                  <LineChart width={240} height={60} data={data1}>
                    <Line
                      type="monotone"
                      dataKey="salary"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    />
                  </LineChart>
                </CounterTrading>
              </Grid>
              <Grid item sm={6} xs={12}>
                <CounterTrading
                  color={colorfull[1]}
                  start={0}
                  end={data2[1].value}
                  duration={3}
                  title={data2[1].title}
                  logo={<BalconyIcon />}
                  position={data2[1].position}
                  value={data2[1].percentage}
                  lowest={data2[1].lowest}
                  highest={data2[1].highest}
                >
                  <LineChart width={240} height={60} data={data1}>
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="tax"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    />
                  </LineChart>
                </CounterTrading>
              </Grid>
              <Grid item sm={6} xs={12}>
                <CounterTrading
                  color={"#12bbd1"}
                  start={0}
                  end={data2[2].value}
                  duration={3}
                  title={data2[2].title}
                  logo={<GridViewIcon />}
                  position={data2[2].position}
                  value={data2[2].percentage}
                  lowest={data2[2].lowest}
                  highest={data2[2].highest}
                >
                  <LineChart width={240} height={60} data={data1}>
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sIns"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    />
                  </LineChart>
                </CounterTrading>
              </Grid>
              <Grid item sm={6} xs={12}>
                <CounterTrading
                  color={colorfull[5]}
                  start={0}
                  end={data2[3].value}
                  duration={3}
                  title={data2[3].title}
                  logo={<MedicationLiquidIcon />}
                  position={data2[3].position}
                  value={data2[3].percentage}
                  lowest={data2[3].lowest}
                  highest={data2[3].highest}
                >
                  <LineChart width={240} height={60} data={data1}>
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="mIns"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    />
                  </LineChart>
                </CounterTrading>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} xs={12}>
            <OrgLevelWidget />
            {/* <Grid container spacing={2}>
            <Grid item sm={12} xs={6}>
              <MangementCounterWidget
                color="firstCard"
                start={0}
                end={1307}
                duration={3}
                title={intl.formatMessage(messages.Overtime)}
              >
                <HotTubSharpIcon className={classes.counterIcon1} />
              </MangementCounterWidget>
            </Grid>
            <Grid item sm={12} xs={6}>
              <MangementCounterWidget
                color="secondCard"
                start={0}
                end={2041}
                duration={3}
                title={intl.formatMessage(messages.Vacations)}
              >
                <HomeSharpIcon className={classes.counterIcon1} />
              </MangementCounterWidget>
            </Grid>
            <Grid item xs={12}>
              <MangementCounterWidget
                color="thirdCard"
                start={0}
                end={1400}
                duration={3}
                title={intl.formatMessage(messages.penalty)}
              >
                <CreditCardOffIcon className={classes.counterIcon1} />
              </MangementCounterWidget>
            </Grid>
            <Grid item xs={12}>
              <MangementCounterWidget
                color="forthCard"
                start={0}
                end={1400}
                duration={3}
                title={intl.formatMessage(messages.rewards)}
              >
                <AddCard className={classes.counterIcon1} />
              </MangementCounterWidget>
            </Grid>
          </Grid> */}
          </Grid>
        </Grid>
      </div>
    </PayRollLoader>
  );
}

StatisticsWidget.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(StatisticsWidget);
