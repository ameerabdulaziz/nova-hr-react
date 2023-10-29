import React, { useState, useEffect, useCallback } from "react";
import messages from "../../messages";
import { useSelector } from "react-redux";
import { injectIntl, intlShape } from "react-intl";
import {
  FormLabel,
  Grid,
  TextField,
  Card,
  CardContent,
  Autocomplete,
} from "@mui/material";
import useStyles from "../../../Style";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import GeneralListApis from "../../../api/GeneralListApis";

function AbsenceRules(props) {
  const { intl, data, setdata ,ChoiceList,group1ElemList} = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  
  const handleChange = (event) => {
    if (event.target.name == "absFstElDayOne")
      setdata((prevFilters) => ({
        ...prevFilters,
        absFstElDayOne: event.target.value,
      }));
    if (event.target.name == "absSecElDayOne")
      setdata((prevFilters) => ({
        ...prevFilters,
        absSecElDayOne: event.target.value,
      }));
    if (event.target.name == "absFstElDayTwo")
      setdata((prevFilters) => ({
        ...prevFilters,
        absFstElDayTwo: event.target.value,
      }));
    if (event.target.name == "absSecElDayTwo")
      setdata((prevFilters) => ({
        ...prevFilters,
        absSecElDayTwo: event.target.value,
      }));
    if (event.target.name == "absFstElDayThree")
      setdata((prevFilters) => ({
        ...prevFilters,
        absFstElDayThree: event.target.value,
      }));
    if (event.target.name == "absSecElDayThree")
      setdata((prevFilters) => ({
        ...prevFilters,
        absSecElDayThree: event.target.value,
      }));
    if (event.target.name == "absFstElDayFour")
      setdata((prevFilters) => ({
        ...prevFilters,
        absFstElDayFour: event.target.value,
      }));
    if (event.target.name == "absSecElDayFour")
      setdata((prevFilters) => ({
        ...prevFilters,
        absSecElDayFour: event.target.value,
      }));
    if (event.target.name == "absFstElDay5")
      setdata((prevFilters) => ({
        ...prevFilters,
        absFstElDay5: event.target.value,
      }));
    if (event.target.name == "absSecElDay5")
      setdata((prevFilters) => ({
        ...prevFilters,
        absSecElDay5: event.target.value,
      }));
  };



  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={3} alignItems="flex-start" direction="row">
          <Grid
            item
            md={6}
            xs={12}
            spacing={0}
            container
            alignItems="flex-start"
            direction="row"
          >
            <Grid item md={12} xs={12}>
              <Autocomplete
                id="AbsenceFirstElem"
                options={group1ElemList}
                value={group1ElemList.find(
                  (item) => item.id === data.absenceFirstElem
                )}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    absenceFirstElem: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="AbsenceFirstElem"
                    label={intl.formatMessage(messages.Firstelement)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.conAbsenceAsOneDay}
                    onChange={(e) =>
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        conAbsenceAsOneDay: e.target.checked,
                      }))
                    }
                    value={data.conAbsenceAsOneDay}
                    color="primary"
                  />
                }
                label={intl.formatMessage(messages.ConAbsenceAsOneDay)}
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
                      <Grid
                        item
                        xs={12}
                        md={12}
                        container
                        direction={"row"}
                        spacing={3}
                      >
                        <Grid item xs={12} md={4}></Grid>
                        <Grid item xs={12} md={4}>
                          <FormLabel component="label">
                            {intl.formatMessage(messages.Firstelement)}
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormLabel component="label">
                            {intl.formatMessage(messages.Secondelement)}
                          </FormLabel>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        container
                        direction={"row"}
                        spacing={3}
                      >
                        <Grid item xs={12} md={4}>
                          <FormLabel component="label">
                            {intl.formatMessage(messages.DayOne)}
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="absFstElDayOne"
                            name="absFstElDayOne"
                            value={data.absFstElDayOne}
                            onChange={(e) => handleChange(e)}
                            label={""}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="absSecElDayOne"
                            name="absSecElDayOne"
                            value={data.absSecElDayOne}
                            onChange={(e) => handleChange(e)}
                            label={""}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        container
                        direction={"row"}
                        spacing={3}
                      >
                        <Grid item xs={12} md={4}>
                          <FormLabel component="label">
                            {intl.formatMessage(messages.DayTwo)}
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="absFstElDayTwo"
                            name="absFstElDayTwo"
                            value={data.absFstElDayTwo}
                            onChange={(e) => handleChange(e)}
                            label={""}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="AbsSecElDayTwo"
                            name="AbsSecElDayTwo"
                            value={data.absSecElDayTwo}
                            onChange={(e) => handleChange(e)}
                            label={""}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        container
                        direction={"row"}
                        spacing={3}
                      >
                        <Grid item xs={12} md={4}>
                          <FormLabel component="label">
                            {intl.formatMessage(messages.DayThree)}
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="absFstElDayThree"
                            name="absFstElDayThree"
                            value={data.absFstElDayThree}
                            onChange={(e) => handleChange(e)}
                            label={""}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="absSecElDayThree"
                            name="absSecElDayThree"
                            value={data.absSecElDayThree}
                            onChange={(e) => handleChange(e)}
                            label={""}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        container
                        direction={"row"}
                        spacing={3}
                      >
                        <Grid item xs={12} md={4}>
                          <FormLabel component="label">
                            {intl.formatMessage(messages.DayFour)}
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="absFstElDayFour"
                            name="absFstElDayFour"
                            value={data.absFstElDayFour}
                            onChange={(e) => handleChange(e)}
                            label={""}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="absSecElDayFour"
                            name="absSecElDayFour"
                            value={data.absSecElDayFour}
                            onChange={(e) => handleChange(e)}
                            label={""}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        container
                        direction={"row"}
                        spacing={3}
                      >
                        <Grid item xs={12} md={4}>
                          <FormLabel component="label">
                            {intl.formatMessage(messages.DayFive)}
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="absFstElDay5"
                            name="absFstElDay5"
                            value={data.absFstElDay5}
                            onChange={(e) => handleChange(e)}
                            label={""}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="absSecElDay5"
                            name="absSecElDay5"
                            value={data.absSecElDay5}
                            onChange={(e) => handleChange(e)}
                            label={""}
                            className={classes.field}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            spacing={0}
            container
            alignItems="flex-start"
            direction="row"
          >
            <Grid item md={12} xs={12}>
              <Autocomplete
                id="AbsenceSecondElem"
                options={group1ElemList}
                value={group1ElemList.find(
                  (item) => item.id === data.absenceSecondElem
                )}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    absenceSecondElem: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="AbsenceSecondElem"
                    label={intl.formatMessage(messages.Secondelement)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.absence3more}
                    onChange={(e) =>
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        absence3more: e.target.checked,
                      }))
                    }
                    value={data.Absence3more}
                    color="primary"
                  />
                }
                label={intl.formatMessage(messages.Absence3more)}
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
                      spacing={4}
                    >
                      <Grid
                        item
                        xs={12}
                        md={12}
                        container
                        direction={"row"}
                        spacing={3}
                      >
                        <Grid item xs={12} md={4}>
                          <FormLabel component="label">
                            {intl.formatMessage(messages.ChoiceOne)}
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <Autocomplete
                            id="AbsChoiceOne"
                            options={ChoiceList}
                            value={ChoiceList.find(
                              (item) =>
                                item.id === data.absChoiceOne
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
                                absChoiceOne: value !== null ? value.id : null,
                              }));
                            }}
                            renderInput={(params) => (
                              <TextField
                                variant="outlined"
                                {...params}
                                name="AbsChoiceOne"
                                label={""}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        container
                        direction={"row"}
                        spacing={3}
                      >
                        <Grid item xs={12} md={4}>
                          <FormLabel component="label">
                            {intl.formatMessage(messages.ChoiceTwo)}
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <Autocomplete
                            id="AbsChoiceTwo"
                            options={ChoiceList}
                            value={ChoiceList.find(
                              (item) => item.id === data.absChoiceTwo
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
                                absChoiceTwo: value !== null ? value.id : null,
                              }));
                            }}
                            renderInput={(params) => (
                              <TextField
                                variant="outlined"
                                {...params}
                                name="AbsChoiceTwo"
                                label={""}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        container
                        direction={"row"}
                        spacing={3}
                      >
                        <Grid item xs={12} md={4}>
                          <FormLabel component="label">
                            {intl.formatMessage(messages.ChoiceThree)}
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <Autocomplete
                            id="AbsChoiceThree"
                            options={ChoiceList}
                            value={ChoiceList.find(
                              (item) => item.id === data.absChoiceThree
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
                                absChoiceThree:
                                  value !== null ? value.id : null,
                              }));
                            }}
                            renderInput={(params) => (
                              <TextField
                                variant="outlined"
                                {...params}
                                name="AbsChoiceThree"
                                label={""}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        container
                        direction={"row"}
                        spacing={3}
                      >
                        <Grid item xs={12} md={4}>
                          <FormLabel component="label">
                            {intl.formatMessage(messages.ChoiceFour)}
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <Autocomplete
                            id="AbsChoiceFour"
                            options={ChoiceList}
                            value={ChoiceList.find(
                              (item) => item.id === data.absChoiceFour
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
                                absChoiceFour: value !== null ? value.id : null,
                              }));
                            }}
                            renderInput={(params) => (
                              <TextField
                                variant="outlined"
                                {...params}
                                name="AbsChoiceFour"
                                label={""}
                              />
                            )}
                          />
                        </Grid>
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

export default injectIntl(AbsenceRules);
