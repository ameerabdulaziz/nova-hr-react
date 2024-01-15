import React, { useEffect, useState, useCallback } from "react";
import MUIDataTable from "mui-datatables";
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
  

  const handleSearch = async (e) => {

    try {
      setIsLoading(true);
      let formData = {
        FromDate: searchData.FromDate,
        ToDate: searchData.ToDate,
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
            filter: false,
            display: false
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
            name: "date",
            label: intl.formatMessage(messages.date),
            options: {
              filter: true,
              customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
            },
          },
          {
            name: "timeIn",
            label: intl.formatMessage(messages.signIn),
            options: {
              filter: true,
            },
          },
          {
            name: "timeout",
            label: intl.formatMessage(messages.signOut),
            options: {
              filter: true,
            },
          },
          {
            name: "hourNo",
            label: intl.formatMessage(messages.totalWorkHours),
            options: {
              filter: true,
            },
          },
        ])
    }
  },[data])



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
      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
        />
      </div>
      )}
    </PayRollLoader>
  );
}

WorkinHoursByTimeReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(WorkinHoursByTimeReport);
