import React from "react";
import messages from "../../messages";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { Grid, TextField, Card, CardContent, FormLabel } from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function MaxOverTiemRules(props) {
  const { intl, data, setdata } = props;
  const { classes } = useStyles();

  const handleChange = (event) => {
    if (event.target.name == "maxOvertimeHrsShiftVacDay")
      setdata((prevFilters) => ({
        ...prevFilters,
        maxOvertimeHrsShiftVacDay: event.target.value,
      }));

    if (event.target.name == "maxOvertimeHrsOrdinaryDay")
      setdata((prevFilters) => ({
        ...prevFilters,
        maxOvertimeHrsOrdinaryDay: event.target.value,
      }));

    if (event.target.name == "maxOvertimeHrsPerMonth")
      setdata((prevFilters) => ({
        ...prevFilters,
        maxOvertimeHrsPerMonth: event.target.value,
      }));

    if (event.target.name == "maxOvertimeHrsOfficialVacDay")
      setdata((prevFilters) => ({
        ...prevFilters,
        maxOvertimeHrsOfficialVacDay: event.target.value,
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.overTimeApprov}
                    onChange={(e) =>
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        overTimeApprov: e.target.checked,
                      }))
                    }
                    value={data.overTimeApprov}
                    color="primary"
                  />
                }
                label={intl.formatMessage(messages.overTimeApprov)}
              />
            </Grid>
            <Grid item md={6} xs={12}></Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="maxOvertimeHrsOrdinaryDay"
                name="maxOvertimeHrsOrdinaryDay"
                value={data.maxOvertimeHrsOrdinaryDay}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.maxOvertimeHrsOrdinaryDay)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="maxOvertimeHrsPerMonth"
                name="maxOvertimeHrsPerMonth"
                value={data.maxOvertimeHrsPerMonth}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.maxOvertimeHrsPerMonth)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={1}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={6}>
                      <TextField
                        id="maxOvertimeHrsShiftVacDay"
                        name="maxOvertimeHrsShiftVacDay"
                        value={data.maxOvertimeHrsShiftVacDay}
                        onChange={(e) => handleChange(e)}
                        label={intl.formatMessage(
                          messages.maxOvertimeHrsShiftVacDay
                        )}
                        className={classes.field}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.calcShiftOverTAsDay}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                calcShiftOverTAsDay: e.target.checked,
                              }))
                            }
                            value={data.calcShiftOverTAsDay}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.calcShiftOverTAsDay)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        id="maxOvertimeHrsOfficialVacDay"
                        name="maxOvertimeHrsOfficialVacDay"
                        value={data.maxOvertimeHrsOfficialVacDay}
                        onChange={(e) => handleChange(e)}
                        label={intl.formatMessage(
                          messages.maxOvertimeHrsOfficialVacDay
                        )}
                        className={classes.field}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.calcOfficialOverTAsDay}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                calcOfficialOverTAsDay: e.target.checked,
                              }))
                            }
                            value={data.calcOfficialOverTAsDay}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(
                          messages.calcOfficialOverTAsDay
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <hr className={classes.hr} />
            <Grid item md={12} xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.overTimeApprDown}
                    onChange={(e) =>
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        overTimeApprDown: e.target.checked,
                      }))
                    }
                    value={data.overTimeApprDown}
                    color="primary"
                  />
                }
                label={intl.formatMessage(messages.overTimeApprDown)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={0.3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item md={12} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.overTimeAppr}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                overTimeAppr: e.target.checked,
                              }))
                            }
                            value={data.overTimeAppr}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.overTimeAppr)}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      
                      <FormLabel component="label" className={classes.redLabel} >
                        {intl.formatMessage(messages.overTimeApprLabel)}
                      </FormLabel>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <FormLabel component="label" className={classes.redLabel}>
                        {intl.formatMessage(messages.overTimeApprLabel2)}
                      </FormLabel>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <FormLabel component="label" className={classes.redLabel}>
                        {intl.formatMessage(messages.overTimeApprLabel3)}
                      </FormLabel>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <FormLabel component="label" className={classes.redLabel}>
                        {intl.formatMessage(messages.overTimeApprLabel4)}
                      </FormLabel>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item md={12} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.ovTiFromOut}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                ovTiFromOut: e.target.checked,
                              }))
                            }
                            value={data.ovTiFromOut}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.ovTiFromOut)}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <FormLabel component="label" className={classes.redLabel}>
                        {intl.formatMessage(messages.ovTiFromOutLabel)}
                      </FormLabel>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default injectIntl(MaxOverTiemRules);
