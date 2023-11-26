import React, { useState } from "react";
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
import { toast } from "react-hot-toast";

function AttendanceRatiosStatementsReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
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


  const handleSearch = async (e) => {
    if(searchData.FromDate !== null && searchData.ToDate !== null)
    {
    try {
      setIsLoading(true);
      let formData = {
        FromDate: searchData.FromDate,
        ToDate: searchData.ToDate,
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
        name: "mDays",
        label: intl.formatMessage(messages.MonthWorkDays),
        options: {
          filter: true,
        },
      },
      {
        name: "hoursPerDay",
        label: intl.formatMessage(messages.shiftHours),
        options: {
          filter: true,
        },
      },
      {
        name: "monthHours",
        label: intl.formatMessage(messages.MonthWorkHours),
        options: {
          filter: true,
        },
      },
      {
        name: "offVac",
        label: intl.formatMessage(messages.monthOffLeave),
        options: {
          filter: true,
        },
      },
      {
        name: "reqworKDa",
        label: intl.formatMessage(messages.requiredDays),
        options: {
          filter: true,
        },
      },
      {
        name: "reqWorkH",
        label: intl.formatMessage(messages.requiredWorkH),
        options: {
          filter: true,
        },
      },
      {
        name: "notPayedVac",
        label: intl.formatMessage(messages.notPayedLeave),
        options: {
          filter: true,
        },
      },
      {
        name: "annualVac",
        label: intl.formatMessage(messages.annualLeave),
        options: {
          filter: true,
        },
      },
      {
        name: "repVac",
        label: intl.formatMessage(messages.AccruedLeave),
        options: {
          filter: true,
        },
      },
      {
        name: "seekVac",
        label: intl.formatMessage(messages.sickLeave),
        options: {
          filter: true,
        },
      },
      {
        name: "specVac",
        label: intl.formatMessage(messages.specialLeave),
        options: {
          filter: true,
        },
      },
      {
        name: "vac3arda",
        label: intl.formatMessage(messages.casualLeave),
        options: {
          filter: true,
        },
      },
      {
        name: "absence",
        label: intl.formatMessage(messages.absence),
        options: {
          filter: true,
        },
      },
      {
        name: "vacHours",
        label: intl.formatMessage(messages.leaveHours),
        options: {
          filter: true,
        },
      },
      {
        name: "lessTime",
        label: intl.formatMessage(messages.lateHours),
        options: {
          filter: true,
        },
      },
      {
        name: "mission",
        label: intl.formatMessage(messages.mission),
        options: {
          filter: true,
        },
      },
      {
        name: "workingHo",
        label: intl.formatMessage(messages.actWorkHours),
        options: {
          filter: true,
        },
      },
      {
        name: "ratio1",
        label: intl.formatMessage(messages.percentage),
        options: {
          filter: true,
        },
      },
      {
        name: "totWorkH",
        label: intl.formatMessage(messages.workLeaveHours),
        options: {
          filter: true,
        },
      },
      {
        name: "ratio2",
        label: intl.formatMessage(messages.withLeavePerc),
        options: {
          filter: true,
        },
      },
      {
        name: "deduct",
        label: intl.formatMessage(messages.isDeducted),
        options: {
          filter: true,
        },
      },
  ];
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
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
               setsearchData={setsearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
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

AttendanceRatiosStatementsReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(AttendanceRatiosStatementsReport);
