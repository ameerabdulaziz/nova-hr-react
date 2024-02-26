import React, { useState } from "react";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import PayrollTable from "../../Component/PayrollTable";

function ContinuousAbsenceReport(props) {
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
    DaysCount: "",
    employeesWithAttendanceRule: false,
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
        dayscount: searchData.DaysCount,
        Attrulechk: searchData.employeesWithAttendanceRule ,
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
          };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).ContinuousAbsenceReportApi(formData);
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
      name: "dCount",
      label: intl.formatMessage(messages.daysCount),
    },
    {
      name: "fdate",
      label: intl.formatMessage(messages.fromDate),
    },
    {
      name: "todate",
      label: intl.formatMessage(messages.toDate),
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

          <Grid item md={2}>
                <TextField 
                id="outlined-basic" 
                label="Days Count" 
                variant="outlined" 
                sx={{width: "100%"}} 
                onChange={(evt) => {
                  setsearchData((prev) => ({
                    ...prev,
                    DaysCount: evt.target.value,
                  }));
                }}
                autoComplete='off'
                />
            </Grid>

            <Grid item md={4} lg={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.employeesWithAttendanceRule}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            employeesWithAttendanceRule: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.EmployeesWithAttendenceRules)}
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

        <PayrollTable
          title=""
          data={data}
          columns={columns}
        />
    </PayRollLoader>
  );
}

ContinuousAbsenceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(ContinuousAbsenceReport);
