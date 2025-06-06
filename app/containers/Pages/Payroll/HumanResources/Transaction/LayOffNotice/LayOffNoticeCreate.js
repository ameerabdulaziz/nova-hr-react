import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/LayOffNoticeData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { Button, Grid, TextField } from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import EmployeeDataSmall from "../../../Component/EmployeeDataSmall";
import SaveButton from "../../../Component/SaveButton";
import PayRollLoaderInForms from "../../../Component/PayRollLoaderInForms";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import SITEMAP from "../../../../../App/routes/sitemap";

function LayOffNoticeCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState({
    id: 0,
    noticeDate: format(new Date(), "yyyy-MM-dd"),
    reason: "",
    employeeId: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }


    try {
      setIsLoading(true);

      data.noticeDate = dateFormatFun(data.noticeDate)

      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.humanResources.LayOffNotice.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(SITEMAP.humanResources.LayOffNotice.route);
  }

  async function fetchData() {
    setIsLoading(true);

    try {
      const dataApi = await ApiData(locale).Get(id ?? 0);
      if (dataApi.id != 0) setdata(dataApi);
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
            ? intl.formatMessage(messages.LayOffNoticeCreateTitle)
            : intl.formatMessage(messages.LayOffNoticeUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={6} md={3} lg={2} xl={1.5}>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.date)}
                  value={data.noticeDate ? dayjs(data.noticeDate) : null}
                  className={classes.field}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      noticeDate: date,
                    }))
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`noticeDate`]: true
                      }))
                    }
                    else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`noticeDate`]: false
                      }))
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6} md={9} lg={10} xl={10.5}></Grid>

            <Grid item xs={12} lg={10} xl={7}>
              <EmployeeDataSmall handleEmpChange={handleEmpChange} id={data.employeeId}></EmployeeDataSmall>
            </Grid>

            <Grid item xs={12} lg={10} xl={7}>
              <TextField
                id="reason"
                name="reason"
                multiline
                required
                rows={2}
                value={data.reason}
                onChange={(e) =>
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    reason: e.target.value,
                  }))
                }
                label={intl.formatMessage(messages.reason)}
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
LayOffNoticeCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(LayOffNoticeCreate);
