import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import GeneralListApis from "../../../api/GeneralListApis";
import MUIDataTable from "mui-datatables";
import ApiData from "../../api/SalaryCalculationData";
import PayRollLoader from "../../../Component/PayRollLoader";
import EmployeeData from "../../../Component/EmployeeData";
import toast from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { format } from "date-fns";




function SalaryCalculation(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");
  const [dataList, setdataList] = useState([]);
  const [BranchList, setBranchList] = useState([]);
  const [BranchId, setBranchId] = useState(branchId);
  const [EmployeeId, setEmployeeId] = useState(0);
  const [PayTemplateList, setPayTemplateList] = useState([]);
  const [PayTemplateId, setPayTemplateId] = useState(1);
  const [IsShowReport, setIsShowReport] = useState(0);

  const [OpenMonth, setOpenMonth] = useState({
    monthId: "",
    yearId: "",
    monthName: "",
    yearName: "",
    fromdate: "",
    todate: "",
    isPartCalc: false,
    stopAttendance: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  const [DateError, setDateError] = useState({});
  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }



  async function Getookup() {
    try {

      const BrList = await GeneralListApis(locale).GetBranchList();
      setBranchList(BrList);
      const PayList = await GeneralListApis(locale).GetPayTemplateList();
      setPayTemplateList(PayList);

      if (BranchId) {
        getOpenMonth(BranchId);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    Getookup();
  }, []);

  async function getOpenMonth(id) {
    try {
      if (!id) {
        setOpenMonth({
          monthId: "",
          yearId: "",
          monthName: "",
          yearName: "",
          fromdate: "",
          todate: "",
          isPartCalc: false,
          stopAttendance: false,
        });
        return;
      }
      setIsLoading(true);

      const result = await GeneralListApis(locale).getOpenMonth(id, 0);

      setOpenMonth({
        monthId: result.monthId,
        yearId: result.yearId,
        monthName: result.monthName,
        yearName: result.yearName,
        fromdate: result.fromDate,
        todate: result.todate,
        isPartCalc: false,
        stopAttendance: result.stopAttendance,
      });

    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  const handleEmpChange = useCallback(async (id, name) => {
    if (name == "employeeId") {
      setEmployeeId(id);
    }
  }, []);

  const handleSearch = async () => {
    try {
      if (!PayTemplateId && !BranchId) {
        toast.error("you must choose Template && Branch");
        return;
      }
      setIsLoading(true);
      var formData = {
        BranchId: BranchId,
        EmployeeId: EmployeeId,
        PayTemplateID: PayTemplateId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      var result = await ApiData(locale).GetList(formData);
      setdataList(result || []);
     
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalculate = async () => {

    	// used to stop call api if user select wrong date
      if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
        return;
      }


    try {
      if (!PayTemplateId) {
        toast.error("you must choose Template");
        return;
      }
      setIsLoading(true);

      var formData = {
        BranchId: BranchId,
        EmployeeId: EmployeeId,
        PayTemplateID: PayTemplateId,
        PartCalc: OpenMonth.isPartCalc,
        FromDate: dateFormatFun(OpenMonth.fromdate),
        ToDate: dateFormatFun(OpenMonth.todate),
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      var response = await ApiData(locale).CalculateSalary(formData);

      if (response.status == 200) {
        toast.success(response.data);
        var formData = {
          BranchId: BranchId,
          EmployeeId: EmployeeId,
          PayTemplateID: PayTemplateId,
        };
        Object.keys(formData).forEach((key) => {
          formData[key] = formData[key] === null ? "" : formData[key];
        });
        var result = await ApiData(locale).GetList(formData);
        setdataList(result || []);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      if (!PayTemplateId) {
        toast.error("you must choose Template");
        return;
      }
      setIsLoading(true);

      var formData = {
        BranchId: BranchId,
        EmployeeId: EmployeeId,
        PayTemplateID: PayTemplateId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      var response = await ApiData(locale).DeleteSalary(formData);

      if (response.status == 200) {        
        toast.success("Deleted Success");
        var formData = {
          BranchId: BranchId,
          EmployeeId: EmployeeId,
          PayTemplateID: PayTemplateId,
        };
        Object.keys(formData).forEach((key) => {
          formData[key] = formData[key] === null ? "" : formData[key];
        });
        var result = await ApiData(locale).GetList(formData);
        setdataList(result || []);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = async () => {
    try {
      if (!PayTemplateId) {
        toast.error("you must choose Template");
        return;
      }
      setIsLoading(true);

      var formData = {
        BranchId: BranchId,
        yearId: OpenMonth.yearId,
        MonthId: OpenMonth.monthId,
        PayTemplateID: PayTemplateId,
        IsStop: !OpenMonth.stopAttendance,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      var response = await ApiData(locale).StopOrOperateAttendance(formData);

      if (response.status == 200) {
        toast.success(notif.saved);
        setOpenMonth((prevFilters) => ({
          ...prevFilters,
          stopAttendance: !OpenMonth.stopAttendance,
        }));
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowReport = async () => {
    try {
      if (!PayTemplateId) {
        toast.error("you must choose Template");
        return;
      }
      setIsLoading(true);

      var formData = {
        BranchId: BranchId,
        yearId: OpenMonth.yearId,
        MonthId: OpenMonth.monthId,
        PayTemplateID: PayTemplateId,
        IsShow: !IsShowReport,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      var response = await ApiData(locale).ShowOrHideReport(formData);

      if (response.status == 200) {
        toast.success(notif.saved);
        setIsShowReport(!IsShowReport);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function FunctionIsShowReport(id) {
    try {

      if (!BranchId) {
        setPayTemplateId(0);
        toast.error("you must choose Template");
        return;
      }
      setIsLoading(true);
      var formData = {
        BranchId: BranchId,
        MonthId: OpenMonth.monthId,
        YearId: OpenMonth.yearId,
        PayTemplateID: id,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      const result = await ApiData(locale).IsShowReport(formData);

      setIsShowReport(result);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  const columns = [
    {
      name: "id",
      options: {
        filter: false,
        display: false,
        download: false,
        print: false,
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
      label: <FormattedMessage {...Payrollmessages["employeeName"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "yearName",
      label: <FormattedMessage {...Payrollmessages["yearName"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "monthName",
      label: <FormattedMessage {...Payrollmessages["monthName"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "grossSal",
      label: <FormattedMessage {...messages["grossSal"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "empInsSalary",
      label: <FormattedMessage {...messages["empInsSalary"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "insuCompValFixed",
      label: <FormattedMessage {...messages["insuCompValFixed"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "insuEmpValFixed",
      label: <FormattedMessage {...messages["insuEmpValFixed"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "taxBool",
      label: <FormattedMessage {...messages["taxBool"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "taxVal",
      label: <FormattedMessage {...messages["taxVal"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "totDed",
      label: <FormattedMessage {...messages["totDed"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "netSal",
      label: <FormattedMessage {...messages["netSal"]} />,
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
        <Grid container spacing={2} mt={0} alignItems="flex-start" direction="row">
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Autocomplete
                  id="PayTemplateId"
                  options={PayTemplateList}
                  isOptionEqualToValue={(option, value) =>
                    value.id === 0 || value.id === "" || option.id === value.id
                  }
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  value={
                    PayTemplateId
                      ? PayTemplateList.find((item) => item.id === PayTemplateId) ?? null
                      : null
                  }
                  onChange={(event, value) => {
                    setPayTemplateId(value !== null ? value.id : 0);
                    FunctionIsShowReport(value !== null ? value.id : 0);
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      name="PayTemplateId"
                      required
                      label={intl.formatMessage(messages.payTemplate)}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className={classes.card} sx={{ mt: '0!important' }} >
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
                          getOpenMonth(value !== null ? value.id : 0);
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="branchId"
                            label={intl.formatMessage(Payrollmessages.branch)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id="YearId"
                        name="YearId"
                        value={OpenMonth.yearName}
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
                        value={OpenMonth.monthName}
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
            <Card className={classes.card} sx={{ mt: '0!important' }} >
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

                  <Grid item xs={12} md={4}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(Payrollmessages.fromdate)}
                          value={OpenMonth.fromdate ? dayjs(OpenMonth.fromdate) : null}
                        className={classes.field}
                          onChange={(date) => {
                            setOpenMonth((prevFilters) => ({
                              ...prevFilters,
                              fromdate: date ,
                            }))
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`fromdate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`fromdate`]: false
                              }))
                          }
                        }}
                        />
                    </LocalizationProvider>
                  </Grid>


                  <Grid item xs={12} md={3}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(Payrollmessages.todate)}
                          value={OpenMonth.todate ? dayjs(OpenMonth.todate) : null}
                        className={classes.field}
                          onChange={(date) => {
                            setOpenMonth((prevFilters) => ({
                              ...prevFilters,
                              todate: date ,
                            }))
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`todate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`todate`]: false
                              }))
                          }
                        }}
                        />
                    </LocalizationProvider>
                  </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={OpenMonth.isPartCalc || null}
                            onChange={(e) =>
                              setOpenMonth((prevFilters) => ({
                                ...prevFilters,
                                isPartCalc: e.target.checked,
                              }))
                            }
                            value={OpenMonth.isPartCalc || null}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.isPartCalc)}
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

          <Grid item>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...Payrollmessages.search} />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleCalculate}
            >
              <FormattedMessage {...messages.Calculate} />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleDelete}
            >
              <FormattedMessage {...messages.DeleteSalary} />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleStop}
            >
              {OpenMonth.stopAttendance ? (
                <FormattedMessage {...messages.OperateAtt} />
              ) : (
                <FormattedMessage {...messages.StopAtt} />
              )}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleShowReport}
            >
              {IsShowReport ? (
                <FormattedMessage {...messages.NotShow} />
              ) : (
                <FormattedMessage {...messages.Show} />
              )}
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>

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
    </PayRollLoader>
  );
}
SalaryCalculation.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(SalaryCalculation);
