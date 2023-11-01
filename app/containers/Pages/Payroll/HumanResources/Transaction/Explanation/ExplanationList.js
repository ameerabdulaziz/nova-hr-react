import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../../../Explanation/api/ExplanationData";
import { useSelector } from "react-redux";
import { Button, Grid, TextField, Autocomplete } from "@mui/material";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useStyles from "../../../Style";
import { format } from "date-fns";
import GeneralListApis from "../../../api/GeneralListApis";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import EditButton from "../../../Component/EditButton";
import style from "../../../../../../../app/styles/styles.scss";
import PayRollLoader from "../../../Component/PayRollLoader";

function ExplanationList(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [fromdate, setfromate] = useState(null);
  const [todate, settodate] = useState(null);
  const [employee, setemployee] = useState(null);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [type, settype] = useState(null);
  const [TypeList, setTypeList] = useState([]);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async (e) => {
    try {
      setIsLoading(true);
      const dataApi = await ApiData(locale).GetReport(
        employee,
        type,
        fromdate,
        todate,
        false
      );
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      const employees = await GeneralListApis(locale).GetEmployeeList(locale);
      setEmployeeList(employees);
      const types = await GeneralListApis(locale).GetExplanationTypeList(
        locale
      );
      setTypeList(types);
      const dataApi = await ApiData(locale).GetReport(
        employee,
        type,
        fromdate,
        todate,
        false
      );
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "id",
      label: intl.formatMessage(Payrollmessages.id),
      options: {
        filter: false,
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
      name: "job",
      label: intl.formatMessage(messages.job),
      options: {
        filter: true,
      },
    },
    {
      name: "questionDate",
      label: intl.formatMessage(messages.date),
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
      },
    },
    {
      name: "expTypeName",
      label: intl.formatMessage(Payrollmessages.type),
      options: {
        filter: true,
      },
    },
    {
      name: "questionTitle",
      label: intl.formatMessage(Payrollmessages.title),
      options: {
        filter: true,
      },
    },
    {
      name: "questionDetails",
      label: intl.formatMessage(Payrollmessages.details),
      options: {
        filter: true,
      },
    },
    {
      name: "Actions",
      label: intl.formatMessage(Payrollmessages.Actions),
      options: {
        filter: false,

        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              <EditButton
                param={{ id: tableMeta.rowData[0] }}
                url={"/app/Pages/HR/ExplanationEdit"}
              ></EditButton>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    selectableRows: "none",
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    searchOpen: true,
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
        <div>          
          <Grid container spacing={3}>
            <Grid item xs={12} md={2}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(Payrollmessages.fromdate)}
                  value={fromdate}
                  onChange={(date) => {
                    setfromate(
                      date == null ? null : format(new Date(date), "yyyy-MM-dd")
                    );
                  }}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={2}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(Payrollmessages.todate)}
                  value={todate}
                  onChange={(date) => {
                    settodate(
                      date == null ? null : format(new Date(date), "yyyy-MM-dd")
                    );
                  }}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={2}>
              <Autocomplete
                id="typeId"
                options={TypeList}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  settype(value == null ? null : value.id);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="employeeId"
                    required
                    label={intl.formatMessage(Payrollmessages.type)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="employeeId"
                options={EmployeeList}
                //value={{id:data.employeeId,name:data.employeeName}}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setemployee(value == null ? null : value.id);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="employeeId"
                    required
                    label={intl.formatMessage(messages.employeeName)}
                  />
                )}
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
          <div className={classes.CustomMUIDataTable}>
            <MUIDataTable
              title=""
              data={data}
              columns={columns}
              options={options}
            />
          </div>
        </div>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(ExplanationList);
