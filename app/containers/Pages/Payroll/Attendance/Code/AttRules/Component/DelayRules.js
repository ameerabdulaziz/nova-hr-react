import React, { memo } from "react";
import messages from "../../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import {
  FormLabel,
  Grid,
  TextField,
  Card,
  CardContent,
  Autocomplete,
  Button,
} from "@mui/material";
import useStyles from "../../../../Style";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function DelayRules(props) {
  const { intl, data, setdata, ChoiceList ,group1ElemList} = props;
  const { classes } = useStyles();


  const handleChange = (event) => {
    if (event.target.name == "allowedPerCount")
      setdata((prevFilters) => ({
        ...prevFilters,
        allowedPerCount: event.target.value,
      }));
    if (event.target.name == "delFstElDayOne")
      setdata((prevFilters) => ({
        ...prevFilters,
        delFstElDayOne: event.target.value,
      }));
    if (event.target.name == "delFstElDayTwo")
      setdata((prevFilters) => ({
        ...prevFilters,
        delFstElDayTwo: event.target.value,
      }));
    if (event.target.name == "delFstElDayThree")
      setdata((prevFilters) => ({
        ...prevFilters,
        delFstElDayThree: event.target.value,
      }));
    if (event.target.name == "delFstElDayFour")
      setdata((prevFilters) => ({
        ...prevFilters,
        delFstElDayFour: event.target.value,
      }));
    if (event.target.name == "delFstElDayFive")
      setdata((prevFilters) => ({
        ...prevFilters,
        delFstElDayFive: event.target.value,
      }));
    if (event.target.name == "lessTimestartFromMin")
      setdata((prevFilters) => ({
        ...prevFilters,
        lessTimestartFromMin: event.target.value,
      }));
    if (event.target.name == "minusMinuteFrom")
      setdata((prevFilters) => ({
        ...prevFilters,
        minusMinuteFrom: event.target.value,
      }));
    if (event.target.name == "delSecElDayOne")
      setdata((prevFilters) => ({
        ...prevFilters,
        delSecElDayOne: event.target.value,
      }));
    if (event.target.name == "delSecElDayTwo")
      setdata((prevFilters) => ({
        ...prevFilters,
        delSecElDayTwo: event.target.value,
      }));
      if (event.target.name == "delSecElDayThree")
      setdata((prevFilters) => ({
        ...prevFilters,
        delSecElDayThree: event.target.value,
      }));
      if (event.target.name == "delSecElDayFour")
      setdata((prevFilters) => ({
        ...prevFilters,
        delSecElDayFour: event.target.value,
      }));
      if (event.target.name == "delSecElDayFive")
      setdata((prevFilters) => ({
        ...prevFilters,
        delSecElDayFive: event.target.value,
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
            <Grid
              item
              md={6}
              xs={12}
              container
              alignItems="flex-start"
              direction="row"
              spacing={3}
            >
              <Grid item md={8} xs={12}>
                <Autocomplete
                  id="perDelayFirstElem"
                  options={group1ElemList}
                  value={group1ElemList.find(
                    (item) => item.id === data.perDelayFirstElem
                  )||null}
                  isOptionEqualToValue={(option, value) =>
                    value.id === 0 || value.id === "" || option.id === value.id
                  }
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  onChange={(event, value) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      perDelayFirstElem: value !== null ? value.id : null,
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      name="AbsenceFirstElem"
                      label={intl.formatMessage(messages.perDelayFirstElem)}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  id="allowedPerCount"
                  name="allowedPerCount"
                  value={data.allowedPerCount||null}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(messages.allowedPerCount)}
                  className={classes.field}
                  variant="outlined"
                  autoComplete='off'
                />
              </Grid>
              <Grid item md={12} xs={12}>
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
                          <FormLabel component="label">
                            {intl.formatMessage(messages.allowedNoOfDelay)}
                          </FormLabel>
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="delFstElDayOne"
                            name="delFstElDayOne"
                            label={intl.formatMessage(messages.DayOne)}
                            onChange={(e) => handleChange(e)}
                            value={data.delFstElDayOne||null}
                            className={classes.field}
                            variant="outlined"
                            autoComplete='off'
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="delFstElDayTwo"
                            name="delFstElDayTwo"
                            label={intl.formatMessage(messages.DayTwo)}
                            onChange={(e) => handleChange(e)}
                            value={data.delFstElDayTwo||null}
                            className={classes.field}
                            variant="outlined"
                            autoComplete='off'
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="delFstElDayThree"
                            name="delFstElDayThree"
                            label={intl.formatMessage(messages.DayThree)}
                            onChange={(e) => handleChange(e)}
                            value={data.delFstElDayThree||null}
                            className={classes.field}
                            variant="outlined"
                            autoComplete='off'
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="delFstElDayFour"
                            name="delFstElDayFour"
                            label={intl.formatMessage(messages.DayFour)}
                            onChange={(e) => handleChange(e)}
                            value={data.delFstElDayFour||null}
                            className={classes.field}
                            variant="outlined"
                            autoComplete='off'
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="delFstElDayFive"
                            name="delFstElDayFive"
                            label={intl.formatMessage(messages.DayFive)}
                            onChange={(e) => handleChange(e)}
                            value={data.delFstElDayFive||null}
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

            <Grid item md={6} xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container alignItems="flex-start" direction="row">
                    <Grid item md={12} xs={12} container direction="row">
                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.calcLate||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  calcLate: e.target.checked,
                                }))
                              }
                              value={data.calcLate||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.calcLate)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.calclateTimeWithCount||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  calclateTimeWithCount: e.target.checked,
                                }))
                              }
                              value={data.calclateTimeWithCount||null}
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
                              checked={data.lateafterAllowed||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  lateafterAllowed: e.target.checked,
                                }))
                              }
                              value={data.lateafterAllowed||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.lateafterAllowed)}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.calcLessTimeOnWeekEnd||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  calcLessTimeOnWeekEnd: e.target.checked,
                                }))
                              }
                              value={data.calcLessTimeOnWeekEnd||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(
                            messages.calcLessTimeOnWeekEnd
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.calcLessTimeOnHoliday||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  calcLessTimeOnHoliday: e.target.checked,
                                }))
                              }
                              value={data.calcLessTimeOnHoliday||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(
                            messages.calcLessTimeOnHoliday
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.lateinWeekEndMiss||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  lateinWeekEndMiss: e.target.checked,
                                }))
                              }
                              value={data.lateinWeekEndMiss||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.lateinWeekEndMiss)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <hr className={classes.hr} />

            <Grid
              item
              md={12}
              xs={12}
              container
              alignItems="flex-start"
              direction="row"
              spacing={1}
            >
                <Grid item md={4} xs={12}>
                  <Autocomplete
                    id="perDelayFirstElem"
                    options={group1ElemList}
                    value={group1ElemList.find(
                      (item) => item.id === data.perDelaySecondElem
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
                        perDelaySecondElem: value !== null ? value.id : null,
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        name="AbsenceFirstElem"
                        label={intl.formatMessage(messages.perDelaySecondElem)}
                      />
                    )}
                  />
                </Grid>
               
                <Grid item md={3} xs={12}>
                  <TextField
                    id="lessTimestartFromMin"
                    name="lessTimestartFromMin"
                    value={data.lessTimestartFromMin||null}
                    onChange={(e) => handleChange(e)}
                    label={intl.formatMessage(messages.lessTimestartFromMin)}
                    className={classes.field}
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    id="minusMinuteFrom"
                    name="minusMinuteFrom"
                    value={data.minusMinuteFrom||null}
                    onChange={(e) => handleChange(e)}
                    label={intl.formatMessage(messages.minusMinuteFrom)}
                    className={classes.field}
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>
                <Grid item  md={2} xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    size="medium"
                    color="secondary"
                  >
                    <FormattedMessage {...messages.timesSetting} />
                  </Button>
                </Grid>
             
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
                          <FormLabel component="label">
                            {intl.formatMessage(messages.MotamemElement)}
                          </FormLabel>
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="delSecElDayOne"
                            name="delSecElDayOne"
                            label={intl.formatMessage(messages.TimeOne)}
                            onChange={(e) => handleChange(e)}
                            value={data.delSecElDayOne||null}
                            className={classes.field}
                            variant="outlined"
                            autoComplete='off'
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="delSecElDayTwo"
                            name="delSecElDayTwo"
                            label={intl.formatMessage(messages.TimeTwo)}
                            onChange={(e) => handleChange(e)}
                            value={data.delSecElDayTwo||null}
                            className={classes.field}
                            variant="outlined"
                            autoComplete='off'
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="delSecElDayThree"
                            name="delSecElDayThree"
                            label={intl.formatMessage(messages.TimeThree)}
                            onChange={(e) => handleChange(e)}
                            value={data.delSecElDayThree||null}
                            className={classes.field}
                            variant="outlined"
                            autoComplete='off'
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="delSecElDayFour"
                            name="delSecElDayFour"
                            label={intl.formatMessage(messages.TimeFour)}
                            onChange={(e) => handleChange(e)}
                            value={data.delSecElDayFour||null}
                            className={classes.field}
                            variant="outlined"
                            autoComplete='off'
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="delSecElDayFive"
                            name="delSecElDayFive"
                            label={intl.formatMessage(messages.TimeFive)}
                            onChange={(e) => handleChange(e)}
                            value={data.delSecElDayFive||null}
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
                    <Grid
                      item
                      md={12}
                      xs={12}
                      container
                      direction="row"spacing={1}
                    >
                        <Grid item xs={12} md={12}>
                          <FormLabel component="label">
                            {intl.formatMessage(messages.MotamemCalcScenario)}
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Autocomplete
                            id="delChoiceOne"
                            options={ChoiceList}
                            value={ChoiceList.find(
                              (item) => item.id === data.delChoiceOne
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
                                delChoiceOne: value !== null ? value.id : null,
                              }));
                            }}
                            renderInput={(params) => (
                              <TextField
                                variant="outlined"
                                {...params}
                                name="delChoiceOne"
                                label={intl.formatMessage(messages.ChoiceOne)}
                              />
                            )}
                          />
                        </Grid>
                     
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          id="delChoiceTwo"
                          options={ChoiceList}
                          value={ChoiceList.find(
                            (item) => item.id === data.delChoiceTwo
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
                              delChoiceTwo: value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="delhoiceTwo"
                              label={intl.formatMessage(messages.ChoiceTwo)}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          id="delChoiceThree"
                          options={ChoiceList}
                          value={ChoiceList.find(
                            (item) => item.id === data.delChoiceThree
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
                              delChoiceThree: value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="AbsChoiceThree"
                              label={intl.formatMessage(messages.ChoiceThree)}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          id="delChoiceFour"
                          options={ChoiceList}
                          value={ChoiceList.find(
                            (item) => item.id === data.delChoiceFour
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
                              delChoiceFour: value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="AbsChoiceFour"
                              label={intl.formatMessage(messages.ChoiceFour)}
                            />
                          )}
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
  );
}

const MemoedDelayRules = memo(DelayRules);

export default injectIntl(MemoedDelayRules);
