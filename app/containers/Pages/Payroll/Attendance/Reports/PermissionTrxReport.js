import React, { useEffect, useState } from "react";
import ApiData from "../api/PermissionTrxData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete
} from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import { toast } from "react-hot-toast";
import PayrollTable from "../../Component/PayrollTable";
import { formateDate, getAutoCompleteValue } from "../../helpers";

function PermissionTrxReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [Permission, setPermission] = useState("");
  const [PermissionsList, setPermissionsList] = useState([]);
  const [Status, setStatus] = useState("");
  const [Deleted, setDeleted] = useState("");
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    BranchId: '',
  });

  const deleteList = [
    { id: null, name: "All" },
    { id: true, name: "Deleted" },
    { id: false, name: "Not Deleted" },
  ];

  const permissionStatusList = [
    { id: null, name: "All" },
    { id: 1, name: "Pending" },
    { id: 2, name: "Approved" },
    { id: 3, name: "Rejected" },
  ];

  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      searchData.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, searchData.EmployeeId);
    const status = getAutoCompleteValue(statusList, searchData.EmpStatusId);
    const company = getAutoCompleteValue(companyList, searchData.BranchId);
    const selectedMission = getAutoCompleteValue(PermissionsList, Permission);
    const deleted = getAutoCompleteValue(deleteList, Deleted);
    const permissionStatus = getAutoCompleteValue(permissionStatusList, Status);

    if (organization) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: organization.name,
      });
    }

    if (employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: employee.name,
      });
    }

    if (status) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: status.name,
      });
    }

    if (company) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: company.name,
      });
    }

    if (searchData.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(searchData.FromDate),
      });
    }

    if (searchData.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(searchData.ToDate),
      });
    }

    if (selectedMission) {
      highlights.push({
        label: intl.formatMessage(messages.missionName),
        value: selectedMission.name,
      });
    }

    if (deleted) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.delete),
        value: deleted.name,
      });
    }

    if (permissionStatus) {
      highlights.push({
        label: intl.formatMessage(messages.status),
        value: permissionStatus.name,
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }


    try {
      setIsLoading(true);
     
      var formData = {
        FromDate: formateDate(searchData.FromDate),
        ToDate: formateDate(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
        PermissionId: Permission,
        StatusId: Status,
        IsDeleted: Deleted,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      const dataApi = await ApiData(locale).GetReport(formData);
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      const Permissions = await GeneralListApis(locale).GetPermissionList();
      setPermissionsList(Permissions);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
    } catch (err) {
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
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: "date",
      label: intl.formatMessage(payrollMessages.date),
    },

    {
      name: "employeeName",
      label: intl.formatMessage(payrollMessages.employeeName),
    },
    {
      name: "employeeCode",
      label: intl.formatMessage(messages.EmpCode),
    },
    {
      name: "permissionName",
      label: intl.formatMessage(messages.permissionName),
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
      name: "minutesCount",
      label: intl.formatMessage(messages.minutesCount),
    },
    {
      name: "notes",
      label: intl.formatMessage(payrollMessages.notes),
      options: {
        customBodyRender: (value) => (value ? <div style={{ maxWidth: '200px', width: 'max-content' }}>{value}</div> : '')
      },
    },
    {
      name: "step",
      label: intl.formatMessage(payrollMessages.step),
    },
    {
      name: "status",
      label: intl.formatMessage(payrollMessages.status),
    },
    {
      name: "approvedEmp",
      label: intl.formatMessage(payrollMessages.approvedEmp),
    },
  ];

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
              setsearchData={setsearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              DateError={DateError}
              setDateError={setDateError}
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
                  label={intl.formatMessage(messages.permissionName)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Autocomplete
              id="StatusList"
              options={permissionStatusList}
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
                  label={intl.formatMessage(payrollMessages.status)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Autocomplete
              id="DeleteList"
              name="DeleteList"
              options={deleteList}
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
                  label={intl.formatMessage(payrollMessages.delete)}
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
              <FormattedMessage {...payrollMessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>

        <PayrollTable
          title=""
          data={data}
          columns={columns}
          filterHighlights={filterHighlights}
        />
    </PayRollLoader>
  );
}

PermissionTrxReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(PermissionTrxReport);
