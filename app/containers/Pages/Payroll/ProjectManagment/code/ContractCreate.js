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
import GeneralListApis from "../../api/GeneralListApis";
import { PapperBlock } from "enl-components";
import useStyles from "../../Style";
import SaveButton from "../../Component/SaveButton";
import PayRollLoader from "../../Component/PayRollLoader";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextareaAutosize } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from "date-fns";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function ContractCreate(props) {
  const [id, setid] = useState(0);
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [note, setNote] = useState("");
  const [manPower, setManPower] = useState(0);
  const [worknatureAllowance, setWorknatureAllowance] = useState("");
  const [Employee, setEmployee] = useState("");
  const [parent, setParent] = useState("");
  const locale = useSelector((state) => state.language.locale);
  const { state } = useLocation();
  const ID = state?.id;
  const [EmployeesData, setEmployeesData] = useState([]);
  const [parentData, setParentData] = useState([]);
  const [errorMesManPower, setErrorMesManPower] = useState(false);
  const [errorMesWorknature, setErrorMesWorknature] = useState(false);
  const history = useHistory();
  const { intl } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [IsDisclaimer ,setIsDisclaimer] = useState(false)

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

      // toast.success(notif.saved);
      // history.push(`/app/Pages/ProjectManagment/Contract`);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/ProjectManagment/Contract`);
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
      

      // const Departmentlist = await OrganizationData(locale).GetList();
      // const Departments =Departmentlist.map((obj) => ({
      //   id: obj.id,
      //   name: locale=="en"?obj.enName:obj.arName,        
      // }));

      // var result

      // setEmployeesData(employees);
      // setParentData(Departments);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const getEditdata = async () => {
    try {
      setIsLoading(true);
      const data = await ContractData(locale).GetById(ID);

      console.log("customerList =", customerList);
      
      console.log("hhh =", customerList.find((item) => item.id === data?.customerId));
      


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
    history.push(`/app/Pages/ProjectManagment/Contract`);
  }

  const errorMesFun = (e, type) => {
    let pattern = /^[0-9]+$/g;
    let result = pattern.test(e.target.value);
    if (type === "manPower") {
      setErrorMesManPower(result);
    } else {
      setErrorMesWorknature(result);
    }
  };


console.log("formData =", formData);


  

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          ID
          ? "edit Contract"
            : "create Contract"
            // ? intl.formatMessage(messages.editOrganization)
            // : intl.formatMessage(messages.createOrganization)
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
                  placeholder="Contract Code"
                  label="Contract Code"
                  // placeholder={intl.formatMessage(messages.arName)}
                  // label={intl.formatMessage(messages.arName)}
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
                    // options={[]}
                    getOptionLabel={(option) => (option ? locale === "en" ? option.enName : option.arName : "")}
                    // getOptionLabel={(option) => (option ? option.name : "")}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {locale === "en" ? option.enName : option.arName}
                          {/* {option.name} */}
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
                        label="Customer"
                        // label={intl.formatMessage(messages.parentNameOrg)}
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
                          label="Contract Start Date"
                        // label={intl.formatMessage(Payrollmessages.date)}
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
                        label="Contract End Date"
                        // label={intl.formatMessage(Payrollmessages.date)}
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

              
              {/* <Grid item xs={12} md={4}>
                <TextField
                  name="customerNameAR"
                  id="customerNameAR"
                  placeholder="Customer name AR"
                  label="Customer name AR"
                  // placeholder={intl.formatMessage(messages.enName)}
                  // label={intl.formatMessage(messages.enName)}
                  required
                  className={`${classes.field} ${style.fieldsSty}`}
                  margin="normal"
                  variant="outlined"
                  value={enName}
                  onChange={(e) => setEnName(e.target.value)}
                  autoComplete='off'
                />
              </Grid> */}
            </Grid>
            <Grid container item spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={4}>
                <TextField
                  name="contractValue"
                  id="contractValue"
                  placeholder="Contract Value"
                  label="Contract Value"
                  // placeholder={intl.formatMessage(messages.enName)}
                  // label={intl.formatMessage(messages.enName)}
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
            {/* <Grid item xs={4} >
                  <TextareaAutosize
                  name='Description'
                  value={formData.Description}
                   onChange={(e)=>{
                    setFormData((prevState) => ({
                      ...prevState,
                      Description: e.target.value,
                    }))
                   }}
                    maxRows={3}
                    placeholder="Description"
                    // placeholder={intl.formatMessage(messages.Answer)}
                    className={`${style.investigationAnswer} ${classes.textareaSty}`}
                    autoComplete='off'
                  />
              </Grid> */}

{/*               
              <Grid container item spacing={3} alignItems="flex-start" direction="row">
                <Grid item xs={12} md={4}>
                    <TextField
                      name="customerPhone"
                      id="customerPhone"
                      placeholder="Customer mobile number"
                      label="Customer mobile number"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      // required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={enName}
                      onChange={(e) => setEnName(e.target.value)}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="customerEmail"
                      id="customerEmail"
                      placeholder="Customer Email"
                      label="Customer Email"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      // required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={enName}
                      onChange={(e) => setEnName(e.target.value)}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="website"
                      id="website"
                      placeholder="Customer web site"
                      label="Customer web site"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      // required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={enName}
                      onChange={(e) => setEnName(e.target.value)}
                      autoComplete='off'
                    />
                  </Grid>

              </Grid> */}

{/* 
              <Grid container item spacing={3} alignItems="flex-start" direction="row">
                <Grid item xs={12} md={4}>
                    <TextField
                      name="magName"
                      id="magName"
                      placeholder="Account manager name"
                      label="Account manager name"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      // required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={enName}
                      onChange={(e) => setEnName(e.target.value)}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="phone"
                      id="phone"
                      placeholder="Account manager phone"
                      label="Account manager phone"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      // required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={enName}
                      onChange={(e) => setEnName(e.target.value)}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="managerEmail"
                      id="managerEmail"
                      placeholder="Account manager Email"
                      label="Account manager Email"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      // required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={enName}
                      onChange={(e) => setEnName(e.target.value)}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="jobTitle"
                      id="jobTitle"
                      placeholder="Account manager job Title"
                      label="Account manager job Title"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      // required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={enName}
                      onChange={(e) => setEnName(e.target.value)}
                      autoComplete='off'
                    />
                  </Grid>

              </Grid> */}
            
           
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
