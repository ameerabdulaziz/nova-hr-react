import React, { useState, useEffect, useMemo } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/DeviceData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { Button, Grid, TextField, Autocomplete } from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import GeneralListApis from "../../../api/GeneralListApis";
import { useLocation } from "react-router-dom";
import PayRollLoaderInForms from "../../../Component/PayRollLoaderInForms";
import SITEMAP from "../../../../../App/routes/sitemap";

function DeviceCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();

  const [data, setdata] = useState({
    id: 0,
    arName: "",
    enName: "",
    ip: "",
    port: "",
    devicePass: "",
    serialNumber: "",
    transportaion: "",
    shiftId: "",
    deviceType: "",
    areaCode:"",
  });
  const [ShiftList, setShiftList] = useState([]);
  const TypeList = useMemo(() => {
    return [
      { id: 1, name: "Default Way" },
      { id: 2, name: "Alternative Way" },
    ];
  }, []);

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event) => {
    if (event.target.name == "arName")
      setdata((prevFilters) => ({
        ...prevFilters,
        arName: event.target.value,
      }));

    if (event.target.name == "enName")
      setdata((prevFilters) => ({
        ...prevFilters,
        enName: event.target.value,
      }));

    if (event.target.name == "ip")
      setdata((prevFilters) => ({
        ...prevFilters,
        ip: event.target.value,
      }));

    if (event.target.name == "port")
      setdata((prevFilters) => ({
        ...prevFilters,
        port: event.target.value,
      }));

    if (event.target.name == "devicePass") {
      setdata((prevFilters) => ({
        ...prevFilters,
        devicePass: event.target.value.replace(/[^\d]/g, ''),
      }));
    }
    if (event.target.name == "serialNumber") {
      setdata((prevFilters) => ({
        ...prevFilters,
        serialNumber: event.target.value,
      }));
    }
    if (event.target.name == "transportaion") {
      setdata((prevFilters) => ({
        ...prevFilters,
        transportaion: event.target.value,
      }));
    }

    if (event.target.name == "AreaCode") {
      setdata((prevFilters) => ({
        ...prevFilters,
        areaCode: event.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.attendance.Device.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(SITEMAP.attendance.Device.route);
  }

  const ontestConnection = async (e) => {
    try {
      if (data.ip && data.port && data.devicePass) {
        setIsLoading(true);
        let response = await ApiData(locale).testConnection(data);

        if (response.status == 200) {
          if (response.data.includes("Unable")) toast.error(response.data);
          else toast.success(response.data);
        } else {
          toast.error(response.statusText);
        }
      } else {
        toast.error("enter IP,Port and Password");
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function fetchData() {
    try {
      const shifts = await GeneralListApis(locale).GetShiftList(locale);
      setShiftList(shifts);

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

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.DeviceCreateTitle)
            : intl.formatMessage(messages.DeviceUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <TextField
                id="arName"
                name="arName"
                value={data.arName}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(Payrollmessages.arName)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <TextField
                id="enName"
                name="enName"
                value={data.enName}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(Payrollmessages.enName)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2} xl={1.5}>
              <TextField
                id="ip"
                name="ip"
                value={data.ip}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.ip)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2} xl={1.5}>
              <TextField
                id="port"
                name="port"
                value={data.port}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.port)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2} xl={1.5}>
              <TextField
                id="devicePass"
                name="devicePass"
                type="password"
                value={data.devicePass}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.devicePass)}
                className={classes.field}
                variant="outlined"
                autoComplete="new-password"
                // autoComplete='off'
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2} xl={1.5}>
              <TextField
                id="serialNumber"
                name="serialNumber"
                value={data.serialNumber}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.serialNumber)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2} xl={1.5}>
              <TextField
                id="transportaion"
                name="transportaion"
                value={data.transportaion}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.transportaion)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={6} md={4} lg={3} xl={2.5}>
              <Autocomplete
                id="shiftId"
                options={ShiftList}
                value={
                  ShiftList.find((item) => item.id === data.shiftId) || null
                }
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    shiftId: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="shiftId"
                    label={intl.formatMessage(messages.shift)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={8} lg={3} xl={2.5}>
              <Autocomplete
                id="deviceType"
                options={TypeList}
                value={
                  TypeList.find((item) => item.id === data.deviceType) || null
                }
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    deviceType: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="deviceType"
                    label={intl.formatMessage(messages.method)}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2} xl={1.5}>
              <TextField
                id="AreaCode"
                name="AreaCode"
                type="number"
                value={data.areaCode}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.AreaCode)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
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
                    color="secondary"
                    onClick={ontestConnection}
                  >
                    <FormattedMessage {...messages.testConnection} />
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
            </Grid>

          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoaderInForms>
  );
}
DeviceCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(DeviceCreate);
