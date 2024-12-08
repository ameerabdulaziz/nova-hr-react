import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/TransferRequestData";
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
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import EmployeeData from "../../../Component/EmployeeData";
import SaveButton from "../../../Component/SaveButton";
import PayRollLoader from "../../../Component/PayRollLoader";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import GeneralListApis from "../../../api/GeneralListApis";

function AttentionCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);

  const location = useLocation();
  const ID = location.state.id ?? 0;

  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [organizationList, setorganizationList] = useState([]);
  const [data, setdata] = useState({
    id: 0,
    transactionDate: format(new Date(), "yyyy-MM-dd"),
    actualTransfereDate: format(new Date(), "yyyy-MM-dd"),
    decisionDate: format(new Date(), "yyyy-MM-dd"),
    Notes: "",
    employeeId: "",
    organization: null,
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

      const formData = {
        id: data.id,
        trxDate: dateFormatFun(data.transactionDate),
        employeeId: data.employeeId,
        notes: data.Notes,
        transfereDate: dateFormatFun(data.actualTransfereDate),
        issueDate: dateFormatFun(data.decisionDate),
        organizationId: data.organization ? data.organization.id : null
      }

      let response = await ApiData(locale).Save(formData);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/TransferRequest`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/HR/TransferRequest`);
  }

  async function fetchData() {
      try 
      {
        setIsLoading(true);

        const organizations = await GeneralListApis(locale).GetDepartmentList();
        setorganizationList(organizations);

      } catch (err) {
      } finally {
        setIsLoading(false);
      }

    
  }

  useEffect(() => {
    fetchData();
  }, []);



  const onHandleChange = (name, value) => {
    
    setdata((prev) => ({
      ...prev,
      [name]: value !== null ? value : null,
    }));
  };



  const getEditDataFun = async () => {
    const dataApi = await ApiData(locale).GetById(ID);
    const editData = {
      id: dataApi.id,
      transactionDate: dataApi.trxDate,
      actualTransfereDate: dataApi.transfereDate,
      decisionDate: dataApi.issueDate,
      Notes: dataApi.notes,
      employeeId: dataApi.employeeId,
      organization: dataApi.organizationId ?  organizationList.find((item) => item.id === dataApi.organizationId ) : null
    }
    
      setdata(editData);
  }



  useEffect(()=>{
    if (ID && organizationList.length !== 0) {
      getEditDataFun()
    }
  },[ID,organizationList])
  

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
           data.id == 0
             ? intl.formatMessage(messages.createTransferRequesTitle)
             : intl.formatMessage(messages.editTransferRequesTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={12}>
                <EmployeeData handleEmpChange={handleEmpChange} id={data.employeeId}></EmployeeData>
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                   label={intl.formatMessage(messages.TransactionDate)}
                    value={data.transactionDate ? dayjs(data.transactionDate) : data.transactionDate}
                  className={classes.field}
                    onChange={(date) => {
                      onHandleChange("transactionDate", date)
                  }}
                  onError={(error,value)=>{
                    if(error !== null)
                    {
                      setDateError((prevState) => ({
                          ...prevState,
                            [`transactionDate`]: true
                        }))
                    }
                    else
                    {
                      setDateError((prevState) => ({
                          ...prevState,
                            [`transactionDate`]: false
                        }))
                    }
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                  />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                   label={intl.formatMessage(messages.actualTransferDate)}
                    value={data.actualTransfereDate ? dayjs(data.actualTransfereDate) : data.actualTransfereDate}
                  className={classes.field}
                    onChange={(date) => {
                      onHandleChange("actualTransfereDate", date)
                  }}
                  onError={(error,value)=>{
                    if(error !== null)
                    {
                      setDateError((prevState) => ({
                          ...prevState,
                            [`actualTransferDate`]: true
                        }))
                    }
                    else
                    {
                      setDateError((prevState) => ({
                          ...prevState,
                            [`actualTransferDate`]: false
                        }))
                    }
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                  />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                   label={intl.formatMessage(messages.decisionDate)}
                    value={data.decisionDate ? dayjs(data.decisionDate) : data.decisionDate}
                  className={classes.field}
                    onChange={(date) => {
                      onHandleChange("decisionDate", date)
                  }}
                  onError={(error,value)=>{
                    if(error !== null)
                    {
                      setDateError((prevState) => ({
                          ...prevState,
                            [`DecisionDate`]: true
                        }))
                    }
                    else
                    {
                      setDateError((prevState) => ({
                          ...prevState,
                            [`DecisionDate`]: false
                        }))
                    }
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                  />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6} md={3}>
              <Autocomplete
                id="Section"
                options={organizationList}
                value={data.organization}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  onHandleChange("organization", value)
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
                    name="Section"
                    label={intl.formatMessage(Payrollmessages.organizationName)}
                  />
                )}
                required
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                id="Notes"
                name="Notes"
                multiline
                rows={2}
                value={data.Notes}
                onChange={(e) =>
                  onHandleChange("Notes", e.target.value)
                }
                label={intl.formatMessage(Payrollmessages.notes)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
                required
              />
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
AttentionCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(AttentionCreate);
