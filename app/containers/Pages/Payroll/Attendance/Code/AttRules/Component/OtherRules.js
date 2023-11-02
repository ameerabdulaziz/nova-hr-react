import React, { memo } from "react";
import messages from "../../../messages";
import { injectIntl} from "react-intl";
import {
  FormLabel,
  Grid,
  TextField,
  Card,
  CardContent,
  Autocomplete,
  
} from "@mui/material";
import useStyles from "../../../../Style";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function OtherRules(props) {
  const { intl, data, setdata, group1ElemList ,group3ElemList,group4ElemList} = props;
  const { classes } = useStyles();

  const handleChange = (event) => {
    
    if (event.target.name == "allowForForgetAtt")
      setdata((prevFilters) => ({
        ...prevFilters,
        allowForForgetAtt: event.target.value,
      }));
      if (event.target.name == "penaltyDayVal")
      setdata((prevFilters) => ({
        ...prevFilters,
        penaltyDayVal: event.target.value,
      }));
      if (event.target.name == "penaltyDayVal2")
      setdata((prevFilters) => ({
        ...prevFilters,
        penaltyDayVal2: event.target.value,
      }));
      if (event.target.name == "penaltyDayVal3")
      setdata((prevFilters) => ({
        ...prevFilters,
        penaltyDayVal3: event.target.value,
      }));
      if (event.target.name == "penaltyDayVal4")
      setdata((prevFilters) => ({
        ...prevFilters,
        penaltyDayVal4: event.target.value,
      }));
      if (event.target.name == "penaltyDayVal5")
      setdata((prevFilters) => ({
        ...prevFilters,
        penaltyDayVal5: event.target.value,
      }));

      if (event.target.name == "penaltyDayValOut")
      setdata((prevFilters) => ({
        ...prevFilters,
        penaltyDayValOut: event.target.value,
      }));
      if (event.target.name == "penaltyDayValOut2")
      setdata((prevFilters) => ({
        ...prevFilters,
        penaltyDayValOut2: event.target.value,
      }));
      if (event.target.name == "penaltyDayValOut3")
      setdata((prevFilters) => ({
        ...prevFilters,
        penaltyDayValOut3: event.target.value,
      }));
      if (event.target.name == "penaltyDayValOut4")
      setdata((prevFilters) => ({
        ...prevFilters,
        penaltyDayValOut4: event.target.value,
      }));
      if (event.target.name == "penaltyDayValOut5")
      setdata((prevFilters) => ({
        ...prevFilters,
        penaltyDayValOut5: event.target.value,
      }));

      if (event.target.name == "stoppageDayVal")
      setdata((prevFilters) => ({
        ...prevFilters,
        stoppageDayVal: event.target.value,
      }));
      if (event.target.name == "deletionDayVal")
      setdata((prevFilters) => ({
        ...prevFilters,
        deletionDayVal: event.target.value,
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
              md={12}
              xs={12}
              container
              alignItems="flex-start"
              direction="row"
              spacing={1}
            >
              <Grid item md={4} xs={12}>
                <Autocomplete
                  id="PenaltyElem"
                  options={group3ElemList}
                  value={group3ElemList.find(
                    (item) => item.id === data.penaltyElem
                  )||null}
                  isOptionEqualToValue={(option, value) =>
                    value.id === 0 || value.id === "" || option.id === value.id
                  }
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  onChange={(event, value) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      penaltyElem: value !== null ? value.id : null,
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      name="PenaltyElem"
                      label={intl.formatMessage(messages.PenaltyElem)}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} xs={12}></Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  id="allowForForgetAtt"
                  name="allowForForgetAtt"
                  value={data.allowForForgetAtt||null}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(messages.AllowForForgetAtt)}
                  className={classes.field}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={2} xs={12}></Grid>
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
                            {intl.formatMessage(messages.PenaltyDayVal)}
                          </FormLabel>
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="penaltyDayVal"
                            name="penaltyDayVal"
                            x
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.penaltyDayVal||null}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="penaltyDayVal2"
                            name="PenaltyDayVal2"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.penaltyDayVal2||null}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="penaltyDayVal3"
                            name="penaltyDayVal3"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.penaltyDayVal3||null}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="penaltyDayVal4"
                            name="penaltyDayVal4"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.penaltyDayVal4||null}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="penaltyDayVal5"
                            name="penaltyDayVal5"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.penaltyDayVal5||null}
                            className={classes.field}
                            variant="outlined"
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
                        <Grid item xs={12} md={12}>
                          <FormLabel component="label">
                            {intl.formatMessage(messages.PenaltyDayValOut)}
                          </FormLabel>
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="penaltyDayValOut"
                            name="penaltyDayValOut"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.penaltyDayValOut||null}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="penaltyDayValOut2"
                            name="penaltyDayValOut2"
                            x
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.penaltyDayValOut2||null}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="penaltyDayValOut3"
                            name="penaltyDayValOut3"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.penaltyDayValOut3||null}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="penaltyDayValOut4"
                            name="penaltyDayValOut4"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.penaltyDayValOut4||null}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="penaltyDayValOut5"
                            name="penaltyDayValOut5"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.penaltyDayValOut5||null}
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

            <hr className={classes.hr} />

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
                      <Grid item md={8} xs={12}>
                        <Autocomplete
                          id="stoppageElem"
                          options={group1ElemList}
                          value={group1ElemList.find(
                            (item) => item.id === data.stoppageElem
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
                              stoppageElem:
                                value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="stoppageElem"
                              label={intl.formatMessage(
                                messages.StoppageElem
                              )}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <TextField
                          id="stoppageDayVal"
                          name="stoppageDayVal"
                          value={data.stoppageDayVal||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(
                            messages.StoppageDayVal
                          )}
                          className={classes.field}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item md={8} xs={12}>
                        <Autocomplete
                          id="deletionElem"
                          options={group1ElemList}
                          value={group1ElemList.find(
                            (item) => item.id === data.deletionElem
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
                              deletionElem:
                                value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="deletionElem"
                              label={intl.formatMessage(
                                messages.DeletionElem
                              )}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <TextField
                          id="deletionDayVal"
                          name="deletionDayVal"
                          value={data.deletionDayVal||null}
                          onChange={(e) => handleChange(e)}
                          label={intl.formatMessage(
                            messages.StoppageDayVal
                          )}
                          className={classes.field}
                          variant="outlined"
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
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.missionTime||null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  missionTime: e.target.checked,
                                }))
                              }
                              value={data.missionTime||null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.MissionTime)}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Autocomplete
                          id="trnsportaionEle"
                          options={group4ElemList}
                          value={group4ElemList.find(
                            (item) => item.id === data.trnsportaionEle
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
                              trnsportaionEle:
                                value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="trnsportaionEle"
                              label={intl.formatMessage(
                                messages.TrnsportaionEle
                              )}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Autocomplete
                          id="branchTransportaionEl"
                          options={group4ElemList}
                          value={group4ElemList.find(
                            (item) => item.id === data.branchTransportaionEl
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
                              branchTransportaionEl:
                                value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="branchTransportaionEl"
                              label={intl.formatMessage(
                                messages.BranchTransportaionEl
                              )}
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


const MemoedOtherRules = memo(OtherRules);

export default injectIntl(MemoedOtherRules);
