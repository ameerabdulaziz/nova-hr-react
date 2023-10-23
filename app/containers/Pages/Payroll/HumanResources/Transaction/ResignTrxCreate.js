import React, { useState, useEffect } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../api/ResignTrxData";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { Button, Grid, TextField, Autocomplete } from "@mui/material";
import useStyles from "../../Style";
import PropTypes from "prop-types";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GeneralListApis from "../../api/GeneralListApis";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import EmployeeData from "../../Component/EmployeeData";
import SaveButton from "../../Component/SaveButton";
import PayRollLoader from "../../Component/PayRollLoader";

function ResignTrxCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();

  const [data, setdata] = useState({
    id: 0,
    date: format(new Date(), "yyyy-MM-dd"),
    employeeId: "",
    resignReasonId: "",
    resignReasonName: "",
    note: "",
    payTemplateId: "",
    payTemplateName: "",
    settlElementId: "",
    settlElementName: "",
    vacElementId: "",
    vacElementIdName: "",
    settlementV: "",
    vacSettlValue: "",
    lworkingDay: format(new Date(), "yyyy-MM-dd"),
    isStop: false,
  });

  const [PayTemplateList, setPayTemplateList] = useState([]);
  const [VacElementList, setVacElementList] = useState([]);
  const [SettlElementList, setSettlElementList] = useState([]);
  const [ResignList, setResignList] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const handleEmpChange = useCallback((id, name) => {
    if (name == "employeeId")
      setdata((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
      }));
  }, []);

  const handleChange = (event) => {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
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
      } else {
        const Elements = await GeneralListApis(locale).GetElementListByTemplate(
          id
        );
        setVacElementList(Elements);
        setSettlElementList(Elements);
      }
      setdata((prevFilters) => ({
        ...prevFilters,
        settlElementId: 0,
        settlElementName: "",
        vacElementId: 0,
        vacElementIdName: "",
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
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(messages.date)}
                  value={data.date}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      date: format(new Date(date), "yyyy-MM-dd"),
                    }));
                  }}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(messages.lworkingDay)}
                  value={data.lworkingDay}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      lworkingDay: format(new Date(date), "yyyy-MM-dd"),
                    }));
                  }}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
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
                required
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
                required
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                id="note"
                name="note"
                value={data.note}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.note)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4}>
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
                    payTemplateId: value !== null ? value.id : 0,
                    payTemplateName: value !== null ? value.name : "",
                  }));
                  getElements(value.id);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="payTemplateId"
                    required
                    label={intl.formatMessage(messages.payTemplateName)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
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
                    settlElementId: value !== null ? value.id : 0,
                    settlElementName: value !== null ? value.name : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="settlElementId"
                    required
                    label={intl.formatMessage(messages.settElemnt)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
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
                    vacElementId: value !== null ? value.id : 0,
                    vacElementIdName: value !== null ? value.name : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="vacElementId"
                    required
                    label={intl.formatMessage(messages.vacElement)}
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
