import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import SupervisorAccount from "@mui/icons-material/SupervisorAccount";
import { injectIntl } from "react-intl";
import CounterWidget from "./CounterWidget";
import messages from "./messages";
import useStyles from "./widget-jss";
import CoPresentSharpIcon from "@mui/icons-material/CoPresentSharp";
import DirectionsWalkSharpIcon from "@mui/icons-material/DirectionsWalkSharp";
import Diversity3SharpIcon from "@mui/icons-material/Diversity3Sharp";
import FeedSharpIcon from "@mui/icons-material/FeedSharp";
import PayRollLoader from "../../Component/PayRollLoader";
import api from "../api";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import style from "../../../../../styles/styles.scss";
import SITEMAP from "../../../../App/routes/sitemap";

function CounterIconWidget(props) {
  const { intl } = props;
  const history = useHistory();
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const [mainBarData, setMainBarData] = useState({
    employees: 300,
    newHired: 10,
    inPorpatiom: 3,
    resignation: 11,
    terminated: 5,
  });

  const IsStaticDashboard = localStorage.getItem("IsStaticDashboard");
  const getdata = async () => {
    try {
      if (IsStaticDashboard == "false") {
        setIsLoading(true);

        const data3 = await api(locale).getMainBarData();
        if (data3.length > 0) setMainBarData(data3[0]);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);


  const cardsRedirectFuc = (cardName) => {
    if(cardName === "Employee")
    {
      history.push(SITEMAP.employee.EmployeeList.route, { dashboardCardKey: null });
    }
    else if(cardName === "NewHired")
      {
        history.push(SITEMAP.employee.EmployeeList.route, { dashboardCardKey: "NewHired" });
      }
    else if(cardName === "InPorpatiom")
      {
        history.push(SITEMAP.employee.EmployeeList.route, { dashboardCardKey: "InPorpatiom" });
      }
    else if(cardName === "Resignation")
      {
        history.push(SITEMAP.employee.EmployeeList.route, { dashboardCardKey: "Resignation" });
      }
    else if(cardName === "Terminated")
      {
        history.push(SITEMAP.employee.EmployeeList.route, { dashboardCardKey: "Terminated" });
      }
  }


  return (
    <PayRollLoader isLoading={isLoading}>
      <div className={classes.rootCounterFull}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={2.4}>
            <div onClick={()=>{cardsRedirectFuc("Employee")}} className={style.dashCardSty}>
              <CounterWidget
                color="firstCard"
                start={0}
                end={mainBarData.employees}
                duration={3}
                title={intl.formatMessage(messages.Employee)}
              >
                <SupervisorAccount className={classes.counterIcon} />
              </CounterWidget>
            </div>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <div onClick={()=>{cardsRedirectFuc("NewHired")}} className={style.dashCardSty}>
              <CounterWidget
                color="secondCard"
                start={0}
                end={mainBarData.newHired}
                duration={3}
                title={intl.formatMessage(messages.newHired)}
              >
                <CoPresentSharpIcon className={classes.counterIcon} />
              </CounterWidget>
            </div>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <div onClick={()=>{cardsRedirectFuc("InPorpatiom")}} className={style.dashCardSty}>
              <CounterWidget
                color="thirdCard"
                start={0}
                end={mainBarData.inPorpatiom}
                duration={3}
                title={intl.formatMessage(messages.inProbation)}
              >
                <Diversity3SharpIcon className={classes.counterIcon} />
              </CounterWidget>
            </div>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <div onClick={()=>{cardsRedirectFuc("Resignation")}} className={style.dashCardSty}>
              <CounterWidget
                color="forthCard"
                start={0}
                end={mainBarData.resignation}
                duration={3}
                title={intl.formatMessage(messages.resignation)}
              >
                <FeedSharpIcon className={classes.counterIcon} />
              </CounterWidget>
            </div>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <div onClick={()=>{cardsRedirectFuc("Terminated")}} className={style.dashCardSty}>
              <CounterWidget
                color="fifthCard"
                start={0}
                end={mainBarData.terminated}
                duration={3}
                title={intl.formatMessage(messages.terminated)}
              >
                {/* <CollectionsBookmark className={classes.counterIcon} /> */}
                <DirectionsWalkSharpIcon
                  className={classes.counterIcon}
                ></DirectionsWalkSharpIcon>
              </CounterWidget>
            </div>
          </Grid>
        </Grid>
      </div>
    </PayRollLoader>
  );
}

CounterIconWidget.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CounterIconWidget);
