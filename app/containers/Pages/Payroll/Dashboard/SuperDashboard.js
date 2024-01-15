import React, { useState, useEffect, useMemo } from "react";
import { PapperBlock } from "enl-components";
import messages from "./Component/messages";
import Payrollmessages from "../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { Button, Grid, TextField } from "@mui/material";
import useStyles from "../Style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EmployeeDashboard from "./EmployeeDashboard";
import OtherEmpDashboard from "./OtherEmpDashboard";
import GeneralListApis from "../api/GeneralListApis";
import PayRollLoader from "../Component/PayRollLoader";
import StatisticsWidget2 from "./Component/StatisticsWidget2";
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';


function SuperDashboard(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (event, val) => {
    debugger;
    setValue(val);
  };

  useEffect(() => {
    //fetchData();
  }, []);

  
  return (
    <PayRollLoader isLoading={isLoading}>
      <form>
        <div className={classes.cover2}>
          <div className={classes.headercontent2}>
            <StatisticsWidget2 />
          </div>
        </div>
        <AppBar position="static" className={classes.profileTab2}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
          >
            <Tab icon={<PersonIcon />} />
            <Tab icon={<GroupsIcon />} />
          </Tabs>
        </AppBar>

        {value === 0 && (
          <div style={{ paddingTop: 8 * 3 }}>
            <EmployeeDashboard />
          </div>
        )}
        {value === 1 && (
          <div style={{ paddingTop: 8 * 3 }}>
            <OtherEmpDashboard />
          </div>
        )}
      </form>
    </PayRollLoader>
  );
}
SuperDashboard.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(SuperDashboard);
