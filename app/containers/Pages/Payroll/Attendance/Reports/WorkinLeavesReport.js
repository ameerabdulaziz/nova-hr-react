import React, { useCallback, useMemo, useState } from "react";
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
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import PayrollTable from "../../Component/PayrollTable";

function WorkinLeavesReport(props) {
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
    details: false,
    GroupByDepartmentSection: true,
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
        Type: searchData.details ? 1 : 2,
          };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).WorkinLeavesReportApi(formData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const isApiDataContain = useCallback(key => {
    return Boolean(data.some((obj) => Object.keys(obj).includes(key)));
  }, [data]);

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
    // check if api data contain ( employeeCode ) to show the column in the table
    {
        name: "employeeCode",
            label: intl.formatMessage(messages.EmpCode),
              options: {
                display: isApiDataContain("employeeCode"),
                print: isApiDataContain("employeeCode"),
                download: isApiDataContain("employeeCode"),
              },
    }
 ,
     // check if api data contain ( employeeName ) to show the column in the table
    {
        name: "employeeName",
          label: intl.formatMessage(messages.employeeName),
          options: {
            display: isApiDataContain("employeeName"),
            print: isApiDataContain("employeeName"),
            download: isApiDataContain("employeeName"),
          },
    }
   ,
    {
      name: "val",
      label: intl.formatMessage(messages.accruedLeaveHours),
    },
    {
      name: "days",
      label: intl.formatMessage(messages.byDays),
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

            <Grid item md={3} lg={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.details}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            details: evt.target.checked,
                            GroupByDepartmentSection: false
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.details)}
                  />
            </Grid>

          
            <Grid item md={6} lg={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.GroupByDepartmentSection}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            details: false,
                            GroupByDepartmentSection: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.GroupByDepartmentSection)}
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

WorkinLeavesReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(WorkinLeavesReport);
