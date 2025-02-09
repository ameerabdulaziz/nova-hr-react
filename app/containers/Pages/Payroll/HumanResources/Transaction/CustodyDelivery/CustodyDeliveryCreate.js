import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/CustodyTrxData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { Button, Grid, TextField, Autocomplete, CardContent, Card } from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import GeneralListApis from "../../../api/GeneralListApis";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import EmployeeData from "../../../Component/EmployeeData";
import SaveButton from "../../../Component/SaveButton";
import PayRollLoaderInForms from "../../../Component/PayRollLoaderInForms";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import SITEMAP from "../../../../../App/routes/sitemap";

function CustodyDeliveryCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const [isLoading, setIsLoading] = useState(true);
  const { classes } = useStyles();

  const [data, setdata] = useState({
    id: 0,
    date: format(new Date(), "yyyy-MM-dd"),
    trxType: 1,
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


  const [DateError, setDateError] = useState({});

  // used to reformat date before send it to api
  const dateFormatFun = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : ""
  }

  const handleEmpChange = useCallback((id, name) => {
    if (name == "employeeId")
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


    if (event.target.name == "custodyPrice")
      setdata((prevFilters) => ({
        ...prevFilters,
        custodyPrice: event.target.value,
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


      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.humanResources.CustodyDelivery.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function oncancel() {
    history.push(SITEMAP.humanResources.CustodyDelivery.route);
  }

  async function fetchData() {
    try {
      const custodies = await GeneralListApis(locale).GetCustodyList(locale);
      setCustodyList(custodies);

      if (id) {
        const dataApi = await ApiData(locale).Get(id ?? 0, 1);

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
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.CustodyDeliveryCreateTitle)
            : intl.formatMessage(messages.CustodyDeliveryEditTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={6} md={3} lg={2} xl={1.5}>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.date)}
                  value={data.date ? dayjs(data.date) : data.date}
                  //value={hiringDate && !DateError ? dayjs(hiringDate) : hiringDate}
                  className={classes.field}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      date: date,
                    }))
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`date`]: true
                      }))
                    }
                    else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`date`]: false
                      }))
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={10}></Grid>

            <Grid item xs={12} lg={10} xl={6}>
              <EmployeeData handleEmpChange={handleEmpChange} id={data.employeeId}></EmployeeData>
            </Grid>

            <Grid item xs={12} lg={10} xl={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container spacing={3} alignItems="flex-start" direction="row">

                    <Grid item xs={12} md={8} lg={6}>
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

                    <Grid item xs={6} md={4} lg={3}>
                      <TextField
                        id="custodyPrice"
                        name="custodyPrice"
                        value={data.custodyPrice}
                        label={intl.formatMessage(Payrollmessages.price)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>

                    <Grid item xs={6} md={4} lg={3}>
                      <TextField
                        id="custCount"
                        name="custCount"
                        value={data.custCount}
                        label={intl.formatMessage(Payrollmessages.count)}
                        className={classes.field}
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={6} md={4} lg={3}>
                      <TextField
                        id="total"
                        name="total"
                        value={data.custCount * data.custodyPrice}
                        label={intl.formatMessage(Payrollmessages.total)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                        disabled
                      />
                    </Grid>

                    <Grid item xs={6} md={4} lg={3}>
                      <TextField
                        id="itemSerial"
                        name="itemSerial"
                        value={data.itemSerial}
                        onChange={(e) => handleChange(e)}
                        label={intl.formatMessage(messages.itemSerial)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>



                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={10} xl={12} >
                      <TextField
                        id="notes"
                        name="notes"
                        value={data.notes}
                        onChange={(e) => handleChange(e)}
                        label={intl.formatMessage(messages.note)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                   
                      />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item >
                  <SaveButton Id={id} />
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
            </Grid>

          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoaderInForms>
  );
}
CustodyDeliveryCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(CustodyDeliveryCreate);
