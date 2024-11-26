import React, { useEffect, useState } from "react";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
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
import { formateDate, getAutoCompleteValue, getCheckboxIcon } from "../../helpers";
import GeneralListApis from "../../api/GeneralListApis";

function OverTimeDetailsReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    all: false,
    LeavesAndWeekendOnly: false,
    workDavsOnly: false,
    updatedOnly: false,
    BranchId: branchId,
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
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
        ChkUpdatedOnly: searchData.updatedOnly ,
        WorkOnlyChk: searchData.workDavsOnly ,
        VacOnlyChk: searchData.LeavesAndWeekendOnly ,
        all: searchData.all ? true: "",
          };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).OverTimeDetailsReport(formData);
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };


  const columns = [
    {
      name: "id",
        label: intl.formatMessage(payrollMessages.id),
      options: {
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: "organizationName",
      label: intl.formatMessage(messages.orgName),
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
      name: "shiftDate",
      label: intl.formatMessage(messages.attendanceDate),
    },
    {
      name: "overTime",
      label: intl.formatMessage(messages.overTime),
    },
    {
      name: "vac",
      label: intl.formatMessage(messages.leave),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    // {
    //   name: "vac",
    //   label: intl.formatMessage(messages.leave),
    //   options: {
    //     filter: true,
    //   },
    // },
    {
      name: "overTimeTotal",
      label: intl.formatMessage(messages.modifiedOvertime),
    },
    
  ];

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
              company={searchData.BranchId}
            ></Search>
          </Grid>

          <Grid item md={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.all}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            all: evt.target.checked,
                            LeavesAndWeekendOnly: false,
                            workDavsOnly: false,
                            updatedOnly: false
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.All)}
                  />
            </Grid>

            <Grid item md={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.LeavesAndWeekendOnly}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            all: false,
                            LeavesAndWeekendOnly: evt.target.checked,
                            workDavsOnly: false,
                            updatedOnly: false
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.LeavesAndWeekendOnly)}
                  />
            </Grid>

          
            <Grid item md={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.workDavsOnly}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            all: false,
                            LeavesAndWeekendOnly: false,
                            workDavsOnly: evt.target.checked,
                            updatedOnly: false
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.workDevsOnly)}
                  />
            </Grid>

            <Grid item md={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.updatedOnly}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            all: false,
                            LeavesAndWeekendOnly: false,
                            GovIns: false,
                            updatedOnly: evt.target.checked
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.UpdatedOnly)}
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

OverTimeDetailsReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(OverTimeDetailsReport);
