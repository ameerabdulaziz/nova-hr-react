import React , {  useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Payrollmessages from "../messages";
import { FormattedMessage } from "react-intl";
import messages from "../Attendance/messages";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import style from "../../../../styles/styles.scss";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import useStyles from '../Style';
import GeneralListApis from '../api/GeneralListApis'; 
import PayRollLoader from '../Component/PayRollLoader';
import ApiData from "../Attendance/api/CalculateAttendanceData";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import { injectIntl } from 'react-intl';


const CalculateAttendancePopUp = ({ 
  handleClose, 
  open, 
  Data, 
  popUpTitle,
  disabledLock, 
  shortcutType, 
  isLoadingPopup,
  setIsLoadingPopup,
  intl
}) => {
  const locale = useSelector((state) => state.language.locale);

  const [DateError, setDateError] = useState({});
  const [shiftData, setShiftData] = useState([]);
  const { classes } = useStyles();
  const [data, setData] = useState();
  
  const getdata =  async () => {

    setIsLoadingPopup(true);
    try {
      const ShiftList = await GeneralListApis(locale).GetShiftList(locale);    

      setShiftData(ShiftList)

    } catch (error) {
      //
    } finally {
    }
  
  };

  useEffect(() => {
    getdata();
  }, []);

  // uesed to clear fields after close popup
  useEffect(() => {
    setData()
  }, [open]);
  

  useEffect(() => {
    if(Data)
    {
      setData((prev) => ({
            ...prev,
            AttendanceDate: Data.rowData[4],
            employeeName: Data.rowData[5] ? Data.rowData[5] : "",
            shiftCode: Data.rowData[3]  ? Data.rowData[3] : null,
            timeIn: shortcutType === "CancelLate" && Data.rowData[4] && Data.rowData[20] ? Data.rowData[4].split("T")[0] + "T" + Data.rowData[20]
                  : Data.rowData[4] && Data.rowData[6] ? Data.rowData[4].split("T")[0] + "T" + Data.rowData[6].split("T")[1] : "" ,
            timeOut: shortcutType === "EarlyLeave" && Data.rowData[4] && Data.rowData[21] ? Data.rowData[4].split("T")[0] + "T" + Data.rowData[21]
                  : Data.rowData[4] && Data.rowData[7] ? Data.rowData[4].split("T")[0] + "T" + Data.rowData[7].split("T")[1] : "" ,
          }));
    }
  }, [Data]);

  // used to stop loader after list data
  useEffect(() => {
    if(data)
    {
      setIsLoadingPopup(false);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      setIsLoadingPopup(true);

      const apiData = {
        id: 0,
        shiftDate: data.AttendanceDate,
        shiftCode: data.shiftCode,
        employeeId: Data.rowData[0],
        timeIn: data.timeIn,
        timeOut: data.timeOut,
        notes: data.notes ? data.notes : "",
      }

      let response = await ApiData(locale).Save(apiData);

      if (response.status == 200) {
        toast.success(notif.saved);
        handleClose()
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoadingPopup(false);
    }
  };

  return (
    <div>
       
      <Dialog open={open} onClose={handleClose} 
      sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              maxWidth: "1000px",
            }
          }
        }}
      >
      <PayRollLoader isLoading={isLoadingPopup}>
        <form onSubmit={handleSubmit}>
        <DialogTitle>
          <FormattedMessage {...messages[popUpTitle]} />  {/* call translation by variable */}
        </DialogTitle>
        <DialogContent>

          <Grid container item spacing={2}>

            <Grid container item spacing={2} style={{marginTop: "0px"}}>
                <Grid item xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(messages.AttendanceDate)}
                          value={data && data.AttendanceDate ? dayjs(data.AttendanceDate) : null}
                        className={classes.field}
                          onChange={(date) => {
                            setData((prev) => ({
                              ...prev,
                              AttendanceDate: date
                            }));
                        }}
                        disabled
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`AttendanceDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`AttendanceDate`]: false
                              }))
                          }
                        }}
                        slotProps={{
                          textField: {
                              required: true
                            },
                          }}
                        />
                    </LocalizationProvider>
                  </Grid>
              </Grid>

                  <Grid item xs={12}  md={6}> 
                  <TextField
                          id="employeeName"
                          name="employeeName"
                          value={data && data.employeeName ? data.employeeName : ""}
                          label={intl.formatMessage(messages.employeeName)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                          disabled
                          required
                        />
                    </Grid>

                    <Grid item xs={12}  md={6}> 
                          <Autocomplete
                              id="ddlMenu"   
                              value={data &&
                                data.shiftCode &&
                                shiftData.find((item) => item.id === data.shiftCode)
                                  ? shiftData.find((item) => item.id === data.shiftCode)
                                  : null}
                              isOptionEqualToValue={(option, value) => option.id === value.id}                      
                              options={shiftData.length != 0 ? shiftData: []}
                              getOptionLabel={(option) =>(
                                  option  ? option.name : ""
                              )
                              }
                              disabled={disabledLock}
                              renderOption={(props, option) => {
                                  return (
                                  <li {...props} key={option.id}>
                                      {option.name}
                                  </li>
                                  );
                              }}
                              onChange={(event, value) => {
                                  if (value !== null) {
                                    setData((prev) => ({
                                      ...prev,
                                      shiftCode: value.id
                                    }));
                                  } else {
                                    setData((prev) => ({
                                      ...prev,
                                      shiftCode: null
                                    }));
                                  }
                              }}
                              renderInput={(params) => (
                              <TextField
                                  {...params}
                                  name="shift"
                                  label={intl.formatMessage(messages.shift) }
                                  className={style.fieldsSty}
                                  required
                                  />
                                  
                              )}
                              /> 
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name='timeIn'
                        label={intl.formatMessage(messages.timeIn)}
                        value={data && data.timeIn ? data.timeIn : ""}
                        type='datetime-local'
                        onChange={(e) => {
                          setData((prev) => ({
                            ...prev,
                            timeIn: e.target.value
                          }));
                        }}
                        fullWidth
                        autoComplete='off'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={ locale === "ar" ? { style: { textAlign: 'right' } } : {}}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name='timeOut'
                        label={intl.formatMessage(messages.timeOut)}
                        value={data && data.timeOut ? data.timeOut : ""}
                        type='datetime-local'
                        onChange={(e) => {
                          setData((prev) => ({
                            ...prev,
                            timeOut: e.target.value
                          }));
                        }}
                        fullWidth
                        autoComplete='off'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={ locale === "ar" ? { style: { textAlign: 'right' } } : {}}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <TextField
                          id="notes"
                          name="notes"
                          onChange={(e) => {
                            setData((prev) => ({
                              ...prev,
                              notes: e.target.value
                            }));
                          }}
                          label={intl.formatMessage(Payrollmessages.notes)}
                          className={classes.field}
                          variant="outlined"
                          multiline
                          rows={1}
                          autoComplete='off'
                        />
                      </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button className={style.deleteAlertBtnSty} onClick={handleClose}>
            <FormattedMessage {...Payrollmessages.cancel} />
          </Button>
          <Button
            className={style.deleteAlertBtnSty}
            type="submit"
          >
            <FormattedMessage {...Payrollmessages.save} />
          </Button>
        </DialogActions>
        </form>
        </PayRollLoader>
      </Dialog>
      
    </div>
  );
};

export default injectIntl(CalculateAttendancePopUp);
