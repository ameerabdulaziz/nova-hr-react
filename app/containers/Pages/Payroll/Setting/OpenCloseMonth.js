import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import PayRollLoader from "../Component/PayRollLoader";
import GeneralListApis from "../api/GeneralListApis";
import { formateDate } from "../helpers";
import api from "./api/OpenCloseMonthData";
import messages from "./messages";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Payrollmessages from "../../Payroll/messages";
import useStyles from "../Style";

function OpenCloseMonth(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const locale = useSelector((state) => state.language.locale);
  const title = localStorage.getItem("MenuName");

  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formInfo, setFormInfo] = useState({
    id: 0,
    openUserId: 0,
    yearId: null,
    monthId: null,
    organizationId: branchId,
    fromDate: null,
    todate: null,
    fromDateAtt: null,
    todateAtt: null,
    requestEndDate: null,
    lastDayToApproveEmployeeRequests: false,
    stopAttendance: false,
    closedMonth: false,
  });

  const [DateError, setDateError] = useState({});

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const company = await GeneralListApis(locale).GetBranchList(true);
      setCompanyList(company);

      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthList(months);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const getBranchInfo = async () => {
    if (formInfo.organizationId) {
      setIsLoading(true);

      try {
        const response = await api(locale).Get(formInfo.organizationId);

        setFormInfo({
          id: response.id,
          openUserId: response.openUserId,
          yearId: response.yearId,
          monthId: response.monthId,
          organizationId: response.organizationId,
          fromDate: response.fromDate,
          todate: response.todate,
          fromDateAtt: response.fromDateAtt,
          todateAtt: response.todateAtt,
          requestEndDate: response.requestEndDate,
          lastDayToApproveEmployeeRequests: Boolean(
            response.lastDayToApproveEmployeeRequests
          ),
          stopAttendance: response.stopAttendance,
          closedMonth: Boolean(response.closedMonth),
        });
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getBranchInfo();
  }, [formInfo.organizationId]);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    /* assigning the name of the submit button that triggered the form submission to the variable
    `submiter`. This can be useful if you have multiple submit buttons in the
    form and you want to determine which button was clicked when handling the
    form submission. */
    const submitter = evt.nativeEvent.submitter.name;

    setIsLoading(true);

    const body = {
      ...formInfo,
      payTemplateId: 1,
      requestEndDate: formateDate(formInfo.requestEndDate) ?? "",
      fromDate: formateDate(formInfo.fromDate),
      todate: formateDate(formInfo.todate),
      fromDateAtt: formateDate(formInfo.fromDateAtt),
      todateAtt: formateDate(formInfo.todateAtt),
    };

    try {
      if (submitter === "openMonth") {
        await api(locale).OpenMonth(body);
        toast.success(intl.formatMessage(messages.monthOpenedSuccessfully));
        setFormInfo((prev) => ({ ...prev, closedMonth: false }));
      } else if (submitter === "updateDate") {
        await api(locale).UpdateDate(body);
        toast.success(intl.formatMessage(messages.dateUpdateSuccessfully));
      } else if (submitter === "closeMonth") {
        await api(locale).CloseMonth(body);
        toast.success(intl.formatMessage(messages.monthClosedSuccessfully));
        setFormInfo((prev) => ({ ...prev, closedMonth: true }));
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onCheckboxChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
      requestEndDate: null
    }));
  };

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onMonthAndYearAutoCompleteChange = (value, name) => {
    onAutoCompleteChange(value, name);

    setFormInfo((prev) => ({
      ...prev,
      fromDate: null,
      todate: null,
      todateAtt: null,
      fromDateAtt: null,
    }));
  };

  const getAutoCompleteValue = (list, key) =>
    list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoader isLoading={isLoading}>
      <form onSubmit={onFormSubmit}>
        <PapperBlock whiteBg icon="border_color" title={title} desc="">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Autocomplete
                options={companyList}
                value={getAutoCompleteValue(
                  companyList,
                  formInfo.organizationId
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : "")}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) =>
                  onAutoCompleteChange(value, "organizationId")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.company)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={yearList}
                value={getAutoCompleteValue(yearList, formInfo.yearId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                disabled={!formInfo.closedMonth && formInfo.id}
                getOptionLabel={(option) => (option ? option.name : "")}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) =>
                  onMonthAndYearAutoCompleteChange(value, "yearId")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.year)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={monthList}
                disabled={!formInfo.closedMonth && formInfo.id}
                value={getAutoCompleteValue(monthList, formInfo.monthId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : "")}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) =>
                  onMonthAndYearAutoCompleteChange(value, "monthId")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.month)}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={0}>
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={classes.field}
                  label={intl.formatMessage(messages.fromDate)}
                  value={formInfo.fromDate ? dayjs(formInfo.fromDate) : null}
                  onChange={(date) => {
                    onDatePickerChange(date, "fromDate");
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`fromDate`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`fromDate`]: false,
                      }));
                    }
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={classes.field}
                  label={intl.formatMessage(messages.toDate)}
                  value={formInfo.todate ? dayjs(formInfo.todate) : null}
                  onChange={(date) => {
                    onDatePickerChange(date, "todate");
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`todate`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`todate`]: false,
                      }));
                    }
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={classes.field}
                  label={intl.formatMessage(messages.attendancePeriodFromDate)}
                  value={
                    formInfo.fromDateAtt ? dayjs(formInfo.fromDateAtt) : null
                  }
                  onChange={(date) => {
                    onDatePickerChange(date, "fromDateAtt");
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`fromDateAtt`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`fromDateAtt`]: false,
                      }));
                    }
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={classes.field}
                  label={intl.formatMessage(messages.attendancePeriodToDate)}
                  value={formInfo.todateAtt ? dayjs(formInfo.todateAtt) : null}
                  onChange={(date) => {
                    onDatePickerChange(date, "todateAtt");
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`todateAtt`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`todateAtt`]: false,
                      }));
                    }
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formInfo.lastDayToApproveEmployeeRequests}
                    onChange={onCheckboxChange}
                    name="lastDayToApproveEmployeeRequests"
                  />
                }
                label={intl.formatMessage(
                  messages.lastDayToApproveEmployeeRequests
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={classes.field}
                  label={intl.formatMessage(messages.lastApprovalDate)}
                  value={
                    formInfo.requestEndDate
                      ? dayjs(formInfo.requestEndDate)
                      : null
                  }
                  onChange={(date) => {
                    onDatePickerChange(date, "requestEndDate");
                  }}
                  disabled={!formInfo.lastDayToApproveEmployeeRequests}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`requestEndDate`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`requestEndDate`]: false,
                      }));
                    }
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} mt={3}>
            <Button
              type="submit"
              variant="contained"
              name="openMonth"
              disabled={!formInfo.closedMonth && formInfo.id}
            >
              {intl.formatMessage(messages.openMonth)}
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              name="updateDate"
              disabled={formInfo.closedMonth}
            >
              {intl.formatMessage(messages.updateDate)}
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="error"
              name="closeMonth"
              disabled={formInfo.closedMonth}
            >
              {intl.formatMessage(messages.closeMonth)}
            </Button>
          </Stack>
        </PapperBlock>
      </form>
    </PayRollLoader>
  );
}

OpenCloseMonth.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OpenCloseMonth);
