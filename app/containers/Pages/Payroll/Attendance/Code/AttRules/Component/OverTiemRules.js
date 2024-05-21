import React,{memo} from "react";
import messages from "../../../messages";
import { injectIntl } from "react-intl";
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
import ControlParamOvertime from "./ControlParamOvertime";

function OverTiemRules(props) {
  const {
    intl,
    data,
    setdata,
    group5ElemList,
    controlParaOvertimeList,
    setcontrolParaOvertimeList,
  } = props;

  const { classes } = useStyles();

  const handleChange = (event) => {
    
    if (event.target.name == "usualOverTimeH")
      setdata((prevFilters) => ({
        ...prevFilters,
        usualOverTimeH: event.target.value,
      }));

    if (event.target.name == "usualOverTimeHNight")
      setdata((prevFilters) => ({
        ...prevFilters,
        usualOverTimeHNight: event.target.value,
      }));

    if (event.target.name == "shiftVacOverTimeH")
      setdata((prevFilters) => ({
        ...prevFilters,
        shiftVacOverTimeH: event.target.value,
      }));

    if (event.target.name == "vacOverTimeH")
      setdata((prevFilters) => ({
        ...prevFilters,
        vacOverTimeH: event.target.value,
      }));

    if (event.target.name == "worKnighDayVal")
      setdata((prevFilters) => ({
        ...prevFilters,
        worKnighDayVal: event.target.value,
      }));

    if (event.target.name == "overtimestartFromMin")
      setdata((prevFilters) => ({
        ...prevFilters,
        overtimestartFromMin: event.target.value,
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
                      spacing={1}
                    >
                      <Grid item md={6} xs={12}>
                        <Autocomplete
                          id="overTimeElem"
                          options={group5ElemList}
                          value={group5ElemList.find(
                            (item) => item.id === data.overTimeElem
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
                              overTimeElem: value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="overTimeElem"
                              label={intl.formatMessage(messages.overTimeElem)}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <TextField
                          id="usualOverTimeH"
                          name="usualOverTimeH"
                          value={data.usualOverTimeH||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.usualOverTimeH)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <TextField
                          id="usualOverTimeHNight"
                          name="usualOverTimeHNight"
                          value={data.usualOverTimeHNight||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.usualOverTimeHNight)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item md={8} xs={12}>
                        <Autocomplete
                          id="shiftvacOverTimeEl"
                          options={group5ElemList}
                          value={group5ElemList.find(
                            (item) => item.id === data.shiftvacOverTimeEl
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
                              shiftvacOverTimeEl: value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="shiftvacOverTimeEl"
                              label={intl.formatMessage(messages.shiftvacOverTimeEl)}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <TextField
                          id="shiftVacOverTimeH"
                          name="shiftVacOverTimeH"
                          value={data.shiftVacOverTimeH||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.shiftVacOverTimeH)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item md={8} xs={12}>
                        <Autocomplete
                          id="vacOverTimeEl"
                          options={group5ElemList}
                          value={group5ElemList.find(
                            (item) => item.id === data.vacOverTimeEl
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
                              vacOverTimeEl: value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="vacOverTimeEl"
                              label={intl.formatMessage(messages.vacOverTimeEl)}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <TextField
                          id="vacOverTimeH"
                          name="vacOverTimeH"
                          value={data.vacOverTimeH||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.vacOverTimeH)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item md={8} xs={12}>
                        <Autocomplete
                          id="worKnighElem"
                          options={group5ElemList}
                          value={group5ElemList.find(
                            (item) => item.id === data.worKnighElem
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
                              worKnighElem: value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="worKNighElem"
                              label={intl.formatMessage(messages.worKNighElem)}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <TextField
                          id="worKnighDayVal"
                          name="worKnighDayVal"
                          value={data.worKnighDayVal||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.worKNighDayVal)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <TextField
                          id="overtimestartFromMin"
                          name="overtimestartFromMin"
                          value={data.overtimestartFromMin||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.overtimestartFromMin)}
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

            <Grid item md={6} xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container alignItems="flex-start" direction="row">
                    <Grid item md={12} xs={12} container direction="row" spacing={3.5}>
                      
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.morOverTime||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  morOverTime: e.target.checked,
                                }))
                              }
                              value={data.morOverTime||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.morOverTime)}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.shift24||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  shift24: e.target.checked,
                                }))
                              }
                              value={data.shift24||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(
                            messages.shift24
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.initRepVacBalanceEveryMonth||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  initRepVacBalanceEveryMonth: e.target.checked,
                                }))
                              }
                              value={data.initRepVacBalanceEveryMonth||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(
                            messages.init_RepVacBalance_EveryMonth
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.overTimeOnShift||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  overTimeOnShift: e.target.checked,
                                }))
                              }
                              value={data.overTimeOnShift||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.overTimeOnShift)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <hr className={classes.hr} />

          </Grid>
          <Grid item xs={12} md={12}>
            <Card className={classes.card}>
              <CardContent>
                <ControlParamOvertime
                  dataList={controlParaOvertimeList}
                  setdataList={setcontrolParaOvertimeList}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}


const MemoedOverTiemRules = memo(OverTiemRules);

export default injectIntl(MemoedOverTiemRules);
