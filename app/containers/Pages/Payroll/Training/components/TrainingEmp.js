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

const TrainingEmp = (props) => {
  const { handleClose, open, employeeId, employeeName, courseId, intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [trainingList, setTrainingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [training, setTraining] = useState({
    id: 0,
    arName: "",
    courseId: 0,
    courseName: "",
    fromDate: null,
    toDate: null,
    locationId: 0,
    locationName: "",
    trainerName: "",
  });

  const onFormSubmit = async (evt) => {
    debugger;
    evt.preventDefault();

    setIsLoading(true);

    try {
      const params = {
        trainingId: training.id,
        employeeId: employeeId,
      };
      let response = await TrainingApis(locale).AddEmployeeToTraining(params);
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
  const fetchNeededData = async () => {
    debugger;
    if (open) {
      setIsLoading(true);
      try {
        const training = await TrainingRequestApis(
          locale
        ).getTrainingByCourseId(courseId??0);
        debugger;
        setTrainingList(training);
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
              <Grid item xs={12} md={3}>
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

              <Grid item xs={12} md={3}>
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

              <Grid item xs={12} md={3}>
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
              <Grid item xs={12} md={3}>
                <TextField
                  name="courseName"
                  value={training.courseName}
                  label={intl.formatMessage(messages.courseName)}
                  fullWidth
                  disabled={true}
                  variant="outlined"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={3}>
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
              <Grid item xs={12} md={3}>
                <TextField
                  name="trainerName"
                  value={training.trainerName}
                  label={intl.formatMessage(messages.location)}
                  fullWidth
                  disabled={true}
                  variant="outlined"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={3}>
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
