import React, { useEffect, useState } from "react";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
} from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import { toast } from "react-hot-toast";
import PayrollTable from "../../Component/PayrollTable";
import GeneralListApis from "../../api/GeneralListApis";
import { formateDate, getAutoCompleteValue } from "../../helpers";


function StatisticalReport2(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState([]);
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    BranchId: "",
  });


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

    setFilterHighlights(highlights);
  };

  async function fetchData() {
    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async (e) => {

      // used to stop call api if user select wrong date
      if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(payrollMessages.DateNotValid));
        return;
      }

    try {
      setIsLoading(true);
      let formData = {
        FromDate: formateDate(searchData.FromDate),
        ToDate: formateDate(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      const dataApi = await ApiData(locale).StatisticalReport2Api(formData);
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }

  };

 
  useEffect(()=>{
    if(data.length !== 0)
    {
      setColumns([
        {
          name: "Id",
          label: intl.formatMessage(payrollMessages.id),
          options: {
            display: false,
            print: false,
            download: false,
          },
        },
        {
          name: "employeeCode",
          label: intl.formatMessage(messages.Code),
          options: {
            filter: true,
            setCellProps: () => ({ // used to make columns freze
              style: {
                whiteSpace: "nowrap",
                position: "sticky",
                ...(locale === "en" && { left: "0" }),
                ...(locale === "ar" && { right: "0" }),
                background: "white",
                zIndex: 100,
                paddingLeft: 20,
                paddingRight: 20
              }
            }),
            setCellHeaderProps: () => ({ // used to make columns freze
              style: {
                whiteSpace: "nowrap",
                position: "sticky",
                ...(locale === "en" && { left: 0 }),
                ...(locale === "ar" && { right: 0 }),
                background: "white",
                zIndex: 101,
                paddingLeft: 20,
                paddingRight: 20
              }
            })
          },
        },
        {
          name: "employeeName",
          label: intl.formatMessage(messages.employeeName),
          options: {
            filter: true,
            setCellProps: () => ({ // used to make columns freze
              style: {
                whiteSpace: "nowrap",
                position: "sticky",
                ...(locale === "en" && { left: 60 }),
                ...(locale === "ar" && { right: 95 }),
                background: "white",
                zIndex: 100,
                paddingLeft: 20,
                paddingRight: 20
              }
            }),
            setCellHeaderProps: () => ({ // used to make columns freze
              style: {
                whiteSpace: "nowrap",
                position: "sticky",
                ...(locale === "en" && { left: 60 }),
                ...(locale === "ar" && { right: 95 }),
                background: "white",
                zIndex: 101,
                paddingLeft: 20,
                paddingRight: 20
              }
            })
          },
        },
        {
          name: "organizationName",
          label: intl.formatMessage(messages.orgName),
          options: {
            filter: true,
            setCellProps: () => ({ // used to make columns freze
              style: {
                whiteSpace: "nowrap",
                position: "sticky",
                ...(locale === "en" && { left: 223 }),
                ...(locale === "ar" && { right: 198 }),
                background: "white",
                zIndex: 100,
                paddingLeft: 20,
                paddingRight: 20
              }
            }),
            setCellHeaderProps: () => ({ // used to make columns freze
              style: {
                whiteSpace: "nowrap",
                position: "sticky",
                ...(locale === "en" && { left: 223 }),
                ...(locale === "ar" && { right: 198 }),
                background: "white",
                zIndex: 101,
                paddingLeft: 20,
                paddingRight: 20
              }
            })
          },
        },
        {
            name: "Vac_Balance",
            label: intl.formatMessage(messages.vacBalance),
            options: {
              filter: true,
              setCellProps: () => ({ // used to make columns freze
                style: {
                  whiteSpace: "nowrap",
                  position: "sticky",
                  ...(locale === "en" && { left: 363 }),
                ...(locale === "ar" && { right: 285 }),
                  background: "white",
                  zIndex: 100,
                  paddingLeft: 20,
                paddingRight: 20
                }
              }),
              setCellHeaderProps: () => ({ // used to make columns freze
                style: {
                  whiteSpace: "nowrap",
                  position: "sticky",
                  ...(locale === "en" && { left: 363 }),
                ...(locale === "ar" && { right: 285 }),
                  background: "white",
                  zIndex: 101,
                  paddingLeft: 20,
                paddingRight: 20
                }
              })
            },
          },
          {
            name: "absence",
            label: intl.formatMessage(messages.Absence),
          },
          {
            name: "vac1",
            label: intl.formatMessage(messages.leaves),
          },
          {
            name: "vac14",
            label: intl.formatMessage(messages.casualL),
          },
          {
            name: "vac3",
            label: intl.formatMessage(messages.deductedL),
          },
          {
            name: "vac10",
            label: intl.formatMessage(messages.payedL),
          },
          {
            name: "vac2",
            label: intl.formatMessage(messages.sickL),
          },
          {
            name: "vac4in",
            label: intl.formatMessage(messages.workedOfficial),
          },
          {
            name: "vac4notin",
            label: intl.formatMessage(messages.Official),
          },
          {
            name: "vac4intime",
            label: intl.formatMessage(messages.workedOfficialT),
          },
          {
            name: "shiftVacInCount",
            label: intl.formatMessage(messages.workedWeekendCount),
          },
          {
            name: "shiftVacnotInCount",
            label: intl.formatMessage(messages.Weekend),
          },
          {
            name: "shiftVacInTime",
            label: intl.formatMessage(messages.workedWeekendT),
          },
          {
            name: "notIn",
            label: intl.formatMessage(messages.missingSignIn),
          },
          {
            name: "notOut",
            label: intl.formatMessage(messages.missingSignOut),
          },
          {
            name: "notINOut",
            label: intl.formatMessage(messages.total),
          },
          {
            name: "morningPer",
            label: intl.formatMessage(messages.dayPermissionC),
          },
          {
            name: "morningPerMin",
            label: intl.formatMessage(messages.dayPermissionT),
          },
          {
            name: "nightPer",
            label: intl.formatMessage(messages.nightPermissionC),
          },
          {
            name: "nightPerMin",
            label: intl.formatMessage(messages.nightPermissionT),
          },
          {
            name: "lateNoPer",
            label: intl.formatMessage(messages.lateCount),
          },
          {
            name: "lateNoPerMin",
            label: intl.formatMessage(messages.lateTime),
          },
          {
            name: "leaveEarlyNoPer",
            label: intl.formatMessage(messages.leaveEarlyC),
          },
          {
            name: "leaveEarlyNoPerMin",
            label: intl.formatMessage(messages.leaveEarlyT),
          },
          {
            name: "morMiss",
            label: intl.formatMessage(messages.dayMissionsCount),
          },
          {
            name: "morMissMin",
            label: intl.formatMessage(messages.dayMissionT),
          },
          {
            name: "nightMiss",
            label: intl.formatMessage(messages.nightMissionC),
          },
          {
            name: "nightMissMin",
            label: intl.formatMessage(messages.nightMissionT),
          },
          {
            name: "allDayMiss",
            label: intl.formatMessage(messages.fullDayMissions),
          },
          {
            name: "overTimeC",
            label: intl.formatMessage(messages.overTimeC),
          },
          {
            name: "overTimeMin",
            label: intl.formatMessage(messages.overTimeT),
          },
          {
            name: "appOvertime",
            label: intl.formatMessage(messages.confirmedOverTime),
          },
        ])
    }
  },[data])

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
      { data.length !== 0 && (
        <PayrollTable
          title=""
          data={data}
          columns={columns}
          filterHighlights={filterHighlights}
        />
      )}
    </PayRollLoader>
  );
}

StatisticalReport2.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(StatisticalReport2);
