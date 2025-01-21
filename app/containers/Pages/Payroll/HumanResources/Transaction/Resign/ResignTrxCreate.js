import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/ResignTrxData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { Button, Grid, TextField, Autocomplete } from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import GeneralListApis from "../../../api/GeneralListApis";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import EmployeeData from "../../../Component/EmployeeData";
import SaveButton from "../../../Component/SaveButton";
import PayRollLoader from "../../../Component/PayRollLoader";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function ResignTrxCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { resignReasonId } = location.state ?? 0;
  const { resignReasonName } = location.state ?? 0;
  const { lworkingDay } = location.state ?? 0;
  const { employeeId } = location.state ?? 0;
  const { classes } = useStyles();
  const [data, setdata] = useState({
    id: 0,
    date: format(new Date(), "yyyy-MM-dd"),
    employeeId: employeeId ?? "",
    resignReasonId: resignReasonId ?? "",
    resignReasonName: resignReasonName ?? "",
    note: "",
    payTemplateId: "",
    payTemplateName: "",
    settlElementId: "",
    settlElementName: "",
    vacElementId: "",
    vacElementIdName: "",
    otherDeductionElementId: "",
    otherDeductionElementIdName: "",
    settlementV: "",
    vacSettlValue: "",
    otherDeductionValue: "",
    lworkingDay: lworkingDay ? lworkingDay : format(new Date(), "yyyy-MM-dd"),
    isStop: false,
    workingYears: 0,
  });

  const [PayTemplateList, setPayTemplateList] = useState([]);
  const [VacElementList, setVacElementList] = useState([]);
  const [OtherDeductionElementList, setOtherDeductionElementList] = useState(
    []
  );
  const [SettlElementList, setSettlElementList] = useState([]);
  const [ResignList, setResignList] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const [DateError, setDateError] = useState({});

  // used to reformat date before send it to api
  const dateFormatFun = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };

  const handleEmpChange = useCallback(
    (id, name, empname, hiringDate, workingYears) => {
      if (name == "employeeId") {
        setdata((prevFilters) => ({
          ...prevFilters,
          employeeId: id,
          workingYears: workingYears,
        }));
        /* debugger;
        if (!data.id && id ) {
          handleCalculate(id, workingYears);
        } */
      }
    },
    []
  );

  const handleChange = (event) => {
    
    if (event.target.name == "otherDeductionValue")
      setdata((prevFilters) => ({
        ...prevFilters,
        otherDeductionValue: event.target.value,
      }));
    if (event.target.name == "note")
      setdata((prevFilters) => ({
        ...prevFilters,
        note: event.target.value,
      }));

    if (event.target.name == "settlementV")
      setdata((prevFilters) => ({
        ...prevFilters,
        settlementV: event.target.value,
      }));
    if (event.target.name == "vacSettlValue")
      setdata((prevFilters) => ({
        ...prevFilters,
        vacSettlValue: event.target.value,
      }));
  };
  const handleCalculate = async (id, workingYears) => {
    try {
      if (!id && !data.employeeId) {
        toast.error("choose Employee First");
        return;
      }
      setIsLoading(true);
      const dataApi = await ApiData(locale).CalculateSettlement(
        id ? id : data.employeeId,
        workingYears ? workingYears : data.workingYears
      );
      setdata((prevFilters) => ({
        ...prevFilters,
        settlementV: dataApi.settlementV,
        vacSettlValue: dataApi.vacSettlValue,
        otherDeductionValue: dataApi.otherDeductionValue,
      }));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);

      data.date = dateFormatFun(data.date);
      data.lworkingDay = dateFormatFun(data.lworkingDay);
      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/ResignTrx`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/HR/ResignTrx`);
  }
  async function fetchData() {
    try {
      const resigns = await GeneralListApis(locale).GetResignReasonList();
      setResignList(resigns);

      const payTemplates = await GeneralListApis(locale).GetPayTemplateList();
      setPayTemplateList(payTemplates);

      if (id) {
        const dataApi = await ApiData(locale).Get(id ?? 0);

        setdata(dataApi);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function getElements(id) {
    try {
      setIsLoading(true);
      if (!id) {
        setVacElementList([]);
        setSettlElementList([]);
        setOtherDeductionElementList([]);
      } else {
        const Elements = await GeneralListApis(locale).GetElementListByTemplate(
          id
        );
        setVacElementList(Elements);
        setSettlElementList(Elements);
        setOtherDeductionElementList(Elements);
      }
      setdata((prevFilters) => ({
        ...prevFilters,
        settlElementId: 0,
        settlElementName: "",
        vacElementId: 0,
        vacElementIdName: "",
        otherDeductionElementId: 0,
        otherDeductionElementIdName: "",
      }));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.ResignTrxCreateTitle)
            : intl.formatMessage(messages.ResignTrxUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.date)}
                  value={data.date ? dayjs(data.date) : null}
                  className={classes.field}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      date: date,
                    }));
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`date`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`date`]: false,
                      }));
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.lworkingDay)}
                  value={data.lworkingDay ? dayjs(data.lworkingDay) : null}
                  className={classes.field}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      lworkingDay: date,
                    }));
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`lworkingDay`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`lworkingDay`]: false,
                      }));
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.isStop}
                    onChange={(e) =>
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        isStop: e.target.checked,
                      }))
                    }
                    value={data.meetingReq}
                    color="primary"
                  />
                }
                label={intl.formatMessage(Payrollmessages.isStop)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                GetworkingYears={true}
                id={data.employeeId}
                isdisabled={data.id ? true : false}
              ></EmployeeData>
            </Grid>

            <Grid item xs={12} md={4}>
              <Autocomplete
                id="resignReasonId"
                options={ResignList}
                value={{ id: data.resignReasonId, name: data.resignReasonName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    resignReasonId: value !== null ? value.id : 0,
                    resignReasonName: value !== null ? value.name : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="resignReasonId"
                    required
                    label={intl.formatMessage(messages.resignReasonName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                id="settlementV"
                name="settlementV"
                value={data.settlementV}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.settlementV)}
                className={classes.field}
                variant="outlined"
                // required
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                id="vacSettlValue"
                name="vacSettlValue"
                value={data.vacSettlValue}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.vacSettlValue)}
                className={classes.field}
                variant="outlined"
                // required
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="otherDeductionValue"
                name="otherDeductionValue"
                value={data.otherDeductionValue}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.otherDeductionValue)}
                className={classes.field}
                variant="outlined"
                // required
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => handleCalculate()}
              >
                <FormattedMessage {...messages.calculate} />
              </Button>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="note"
                name="note"
                value={data.note}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.note)}
                className={classes.field}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                id="payTemplateId"
                options={PayTemplateList}
                value={{ id: data.payTemplateId, name: data.payTemplateName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    payTemplateId: value !== null ? value.id : "",
                    payTemplateName: value !== null ? value.name : "",
                  }));
                  getElements(value.id);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="payTemplateId"
                    label={intl.formatMessage(messages.payTemplateName)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Autocomplete
                id="settlElementId"
                options={SettlElementList}
                value={{ id: data.settlElementId, name: data.settlElementName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    settlElementId: value !== null ? value.id : "",
                    settlElementName: value !== null ? value.name : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="settlElementId"
                    label={intl.formatMessage(messages.settElemnt)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Autocomplete
                id="vacElementId"
                options={VacElementList}
                value={{ id: data.vacElementId, name: data.vacElementIdName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    vacElementId: value !== null ? value.id : "",
                    vacElementIdName: value !== null ? value.name : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="vacElementId"
                    label={intl.formatMessage(messages.vacElement)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Autocomplete
                id="otherDeductionElementId"
                options={OtherDeductionElementList}
                value={{
                  id: data.otherDeductionElementId,
                  name: data.otherDeductionElementIdName,
                }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    otherDeductionElementId: value !== null ? value.id : "",
                    otherDeductionElementIdName:
                      value !== null ? value.name : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="otherDeductionElementId"
                    label={intl.formatMessage(messages.otherDeductionElement)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={1}>
              <SaveButton Id={id} />
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
ResignTrxCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ResignTrxCreate);
