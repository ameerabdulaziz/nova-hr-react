import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import shiftApi from "../../api/ShiftData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { injectIntl, FormattedMessage } from "react-intl";
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
import ApiData from "../../api/ShiftEmployeeData";
import NamePopup from "../../../Component/NamePopup";
import CheckIcon from "@mui/icons-material/Check";
import PayRollLoader from "../../../Component/PayRollLoader";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { formateDate, getCheckboxIcon } from "../../../helpers";
import PayrollTable from "../../../Component/PayrollTable";

function ShiftOrgnization(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");
  const [dataList, setdataList] = useState([]);
  const [data, setdata] = useState({
    id: 0,
    shiftId: "",
    shiftName: "",
    startTime: "",
    endTime: "",
    workHours: "",
    fromDate: format(new Date(), "yyyy-MM-dd"),
    toDate: format(new Date(), "yyyy-MM-dd"),
    vsaturday: false,
    vsunday: false,
    vmonday: false,
    vtuesday: false,
    vwednesday: false,
    vthursday: false,
    vfriday: false,
  });

  const [OpenPopup, setOpenPopup] = useState(false);
  const [ShiftsList, setShiftsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [DateError, setDateError] = useState({});

  const handleCloseNamePopup = useCallback(
    async (Employeesdata) => {
      setOpenPopup(false);

      try {
        setIsLoading(true);
        const shifts = Employeesdata.map((obj) => ({
          id: 0,
          employeeId: obj.id,
          shiftId: data.shiftId,
          workHours: data.workHours,
          fromDate: formateDate(data.fromDate),
          toDate: formateDate(data.toDate),
          vsaturday: data.vsaturday,
          vsunday: data.vsunday,
          vmonday: data.vmonday,
          vtuesday: data.vtuesday,
          vwednesday: data.vwednesday,
          vthursday: data.vthursday,
          vfriday: data.vfriday,
        }));

        let response = await ApiData(locale).SaveList(shifts);

        if (response.status == 200) {
          toast.success(notif.saved);
          const result = await ApiData(locale).GetList("", data.shiftId, "");
          setdataList(result || []);
        } else {
          toast.error(response.statusText);
        }
      } catch (err) {

      } finally {
        setIsLoading(false);
      }
    },
    [data]
  );

  const handleClickOpenNamePopup = () => {
    if(!Object.values(DateError).includes(true))
    {

      setOpenPopup(true);
    }
    else
    {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid))
    }
  };


;

  async function deleteRow(id) {
    try {

      setIsLoading(true);
      await ApiData(locale).Delete(id);

      toast.success(notif.saved);
      getShiftData(data.shiftId);

    } catch (err) {
      
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdate(selectedRows) {

// used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) { 
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    try {
      const shifts = [];
      for (let i = 0; i < selectedRows.data.length; i++) {
        shifts.push({
          id: dataList[selectedRows.data[i].dataIndex].id,
          employeeId: dataList[selectedRows.data[i].dataIndex].employeeId,
          shiftId: data.shiftId,
          workHours: data.workHours,
          fromDate: formateDate(data.fromDate),
          toDate: formateDate(data.toDate),
          vsaturday: data.vsaturday,
          vsunday: data.vsunday,
          vmonday: data.vmonday,
          vtuesday: data.vtuesday,
          vwednesday: data.vwednesday,
          vthursday: data.vthursday,
          vfriday: data.vfriday,
        });
      }


      if (shifts.length > 0) {
        setIsLoading(true);
        let response = await ApiData(locale).SaveList(shifts);
        if (response.status == 200) {
          toast.success(notif.saved);
          const result = await ApiData(locale).GetList("", data.shiftId, "");
          setdataList(result || []);
        } else {
          toast.error(response.statusText);
        }
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  
  async function Getookup() {
    setIsLoading(true);

    try {
      const shifts = await GeneralListApis(locale).GetShiftList();
      setShiftsList(shifts);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    Getookup();
  }, []);

  async function getShiftData(id) {
    try {
      if (!id) {
        setdata((prevFilters) => ({
          ...prevFilters,
          startTime: "",
          endTime: "",
          workHours: "",
        }));
        setdataList([]);
        return;
      }
      setIsLoading(true);
      const result = await shiftApi(locale).Get(id);

      setdata((prevFilters) => ({
        ...prevFilters,
        startTime: result.startTime,
        endTime: result.endTime,
        workHours:
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
            3600000
      }));
      const dataApi = await ApiData(locale).GetList("", id, "");
      setdataList(dataApi || []);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
      },
    },
    {
      name: "employeeId",
      label: intl.formatMessage(Payrollmessages.employeeId),
    },

    {
      name: "employeeName",
      label: intl.formatMessage(Payrollmessages.employeeName),
    },

    {
      name: "startTime",
      label: intl.formatMessage(messages.startTime),
    },
    {
      name: "endTime",
      label: intl.formatMessage(messages.endTime),
    },
    {
      name: "fromDate",
      label: intl.formatMessage(Payrollmessages.fromdate),
    },
    {
      name: "toDate",
      label: intl.formatMessage(Payrollmessages.todate),
    },
    {
      name: "workHours",
      label: intl.formatMessage(messages.hours),
    },
    {
      name: "vsaturday",
      label: intl.formatMessage(Payrollmessages.saturday),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: "vsunday",
      label: intl.formatMessage(Payrollmessages.sunday),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: "vmonday",
      label: intl.formatMessage(Payrollmessages.monday),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: "vtuesday",
      label: intl.formatMessage(Payrollmessages.tuesday),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: "vwednesday",
      label: intl.formatMessage(Payrollmessages.wednesday),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: "vthursday",
      label: intl.formatMessage(Payrollmessages.thursday),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: "vfriday",
      label: intl.formatMessage(Payrollmessages.friday),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
  ];

  const options = {
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    search: false,
    selectableRows: 'multiple',
    customToolbar: () => (
      <Button
        variant="contained"
        size="medium"
        color="secondary"
        disabled={!data.shiftId}
        onClick={handleClickOpenNamePopup}
      >
        <FormattedMessage {...Payrollmessages.chooseEmp} />
      </Button>
    ),
    customToolbarSelect: (selectedRows) => (
      <div>
        <Grid container spacing={1} alignItems="flex-start" direction="row">
         
          <Grid item xs={12} md={2}>
            {/* <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={() => handleUpdate(selectedRows)}
            >
              <FormattedMessage {...Payrollmessages.apply} />
            </Button> */}
            <Tooltip
              title={intl.formatMessage(Payrollmessages.applynewshift)}
              className="mr-6"
            >
              <IconButton
                className={classes.button}
                size="large"
                onClick={() => handleUpdate(selectedRows)}
              >
                <CheckIcon></CheckIcon>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    ),
  };

  const actions = {
    delete: {
      api: deleteRow,
    },
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <NamePopup
          handleClose={handleCloseNamePopup}
          open={OpenPopup}
          Key={"Employee"}
        />
        <div>
          <Grid container spacing={2} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={5}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={8}>
                      <Autocomplete
                        id="shiftId"
                        options={ShiftsList}
                        isOptionEqualToValue={(option, value) =>
                          value.id === 0 ||
                          value.id === "" ||
                          option.id === value.id
                        }
                        getOptionLabel={(option) =>
                          option.name ? option.name : ""
                        }
                        value={{ id: data.shiftId, name: data.shiftName }}
                        onChange={(event, value) => {
                          setdata((prevFilters) => ({
                            ...prevFilters,
                            shiftId: value !== null ? value.id : 0,
                            shiftName: value !== null ? value.name : "",
                          }));
                          getShiftData(value !== null ? value.id : 0);
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
                    <Grid item xs={12} md={4}>
                      {" "}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="startTime"
                        name="startTime"
                        value={data.startTime}
                        label={intl.formatMessage(messages.startTime)}
                        type="time"
                        disabled
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
                        disabled
                        className={classes.field}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                        autoComplete='off'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={7}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={1}
                    alignItems="flex-start"
                    direction="row"
                  >
 

                  <Grid item xs={12} md={3}>
                  
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
                            setDateError((prevFilters) => ({
                              ...prevFilters,
                                [`fromDate`]: true
                            }))
                          }
                          else
                          {
                            setDateError((prevFilters) => ({
                              ...prevFilters,
                                [`fromDate`]: false
                            }))
                          }
                        }}
                        />
                    </LocalizationProvider>
                  </Grid>


                <Grid item xs={12} md={3}>
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                      label={intl.formatMessage(Payrollmessages.todate)}
                      value={data.toDate ? dayjs(data.toDate) : data.toDate}
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
                          setDateError((prevFilters) => ({
                            ...prevFilters,
                              [`toDate`]: true
                          }))
                        }
                        else
                        {
                          setDateError((prevFilters) => ({
                            ...prevFilters,
                              [`toDate`]: false
                          }))
                        }
                      }}
                      />
                  </LocalizationProvider>
                </Grid>


                    <Grid item xs={12} md={12}>
                      <Card className={classes.card}>
                        <CardContent>
                          <Grid
                            container
                            alignItems="flex-start"
                            direction="row"
                          >
                            <Grid item xs={12} md={4}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={data.vsaturday}
                                    onChange={(e) =>
                                      setdata((prevFilters) => ({
                                        ...prevFilters,
                                        vsaturday: e.target.checked,
                                      }))
                                    }
                                    value={data.vsaturday}
                                    color="primary"
                                  />
                                }
                                label={intl.formatMessage(
                                  Payrollmessages.saturday
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={2.5}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={data.vsunday}
                                    onChange={(e) =>
                                      setdata((prevFilters) => ({
                                        ...prevFilters,
                                        vsunday: e.target.checked,
                                      }))
                                    }
                                    value={data.vsunday}
                                    color="primary"
                                  />
                                }
                                label={intl.formatMessage(
                                  Payrollmessages.sunday
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={2.5}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={data.vmonday}
                                    onChange={(e) =>
                                      setdata((prevFilters) => ({
                                        ...prevFilters,
                                        vmonday: e.target.checked,
                                      }))
                                    }
                                    value={data.vmonday}
                                    color="primary"
                                  />
                                }
                                label={intl.formatMessage(
                                  Payrollmessages.monday
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={data.vtuesday}
                                    onChange={(e) =>
                                      setdata((prevFilters) => ({
                                        ...prevFilters,
                                        vtuesday: e.target.checked,
                                      }))
                                    }
                                    value={data.vtuesday}
                                    color="primary"
                                  />
                                }
                                label={intl.formatMessage(
                                  Payrollmessages.tuesday
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={data.vwednesday}
                                    onChange={(e) =>
                                      setdata((prevFilters) => ({
                                        ...prevFilters,
                                        vwednesday: e.target.checked,
                                      }))
                                    }
                                    value={data.vwednesday}
                                    color="primary"
                                  />
                                }
                                label={intl.formatMessage(
                                  Payrollmessages.wednesday
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={2.5}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={data.vthursday}
                                    onChange={(e) =>
                                      setdata((prevFilters) => ({
                                        ...prevFilters,
                                        vthursday: e.target.checked,
                                      }))
                                    }
                                    value={data.vthursday}
                                    color="primary"
                                  />
                                }
                                label={intl.formatMessage(
                                  Payrollmessages.thursday
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={data.vfriday}
                                    onChange={(e) =>
                                      setdata((prevFilters) => ({
                                        ...prevFilters,
                                        vfriday: e.target.checked,
                                      }))
                                    }
                                    value={data.vfriday}
                                    color="primary"
                                  />
                                }
                                label={intl.formatMessage(
                                  Payrollmessages.friday
                                )}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </PapperBlock>

      <PayrollTable
        isLoading={isLoading}
        title=''
        data={dataList}
        columns={columns}
        actions={actions}
        options={options}
      />
    </PayRollLoader>
  );
}
ShiftOrgnization.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ShiftOrgnization);
