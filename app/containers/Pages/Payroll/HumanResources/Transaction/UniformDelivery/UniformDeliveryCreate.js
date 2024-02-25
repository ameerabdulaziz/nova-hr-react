import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/UniformTrxData";
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
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GeneralListApis from "../../../api/GeneralListApis";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import EmployeeData from "../../../Component/EmployeeData";
import SaveButton from "../../../Component/SaveButton";
import PayRollLoader from "../../../Component/PayRollLoader";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function UniformDeliveryCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();

  const [data, setdata] = useState({
    id: 0,
    date: format(new Date(), "yyyy-MM-dd"),
    trxType: 1,
    uniformId: "",
    uniformName: "",
    employeeId: "",
    notes: "",
    quantity: "",
    uniformPrice: "",
  });
  const [UniformList, setUniformList] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

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

  const handleChange = (event) => {
    if (event.target.name == "notes")
      setdata((prevFilters) => ({
        ...prevFilters,
        notes: event.target.value,
      }));

    if (event.target.name == "quantity")
      setdata((prevFilters) => ({
        ...prevFilters,
        quantity: event.target.value,
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

      data.date = dateFormatFun(data.date)

      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/UniformDelivery`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/HR/UniformDelivery`);
  }
  async function fetchData() {
    try {
      const custodies = await GeneralListApis(locale).GetUniformList(locale);
      setUniformList(custodies);

      if (id) {
        const dataApi = await ApiData(locale).Get(id, 1);

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
            ? intl.formatMessage(messages.UniformDeliveryCreateTitle)
            : intl.formatMessage(messages.UniformDeliveryEditTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            {/* <Grid item xs={12} md={2}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(messages.date)}
                  value={data.date}
                  onChange={(date) => {
                    if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                      if (!isNaN(new Date(date))) { 
                        setdata((prevFilters) => ({
                            ...prevFilters,
                            date: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                          }))
                      }
                      else
                      {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          date: null,
                        }))
                      } 
                    }
                  }}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </Grid> */}

                  <Grid item xs={12} md={2}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(messages.date)}
                          value={data.date ? dayjs(data.date) : null}
                        className={classes.field}
                          onChange={(date) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              date: date,
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


            <Grid item xs={12} md={10}></Grid>

            <Grid item xs={12} md={8}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={data.employeeId}
              ></EmployeeData>
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="uniformId"
                options={UniformList}
                value={{ id: data.uniformId, name: data.uniformName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    uniformId: value !== null ? value.id : 0,
                    uniformName: value !== null ? value.name : "",
                    uniformPrice: value !== null ? value.uniformPrice : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="uniformId"
                    required
                    label={intl.formatMessage(messages.uniformName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                id="uniformPrice"
                name="uniformPrice"
                value={data.uniformPrice}
                label={intl.formatMessage(Payrollmessages.price)}
                className={classes.field}
                variant="outlined"
                disabled
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="quantity"
                name="quantity"
                value={data.quantity}
                label={intl.formatMessage(Payrollmessages.count)}
                className={classes.field}
                variant="outlined"
                required
                onChange={(e) => handleChange(e)}
                autoComplete='off'
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
UniformDeliveryCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(UniformDeliveryCreate);
