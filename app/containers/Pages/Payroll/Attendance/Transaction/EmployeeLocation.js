import React, { useState, useCallback, useEffect } from "react";
import { PapperBlock } from "enl-components";
import css from "enl-styles/Table.scss";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Payrollmessages from "../../messages";
import messages from "../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import EmployeeLocationData from "../api/EmployeeLocationData";
import { toast } from "react-hot-toast";
import useStyles from "../../Style";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import GeneralListApis from "../../api/GeneralListApis";
import NamePopup from "../../Component/NamePopup";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import { format, toDate } from "date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AlertPopup from "../../Component/AlertPopup";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function EmployeeLocation(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();
  const [dataList, setdataList] = useState([]);
  const [Location, setLocation] = useState(0);
  const [FromDate, setFromDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [ToDate, setToDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [LocationList, setLocationList] = useState([]);
  const locale = useSelector((state) => state.language.locale);
  const [OpenPopup, setOpenPopup] = useState(false);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [DateError, setDateError] = useState({});
  const [governmentList, setGovernmentList] = useState([]);
  const [government, setGovernment] = useState("");

  const GetGovernmentList = async () => {
    const data = await GeneralListApis(locale).GetGovernmentList();
    setGovernmentList(data);
  };

  const GetLocationList = async (id) => {
    const data = await GeneralListApis(locale).GetLocationList(id);
    setLocationList(data);
  };

  // used to reformat date before send it to api
  const dateFormatFun = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };

  const handleClose = useCallback(
    (data) => {
      data.map((row) => {
        if (dataList.filter((x) => x.jobId == row.id).length == 0) {
          setdataList((prev) => [
            ...prev,
            {
              id: 0,
              employeeId: row.id,
              employeeName: row.name,
              fromDate: dateFormatFun(FromDate),
              toDate: dateFormatFun(ToDate),
              notes: "",
              isSelected: true,
            },
          ]);
        }
      });

      setOpenPopup(false);
    },
    [dataList, FromDate, ToDate]
  );

  const handleClickOpen = () => {
    if (!Object.values(DateError).includes(true)) {
      setOpenPopup(true);
    } else {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
    }
  };

  const handlepermcheckboxAll = (event) => {
    setdataList(
      dataList.map((x) => {
        x.isSelected = event.target.checked;
        return x;
      })
    );
  };

  const handleEnableOne = (event, row) => {
    setdataList(
      dataList.map((x) => {
        if (x.id == row.id) {
          if (event.target.name == "isselected") {
            x.isSelected = event.target.checked;
          } else if (event.target.name == "notes") {
            x.notes = event.target.value;
          }
        }
        return x;
      })
    );
  };

  async function on_submit() {
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    if (!Location) {
      toast.error("Please Select Location");
      return;
    }
    try {
      setIsLoading(true);
      let response = await EmployeeLocationData(locale).SaveList(
        dataList,
        Location
      );

      if (response.status == 200) {
        toast.success(notif.saved);
        GetList();
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = async (e) => {
    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    try {
      if (!Location || !FromDate || !ToDate) {
        toast.error("Please Enter Location & dates");
        return;
      }

      setIsLoading(true);
      var formData = {
        FromDate: dateFormatFun(FromDate),
        ToDate: dateFormatFun(ToDate),
        LocationId: Location,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      const dataApi = await EmployeeLocationData(locale).GetList(formData);

      setdataList(
        dataApi.map((obj) => {
          return {
            ...obj,
            isSelected: false,
          };
        }) || []
      );
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function Getookup() {
    try {
      const locatins = await GeneralListApis(locale).GetLocationList();
      setLocationList(locatins);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    Getookup();
    GetGovernmentList();
  }, []);

  useEffect(() => {
    GetLocationList(government.id);
  }, [government]);

  const deletePopupFun = () => {
    setIsDeletePopupOpen(true);
  };

  const deleteFun = async () => {
    let bodyData = [];

    dataList.map((item) => {
      if (item.isSelected) {
        bodyData.push(item.id);
      }
    });

    try {
      setIsLoading(true);

      const response = await EmployeeLocationData().Delete(bodyData);

      if (response.status == 200) {
        if (response.data.includes("Not Deleted because has Sign")) {
          toast.error(response.data);
        } else {
          toast.success(response.data);
        }
      } else {
        toast.error(response.statusText);
      }

      handleSearch();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <NamePopup handleClose={handleClose} open={OpenPopup} Key="Employee" />
        <div>
          <Grid container spacing={3}>
            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(Payrollmessages.fromdate)}
                  value={FromDate ? dayjs(FromDate) : FromDate}
                  className={classes.field}
                  onChange={(date) => {
                    setFromDate(date);
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`FromDate`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`FromDate`]: false,
                      }));
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(Payrollmessages.todate)}
                  value={ToDate ? dayjs(ToDate) : ToDate}
                  className={classes.field}
                  onChange={(date) => {
                    setToDate(date);
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`ToDate`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`ToDate`]: false,
                      }));
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6} lg={3} xl={3}>
              <Autocomplete
                id="government"
                options={governmentList}
                value={government}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setGovernment(value == null ? "" : value);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="governorate"
                    label={intl.formatMessage(Payrollmessages.governorate)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Autocomplete
                id="ddlLocation"
                options={LocationList}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setLocation(value !== null ? value.id : null);
                }}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="Location"
                    required
                    label={intl.formatMessage(messages.Location)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={handleSearch}
                  >
                    <FormattedMessage {...Payrollmessages.search} />
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={handleClickOpen}
                  >
                    <FormattedMessage {...Payrollmessages.chooseEmp} />
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    onClick={on_submit}
                  >
                    <FormattedMessage {...Payrollmessages.save} />
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    onClick={deletePopupFun}
                  >
                    <FormattedMessage {...Payrollmessages.delete} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12}>
              <div className={classes.rootTable}>
                <Table
                  className={cx(css.tableCrud, classes.table, classes.stripped)}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          width: "5px",
                          padding: "0px",
                          textAlign: "center",
                        }}
                      >
                        <Checkbox
                          checked={
                            dataList.length > 0 &&
                            dataList.filter((crow) => crow.isSelected == true)
                              .length === dataList.length
                              ? true
                              : false
                          }
                          color="primary"
                          name="AllSelect"
                          indeterminate={
                            dataList.filter((crow) => crow.isSelected == true)
                              .length > 0 &&
                            dataList.filter((crow) => crow.isSelected == true)
                              .length < dataList.length
                              ? true
                              : false
                          }
                          onChange={handlepermcheckboxAll}
                        />
                      </TableCell>
                      <TableCell
                        style={{
                          width: "5px",
                          padding: "0px",
                          textAlign: "center",
                        }}
                      >
                        <FormattedMessage {...Payrollmessages.id} />
                      </TableCell>
                      {/* <TableCell
                        style={{
                          width: "5px",
                          padding: "0px",
                          textAlign: "center",
                        }}
                      >
                        <FormattedMessage {...Payrollmessages.employeeId} />
                      </TableCell> */}
                      <TableCell
                        style={{
                          width: "20px",
                          padding: "0px",
                          textAlign: "center",
                        }}
                      >
                        <FormattedMessage {...messages.employeeName} />
                      </TableCell>
                      <TableCell
                        style={{
                          width: "15px",
                          padding: "0px",
                          textAlign: "center",
                        }}
                      >
                        <FormattedMessage {...messages.fromDate} />
                      </TableCell>
                      <TableCell
                        style={{
                          width: "15px",
                          padding: "0px",
                          textAlign: "center",
                        }}
                      >
                        <FormattedMessage {...messages.toDate} />
                      </TableCell>
                      <TableCell
                        style={{
                          width: "30px",
                          padding: "0px",
                          textAlign: "center",
                        }}
                      >
                        <FormattedMessage {...messages.notes} />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataList.length !== 0 &&
                      dataList.map((row) => {
                        return (
                          <TableRow
                            hover
                            key={row.id}
                            sx={{ height: 1 }}
                            style={{ padding: "0px" }}
                          >
                            <TableCell
                              style={{
                                width: "5px",
                                padding: "0px",
                                textAlign: "center",
                              }}
                            >
                              <Checkbox
                                checked={row.isSelected}
                                color="primary"
                                name="isselected"
                                onChange={(event) =>
                                  handleEnableOne(event, row)
                                }
                                value={row.isSelected}
                              />
                            </TableCell>
                            <TableCell
                              style={{
                                width: "5px",
                                padding: "0px",
                                textAlign: "center",
                              }}
                            >
                              {row.id}
                            </TableCell>
                            {/* <TableCell
                              style={{
                                width: "5px",
                                padding: "0px",
                                textAlign: "center",
                              }}
                            >
                              {row.employeeId}
                            </TableCell> */}
                            <TableCell
                              style={{
                                width: "20px",
                                padding: "0px",
                                textAlign: "center",
                              }}
                            >
                              {row.employeeName}
                            </TableCell>
                            <TableCell
                              style={{
                                width: "15px",
                                padding: "0px",
                                textAlign: "center",
                              }}
                            >
                              {format(new Date(row.fromDate), "yyyy-MM-dd")}
                            </TableCell>
                            <TableCell
                              style={{
                                width: "15px",
                                padding: "0px",
                                textAlign: "center",
                              }}
                            >
                              {format(new Date(row.toDate), "yyyy-MM-dd")}
                            </TableCell>
                            <TableCell
                              style={{
                                width: "30px",
                                padding: "0px",
                                textAlign: "center",
                              }}
                            >
                              <input
                                style={{ width: "80%" }}
                                name="notes"
                                type="text"
                                value={row.notes}
                                onChange={(event) =>
                                  handleEnableOne(event, row)
                                }
                              ></input>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </Grid>
          </Grid>
        </div>

        <AlertPopup
          handleClose={() => {
            setIsDeletePopupOpen(false);
          }}
          open={isDeletePopupOpen}
          messageData={intl.formatMessage(Payrollmessages.deleteMessage)}
          callFun={() => deleteFun()}
        />
      </PapperBlock>
    </PayRollLoaderInForms>
  );
}

export default injectIntl(EmployeeLocation);
