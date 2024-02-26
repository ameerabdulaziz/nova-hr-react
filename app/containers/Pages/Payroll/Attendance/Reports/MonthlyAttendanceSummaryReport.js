import React, { useState } from "react";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import PayrollTable from "../../Component/PayrollTable";

function MonthlyAttendanceSummaryReport(props) {
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
      let formData = {
        FromDate: dateFormatFun(searchData.FromDate),
        ToDate: dateFormatFun(searchData.ToDate),
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
        display: false,
        print: false,
        download: false,
      },
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
        name: "WrDays",
        label: intl.formatMessage(messages.WorkingDays),
      },
      {
        name: "lateNotAuth",
        label: intl.formatMessage(messages.lateHoursNotAuth),
      },
      {
        name: "lateAuth",
        label: intl.formatMessage(messages.lateHoursAuth),
      },
      {
        name: "earlyLeaveNotAuth",
        label: intl.formatMessage(messages.leaveEarlyNotAuth),
      },
      {
        name: "earlyLeaveAuth",
        label: intl.formatMessage(messages.leaveEarlyAuth),
      },
    {
        name: "breakTime",
        label: intl.formatMessage(messages.brackTime),
      },
      {
        name: "mFullDay",
        label: intl.formatMessage(messages.mission),
      },
      {
        name: "absent",
        label: intl.formatMessage(messages.absence),
      },
      {
        name: "overTime",
        label: intl.formatMessage(messages.OverTime),
      },
      {
        name: "weekEndOver",
        label: intl.formatMessage(messages.weekendOverTime),
      },
      {
        name: "holidayOver",
        label: intl.formatMessage(messages.officialVacationOverTime),
      },
      {
        name: "organizationName",
        label: intl.formatMessage(messages.orgName),
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

MonthlyAttendanceSummaryReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(MonthlyAttendanceSummaryReport);
