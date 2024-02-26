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
import Payrollmessages from "../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import PayrollTable from "../../Component/PayrollTable";

function OverTimeReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
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
    type: 1
  });


  const [DateError, setDateError] = useState({});


  // used to reformat date before send it to api
  const dateFormatFun = (date) => {
      return  date ? format(new Date(date), "yyyy-MM-dd") : ""
   }


  const handleSearch = async (e) => {

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }


    try {
      setIsLoading(true);
      var formData = {
        FromDate: dateFormatFun(searchData.FromDate),
        ToDate: dateFormatFun(searchData.ToDate),
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
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };


  let columns = []

  if(searchData.type === 1)
  {
    columns = [
        {
          name: "id",
            label: intl.formatMessage(Payrollmessages.id),
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
            label: intl.formatMessage(Payrollmessages.id),
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
            label: intl.formatMessage(Payrollmessages.id),
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

        <PayrollTable
          title=""
          data={data}
          columns={columns}
        />
    </PayRollLoader>
  );
}

OverTimeReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(OverTimeReport);
