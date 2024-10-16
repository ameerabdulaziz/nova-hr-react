import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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

function CustomerCreate(props) {
  // const [id, setid] = useState(0);
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


  const [formData,setFormData] = useState({
    id: 0,
    customerCode:"",
    customerNameEN:"",
    customerNameAR:"",
    customerAddress:"",
    customerPhone:"",
    customerEmail:"",
    customerWebsite:"",
    managerName:"",
    managerPhone:"",
    managerEmail:"",
    managerJobTitle:"",
  })





  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      id: formData.id,
      customerCode: formData.customerCode,
      arName: formData.customerNameAR,
      enName: formData.customerNameEN,
      address: formData.customerAddress,
      telepnone: formData.customerPhone,
      email: formData.customerEmail,
      webSite: formData.customerWebsite,
      accMgrName: formData.managerName,
      accMgrTelepnone: formData.managerPhone,
      accMgrEmail: formData.managerEmail,
      accMgrJob: formData.managerJobTitle,
    };

    
    

    try {

      let response = await CustomerData().save(data);

      // toast.success(notif.saved);
      // history.push(`/app/Pages/ProjectManagment/Customer`);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/ProjectManagment/Customer`);
      } else {
        console.log("response.status =", response);
        
        
        toast.error(response.statusText);
      }
    } catch (err) {
      console.log("err = ", err);
      
    } finally {
      setIsLoading(false);
    }
  };

  const getdata = async () => {
    // try {
    
    //   const employees = await GeneralListApis(locale).GetEmployeeList();
      

    //   const Departmentlist = await OrganizationData(locale).GetList();
    //   const Departments =Departmentlist.map((obj) => ({
    //     id: obj.id,
    //     name: locale=="en"?obj.enName:obj.arName,        
    //   }));

    //   var result

    //   setEmployeesData(employees);
    //   setParentData(Departments);
    // } catch (err) {
    // } finally {
      setIsLoading(false);
    // }
  };

  const getEditdata = async () => {
    try {
      setIsLoading(true);
      const data = await CustomerData(locale).GetById(ID);


      setFormData((prevState) => ({
        ...prevState,
        id: data.id,
        customerCode:data.customerCode,
        customerNameEN:data.enName,
        customerNameAR:data.arName,
        customerAddress:data.address,
        customerPhone:data.telepnone,
        customerEmail:data.email,
        customerWebsite:data.webSite,
        managerName:data.accMgrName,
        managerPhone:data.accMgrTelepnone,
        managerEmail:data.accMgrEmail,
        managerJobTitle:data.accMgrJob,
      }))

      // setid(data ? data[0].id : "");
      // setArName(data ? data[0].arName : "");
      // setEnName(data ? data[0].enName : "");
      // setParent(data ? { id: data[0].parentId, name: data[0].parentName } : "");
      // setManPower(data ? data[0].manPower : "");
      // setWorknatureAllowance(data && data[0].worknatureAllowance ? data[0].worknatureAllowance : "");
      // setNote(data && data[0].note ? data[0].note : "");
      // setEmployee(
      //   data ? { id: data[0].employeeId, name: data[0].empName } : ""
      // );
      // setIsDisclaimer(data && data[0].isDisclaimer ? data[0].isDisclaimer : false)
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (ID) {
      getEditdata();
    }
  }, [ID]);

  function oncancel() {
    history.push(`/app/Pages/ProjectManagment/Customer`);
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
          ? "edit Customer"
            : "create Customer"
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
              <Grid item xs={12} md={2}>
                <TextField
                  name="customerCode"
                  id="customerCode"
                  placeholder="Customer Code"
                  label="Customer Code"
                  // placeholder={intl.formatMessage(messages.arName)}
                  // label={intl.formatMessage(messages.arName)}
                  required
                  className={`${classes.field} ${style.fieldsSty}`}
                  margin="normal"
                  variant="outlined"
                  value={formData.customerCode}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      customerCode: e.target.value,
                    }))
                  }}
                  type="number"
                  autoComplete='off'
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  name="customerNameEN"
                  id="customerNameEN"
                  placeholder="Customer name EN"
                  label="Customer name EN"
                  // placeholder={intl.formatMessage(messages.enName)}
                  // label={intl.formatMessage(messages.enName)}
                  required
                  className={`${classes.field} ${style.fieldsSty}`}
                  margin="normal"
                  variant="outlined"
                  value={formData.customerNameEN}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      customerNameEN: e.target.value,
                    }))
                  }}
                  autoComplete='off'
                />
              </Grid>
              <Grid item xs={12} md={4}>
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
                  value={formData.customerNameAR}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      customerNameAR: e.target.value,
                    }))
                  }}
                  autoComplete='off'
                />
              </Grid>
            </Grid>
            <Grid item xs={10} >
                  <TextareaAutosize
                    name='customerAddress'
                    value={formData.customerAddress}
                    onChange={(e) => {
                      setFormData((prevState) => ({
                        ...prevState,
                        customerAddress: e.target.value,
                      }))
                    }}
                    required
                    maxRows={3}
                    placeholder="Customer Address"
                    // placeholder={intl.formatMessage(messages.Answer)}
                    className={`${style.investigationAnswer} ${classes.textareaSty}`}
                    autoComplete='off'
                  />
              </Grid>

              
              <Grid container item spacing={3} alignItems="flex-start" direction="row">
                <Grid item xs={12} md={4}>
                    <TextField
                      name="customerPhone"
                      id="customerPhone"
                      placeholder="Customer mobile number"
                      label="Customer mobile number"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={formData.customerPhone}
                      onChange={(e) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          customerPhone: e.target.value,
                        }))
                      }}
                      type="number"
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
                      required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={formData.customerEmail}
                      onChange={(e) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          customerEmail: e.target.value,
                        }))
                      }}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="customerWebsite"
                      id="customerWebsite"
                      placeholder="Customer web site"
                      label="Customer web site"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={formData.customerWebsite}
                      onChange={(e) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          customerWebsite: e.target.value,
                        }))
                      }}
                      autoComplete='off'
                    />
                  </Grid>

              </Grid>


              <Grid container item spacing={3} alignItems="flex-start" direction="row">
                <Grid item xs={12} md={4}>
                    <TextField
                      name="managerName"
                      id="managerName"
                      placeholder="Account manager name"
                      label="Account manager name"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={formData.managerName}
                      onChange={(e) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          managerName: e.target.value,
                        }))
                      }}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="managerPhone"
                      id="managerPhone"
                      placeholder="Account manager mobile number"
                      label="Account manager mobile number"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={formData.managerPhone}
                      onChange={(e) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          managerPhone: e.target.value,
                        }))
                      }}
                      type="number"
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
                      required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={formData.managerEmail}
                      onChange={(e) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          managerEmail: e.target.value,
                        }))
                      }}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name="managerJobTitle"
                      id="managerJobTitle"
                      placeholder="Account manager job Title"
                      label="Account manager job Title"
                      // placeholder={intl.formatMessage(messages.enName)}
                      // label={intl.formatMessage(messages.enName)}
                      required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={formData.managerJobTitle}
                      onChange={(e) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          managerJobTitle: e.target.value,
                        }))
                      }}
                      autoComplete='off'
                    />
                  </Grid>

              </Grid>

              {/* <Grid container item spacing={3} alignItems="flex-start" direction="row">
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="ddlMenu"
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    value={parent.length != 0 && parent !== null ? parent : null}
                    options={parentData.length != 0 ? parentData : []}
                    getOptionLabel={(option) => (option ? option.name : "")}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                    onChange={(event, value) => {
                      if (value !== null) {
                        setParent(value);
                      } else {
                        setParent("");
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Parent"
                        label="parentNameOrg"
                        // label={intl.formatMessage(messages.parentNameOrg)}
                        margin="normal"
                        className={style.fieldsSty}
                      />
                    )}
                  />
                </Grid>
            </Grid> */}

            {/* <Grid item xs={12} md={4}>
              <Autocomplete
                id="ddlMenu"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={
                  Employee.length != 0 && Employee !== null ? Employee : null
                }
                options={EmployeesData.length != 0 ? EmployeesData : []}
                getOptionLabel={(option) => (option ? option.name : "")}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
                }}
                onChange={(event, value) => {
                  if (value !== null) {
                    setEmployee(value);
                  } else {
                    setEmployee("");
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="employeeId"
                    value={Employee}
                    label="empName"
                    // label={intl.formatMessage(messages.empName)}
                    margin="normal"
                    className={style.fieldsSty}
                  />
                )}
              />
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

CustomerCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CustomerCreate);
