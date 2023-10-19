import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../api/ShiftEmployeeData";
import shiftApi from "../api/ShiftData";
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
  Autocomplete,
  Card,
  CardContent,
} from "@mui/material";
import useStyles from "../../Style";
import PropTypes from "prop-types";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GeneralListApis from "../../api/GeneralListApis";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function ShiftEmployeeCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id, employeeId, employeeName } = location.state ?? 0;
  const { classes } = useStyles();

  const [data, setdata] = useState({
    id: 0,
    employeeId: employeeId ? employeeId : "",
    employeeName: "",
    shiftId: "",
    shiftName: "",
    startTime: "",
    endTime: "",
    workHours: "",
    fromDate: format(new Date(), "yyyy-MM-dd"),
    toDate: format(new Date(), "yyyy-MM-dd"),
    vsaturday: false,
    vsunday: false,
    vmonday: false,
    vtuesday: false,
    vwednesday: false,
    vthursday: false,
    vfriday: false,
  });

  const history = useHistory();
  const [processing, setprocessing] = useState(false);
  const [ShiftsList, setShifts] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setprocessing(true);
      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/Att/ShiftEmployee`, {
          employeeId: data.employeeId,
        });
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setprocessing(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/Att/ShiftEmployee`, {
      employeeId: data.employeeId,
    });
  }
  async function fetchData() {
    const shifts = await GeneralListApis(locale).GetShiftList();
    setShifts(shifts);
    if (id) {
      const dataApi = await ApiData(locale).Get(id ?? 0);
      setdata(dataApi);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function getShiftData(id) {
    const result = await shiftApi(locale).Get(id);

    setdata((prevFilters) => ({
      ...prevFilters,
      startTime: result.startTime,
      endTime: result.endTime,
      workHours: Math.round(
        (new Date(
          0,
          0,
          0,
          result.endTime.split(":")[0],
          result.endTime.split(":")[1]
        ) -
          new Date(
            0,
            0,
            0,
            result.startTime.split(":")[0],
            result.startTime.split(":")[1]
          )) /
          3600000
      ),
    }));
  }
  return (
    <div>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.EmployeeShiftCreateTitle) +
              "  (" +
              employeeName +
              ")"
            : intl.formatMessage(messages.EmployeeShiftUpdateTitle) +
              "  (" +
              employeeName +
              ")"
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="shiftId"
                options={ShiftsList}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                value={{ id: data.shiftId, name: data.shiftName }}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    shiftId: value !== null ? value.id : 0,
                    shiftName: value !== null ? value.name : "",
                  }));
                  getShiftData(value.id);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="shiftId"
                    required
                    label={intl.formatMessage(messages.shiftName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={2}>
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
            <Grid item xs={12} md={2}>
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
            <Grid item xs={12} md={2}>
              <TextField
                id="workHours"
                name="workHours"
                value={data.workHours}
                onChange={(e) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    workHours: e.target.value,
                  }));
                }}
                label={intl.formatMessage(messages.hours)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={2}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(Payrollmessages.fromdate)}
                  value={data.fromDate}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      fromDate: format(new Date(date), "yyyy-MM-dd"),
                    }));
                  }}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={2}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(Payrollmessages.todate)}
                  value={data.toDate}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      toDate: format(new Date(date), "yyyy-MM-dd"),
                    }));
                  }}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={8}></Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.vsaturday}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                vsaturday: e.target.checked,
                              }))
                            }
                            value={data.vsaturday}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(Payrollmessages.saturday)}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.vsunday}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                vsunday: e.target.checked,
                              }))
                            }
                            value={data.vsunday}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(Payrollmessages.sunday)}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.vmonday}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                vmonday: e.target.checked,
                              }))
                            }
                            value={data.vmonday}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(Payrollmessages.monday)}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.vtuesday}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                vtuesday: e.target.checked,
                              }))
                            }
                            value={data.vtuesday}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(Payrollmessages.tuesday)}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.vwednesday}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                vwednesday: e.target.checked,
                              }))
                            }
                            value={data.vwednesday}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(Payrollmessages.wednesday)}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.vthursday}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                vthursday: e.target.checked,
                              }))
                            }
                            value={data.vthursday}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(Payrollmessages.thursday)}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.vfriday}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                vfriday: e.target.checked,
                              }))
                            }
                            value={data.vfriday}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(Payrollmessages.friday)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}></Grid>

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
ShiftEmployeeCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ShiftEmployeeCreate);
