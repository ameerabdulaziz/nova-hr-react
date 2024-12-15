import React,{memo} from "react";
import messages from "../../../messages";
import { injectIntl} from "react-intl";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
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
import ControlParamLate from "./ControlParamLate";

function TimeDelayRules(props) {
  const { intl, data, setdata, group1ElemList ,controlParaLateList,setControlParaLateList} = props;

  const { classes } = useStyles();

  const handleChange = (event) => {
    
    
    if (event.target.name == "breakFactor")
      setdata((prevFilters) => ({
        ...prevFilters,
        breakFactor: event.target.value,
      }));
      
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
      
      if (event.target.name == "maxPerRoll1")
      setdata((prevFilters) => ({
        ...prevFilters,
        maxPerRoll1: event.target.value,
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
                          options={group1ElemList}
                          value={group1ElemList.find(
                            (item) => item.id === data.lateTimeMinusEl
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
                      <Grid item md={4} xs={12}>
                        <TextField
                          id="lateTimeMinusElVal"
                          name="lateTimeMinusElVal"
                          value={data.lateTimeMinusElVal||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(
                            messages.lateTimeMinusElVal
                          )||null}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <Autocomplete
                          id="breakElement"
                          options={group1ElemList}
                          value={group1ElemList.find(
                            (item) => item.id === data.breakElement
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
                              breakElement: value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="breakElement"
                              label={intl.formatMessage(
                                messages.breakElement
                              )}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          id="breakFactor"
                          name="breakFactor"
                          value={data.breakFactor||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(
                            messages.breakFactor
                          )||null}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
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
                            value={data.perRoll||null}
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
                              checked={data.calcLateByTime||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  calcLateByTime: e.target.checked,
                                }))
                              }
                              value={data.calcLateByTime||null}
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
                              checked={data.lessAsLate||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  lessAsLate: e.target.checked,
                                }))
                              }
                              value={data.lessAsLate||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(
                            messages.lessAsLate
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.lateTimeOnMonth||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  lateTimeOnMonth: e.target.checked,
                                }))
                              }
                              value={data.lateafterAllowed||null}
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
                              checked={data.perCompensated||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  perCompensated: e.target.checked,
                                }))
                              }
                              value={data.perCompensated||null}
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
                          value={data.maxLatePerMinutes||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.maxLatePerMinutes)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          id="maxLatePerNo"
                          name="maxLatePerNo"
                          value={data.maxLatePerNo||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.maxLatePerNo)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          id="maxPerRoll1"
                          name="maxPerRoll1"
                          value={data.maxPerRoll1||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.maxPerRoll1)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.lateAfterOver||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  lateAfterOver: e.target.checked,
                                }))
                              }
                              value={data.lateAfterOver||null}
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
                          value={data.lateAfterOverMaxTime||null}
                          onChange={(e) => handleChange(e)}
                          label={""}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          id="lateAfterMinOver"
                          name="lateAfterMinOver"
                          value={data.lateAfterMinOver||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(messages.lateAfterMinOver)}
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

const MemoedTimeDelayRules = memo(TimeDelayRules);

export default injectIntl(MemoedTimeDelayRules);

