import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
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
import useStyles from "../../Style";
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

function OverTimeReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
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
          },
        },
        {
          name: "organizationName",
          label: intl.formatMessage(messages.orgName),
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
          label: intl.formatMessage(messages.employeeName),
          options: {
            filter: true,
          },
        },
        {
          name: "overtime",
          label: intl.formatMessage(messages.ExtraTime),
          options: {
            filter: true,
          },
        },
        {
          name: "manulaOvertime",
          label: intl.formatMessage(messages.ManualExtraTime),
          options: {
            filter: true,
          },
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
          },
        },
        {
          name: "organizationName",
          label: intl.formatMessage(messages.orgName),
          options: {
            filter: true,
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
            filter: true,
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
            filter: true,
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
          options: {
            filter: true,
          },
        },
        {
            name: "day2",
            label: intl.formatMessage(messages.Day2),
            options: {
              filter: true,
            },
          },
          {
            name: "day3",
            label: intl.formatMessage(messages.Day3),
            options: {
              filter: true,
            },
          },
          {
            name: "day4",
          label: intl.formatMessage(messages.Day4),
            options: {
              filter: true,
            },
          },
          {
            name: "day5",
          label: intl.formatMessage(messages.day5),
            options: {
              filter: true,
            },
          },
          {
            name: "day6",
              label: intl.formatMessage(messages.Day6),
            options: {
              filter: true,
            },
          },
          {
            name: "day7",
          label: intl.formatMessage(messages.Day7),
            options: {
              filter: true,
            },
          },
          {
            name: "day8",
          label: intl.formatMessage(messages.Day8),
            options: {
              filter: true,
            },
          },
          {
            name: "day9",
          label: intl.formatMessage(messages.Day9),
            options: {
              filter: true,
            },
          },
          {
            name: "day10",
          label: intl.formatMessage(messages.Day10),
            options: {
              filter: true,
            },
          },
          {
            name: "day11",
              label: intl.formatMessage(messages.Day11),
            options: {
              filter: true,
            },
          },
          {
            name: "day12",
              label: intl.formatMessage(messages.Day12),
            options: {
              filter: true,
            },
          },
          {
            name: "day13",
          label: intl.formatMessage(messages.Day13),
            options: {
              filter: true,
            },
          },
          {
            name: "day14",
          label: intl.formatMessage(messages.Day14),
            options: {
              filter: true,
            },
          },
          {
            name: "day15",
              label: intl.formatMessage(messages.Day15),
            options: {
              filter: true,
            },
          },
          {
            name: "day16",
          label: intl.formatMessage(messages.Day16),
            options: {
              filter: true,
            },
          },
          {
            name: "day17",
              label: intl.formatMessage(messages.Day17),
            options: {
              filter: true,
            },
          },
          {
            name: "day18",
          label: intl.formatMessage(messages.Day18),
            options: {
              filter: true,
            },
          },
          {
            name: "day19",
              label: intl.formatMessage(messages.Day19),
            options: {
              filter: true,
            },
          },
          {
            name: "day20",
              label: intl.formatMessage(messages.Day20),
            options: {
              filter: true,
            },
          },
          {
            name: "day21",
              label: intl.formatMessage(messages.Day21),
            options: {
              filter: true,
            },
          },
          {
            name: "day22",
          label: intl.formatMessage(messages.Day22),
            options: {
              filter: true,
            },
          },
          {
            name: "day23",
              label: intl.formatMessage(messages.Day23),
            options: {
              filter: true,
            },
          },
          {
            name: "day24",
              label: intl.formatMessage(messages.Day24),
            options: {
              filter: true,
            },
          },
          {
            name: "day25",
          label: intl.formatMessage(messages.Day25),
            options: {
              filter: true,
            },
          },
          {
            name: "day26",
          label: intl.formatMessage(messages.Day26),
            options: {
              filter: true,
            },
          },
          {
            name: "day27",
              label: intl.formatMessage(messages.Day27),
            options: {
              filter: true,
            },
          },
          {
            name: "day28",
          label: intl.formatMessage(messages.Day28),
            options: {
              filter: true,
            },
          },
          {
            name: "day29",
          label: intl.formatMessage(messages.Day29),
            options: {
              filter: true,
            },
          },
          {
            name: "day30",
          label: intl.formatMessage(messages.Day30),
            options: {
              filter: true,
            },
          },
          {
            name: "day31",
          label: intl.formatMessage(messages.Day31),
            options: {
              filter: true,
            },
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
          },
        },
        {
          name: "organizationName",
          label: intl.formatMessage(messages.orgName),
          options: {
            filter: true,
          },
        },
        {
          name: "organizationId",
          label: "brCode",
        //   label: intl.formatMessage(messages.EmpCode),
          options: {
            filter: true,
          },
        },
        {
          name: "overtime",
          label: "val1",
        //   label: intl.formatMessage(messages.employeeName),
          options: {
            filter: true,
          },
        },
        {
          name: "manulaOvertime",
          label: "overTimeVal",
        //   label: intl.formatMessage(messages.AttendanceDate),
          options: {
            filter: true,
          },
        },   
      ];
  }

  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
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
      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </PayRollLoader>
  );
}

OverTimeReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(OverTimeReport);
