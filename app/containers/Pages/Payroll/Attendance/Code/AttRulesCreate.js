import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../api/AttRulesData";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { Button, Grid, TextField, Card, CardContent } from "@mui/material";
import Hidden from "@mui/material/Hidden";
import useStyles from "../../Style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tab1 from "./Tab1";

function AttRulesCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();

  const [data, setdata] = useState({
    id: 0,
    arName: "",
    enName: "",
    startTime: "",
    hours: "",
    endTime: "",
    allowedLate: "",
    allowedEarlyEx: "",
    allowedEarlyenter: "",
    allowedLateEx: "",
    shft2d: false,
    shft10Hours: false,
    hoursFromEmp: false,
    coreH: false,
    coreStart: "",
    coreEnd: "",
    firstM: "",
    firstMfactor: "",
    restTimeFactor: "",
    webHide: false,
  });

  const history = useHistory();
  const [processing, setprocessing] = useState(false);
  const [value, setValue] = useState(0);

  const handleTabChange = (event, val) => {
    setValue(val);
  };
  const handleChange = (event) => {
    if (event.target.name == "arName")
      setdata((prevFilters) => ({
        ...prevFilters,
        arName: event.target.value,
      }));

    if (event.target.name == "enName")
      setdata((prevFilters) => ({
        ...prevFilters,
        enName: event.target.value,
      }));

    if (event.target.name == "allowedLate")
      setdata((prevFilters) => ({
        ...prevFilters,
        allowedLate: event.target.value,
      }));

    if (event.target.name == "allowedEarlyEx")
      setdata((prevFilters) => ({
        ...prevFilters,
        allowedEarlyEx: event.target.value,
      }));

    if (event.target.name == "allowedEarlyenter") {
      setdata((prevFilters) => ({
        ...prevFilters,
        allowedEarlyenter: event.target.value,
      }));
    }
    if (event.target.name == "allowedLateEx") {
      setdata((prevFilters) => ({
        ...prevFilters,
        allowedLateEx: event.target.value,
      }));
    }
    if (event.target.name == "coreStart") {
      setdata((prevFilters) => ({
        ...prevFilters,
        coreStart: event.target.value,
      }));
    }
    if (event.target.name == "coreEnd") {
      setdata((prevFilters) => ({
        ...prevFilters,
        coreEnd: event.target.value,
      }));
    }
    if (event.target.name == "firstM") {
      setdata((prevFilters) => ({
        ...prevFilters,
        firstM: event.target.value,
      }));
    }
    if (event.target.name == "firstMfactor") {
      setdata((prevFilters) => ({
        ...prevFilters,
        firstMfactor: event.target.value,
      }));
    }
    if (event.target.name == "restTimeFactor") {
      setdata((prevFilters) => ({
        ...prevFilters,
        restTimeFactor: event.target.value,
      }));
    }
    if (event.target.name == "startTime") {
      if (data.endTime != "") {
        var diff = Math.round(
          (new Date(
            0,
            0,
            0,
            data.endTime.split(":")[0],
            data.endTime.split(":")[1]
          ) -
            new Date(
              0,
              0,
              0,
              event.target.value.split(":")[0],
              event.target.value.split(":")[1]
            )) /
            3600000
        );

        setdata((prevFilters) => ({
          ...prevFilters,
          startTime: event.target.value,
          hours: diff,
        }));
      } else
        setdata((prevFilters) => ({
          ...prevFilters,
          startTime: event.target.value,
        }));
    }

    if (event.target.name == "endTime") {
      if (data.startTime != "") {
        var diff = Math.round(
          (new Date(
            0,
            0,
            0,
            event.target.value.split(":")[0],
            event.target.value.split(":")[1]
          ) -
            new Date(
              0,
              0,
              0,
              data.startTime.split(":")[0],
              data.startTime.split(":")[1]
            )) /
            3600000
        );

        setdata((prevFilters) => ({
          ...prevFilters,
          endTime: event.target.value,
          hours: diff,
        }));
      } else
        setdata((prevFilters) => ({
          ...prevFilters,
          endTime: event.target.value,
        }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setprocessing(true);
      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/Att/AttRules`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setprocessing(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/Att/AttRules`);
  }
  async function fetchData() {
    if (id) {
      const dataApi = await ApiData(locale).Get(id ?? 0);
      setdata(dataApi);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function TabContainer(props) {
    const { children } = props;
    return <div style={{ paddingTop: 8 * 3 }}>{children}</div>;
  }
  const style = {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    },
    "& label": {
      color: "white",
    },
    "& MuiInputBase-root": {
      borderColor: "white"
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
   
  }
  return (
    <div>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.ShiftCreateTitle)
            : intl.formatMessage(messages.ShiftUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <div className={classes.cover}>
            <div className={classes.content}>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                justifyContent="center"
              >
                <Grid container item md={6} xs={12} direction="row" spacing={3}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      id="arName"
                      name="arName"
                      value={data.arName}
                      onChange={(e) => handleChange(e)}
                      label={intl.formatMessage(Payrollmessages.arName)}
                      className={classes.field}
                      sx={style}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      id="enName"
                      name="enName"
                      value={data.enName}
                      onChange={(e) => handleChange(e)}
                      label={intl.formatMessage(Payrollmessages.enName)}
                      sx={style}
                      className={classes.field}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={12} spacing={3} container
                alignItems="flex-start"
                direction="row"
                justifyContent="center">
                    <Grid item xs={12} md={3}>
                      <Button
                        variant="contained"
                        type="submit"
                        size="medium"
                        color="secondary"
                      >
                        <FormattedMessage {...Payrollmessages.save} />
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Button
                        variant="contained"
                        type="submit"
                        size="medium"
                        color="secondary"
                      >
                        <FormattedMessage {...Payrollmessages.cancel} />
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Button
                        variant="contained"
                        type="submit"
                        size="medium"
                        color="secondary"
                      >
                        <FormattedMessage {...Payrollmessages.search} />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
          <AppBar position="static" className={classes.profileTab}>
            <Hidden mdDown>
              <Tabs
                value={value}
                onChange={handleTabChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label={"Tab1"} />
                <Tab label={"Tab2"} />
                <Tab label={"Tab3"} />
                <Tab label={"Tab1"} />
                <Tab label={"Tab2"} />
                <Tab label={"Tab3"} />
                <Tab label={"Tab1"} />
                <Tab label={"Tab2"} />
              </Tabs>
            </Hidden>
          </AppBar>

          {value === 0 && (
            <TabContainer>
              <Tab1 />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <div>
                <span>Tab2</span>
              </div>
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <div>
                <span>Tab3</span>
              </div>
            </TabContainer>
          )}
        </form>
      </PapperBlock>
    </div>
  );
}
AttRulesCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(AttRulesCreate);
