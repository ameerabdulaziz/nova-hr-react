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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import NameList from "../../../Component/NameList";
import { Backdrop, CircularProgress, Box } from "@mui/material";
import AlertPopup from "../../../Component/AlertPopup";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function PermissionTrxCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");

  // used to reformat date before send it to api
  const dateFormatFun = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };

  const [data, setdata] = useState({
    date: dateFormatFun(new Date()),
    // date: format(new Date(), "yyyy-MM-dd"),
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
    employeesId: [],
    isNotUpdate: false,
  });
  const [dataList, setdataList] = useState([]);
  const [PermissionsList, setPermissionsList] = useState([]);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [DateError, setDateError] = useState({});

  const handleClickOpen = (item) => {
    setOpenParentPopup(true);
    setDeleteItem(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  const calculateMinutesCount = (
    endTime,
    startTime,
    targetname,
    targetvalue
  ) => {
    debugger;
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
      setIsLoading(true);
      var SelectedIds = dataList
        .filter((row) => row.isSelected == true)
        .map((obj) => {
          return obj.id;
        });
      data.employeesId = SelectedIds;
      let response = await ApiData(locale).SaveAll(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        handleReset();
      } else toast.error(response.statusText);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (e) => {
    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);
      let response = await ApiData(locale).DeleteAll(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        handleReset();
      } else toast.error(response.statusText);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleReset = async (e) => {
    setdataList([]);
    setdata({
      id: 0,
      date: format(new Date(), "yyyy-MM-dd"),
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
      isNotUpdate: false,
    });
  };
  async function fetchData() {
    try {
      const Permissions = await GeneralListApis(locale).GetPermissionList(
        locale
      );
      setPermissionsList(Permissions);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function getData() {
    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    try {
      if (data.permissionId && data.startTime && data.endTime) {
        setIsLoading(true);
        const result = await ApiData(locale).getPermissions(data);

        setdataList(
          result.employees.map((obj) => {
            return {
              ...obj,
              isSelected: true,
            };
          }) || []
        );

        if (result.permission) setdata(result.permission);
        else handleReset();
      } else toast.error("Enter Permission, Start, End Time");
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box
      sx={{
        zIndex: 100,
        position: "relative",
      }}
    >
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Backdrop
          sx={{
            color: "primary.main",
            zIndex: 10,
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.69)",
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">

            <Grid item xs={12} md={12} xl={6}>
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
                            checked={data.isNotUpdate}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                isNotUpdate: e.target.checked,
                              }));
                            }}
                            value={data.isNotUpdate}
                            color="primary"
                            /* labelStyle={{color:"red !important"}} */
                          />
                        }
                        label={intl.formatMessage(messages.isNotUpdate)}
                      />
                    </Grid>

                    <Grid item xs={6} md={3} lg={2} xl={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label={intl.formatMessage(Payrollmessages.date)}
                          value={data.date ? dayjs(data.date) : data.date}
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
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={5} lg={3.5} xl={6}>
                      <Autocomplete
                        id="permissionid"
                        options={PermissionsList}
                        value={{
                          id: data.permissionId,
                          name: data.permissionName,
                        }}
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
                            permissionId: value !== null ? value.id : 0,
                            permissionName: value !== null ? value.name : "",
                            maxRepeated:
                              value !== null ? value.maxRepeated : "",
                            maxMinuteNo:
                              value !== null ? value.maxMinuteNo : "",
                            minMinuteNo:
                              value !== null ? value.minMinuteNo : "",
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

                    <Grid item xs={12} md={8}>
                      <Card className={classes.card}>
                        <CardContent>
                          <Grid
                            container
                            spacing={7}
                            alignItems="flex-start"
                            direction="row"
                          >
                            <Grid item xs={12} md={6} lg={6} xl={8}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={data.calcLate}
                                    onChange={(e) =>
                                      setdata((prevFilters) => ({
                                        ...prevFilters,
                                        calcLate: e.target.checked,
                                        calcMinus: !e.target.checked,
                                        dedRased: !e.target.checked,
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
                            <Grid item xs={12} md={6} lg={4} xl={4}>
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
                            <Grid item xs={12} md={6} lg={6} xl={8}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={data.calcMinus}
                                    onChange={(e) =>
                                      setdata((prevFilters) => ({
                                        ...prevFilters,
                                        calcMinus: e.target.checked,
                                        calcLate: !e.target.checked,
                                        dedRased: !e.target.checked,
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
                            <Grid item xs={12} md={6} lg={4} xl={4}>
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
                            <Grid item xs={12} md={6} lg={6} xl={8}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={data.dedRased}
                                    onChange={(e) =>
                                      setdata((prevFilters) => ({
                                        ...prevFilters,
                                        dedRased: e.target.checked,
                                        calcMinus: !e.target.checked,
                                        calcLate: !e.target.checked,
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
                            <Grid item xs={12} md={6} lg={4} xl={4}>
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

                    <Grid item xs={12} md={4}>
                      <Grid
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row"
                      >
                        <Grid item xs={12} md={12} lg={6} xl={9} >
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
                        <Grid item xs={12} md={12} lg={6} xl={9}>
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
                          />
                        </Grid>
                        <Grid item xs={12} md={12} lg={6} xl={9}>
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
                        <Grid item xs={12} md={12} lg={12} xl={9}>
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
                        <Grid item xs={12} md={12} lg={12} xl={9}>
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
                        autoComplete="off"
                        required
                      />
                    </Grid>

                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={12} xl={6} >
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <NameList
                      dataList={dataList}
                      setdataList={setdataList}
                      Key={"Employee"}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
            <Grid item >
              <Button
                variant="contained"
                size="medium"
                style={{ width: 100 }}
                color="primary"
                onClick={handleReset}
              >
                <FormattedMessage {...Payrollmessages.add} />
              </Button>
            </Grid>
            <Grid item >
              <Button
                variant="contained"
                size="medium"
                style={{ width: 100 }}
                color="primary"
                onClick={getData}
              >
                <FormattedMessage {...Payrollmessages.preview} />
              </Button>
            </Grid>
            <Grid item >
              <Button
                variant="contained"
                type="submit"
                size="medium"
                style={{ width: 100 }}
                color="secondary"
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>
            <Grid item >
              <Button
                variant="contained"
                size="medium"
                style={{ width: 100 }}
                color="primary"
                onClick={handleClickOpen}
              >
                <FormattedMessage {...Payrollmessages.delete} />
              </Button>
            </Grid>                
              </Grid>
            </Grid>


          </Grid>
        </form>
        <AlertPopup
          handleClose={handleClose}
          open={openParentPopup}
          messageData={`${intl.formatMessage(Payrollmessages.deleteMessage)}`}
          callFun={handleDelete}
        />
      </PapperBlock>
    </Box>
  );
}
PermissionTrxCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(PermissionTrxCreate);
