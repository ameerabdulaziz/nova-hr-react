import React, { useState, useEffect, useCallback } from "react";
import messages from "../../messages";
import { useSelector } from "react-redux";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import {
  FormLabel,
  Grid,
  TextField,
  Card,
  CardContent,
  Autocomplete,
  Button,
} from "@mui/material";
import useStyles from "../../../Style";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import GeneralListApis from "../../../api/GeneralListApis";

function OtherRules(props) {
  const { intl, data, setdata, group1ElemList ,group3ElemList,group4ElemList} = props;
  const locale = useSelector((state) => state.language.locale);
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
                    (item) => item.id === data.PenaltyElem
                  )}
                  isOptionEqualToValue={(option, value) =>
                    value.id === 0 || value.id === "" || option.id === value.id
                  }
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  onChange={(event, value) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      PenaltyElem: value !== null ? value.id : null,
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
                  id="AllowForForgetAtt"
                  name="AllowForForgetAtt"
                  value={data.AllowForForgetAtt}
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
                            id="PenaltyDayVal"
                            name="PenaltyDayVal"
                            x
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.PenaltyDayVal}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="PenaltyDayVal2"
                            name="PenaltyDayVal2"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.PenaltyDayVal2}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="PenaltyDayVal3"
                            name="PenaltyDayVal3"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.PenaltyDayVal3}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="PenaltyDayVal4"
                            name="PenaltyDayVal4"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.PenaltyDayVal4}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="PenaltyDayVal5"
                            name="PenaltyDayVal5"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.PenaltyDayVal5}
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
                            id="PenaltyDayValOut"
                            name="PenaltyDayValOut"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.PenaltyDayValOut}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="PenaltyDayValOut2"
                            name="PenaltyDayValOut2"
                            x
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.PenaltyDayValOut2}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="PenaltyDayValOut3"
                            name="PenaltyDayValOut3"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.PenaltyDayValOut3}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="PenaltyDayValOut4"
                            name="PenaltyDayValOut4"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.PenaltyDayValOut4}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="PenaltyDayValOut5"
                            name="PenaltyDayValOut5"
                            label={""}
                            onChange={(e) => handleChange(e)}
                            value={data.PenaltyDayValOut5}
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
                          id="StoppageElem"
                          options={group1ElemList}
                          value={group1ElemList.find(
                            (item) => item.id === data.StoppageElem
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
                              StoppageElem:
                                value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="StoppageElem"
                              label={intl.formatMessage(
                                messages.StoppageElem
                              )}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <TextField
                          id="StoppageDayVal"
                          name="StoppageDayVal"
                          value={data.StoppageDayVal}
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
                          id="DeletionElem"
                          options={group1ElemList}
                          value={group1ElemList.find(
                            (item) => item.id === data.DeletionElem
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
                              DeletionElem:
                                value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="DeletionElem"
                              label={intl.formatMessage(
                                messages.DeletionElem
                              )}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <TextField
                          id="DeletionDayVal"
                          name="DeletionDayVal"
                          value={data.DeletionDayVal}
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
                              checked={data.MissionTime}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  MissionTime: e.target.checked,
                                }))
                              }
                              value={data.MissionTime}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.MissionTime)}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Autocomplete
                          id="TrnsportaionEle"
                          options={group4ElemList}
                          value={group4ElemList.find(
                            (item) => item.id === data.TrnsportaionEle
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
                              TrnsportaionEle:
                                value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="TrnsportaionEle"
                              label={intl.formatMessage(
                                messages.TrnsportaionEle
                              )}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Autocomplete
                          id="BranchTransportaionEl"
                          options={group4ElemList}
                          value={group4ElemList.find(
                            (item) => item.id === data.BranchTransportaionEl
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
                              BranchTransportaionEl:
                                value !== null ? value.id : null,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="BranchTransportaionEl"
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

export default injectIntl(OtherRules);
