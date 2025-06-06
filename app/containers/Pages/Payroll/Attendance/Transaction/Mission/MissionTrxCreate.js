import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/MissionTrxData";
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
import PayRollLoaderInForms from "../../../Component/PayRollLoaderInForms";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import DecryptUrl from "../../../Component/DecryptUrl";
import { calculateTimeDifference } from "../../../helpers";
import SITEMAP from "../../../../../App/routes/sitemap";

function MissionTrxCreate(props) {
  
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { isHR, isManagement, isSuper } = useSelector((state) => state.authReducer.user);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();
  const [data, setdata] = useState({
    id: 0,
    fromDate: format(new Date(), "yyyy-MM-dd"),
    toDate: format(new Date(), "yyyy-MM-dd"),
    employeeId: "",
    missionId: "",
    missionName: "",
    startTime: "",
    endTime: "",
    minutesCount: "",
    exemptEntryRec: false,
    exemptLeaveRec: false,
    missionDestination: "",
    isOverTime: false,
    isMustAttend: false,
    transportationExpenses: "",
    currencyId: "",
    currencyName: "",
    notes: "",
  });
  const [MissionsList, setMissionsList] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const [DateError, setDateError] = useState({});

  // used to reformat date before send it to api
  const dateFormatFun = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };

  const empid = DecryptUrl();

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
        fromDate: empid.shiftDate ?? new Date(),
        toDate: empid.shiftDate ?? new Date(),
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

    if (event.target.name == "transportationExpenses")
      setdata((prevFilters) => ({
        ...prevFilters,
        transportationExpenses: event.target.value,
      }));

    if (event.target.name == "missionDestination")
      setdata((prevFilters) => ({
        ...prevFilters,
        missionDestination: event.target.value,
      }));

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
            60000
        );

        setdata((prevFilters) => ({
          ...prevFilters,
          startTime: event.target.value,
          minutesCount: diff < 0 ? diff * -1 : diff,
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
            60000
        );

        setdata((prevFilters) => ({
          ...prevFilters,
          endTime: event.target.value,
          minutesCount: diff < 0 ? diff * -1 : diff,
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

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    if (data.minutesCount === 0) {
      toast.error(intl.formatMessage(Payrollmessages.numberOfMinutesMustBeGreaterThanZero));
      return;
    }

    try {
      setIsLoading(true);

      const apiData = {
        id: data.id,
        fromDate: dateFormatFun(data.fromDate),
        toDate: dateFormatFun(data.toDate),
        employeeId: data.employeeId,
        missionId: data.missionId,
        missionName: data.missionName,
        startTime: data.startTime,
        endTime: data.endTime,
        minutesCount: data.minutesCount,
        exemptEntryRec: data.exemptEntryRec,
        exemptLeaveRec: data.exemptLeaveRec,
        missionDestination: data.missionDestination,
        isOverTime: data.isOverTime,
        currencyId: data.currencyId,
        isMustAttend: data.isMustAttend,
        transportationExpenses: data.transportationExpenses,
        notes: data.notes,
      };

      let response = await ApiData(locale).Save(apiData);
      // let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.attendance.MissionTrx.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(SITEMAP.attendance.MissionTrx.route);
  }

  async function fetchData() {
    try {
      setIsLoading(true);
      const Missions = await GeneralListApis(locale).GetMissionList(locale);
      setMissionsList(Missions);

      if(!empid)
      {
        const dataApi = await ApiData(locale).Get(id??0);
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

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.MissionTrxCreateTitle)
            : intl.formatMessage(messages.MissioTrxUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(Payrollmessages.fromdate)}
                  value={data.fromDate ? dayjs(data.fromDate) : data.fromDate}
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

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(Payrollmessages.todate)}
                  value={data.toDate ? dayjs(data.toDate) : data.toDate}
                  className={classes.field}
                  minDate={data.fromDate ? dayjs(data.fromDate) : data.fromDate}
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

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
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
              />
            </Grid>
            
            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <TextField
                id="endTime"
                name="endTime"
                required
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

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
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

            <Grid item xs={12} md={12} lg={8} xl={6}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={data.employeeId}
                empid={empid}
              ></EmployeeData>
            </Grid>

            <Grid item xs={12}  md={12} lg={8} xl={4}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={6} >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.isOverTime}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                isOverTime: e.target.checked,
                              }))
                            }
                            value={data.calcLate}
                            color="primary"
                            disabled={ !isHR && !isManagement && !isSuper ? true : false }
                          />
                        }
                        label={intl.formatMessage(messages.isOverTime)}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}  >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.isMustAttend}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                isMustAttend: e.target.checked,
                              }))
                            }
                            value={data.isMustAttend}
                            color="primary"
                            disabled={ !isHR && !isManagement && !isSuper ? true : false }
                          />
                        }
                        label={intl.formatMessage(messages.isMustAttend)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}  >
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
                    <Grid item xs={12} md={6}  >
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
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={12} lg={8} xl={6}>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={12} md={8} xl={6}>
                  <Autocomplete
                    id="missionid"
                    options={MissionsList}
                    value={{ id: data.missionId, name: data.missionName }}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 ||
                      value.id === "" ||
                      option.id === value.id
                    }
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    onChange={(event, value) => {
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        missionId: value !== null ? value.id : 0,
                        missionName: value !== null ? value.name : "",
                        transportationExpenses:
                          value !== null ? value.transportaion : "",
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        name="missionid"
                        required
                        label={intl.formatMessage(messages.missionName)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4} xl={3}>
                  <TextField
                    id="transportationExpenses"
                    name="transportationExpenses"
                    value={data.transportationExpenses}
                    onChange={(e) => handleChange(e)}
                    label={intl.formatMessage(messages.transportationExpenses)}
                    className={classes.field}
                    variant="outlined"
                    disabled={!isHR ? true : false}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} md={4} xl={3}>
                  <TextField
                    id="currencyName"
                    name="currencyName"
                    value={data.currencyName}
                    label={intl.formatMessage(messages.currency)}
                    className={classes.field}
                    variant="outlined"
                    autoComplete="off"
                    disabled={true}
                  />
                </Grid>

                <Grid item xs={12} md={12} xl={9}>
                  <TextField
                    id="missionDestination"
                    name="missionDestination"
                    value={data.missionDestination}
                    onChange={(e) => handleChange(e)}
                    label={intl.formatMessage(messages.missionDestination)}
                    className={classes.field}
                    variant="outlined"
                    multiline
                    rows={2}
                    autoComplete="off"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={12} xl={9}>
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

            <Grid item >
              <SaveButton Id={id} />
            </Grid>

            <Grid item >
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
    </PayRollLoaderInForms>
  );
}
MissionTrxCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(MissionTrxCreate);
