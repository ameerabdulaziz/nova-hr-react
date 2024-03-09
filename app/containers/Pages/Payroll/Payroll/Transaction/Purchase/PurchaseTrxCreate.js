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
import ItemTable from "./ItemTable";
import NamePopup from "../../../Component/NamePopup";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function PurchaseTrxCreate(props) {
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
  const [OpenPopup, setOpenPopup] = useState(false);
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
    paysNo: "",
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
    notes: "",
    isAllowUpdate: true,
    remainLoansValue: "",
    remainLoansNo: "",
    newTotalvalue: "",
    newPayNo: "",
    details: [],
    items: [],
  });
  const history = useHistory();

  const [DateError, setDateError] = useState({});

  // used to reformat date before send it to api
  const dateFormatFun = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };

  const handleCloseNamePopup = useCallback(
    async (Employeesdata) => {
      setOpenPopup(false);
      try {
        setIsLoading(true);

        var items = [];
        if (data.items) {
          for (var i = 0; i < data.items.length; i++) {
            items.push(data.items[i]);
          }
        }
        for (var i = 0; i < Employeesdata.length; i++) {
          if (
            items.filter((x) => x.itemId == Employeesdata[i].id).length == 0
          ) {
            items.push({
              itemId: Employeesdata[i].id,
              itemName: Employeesdata[i].name,
              PurchaseTraxId: data.id,
              sellPrice: Employeesdata[i].sellPrice,
              isSelected: true,
              lineNo: items.length + 1,
              price: Employeesdata[i].sellPrice,
              quantity: 1,
            });
          }
        }

        var Total = items
          .filter((x) => x.isSelected == true)
          .reduce(
            (n, { price, quantity }) =>
              parseInt(n) + parseFloat(price) * parseInt(quantity),
            0
          );
        setdata((prevFilters) => ({
          ...prevFilters,
          totalvalue: Total,
          nativeTotalValue: Total,
          items: items,
        }));
        handleApply(data.paysNo, data.stYearName, data.monthId, Total);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    },
    [data]
  );

  const handleClickOpenNamePopup = () => {
    setOpenPopup(true);
  };
  const handleEmpChange = useCallback(
    (id, name) => {
      if (name == "employeeId") {
        setdata((prevFilters) => ({
          ...prevFilters,
          employeeId: id,
        }));
        if (id) getOpenMonth(id);
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
      var total = data.details.reduce(
        (n, { payVal }) => parseInt(n) + parseInt(payVal),
        0
      );

      if (!data.newPayNo && total != data.totalvalue) {
        toast.error("Total Loans value in Grid Must Equal Total Vlaue");
        return;
      }
      setIsLoading(true);
      debugger;
      var items = data.items.filter((x) => x.isSelected == true);
      data.items = items;

      data.transDate = dateFormatFun(data.transDate);

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
    debugger;

    setdata((prevFilters) => ({
      ...prevFilters,
      stMonthId: value !== null ? value.id : 0,
      stMonthName: value !== null ? value.name : 0,
    }));
  }

  async function handleApply(paysNo, yearName, monthId, totalvalue, fromdata) {
    if (fromdata) {
      paysNo = data.paysNo;
      yearName = data.yearName;
      monthId = data.monthId;
    }

    if (paysNo && yearName && monthId && totalvalue) {
      var details = [];
      if (data.details) details = data.details.filter((x) => x.done == true);
      debugger;
      if (details.length > 0) {
        monthId = details[details.length - 1].monthId + 1;
        yearName = details[details.length - 1].yearName;
      }
      for (var i = 0; i < paysNo; i++) {
        if (i > 0) monthId = monthId + 1;
        if (monthId > 12) {
          yearName = parseInt(yearName) + 1;
          monthId = monthId - 12;
        }
        var yearId = OrignalYearList.find(
          (item) => parseInt(item.name) == yearName
        ).id;

        details.push({
          loanTraxId: data.id,
          lineNo: details.length + 1,
          done: false,
          monthId: monthId,
          monthName: OrignalMonthList.find((item) => item.id == monthId).name,
          yearId: yearId,
          yearName: yearName,
          payVal: totalvalue / paysNo,
        });
      }
      setdata((prevFilters) => ({
        ...prevFilters,
        details: details,
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
  async function fetchData() {
    try {
      debugger;
      const years = await GeneralListApis(locale).GetYears();
      setOrignalYearList(years);
      const months = await GeneralListApis(locale).GetMonths();
      setOrignalMonthList(months);

      const dataApi = await ApiData(locale).Get(id ?? 0);
      var items = [];
      if (dataApi.items != null)
        items =
          dataApi.items ??
          dataApi.items.map((obj) => {
            return {
              ...obj,
              isSelected: true,
            };
          });
      dataApi.items = items;
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
        <NamePopup
          handleClose={handleCloseNamePopup}
          open={OpenPopup}
          Key={"Items"}
        />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={12}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={data.employeeId}
                isdisabled={!data.isAllowUpdate}
              ></EmployeeData>
            </Grid>

            <Grid item xs={12} md={4}>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={3}>
                      {/* <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <DesktopDatePicker
                            label={intl.formatMessage(Payrollmessages.date)}
                            value={data.transDate}
                            onChange={(date) => {
                              if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                                if (!isNaN(new Date(date))) { 
                                  setdata((prevFilters) => ({
                                      ...prevFilters,
                                      transDate: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                                    }))
                                }
                                else
                                {
                                  setdata((prevFilters) => ({
                                    ...prevFilters,
                                    transDate: null,
                                  }))
                                } 
                              }
                            }}
                            className={classes.field}
                            renderInput={(params) => (
                              <TextField {...params} variant="outlined" />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid> */}

                      <Grid item xs={12} md={6}>
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

                      <Grid item xs={12} md={3}>
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
                      <Grid item xs={12} md={3}>
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

                      <Grid item xs={12} md={6}>
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
                      <Grid item xs={12} md={12}>
                        <TextField
                          id="notes"
                          name="notes"
                          value={data.notes}
                          label={intl.formatMessage(Payrollmessages.notes)}
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

            <Grid item xs={12} md={8}>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={2}>
                        <Button
                          variant="contained"
                          size="medium"
                          color="secondary"
                          disabled={!data.isAllowUpdate}
                          onClick={() => handleClickOpenNamePopup()}
                        >
                          <FormattedMessage {...messages.AddItem} />
                        </Button>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <ItemTable
                          handlechange={handleApply}
                          dataList={data.items}
                          setdataList={setdata}
                          isdisabled={!data.isAllowUpdate}
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
                            changeMonth(value);
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
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="totalValue"
                          name="totalValue"
                          value={data.totalvalue}
                          label={intl.formatMessage(messages.totalvalue)}
                          className={classes.field}
                          variant="outlined"
                          disabled={true}
                          required
                          onChange={(e) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              totalvalue: e.target.value,
                              payvalue:
                                data.paysNo && data.totalvalue
                                  ? e.target.value / data.paysNo
                                  : 0,
                            }));
                            handleApply(
                              data.paysNo,
                              data.stYearName,
                              data.monthId,
                              e.target.value
                            );
                          }}
                          autoComplete="off"
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
                          disabled={
                            data.totalvalue && data.isAllowUpdate ? false : true
                          }
                          required
                          onChange={(e) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              paysNo: e.target.value,
                              payvalue: data.totalvalue / e.target.value,
                            }));
                            handleApply(
                              e.target.value,
                              data.stYearName,
                              data.monthId,
                              data.totalvalue
                            );
                          }}
                          autoComplete="off"
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
                          autoComplete="off"
                        />
                      </Grid>

                      {!data.isAllowUpdate ? (
                        <Grid item xs={12} md={6}>
                          <TextField
                            id="RemainLoansNo"
                            name="RemainLoansNo"
                            value={data.remainLoansNo}
                            label={intl.formatMessage(messages.remainLoansNo)}
                            className={classes.field}
                            variant="outlined"
                            disabled
                            autoComplete="off"
                          />
                        </Grid>
                      ) : (
                        ""
                      )}
                      {!data.isAllowUpdate ? (
                        <Grid item xs={12} md={6}>
                          <TextField
                            id="RemainLoansValue"
                            name="RemainLoansValue"
                            value={data.remainLoansValue}
                            label={intl.formatMessage(
                              messages.remainLoansValue
                            )}
                            className={classes.field}
                            variant="outlined"
                            disabled
                            autoComplete="off"
                          />
                        </Grid>
                      ) : (
                        ""
                      )}
                      {!data.isAllowUpdate ? (
                        <Grid item xs={12} md={6}>
                          <TextField
                            id="newTotalvalue"
                            name="newTotalvalue"
                            value={data.newTotalvalue}
                            label={intl.formatMessage(messages.newLoansValue)}
                            className={classes.field}
                            variant="outlined"
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                newTotalvalue: e.target.value,
                              }));
                              handleApply(
                                data.newPayNo,
                                data.stYearName,
                                data.monthId,
                                e.target.value
                              );
                            }}
                            autoComplete="off"
                          />
                        </Grid>
                      ) : (
                        ""
                      )}
                      {!data.isAllowUpdate ? (
                        <Grid item xs={12} md={6}>
                          <TextField
                            id="NewPayNo"
                            name="NewPayNo"
                            value={data.newPayNo}
                            label={intl.formatMessage(messages.newPayNo)}
                            className={classes.field}
                            variant="outlined"
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                newPayNo: e.target.value,
                              }));
                              handleApply(
                                e.target.value,
                                data.stYearName,
                                data.monthId,
                                data.newTotalvalue
                              );
                            }}
                            autoComplete="off"
                          />
                        </Grid>
                      ) : (
                        ""
                      )}
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
