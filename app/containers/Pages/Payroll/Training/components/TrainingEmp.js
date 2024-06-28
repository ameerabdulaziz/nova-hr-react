import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import payrollMessages from "../../messages";
import PayRollLoader from "../../Component/PayRollLoader";
import messages from "../messages";
import TrainingApis from "../api/TrTrainingTrxListData";
import TrainingRequestApis from "../api/TrainingRequestListData";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { injectIntl, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import style from "../../../../../styles/styles.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import GeneralListApis from "../../api/GeneralListApis";
import { formateDate } from "../../helpers";

const TrainingEmp = (props) => {
  const {
    handleClose,
    open,
    employeeId,
    employeeName,
    courseId,
    courseName,
    intl,
  } = props;
  const locale = useSelector((state) => state.language.locale);
  const [trainingList, setTrainingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [employeeList, setEmployeeList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [dateError, setDateError] = useState({});
  const [training, setTraining] = useState({
    id: 0,
    arName: "",
    enName: "",
    courseId: 0,
    courseName: "",
    fromDate: null,
    toDate: null,
    locationId: 0,
    locationName: "",
    trainerId: 0,
    trainerName: "",
  });

  const getAutoCompleteValue = (list, key) =>
    list.find((item) => item.id === key) ?? null;

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    try {
      var response;
      if (training.id) {
        const params = {
          trainingId: training.id,
          employeeId: employeeId,
        };
        response = await TrainingApis(locale).AddEmployeeToTraining(params);
      } else {
        if (Object.values(dateError).includes(true)) {
          toast.error(intl.formatMessage(payrollMessages.DateNotValid));
          return;
        }

        let body = {
          ...training,
          employees: [{ id: employeeId, name: employeeName }],
          fromDate: formateDate(training.fromDate),
          toDate: formateDate(training.toDate),
        };
        response = await TrainingApis(locale).save(body);
      }
      if (response.status == 200) {
        toast.success(notif.saved);
        handleClose();
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onAutoCompleteChange = (value, name) => {
    let selectedTraining = trainingList.find((item) => item.id === value.id);
    setTraining(selectedTraining);
  };
  const onChange = (value, name) => {
    debugger;
    setTraining((prev) => ({ ...prev, [name]: value }));
    if (name == "arName") {
      setTraining((prev) => ({ ...prev, id: 0 }));
      setTraining((prev) => ({ ...prev, enName: value }));
    }
  };
  const handleNewTraining = async () => {
    setIsNew(!isNew);
    setTraining({
      id: 0,
      arName: "",
      enName: "",
      courseId: courseId,
      courseName: courseName,
      fromDate: null,
      toDate: null,
      locationId: 0,
      locationName: "",
      trainerId: 0,
      trainerName: "",
    });
  };
  const fetchNeededData = async () => {
    if (open) {
      setIsNew(false);
      setTraining({
        id: 0,
        arName: "",
        enName: "",
        courseId: courseId,
        courseName: courseName,
        fromDate: null,
        toDate: null,
        locationId: 0,
        locationName: "",
        trainerId: 0,
        trainerName: "",
      });
      setIsLoading(true);
      try {
        if (employeeList.length == 0 || locationList.length == 0) {
          const employeesResponse = await GeneralListApis(
            locale
          ).GetEmployeeList();
          setEmployeeList(employeesResponse);

          const locations = await GeneralListApis(
            locale
          ).GetCourseLocationList();
          setLocationList(locations);
        }
        const trainingList = await TrainingRequestApis(
          locale
        ).getTrainingByCourseId(courseId ?? 0);
        setTrainingList(trainingList);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, [open]);
  return (
    <PayRollLoader isLoading={isLoading}>
      <Dialog
        open={open}
        PaperProps={{
          overflowy: "clip !important",
        }}
        maxWidth="md"
        onClose={handleClose}
      >
        <form onSubmit={onFormSubmit}>
          <DialogTitle>
            <FormattedMessage {...messages.addEmptoTraining} />
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3} alignItems="flex-start" direction="row">
              <Grid item xs={12} md={12}></Grid>
              <Grid item xs={12} md={5}>
                {isNew ? (
                  <TextField
                    name="arName"
                    value={training.arName}
                    label={intl.formatMessage(messages.trainingName)}
                    fullWidth
                    required
                    onChange={(e) => onChange(e.target.value, "arName")}
                    variant="outlined"
                    autoComplete="off"
                  />
                ) : (
                  <Autocomplete
                    options={trainingList}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) =>
                      option
                        ? locale == "en"
                          ? option.enName
                          : option.arName
                        : ""
                    }
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {locale == "en" ? option.enName : option.arName}
                      </li>
                    )}
                    onChange={(_, value) =>
                      onAutoCompleteChange(value, "training")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label={intl.formatMessage(messages.trainingName)}
                      />
                    )}
                  />
                )}
              </Grid>

              <Grid item xs={12} md={2.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={intl.formatMessage(payrollMessages.fromdate)}
                    value={training.fromDate ? dayjs(training.fromDate) : null}
                    onChange={(date) => onChange(date, "fromDate")}
                    onError={(error) => {
                      setDateError((prevState) => ({
                        ...prevState,
                        fromDate: error !== null,
                      }));
                    }}
                    sx={{ width: "100%" }}
                    disabled={!isNew}
                    slotProps={{
                      textField: {
                        required: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={2.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={intl.formatMessage(payrollMessages.todate)}
                    value={training.toDate ? dayjs(training.toDate) : null}
                    onChange={(date) => onChange(date, "toDate")}
                    onError={(error) => {
                      setDateError((prevState) => ({
                        ...prevState,
                        toDate: error !== null,
                      }));
                    }}
                    disabled={!isNew}
                    sx={{ width: "100%" }}
                    slotProps={{
                      textField: {
                        required: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={5}>
                <TextField
                  name="courseName"
                  value={courseName}
                  label={intl.formatMessage(messages.courseName)}
                  fullWidth
                  disabled={true}
                  variant="outlined"
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} md={5}>
                <TextField
                  name="employeeName"
                  value={employeeName}
                  label={intl.formatMessage(messages.employeeName)}
                  fullWidth
                  disabled={true}
                  variant="outlined"
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} md={5}>
                <Autocomplete
                  options={employeeList}
                  value={getAutoCompleteValue(employeeList, training.trainerId)}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : "")}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) =>
                    setTraining((prev) => ({
                      ...prev,
                      trainerId: value !== null ? value.id : null,
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={intl.formatMessage(messages.trainerName)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={5}>
                <Autocomplete
                  options={locationList}
                  value={getAutoCompleteValue(
                    locationList,
                    training.locationId
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : "")}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) =>
                    setTraining((prev) => ({
                      ...prev,
                      locationId: value !== null ? value.id : null,
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label={intl.formatMessage(messages.location)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleNewTraining()}
                >
                  {isNew
                    ? intl.formatMessage(payrollMessages.cancel)
                    : intl.formatMessage(messages.creatTraining)}
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button className={style.deleteAlertBtnSty} onClick={handleClose}>
              <FormattedMessage {...payrollMessages.cancel} />
            </Button>
            <Button className={style.deleteAlertBtnSty} type="submit">
              <FormattedMessage {...payrollMessages.save} />
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </PayRollLoader>
  );
};

export default injectIntl(TrainingEmp);
