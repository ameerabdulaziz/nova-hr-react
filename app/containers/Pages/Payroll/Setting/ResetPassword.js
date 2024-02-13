import React, { useEffect, useState, useCallback } from "react";
import { Button, Grid, TextField, Autocomplete } from "@mui/material";
import ResetPasswordData from "./api/ResetPasswordData";
import PropTypes from 'prop-types';
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

      await ResetPasswordData().ResetUserPassword(
        employee,
        password
      );

      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const resetAll = async () => {
    try {
      setIsLoading(true);
      await ResetPasswordData().ResetAllUsersPassword(password);

      toast.success(notif.saved);
    } catch (err) {
      //
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
      //
    } finally {
      setIsLoading(false);
    }
  }, []);

  const GetEmployeeListByDepartment = useCallback(async () => {
    try {
      setIsLoading(true);
      setEmployee(null);
      setUserName('');

      const data = department
        ? await GeneralListApis(locale).GetEmployeeListByDepartment(department)
        : await GeneralListApis(locale).GetEmployeeList();

      setemployeeList(data || []);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }, [department]);

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
        setUserName(response);
      } catch (err) {
        //
      } finally {
        setIsLoading(false);
      }
    } else {
      setEmployee(null);
      setUserName('');
    }
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
                    value={departmentList.find(item => item.id === department) ?? null}
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
                        label={intl.formatMessage(messages.chooseDept)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    id="ddlEmp"
                    options={employeeList}
                    value={employeeList.find(item => item.id === employee) ?? null}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => onEmployeeAutocompleteChange(value)}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        name="employee"
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
                    autoComplete='off'
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
                    // autoComplete="new-password"
                    helperText={intl.formatMessage(messages.letPasswordEmptyWillGenerateRandomPassword)}
                    autoComplete='off'
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

ResetPassword.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ResetPassword);
