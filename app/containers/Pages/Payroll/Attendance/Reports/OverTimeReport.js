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
import GeneralListApis from "../../api/GeneralListApis";
import { formateDate, getAutoCompleteValue } from "../../helpers";

function OverTimeReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    IncludeLeavesAndShiftLeaves: false,
    type: 1,
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
        Type: searchData.type,
        isVac: searchData.IncludeLeavesAndShiftLeaves ,
          };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).OverTimeReportApi(formData);
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
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

  let columns = []

  if(searchData.type === 1)
  {
    columns = [
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
          name: "overtime",
          label: intl.formatMessage(messages.ExtraTime),
        },
        {
          name: "manulaOvertime",
          label: intl.formatMessage(messages.ManualExtraTime),
        },  
      ];
  }
   

  if(searchData.type === 2)
  {
    columns = [
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
          options: {
            ...(windowSize.innerWidth >= 768 && {  // this condation used to check screen size , in mobile screen hide this option (make columns freze)
                setCellProps: () => ({
                    style: {
                    whiteSpace: "nowrap",
                    position: "sticky",
                    ...(locale === "en" && { left: 0 }),
                    ...(locale === "ar" && { right: 0 }),
                    background: "white",
                    zIndex: 100,
                    paddingLeft: 20,
                    paddingRight: 20
                    }
                }),
            }),
            ...(windowSize.innerWidth >= 768 && {   // this condation used to check screen size , in mobile screen hide this option (make columns freze)
                setCellHeaderProps: () => ({
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
            }),
          },
        },
        {
          name: "employeeCode",
          label: intl.formatMessage(messages.EmpCode),
          options: {
            ...(windowSize.innerWidth >= 768 && {  // this condation used to check screen size , in mobile screen hide this option (make columns freze)
            setCellProps: () => ({
                style: {
                  whiteSpace: "nowrap",
                  position: "sticky",
                  ...(locale === "en" && { left: 150 }),
                  ...(locale === "ar" && { right: 100 }),
                  background: "white",
                  zIndex: 100,
                  paddingLeft: 20,
                  paddingRight: 20
                }
              }),
            }),
            ...(windowSize.innerWidth >= 768 && {   // this condation used to check screen size , in mobile screen hide this option (make columns freze)
              setCellHeaderProps: () => ({
                style: {
                  whiteSpace: "nowrap",
                  position: "sticky",
                  ...(locale === "en" && { left: 150 }),
                  ...(locale === "ar" && { right: 100 }),
                  background: "white",
                  zIndex: 101,
                  paddingLeft: 20,
                  paddingRight: 20
                }
              })
            }),
          },
        },
        {
          name: "employeeName",
          label: intl.formatMessage(messages.employeeName),
          options: {
            ...(windowSize.innerWidth >= 768 && {   // this condation used to check screen size , in mobile screen hide this option (make columns freze)
            setCellProps: () => ({
                style: {
                  whiteSpace: "nowrap",
                  position: "sticky",
                  ...(locale === "en" && { left: 250 }),
                  ...(locale === "ar" && { right: 200 }),
                  background: "white",
                  zIndex: 100,
                  paddingLeft: 20,
                  paddingRight: 20
                }
              }),
            }),
            ...(windowSize.innerWidth >= 768 && {   // this condation used to check screen size , in mobile screen hide this option (make columns freze)
              setCellHeaderProps: () => ({
                style: {
                  whiteSpace: "nowrap",
                  position: "sticky",
                  ...(locale === "en" && { left: 250 }),
                  ...(locale === "ar" && { right: 200 }),
                  background: "white",
                  zIndex: 101,
                  paddingLeft: 20,
                  paddingRight: 20
                }
              })
            }),
          },
        },
        {
          name: "day1",
          label: intl.formatMessage(messages.Day1),
        },
        {
            name: "day2",
            label: intl.formatMessage(messages.Day2),
          },
          {
            name: "day3",
            label: intl.formatMessage(messages.Day3),
          },
          {
            name: "day4",
          label: intl.formatMessage(messages.Day4),
          },
          {
            name: "day5",
          label: intl.formatMessage(messages.day5),
          },
          {
            name: "day6",
              label: intl.formatMessage(messages.Day6),
          },
          {
            name: "day7",
          label: intl.formatMessage(messages.Day7),
          },
          {
            name: "day8",
          label: intl.formatMessage(messages.Day8),
          },
          {
            name: "day9",
          label: intl.formatMessage(messages.Day9),
          },
          {
            name: "day10",
          label: intl.formatMessage(messages.Day10),
          },
          {
            name: "day11",
              label: intl.formatMessage(messages.Day11),
          },
          {
            name: "day12",
              label: intl.formatMessage(messages.Day12),
          },
          {
            name: "day13",
          label: intl.formatMessage(messages.Day13),
          },
          {
            name: "day14",
          label: intl.formatMessage(messages.Day14),
          },
          {
            name: "day15",
              label: intl.formatMessage(messages.Day15),
          },
          {
            name: "day16",
          label: intl.formatMessage(messages.Day16),
          },
          {
            name: "day17",
              label: intl.formatMessage(messages.Day17),
          },
          {
            name: "day18",
          label: intl.formatMessage(messages.Day18),
          },
          {
            name: "day19",
              label: intl.formatMessage(messages.Day19),
          },
          {
            name: "day20",
              label: intl.formatMessage(messages.Day20),
          },
          {
            name: "day21",
              label: intl.formatMessage(messages.Day21),
          },
          {
            name: "day22",
          label: intl.formatMessage(messages.Day22),
          },
          {
            name: "day23",
              label: intl.formatMessage(messages.Day23),
          },
          {
            name: "day24",
              label: intl.formatMessage(messages.Day24),
          },
          {
            name: "day25",
          label: intl.formatMessage(messages.Day25),
          },
          {
            name: "day26",
          label: intl.formatMessage(messages.Day26),
          },
          {
            name: "day27",
              label: intl.formatMessage(messages.Day27),
          },
          {
            name: "day28",
          label: intl.formatMessage(messages.Day28),
          },
          {
            name: "day29",
          label: intl.formatMessage(messages.Day29),
          },
          {
            name: "day30",
          label: intl.formatMessage(messages.Day30),
          },
          {
            name: "day31",
          label: intl.formatMessage(messages.Day31),
          },
      ];
  }


  if(searchData.type === 3)
  {
    columns = [
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
          name: "organizationId",
          label: "brCode",
        //   label: intl.formatMessage(messages.EmpCode),
        },
        {
          name: "overtime",
          label: "val1",
        //   label: intl.formatMessage(messages.employeeName),
        },
        {
          name: "manulaOvertime",
          label: "overTimeVal",
        //   label: intl.formatMessage(messages.AttendanceDate),
        },   
      ];
  }



 // used to check screen size 
  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

 // used to check screen size 
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
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
            ></Search>
          </Grid>

          <Grid item md={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.IncludeLeavesAndShiftLeaves}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            IncludeLeavesAndShiftLeaves: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.IncludeLeavesAndShiftLeaves)}
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
                            value="per Employee"
                            control={
                            <Radio 
                            onChange={(evt) => {
                                setsearchData((prev) => ({
                                  ...prev,
                                  type: 1,
                                }));
                                setdata([])
                              }}
                            />} 
                            label={intl.formatMessage(messages.perEmployee)}
                            checked={searchData.type === 1 ? true : false }
                        />

                        <FormControlLabel 
                            value="per Employee/Day"
                            control={
                            <Radio 
                            onChange={(evt) => {
                                setsearchData((prev) => ({
                                  ...prev,
                                  type: 2,
                                }));
                                setdata([])
                              }}
                            />} 
                            label={intl.formatMessage(messages.perEmployeeDay)}
                            checked={searchData.type === 2 ? true : false }
                        />

                        <FormControlLabel 
                        value="per Department"
                        control={
                        <Radio 
                        onChange={(evt) => {
                            setsearchData((prev) => ({
                              ...prev,
                              type: 3
                            }));
                            setdata([])
                          }}
                        />} 
                        label={intl.formatMessage(messages.PerDepartment)}
                        checked={searchData.type === 3 ? true : false }
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

OverTimeReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(OverTimeReport);
