import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
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
import useStyles from "../../Style";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

function ContinuousAbsenceReport(props) {
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
    DaysCount: "",
    employeesWithAttendanceRule: false,
  });


  const handleSearch = async (e) => {
    if(searchData.FromDate !== null && searchData.ToDate !== null)
    {
    try {
      setIsLoading(true);
      let formData = {
        FromDate: searchData.FromDate,
        ToDate: searchData.ToDate,
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
      name: "dCount",
      label: intl.formatMessage(messages.daysCount),
      options: {
        filter: true,
      },
    },
    {
      name: "fdate",
      label: intl.formatMessage(messages.fromDate),
      options: {
        filter: true,
        customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
      },
    },
    {
      name: "todate",
      label: intl.formatMessage(messages.toDate),
      options: {
        filter: true,
        customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
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

ContinuousAbsenceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(ContinuousAbsenceReport);
