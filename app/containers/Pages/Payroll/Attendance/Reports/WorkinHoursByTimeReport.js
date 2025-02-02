import React, { useEffect, useState, useCallback } from "react";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import { format } from "date-fns";
import style from '../../../../../styles/styles.scss'
import { toast } from "react-hot-toast";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { getDateColumnOptions } from "../../Component/PayrollTable/utils.payroll-table";


function WorkinHoursByTimeReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState([]);

  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    FromTime: "",
    ToTime: ""
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
        FromTime: searchData.FromTime,
        ToTime:  searchData.ToTime
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).WorkinHoursByTimeReportApi(formData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }

  };


  useEffect(()=>{
    if(data.length !== 0)
    {
      setColumns([
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
            name: "date",
            label: intl.formatMessage(messages.date),
            options: getDateColumnOptions(
              intl.formatMessage(messages.date),
              {
                minDateLabel: intl.formatMessage(payrollMessages.minDate),
                maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
              }
            ),
          },
          {
            name: "timeIn",
            label: intl.formatMessage(messages.signIn),
          },
          {
            name: "timeout",
            label: intl.formatMessage(messages.signOut),
          },
          {
            name: "hourNo",
            label: intl.formatMessage(messages.totalWorkHours),
          },
        ])
    }
  },[data])

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
              <TextField
                id="startTime"
                name="startTime"
                value={searchData.FromTime}
                label={intl.formatMessage(messages.startTime)}
                type="time"
                onChange={(evt) => {
                    setsearchData((prev) => ({
                      ...prev,
                      FromTime: evt.target.value,
                    }));
                  }}
                className={`${classes.field} ${locale === "ar" ? style.timeStyle : null } `}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="ToTime"
                name="ToTime"
                value={searchData.ToTime}
                label={intl.formatMessage(messages.endTime)}
                type="time"
                onChange={(evt) => {
                    setsearchData((prev) => ({
                      ...prev,
                      ToTime: evt.target.value,
                    }));
                  }}
                  className={`${classes.field} ${locale === "ar" ? style.timeStyle : null } `}
                InputLabelProps={{
                  shrink: true,
                }}
              />
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
      { data.length !== 0 && (
        <SimplifiedPayrollTable
          title=""
          data={data}
          columns={columns}
        />
      )}
    </PayRollLoader>
  );
}

WorkinHoursByTimeReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(WorkinHoursByTimeReport);
