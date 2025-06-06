import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import { PapperBlock } from "enl-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EmployeeContactInfoData from "../api/EmployeeContactInfoData";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";
import messages from "../messages";
import GeneralListApis from "../../api/GeneralListApis";
import { Autocomplete } from "@mui/material";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import notif from "enl-api/ui/notifMessage";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";

import style from '../../../../../styles/styles.scss'
import DecryptUrl from "../../Component/DecryptUrl";
import { useLocation } from "react-router-dom";

const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;

function EmployeeContactInfo(props) {

  const location = useLocation();

  // get employee data from url
  const empid  = DecryptUrl() ?   DecryptUrl()  : location.state ? location.state : { id: 0, name: "" }

  const { intl, pristine } = props;
  const title = localStorage.getItem("MenuName");
  const [employee, setEmployee] = useState(empid ?? { id: 0, name: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [id, setid] = useState(0);
  const [telPhone, settelPhone] = useState("");
  const [mobile, setmobile] = useState("");
  const [workMobile, setworkMobile] = useState("");
  const [relativesPhoneNo, setrelativesPhoneNo] = useState("");
  const [mail, setmail] = useState("");
  const [workEmail, setworkEmail] = useState("");
  const [RelativesName, setRelativesName] = useState("");

  const [kinshipLinkId, setkinshipLinkId] = useState(null);
  const [kinshipLinkList, setkinshipLinkList] = useState([]);
  const trueBool = true;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const data = {
        id: id,
        employeeId: employee.id,
        telPhone: telPhone,
        mobile: mobile,
        workMobile: workMobile,
        relativesPhoneNo: relativesPhoneNo,
        email: mail,
        workEmail: workEmail,
        RelativesName: RelativesName,
        KinshipLinkId: kinshipLinkId
      };

      const dataApi = await EmployeeContactInfoData().Save(data);
      if (dataApi.status == 200) {
        if (id == 0) setid(dataApi.data.id);
        toast.success(notif.saved);
      } else {
        toast.error(dataApi.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const clear = (e) => {
    setid(0);
    settelPhone("");
    setmobile("");
    setworkMobile("");
    setrelativesPhoneNo("");
    setmail("");
    setworkEmail("");
    setRelativesName("")
    setkinshipLinkId(null)
  };
  const GetLookup = useCallback(async () => {
    setIsLoading(true);

    try {
      const employeedata = await GeneralListApis(locale).GetEmployeeList();
      const kinshipLinkdata = await GeneralListApis(locale).GetkinshipLinkList();


      setEmployeeList(employeedata || []);
      setkinshipLinkList(kinshipLinkdata || []);

    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    GetLookup();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const dataApi = await EmployeeContactInfoData().GetList(employee.id);

        if (dataApi.length > 0) {
          setid(dataApi[0].id);
          setrelativesPhoneNo(dataApi[0].relativesPhoneNo);
          setworkMobile(dataApi[0].workMobile);
          setmobile(dataApi[0].mobile);
          settelPhone(dataApi[0].telPhone);
          setmail(dataApi[0].email);
          setworkEmail(dataApi[0].workEmail);
          setRelativesName(dataApi[0].relativesName);
          setkinshipLinkId(dataApi[0].kinshipLinkId);
        } else clear();
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [employee]);

  const deletedata = async (e) => {
    try {
      setIsLoading(true);
      const dataApi = await EmployeeContactInfoData().Delete(id);
      if (dataApi.status == 200) {
        clear();
        toast.error(notif.removed);
      } else {
        toast.error(dataApi.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={title} desc="">
        <Grid
          container
          spacing={3}
          direction="row"
        >
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={3}
              >
                <Grid item xs={12} md={8} lg={6} xl={4}>
                  <Autocomplete
                    id="ddlEmp"
                    options={employeeList}
                    value={{ id: employee.id, name: employee.name }}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 || value.id === "" || option.id === value.id
                    }
                    getOptionLabel={(option) => (option.name ? option.name : "")}
                    onChange={(event, value) => {
                      setEmployee({
                        id: value !== null ? value.id : 0,
                        name: value !== null ? value.name : "",
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        name="employee"
                        //  value={employee.id}
                        label={intl.formatMessage(messages.chooseEmp)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4} lg={3} xl={2}>
                  <TextField
                    id="mobile"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                    label={intl.formatMessage(messages.mobile)}
                    // validate={required}
                    required
                    className={classes.field}
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={4} lg={3} xl={2}>
                  <TextField
                    id="telPhone"
                    name="telPhone"
                    value={telPhone}
                    onChange={(e) => settelPhone(e.target.value)}
                    label={intl.formatMessage(messages.workMobile)}
                    // validate={required}
                    className={classes.field}
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>

                {/* <Grid item xs={12} md={4} lg={3} xl={2}>
                  <TextField
                    id="workMobile"
                    name="workMobile"
                    value={workMobile}
                    onChange={(e) => setworkMobile(e.target.value)}
                    label="work Mobile"
                    // validate={required}
                    required
                    className={classes.field}
                    variant="outlined"
                  />
                </Grid> */}

                <Grid item xs={12} md={4} lg={3} xl={2}>
                  <TextField
                    id="relativesPhoneNo"
                    name="relativesPhoneNo"
                    value={relativesPhoneNo}
                    onChange={(e) => setrelativesPhoneNo(e.target.value)}
                    label={intl.formatMessage(messages.relativePhoneNumber)}
                    // validate={required}
                    className={classes.field}
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={4} lg={3} xl={2}>
                  <TextField
                    type="email"
                    name="workEmail"
                    value={workEmail}
                    label={intl.formatMessage(messages.workEmail)}
                    required
                    onChange={(e) => setworkEmail(e.target.value)}
                    fullWidth
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={4} lg={3} xl={2}>
                  <TextField
                    type="email"
                    error={email === "Invalid email"}
                    id="mail"
                    name="mail"
                    value={mail}
                    onChange={(e) => setmail(e.target.value)}
                    label={intl.formatMessage(messages.email)}
                    // validate={[required, email]}
                    className={classes.field}
                    // autoComplete="email"
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={4} lg={3} xl={2}>
                  <TextField
                    name="RelativesName"
                    value={RelativesName}
                    label={intl.formatMessage(messages.RelativesName)}
                    onChange={(e) => setRelativesName(e.target.value)}
                    fullWidth
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={4} lg={3} xl={2}>
                <Autocomplete
                  id="ddkinshipLinkId"
                  options={kinshipLinkList}
                  value={ kinshipLinkId && kinshipLinkList.length !== 0  ? kinshipLinkList.find((item)=> item.id === kinshipLinkId )  : null}  
                  isOptionEqualToValue={(option, value) => option.id === value.id}    

                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  onChange={(event, value) => {
                    if (value !== null) {
                      setkinshipLinkId(value.id);
                    } else {
                      setkinshipLinkId(null);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="kinshipLinkId"
                      label={intl.formatMessage(messages.kinshipLink)}
                      variant="outlined"
                    />
                  )}
                />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={employee.id === 0}
                    className={style.generalBtnStys}
                  >
                    <FormattedMessage {...Payrollmessages.save} />
                  </Button>
                  <Button
                    type="button"
                    disabled={employee.id === 0}
                    onClick={() => deletedata()}
                    className={style.generalBtnStys}
                  >
                    <FormattedMessage {...Payrollmessages.delete} />
                  </Button>
                </Grid>
              </Grid>

            </form>
          </Grid>
        </Grid>
      </PapperBlock>
    </PayRollLoaderInForms>
  );
}

export default injectIntl(EmployeeContactInfo);
