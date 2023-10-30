import React from "react";
import messages from "../../messages";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import { EditTable } from "../../../../../Tables/demos";
import {
  Grid,
  TextField,
  Card,
  CardContent,
  Autocomplete,
} from "@mui/material";
import useStyles from "../../../Style";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ControlParamLate from "./ControlParamLate";

function TimeDelayRules(props) {
  const { intl, data, setdata, group1ElemList,group2ElemList ,controlParaLateList,setControlParaLateList} = props;

  const { classes } = useStyles();

  const handleChange = (event) => {
    debugger;
    if (event.target.name == "perRoll")
      setdata((prevFilters) => ({
        ...prevFilters,
        perRoll: event.target.value,
      }));

    if (event.target.name == "lateTimeMinusElVal")
      setdata((prevFilters) => ({
        ...prevFilters,
        lateTimeMinusElVal: event.target.value,
      }));

    if (event.target.name == "calcLateByTime")
      setdata((prevFilters) => ({
        ...prevFilters,
        calcLateByTime: event.target.value,
      }));

    if (event.target.name == "maxLatePerMinutes")
      setdata((prevFilters) => ({
        ...prevFilters,
        maxLatePerMinutes: event.target.value,
      }));

    if (event.target.name == "maxLatePerNo")
      setdata((prevFilters) => ({
        ...prevFilters,
        maxLatePerNo: event.target.value,
      }));
    if (event.target.name == "lateAfterOverMaxTime")
      setdata((prevFilters) => ({
        ...prevFilters,
        lateAfterOverMaxTime: event.target.value,
      }));

    if (event.target.name == "lateAfterMinOver")
      setdata((prevFilters) => ({
        ...prevFilters,
        lateAfterMinOver: event.target.value,
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
                      spacing={1.2}
                    >
                      <Grid item md={6} xs={12}>
                        <Autocomplete
                          id="lateTimeEle"
                          options={group1ElemList}
                          value={group1ElemList.find(
                            (item) => item.id === data.lateTimeEle
                          )}
                          isOptionEqualToValue={(option, value) =>
                            value.id === 0 ||
                            value.id === "" ||
                            option.id === value.id
                          }
                          getOptionLabel={(option) =>
                            option.name ? option.name : ""
                          }
                          onChange={(event, value) => {
                            debugger ;
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              lateTimeEle: value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="AbsenceFirstElem"
                              label={intl.formatMessage(messages.lateTimeEle)}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Autocomplete
                          id="lateTimeMinusEl"
                          options={group2ElemList}
                          value={group2ElemList.find(
                            (item) => item.id === data.lateTimeMinusEl
                          )}
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
                              lateTimeMinusEl: value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="AbsenceFirstElem"
                              label={intl.formatMessage(
                                messages.lateTimeMinusEl
                              )}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="lateTimeMinusElVal"
                          name="lateTimeMinusElVal"
                          value={data.lateTimeMinusElVal}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(
                            messages.lateTimeMinusElVal
                          )}
                          className={classes.field}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <FormControl
                          variant="standard"
                          component="fieldset"
                          required
                        >
                          <RadioGroup
                            name="perRoll"
                            aria-label="Direction"
                            value={data.perRoll}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value="2"
                              control={<Radio />}
                              label={intl.formatMessage(messages.perRoll2)}
                            />
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              label={intl.formatMessage(messages.perRoll1)}
                            />
                          </RadioGroup>
                        </FormControl>
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
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.calcLateByTime}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  calcLateByTime: e.target.checked,
                                }))
                              }
                              value={data.calcLateByTime}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.calcLateByTime)}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.lessAsLate}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  lessAsLate: e.target.checked,
                                }))
                              }
                              value={data.lessAsLate}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(
                            messages.calclateTimeWithCount
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.lateTimeOnMonth}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  lateTimeOnMonth: e.target.checked,
                                }))
                              }
                              value={data.lateafterAllowed}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.lateTimeOnMonth)}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.perCompensated}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  perCompensated: e.target.checked,
                                }))
                              }
                              value={data.perCompensated}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.perCompensated)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <hr className={classes.hr} />

            <Grid item md={12} xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid
                      item
                      container
                      md={12}
                      xs={12}
                      alignItems="flex-start"
                      direction="row"
                      spacing={1}
                    >
                      <Grid item md={4} xs={12}>
                        <TextField
                          id="maxLatePerMinutes"
                          name="maxLatePerMinutes"
                          value={data.maxLatePerMinutes}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.maxLatePerMinutes)}
                          className={classes.field}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          id="maxLatePerNo"
                          name="maxLatePerNo"
                          value={data.maxLatePerNo}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.maxLatePerNo)}
                          className={classes.field}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          id="maxPerRoll1"
                          name="maxPerRoll1"
                          value={data.maxPerRoll1}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.maxPerRoll1)}
                          className={classes.field}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.lateAfterOver}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  lateAfterOver: e.target.checked,
                                }))
                              }
                              value={data.lateAfterOver}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.lateAfterOver)}
                        />
                      </Grid>
                      <Grid item md={2} xs={12}>
                        <TextField
                          id="lateAfterOverMaxTime"
                          name="lateAfterOverMaxTime"
                          value={data.lateAfterOverMaxTime}
                          onChange={(e) => handleChange(e)}
                          label={""}
                          className={classes.field}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          id="lateAfterMinOver"
                          name="lateAfterMinOver"
                          value={data.lateAfterMinOver}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.lateAfterMinOver)}
                          className={classes.field}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card className={classes.card}>
              <CardContent>
                <ControlParamLate dataList={controlParaLateList} setdataList={setControlParaLateList} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default injectIntl(TimeDelayRules);
