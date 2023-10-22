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
import { Backdrop, CircularProgress, Box } from "@mui/material";

function ResetPassword(props) {
  const { classes } = useStyles();
  const { intl } = props;
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState();
  const [employeeList, setemployeeList] = useState([]);
  const [employee, setEmployee] = useState();
  const [password, setPassword] = useState("");
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);

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
      let response = await ResetPasswordData().ResetAllUsersPassword();

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

  const GetDepartmentList = useCallback(async () => {
    try {
      const data = await GeneralListApis(locale).GetDepartmentList();
      setDepartmentList(data || []);
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
    GetDepartmentList();
  }, []);

  useEffect(() => {
    GetEmployeeListByDepartment();
  }, [department]);

  return (
    <Grid
      container
      spacing={3}
      alignItems="flex-start"
      direction="row"
      justifyContent="center"
    >
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            zIndex: 100,
            position: "relative",
          }}
        >
          <PapperBlock whiteBg icon="border_color" title={Title} desc="">
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

            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                justifyContent="center"
              >
                <Grid item xs={12} md={12}>
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
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Autocomplete
                    id="ddlEmp"
                    options={employeeList}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) =>
                      setEmployee(value !== null ? value.id : null)
                    }
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        name="employee"
                        value={employee}
                        label={intl.formatMessage(Payrollmessages.chooseEmp)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
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
                  />
                </Grid>
              </Grid>
              <div style={{ paddingTop: "20px" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <SaveButton Id={1} processing={processing} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
          </PapperBlock>
        </Box>
      </Grid>
    </Grid>
  );
}

export default injectIntl(ResetPassword);
