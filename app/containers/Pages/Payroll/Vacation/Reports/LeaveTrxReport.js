import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import { PapperBlock } from "enl-components";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import Search from "../../Component/Search";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import payrollMessages from "../../messages";
import API from "../api/LeaveTrxReportData";
import messages from "../messages";
import PayRollLoader from "../../Component/PayRollLoader";

function LeaveTrxReport(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);

  const [VacationsList, setVacationsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Title = localStorage.getItem("MenuName");

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    EmpStatusId: 1,
    OrganizationId: "",
    VacationId: [],
    InsertDate: false,
  });

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: "organizationName",
      label: <FormattedMessage {...messages.organization} />,
      options: {
        filter: true,
      },
    },
    {
      name: "employeeId",
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
      name: "hiringDate",
      label: <FormattedMessage {...messages.hiringDate} />,
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{format(new Date(value), "yyyy-MM-dd")}</pre> : ''),
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
      name: "fromDate",
      label: <FormattedMessage {...messages.fromdate} />,
      options: {
        filter: true,
        customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
      },
    },
    {
      name: "toDate",
      label: <FormattedMessage {...messages.todate} />,
      options: {
        filter: true,
        customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
      },
    },
    {
      name: "daysCount",
      label: <FormattedMessage {...messages.daysCount} />,
      options: {
        filter: true,
      },
    },
    {
      name: "dayEqual",
      label: <FormattedMessage {...messages.dayDeducedBy} />,
      options: {
        filter: true,
      },
    },
    {
      name: "trxDate",
      label: <FormattedMessage {...messages.registrationDate} />,
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

  async function fetchData() {
    try {
      const Vacations = await GeneralListApis(locale).GetVacList();
      setVacationsList(Vacations);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  const formateDate = (date) =>
    date ? format(new Date(date), "yyyy-MM-dd") : null;

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const formData = { ...formInfo };

      formData.VacationId = formData.VacationId.map((item) => item.id);
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
    fetchData();
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

          <Grid item xs={12} md={4}>
            <Autocomplete
              id="vacationId"
              options={VacationsList}
              multiple
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => {
                setFormInfo((prev) => ({
                  ...prev,
                  VacationId: value,
                }));
              }}
              sx={{
                ".MuiInputBase-root": {
                  paddingTop: "8px",
                  paddingBottom: "8px",
                },
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="VacationId"
                  required
                  label={intl.formatMessage(messages.vacationType)}
                />
              )}
            />
          </Grid>

          <Grid item md={5}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <FormControlLabel
                control={<Checkbox />}
                onChange={(evt) =>
                  setFormInfo((prev) => ({
                    ...prev,
                    InsertDate: evt.target.checked,
                  }))
                }
                checked={formInfo.InsertDate}
                label={intl.formatMessage(messages.filterOnRegistrationHistory)}
              />

              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={onSearchBtnClick}
              >
                <FormattedMessage {...messages.search} />
              </Button>
            </Stack>
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

export default injectIntl(LeaveTrxReport);
