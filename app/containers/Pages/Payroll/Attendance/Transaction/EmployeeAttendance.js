import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import shiftApi from "../api/ShiftData";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Card,
  CardContent,
} from "@mui/material";
import useStyles from "../../Style";
import PropTypes from "prop-types";
import GeneralListApis from "../../api/GeneralListApis";
import { format } from "date-fns";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MUIDataTable from "mui-datatables";
import ShiftEmployeeApiData from "../api/ShiftEmployeeData";
import ApiData from "../api/EmployeeAttendanceData";
import style from "../../../../../../app/styles/styles.scss";
import DeleteButton from "../../Component/DeleteButton";
import NamePopup from "../../Component/NamePopup";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AlertPopup from "../../Component/AlertPopup";
import PayRollLoader from "../../Component/PayRollLoader";
import Search from "../../Component/Search";

function EmployeeAttendance(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");
  const [dataList, setdataList] = useState([]);
  const [TimeInOrOut, setTimeInOrOut] = useState(1);
  const [IsVac, setIsVac] = useState(false);
  const [IsNotUpdate, setIsNotUpdate] = useState(false);
  const [IsStop, setIsStop] = useState(false);
  const [IsDrop, setIsDrop] = useState(false);

  const [Notes, setNotes] = useState("");
  const [searchData, setsearchData] = useState({
    FromDate: format(new Date(), "yyyy-MM-dd"),
    ToDate: format(new Date(), "yyyy-MM-dd"),
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
  });
  const [data, setdata] = useState({
    shiftId: "",
    shiftName: "",
    startTime: "",
    endTime: "",
    workHours: "",
  });
  const history = useHistory();
  const [OpenPopup, setOpenPopup] = useState(false);
  const [ShiftsList, setShiftsList] = useState([]);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCloseNamePopup = useCallback(
    async (Employeesdata) => {
      setOpenPopup(false);
      try {
        debugger;
        setIsLoading(true);
        let EmployeesId = [];
        for (let i = 0; i < Employeesdata.length; i++) {
          EmployeesId.push(Employeesdata[i].id);
        }

        let param = {
          fromDate: searchData.FromDate,
          toDate: searchData.ToDate,
          timeIn: data.startTime,
          timeOut: data.endTime,
          shiftCode: data.shiftId,
          isVac: IsVac,
          isNotUpdate: IsNotUpdate,
          IsStop: IsStop,
          IsDrop: IsDrop,
          Notes: Notes,
          timeInOrOut: TimeInOrOut,
          employeesId: EmployeesId,
        };
        debugger;
        let response = await ApiData(locale).SaveAll(param);

        if (response.status == 200) {
          toast.success(notif.saved);
          handleSearch();
        } else {
          toast.error(response.statusText);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    },
    [data, searchData, IsNotUpdate, IsStop, IsDrop, Notes, TimeInOrOut, IsVac]
  );

  const handleClickOpenNamePopup = () => {
    setOpenPopup(true);
  };

  const handleClickOpen = (item, selectedRows) => {
    debugger;
    setOpenParentPopup(true);
    if (selectedRows != null) {
      for (let i = 0; i < selectedRows.data.length; i++) {
        deleteItem.push(dataList[selectedRows.data[i].dataIndex].id);
      }
    } else if (item != null) deleteItem.push(item);

    //setDeleteItem(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  async function deleterow() {
    try {
      debugger;
      setIsLoading(true);
      let response = null;
      if (deleteItem.length == 1)
        response = await ApiData(locale).Delete(deleteItem);
      else if (deleteItem.length > 1)
        response = await ApiData(locale).DeleteList(deleteItem);

      if (response.status == 200) {
        toast.success(notif.saved);
        handleSearch();
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
      const params = [];
      for (let i = 0; i < selectedRows.data.length; i++) {
        params.push({
          id: dataList[selectedRows.data[i].dataIndex].id,
          timeIn: data.startTime,
          timeOut: data.endTime,
          shiftCode: data.shiftId,
          shiftVacancy: IsVac,
          dropDay: IsDrop,
          stopD: IsStop,
          notes: Notes,
          timeInOrOut: TimeInOrOut,
        });
      }
      if (params.length > 0) {
        setIsLoading(true);
        let response = await ApiData(locale).UpdateAll(params);
        if (response.status == 200) {
          toast.success(notif.saved);
          handleSearch();
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
  const handleChange = (event) => {
    if (event.target.name == "notes") {
      setNotes(event.target.value);
    }

    if (event.target.name == "isDrop") {
      setIsDrop(event.target.checked);
      setdata((prevFilters) => ({
        ...prevFilters,
        startTime: "",
        endTime: "",
        workHours: 0,
      }));
    }
    if (event.target.name == "isStop") {
      setIsStop(event.target.checked);
      setdata((prevFilters) => ({
        ...prevFilters,
        startTime: "",
        endTime: "",
        workHours: 0,
      }));
    }
    if (event.target.name == "isnotUpdate") {
      setIsNotUpdate(event.target.checked);
    }
    if (event.target.name == "isVac") {
      setIsVac(event.target.checked);
      setdata((prevFilters) => ({
        ...prevFilters,
        startTime: "",
        endTime: "",
        workHours: 0,
      }));
    }
    if (event.target.name == "timeInOrOut") {
      setTimeInOrOut(event.target.value);
      setIsVac(false);
      setIsStop(false);
      setIsDrop(false);
    }
    debugger;
    if (event.target.name == "startTime") {
      if (data.endTime != "") {
        var diff =
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
          3600000;

        setdata((prevFilters) => ({
          ...prevFilters,
          startTime: event.target.value,
          workHours: diff,
        }));
      } else
        setdata((prevFilters) => ({
          ...prevFilters,
          startTime: event.target.value,
        }));
    }

    if (event.target.name == "endTime") {
      if (data.startTime != "") {
        var diff =
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
          3600000;

        setdata((prevFilters) => ({
          ...prevFilters,
          endTime: event.target.value,
          workHours: diff,
        }));
      } else
        setdata((prevFilters) => ({
          ...prevFilters,
          endTime: event.target.value,
        }));
    }
  };

  const handleSearch = async (e) => {
    try {
      debugger;
      setIsLoading(true);
      const dataApi = await ShiftEmployeeApiData(locale).GetEmpAttendance(
        searchData.FromDate,
        searchData.ToDate,
        searchData.EmployeeId,
        searchData.OrganizationId,
        searchData.EmpStatusId,
        "" //data.shiftId
      );
      setdataList(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

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
          3600000,
      }));
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
      name: "organizationName",
      label: <FormattedMessage {...Payrollmessages["organizationName"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "shiftCode",
      label: <FormattedMessage {...messages["shiftCode"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "shiftName",
      label: <FormattedMessage {...messages["shiftName"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "weekDayName",
      label: <FormattedMessage {...Payrollmessages["weekDayName"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "shiftDate",
      label: <FormattedMessage {...Payrollmessages["date"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
      },
    },
    {
      name: "timeIn",
      label: <FormattedMessage {...messages["timeIn"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "timeOut",
      label: <FormattedMessage {...messages["timeOut"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "notes",
      label: <FormattedMessage {...messages["notes"]} />,
      options: {
        filter: true,
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
                clickfnc={() => handleClickOpen(tableMeta.rowData[0], null)}
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
      <div>
        <div className={classes.selectEmpButton}>
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            onClick={handleClickOpenNamePopup}
          >
            <FormattedMessage {...Payrollmessages.chooseEmp} />
          </Button>
        </div>
        <div className={classes.searchButton}>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={handleSearch}
          >
            <FormattedMessage {...Payrollmessages.search} />
          </Button>
        </div>
      </div>
    ),
    customToolbarSelect: (selectedRows) => (
      <div>
        <Grid container spacing={1} alignItems="flex-start" direction="row">
          <Grid item xs={12} md={6}>
            <Tooltip
              title={intl.formatMessage(Payrollmessages.apply)}
              cursor="pointer"
              className="mr-6"
            >
              <DeleteButton
                clickfnc={() => handleClickOpen(null, selectedRows)}
              ></DeleteButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={12}>
              <Search
                setsearchData={setsearchData}
                searchData={searchData}
                setIsLoading={setIsLoading}
              ></Search>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item md={6} xs={12}>
                      <Grid
                        container
                        spacing={2}
                        alignItems="flex-start"
                        direction="row"
                      >
                        <Grid item xs={12} md={12}>
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
                                shiftId: value !== null ? value.id : "",
                                shiftName: value !== null ? value.name : "",
                              }));
                              getShiftData(value !== null ? value.id : "");
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
                            id="workHours"
                            name="workHours"
                            value={data.workHours}
                            disabled
                            label={intl.formatMessage(messages.hours)}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TextField
                            id="notes"
                            name="notes"
                            value={Notes}
                            onChange={(e) => handleChange(e)}
                            label={intl.formatMessage(messages.notes)}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item md={3} xs={12}>
                      <FormControl
                        variant="standard"
                        component="fieldset"
                        required
                      >
                        <RadioGroup
                          name="timeInOrOut"
                          aria-label="Direction"
                          value={TimeInOrOut}
                          onChange={(e) => handleChange(e)}
                        >
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label={intl.formatMessage(messages.BothCheckInOut)}
                          />
                          <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label={intl.formatMessage(messages.checkIn)}
                          />
                          <FormControlLabel
                            value="3"
                            control={<Radio />}
                            label={intl.formatMessage(messages.checkOut)}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) => handleChange(e)}
                              name="isVac"
                              color="primary"
                              checked={IsVac}
                            />
                          }
                          label={intl.formatMessage(messages.weekend)}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) => handleChange(e)}
                              name="isStop"
                              color="primary"
                              checked={IsStop}
                            />
                          }
                          label={intl.formatMessage(messages.isStop)}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) => handleChange(e)}
                              name="isDrop"
                              color="primary"
                              checked={IsDrop}
                            />
                          }
                          label={intl.formatMessage(messages.isDrop)}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) => handleChange(e)}
                              color="primary"
                              name="isnotUpdate"
                            />
                          }
                          label={intl.formatMessage(messages.isNotUpdateAtt)}
                        />
                      </Grid>
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
EmployeeAttendance.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(EmployeeAttendance);
