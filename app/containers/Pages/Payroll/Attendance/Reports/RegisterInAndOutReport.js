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
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { toast } from "react-hot-toast";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { formateDate } from "../../helpers";
import GeneralListApis from "../../api/GeneralListApis";
import { getDateColumnOptions } from "../../Component/PayrollTable/utils.payroll-table";

function RegisterInAndOutReport(props) {
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
    BranchId: branchId,
    OrganizationId: "",
    EmpStatusId: 1,
    IncludingEmployeesWithoutAttendanceRule: false,
    RegType: 1,
  });

  const [printFilterData, setPrintFilterData] = useState({
    FromDate: null,
    ToDate: null,
    Employee: '',
    EmpStatus: "",
    Organization: '',
    Branch: "",
  });

  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    if (printFilterData.Organization && printFilterData.Organization.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: printFilterData.Organization.name,
      });
    }

    if (printFilterData.Employee && printFilterData.Employee.length !== 0) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: printFilterData.Employee.name,
      });
    }

    if (printFilterData.EmpStatus && printFilterData.EmpStatus.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: printFilterData.EmpStatus.name,
      });
    }

    if (printFilterData.Branch && printFilterData.Branch.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: printFilterData.Branch.name,
      });
    }

    if (printFilterData.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(printFilterData.FromDate),
      });
    }

    if (printFilterData.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(printFilterData.ToDate),
      });
    }

    if (searchData.IncludingEmployeesWithoutAttendanceRule) {
          highlights.push({
            label: intl.formatMessage(messages.includingEmployeesWithoutAttendanceRule),
            value: intl.formatMessage(payrollMessages.yes)

          });
        }

    if (searchData.RegType === 1) {
      highlights.push({
        label: intl.formatMessage(messages.SignInOnly),
        value: intl.formatMessage(payrollMessages.yes)
      });
    }

    if (searchData.RegType === 2) {
      highlights.push({
        label: intl.formatMessage(messages.SignOutOnly),
        value: intl.formatMessage(payrollMessages.yes)
      });
    }

    if (searchData.RegType === 3) {
      highlights.push({
        label: intl.formatMessage(messages.NotAttendanceForTheDay),
        value: intl.formatMessage(payrollMessages.yes)
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
      let formData = {
        FromDate: formateDate(searchData.FromDate),
        ToDate: formateDate(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
        RegType: searchData.RegType,
        chkNoAttRule: searchData.IncludingEmployeesWithoutAttendanceRule ,
          };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).RegisterInAndOutReportApi(formData);
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
        name: "shiftName",
        label: intl.formatMessage(messages.shift),
      },
      {
        name: "shiftDate",
        label: intl.formatMessage(messages.attendanceDate),
        options: getDateColumnOptions(
          intl.formatMessage(messages.attendanceDate),
          {
            minDateLabel: intl.formatMessage(payrollMessages.minDate),
            maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
          }
        ),
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
      name: "timeIn",
      label: intl.formatMessage(messages.inTime),
    },
    {
        name: "timeOut",
        label: intl.formatMessage(messages.outTime),
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

      setPrintFilterData((prev)=>({
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

      setPrintFilterData((prev)=>({
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
               DateError={DateError}
              setDateError={setDateError}
              company={searchData.BranchId}
              setPrintFilterData={setPrintFilterData}
            ></Search>
          </Grid>

          

          <Grid item md={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.IncludingEmployeesWithoutAttendanceRule}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            IncludingEmployeesWithoutAttendanceRule: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.includingEmployeesWithoutAttendanceRule)}
                  />
            </Grid>

            <Grid item md={12} lg={5}>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Sign In Only"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel 
                            value="Sign In Only" 
                            control={
                            <Radio 
                            onChange={(evt) => {
                                setsearchData((prev) => ({
                                  ...prev,
                                RegType: 1,
                                }));
                              }}
                            />} 
                            label={intl.formatMessage(messages.SignInOnly)}
                        />

                        <FormControlLabel 
                            value="Sign out only" 
                            control={
                            <Radio 
                            onChange={(evt) => {
                                setsearchData((prev) => ({
                                  ...prev,
                                  RegType: 2,
                                }));
                              }}
                            />} 
                            label={intl.formatMessage(messages.SignOutOnly)}
                        />

                        <FormControlLabel 
                        value="Not Attendance For The Day" 
                        control={
                        <Radio 
                        onChange={(evt) => {
                            setsearchData((prev) => ({
                              ...prev,
                            RegType: 3
                            }));
                          }}
                        />} 
                        label={intl.formatMessage(messages.NotAttendanceForTheDay)}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>

          <Grid item xs={12} >
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
          columns={columns}
          filterHighlights={filterHighlights}
        />
    </PayRollLoaderInForms>
  );
}

RegisterInAndOutReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(RegisterInAndOutReport);
