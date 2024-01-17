import { Button, Grid } from "@mui/material";
import { format } from "date-fns";
import { PapperBlock } from "enl-components";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import PayRollLoader from "../../Component/PayRollLoader";
import Search from "../../Component/Search";
import useStyles from "../../Style";
import payrollMessages from "../../messages";
import API from "../api/BalanceUpdateLogData";
import messages from "../messages";

function BalanceUpdateLog(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Title = localStorage.getItem("MenuName");

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
  });

  const columns = [
    {
      name: "organizationName",
      label: <FormattedMessage {...messages.organization} />,
      options: {
        filter: true,
      },
    },
    {
      name: "employeeCode",
      label: <FormattedMessage {...messages.employeeId} />,
      options: {
        filter: true,
      },
    },
    {
      name: "employeeName",
      label: <FormattedMessage {...messages.employeeName} />,
      options: {
        filter: true,
      },
    },
    {
      name: "vacationName",
      label: <FormattedMessage {...messages.vacationName} />,
      options: {
        filter: true,
      },
    },
    {
      name: "days",
      label: <FormattedMessage {...messages.daysCount} />,
      options: {
        filter: true,
      },
    },
    {
      name: "trxDate",
      label: <FormattedMessage {...messages.fromdate} />,
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{format(new Date(value), "yyyy-MM-dd")}</pre> : ''),
      },
    },
    {
      name: "tRxDesc",
      label: <FormattedMessage {...messages.description} />,
      options: {
        filter: true,
      },
    },
    {
      name: "vacBalance",
      label: <FormattedMessage {...messages.Balance} />,
      options: {
        filter: true,
      },
    },
    {
      name: "oldbalance",
      label: <FormattedMessage {...messages.oldBalance} />,
      options: {
        filter: true,
      },
    },
    {
      name: "notes",
      label: <FormattedMessage {...messages.modificationReason} />,
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
    searchOpen: false,
    selectableRows: "none",
    serverSide: true,
    onSearchClose: () => {
      // some logic
    },
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
  };

  const formateDate = (date) =>
    date ? format(new Date(date), "yyyy-MM-dd") : null;

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const formData = { ...formInfo };

      formData.FromDate = formateDate(formData.FromDate);
      formData.ToDate = formateDate(formData.ToDate);

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await API(locale).GetReport(formData);

      setTableData(dataApi);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const onSearchBtnClick = () => {
    fetchTableData();
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Search
              setsearchData={setFormInfo}
              searchData={formInfo}
              setIsLoading={setIsLoading}
            />
          </Grid>

          <Grid item md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={onSearchBtnClick}
            >
              <FormattedMessage {...messages.search} />
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>

      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=""
          data={tableData}
          columns={columns}
          options={options}
        />
      </div>
    </PayRollLoader>
  );
}

export default injectIntl(BalanceUpdateLog);
