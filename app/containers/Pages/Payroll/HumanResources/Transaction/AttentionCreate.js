import React, { useState, useEffect,useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../api/AttentionData";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { Button, Grid, TextField } from "@mui/material";
import useStyles from "../../Style";
import PropTypes from "prop-types";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import EmployeeData from "../../Component/EmployeeData";
import SaveButton from "../../Component/SaveButton";
import PayRollLoader from "../../Component/PayRollLoader";

function AttentionCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);

  const location = useLocation();
  const { id } = location.state ?? 0;

  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  const [data, setdata] = useState({
    id: 0,
    attentionDate: format(new Date(), "yyyy-MM-dd"),
    reason: "",
    employeeId: "",
  });

  const history = useHistory();

  const handleEmpChange = useCallback((id) => {
    setdata((prevFilters) => ({
      ...prevFilters,
      employeeId: id,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/Attention`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/HR/Attention`);
  }

  async function fetchData() {
    if (id) {
      try {
        const dataApi = await ApiData(locale).Get(id);
        setdata(dataApi);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
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
            ? intl.formatMessage(messages.AttentionCreateTitle)
            : intl.formatMessage(messages.AttentionUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(messages.date)}
                  value={data.attentionDate}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      attentionDate: format(new Date(date), "yyyy-MM-dd"),
                    }));
                  }}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={12}>
              <EmployeeData handleEmpChange={handleEmpChange}></EmployeeData>
            </Grid>

            <Grid item xs={12} md={8}>
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
AttentionCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(AttentionCreate);
