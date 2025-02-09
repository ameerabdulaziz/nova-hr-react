import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { format } from "date-fns";
import notif from "enl-api/ui/notifMessage";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import PayRollLoaderInForms from "../../../Component/PayRollLoaderInForms";
import SaveButton from "../../../Component/SaveButton";
import useStyles from "../../../Style";
import GeneralListApis from "../../../api/GeneralListApis";
import payrollMessages from "../../../messages";
import api from "../../api/OvertimeHoursRequestData";
import messages from "../../messages";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Payrollmessages from "../../../messages";
import SITEMAP from "../../../../../App/routes/sitemap";

function OvertimeHoursRequestCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;

  const title = localStorage.getItem("MenuName");

  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formInfo, setFormInfo] = useState({
    id,

    employeeId: "",
    trxDate: new Date(),
    startTime: "",
    endTime: "",
    minutesCount: "",
    notes: "",
  });

  const [DateError, setDateError] = useState({});

  const formateDate = (date) =>
    date ? format(new Date(date), "yyyy-MM-dd") : null;

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }
    debugger;
    var Tdate = new Date(formInfo.trxDate);
    var day = Tdate.getDate();
    var year = Tdate.getFullYear();
    var month = Tdate.getMonth();
    var toDate = new Date(
      year,
      month,
      day,
      formInfo.endTime.split(":")[0],
      formInfo.endTime.split(":")[1]
    );
    var fromDate = new Date(
      year,
      month,
      day,
      formInfo.startTime.split(":")[0],
      formInfo.startTime.split(":")[1]
    );
    if (toDate < fromDate)
      toDate = new Date(
        year,
        month,
        day + 1,
        formInfo.endTime.split(":")[0],
        formInfo.endTime.split(":")[1]
      );
    const formData = {
      id,
      employeeId: formInfo.employeeId,
      trxDate: formateDate(formInfo.trxDate),
      startTime: format(fromDate, "yyyy-MM-dd HH:mm:ss"),
      endTime: format(toDate, "yyyy-MM-dd HH:mm:ss"),
      minutesCount: formInfo.minutesCount,
      notes: formInfo.notes,
    };

    setIsLoading(true);

    try {
      await api(locale).save(formData);
      toast.success(notif.saved);
      history.push(SITEMAP.attendance.OvertimeHoursRequest.route);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);
        setFormInfo({
          ...dataApi,
          startTime: format(new Date(dataApi.startTime), "hh:mm:ss"),
          endTime: format(new Date(dataApi.endTime), "hh:mm:ss"),
        });
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const calculateMinutesDiff = (firstTime, secondTime) => {
    if (firstTime && secondTime) {
      debugger;
      var Tdate = new Date(formInfo.trxDate);
      var day = Tdate.getDate();
      var year = Tdate.getFullYear();
      var month = Tdate.getMonth();
      var toDate = new Date(
        year,
        month,
        day,
        firstTime.split(":")[0],
        firstTime.split(":")[1]
      );
      var fromDate = new Date(
        year,
        month,
        day,
        secondTime.split(":")[0],
        secondTime.split(":")[1]
      );
      if (toDate < fromDate)
        toDate = new Date(
          year,
          month,
          day + 1,
          firstTime.split(":")[0],
          firstTime.split(":")[1]
        );
      //setFormInfo((prev) => ({ ...prev, toDate: toDate,fromDate:fromDate }));
      return Math.round((toDate - fromDate) / 60000);
    }

    return 0;
  };

  const onTimePickerChange = (evt) => {
    debugger;
    if (evt.target.name === "startTime") {
      if (formInfo.endTime) {
        setFormInfo((prev) => ({
          ...prev,
          [evt.target.name]: evt.target.value,
          minutesCount: calculateMinutesDiff(
            formInfo.endTime,
            evt.target.value
          ),
        }));
      } else {
        setFormInfo((prev) => ({
          ...prev,
          [evt.target.name]: evt.target.value,
        }));
      }
    } else if (evt.target.name === "endTime") {
      if (formInfo.startTime) {
        setFormInfo((prev) => ({
          ...prev,
          [evt.target.name]: evt.target.value,
          minutesCount: calculateMinutesDiff(
            evt.target.value,
            formInfo.startTime
          ),
        }));
      } else {
        setFormInfo((prev) => ({
          ...prev,
          [evt.target.name]: evt.target.value,
        }));
      }
    }
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onCancelBtnClick = () => {
    history.push(SITEMAP.attendance.OvertimeHoursRequest.route);
  };

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" desc="" title={title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction="row">
            <Grid item xs={12} md={6} lg={4.5} xl={3}>
              <Autocomplete
                options={employeeList}
                value={
                  employeeList.find(
                    (item) => item.id === formInfo.employeeId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : "")}
                onChange={(_, value) =>
                  onAutoCompleteChange(value, "employeeId")
                }
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.employeeName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={3} lg={2.3} xl={1.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(payrollMessages.date)}
                  value={formInfo.trxDate ? dayjs(formInfo.trxDate) : null}
                  className={classes.field}
                  onChange={(date) => {
                    onDatePickerChange(date, "trxDate");
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`trxDate`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`trxDate`]: false,
                      }));
                    }
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid container spacing={3} mt={0} direction="row">
            <Grid item xs={6} md={3} lg={2.2} xl={1.5}>
              <TextField
                value={formInfo.startTime}
                label={intl.formatMessage(messages.startTime)}
                type="time"
                name="startTime"
                onChange={onTimePickerChange}
                className={classes.field}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={6} md={3} lg={2.2} xl={1.5}>
              <TextField
                value={formInfo.endTime}
                label={intl.formatMessage(messages.endTime)}
                type="time"
                name="endTime"
                onChange={onTimePickerChange}
                className={classes.field}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={6} md={3} lg={2.2} xl={1.5}>
              <TextField
                value={formInfo.minutesCount}
                label={intl.formatMessage(messages.minutesCount)}
                name="minutesCount"
                disabled
                className={classes.field}
                autoComplete="off"
              />
            </Grid>



            <Grid item xs={12} lg={5} xl={6}>
              <TextField
                name="notes"
                value={formInfo.notes}
                onChange={onInputChange}
                label={intl.formatMessage(payrollMessages.notes)}
                className={classes.field}
                variant="outlined"

                rows={1}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item >
                  <SaveButton Id={id} processing={isLoading} />
                </Grid>

                <Grid item >
                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={onCancelBtnClick}
                  >
                    <FormattedMessage {...payrollMessages.cancel} />
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

OvertimeHoursRequestCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OvertimeHoursRequestCreate);
