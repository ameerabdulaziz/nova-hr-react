import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import notif from "enl-api/ui/notifMessage";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import TrainingApis from "../api/TrTrainingTrxListData";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import { formateDate } from "../../helpers";
import payrollMessages from "../../messages";
import api from "../api/EmployeeAttendanceData";
import AttendanceList from "../components/EmployeeAttendance/AttendanceList";
import messages from "../messages";

function EmployeeAttendance(props) {
  const { intl } = props;

  const pageTitle = localStorage.getItem("MenuName");

  const locale = useSelector((state) => state.language.locale);

  const [trainingList, setTrainingList] = useState([]);

  const [attendanceInfo, setAttendanceInfo] = useState([]);

  const [dateError, setDateError] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    trainingId: null,
    attendanceDate: null,
  });
  const [training, setTraining] = useState({
    id: 0,
    arName: "",
    courseId: 0,
    courseName: "",
    fromDate: null,
    toDate: null,
    locationId: 0,
    locationName: "",
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const training = await TrainingApis(locale).getTrainingByTrainerId();
      setTrainingList(training);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    setIsLoading(true);

    const submitter = evt.nativeEvent.submitter.name;

    try {
      if (submitter === "save") {
        const mappedAttendance = attendanceInfo.map((item) => ({
          ...item,
          trainingDate: formateDate(item.trainingDate),
        }));

        await api(locale).save(mappedAttendance);
        toast.success(notif.saved);
      } else if (submitter === "get") {
        setAttendanceInfo([]);
        const params = {
          ...formInfo,
          attendanceDate: formateDate(formInfo.attendanceDate),
        };
        const attendance = await api(locale).getAttendance(params);
        if (attendance && attendance.length > 0) {
          setAttendanceInfo(attendance);
        } else {
          toast.error(intl.formatMessage(messages.noAttendanceFound));
        }
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
    
    let selectedTraining = trainingList.find((item) => item.id === value.id);
    setTraining(selectedTraining);
  };

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const getAutoCompleteValue = (list, key) =>
    list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" desc="" title={pageTitle}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5} lg={3}>
              <Autocomplete
                options={trainingList}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.arName : "")}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.arName}
                  </li>
                )}
                onChange={(_, value) =>
                  onAutoCompleteChange(value, "trainingId")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.trainingName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={3.5} lg={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.attendanceDate)}
                  value={
                    formInfo.attendanceDate
                      ? dayjs(formInfo.attendanceDate)
                      : null
                  }
                  sx={{ width: "100%" }}
                  onChange={(date) =>
                    onDatePickerChange(date, "attendanceDate")
                  }
                  onError={(error) => {
                    setDateError((prevState) => ({
                      ...prevState,
                      attendanceDate: error !== null,
                    }));
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} ></Grid>
            <Grid item xs={12} md={4} lg={3}>
              <TextField
                name="arName"
                value={training.courseName}
                label={intl.formatMessage(messages.courseName)}
                fullWidth
                disabled={true}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <TextField
                name="locationName"
                value={training.locationName}
                label={intl.formatMessage(messages.location)}
                fullWidth
                disabled={true}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} md={3} lg={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(payrollMessages.fromdate)}
                  value={training.fromDate ? dayjs(training.fromDate) : null}
                  sx={{ width: "100%" }}
                  disabled={true}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6} md={3} lg={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(payrollMessages.todate)}
                  value={training.toDate ? dayjs(training.toDate) : null}
                  disabled={true}
                  sx={{ width: "100%" }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              {attendanceInfo.length > 0 && (
                <AttendanceList
                  setAttendanceInfo={setAttendanceInfo}
                  attendanceInfo={attendanceInfo}
                />
              )}
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                name="get"
              >
                {intl.formatMessage(messages.getAttendance)}
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                name="save"
                type="submit"
              >
                {intl.formatMessage(payrollMessages.save)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoaderInForms>
  );
}

EmployeeAttendance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeAttendance);
