import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/ShiftEmployeeData";
import shiftApi from "../../api/ShiftData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
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
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import GeneralListApis from "../../../api/GeneralListApis";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function ShiftEmployeeCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id, employeeId, employeeName } = location.state ?? 0;
  const { classes } = useStyles();
  const companyInfo = useSelector((state) => state.authReducer.companyInfo);
  const user = useSelector((state) => state.authReducer.user);

  const [data, setdata] = useState({
    id: 0,
    employeeId: employeeId ? employeeId : "",
    employeeName: "",
    shiftId: "",
    shiftName: "",
    startTime: "",
    endTime: "",
    workHours: "",
    hoursFromEmp: false,
    fromDate: dayjs(),
    toDate: dayjs(),
    vsaturday: false,
    vsunday: false,
    vmonday: false,
    vtuesday: false,
    vwednesday: false,
    vthursday: false,
    vfriday: false,
  });

  const [DateError, setDateError] = useState({});

  const history = useHistory();
  const [processing, setprocessing] = useState(false);
  const [ShiftsList, setShifts] = useState([]);

  const dateFormatFun = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    const apiAata = {
      id: data.id,
      employeeId: data.employeeId,
      employeeName: data.employeeName,
      shiftId: data.shiftId,
      shiftName: data.shiftName,
      startTime: data.startTime,
      endTime: data.endTime,
      workHours: data.workHours,
      fromDate: dateFormatFun(data.fromDate),
      toDate: dateFormatFun(data.toDate),
      vsaturday: data.vsaturday,
      vsunday: data.vsunday,
      vmonday: data.vmonday,
      vtuesday: data.vtuesday,
      vwednesday: data.vwednesday,
      vthursday: data.vthursday,
      vfriday: data.vfriday,
    };

    try {
      setprocessing(true);
      let response = await ApiData(locale).Save(apiAata);

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

    const dataApi = await ApiData(locale).Get(
      id ?? 0,
      employeeId ? employeeId : ""
    );
    const enhancedShiftData = {
      ...dataApi,
      fromDate: id?dayjs(dataApi.fromDate):dayjs(),
      toDate: id?dayjs(dataApi.toDate):dayjs(),
    };

    setdata(enhancedShiftData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function getShiftData(value) {
    if (value == null) {
      setdata((prevFilters) => ({
        ...prevFilters,
        shiftId: 0,
        shiftName: "",
        startTime: "",
        endTime: "",
        workHours: "",
        hoursFromEmp: false,
      }));
    } else {
      const result = await shiftApi(locale).Get(value.id);

      var diff =
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
        3600000;
      setdata((prevFilters) => ({
        ...prevFilters,
        shiftId: result.id,
        shiftName: value !== null ? value.name : "",
        startTime: result.startTime,
        endTime: result.endTime,
        workHours: diff < 0 ? diff * -1 : diff,
        hoursFromEmp: result.hoursFromEmp,
      }));
    }
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
                getOptionLabel={(option) =>
                  option.id && option.name
                    ? `${option.id} - ${option.name} `
                    : ""
                }
                value={{ id: data.shiftId, name: data.shiftName }}
                onChange={(event, value) => {
                  /* setdata((prevFilters) => ({
                    ...prevFilters,
                    shiftId: value !== null ? value.id : 0,
                    shiftName: value !== null ? value.name : "",
                  })); */
                  getShiftData(value);
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
                disabled
                onChange={(e) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    startTime: e.target.value,
                  }));
                }}
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
                disabled
                onChange={(e) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    endTime: e.target.value,
                  }));
                }}
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
                autoComplete="off"
                disabled={!data.hoursFromEmp}
              />
            </Grid>

            <Grid item xs={12} md={2}></Grid>

            <Grid item xs={12} md={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(Payrollmessages.fromdate)}
                  value={data.fromDate}
                  className={classes.field}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      fromDate: date,
                    }));
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`fromDate`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`fromDate`]: false,
                      }));
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(Payrollmessages.todate)}
                  value={data.toDate}
                  className={classes.field}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      toDate: date,
                    }));
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`toDate`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`toDate`]: false,
                      }));
                    }
                  }}
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
                            disabled={
                              !companyInfo?.isHideWeekend || user.isHR
                                ? false
                                : true
                            }
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
                            disabled={
                              !companyInfo?.isHideWeekend || user.isHR
                                ? false
                                : true
                            }
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
                            disabled={
                              !companyInfo?.isHideWeekend || user.isHR
                                ? false
                                : true
                            }
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
                            disabled={
                              !companyInfo?.isHideWeekend || user.isHR
                                ? false
                                : true
                            }
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
                            disabled={
                              !companyInfo?.isHideWeekend || user.isHR
                                ? false
                                : true
                            }
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
                            disabled={
                              !companyInfo?.isHideWeekend || user.isHR
                                ? false
                                : true
                            }
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
                            disabled={
                              !companyInfo?.isHideWeekend || user.isHR
                                ? false
                                : true
                            }
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
