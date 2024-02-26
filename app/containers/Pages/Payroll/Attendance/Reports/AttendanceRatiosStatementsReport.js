import React, { useState } from "react";
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
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import PayrollTable from "../../Component/PayrollTable";

function AttendanceRatiosStatementsReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    DeductedEmployeeOnly: false,
    Type: 1,
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


    if(searchData.FromDate !== null && searchData.ToDate !== null)
    {
    try {
      setIsLoading(true);
      let formData = {
        FromDate: dateFormatFun(searchData.FromDate),
        ToDate: dateFormatFun(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
        isDeducte: searchData.DeductedEmployeeOnly ,
        Type: searchData.Type,
          };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });


      const dataApi = await ApiData(locale).AttendanceRatiosStatementsReportApi(formData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
    }
    else
    {
        toast.error(intl.formatMessage(messages.dateErrorMes));
    }
  };


  const columns = [
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
        name: "mDays",
        label: intl.formatMessage(messages.MonthWorkDays),
      },
      {
        name: "hoursPerDay",
        label: intl.formatMessage(messages.shiftHours),
      },
      {
        name: "monthHours",
        label: intl.formatMessage(messages.MonthWorkHours),
      },
      {
        name: "offVac",
        label: intl.formatMessage(messages.monthOffLeave),
      },
      {
        name: "reqworKDa",
        label: intl.formatMessage(messages.requiredDays),
      },
      {
        name: "reqWorkH",
        label: intl.formatMessage(messages.requiredWorkH),
      },
      {
        name: "notPayedVac",
        label: intl.formatMessage(messages.notPayedLeave),
      },
      {
        name: "annualVac",
        label: intl.formatMessage(messages.annualLeave),
      },
      {
        name: "repVac",
        label: intl.formatMessage(messages.AccruedLeave),
      },
      {
        name: "seekVac",
        label: intl.formatMessage(messages.sickLeave),
      },
      {
        name: "specVac",
        label: intl.formatMessage(messages.specialLeave),
      },
      {
        name: "vac3arda",
        label: intl.formatMessage(messages.casualLeave),
      },
      {
        name: "absence",
        label: intl.formatMessage(messages.absence),
      },
      {
        name: "vacHours",
        label: intl.formatMessage(messages.leaveHours),
      },
      {
        name: "lessTime",
        label: intl.formatMessage(messages.lateHours),
      },
      {
        name: "mission",
        label: intl.formatMessage(messages.mission),
      },
      {
        name: "workingHo",
        label: intl.formatMessage(messages.actWorkHours),
      },
      {
        name: "ratio1",
        label: intl.formatMessage(messages.percentage),
      },
      {
        name: "totWorkH",
        label: intl.formatMessage(messages.workLeaveHours),
      },
      {
        name: "ratio2",
        label: intl.formatMessage(messages.withLeavePerc),
      },
      {
        name: "deduct",
        label: intl.formatMessage(messages.isDeducted),
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

          

          <Grid item md={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.DeductedEmployeeOnly}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            DeductedEmployeeOnly: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.deductedEmployeeOnly)}
                  />
            </Grid>

            <Grid item md={12} lg={4}>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Salary Deduction"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel 
                            value="Salary Deduction" 
                            control={
                            <Radio 
                            onChange={(evt) => {
                                setsearchData((prev) => ({
                                  ...prev,
                                  Type: 1,
                                }));
                              }}
                            />} 
                            label={intl.formatMessage(messages.isDeducted)}
                        />

                        <FormControlLabel 
                            value="Days Deduction" 
                            control={
                            <Radio 
                            onChange={(evt) => {
                                setsearchData((prev) => ({
                                  ...prev,
                                  Type: 2,
                                }));
                              }}
                            />} 
                            label={intl.formatMessage(messages.DaysDeduction)}
                        />

                        <FormControlLabel 
                        value="Company Ratio" 
                        control={
                        <Radio 
                        onChange={(evt) => {
                            setsearchData((prev) => ({
                              ...prev,
                              Type: 3
                            }));
                          }}
                        />} 
                        label={intl.formatMessage(messages.CompanyRatio)}
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

AttendanceRatiosStatementsReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(AttendanceRatiosStatementsReport);
