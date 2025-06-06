import React, { useEffect, useState } from "react";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import { useLocation } from "react-router-dom";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { getAutoCompleteValue } from "../../helpers";


function EmployeeAttendanceTemplate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const { state } = useLocation();
  const [Tamplete, setTamplete] = useState(state ? state.Tamplete : "");
  const [TampleteList, setTampleteList] = useState([]);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    attendanceRulesNotApplied: false,
    noAttendanceRule: false,
    BranchId: branchId,
  });

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
    const template = getAutoCompleteValue(TampleteList, Tamplete);

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

    if (template) {
      highlights.push({
        label: intl.formatMessage(messages.TampleteName),
        value: template.name,
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {
    try {
      setIsLoading(true);
      var formData = {
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
        ParaTempId: Tamplete,
        chkNoTemp: searchData.attendanceRulesNotApplied,
        chkNoAttRule: searchData.noAttendanceRule,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      const dataApi = await ApiData(locale).EmployeeAttendanceTemplateReport(
        formData
      );

      getFilterHighlights();
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      const tamplete = await GeneralListApis(locale).GetControlParameterList();
      setTampleteList(tamplete);

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
    if (Tamplete) handleSearch();
  }, []);

  const columns = [
    {
      name: "employeeId",
      label: intl.formatMessage(payrollMessages.id),
      options: {
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: "controlParameter",
      label: intl.formatMessage(messages.TampleteName),
    },
    {
      name: "employeeCode",
      label: intl.formatMessage(messages.EmpCode),
    },
    {
      name: "employeeName",
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: "job",
      label: intl.formatMessage(messages.job),
    },
    {
      name: "organizationName",
      label: intl.formatMessage(messages.orgName),
    },
  ];


  const openMonthDateWithCompanyChangeFun = async (BranchId,EmployeeId) => {

    let OpenMonthData 

    try
    {
      if(!EmployeeId)
      {
         OpenMonthData = await GeneralListApis(locale).getOpenMonth( BranchId,0);
      }
      else
      {
         OpenMonthData = await GeneralListApis(locale).getOpenMonth( 0,EmployeeId);
      }

      
      setsearchData((prev)=>({
        ...prev,
        FromDate: OpenMonthData ? OpenMonthData.fromDateAtt : null,
        ToDate: OpenMonthData ? OpenMonthData.todateAtt : null,
      }))
    }
    catch(err)
    {}

  }


  useEffect(()=>{
    if(searchData.BranchId !== "" && searchData.EmployeeId === "")
    {      
      openMonthDateWithCompanyChangeFun(searchData.BranchId)
    }

    if(searchData.BranchId === "" && searchData.EmployeeId !== "")
    {
      openMonthDateWithCompanyChangeFun(0, searchData.EmployeeId)
    }

    if(searchData.BranchId === "" && searchData.EmployeeId === "")
    {
      setsearchData((prev)=>({
        ...prev,
        FromDate: null,
        ToDate: null,
      }))
    }

  },[searchData.BranchId, searchData.EmployeeId])

  

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container spacing={2}>
          <Grid item xs={12} md={11} lg={9} xl={7}>
            <Search
              setsearchData={setsearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              notShowDate={true}
              company={searchData.BranchId}
            ></Search>
          </Grid>

          <Grid item xs={12} md={1} lg={3} xl={5}></Grid>

          <Grid item xs={6} md={5.5} lg={4.5} xl={3.5}>
            <Autocomplete
              id="MissionId"
              options={TampleteList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setTamplete(value == null ? "" : value.id);
              }}
              value={
                Tamplete&&TampleteList.length>0 ? TampleteList.find((item) => item.id === Tamplete) : null
              }
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="TampleteName"
                  label={intl.formatMessage(messages.TampleteName)}
                />
              )}
            />
          </Grid>

          <Grid item md={5} lg={4} xl={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchData.attendanceRulesNotApplied}
                  onChange={(evt) => {
                    setsearchData((prev) => ({
                      ...prev,
                      attendanceRulesNotApplied: evt.target.checked,
                      noAttendanceRule: false,
                    }));
                  }}
                />
              }
              label={intl.formatMessage(messages.attendanceRulesNotApplied)}
            />
          </Grid>

          <Grid item md={4} lg={3} xl={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchData.noAttendanceRule}
                  onChange={(evt) => {
                    setsearchData((prev) => ({
                      ...prev,
                      attendanceRulesNotApplied: false,
                      noAttendanceRule: evt.target.checked,
                    }));
                  }}
                />
              }
              label={intl.formatMessage(messages.noAttendanceRule)}
            />
          </Grid>

          <Grid item xs={12}>
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

        <SimplifiedPayrollTable
          title=""
          data={data}
          filterHighlights={filterHighlights}
          columns={columns}
        />
    </PayRollLoaderInForms>
  );
}

EmployeeAttendanceTemplate.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(EmployeeAttendanceTemplate);
