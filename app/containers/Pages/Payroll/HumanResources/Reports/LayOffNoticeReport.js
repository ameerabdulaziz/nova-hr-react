import React, { useEffect, useState, useCallback } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/LayOffNoticeData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Backdrop,
  CircularProgress,
  Box,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import Search from "../../Component/Search";

function LayOffNoticeReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [fromdate, setfromate] = useState(null);
  const [todate, settodate] = useState(null);
  const [employee, setemployee] = useState(null);
  const [Organization, setOrganization] = useState("");
  const [EmployeeStatus, setEmployeeStatus] = useState("");
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((name, value) => {
    if (name == "fromDate")
      setfromate(value == null ? null : format(new Date(value), "yyyy-MM-dd"));
    if (name == "toDate")
      settodate(value == null ? null : format(new Date(value), "yyyy-MM-dd"));
    if (name == "employeeId") setemployee(value);

    if (name == "organizationId") setOrganization(value);

    if (name == "statusId") setEmployeeStatus(value);
  }, []);

  const handleSearch = async (e) => {
    try {
      setIsLoading(true);
      var formData = {
        FromDate: fromdate,
        ToDate: todate,
        EmployeeId: employee,
        OrganizationId: Organization,
        EmployeeStatusId: EmployeeStatus,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      const dataApi = await ApiData(locale).GetReport(formData);
      setdata(dataApi);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
      },
    },
    {
      name: "noticeDate",
      label: <FormattedMessage {...messages["date"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
      },
    },
    {
      name: "employeeName",
      label: <FormattedMessage {...messages["employeeName"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "reason",
      label: <FormattedMessage {...messages["reason"]} />,
      options: {
        filter: true,
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 10,
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
    <Box
      sx={{
        zIndex: 100,
        position: "relative",
      }}
    >
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Backdrop
          sx={{
            color: "primary.main",
            zIndex: 10,
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.69)",
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
              handleChange={handleChange}
              fromdate={fromdate}
              todate={todate}
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
    </Box>
  );
}

LayOffNoticeReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(LayOffNoticeReport);
