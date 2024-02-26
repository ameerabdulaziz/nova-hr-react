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
import { format } from "date-fns";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import { toast } from "react-hot-toast";
import PayrollTable from "../../Component/PayrollTable";
import { getCheckboxIcon } from "../../helpers";

function OverTimeDetailsReport(props) {
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
    all: false,
    LeavesAndWeekendOnly: false,
    workDavsOnly: false,
    updatedOnly: false,
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
        ChkUpdatedOnly: searchData.updatedOnly ,
        WorkOnlyChk: searchData.workDavsOnly ,
        VacOnlyChk: searchData.LeavesAndWeekendOnly ,
        all: searchData.all ? true: "",
          };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).OverTimeDetailsReport(formData);
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
      name: "shiftDate",
      label: intl.formatMessage(messages.AttendanceDate),
    },
    {
      name: "overTime",
      label: intl.formatMessage(messages.overTime),
    },
    {
      name: "vac",
      label: intl.formatMessage(messages.leave),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    // {
    //   name: "vac",
    //   label: intl.formatMessage(messages.leave),
    //   options: {
    //     filter: true,
    //   },
    // },
    {
      name: "overTimeTotal",
      label: intl.formatMessage(messages.modifiedOvertime),
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

          <Grid item md={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.all}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            all: evt.target.checked,
                            LeavesAndWeekendOnly: false,
                            workDavsOnly: false,
                            updatedOnly: false
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.All)}
                  />
            </Grid>

            <Grid item md={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.LeavesAndWeekendOnly}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            all: false,
                            LeavesAndWeekendOnly: evt.target.checked,
                            workDavsOnly: false,
                            updatedOnly: false
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.LeavesAndWeekendOnly)}
                  />
            </Grid>

          
            <Grid item md={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.workDavsOnly}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            all: false,
                            LeavesAndWeekendOnly: false,
                            workDavsOnly: evt.target.checked,
                            updatedOnly: false
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.workDevsOnly)}
                  />
            </Grid>

            <Grid item md={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.updatedOnly}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            all: false,
                            LeavesAndWeekendOnly: false,
                            GovIns: false,
                            updatedOnly: evt.target.checked
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.UpdatedOnly)}
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

OverTimeDetailsReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(OverTimeDetailsReport);
