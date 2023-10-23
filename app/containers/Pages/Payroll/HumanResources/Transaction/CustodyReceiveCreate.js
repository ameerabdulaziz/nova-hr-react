import React, { useState, useEffect,useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../api/CustodyTrxData";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { Button, Grid, TextField, Autocomplete } from "@mui/material";
import useStyles from "../../Style";
import PropTypes from "prop-types";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GeneralListApis from "../../api/GeneralListApis";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import EmployeeData from "../../Component/EmployeeData";
import SaveButton from "../../Component/SaveButton";
import PayRollLoader from "../../Component/PayRollLoader";

function CustodyReceiveCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const [isLoading, setIsLoading] = useState(true);
  const { classes } = useStyles();
  const [data, setdata] = useState({
    id: 0,
    date: format(new Date(), "yyyy-MM-dd"),
    trxType: 2,
    custodyId: "",
    custodyName: "",
    employeeId: "",
    notes: "",
    itemSerial: "",
    custCount: "",
    custodyPrice: "",
  });

  const [CustodyList, setCustodyList] = useState([]);
  const history = useHistory();

  const handleEmpChange = useCallback((id) => {
    setdata((prevFilters) => ({
      ...prevFilters,
      employeeId: id,
    }));
  }, []);

  const handleChange = (event) => {
    if (event.target.name == "notes")
      setdata((prevFilters) => ({
        ...prevFilters,
        notes: event.target.value,
      }));

    if (event.target.name == "itemSerial")
      setdata((prevFilters) => ({
        ...prevFilters,
        itemSerial: event.target.value,
      }));

    if (event.target.name == "custCount")
      setdata((prevFilters) => ({
        ...prevFilters,
        custCount: event.target.value,
      }));

    if (event.target.name == "custodyPrice")
      setdata((prevFilters) => ({
        ...prevFilters,
        custodyPrice: event.target.value,
      }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/CustodyReceive`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/HR/CustodyReceive`);
  }
  async function fetchData() {
    try {
      const custodies = await GeneralListApis(locale).GetCustodyList(locale);
      setCustodyList(custodies);

      if (id) {
        const dataApi = await ApiData(locale).Get(id, 2);

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

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.CustodyReceiveCreateTitle)
            : intl.formatMessage(messages.CustodyReceiveEditTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={2}>
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
            <Grid item xs={12} md={10}></Grid>

            <Grid item xs={12} md={6}>
              <EmployeeData handleEmpChange={handleEmpChange}></EmployeeData>
            </Grid>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="custodyId"
                options={CustodyList}
                value={{ id: data.custodyId, name: data.custodyName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    custodyId: value !== null ? value.id : 0,
                    custodyName: value !== null ? value.name : "",
                    custodyPrice: value !== null ? value.custodyPrice : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="custodyId"
                    required
                    label={intl.formatMessage(messages.custodyName)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="custodyPrice"
                name="custodyPrice"
                value={data.custodyPrice}
                label={intl.formatMessage(Payrollmessages.price)}
                className={classes.field}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="custCount"
                name="custCount"
                value={data.custCount}
                label={intl.formatMessage(Payrollmessages.count)}
                className={classes.field}
                variant="outlined"
                onChange={(e) => handleChange(e)}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                id="notes"
                name="notes"
                value={data.notes}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.note)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
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
CustodyReceiveCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(CustodyReceiveCreate);
