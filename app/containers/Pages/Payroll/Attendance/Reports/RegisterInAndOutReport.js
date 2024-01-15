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
import { format } from "date-fns";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

function RegisterInAndOutReport(props) {
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
    IncludingEmployeesWithoutAttendanceRule: false,
    RegType: 1,
  });


  const handleSearch = async (e) => {
    try {
      setIsLoading(true);
      let formData = {
        FromDate: searchData.FromDate,
        ToDate: searchData.ToDate,
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
    } catch (err) {
    } finally {
      setIsLoading(false);
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
        name: "shiftName",
        label: intl.formatMessage(messages.shift),
        options: {
          filter: true,
        },
      },
      {
        name: "shiftDate",
        label: intl.formatMessage(messages.AttendanceDate),
        options: {
          filter: true,
          customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
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
      name: "timeIn",
      label: intl.formatMessage(messages.inTime),
      options: {
        filter: true,
      },
    },
    {
        name: "timeOut",
        label: intl.formatMessage(messages.outTime),
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

RegisterInAndOutReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(RegisterInAndOutReport);
