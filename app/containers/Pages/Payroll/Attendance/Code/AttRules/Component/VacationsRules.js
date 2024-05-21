import React,{memo} from "react";
import messages from "../../../messages";
import { injectIntl} from "react-intl";
import {
  Grid,
  TextField,
  Card,
  CardContent,
  Autocomplete,
} from "@mui/material";
import useStyles from "../../../../Style";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ControlParamvac from "./ControlParamvac";

function VacationsRules(props) {
  const {
    intl,
    data,
    setdata,
    group1ElemList,
    VacChoiceList,
    controlParaVacList,
    setcontrolParaVacList,
  } = props;

  const { classes } = useStyles();

  const handleChange = (event) => {
    if (event.target.name == "vacPen")
      setdata((prevFilters) => ({
        ...prevFilters,
        vacPen: event.target.value,
      }));

    if (event.target.name == "annualBal")
      setdata((prevFilters) => ({
        ...prevFilters,
        annualBal: event.target.value,
      }));

    if (event.target.name == "vacBeforeSd")
      setdata((prevFilters) => ({
        ...prevFilters,
        vacBeforeSd: event.target.value,
      }));

    if (event.target.name == "vacBeforeOv")
      setdata((prevFilters) => ({
        ...prevFilters,
        vacBeforeOv: event.target.value,
      }));

    if (event.target.name == "vacAfterSd")
      setdata((prevFilters) => ({
        ...prevFilters,
        vacAfterSd: event.target.value,
      }));
    if (event.target.name == "vacAfterOv")
      setdata((prevFilters) => ({
        ...prevFilters,
        vacAfterOv: event.target.value,
      }));
      if (event.target.name == "workDays")
      setdata((prevFilters) => ({
        ...prevFilters,
        workDays: event.target.value,
      }));
      if (event.target.name == "vacEquiv")
      setdata((prevFilters) => ({
        ...prevFilters,
        vacEquiv: event.target.value,
      }));

  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={3} alignItems="flex-start" direction="row">
          <Grid
            item
            md={12}
            xs={12}
            spacing={1}
            container
            alignItems="flex-start"
            direction="row"
          >
            <Grid item md={6} xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container alignItems="flex-start" direction="row">
                    <Grid
                      item
                      md={12}
                      xs={12}
                      container
                      direction="row"
                      spacing={0.6}
                    >
                      <Grid item md={6} xs={12}>
                        <Autocomplete
                          id="vacBalanceFromMonth"
                          options={VacChoiceList}
                          value={VacChoiceList.find(
                            (item) => item.id === data.vacBalanceFromMonth
                          )||null}
                          isOptionEqualToValue={(option, value) =>
                            value.id === 0 ||
                            value.id === "" ||
                            option.id === value.id
                          }
                          getOptionLabel={(option) =>
                            option.name ? option.name : ""
                          }
                          onChange={(event, value) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              vacBalanceFromMonth: value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="vacBalanceFromMonth"
                              label={intl.formatMessage(messages.vacBalanceFromMonth)}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="annualBal"
                          name="annualBal"
                          value={data.annualBal||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.annualBal)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.trainingPeriodHasBalance||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  trainingPeriodHasBalance: e.target.checked,
                                }))
                              }
                              value={data.trainingPeriodHasBalance||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.trainingPeriodHasBalance)}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.excludeVacDays||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  excludeVacDays: e.target.checked,
                                }))
                              }
                              value={data.excludeVacDays||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(
                            messages.excludeVacDays
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.vacBalaMonthly||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  vacBalaMonthly: e.target.checked,
                                }))
                              }
                              value={data.vacBalaMonthly||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(
                            messages.vacBalaMonthly
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.weekendSalary||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  weekendSalary: e.target.checked,
                                }))
                              }
                              value={data.weekendSalary||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.weekendSalary)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={6} xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container alignItems="flex-start" direction="row">
                    <Grid
                      item
                      md={12}
                      xs={12}
                      container
                      direction="row"
                      spacing={1}
                    >
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="vacBeforeSd"
                          name="vacBeforeSd"
                          value={data.vacBeforeSd||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.vac_before_SD)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="vacBeforeOv"
                          name="vacBeforeOv"
                          value={data.vacBeforeOv||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.vac_before_OV)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="vacAfterSd"
                          name="vacAfterSd"
                          value={data.vacAfterSd||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.vac_after_SD)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="vacAfterOv"
                          name="vacAfterOv"
                          value={data.vacAfterOv||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.vac_after_OV)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item md={12} xs={12}>
                        <Card className={classes.card}>
                          <CardContent>
                            <Grid
                              container
                              alignItems="flex-start"
                              direction="row"
                            >
                              <Grid
                                item
                                md={12}
                                xs={12}
                                container
                                direction="row"
                                spacing={1}
                              >
                                <Grid item xs={12} md={12}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={data.calcVacAuto||null}
                                        onChange={(e) =>
                                          setdata((prevFilters) => ({
                                            ...prevFilters,
                                            calcVacAuto: e.target.checked,
                                          }))
                                        }
                                        value={data.calcVacAuto||null}
                                        color="primary"
                                      />
                                    }
                                    label={intl.formatMessage(
                                      messages.calcVacAuto
                                    )}
                                  />
                                </Grid>

                                <Grid item md={6} xs={12}>
                                  <TextField
                                    id="workDays"
                                    name="workDays"
                                    value={data.workDays||null}
                                    onChange={(e) => handleChange(e)}
                                    label={intl.formatMessage(
                                      messages.workDays
                                    )}
                                    className={classes.field}
                                    variant="outlined"
                                    autoComplete='off'
                                  />
                                </Grid>

                                <Grid item md={6} xs={12}>
                                  <TextField
                                    id="vacEquiv"
                                    name="vacEquiv"
                                    value={data.vacEquiv||null}
                                    onChange={(e) => handleChange(e)}
                                    label={intl.formatMessage(
                                      messages.vacEquiv
                                    )}
                                    className={classes.field}
                                    variant="outlined"
                                    autoComplete='off'
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <hr className={classes.hr} />
          </Grid>
          <Grid item md={4} xs={12}>
            <Autocomplete
              id="vacPenEle"
              options={group1ElemList}
              value={group1ElemList.find((item) => item.id === data.vacPenEle)||null}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setdata((prevFilters) => ({
                  ...prevFilters,
                  vacPenEle: value !== null ? value.id : null,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="vacPenEle"
                  label={intl.formatMessage(messages.vacPenEle)}
                />
              )}
            />
          </Grid>
          <Grid item md={2} xs={12}>
            <TextField
              id="vacPen"
              name="vacPen"
              value={data.vacPen||null}
              onChange={(e) => handleChange(e)}
              label={intl.formatMessage(messages.vacPen)}
              className={classes.field}
              variant="outlined"
              autoComplete='off'
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Card className={classes.card}>
              <CardContent>
                <ControlParamvac
                  dataList={controlParaVacList}
                  setdataList={setcontrolParaVacList}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const MemoedVacationsRules = memo(VacationsRules);

export default injectIntl(MemoedVacationsRules);


