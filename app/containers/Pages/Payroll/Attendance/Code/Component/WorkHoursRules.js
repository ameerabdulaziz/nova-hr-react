import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/ShiftData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import {
  Grid,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import useStyles from "../../../Style";

function WorkHoursRules(props) {
  const {
    intl,
    data,
    setdata,
    
  } = props;
  
  const { classes } = useStyles();

  const handleChange = (event) => {
    if (event.target.name == "hoursPerDay")
      setdata((prevFilters) => ({
        ...prevFilters,
        hoursPerDay: event.target.value,
      }));

    if (event.target.name == "monthDays")
      setdata((prevFilters) => ({
        ...prevFilters,
        monthDays: event.target.value,
      }));

    if (event.target.name == "updateInAfter")
      setdata((prevFilters) => ({
        ...prevFilters,
        updateInAfter: event.target.value,
      }));

    if (event.target.name == "updateOutBefore")
      setdata((prevFilters) => ({
        ...prevFilters,
        updateOutBefore: event.target.value,
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
            spacing={3}
            container
            alignItems="flex-start"
            direction="row"
          >
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.salaryOnWorkD}
                    onChange={(e) =>
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        salaryOnWorkD: e.target.checked,
                      }))
                    }
                    value={data.salaryOnWorkD}
                    color="primary"
                  />
                }
                label={intl.formatMessage(messages.salaryOnWorkD)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="hoursPerDay"
                name="hoursPerDay"
                value={data.hoursPerDay}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.hoursPerDay)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="monthDays"
                name="monthDays"
                value={data.arName}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.monthDays)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="updateInAfter"
                name="updateInAfter"
                value={data.updateInAfter}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.updateInAfter)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="updateOutBefore"
                name="updateOutBefore"
                value={data.updateOutBefore}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.updateOutBefore)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default injectIntl(WorkHoursRules);
