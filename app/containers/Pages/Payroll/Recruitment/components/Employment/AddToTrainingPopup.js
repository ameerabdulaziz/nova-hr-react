import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import payrollMessages from "../../../messages";
import PayRollLoader from "../../../Component/PayRollLoader";
import messages from "../../messages";
import trainindMessages from "../../../Training/messages";
import TrainingRequestApis from "../../../Training/api/TrainingRequestListData";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { injectIntl, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import style from "../../../../../../styles/styles.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import dayjs from "dayjs";

const AddToTrainingPopup = (props) => {
  const {
    handleClose,
    open,
    training,
    setTraining,
    submitFun,
    intl,
  } = props;
  const locale = useSelector((state) => state.language.locale);
  const [trainingList, setTrainingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateError, setDateError] = useState({});


  const onAutoCompleteChange = (value, name) => {
    let selectedTraining = trainingList.find((item) => item.id === value?.id);

    if(selectedTraining)
    {
        setTraining((prev)=>({
            ...prev,
            ...selectedTraining
        }));
    }
    else
    {
        setTraining({
            id: 0,
            arName: "",
            enName: "",
            courseName: "",
            fromDate: null,
            toDate: null,
            locationId: 0,
            locationName: "",
            trainerId: 0,
            trainerName: "",
            hiringDate: null
          });
    }
    
  };
  const onChange = (value, name) => {
    setTraining((prev) => ({ ...prev, [name]: value }));
  };

  const fetchNeededData = async () => {

      setTraining({
        id: 0,
        arName: "",
        enName: "",
        courseName: "",
        fromDate: null,
        toDate: null,
        locationId: 0,
        locationName: "",
        trainerId: 0,
        trainerName: "",
        hiringDate: null
      });
      setIsLoading(true);
      try {

        const trainingList = await TrainingRequestApis(
          locale
        ).getTrainingByCourseId(0);
        setTrainingList(trainingList);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    if(open)
    {
        fetchNeededData();
    }
  }, [open]);

  return (
    <PayRollLoader isLoading={isLoading}>
      <Dialog
        open={open}
        PaperProps={{
          overflowy: "clip !important",
        }}
        sx={{
            maxWidth:"60%",
            margin:"0 auto"
        }}
        onClose={handleClose}
      >
        <form onSubmit={submitFun}>
          <DialogTitle>
            <FormattedMessage {...messages.addToTraining} />
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3} alignItems="flex-start" direction="row">
              <Grid item xs={12} md={12}>
                <Grid item xs={12} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label={intl.formatMessage(payrollMessages.hiringDate)}
                            value={training.hiringDate ? dayjs(training.hiringDate) : null}
                            onChange={(date) => onChange(date, "hiringDate")}
                            onError={(error) => {
                            setDateError((prevState) => ({
                                ...prevState,
                                hiringDate: error !== null,
                            }));
                            }}
                            sx={{ width: "100%" }}
                            slotProps={{
                                textField: {
                                    required: true,
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
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
                        label={intl.formatMessage(trainindMessages.trainingName)}
                      />
                    )}
                  />
              </Grid>

              <Grid item xs={12} md={3}>
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
                    disabled
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
                    onChange={(date) => onChange(date, "toDate")}
                    onError={(error) => {
                      setDateError((prevState) => ({
                        ...prevState,
                        toDate: error !== null,
                      }));
                    }}
                    disabled
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
                <TextField
                  name="courseName"
                  value={training.courseName}
                  label={intl.formatMessage(trainindMessages.courseName)}
                  fullWidth
                  disabled={true}
                  variant="outlined"
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="locationName"
                  value={training.locationName}
                  label={intl.formatMessage(trainindMessages.location)}
                  fullWidth
                  disabled={true}
                  variant="outlined"
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="trainerName"
                  value={training.trainerName}
                  label={intl.formatMessage(trainindMessages.trainerName)}
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

export default injectIntl(AddToTrainingPopup);
