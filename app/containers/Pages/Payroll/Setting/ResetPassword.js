import React, { useEffect, useState, useCallback } from "react";
import { Button, Grid, TextField, Autocomplete } from "@mui/material";
import ResetPasswordData from "./api/ResetPasswordData";
import GeneralListApis from "../api/GeneralListApis";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import messages from "./messages";
import { injectIntl, FormattedMessage } from "react-intl";
import useStyles from "../Style";
import { useSelector } from "react-redux";
import { PapperBlock } from "enl-components";
import SaveButton from "../Component/SaveButton";
import Payrollmessages from "../messages";
import PayRollLoader from "../Component/PayRollLoader";

function ResetPassword(props) {
  const { classes } = useStyles();
  const { intl } = props;
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState();
  const [employeeList, setemployeeList] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [password, setPassword] = useState("");
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!employee || !password) {
        toast.error("Please Select Employee and enter Password");
        return;
      }

      const response = await ResetPasswordData().ResetUserPassword(
        employee,
        password
      );

      if (response.status == 200) {
        toast.success(notif.saved);
      } else {
        toast.error(response.statusText);
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const resetAll = async () => {
    try {
      setIsLoading(true);
      let response = await ResetPasswordData().ResetAllUsersPassword(password);

      if (response.status == 200) {
        toast.success(notif.saved);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNeededData = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await GeneralListApis(locale).GetDepartmentList();
      setDepartmentList(data || []);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setemployeeList(employees || []);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const GetEmployeeListByDepartment = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!department) {
        setemployeeList([]);
        return;
      }
      const data = await GeneralListApis(locale).GetEmployeeListByDepartment(
        department
      );
      setemployeeList(data || []);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    fetchNeededData();
  }, []);

  useEffect(() => {
    GetEmployeeListByDepartment();
  }, [department]);

  const onEmployeeAutocompleteChange = async (value) => {
    if (value !== null) {
      setEmployee(value.id);

      setIsLoading(true);

      try {
        const response = await ResetPasswordData().getEmployeeUsername(value.id);
        console.log(response);
      } catch (err) {
        //
      } finally {
        setIsLoading(false);
      }
    }

    setEmployee(null);
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc=''>
        <Grid container>
          <Grid item xs={12} md={6} >
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={12}>
                  <Autocomplete
                    id="ddldepartment"
                    options={departmentList}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                      setDepartment(value !== null ? value.id : null);
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        name="department"
                        value={department}
                        label={intl.formatMessage(messages.chooseDept)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    id="ddlEmp"
                    options={employeeList}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => onEmployeeAutocompleteChange(value)}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        name="employee"
                        value={employee}
                        required
                        label={intl.formatMessage(Payrollmessages.chooseEmp)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="userName"
                    value={userName}
                    label={intl.formatMessage(messages.userName)}
                    disabled
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    label={intl.formatMessage(messages.password)}
                    required
                    className={classes.field}
                    variant="outlined"
                    type="password"
                    autoComplete="new-password"
                    helperText={intl.formatMessage(messages.letPasswordEmptyWillGenerateRandomPassword)}
                  />
                </Grid>

              </Grid>
              <div style={{ paddingTop: "20px" }}>
                <Grid container spacing={3}>
                  <Grid item>
                    <SaveButton Id={1} />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      onClick={resetAll}
                    >
                      <FormattedMessage {...messages.resetallpassword} />
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </form>
          </Grid>
        </Grid>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(ResetPassword);
