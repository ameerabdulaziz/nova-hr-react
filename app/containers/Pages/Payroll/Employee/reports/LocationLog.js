import React, { useEffect, useState, useCallback } from "react";
import ApiData from "../api/EmployeeReportsApiData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import { formateDate } from "../../helpers";
import PayrollTable from "../../Component/PayrollTable";

import { toast } from 'react-hot-toast';

function LocationLog(props) {
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
        EmpStatusId: searchData.EmpStatusId,
        BranchId: searchData.BranchId ? searchData.BranchId : ""
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).LocationLogReportApi(formData);
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
        filter: false,
        print: false,
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
        name: "organizationName",
        label: intl.formatMessage(messages.organization),
        options: {
          filter: true,
        },
      },
      {
        name: "fakeAddress",
        label: intl.formatMessage(messages.fakeAddress),
        options: {
          filter: true,
        },
      },
      {
        name: "jobName",
        label: intl.formatMessage(messages.jobName),
        options: {
          filter: true,
        },
      },
    {
      name: "insDate",
      label: intl.formatMessage(messages.insDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
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

LocationLog.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(LocationLog);
