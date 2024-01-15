import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import shiftApi from "../../api/ShiftData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
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
import MUIDataTable from "mui-datatables";
import ApiData from "../../api/ShiftEmployeeData";
import style from "../../../../../../../app/styles/styles.scss";
import DeleteButton from "../../../Component/DeleteButton";
import NamePopup from "../../../Component/NamePopup";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AlertPopup from "../../../Component/AlertPopup";
import PayRollLoader from "../../../Component/PayRollLoader";

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
  const history = useHistory();
  const [OpenPopup, setOpenPopup] = useState(false);
  const [ShiftsList, setShiftsList] = useState([]);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
          fromDate: data.fromDate,
          toDate: data.toDate,
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
    setOpenPopup(true);
  };

  
  const handleClickOpen = (item) => {
    debugger;
    setOpenParentPopup(true);
    setDeleteItem(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  async function deleterow() {
    try {
      debugger;
      setIsLoading(true);
      let response = await ApiData(locale).Delete(deleteItem);

      if (response.status == 200) {
        toast.success(notif.saved);
        getShiftData(data.shiftId);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
      
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdate(selectedRows) {
    try {
      const shifts = [];
      for (let i = 0; i < selectedRows.data.length; i++) {
        shifts.push({
          id: dataList[selectedRows.data[i].dataIndex].id,
          employeeId: dataList[selectedRows.data[i].dataIndex].employeeId,
          shiftId: data.shiftId,
          workHours: data.workHours,
          fromDate: data.fromDate,
          toDate: data.toDate,
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

  const CheckBox = (value) => {
    return (
      <div className={style.actionsSty}>
        {value ? (
          <CheckIcon style={{ color: "#3f51b5" }} />
        ) : (
          <CloseIcon style={{ color: "#717171" }} />
        )}
      </div>
    );
  };

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
      },
    },
    {
      name: "employeeId",
      label: <FormattedMessage {...Payrollmessages["employeeId"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "employeeName",
      label: <FormattedMessage {...Payrollmessages["employeeName"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "startTime",
      label: <FormattedMessage {...messages["startTime"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "endTime",
      label: <FormattedMessage {...messages["endTime"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "fromDate",
      label: <FormattedMessage {...Payrollmessages["fromdate"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
      },
    },
    {
      name: "toDate",
      label: <FormattedMessage {...Payrollmessages["todate"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
      },
    },
    {
      name: "workHours",
      label: <FormattedMessage {...messages["hours"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "vsaturday",
      label: <FormattedMessage {...Payrollmessages["saturday"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "vsunday",
      label: <FormattedMessage {...Payrollmessages["sunday"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "vmonday",
      label: <FormattedMessage {...Payrollmessages["monday"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "vtuesday",
      label: <FormattedMessage {...Payrollmessages["tuesday"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "vwednesday",
      label: <FormattedMessage {...Payrollmessages["wednesday"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "vthursday",
      label: <FormattedMessage {...Payrollmessages["thursday"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "vfriday",
      label: <FormattedMessage {...Payrollmessages["friday"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,

        customBodyRender: (value, tableMeta) => {
          console.log("tableMeta =", tableMeta);
          return (
            <div className={style.actionsSty}>
              <DeleteButton
                clickfnc={() => handleClickOpen(tableMeta.rowData[0])}
              ></DeleteButton>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    search: false,
    selection: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    onSearchClose: () => {
      //some logic
    },
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
              cursor="pointer"
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

    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(Payrollmessages.loading)
          : intl.formatMessage(Payrollmessages.noMatchingRecord),
      },
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
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          label={intl.formatMessage(Payrollmessages.fromdate)}
                          value={data.fromDate}
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
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          label={intl.formatMessage(Payrollmessages.todate)}
                          value={data.toDate}
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
            <Grid item xs={12} md={12}>
              <div className={classes.CustomMUIDataTable}>
                {/* <ThemeProvider theme={theme}> */}
                <MUIDataTable
                  title=""
                  data={dataList}
                  columns={columns}
                  options={options}
                />
                {/* </ThemeProvider> */}
              </div>
            </Grid>
          </Grid>
        </div>
      </PapperBlock>
      <AlertPopup
          handleClose={handleClose}
          open={openParentPopup}
          messageData={`${intl.formatMessage(
            Payrollmessages.deleteMessage
          )}${deleteItem}`}
          callFun={deleterow}
        />
    </PayRollLoader>
  );
}
ShiftOrgnization.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ShiftOrgnization);
