import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/PermissionTrxData";
import { useSelector } from "react-redux";
import { Button, Grid, TextField, Autocomplete } from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useStyles from "../../Style";
import { format } from "date-fns";
import GeneralListApis from "../../api/GeneralListApis";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import { isNull } from "lodash";

function PermissionTrxReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);

  const [fromdate, setfromate] = useState(null);
  const [todate, settodate] = useState(null);
  const [employee, setemployee] = useState("");
  const [EmployeeList, setEmployeeList] = useState([]);
  const [Permission, setPermission] = useState("");
  const [PermissionsList, setPermissionsList] = useState([]);
  const [Status, setStatus] = useState("");
  const [Deleted, setDeleted] = useState("");
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");

  const handleSearch = async (e) => {
    try {
      const dataApi = await ApiData(locale).GetReport(
        employee,
        Permission,
        fromdate,
        todate,
        Status,
        Deleted
      );
      setdata(dataApi);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  async function fetchData() {
    const employees = await GeneralListApis(locale).GetEmployeeList();
    setEmployeeList(employees);

    const Permissions = await GeneralListApis(locale).GetPermissionList();
    setPermissionsList(Permissions);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
      },
    },
    {
      name: "date",
      label: <FormattedMessage {...Payrollmessages["date"]} />,
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
      name: "permissionName",
      label: <FormattedMessage {...messages["permissionName"]} />,
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
      name: "minutesCount",
      label: <FormattedMessage {...messages["minutesCount"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "notes",
      label: <FormattedMessage {...Payrollmessages["notes"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "step",
      label: <FormattedMessage {...Payrollmessages["step"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "status",
      label: <FormattedMessage {...Payrollmessages["status"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "approvedEmp",
      label: <FormattedMessage {...Payrollmessages["approvedEmp"]} />,
      options: {
        filter: true,
      },
    },
  ];
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 10,
    page: 0,
    searchOpen: false,
    onSearchClose: () => {
      //some logic
    },
  };
  return (
    <PapperBlock whiteBg icon="border_color" title={Title} desc="">
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label={intl.formatMessage(Payrollmessages.fromdate)}
                value={fromdate}
                onChange={(date) => {
                  setfromate(
                    date == null ? null : format(new Date(date), "yyyy-MM-dd")
                  );
                }}
                className={classes.field}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label={intl.formatMessage(Payrollmessages.todate)}
                value={todate}
                onChange={(date) => {
                  settodate(
                    date == null ? null : format(new Date(date), "yyyy-MM-dd")
                  );
                }}
                className={classes.field}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              id="permissionId"
              options={PermissionsList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setPermission(value == null ? "" : value.id);
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="PermissionId"
                  required
                  label={intl.formatMessage(messages.permissionName)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}></Grid>

          <Grid item xs={12} md={2}>
            <Autocomplete
              id="StatusList"
              options={[
                { id: null, name: "All" },
                { id: 1, name: "Pending" },
                { id: 2, name: "Approved" },
                { id: 3, name: "Rejected" },
              ]}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) =>
                setStatus(
                  value === null ? "" : value.id == null ? "" : value.id
                )
              }
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="StatusList"
                  label={intl.formatMessage(Payrollmessages.status)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Autocomplete
              id="DeleteList"
              options={[
                { id: null, name: "All" },
                { id: true, name: "Deleted" },
                { id: false, name: "Not Deleted" },
              ]}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setDeleted(
                  value == null ? "" : value.id == null ? "" : value.id
                );
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="DeleteList"
                  label={intl.formatMessage(Payrollmessages.delete)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              id="employeeId"
              options={EmployeeList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setemployee(value == null ? "" : value.id);
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="employeeId"
                  label={intl.formatMessage(Payrollmessages.employeeName)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...Payrollmessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title=""
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </PapperBlock>
  );
}

PermissionTrxReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(PermissionTrxReport);
