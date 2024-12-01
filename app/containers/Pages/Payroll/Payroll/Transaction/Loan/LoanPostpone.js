import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";

import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import AddButton from "../../../Component/AddButton";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import GeneralListApis from "../../../api/GeneralListApis";
import MUIDataTable from "mui-datatables";
import ApiData from "../../api/LoanTrxData";
import PayRollLoader from "../../../Component/PayRollLoader";
import EmployeeData from "../../../Component/EmployeeData";

function LoanPostpone(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");
  const [dataList, setdataList] = useState([]);
  const [BranchList, setBranchList] = useState([]);
  const [BranchId, setBranchId] = useState(branchId);
  const [EmployeeId, setEmployeeId] = useState(0);
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [OrignalMonthList, setOrignalMonthList] = useState([]);
  const [origionalYearList, setOrigionalYearList] = useState([])

  const [OpenMonth, setOpenMonth] = useState({
    monthId: "",
    yearId: "",
    monthName: "",
    yearName: "",
    stYearId: "",
    stYearName: "",
    stMonthId: "",
    stMonthName: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  async function handleUpdate(selectedRows) {
    try {
      if (dataList.length > 0) {
        const ids = [];
        for (let i = 0; i < selectedRows.data.length; i++) {
          ids.push(dataList[selectedRows.data[i].dataIndex].id);
        }
        if (ids.length > 0) {
          setIsLoading(true);
          let response = await ApiData(locale).DetailPostpone(
            ids,
            OpenMonth.stYearId,
            OpenMonth.stMonthId
          );
          if (response.status == 200) {
            toast.success(notif.saved);
            const result = await ApiData(locale).GetDetailList(
              OpenMonth.yearId,
              OpenMonth.monthId,
              BranchId,
              EmployeeId
            );
            setdataList(result || []);
          } else {
            toast.error(response.statusText);
          }
        }
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function Getookup() {
    try {
      const years = await GeneralListApis(locale).GetYears();
      setOrigionalYearList(years);
      const months = await GeneralListApis(locale).GetMonths();
      setOrignalMonthList(months);

      const BrList = await GeneralListApis(locale).GetBranchList();
      setBranchList(BrList);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    Getookup();
  }, []);

  useEffect(() => {
    if (BranchId && origionalYearList.length > 0 && OrignalMonthList.length > 0) {
      getOpenMonth(BranchId);
    }
  }, [origionalYearList, BranchId, OrignalMonthList]);

  async function getOpenMonth(id) {
    try {
      if (!id) {
        setOpenMonth({
          monthId: "",
          yearId: "",
          monthName: "",
          yearName: "",
          stMonthId: "",
          stMonthName: "",
          stYearId: "",
          stYearName: "",
        });
        setdataList([]);
        return;
      }
      setIsLoading(true);

      const result = await GeneralListApis(locale).getOpenMonth(id, 0);
      setOpenMonth({
        monthId: result.monthId,
        yearId: result.yearId,
        monthName: result.monthName,
        yearName: result.yearName,
        stMonthId: result.monthId,
        stYearId: result.yearId,
        stMonthName: result.monthName,
        stYearName: result.yearName,
      });
      if (result.monthId && result.yearId) {
        const result1 = await ApiData(locale).GetDetailList(
          result.yearId,
          result.monthId,
          id,
          EmployeeId
        );
        setdataList(result1 || []);
        
        setYearList(
          origionalYearList.filter(
            (row) => parseInt(row.name) >= parseInt(result.yearName)
          )
        );
        setMonthList(OrignalMonthList.filter((row) => row.id >= result.monthId));
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  const handleEmpChange = useCallback(
    async (id, name) => {
      if (name == "employeeId") {
        setEmployeeId(id);
        if (OpenMonth.yearId && OpenMonth.monthId && EmployeeId !== "" ) {
          const result1 = await ApiData(locale).GetDetailList(
            OpenMonth.yearId,
            OpenMonth.monthId,
            BranchId,
            id
          );
          setdataList(result1 || []);
        }
      }
    },
    [OpenMonth, BranchId]
  );

  async function changeYear(value) {
    if (value !== null) {
      setOpenMonth((prevFilters) => ({
        ...prevFilters,
        stYearId: value.id,
        stYearName: value.name,
        stMonthId: 0,
        stmonthName: "",
      }));
      if (value.id != OpenMonth.yearId) setMonthList(OrignalMonthList);
      else setMonthList(OrignalMonthList.filter((row) => row.id >= OpenMonth.monthId));
    } else
      setOpenMonth((prevFilters) => ({
        ...prevFilters,
        stYearId: 0,
        stYearName: "",
        stMonthId: 0,
        stMonthName: "",
      }));
  }
  async function changeMonth(value) {

    setOpenMonth((prevFilters) => ({
      ...prevFilters,
      stMonthId: value !== null ? value.id : 0,
      stMonthName: value !== null ? value.name : 0,
    }));
  }

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
      },
    },
    {
      name: 'employeeId',
      label: intl.formatMessage(Payrollmessages.employeeId),
      options: {
        filter: false,
        display: false,
        download: false,
        print: false,
      },
    },

    {
      name: 'employeeCode',
      label: intl.formatMessage(Payrollmessages.employeeCode),
    },

    {
      name: "employeeName",
      label: intl.formatMessage(Payrollmessages["employeeName"]),
      options: {
        filter: true,
      },
    },
    {
      name: "payVal",
      label: intl.formatMessage(messages["payvalue"]),
      options: {
        filter: true,
      },
    },
  ];

  const options = {
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    search: false,
    selection: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => <div></div>,

    customToolbarSelect: (selectedRows) => (
      <div style={{ width: "80%" }}>
        <Grid container spacing={1} alignItems="flex-start" direction="row">
          <Grid item md={2} xs={12}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              className="mr-6"
              onClick={() => handleUpdate(selectedRows)}
            >
              <FormattedMessage {...Payrollmessages.apply} />
            </Button>
          </Grid>
        </Grid>
      </div>
    ),

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
        <Grid container spacing={2} alignItems="flex-start" direction="row">
          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardContent>
                <Grid
                  container
                  spacing={4}
                  alignItems="flex-start"
                  direction="row"
                  item
                >
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={2}
                    xs={12}
                    md={12}
                  >
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        id="branchId"
                        options={BranchList}
                        isOptionEqualToValue={(option, value) =>
                          value.id === 0 ||
                          value.id === "" ||
                          option.id === value.id
                        }
                        getOptionLabel={(option) =>
                          option.name ? option.name : ""
                        }
                        value={ BranchList.find((item) => item.id === BranchId)
                            ?? null
                        }
                        onChange={(event, value) => {
                          setBranchId(value !== null ? value.id : 0);
                          setEmployeeId("")
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="branchId"
                            required
                            label={intl.formatMessage(Payrollmessages.branch)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id="YearId"
                        name="YearId"
                        value={OpenMonth.yearName ? OpenMonth.yearName : ""}
                        label={intl.formatMessage(Payrollmessages.year)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id="MonthId"
                        name="MonthId"
                        value={OpenMonth.monthName ? OpenMonth.monthName : ""}
                        label={intl.formatMessage(Payrollmessages.month)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardContent>
                <Grid
                  container
                  spacing={4}
                  alignItems="flex-start"
                  direction="row"
                  item
                >
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={2}
                    xs={12}
                    md={12}
                  >
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        id="stYearName"
                        options={yearList}
                        isOptionEqualToValue={(option, value) =>
                          value.id === 0 ||
                          value.id === "" ||
                          option.id === value.id
                        }
                        getOptionLabel={(option) =>
                          option.name ? option.name : ""
                        }
                        getOptionDisabled={(option) => !OpenMonth.yearId}
                        value={
                          OpenMonth.stYearId
                            ? yearList.find(
                                (item) => item.id === OpenMonth.stYearId
                              )
                            : null
                        }
                        onChange={(event, value) => {
                          changeYear(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="stYearName"
                            required
                            disabled={ !OpenMonth.yearId}
                            label={intl.formatMessage(Payrollmessages.Postyear)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        id="stMonthName"
                        options={monthList}
                        isOptionEqualToValue={(option, value) =>
                          value.id === 0 ||
                          value.id === "" ||
                          option.id === value.id
                        }
                        getOptionLabel={(option) =>
                          option.name ? option.name : ""
                        }
                        getOptionDisabled={(option) => !OpenMonth.yearId}
                        value={
                          OpenMonth.stMonthId
                            ? monthList.find(
                                (item) => item.id === OpenMonth.stMonthId
                              )
                            : null
                        }
                        onChange={(event, value) => {
                          changeMonth(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="stMonthName"
                            required
                            disabled={ !OpenMonth.yearId}
                            label={intl.formatMessage(
                              Payrollmessages.Postmonth
                            )}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            <EmployeeData
              handleEmpChange={handleEmpChange}
              id={EmployeeId}
              branchId={BranchId}
            ></EmployeeData>
          </Grid>

          <Grid item xs={12} md={12}>
            <div className={classes.CustomMUIDataTable}>
              {/* <ThemeProvider theme={theme}> */}
              <MUIDataTable
                title=""
                data={dataList}
                columns={columns}
                options={options}
              />
              {/* </ThemeProvider> */}
            </div>
          </Grid>
        </Grid>
      </PapperBlock>
    </PayRollLoader>
  );
}
LoanPostpone.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(LoanPostpone);
