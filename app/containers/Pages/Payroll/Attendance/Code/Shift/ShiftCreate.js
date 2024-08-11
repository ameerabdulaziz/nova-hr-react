import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/ShiftData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { Button, Grid, TextField, Card, CardContent } from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import Autocomplete from "@mui/material/Autocomplete";
import { calculateTimeDifference } from "../../../helpers";

function ShiftCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();

  const ShiftTypeList = [
    { id: 1, name: "Free Shift" },
    { id: 2, name: "Open Shift" },
  ];
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
    shiftType: "",
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
        setdata((prevFilters) => ({
          ...prevFilters,
          startTime: event.target.value,
          hours: calculateTimeDifference(event.target.value, data.endTime),
        }));
      } else
        setdata((prevFilters) => ({
          ...prevFilters,
          startTime: event.target.value,
        }));
    }

    if (event.target.name == "endTime") {
      if (data.startTime != "") {
        setdata((prevFilters) => ({
          ...prevFilters,
          endTime: event.target.value,
          hours: calculateTimeDifference(data.startTime, event.target.value),
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
      setdata((prevFilters) => ({
        ...prevFilters,
        hours: calculateTimeDifference(dataApi.startTime, dataApi.endTime),
      }));
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid container item md={8} xs={12} direction="row" spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="arName"
                  name="arName"
                  value={data.arName}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(Payrollmessages.arName)}
                  className={classes.field}
                  variant="outlined"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="enName"
                  name="enName"
                  value={data.enName}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(Payrollmessages.enName)}
                  className={classes.field}
                  variant="outlined"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={3}>
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
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={3}>
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
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  id="hours"
                  name="hours"
                  value={data.hours}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(messages.hours)}
                  required
                  className={classes.field}
                  variant="outlined"
                  disabled
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Autocomplete
                  id="ddlShiftType"
                  options={ShiftTypeList}
                  value={
                    ShiftTypeList.find((item) => item.id === data.shiftType) ||
                    null
                  }
                  isOptionEqualToValue={(option, value) =>
                    value.id === 0 || value.id === "" || option.id === value.id
                  }
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  onChange={(event, value) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      shiftType: value !== null ? value.id : null,
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      name="shiftType"
                      label={intl.formatMessage(messages.ShiftType)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                      alignItems="flex-start"
                      direction="row"
                    >
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="allowedLate"
                          name="allowedLate"
                          value={data.allowedLate}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.allowedLate)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="allowedEarlyEx"
                          name="allowedEarlyEx"
                          value={data.allowedEarlyEx}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.allowedEarlyEx)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="allowedLateEx"
                          name="allowedLateEx"
                          value={data.allowedLateEx}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.allowedLateEx)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="allowedEarlyenter"
                          name="allowedEarlyenter"
                          value={data.allowedEarlyenter}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.allowedEarlyenter)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                      alignItems="flex-start"
                      direction="row"
                    >
                      <Grid item xs={12} md={4}>
                        <TextField
                          id="firstM"
                          name="firstM"
                          value={data.firstM}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.firstM)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          id="firstMfactor"
                          name="firstMfactor"
                          value={data.firstMfactor}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.firstMfactor)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          id="restTimeFactor"
                          name="restTimeFactor"
                          value={data.restTimeFactor}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.restTimeFactor)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container item md={4} xs={12} direction="row" spacing={3}>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid
                      container
                      spacing={1}
                      alignItems="flex-start"
                      direction="row"
                    >
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.shft2d}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  shft2d: e.target.checked,
                                }))
                              }
                              value={data.shft2d}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.shft2d)}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.shft10Hours}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  shft10Hours: e.target.checked,
                                }))
                              }
                              value={data.shft10Hours}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.shft10Hours)}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.hoursFromEmp}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  hoursFromEmp: e.target.checked,
                                }))
                              }
                              value={data.hoursFromEmp}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.hoursFromEmp)}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.webHide}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  webHide: e.target.checked,
                                }))
                              }
                              value={data.webHide}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.webHide)}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                      alignItems="flex-start"
                      direction="row"
                    >
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.coreH}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  coreH: e.target.checked,
                                }))
                              }
                              value={data.coreH}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.coreH)}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          id="coreStart"
                          name="coreStart"
                          value={data.coreStart}
                          label={intl.formatMessage(messages.startTime)}
                          type="time"
                          onChange={(e) => handleChange(e)}
                          className={classes.field}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="coreEnd"
                          name="coreEnd"
                          value={data.coreEnd}
                          label={intl.formatMessage(messages.endTime)}
                          type="time"
                          onChange={(e) => handleChange(e)}
                          className={classes.field}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          autoComplete="off"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="secondary"
                disabled={processing}
              >
                {processing && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={oncancel}
              >
                <FormattedMessage {...Payrollmessages.cancel} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </div>
  );
}
ShiftCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ShiftCreate);
