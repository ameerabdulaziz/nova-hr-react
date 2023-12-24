import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/PurchaseTrxData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  Autocomplete,
} from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import PayRollLoader from "../../../Component/PayRollLoader";
import LoanDetailTable from "../Loan/LoanDetailTable";
import EmployeeData from "../../../Component/EmployeeData";
import { format } from "date-fns";
import GeneralListApis from "../../../api/GeneralListApis";

function PurchaseTrxCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes, cx } = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [data, setdata] = useState({
    id: 0,
    elementId: 0,
    elementName: "",
    employeeId: 0,
    employeeName: "",
    monthId: 0,
    monthName: "",
    nativeTotalValue: "",
    notes: "",
    payElementId: 0,
    payElementName: "",
    paysNo: "",
    payTempId: 0,
    payTempName: "",
    payvalue: "",
    printed: false,
    stMonthId: 0,
    stMonthName: "",
    stYearId: 0,
    stYearName: "",
    totalvalue: "",
    transDate: format(new Date(), "yyyy-MM-dd"),
    yearId: 0,
    yearName: "",
  });

  const history = useHistory();

  const handleEmpChange = useCallback((id, name) => {
    if (name == "employeeId") {
      setdata((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
      }));
      getOpenMonth(id);
    }
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      debugger;
      var total = data.details.reduce(
        (n, { payVal }) => parseInt(n) + parseInt(payVal),
        0
      );

      if (total != data.totalvalue) {
        toast.error("Total Loans value in Grid Must Equal Total Vlaue");
        return;
      }
      setIsLoading(true);

      if (data.transDate == null)
        data.transDate = format(new Date(), "yyyy-MM-dd");

      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/Payroll/PurchaseTrx`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/Payroll/PurchaseTrx`);
  }
  
  async function changeYear(value) {
    if (value != null && value.id < data.yearId) {
      toast.error("year must be grater than or equal opne Year");
      setdata((prevFilters) => ({
        ...prevFilters,
        stYearId: data.yearId,
        stYearName: data.yearName,
      }));
      handleApply(data.paysNo,data.yearName,data.monthId,data.totalvalue) 
    } else
    {
      setdata((prevFilters) => ({
        ...prevFilters,
        stYearId: value !== null ? value.id : 0,
        stYearName: value !== null ? value.name : "",
      }));
      handleApply(data.paysNo,value.name,data.monthId,data.totalvalue) 
    }
  }
  async function changeMonth(value) {
    if (value != null && value.id < data.monthId && data.stYearId < data.yearId) {
      toast.error("month must be grater than or equal opne Month");
      setdata((prevFilters) => ({
        ...prevFilters,
        stMonthId: data.monthId,
      }));
      handleApply(data.paysNo,data.stYearName,data.monthId,data.totalvalue) 
    } else
    {
      setdata((prevFilters) => ({
        ...prevFilters,
        stMonthId: value !== null ? value.id : 0,
        stMonthName: value !== null ? value.name : 0,
      }));
      handleApply(data.paysNo,data.stYearName,value.id,data.totalvalue) 
    }
  }

  async function getOpenMonth(id) {
    try {
      debugger;
      if (!id) {
        setdata((prevFilters) => ({
          ...prevFilters,
          monthId: "",
          yearId: "",
          yearName: "",
          monthName: "",
          stMonthId: "",
          stYearId: "",
          stYearName: "",
          stMonthName: "",
        }));
        return;
      }
      setIsLoading(true);
      const result = await GeneralListApis(locale).getOpenMonth(0, id);
      debugger;

      setdata((prevFilters) => ({
        ...prevFilters,
        monthId: result.monthId,
        yearId: result.yearId,
        monthName: result.monthName,
        yearName: result.yearName,
        stMonthId: result.monthId,
        stYearId: result.yearId,
        stMonthName: result.monthName,
        stYearName: result.yearName,
      }));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function fetchData() {
    try {
      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);
      const months = await GeneralListApis(locale).GetMonths();
      setMonthList(months);

      const dataApi = await ApiData(locale).Get(id ?? 0);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.PurchaseTrxCreateTitle)
            : intl.formatMessage(messages.PurchaseTrxUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={12}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={data.employeeId}
              ></EmployeeData>
            </Grid>

            <Grid item xs={12} md={12}>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={2}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <DesktopDatePicker
                            label={intl.formatMessage(Payrollmessages.date)}
                            value={data.transDate}
                            onChange={(date) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                transDate: format(new Date(date), "yyyy-MM-dd"),
                              }));
                            }}
                            className={classes.field}
                            renderInput={(params) => (
                              <TextField {...params} variant="outlined" />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} md={1}>
                        <TextField
                          id="YearId"
                          name="YearId"
                          value={data.yearName}
                          label={intl.formatMessage(Payrollmessages.year)}
                          className={classes.field}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} md={1}>
                        <TextField
                          id="MonthId"
                          name="MonthId"
                          value={data.monthName}
                          label={intl.formatMessage(Payrollmessages.month)}
                          className={classes.field}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} md={2.5}>
                        <TextField
                          id="payTempName"
                          name="payTempName"
                          value={data.payTempName}
                          label={intl.formatMessage(messages.payTemplate)}
                          className={classes.field}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} md={2.5}>
                        <TextField
                          id="payElementName"
                          name="payElementName"
                          value={data.payElementName}
                          label={intl.formatMessage(
                            messages.payTemplateElement
                          )}
                          className={classes.field}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          id="elementName"
                          name="elementName"
                          value={data.elementName}
                          label={intl.formatMessage(messages.deductElement)}
                          className={classes.field}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          id="stYearName"
                          options={yearList}
                          isOptionEqualToValue={(option, value) =>
                            value.id === 0 ||
                            value.id === "" ||
                            option.id === value.id
                          }
                          getOptionDisabled={(option) => !data.isAllowUpdate}
                          getOptionLabel={(option) =>
                            option.name ? option.name : ""
                          }
                          value={
                            data.stYearId
                              ? yearList.find(
                                  (item) => item.id === data.stYearId
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
                              disabled={!data.isAllowUpdate}
                              label={intl.formatMessage(Payrollmessages.year)}
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
                          getOptionDisabled={(option) => !data.isAllowUpdate}
                          getOptionLabel={(option) =>
                            option.name ? option.name : ""
                          }
                          value={
                            data.stMonthId
                              ? monthList.find(
                                  (item) => item.id === data.stMonthId
                                )
                              : null
                          }
                          onChange={(event, value) => {
                            changeMonth(value)
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="stMonthName"
                              required
                              disabled={!data.isAllowUpdate}
                              label={intl.formatMessage(Payrollmessages.month)}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          id="nativeTotalValue"
                          name="nativeTotalValue"
                          value={data.nativeTotalValue}
                          label={intl.formatMessage(messages.nativeTotalValue)}
                          className={classes.field}
                          variant="outlined"
                          disabled={!data.isAllowUpdate}
                          required
                          onChange={(e) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              nativeTotalValue: e.target.value,
                            }));
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="totalValue"
                          name="totalValue"
                          value={data.totalvalue}
                          label={intl.formatMessage(messages.totalValue)}
                          className={classes.field}
                          variant="outlined"
                          disabled={!data.isAllowUpdate}
                          required
                          onChange={(e) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              totalvalue: e.target.value,
                              payvalue: (data.paysNo && data.totalvalue)?e.target.value/ data.paysNo:0,
                            }));
                            handleApply(data.paysNo,data.stYearName,data.monthId,e.target.value) 
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="paysNo"
                          name="paysNo"
                          value={data.paysNo}
                          label={intl.formatMessage(messages.paysNo)}
                          className={classes.field}
                          variant="outlined"
                          disabled={data.totalvalue && data.isAllowUpdate ? false : true}
                          required
                          onChange={(e) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              paysNo: e.target.value,
                              payvalue: data.totalvalue / e.target.value,
                            }));
                            handleApply(e.target.value,data.stYearName,data.monthId,data.totalvalue) 
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="payvalue"
                          name="payvalue"
                          value={data.payvalue}
                          label={intl.formatMessage(messages.payvalue)}
                          className={classes.field}
                          variant="outlined"
                          disabled
                          required
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={12}>
                        <LoanDetailTable
                          dataList={data.details}
                          setdataList={setdata}
                          isUpdate={id ? true : false}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="secondary"
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={oncancel}
              >
                <FormattedMessage {...Payrollmessages.cancel} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}
PurchaseTrxCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(PurchaseTrxCreate);
