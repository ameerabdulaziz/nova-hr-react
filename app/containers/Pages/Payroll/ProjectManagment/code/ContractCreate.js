import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ContractData from "../api/ContractData";
import CustomerData from "../api/CustomerData";
import { useSelector } from "react-redux";
import style from "../../../../../styles/styles.scss";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import { FormattedMessage, injectIntl } from "react-intl";
import messages from "../messages";
import Payrollmessages from "../../messages";
import PropTypes from "prop-types";
import { PapperBlock } from "enl-components";
import useStyles from "../../Style";
import SaveButton from "../../Component/SaveButton";
import PayRollLoader from "../../Component/PayRollLoader";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from "date-fns";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import SITEMAP from "../../../../App/routes/sitemap";

function ContractCreate(props) {
  const locale = useSelector((state) => state.language.locale);
  const { state } = useLocation();
  const ID = state?.id;
  const history = useHistory();
  const { intl } = props;
  const [isLoading, setIsLoading] = useState(true);
  const { classes } = useStyles();
  const [DateError, setDateError] = useState({});
  const [customerList, setCustomerList] = useState([]);
  const [formData,setFormData] = useState({
    id: 0,
    contractCode:"",
    Customer:null,
    ContractStartDate:"",
    ContractEndDate:"",
    contractValue:"",
    // Description:"",
  })


  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      id: formData.id,
      contractCode: formData.contractCode,
      customerId: formData.Customer.id ? formData.Customer.id : "",
      fromDate: dateFormatFun(formData.ContractStartDate),
      toDate: dateFormatFun(formData.ContractEndDate),
      contractValue: formData.contractValue,
    };

    try {

      let response = await ContractData().save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.projectManagement.Contract.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const getdata = async () => {
    try {
    
      const customers = await CustomerData(locale).GetList();

      setCustomerList(customers)
      
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const getEditdata = async () => {
    try {
      setIsLoading(true);
      const data = await ContractData(locale).GetById(ID);

      setFormData((prevState) => ({
        ...prevState,
        id: data.id,
        contractCode:data.contractCode,
        Customer: customerList.find((item) => item.id === data?.customerId) ? customerList.find((item) => item.id === data?.customerId) : null,
        ContractStartDate:data.fromDate,
        ContractEndDate:data.toDate,
        contractValue:data.contractValue,
        // Description:data,
      }))

    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (ID && customerList.length !== 0) {
      getEditdata();
    }
  }, [ID,customerList]);

  function oncancel() {
    history.push(SITEMAP.projectManagement.Contract.route);
  }


  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          ID
            ? intl.formatMessage(messages.editContract)
            : intl.formatMessage(messages.createContract)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid
              item
              xs={12}
              md={12}
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
            >
              <Grid item xs={12} md={4}>
                <TextField
                  name="contractCode"
                  id="contractCode"
                  placeholder={intl.formatMessage(messages.contractCode)}
                  label={intl.formatMessage(messages.contractCode)}
                  required
                  type="number"
                  className={`${classes.field} ${style.fieldsSty}`}
                  margin="normal"
                  variant="outlined"
                  value={formData.contractCode}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      contractCode: e.target.value,
                    }))
                  }}
                  autoComplete='off'
                />
              </Grid>
               <Grid container item spacing={3} alignItems="flex-start" direction="row">
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="ddlMenu"
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    value={ formData.Customer !== null ? formData.Customer : null}
                    options={customerList.length != 0 ? customerList : []}
                    getOptionLabel={(option) => (option ? locale === "en" ? option.enName : option.arName : "")}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {locale === "en" ? option.enName : option.arName}
                        </li>
                      );
                    }}
                    onChange={(event, value) => {
                      if (value !== null) {
                        setFormData((prevState) => ({
                          ...prevState,
                          Customer: value,
                        }))
                      } else {
                        setFormData((prevState) => ({
                          ...prevState,
                          Customer: null,
                        }))
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="customer"
                        label={intl.formatMessage(messages.customerName)}
                        margin="normal"
                        className={style.fieldsSty}
                      />
                    )}
                  />
                </Grid>
            </Grid>

            <Grid item xs={12}  md={2}> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(messages.startDate)}
                          value={formData.ContractStartDate ? dayjs(formData.ContractStartDate) : null}
                        className={classes.field}
                          onChange={(date) => {
                            setFormData((prevState) => ({
                              ...prevState,
                              ContractStartDate: date,
                            }))
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`startDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`startDate`]: false
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
            <Grid item xs={12}  md={2}> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(messages.endDate)}
                        value={formData.ContractEndDate ? dayjs(formData.ContractEndDate) : null}
                        className={classes.field}
                          onChange={(date) => {
                            setFormData((prevState) => ({
                              ...prevState,
                              ContractEndDate: date,
                            }))
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`endDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`endDate`]: false
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

            </Grid>
            <Grid container item spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={4}>
                <TextField
                  name="contractValue"
                  id="contractValue"
                  placeholder={intl.formatMessage(messages.contractValue)}
                  label={intl.formatMessage(messages.contractValue)}
                //   required
                  type="number"
                  className={`${classes.field} ${style.fieldsSty}`}
                  margin="normal"
                  variant="outlined"
                  value={formData.contractValue}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      contractValue: e.target.value,
                    }))
                  }}
                  autoComplete='off'
                />
              </Grid>
              </Grid>           
          </Grid>

          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={12}></Grid>
            <Grid
              item
              xs={12}
              md={4}
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
              className={style.itemsStyle}
            >
              <Grid item xs={3} md={5} lg={3}>
                <SaveButton Id={formData.id} />
              </Grid>
              <Grid item xs={3} md={5} lg={3}>
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
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

ContractCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ContractCreate);
