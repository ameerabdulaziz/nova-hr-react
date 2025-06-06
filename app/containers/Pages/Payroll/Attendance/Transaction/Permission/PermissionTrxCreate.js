import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/PermissionTrxData";
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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import EmployeeData from "../../../Component/EmployeeData";
import SaveButton from "../../../Component/SaveButton";
import PayRollLoader from "../../../Component/PayRollLoader";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import DecryptUrl from "../../../Component/DecryptUrl";
import SITEMAP from "../../../../../App/routes/sitemap";

function PermissionTrxCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();
  const [data, setdata] = useState({
    id: 0,
    date: format(new Date(), "yyyy-MM-dd"),
    employeeId: "",
    permissionId: "",
    permissionName: "",
    startTime: "",
    endTime: "",
    minutesCount: "",
    exemptEntryRec: false,
    exemptLeaveRec: false,
    calcLate: false,
    calcMinus: false,
    plateMin: "",
    pminusMin: "",
    dedRased: false,
    prasedMin: "",
    notes: "",
    maxRepeated: "",
    maxMinuteNo: "",
    minMinuteNo: "",
    maxMinutesCountGreaterThan: false,
    maxMinutesCountDiff: false,
    minMinutesCountDiff: false,
  });

  const empid = DecryptUrl();

  const [PermissionsList, setPermissionsList] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const [DateError, setDateError] = useState({});

  // used to reformat date before send it to api
  const dateFormatFun = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };

  // used in if user click on Calculate Attendance table sortcut to navigate to here with row data
  useEffect(() => {
    if (empid) {
      let startTime, endTime, total;
      let shiftDate = format(new Date(empid.shiftDate), "yyyy-MM-dd");
      if (empid.timeIn && empid.timeOut) {
        startTime = new Date(
          new Date(empid.timeIn) !== "Invalid Date" &&
          !isNaN(new Date(empid.timeIn))
            ? empid.timeIn
            : shiftDate + " " + empid.timeIn
        ).getTime();
        endTime = new Date(
          new Date(empid.timeOut) !== "Invalid Date" &&
          !isNaN(new Date(empid.timeOut))
            ? empid.timeOut
            : shiftDate + " " + empid.timeOut
        ).getTime();
        total = Math.abs(Math.round((startTime - endTime) / 1000 / 60));
      }

      setdata((prev) => ({
        ...prev,
        employeeId: empid.id,
        date: empid.shiftDate ?? new Date(),
        startTime: empid.timeIn
          ? format(
              new Date(
                new Date(empid.timeIn) !== "Invalid Date" &&
                !isNaN(new Date(empid.timeIn))
                  ? empid.timeIn
                  : shiftDate + " " + empid.timeIn
              ),
              "HH:mm"
            )
          : "",
        endTime: empid.timeOut
          ? format(
              new Date(
                new Date(empid.timeOut) !== "Invalid Date" &&
                !isNaN(new Date(empid.timeOut))
                  ? empid.timeOut
                  : shiftDate + " " + empid.timeOut
              ),
              "HH:mm"
            )
          : "",
        minutesCount: empid.timeIn && empid.timeOut ? total : "",
      }));
    }
  }, []);

  const handleEmpChange = useCallback((id, name) => {
    if (name == "employeeId")
      setdata((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
      }));
  }, []);

  const handleChange = (event) => {
    if (event.target.name == "notes")
      setdata((prevFilters) => ({
        ...prevFilters,
        notes: event.target.value,
      }));

    if (event.target.name == "plateMin")
      setdata((prevFilters) => ({
        ...prevFilters,
        plateMin: event.target.value,
      }));

    if (event.target.name == "pminusMin")
      setdata((prevFilters) => ({
        ...prevFilters,
        pminusMin: event.target.value,
      }));

    if (event.target.name == "prasedMin")
      setdata((prevFilters) => ({
        ...prevFilters,
        prasedMin: event.target.value,
      }));

    if (event.target.name == "startTime") {
      if (data.endTime != "") {
        calculateMinutesCount(
          data.endTime,
          event.target.value,
          "startTime",
          event.target.value
        );
      } else
        setdata((prevFilters) => ({
          ...prevFilters,
          startTime: event.target.value,
        }));
    }

    if (event.target.name == "endTime") {
      if (data.startTime != "") {
        calculateMinutesCount(
          event.target.value,
          data.startTime,
          "endTime",
          event.target.value
        );
      } else
        setdata((prevFilters) => ({
          ...prevFilters,
          endTime: event.target.value,
        }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    try {
      const apiData = {
        id: data.id,
        date: dateFormatFun(data.date),
        employeeId: data.employeeId,
        permissionId: data.permissionId,
        permissionName: data.permissionName,
        startTime: data.startTime,
        endTime: data.endTime,
        minutesCount: data.minutesCount,
        exemptEntryRec: data.exemptEntryRec,
        exemptLeaveRec: data.exemptLeaveRec,
        calcLate: data.calcLate,
        calcMinus: data.calcMinus,
        plateMin: data.plateMin,
        pminusMin: data.pminusMin,
        dedRased: data.dedRased,
        prasedMin: data.prasedMin,
        notes: data.notes,
        maxRepeated: data.maxRepeated,
        maxMinuteNo: data.maxMinuteNo,
        minMinuteNo: data.minMinuteNo,
      };

      setIsLoading(true);
      let response = await ApiData(locale).Save(apiData);
      // let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.attendance.PermissionTrx.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(SITEMAP.attendance.PermissionTrx.route);
  }
  async function fetchData() {
    try {
      const Permissions = await GeneralListApis(locale).GetPermissionList(
        locale
      );
      setPermissionsList(Permissions);

      if (id) {
        const dataApi = await ApiData(locale).Get(id ?? 0);
        setdata(dataApi);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const calculateMinutesCount = (
    endTime,
    startTime,
    targetname,
    targetvalue
  ) => {
    var diff = Math.round(
      (new Date(0, 0, 0, endTime.split(":")[0], endTime.split(":")[1]) -
        new Date(0, 0, 0, startTime.split(":")[0], startTime.split(":")[1])) /
        60000
    );
    if (diff > 0) {
      if (diff > data.maxMinuteNo && data.maxMinuteNo !== null) {
        toast.error(
          intl.formatMessage(messages.maxMinutesCountIs) + data.maxMinuteNo
        );
        setdata((prevFilters) => ({
          ...prevFilters,
          [targetname]: "",
          minutesCount: "",
        }));
        return;
      }

      if (diff < data.minMinuteNo && data.minMinuteNo !== null) {
        toast.error(
          intl.formatMessage(messages.minMinutesCountIs) + data.minMinuteNo
        );
        setdata((prevFilters) => ({
          ...prevFilters,
          [targetname]: "",
          minutesCount: "",
        }));
        return;
      }
      setdata((prevFilters) => ({
        ...prevFilters,
        [targetname]: targetvalue,
        minutesCount: diff,
      }));
    } else {
      toast.error(
        intl.formatMessage(messages.maxMinutesCountMustToBeGreaterThan)
      );
      setdata((prevFilters) => ({
        ...prevFilters,
        [targetname]: "",
        minutesCount: "",
      }));
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.PermissionTrxCreateTitle)
            : intl.formatMessage(messages.PermissionTrxUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(Payrollmessages.date)}
                  value={data.date ? dayjs(data.date) : null}
                  className={classes.field}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      date: date,
                    }));
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`date`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`date`]: false,
                      }));
                    }
                  }}
                  disabled={empid ? true : false}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={5} lg={3.5} xl={2.5}>
              <Autocomplete
                id="permissionid"
                options={PermissionsList}
                value={{ id: data.permissionId, name: data.permissionName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    permissionId: value !== null ? value.id : 0,
                    permissionName: value !== null ? value.name : "",
                    maxRepeated: value !== null ? value.maxRepeated : "",
                    maxMinuteNo: value !== null ? value.maxMinuteNo : "",
                    minMinuteNo: value !== null ? value.minMinuteNo : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="permissionid"
                    required
                    label={intl.formatMessage(messages.permissionName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} ms={4} lg={4} xl={7}></Grid>

            <Grid item xs={12} md={12} lg={10} xl={6}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={data.employeeId}
                empid={empid}
              ></EmployeeData>
            </Grid>

            <Grid item xs={12} lg={10} xl={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={6} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.calcLate}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                calcLate: e.target.checked,
                                pminusMin: "",
                                prasedMin: "",
                              }))
                            }
                            value={data.calcLate}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.calcLate)}
                      />
                    </Grid>
                    <Grid item xs={6} md={6} lg={2}>
                      <TextField
                        id="plateMin"
                        name="plateMin"
                        value={data.plateMin}
                        onChange={(e) => handleChange(e)}
                        label={""}
                        className={classes.field}
                        variant="outlined"
                        disabled={!data.calcLate}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.calcMinus}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                calcMinus: e.target.checked,
                                plateMin: "",
                                prasedMin: "",
                              }))
                            }
                            value={data.calcMinus}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.calcMinus)}
                      />
                    </Grid>
                    <Grid item xs={6} md={6} lg={2}>
                      <TextField
                        id="pminusMin"
                        name="pminusMin"
                        value={data.pminusMin}
                        onChange={(e) => handleChange(e)}
                        label={""}
                        className={classes.field}
                        variant="outlined"
                        disabled={!data.calcMinus}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.dedRased}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                dedRased: e.target.checked,
                                plateMin: "",
                                pminusMin: "",
                              }))
                            }
                            value={data.dedRased}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.dedRased)}
                      />
                    </Grid>
                    <Grid item xs={6} md={6} lg={2}>
                      <TextField
                        id="prasedMin"
                        name="prasedMin"
                        value={data.prasedMin}
                        onChange={(e) => handleChange(e)}
                        label={""}
                        className={classes.field}
                        variant="outlined"
                        disabled={!data.dedRased}
                        autoComplete="off"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={10} xl={6}>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={6} md={3} lg={2.5} xl={3}>
                  <TextField
                    id="startTime"
                    name="startTime"
                    value={data.startTime}
                    label={intl.formatMessage(messages.startTime)}
                    type="time"
                    required
                    onChange={(e) => handleChange(e)}
                    className={classes.field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onClick={(e) =>
                      e.target.showPicker && e.target.showPicker()
                    }  
                  />
                </Grid>

                <Grid item xs={6} md={3} lg={2.5} xl={3}>
                  <TextField
                    id="endTime"
                    name="endTime"
                    value={data.endTime}
                    label={intl.formatMessage(messages.endTime)}
                    type="time"
                    required
                    onChange={(e) => handleChange(e)}
                    className={classes.field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onClick={(e) =>
                      e.target.showPicker && e.target.showPicker()
                    }
                  />
                </Grid>

                <Grid item xs={6} md={3} lg={2.5} xl={3}>
                  <TextField
                    id="minutesCount"
                    name="minutesCount"
                    value={data.minutesCount}
                    onChange={(e) => handleChange(e)}
                    label={intl.formatMessage(messages.minutesCount)}
                    required
                    className={classes.field}
                    variant="outlined"
                    disabled
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6} md={5} >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={data.exemptEntryRec}
                        onChange={(e) =>
                          setdata((prevFilters) => ({
                            ...prevFilters,
                            exemptEntryRec: e.target.checked,
                          }))
                        }
                        value={data.exemptEntryRec}
                        color="primary"
                      />
                    }
                    label={intl.formatMessage(messages.exemptEntryRec)}
                  />
                </Grid>

                <Grid item xs={6} md={4} >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={data.exemptLeaveRec}
                        onChange={(e) =>
                          setdata((prevFilters) => ({
                            ...prevFilters,
                            exemptLeaveRec: e.target.checked,
                          }))
                        }
                        value={data.exemptLeaveRec}
                        color="primary"
                      />
                    }
                    label={intl.formatMessage(messages.exemptLeaveRec)}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    id="notes"
                    name="notes"
                    value={data.notes}
                    onChange={(e) => handleChange(e)}
                    label={intl.formatMessage(Payrollmessages.notes)}
                    className={classes.field}
                    variant="outlined"
                    multiline
                    rows={2}
                    autoComplete="off"
                    required
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item>
                  <SaveButton Id={id} />
                </Grid>
                <Grid item>
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
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}
PermissionTrxCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(PermissionTrxCreate);
