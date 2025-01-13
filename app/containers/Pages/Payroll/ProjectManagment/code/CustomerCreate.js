import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
import { TextareaAutosize } from '@mui/material';
import SITEMAP from "../../../../App/routes/sitemap";

function CustomerCreate(props) {
  const locale = useSelector((state) => state.language.locale);
  const { state } = useLocation();
  const ID = state?.id;
  const history = useHistory();
  const { intl } = props;
  const [isLoading, setIsLoading] = useState(false);
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

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.projectManagement.Customer.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {      
    } finally {
      setIsLoading(false);
    }
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

    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (ID) {
      getEditdata();
    }
  }, [ID]);

  function oncancel() {
    history.push(SITEMAP.projectManagement.Customer.route);
  }

 
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          ID ?
              intl.formatMessage(messages.editCustomer)
            : intl.formatMessage(messages.createCustomer)
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
                  placeholder={intl.formatMessage(messages.customerCode)}
                  label={intl.formatMessage(messages.customerCode)}
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
                  placeholder={intl.formatMessage(messages.customerNameEn)}
                  label={intl.formatMessage(messages.customerNameEn)}
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
                  // placeholder="Customer name AR"
                  // label="Customer name AR"
                  placeholder={intl.formatMessage(messages.customerNameAR)}
                  label={intl.formatMessage(messages.customerNameAR)}
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
                    // placeholder="Customer Address"
                    placeholder={intl.formatMessage(messages.customerAddress)}
                    className={`${style.investigationAnswer} ${classes.textareaSty}`}
                    autoComplete='off'
                  />
              </Grid>

              
              <Grid container item spacing={3} alignItems="flex-start" direction="row">
                <Grid item xs={12} md={4}>
                    <TextField
                      name="customerPhone"
                      id="customerPhone"
                      // placeholder="Customer mobile number"
                      // label="Customer mobile number"
                      placeholder={intl.formatMessage(messages.customerPhone)}
                      label={intl.formatMessage(messages.customerPhone)}
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
                      // placeholder="Customer Email"
                      // label="Customer Email"
                      placeholder={intl.formatMessage(messages.customerEmail)}
                      label={intl.formatMessage(messages.customerEmail)}
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
                      // placeholder="Customer web site"
                      // label="Customer web site"
                      placeholder={intl.formatMessage(messages.customerWebsite)}
                      label={intl.formatMessage(messages.customerWebsite)}
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
                      // placeholder="Account manager name"
                      // label="Account manager name"
                      placeholder={intl.formatMessage(messages.managerName)}
                      label={intl.formatMessage(messages.managerName)}
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
                      // placeholder="Account manager mobile number"
                      // label="Account manager mobile number"
                      placeholder={intl.formatMessage(messages.accountManagerMobileNumber)}
                      label={intl.formatMessage(messages.accountManagerMobileNumber)}
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
                      // placeholder="Account manager Email"
                      // label="Account manager Email"
                      placeholder={intl.formatMessage(messages.accountManagerEmail)}
                      label={intl.formatMessage(messages.accountManagerEmail)}
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
                      // placeholder="Account manager job Title"
                      // label="Account manager job Title"
                      placeholder={intl.formatMessage(messages.accountManagerJobTitle)}
                      label={intl.formatMessage(messages.accountManagerJobTitle)}
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
