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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PayRollLoaderInForms from "../../../Component/PayRollLoaderInForms";
import EmployeeData from "../../../Component/EmployeeData";
import { format } from "date-fns";
import GeneralListApis from "../../../api/GeneralListApis";
import LoanSettingApiData from "../../api/LoanSettingData";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import SITEMAP from "../../../../../App/routes/sitemap";

function LoanReqCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes, cx } = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [OrignalMonthList, setOrignalMonthList] = useState([]);
  const [OrignalYearList, setOrignalYearList] = useState([]);
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

  const [DateError, setDateError] = useState({});

  // used to reformat date before send it to api
  const dateFormatFun = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };

  const handleEmpChange = useCallback(
    (id, name) => {
      if (name == "employeeId") {
        setdata((prevFilters) => ({
          ...prevFilters,
          employeeId: id,
        }));
        getOpenMonth(id);
        getLoanSetting(id);
      }
    },
    [OrignalMonthList, OrignalYearList]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    try {
      data.transDate = dateFormatFun(data.transDate);

      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.payroll.LoanReq.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(SITEMAP.payroll.LoanReq.route);
  }

  async function changeYear(value) {
    if (value !== null) {
      setdata((prevFilters) => ({
        ...prevFilters,
        stYearId: value.id,
        stYearName: value.name,
        stMonthId: 0,
        stmonthName: "",
      }));
      if (value.id != data.yearId) setMonthList(OrignalMonthList);
      else
        setMonthList(OrignalMonthList.filter((row) => row.id >= data.monthId));
    } else
      setdata((prevFilters) => ({
        ...prevFilters,
        stYearId: 0,
        stYearName: "",
        stMonthId: 0,
        stMonthName: "",
      }));
    handleApply(data.paysNo, data.stYearName, value.id, data.totalvalue);
  }
  async function changeMonth(value) {
    setdata((prevFilters) => ({
      ...prevFilters,
      stMonthId: value !== null ? value.id : 0,
      stMonthName: value !== null ? value.name : 0,
    }));
  }

  async function getOpenMonth(id) {
    try {
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

      setYearList(
        OrignalYearList.filter(
          (row) => parseInt(row.name) >= parseInt(result.yearName)
        )
      );
      setMonthList(OrignalMonthList.filter((row) => row.id >= result.monthId));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function getLoanSetting(id) {
    try {
      if (!id) {
        setdata((prevFilters) => ({
          ...prevFilters,
          payElementId: 0,
          payElementName: "",
          elementId: 0,
          elementName: "",
          payTempId: 0,
          payTempName: "",
        }));
        return;
      }
      setIsLoading(true);
      const result = await LoanSettingApiData(locale).GetByEmployeeId(id);

      setdata((prevFilters) => ({
        ...prevFilters,
        payElementId: result.payElementId,
        payElementName: result.payElementName,
        elementId: result.elementId,
        elementName: result.elementName,
        payTempId: result.payTempId,
        payTempName: result.payTempName,
      }));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchData() {
    try {
      const years = await GeneralListApis(locale).GetYears();
      setOrignalYearList(years);
      const months = await GeneralListApis(locale).GetMonths();
      setOrignalMonthList(months);

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
    <PayRollLoaderInForms isLoading={isLoading}>
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
            <Grid item xs={12}  xl={6}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={data.employeeId}
              ></EmployeeData>
            </Grid>

            <Grid item xs={12} md={10} lg={9} xl={6} >
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label={intl.formatMessage(Payrollmessages.date)}
                            value={
                              data.transDate ? dayjs(data.transDate) : null
                            }
                            className={classes.field}
                            onChange={(date) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                transDate: date,
                              }));
                            }}
                            onError={(error, value) => {
                              if (error !== null) {
                                setDateError((prevState) => ({
                                  ...prevState,
                                  [`transDate`]: true,
                                }));
                              } else {
                                setDateError((prevState) => ({
                                  ...prevState,
                                  [`transDate`]: false,
                                }));
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <TextField
                          id="YearId"
                          name="YearId"
                          value={data.yearName}
                          label={intl.formatMessage(Payrollmessages.year)}
                          className={classes.field}
                          variant="outlined"
                          disabled
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <TextField
                          id="MonthId"
                          name="MonthId"
                          value={data.monthName}
                          label={intl.formatMessage(Payrollmessages.month)}
                          className={classes.field}
                          variant="outlined"
                          disabled
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <TextField
                          id="payTempName"
                          name="payTempName"
                          value={data.payTempName}
                          label={intl.formatMessage(messages.payTemplate)}
                          className={classes.field}
                          variant="outlined"
                          disabled
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={6} md={4}>
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
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <TextField
                          id="elementName"
                          name="elementName"
                          value={data.elementName}
                          label={intl.formatMessage(messages.deductElement)}
                          className={classes.field}
                          variant="outlined"
                          disabled
                          autoComplete="off"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid item  xs={12} md={10} lg={9} xl={6}>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={4} md={3}>
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
                      <Grid item xs={4} md={3}>
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
                            changeMonth(value);
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
                      <Grid item xs={4} md={3} style={{ display: "none" }}>
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
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={4} md={3}>
                        <TextField
                          id="totalValue"
                          name="totalValue"
                          value={data.totalvalue}
                          label={intl.formatMessage(messages.totalvalue)}
                          className={classes.field}
                          variant="outlined"
                          required
                          onChange={(e) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              totalvalue: e.target.value,
                              nativeTotalValue: e.target.value,
                              payvalue:
                                data.paysNo && data.totalvalue
                                  ? e.target.value / data.paysNo
                                  : 0,
                            }));
                          }}
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={4} md={3}>
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
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={4} md={3}>
                        <TextField
                          id="payvalue"
                          name="payvalue"
                          value={data.payvalue}
                          label={intl.formatMessage(messages.payvalue)}
                          className={classes.field}
                          variant="outlined"
                          required
                          disabled
                          autoComplete="off"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
           <Grid item xs={12} ></Grid>
            <Grid item >
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="secondary"
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>
            <Grid item >
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
    </PayRollLoaderInForms>
  );
}
LoanReqCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(LoanReqCreate);
