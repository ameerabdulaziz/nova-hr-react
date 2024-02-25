import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/MissionTrxData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
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
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GeneralListApis from "../../../api/GeneralListApis";
import { format } from "date-fns";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import NameList from "../../../Component/NameList";
import AlertPopup from "../../../Component/AlertPopup";
import PayRollLoader from "../../../Component/PayRollLoader";


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function MissionTrxCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");
  const [data, setdata] = useState({
    fromDate: format(new Date(), "yyyy-MM-dd"),
    toDate: format(new Date(), "yyyy-MM-dd"),
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
    notes: "",
    employeesId: [],
    isNotUpdate: false,
  });
  const [dataList, setdataList] = useState([]);
  const [MissionsList, setMissionsList] = useState([]);  
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const [DateError, setDateError] = useState({});


   // used to reformat date before send it to api
   const dateFormatFun = (date) => {
    return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }


  const handleClickOpen = (item) => {

    setOpenParentPopup(true);
    setDeleteItem(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

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
          minutesCount: diff,
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
          minutesCount: diff,
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


const apiData = {
  fromDate: dateFormatFun(data.fromDate),
    toDate: dateFormatFun(data.toDate),
    missionId: data.missionId,
    missionName: data.missionName,
    startTime: data.startTime,
    endTime: data.endTime,
    minutesCount: data.minutesCount,
    exemptEntryRec: data.exemptEntryRec,
    exemptLeaveRec: data.exemptLeaveRec,
    missionDestination: data.missionDestination,
    isOverTime: data.isOverTime,
    isMustAttend: data.isMustAttend,
    transportationExpenses: data.transportationExpenses,
    notes: data.notes,
    employeesId: data.employeesId,
    isNotUpdate: data.isNotUpdate,
}


    try {
      setIsLoading(true);
      var SelectedIds = dataList
        .filter((row) => row.isSelected == true)
        .map((obj) => {
          return obj.id;
        });
        if(SelectedIds.length == 0) 
        {
          toast.error("Select Employees first");
          return ;
        }
        apiData.employeesId = SelectedIds;
      // data.employeesId = SelectedIds;
      let response = await ApiData(locale).SaveAll(apiData);
      // let response = await ApiData(locale).SaveAll(data);

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


    const apiData = {
      fromDate: dateFormatFun(data.fromDate),
        toDate: dateFormatFun(data.toDate),
        missionId: data.missionId,
        missionName: data.missionName,
        startTime: data.startTime,
        endTime: data.endTime,
        minutesCount: data.minutesCount,
        exemptEntryRec: data.exemptEntryRec,
        exemptLeaveRec: data.exemptLeaveRec,
        missionDestination: data.missionDestination,
        isOverTime: data.isOverTime,
        isMustAttend: data.isMustAttend,
        transportationExpenses: data.transportationExpenses,
        notes: data.notes,
        employeesId: data.employeesId,
        isNotUpdate: data.isNotUpdate,
    }


    try {
      setIsLoading(true);

      let response = await ApiData(locale).DeleteAll(apiData);
      // let response = await ApiData(locale).DeleteAll(data);

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
      fromDate: format(new Date(), "yyyy-MM-dd"),
      toDate: format(new Date(), "yyyy-MM-dd"),
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
      notes: "",
      employeesId: [],
      isNotUpdate: false,
    });
  };
  async function fetchData() {
    try {
      const Missions = await GeneralListApis(locale).GetMissionList(locale);
      setMissionsList(Missions);
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

    const apiData = {
      fromDate: dateFormatFun(data.fromDate),
        toDate: dateFormatFun(data.toDate),
        missionId: data.missionId,
        missionName: data.missionName,
        startTime: data.startTime,
        endTime: data.endTime,
        minutesCount: data.minutesCount,
        exemptEntryRec: data.exemptEntryRec,
        exemptLeaveRec: data.exemptLeaveRec,
        missionDestination: data.missionDestination,
        isOverTime: data.isOverTime,
        isMustAttend: data.isMustAttend,
        transportationExpenses: data.transportationExpenses,
        notes: data.notes,
        employeesId: data.employeesId,
        isNotUpdate: data.isNotUpdate,
    }


    try {
      setIsLoading(true);
      if (apiData.missionId && apiData.startTime && apiData.endTime) {
        const result = await ApiData(locale).getMissions(apiData);
      // if (data.missionId && data.startTime && data.endTime) {
      //   const result = await ApiData(locale).getMissions(data);

        setdataList(
          result.employees.map((obj) => {
            return {
              ...obj,
              isSelected: true,
            };
          }) || []
        );

        if (result.mission) setdata(result.mission);
        else handleReset();
      } else toast.error("Enter Mission, Start, End Time");
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  return (
    
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={7}>
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
                        label={intl.formatMessage(messages.isNotUpdateMission)}
                      />
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          label={intl.formatMessage(Payrollmessages.fromdate)}
                          // value={data.fromDate}
                          onChange={(date) => {
                            if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                              if (!isNaN(new Date(date))) { 
                                setdata((prevFilters) => ({
                                    ...prevFilters,
                                    fromDate: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                                  }))
                              }
                              else
                              {
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  fromDate: null,
                                }))
                              } 
                            }
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid> */}

                    <Grid item xs={12} md={6}>
                  
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker 
                          label={intl.formatMessage(Payrollmessages.fromdate)}
                          value={data.fromDate ? dayjs(data.fromDate) : data.fromDate}
                          className={classes.field}
                            onChange={(date) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                fromDate: date ,
                              }))
                          }}
                          onError={(error,value)=>{
                            if(error !== null)
                            {
                              setDateError((prevState) => ({
                                ...prevState,
                                  [`fromDate`]: true
                              }))
                            }
                            else
                            {
                              setDateError((prevState) => ({
                                ...prevState,
                                  [`fromDate`]: false
                              }))
                            }
                          }}
                          />
                      </LocalizationProvider>
                  </Grid>


                    {/* <Grid item xs={12} md={6}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          label={intl.formatMessage(Payrollmessages.todate)}
                          // value={data.toDate}
                          onChange={(date) => {
                            if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                              if (!isNaN(new Date(date))) { 
                                setdata((prevFilters) => ({
                                    ...prevFilters,
                                    toDate: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                                  }))
                              }
                              else
                              {
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  toDate: null,
                                }))
                              } 
                            }
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid> */}

              <Grid item xs={12} md={6}>
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                      label={intl.formatMessage(Payrollmessages.todate)}
                      value={data.toDate  ? dayjs(data.toDate) : data.toDate}
                      className={classes.field}
                        onChange={(date) => {
                          setdata((prevFilters) => ({
                            ...prevFilters,
                            toDate: date ,
                          }))
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                            ...prevState,
                              [`toDate`]: true
                          }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                            ...prevState,
                              [`toDate`]: false
                          }))
                        }
                      }}
                      />
                  </LocalizationProvider>
              </Grid>


                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
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
                        autoComplete='off'
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
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
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="transportationExpenses"
                        name="transportationExpenses"
                        value={data.transportationExpenses}
                        onChange={(e) => handleChange(e)}
                        label={intl.formatMessage(
                          messages.transportationExpenses
                        )}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Card className={classes.card}>
                        <CardContent>
                          <Grid
                            container
                            spacing={3}
                            alignItems="flex-start"
                            direction="row"
                          >
                            <Grid item xs={12} md={3}>
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
                                  />
                                }
                                label={intl.formatMessage(messages.isOverTime)}
                              />
                            </Grid>

                            <Grid item xs={12} md={3}>
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
                                  />
                                }
                                label={intl.formatMessage(
                                  messages.isMustAttend
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
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
                                label={intl.formatMessage(
                                  messages.exemptEntryRec
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
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
                                label={intl.formatMessage(
                                  messages.exemptLeaveRec
                                )}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
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
                        rows={1}
                        autoComplete='off'
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        id="missionDestination"
                        name="missionDestination"
                        value={data.missionDestination}
                        onChange={(e) => handleChange(e)}
                        label={intl.formatMessage(messages.missionDestination)}
                        className={classes.field}
                        variant="outlined"
                        multiline
                        rows={1}
                        autoComplete='off'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
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

            <Grid item xs={12} md={2}>
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
            <Grid item xs={12} md={2}>
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
            <Grid item xs={12} md={2}>
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
            <Grid item xs={12} md={2}>
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
        </form>
        <AlertPopup
          handleClose={handleClose}
          open={openParentPopup}
          messageData={`${intl.formatMessage(
            Payrollmessages.deleteMessage
          )}`}
          callFun={handleDelete}
        />
      </PapperBlock>
    </PayRollLoader>
  );
}
MissionTrxCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(MissionTrxCreate);
