import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Styles from "../../../../../../styles/styles.scss";
import GeneralListApis from "../../../api/GeneralListApis";
import { useSelector } from "react-redux";
import useStyles from "../../../Style";
import shiftApi from "../../api/ShiftData";
import { toast } from "react-hot-toast";
import Payrollmessages from "../../../messages";
import messages from "../../messages";
import { format } from "date-fns";
import ApiData from "../../api/EmployeeScheduleData";
import { injectIntl } from 'react-intl';
import notif from "enl-api/ui/notifMessage";
import {
    Button,
    Grid,
    TextField,
    Autocomplete,
    FormControlLabel,
    Checkbox,
  } from "@mui/material";

const  EmployeeSchedulePopup = ({
    handleClose,
    open,
    selectedDay,
    EmployeeId,
    EmployeeName,
    intl,
    GetEmployeeShiftCalendarFun
}) => {
  
    const locale = useSelector((state) => state.language.locale);
    const { classes } = useStyles();
    const [ShiftsList, setShifts] = useState([]);
    const [DateError, setDateError] = useState({});
    const [data, setdata] = useState({
        id: 0,
        employeeId: "",
        employeeName: "",
        shiftId: "",
        shiftName: "",
        startTime: "",
        endTime: "",
        workHours: "",
        hoursFromEmp: false,
        fromDate: "",
        toDate: "",
        vsaturday: false,
        vsunday: false,
        vmonday: false,
        vtuesday: false,
        vwednesday: false,
        vthursday: false,
        vfriday: false,
        weekend: false
      });

      const dateFormatFun = (date) => {
        return date ? format(new Date(date), "yyyy-MM-dd") : "";
      };


        useEffect(()=>{
            if(EmployeeId)
            {
                setdata((prevState) => ({
                    ...prevState,
                    employeeId: EmployeeId,
                    employeeName: EmployeeName
                }))
            }
        },[EmployeeId])

   const fetchData = async () => {
        try
        {
            const shifts = await GeneralListApis(locale).GetShiftList();
            setShifts(shifts);
        }
        catch(err)
        {}
      }
    
      useEffect(() => {
        fetchData();
      }, []);


      async function getShiftData(value) {
        if (value == null) {
          setdata((prevFilters) => ({
            ...prevFilters,
            shiftId: 0,
            shiftName: "",
            startTime: "",
            endTime: "",
            workHours: "",
            hoursFromEmp: false,
          }));
        } else {
          const result = await shiftApi(locale).Get(value.id);
    
          var diff =
            (new Date(
              0,
              0,
              0,
              result.endTime.split(":")[0],
              result.endTime.split(":")[1]
            ) -
              new Date(
                0,
                0,
                0,
                result.startTime.split(":")[0],
                result.startTime.split(":")[1]
              )) /
            3600000;
          setdata((prevFilters) => ({
            ...prevFilters,
            shiftId: result.id,
            shiftName: value !== null ? value.name : "",
            startTime: result.startTime,
            endTime: result.endTime,
            workHours: diff < 0 ? diff * -1 : diff,
            hoursFromEmp: result.hoursFromEmp,
          }));
        }
      }



      const closePopup = () => {
        handleClose()
        setdata((prevState) => ({
            ...prevState,
            id: 0,
            shiftId: "",
            shiftName: "",
            startTime: "",
            endTime: "",
            workHours: "",
            hoursFromEmp: false,
            fromDate: "",
            toDate: "",
            vsaturday: false,
            vsunday: false,
            vmonday: false,
            vtuesday: false,
            vwednesday: false,
            vthursday: false,
            vfriday: false,
            weekend: false
        }))
      }


      const submitFun = async (e) => {
        e.preventDefault();

        try
        {
            // used to stop call api if user select wrong date
            if (Object.values(DateError).includes(true)) {
                toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
                return;
            }

            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const selectedDayVal = new Date(selectedDay.currentDate).getDay()
            
          const params = {
            EmployeeId: data.employeeId,
            ShiftId: data.shiftId,
            SelectedDate: dateFormatFun(selectedDay.currentDate),
          }
        
            const apiAata = {
                id: data.id,
                employeeId: data.employeeId ,
                employeeName: data.employeeName,
                shiftId: data.shiftId,
                shiftName: data.shiftName,
                startTime: data.startTime,
                endTime: data.endTime,
                workHours: data.workHours,
                fromDate: dateFormatFun(selectedDay.currentDate),
                toDate: dateFormatFun(selectedDay.currentDate),
                vsaturday: data.weekend ? selectedDayVal === 6 ? true : false : false,
                vsunday: data.weekend ?  selectedDayVal === 0 ? true : false : false,
                vmonday: data.weekend ?  selectedDayVal === 1 ? true : false : false,
                vtuesday: data.weekend ?  selectedDayVal === 2 ? true : false : false,
                vwednesday: data.weekend ?  selectedDayVal === 3 ? true : false : false,
                vthursday: data.weekend ?  selectedDayVal === 4 ? true : false : false,
                vfriday: data.weekend ?  selectedDayVal === 5 ? true : false : false,
            };
        
            try {
                let response = await ApiData(locale).ChangeShift(params,apiAata);
        
                if (response.status == 200) {
                toast.success(notif.saved);
                GetEmployeeShiftCalendarFun()
                closePopup()
                } else {
                toast.error(response.statusText);
                }
            } catch (err) {  
           
            } finally {

            }
        }
        catch(err)
        {}
      }

  return (
    <>
      <Dialog
        open={open}
        onClose={closePopup}
        className={Styles.EmployeeSchedulePopUpContainerSty}
      >
        <form onSubmit={submitFun}>
          <DialogTitle>{intl.formatMessage(messages.changeShift)}</DialogTitle>
          <DialogContent>
              <Grid  container spacing={3} alignItems="flex-start" direction="row" style={{paddingTop:"10px"}}>
                  <Grid item xs={12} >
                    <Autocomplete
                        id="shiftId"
                        options={ShiftsList}
                        isOptionEqualToValue={(option, value) =>
                        value.id === 0 || value.id === "" || option.id === value.id
                        }
                        getOptionLabel={(option) =>
                        option.id && option.name
                            ? `${option.id} - ${option.name} `
                            : ""
                        }
                        onChange={(event, value) => {
                        getShiftData(value);
                        }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"
                            {...params}
                            name="shiftId"
                            required
                            label={intl.formatMessage(messages.shiftName)}
                        />
                        )}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      id="startTime"
                      name="startTime"
                      value={data.startTime}
                      label={intl.formatMessage(messages.startTime)}
                      type="time"
                      disabled
                      onChange={(e) => {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          startTime: e.target.value,
                        }));
                      }}
                      className={classes.field}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      id="endTime"
                      name="endTime"
                      value={data.endTime}
                      label={intl.formatMessage(messages.endTime)}
                      type="time"
                      disabled
                      onChange={(e) => {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          endTime: e.target.value,
                        }));
                      }}
                      className={classes.field}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      id="workHours"
                      name="workHours"
                      value={data.workHours}
                      onChange={(e) => {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          workHours: e.target.value,
                        }));
                      }}
                      label={intl.formatMessage(messages.hours)}
                      className={classes.field}
                      variant="outlined"
                      autoComplete="off"
                      disabled={!data.hoursFromEmp}
                    />
                  </Grid>

                  <Grid item xs={12} >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.weekend}
                          onChange={(e) =>
                            setdata((prevState) => ({
                              ...prevState,
                              weekend: e.target.checked,
                            }))
                          }
                          value={data.weekend}
                          color="primary"
                        />
                      }
                      label={intl.formatMessage(messages.weekend)}
                    />
                  </Grid>
              </Grid>

          </DialogContent>
          <DialogActions>
            <Button onClick={closePopup}>{intl.formatMessage(Payrollmessages.cancel)}</Button>
            <Button type='submit' >{intl.formatMessage(Payrollmessages.save)}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}



export default  injectIntl(EmployeeSchedulePopup);
