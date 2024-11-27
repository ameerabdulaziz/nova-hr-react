import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/ForgotFingerprintRequestData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import EmployeeData from "../../../Component/EmployeeData";
import SaveButton from "../../../Component/SaveButton";
import PayRollLoader from "../../../Component/PayRollLoader";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import DecryptUrl from "../../../Component/DecryptUrl";

function ForgotFingerprintRequestCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const  ID  = location.state.id ?? 0;
  const { classes } = useStyles();
  const empid = DecryptUrl();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [DateError, setDateError] = useState({});
  const [data, setdata] = useState({
    id: 0,
    Date: format(new Date(), "yyyy-MM-dd"),
    employeeId: "",
    notes: "",
    fingerprint: {id:1, name:"Attendance"},
    FingerprintTime: null,
  });
  const [fingerprintList, setFingerprintList] = useState([
    {id:1, name:"Attendance"},
    {id:2, name:"departure"},
    ]);


  const handleEmpChange = useCallback((id, name) => {
    if (name == "employeeId")
      setdata((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
      }));
  }, []);

  const handleChange = (name,value) => {

    if (name === "fingerprintTime")
        {
          setdata((prevFilters) => ({
            ...prevFilters,
            FingerprintTime: value,
          }));
        }

    if (name === "notes")
    {
      setdata((prevFilters) => ({
        ...prevFilters,
        notes: value,
      }));
    }
    
    if (name === "fingerprintType")
    {
      setdata((prevFilters) => ({
        ...prevFilters,
        fingerprint: value,
      }));
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

      const apiData = {
        id: data.id,
        trxDate: data.Date,
        employeeId: data.employeeId,        
        notes: data.notes,
        signDateTime: data.FingerprintTime,
        type: data.fingerprint ? data.fingerprint.id : null
      };

      let response = await ApiData(locale).Save(apiData);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/Att/ForgotFingerprintRequest`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
        
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/Att/ForgotFingerprintRequest`);
  }


  const getEditdata =  async () => {

    setIsLoading(true);
  
    try {
      const data =  await ApiData(locale).GetDataById(ID);

      setdata((prevFilters) => ({
        ...prevFilters,
        id: data.id,
        Date: data.trxDate,
        employeeId : data.employeeId,
        notes: data.notes,
        fingerprint: data.type ? fingerprintList.find(item => item.id == data.type) : null,
        FingerprintTime: data.signDateTime,
      }));
  
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  
  };


  useEffect(() => {

    if(ID)
    {
      getEditdata()
    }
    },[ID]);


  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.ForgotFingerprintRequestCreateTitle)
            : intl.formatMessage(messages.ForgotFingerprintRequestUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(Payrollmessages.date)}
                  value={data.Date ? dayjs(data.Date) : data.Date}
                  className={classes.field}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      Date: date,
                    }));
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`Date`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`Date`]: false,
                      }));
                    }
                  }}
                  disabled
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={12}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={data.employeeId}
                empid={empid}
              ></EmployeeData>
            </Grid>

            <Grid item xs={4} >
                <TextField
                 label={intl.formatMessage(messages.signDateTime)}
                 type="datetime-local"
                 value={data.FingerprintTime ? data.FingerprintTime : ""}
                 onChange={(event, value) => {
                    handleChange("fingerprintTime", event.target.value );
                  }}
                 InputLabelProps={{
                 shrink: true, 
                 }}
                 fullWidth
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <Autocomplete
                id="fingerprintType"
                options={fingerprintList}
                value={data.fingerprint}
                isOptionEqualToValue={(option, value) => {
                    
                    return (
                    option.id === value.id || value.id === 0 || value.id === ""
                    );
                }}
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                    handleChange("fingerprintType", value ? value : null);
                }}
                renderInput={(params) => (
                    <TextField
                    variant="outlined"
                    {...params}
                    name="fingerprintType"
                      label={intl.formatMessage(messages.type)}
                    />
                )}
                />
            </Grid>

            <Grid item xs={12} >
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={12} md={12}>
                  <TextField
                    id="notes"
                    name="notes"
                    value={data.notes}
                    onChange={(e) => {
                        handleChange("notes", e.target.value);
                    }}
                    label={intl.formatMessage(Payrollmessages.notes)}
                    className={classes.field}
                    variant="outlined"
                    multiline
                    rows={2}
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={1}>
              <SaveButton Id={ID} />
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
ForgotFingerprintRequestCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ForgotFingerprintRequestCreate);
