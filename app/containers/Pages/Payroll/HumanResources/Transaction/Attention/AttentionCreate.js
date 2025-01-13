import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/AttentionData";
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
import EmployeeData from "../../../Component/EmployeeData";
import SaveButton from "../../../Component/SaveButton";
import PayRollLoader from "../../../Component/PayRollLoader";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import SITEMAP from "../../../../../App/routes/sitemap";

function AttentionCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);

  const location = useLocation();
  const { id } = location.state ?? 0;

  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setdata] = useState({
    id: 0,
    attentionDate: format(new Date(), "yyyy-MM-dd"),
    reason: "",
    employeeId: "",
  });

  const [DateError, setDateError] = useState({});
  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }

  const history = useHistory();

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

      data.attentionDate = dateFormatFun(data.attentionDate);


      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.humanResources.Attention.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(SITEMAP.humanResources.Attention.route);
  }

  async function fetchData() {
    if (id) {
      try {
        setIsLoading(true);
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
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                         label={intl.formatMessage(messages.date)}
                          value={data.attentionDate ? dayjs(data.attentionDate) : data.attentionDate}
                        className={classes.field}
                          onChange={(date) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              attentionDate: date ,
                            }))
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`date`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`date`]: false
                              }))
                          }
                        }}
                        />
                    </LocalizationProvider>
                  </Grid>

            <Grid item xs={12} md={12}>
              <EmployeeData handleEmpChange={handleEmpChange} id={data.employeeId}></EmployeeData>
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
                autoComplete='off'
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
