import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/PromotionsData";
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
import EmployeeData from "../../../Component/EmployeeData";
import SaveButton from "../../../Component/SaveButton";
import PayRollLoader from "../../../Component/PayRollLoader";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import SITEMAP from "../../../../../App/routes/sitemap";

function PromotionsCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState({
    id: 0,
    date: format(new Date(), "yyyy-MM-dd"),
    promotionDate: format(new Date(), "yyyy-MM-dd"),
    decisionDate: format(new Date(), "yyyy-MM-dd"),
    reason: "",
    employeeId: "",
    employeeName: "",
    jobId: "",
    job: "",
    organization: "",
    hiringDate: "",
    newJobId: "",
    newJob: "",
    oldElemVal: "",
    elemVal: "",
  });
  const [JobList, setJobList] = useState([]);
  const history = useHistory();

  const [DateError, setDateError] = useState({});
  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
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

      data.date = dateFormatFun(data.date)
      data.promotionDate = dateFormatFun(data.promotionDate)
      data.decisionDate = dateFormatFun(data.decisionDate)

      console.log("data =", data);
      

      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.humanResources.Promotions.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(SITEMAP.humanResources.Promotions.route);
  }

  async function fetchData() {
    setIsLoading(true);

    try {
      const jobs = await GeneralListApis(locale).GetJobsList(locale);
      setJobList(jobs);

      if (id) {
        const dataApi = await ApiData(locale).Get(id);
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
            ? intl.formatMessage(messages.PromotionsCreateTitle)
            : intl.formatMessage(messages.PromotionsUpdateTitle)
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
                        date: date ,
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
                    disabled
                  />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                    label={intl.formatMessage(messages.actualPromotionDate)}
                    value={data.promotionDate ? dayjs(data.promotionDate) : null}
                    className={classes.field}
                    onChange={(date) => {
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        promotionDate: date ,
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

            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                    // label="decisionDate"
                    label={intl.formatMessage(messages.decisionDate)}
                    value={data.decisionDate ? dayjs(data.decisionDate) : null}
                    className={classes.field}
                    onChange={(date) => {
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        decisionDate: date ,
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
              <EmployeeData
                handleEmpChange={handleEmpChange}
                GetSalary={true}
                id={data.employeeId}
              ></EmployeeData>
            </Grid>

            <Grid item xs={12} md={4}>
              <Autocomplete
                id="job"
                options={JobList}
                key={{ id: data.newJobId, name: data.newJob }}
                value={{ id: data.newJobId, name: data.newJob }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    newJobId: value !== null ? value.id : 0,
                    newJob: value !== null ? value.name : "",
                  }));
                }}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="job"
                    required
                    label={intl.formatMessage(messages.job)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="elemVal"
                name="elemVal"
                required
                value={data.elemVal}
                onChange={(e) =>
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    elemVal: e.target.value,
                  }))
                }
                label={intl.formatMessage(messages.value)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
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
PromotionsCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(PromotionsCreate);
