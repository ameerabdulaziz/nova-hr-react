import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../api/ShiftData";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  Autocomplete,
} from "@mui/material";
import useStyles from "../../Style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function Tab1(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();

  const [ElementList, setElementList] = useState([]);
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
        history.push(`/app/Pages/Att/Shift`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setprocessing(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/Att/Shift`);
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

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={3} alignItems="flex-start" direction="row">
          <Grid
            item
            md={6}
            xs={12}
            spacing={1}
            container
            alignItems="flex-start"
            direction="row"
          >
            <Grid item md={12} xs={12}>
              <Autocomplete
                id="elementid"
                options={ElementList}
                value={{ id: data.elementId, name: data.elementName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    elementId: value !== null ? value.id : null,
                    elementName: value !== null ? value.name : "",
                  }));
                }}
                disabled={!data.isDeducted}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="elementid"
                    required={data.isDeducted}
                    disabled={!data.isDeducted}
                    label={intl.formatMessage(Payrollmessages.element)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.isDeducted}
                    onChange={(e) =>
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        isDeducted: e.target.checked,
                        isDeductAnnual: !e.target.checked,
                      }))
                    }
                    value={data.isDeducted}
                    color="primary"
                  />
                }
                label={intl.formatMessage(messages.isDeducted)}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={12}>
                      <TextField
                        id="arName"
                        name="arName"
                        value={data.arName}
                        onChange={(e) => handleChange(e)}
                        label={intl.formatMessage(Payrollmessages.arName)}
                        className={classes.field}
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
                        className={classes.field}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        id="startTime"
                        name="startTime"
                        value={data.startTime}
                        label={intl.formatMessage(messages.startTime)}
                        type="time"
                        onChange={(e) => handleChange(e)}
                        className={classes.field}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        id="endTime"
                        name="endTime"
                        value={data.endTime}
                        label={intl.formatMessage(messages.endTime)}
                        type="time"
                        onChange={(e) => handleChange(e)}
                        className={classes.field}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            spacing={1}
            container
            alignItems="flex-start"
            direction="row"
          >
            <Grid item md={12} xs={12}>
              <Autocomplete
                id="elementid"
                options={ElementList}
                value={{ id: data.elementId, name: data.elementName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    elementId: value !== null ? value.id : null,
                    elementName: value !== null ? value.name : "",
                  }));
                }}
                disabled={!data.isDeducted}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="elementid"
                    required={data.isDeducted}
                    disabled={!data.isDeducted}
                    label={intl.formatMessage(Payrollmessages.element)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.isDeducted}
                    onChange={(e) =>
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        isDeducted: e.target.checked,
                        isDeductAnnual: !e.target.checked,
                      }))
                    }
                    value={data.isDeducted}
                    color="primary"
                  />
                }
                label={intl.formatMessage(messages.isDeducted)}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={12}>
                      <TextField
                        id="arName"
                        name="arName"
                        value={data.arName}
                        onChange={(e) => handleChange(e)}
                        label={intl.formatMessage(Payrollmessages.arName)}
                        className={classes.field}
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
                        className={classes.field}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        id="startTime"
                        name="startTime"
                        value={data.startTime}
                        label={intl.formatMessage(messages.startTime)}
                        type="time"
                        onChange={(e) => handleChange(e)}
                        className={classes.field}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        id="endTime"
                        name="endTime"
                        value={data.endTime}
                        label={intl.formatMessage(messages.endTime)}
                        type="time"
                        onChange={(e) => handleChange(e)}
                        className={classes.field}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default injectIntl(Tab1);
