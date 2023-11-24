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
import PayRollLoader from "../../Component/PayRollLoader";
import { format, toDate } from "date-fns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

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
              fromDate: FromDate,
              toDate: ToDate,
              notes: "",
              isSelected: true,
            },
          ]);
        }
      });
      setOpenPopup(false);
    },
    [dataList]
  );

  const handleClickOpen = () => {
    setOpenPopup(true);
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
        if (x.employeeId == row.employeeId) {
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
    debugger;
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
    try {
      if (!Location || !FromDate || !ToDate) {
        toast.error("Please Enter Location & dates");
        return;
      }
      debugger;
      setIsLoading(true);
      var formData = {
        FromDate: FromDate,
        ToDate: ToDate,
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
  }, []);

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <NamePopup handleClose={handleClose} open={OpenPopup} Key="Employee" />
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(Payrollmessages.fromdate)}
                  value={FromDate}
                  onChange={(date) => {
                    setFromDate(format(new Date(date), "yyyy-MM-dd"));
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
                  value={ToDate}
                  onChange={(date) => {
                    setToDate(format(new Date(date), "yyyy-MM-dd"));
                  }}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} md={3}>
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
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={handleSearch}
              >
                <FormattedMessage {...Payrollmessages.search} />
              </Button>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={handleClickOpen}
              >
                <FormattedMessage {...Payrollmessages.chooseEmp} />
              </Button>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                onClick={on_submit}
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
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
                      <TableCell
                        style={{
                          width: "5px",
                          padding: "0px",
                          textAlign: "center",
                        }}
                      >
                        <FormattedMessage {...Payrollmessages.employeeId} />
                      </TableCell>
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
                            key={row.employeeId}
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
                            <TableCell
                              style={{
                                width: "5px",
                                padding: "0px",
                                textAlign: "center",
                              }}
                            >
                              {row.employeeId}
                            </TableCell>
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
                              {format(
                                new Date(row.fromDate),
                                "yyyy-MM-dd HH:mm:ss"
                              )}
                            </TableCell>
                            <TableCell
                              style={{
                                width: "15px",
                                padding: "0px",
                                textAlign: "center",
                              }}
                            >
                              {format(
                                new Date(row.toDate),
                                "yyyy-MM-dd HH:mm:ss"
                              )}
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
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(EmployeeLocation);
