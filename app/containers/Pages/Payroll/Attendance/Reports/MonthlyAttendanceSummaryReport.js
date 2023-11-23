import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";

function MonthlyAttendanceSummaryReport(props) {
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
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      const dataApi = await ApiData(locale).MonthlyAttendanceSummaryReportApi(formData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }

  };


  const columns = [
    {
      name: "employeeId",
      label: intl.formatMessage(Payrollmessages.id),
      options: {
        filter: false,
        display: false
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
        name: "WrDays",
        label: intl.formatMessage(messages.WorkingDays),
        options: {
          filter: true,
        },
      },
      {
        name: "lateNotAuth",
        label: intl.formatMessage(messages.lateHoursNotAuth),
        options: {
          filter: true,
        },
      },
      {
        name: "lateAuth",
        label: intl.formatMessage(messages.lateHoursAuth),
        options: {
          filter: true,
        },
      },
      {
        name: "earlyLeaveNotAuth",
        label: intl.formatMessage(messages.leaveEarlyNotAuth),
        options: {
          filter: true,
        },
      },
      {
        name: "earlyLeaveAuth",
        label: intl.formatMessage(messages.leaveEarlyAuth),
        options: {
          filter: true,
        },
      },
    {
        name: "breakTime",
        label: intl.formatMessage(messages.brackTime),
        options: {
          filter: true,
        },
      },
      {
        name: "mFullDay",
        label: intl.formatMessage(messages.mission),
        options: {
          filter: true,
        },
      },
      {
        name: "absent",
        label: intl.formatMessage(messages.absence),
        options: {
          filter: true,
        },
      },
      {
        name: "overTime",
        label: intl.formatMessage(messages.OverTime),
        options: {
          filter: true,
        },
      },
      {
        name: "weekEndOver",
        label: intl.formatMessage(messages.weekendOverTime),
        options: {
          filter: true,
        },
      },
      {
        name: "holidayOver",
        label: intl.formatMessage(messages.officialVacationOverTime),
        options: {
          filter: true,
        },
      },
      {
        name: "organizationName",
        label: intl.formatMessage(messages.orgName),
        options: {
          filter: true,
        },
      },
  ];
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    selectableRows: "none",
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
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

MonthlyAttendanceSummaryReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(MonthlyAttendanceSummaryReport);
