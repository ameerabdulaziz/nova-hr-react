import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/LoanReqData";
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
import LoanDetailTable from "./LoanDetailTable";
import EmployeeData from "../../../Component/EmployeeData";
import { format } from "date-fns";
import GeneralListApis from "../../../api/GeneralListApis";

function LoanReqCreate(props) {
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
      
      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/Payroll/LoanReq`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/Payroll/LoanReq`);
  }
  
  async function changeYear(value) {
    if (value != null && value.id < data.yearId) {
      toast.error("year must be grater than or equal opne Year");
      setdata((prevFilters) => ({
        ...prevFilters,
        stYearId: data.yearId,
        stYearName: data.yearName,
      }));
      
    } else
    {
      setdata((prevFilters) => ({
        ...prevFilters,
        stYearId: value !== null ? value.id : 0,
        stYearName: value !== null ? value.name : "",
      }));
      
    }
  }
  async function changeMonth(value) {
    if (value != null && value.id < data.monthId && data.stYearId < data.yearId) {
      toast.error("month must be grater than or equal opne Month");
      setdata((prevFilters) => ({
        ...prevFilters,
        stMonthId: data.monthId,
      }));
      
    } else
    {
      setdata((prevFilters) => ({
        ...prevFilters,
        stMonthId: value !== null ? value.id : 0,
        stMonthName: value !== null ? value.name : 0,
      }));
      
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
            ? intl.formatMessage(messages.LoanTrxCreateTitle)
            : intl.formatMessage(messages.LoanTrxUpdateTitle)
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

            <Grid item xs={12} md={12}>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={2}>
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
                              
                              label={intl.formatMessage(Payrollmessages.year)}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={2}>
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
                              
                              label={intl.formatMessage(Payrollmessages.month)}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} md={2}>
                        <TextField
                          id="nativeTotalValue"
                          name="nativeTotalValue"
                          value={data.nativeTotalValue}
                          label={intl.formatMessage(messages.nativeTotalValue)}
                          className={classes.field}
                          variant="outlined"
                          required
                          onChange={(e) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              nativeTotalValue: e.target.value,
                            }));
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <TextField
                          id="totalValue"
                          name="totalValue"
                          value={data.totalvalue}
                          label={intl.formatMessage(messages.totalValue)}
                          className={classes.field}
                          variant="outlined"
                          required
                          onChange={(e) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              totalvalue: e.target.value,
                              payvalue: (data.paysNo && data.totalvalue)?e.target.value/ data.paysNo:0,
                            }));
                            
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <TextField
                          id="paysNo"
                          name="paysNo"
                          value={data.paysNo}
                          label={intl.formatMessage(messages.paysNo)}
                          className={classes.field}
                          variant="outlined"
                          disabled={data.totalvalue ? false : true}
                          required
                          onChange={(e) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              paysNo: e.target.value,
                              payvalue: data.totalvalue / e.target.value,
                            }));
                            
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <TextField
                          id="payvalue"
                          name="payvalue"
                          value={data.payvalue}
                          label={intl.formatMessage(messages.payvalue)}
                          className={classes.field}
                          variant="outlined"
                          required
                          disabled
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
LoanReqCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(LoanReqCreate);
