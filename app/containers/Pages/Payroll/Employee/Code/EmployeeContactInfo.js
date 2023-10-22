import React, { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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
import { useLocation } from "react-router-dom";
import { Backdrop, CircularProgress, Box } from "@mui/material";
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;

function EmployeeContactInfo(props) {
  const location = useLocation();
  const { empid } = location.state ?? { id: 0, name: "" };
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
  };
  const GetLookup = useCallback(async () => {
    try {
      const employeedata = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employeedata || []);
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
    <Box
      sx={{
        zIndex: 100,
        position: "relative",
      }}
    >
      <Backdrop
        sx={{
          color: "primary.main",
          zIndex: 10,
          position: "absolute",
          backgroundColor: "rgba(255, 255, 255, 0.69)",
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        direction="row"
        justifyContent="center"
      >
        <Grid item xs={12} md={6}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              {title}
            </Typography>
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
                  variant="standard"
                  {...params}
                  name="employee"
                  //  value={employee.id}
                  label={intl.formatMessage(messages.chooseEmp)}
                  margin="normal"
                />
              )}
            />

            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  id="telPhone"
                  name="telPhone"
                  value={telPhone}
                  onChange={(e) => settelPhone(e.target.value)}
                  placeholder="Telephone"
                  label="Telephone"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  id="mobile"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setmobile(e.target.value)}
                  placeholder="mobile"
                  label="mobile"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  id="workMobile"
                  name="workMobile"
                  value={workMobile}
                  onChange={(e) => setworkMobile(e.target.value)}
                  placeholder="work Mobile"
                  label="work Mobile"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  id="relativesPhoneNo"
                  name="relativesPhoneNo"
                  value={relativesPhoneNo}
                  onChange={(e) => setrelativesPhoneNo(e.target.value)}
                  placeholder="relatives Phone No"
                  label="relatives Phone No"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  type="email"
                  error={email === "Invalid email"}
                  id="mail"
                  name="mail"
                  value={mail}
                  onChange={(e) => setmail(e.target.value)}
                  placeholder="Email"
                  label="Email"
                  required
                  // validate={[required, email]}
                  className={classes.field}
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  type="email"
                  error={email === "Invalid email"}
                  id="workEmail"
                  name="workEmail"
                  value={workEmail}
                  onChange={(e) => setworkEmail(e.target.value)}
                  placeholder="work Email"
                  label="work Email"
                  required
                  // validate={[required, email]}
                  className={classes.field}
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={employee.id === 0}
                  >
                    <FormattedMessage {...Payrollmessages.save} />
                  </Button>
                  <Button
                    type="button"
                    disabled={employee.id === 0}
                    onClick={() => deletedata()}
                  >
                    <FormattedMessage {...Payrollmessages.delete} />
                  </Button>
                </div>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default injectIntl(EmployeeContactInfo);
