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

function followStaffContracts(props) {
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
      var formData = {
        FromDate: searchData.FromDate,
        ToDate: searchData.ToDate,
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmpStatusId: searchData.EmpStatusId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).GetReport(formData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

 

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
        display: false,
        print: false,
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
      name: "contractStartDate",
      label: intl.formatMessage(messages.contractStartDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: "contractEndDate",
      label: intl.formatMessage(messages.contractEndDate),
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

followStaffContracts.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(followStaffContracts);
