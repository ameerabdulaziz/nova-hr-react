import React, { useEffect, useState, useCallback } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/EmployeeReportsApiData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Backdrop,
  CircularProgress,
  Box,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import Search from "../../Component/Search";

function followStaffContracts(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [fromdate, setfromate] = useState(null);
  const [todate, settodate] = useState(null);
  const [employee, setemployee] = useState("");
  const [Organization, setOrganization] = useState("");
  const [EmployeeStatus, setEmployeeStatus] = useState("");
  const [Permission, setPermission] = useState("");
  const [PermissionsList, setPermissionsList] = useState([]);
  const [Status, setStatus] = useState("");
  const [Deleted, setDeleted] = useState("");
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = useCallback((name, value) => {

    if (name == "fromDate")
      setfromate(value == null ? null : format(new Date(value), "yyyy-MM-dd"));
    if (name == "toDate")
      settodate(value == null ? null : format(new Date(value), "yyyy-MM-dd"));
    if (name == "employeeId") setemployee(value);

    if (name == "organizationId") setOrganization(value);

    if (name == "statusId") setEmployeeStatus(value);
  }, []);

  const handleSearch = async (e) => {
    try {
      setIsLoading(true);
      var formData = {
        FromDate: fromdate,
        ToDate: todate,
        EmployeeId: employee,
        PermissionId: Permission,
        StatusId: Status,
        IsDeleted: Deleted,
        OrganizationId: Organization,
        EmployeeStatusId: EmployeeStatus,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      console.log("formData =", formData);
      const dataApi = await ApiData(locale).GetReport(formData);
      setdata(dataApi);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      const Permissions = await GeneralListApis(locale).GetPermissionList();
      setPermissionsList(Permissions);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: "organizationName",
      label: intl.formatMessage(messages.Department),
      options: {
        filter: true,
      },
    },

    {
      name: "employeeCode",
      label: intl.formatMessage(messages.EmpCode),
      options: {
        filter: true,
      },
    },

    {
      name: "employeeName",
      label: intl.formatMessage(messages.Staff),
      options: {
        filter: true,
      },
    },
    {
      name: "contractStartDate",
      label: intl.formatMessage(messages.contractStartDate),
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), 'yyyy-MM-dd'),
      },
    },
    {
      name: "contractEndDate",
      label: intl.formatMessage(messages.contractEndDate),
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), 'yyyy-MM-dd'),
      },
    },
    
  ];
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 15, 50, 100],
    page: 0,
    selectableRows: "none",
    searchOpen: false,
    onSearchClose: () => {
      //some logic
    },
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(Payrollmessages.loading)
          : intl.formatMessage(Payrollmessages.noMatchingRecord),
      },
    },
  };
  return (
    <Box
      sx={{
        zIndex: 100,
        position: "relative",
      }}
    >
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Backdrop
          sx={{
            color: "primary.main",
            zIndex: 10,
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.69)",
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
              handleChange={handleChange}
              fromdate={fromdate}
              todate={todate}
            ></Search>
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
                  label={intl.formatMessage(Payrollmessages.permissionName)}
                />
              )}
            />
          </Grid>

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
              name="DeleteList"
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
      </PapperBlock>
      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </Box>
  );
}

followStaffContracts.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(followStaffContracts);
