import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/PayrollReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
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

function LoanReport(props) {
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
    EndedLoans: false,
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
        loanEnded: searchData.EndedLoans,
          };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });


      const dataApi = await ApiData(locale).LoanReportApi(formData);
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
        name: "jobName",
        label: intl.formatMessage(messages.job),
        options: {
          filter: true,
        },
      },
      {
        name: "transDate",
        label: intl.formatMessage(messages.date),
        options: {
          filter: true,
          customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
        },
      },
      {
        name: "nativeTotalValue",
        label: intl.formatMessage(messages.BasicLoan),
        options: {
          filter: true,
        },
      },
      {
        name: "totalvalue",
        label: intl.formatMessage(messages.totalValue),
        options: {
          filter: true,
        },
      },
      {
        name: "paysNo",
        label: intl.formatMessage(messages.paysNo),
        options: {
          filter: true,
        },
      },
      {
        name: "payvalue",
        label: intl.formatMessage(messages.payvalue),
        options: {
          filter: true,
        },
      },
      {
        name: "payed",
        label: intl.formatMessage(messages.paid),
        options: {
          filter: true,
        },
      },
      {
        name: "notpayed",
        label: intl.formatMessage(messages.outstanding),
        options: {
          filter: true,
        },
      },
      {
        name: "notes",
        label: intl.formatMessage(messages.Notes),
        options: {
          filter: true,
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

                <Grid item md={2} >
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={searchData.EndedLoans}
                            onChange={(evt) => {
                            setsearchData((prev) => ({
                                ...prev,
                                EndedLoans: evt.target.checked,
                            }));
                            }}
                        />
                        }
                        label={intl.formatMessage(messages.EndedLoans)}
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

LoanReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(LoanReport);
