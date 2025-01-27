import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/ElementsData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";

import {
  Button,
  Grid,
  TextField,
  Checkbox,
  Card,
  CardContent,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import NamePopup from "../../../Component/NamePopup";
import PayRollLoader from "../../../Component/PayRollLoader";
import ElementTable from "../PayTemplate/ElementTable";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import SITEMAP from "../../../../../App/routes/sitemap";

function ElementsCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes, cx } = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [OpenPopup, setOpenPopup] = useState(false);
  const [data, setdata] = useState({
    id: 0,
    arName: "",
    enName: "",
    elementTaxLimit: "",
    minWorkH: "",
    elementTypeId: 1,
    applyMinMaxOccur: false,
    elementOccurMax: "",
    elementIsOfMonthSal: false,
    isReference: false,
    workdaysRelated: false,
    inWeb: false,
    calcOnEachTemp: false,
    perOfDailyFee: false,
    elementCalcMethodId: 1,
    elementModeId: 1,
    elementMinVal: "",
    elementMaxVal: "",
    minOnValue: "",
    maxOnValue: "",
    defaultVal: "",
    applyMinMaxVal: false,
    payrollRefElements: [],
    payrollRefElements2: [],
  });

  const history = useHistory();
  const [Type, setType] = useState(6);

  const handleCloseNamePopup = useCallback(
    async (Employeesdata) => {
      
      setOpenPopup(false);
      try {
        setIsLoading(true);
        if (Type === 6) {
          var payrollRefElements = [];
          for (var i = 0; i < data.payrollRefElements.length; i++) {
            payrollRefElements.push(data.payrollRefElements[i]);
          }
          for (var i = 0; i < Employeesdata.length; i++) {
            if (
              payrollRefElements.filter(
                (x) => x.refElementId == Employeesdata[i].id
              ).length == 0
            ) {
              payrollRefElements.push({
                id: 0,
                refElementId: Employeesdata[i].id,
                refElementName: Employeesdata[i].name,
                elementId: data.id,
                refPerc: 0,
                isSelected: true,
              });
            }
          }

          setdata((prevFilters) => ({
            ...prevFilters,
            payrollRefElements: payrollRefElements,
          }));
        } else {
          var payrollRefElements2 = [];
          for (var i = 0; i < data.payrollRefElements2.length; i++) {
            payrollRefElements2.push(data.payrollRefElements2[i]);
          }
          for (var i = 0; i < Employeesdata.length; i++) {
            if (
              payrollRefElements2.filter(
                (x) => x.refElementId == Employeesdata[i].id
              ).length == 0
            ) {
              payrollRefElements2.push({
                id: 0,
                refElementId: Employeesdata[i].id,
                refElementName: Employeesdata[i].name,
                elementId: data.id,
                refPerc: 0,
                refValue: "+",
                isSelected: true,
              });
            }
          }
          setdata((prevFilters) => ({
            ...prevFilters,
            payrollRefElements2: payrollRefElements2,
          }));
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    },
    [data, Type]
  );

  const handleClickOpenNamePopup = (type) => {
    
    setType(type);
    setOpenPopup(true);
  };
  const handledeleteRef = () => {
    setdata((prevFilters) => ({
      ...prevFilters,
      payrollRefElements: [],
    }));
  };

  const handledeleteRef2 = () => {
    setdata((prevFilters) => ({
      ...prevFilters,
      payrollRefElements2: [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      let response = await ApiData(locale).IsArabicNameExist(
        data.id,
        data.arName
      );
      if (response == true) {
        toast.error("Arabic Name Already Exist");
        return;
      }
      else{
        let response = await ApiData(locale).IsEnglishNameExist(
          data.id,
          data.enName
        );
        if (response == true) {
          toast.error("English Name Already Exist");
          return;
        }
      }
      var payrollRefElements = data.payrollRefElements.filter(
        (x) => x.isSelected == true
      );
      var payrollRefElements2 = data.payrollRefElements2.filter(
        (x) => x.isSelected == true
      );
      data.payrollRefElements = payrollRefElements;
      data.payrollRefElements2 = payrollRefElements2;

      response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.payroll.Elements.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(SITEMAP.payroll.Elements.route);
  }
  async function fetchData() {
    try {
      if (id) {
        const dataApi = await ApiData(locale).Get(id ?? 0);
        var payrollRefElements = dataApi.payrollRefElements.map((obj) => {
          return {
            ...obj,
            isSelected: true,
          };
        });
        var payrollRefElements2 = dataApi.payrollRefElements2.map((obj) => {
          return {
            ...obj,
            isSelected: true,
          };
        });
        dataApi.payrollRefElements = payrollRefElements;
        dataApi.payrollRefElements2 = payrollRefElements2;
        setdata(dataApi);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.ElementsCreateTitle)
            : intl.formatMessage(messages.ElementsUpdateTitle)
        }
        desc={""}
      >
        <NamePopup
          handleClose={handleCloseNamePopup}
          open={OpenPopup}
          Key={"Element"}
          ElementType={0}
          ElementId={data.id}
        />

        <form onSubmit={handleSubmit}>
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
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={12}>
                        <TextField
                          id="arName"
                          name="arName"
                          value={data.arName}
                          onChange={(e) =>
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              arName: e.target.value,
                            }))
                          }
                          label={intl.formatMessage(Payrollmessages.arName)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          id="enName"
                          name="enName"
                          value={data.enName}
                          onChange={(e) =>
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              enName: e.target.value,
                            }))
                          }
                          label={intl.formatMessage(Payrollmessages.enName)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="elementTaxLimit"
                          name="elementTaxLimit"
                          value={data.elementTaxLimit}
                          onChange={(e) =>
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              elementTaxLimit: e.target.value,
                            }))
                          }
                          label={intl.formatMessage(
                            messages.elementTaxFreeLimit
                          )}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="minWorkH"
                          name="minWorkH"
                          value={data.minWorkH}
                          onChange={(e) =>
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              minWorkH: e.target.value,
                            }))
                          }
                          label={intl.formatMessage(messages.minDailyWorkHours)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>

                      <Grid item md={12} xs={12}>
                        <FormControl
                          variant="standard"
                          component="fieldset"
                          required
                        >
                          <RadioGroup
                            row
                            name="elementTypeId"
                            aria-label="elementTypeId"
                            value={data.elementTypeId || null}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                elementTypeId: e.target.value,
                              }))
                            }
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              label={intl.formatMessage(messages.Allowance)}
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio />}
                              label={intl.formatMessage(messages.Deduct)}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.applyMinMaxOccur || null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  applyMinMaxOccur: e.target.checked,
                                  elementOccurMax: "",
                                }))
                              }
                              value={data.applyMinMaxOccur || null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.elementRepeat)}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          id="elementOccurMax"
                          name="elementOccurMax"
                          value={data.elementOccurMax}
                          disabled={!data.applyMinMaxOccur}
                          onChange={(e) =>
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              elementOccurMax: e.target.value,
                            }))
                          }
                          label={intl.formatMessage(messages.maxRepeat)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={3} xs={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid item xs={12} md={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.elementIsOfMonthSal || null}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                elementIsOfMonthSal: e.target.checked,
                              }))
                            }
                            value={data.calcLate || null}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.salayElememt)}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.isReference || null}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                isReference: e.target.checked,
                              }))
                            }
                            value={data.isReference || null}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.refranceElement)}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.workdaysRelated || null}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                workdaysRelated: e.target.checked,
                              }))
                            }
                            value={data.workdaysRelated || null}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.relatedToWorkhours)}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.inWeb || null}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                inWeb: e.target.checked,
                              }))
                            }
                            value={data.inWeb || null}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.inWeb)}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.calcOnEachTemp || null}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                calcOnEachTemp: e.target.checked,
                              }))
                            }
                            value={data.calcOnEachTemp || null}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.calcIneachTemplate)}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.perOfDailyFee || null}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                perOfDailyFee: e.target.checked,
                              }))
                            }
                            value={data.perOfDailyFee || null}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.percentOfDaily)}
                      />
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={3} xs={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={12} xs={12}>
                        <Card className={classes.card}>
                          <CardContent>
                            <FormControl
                              variant="standard"
                              component="fieldset"
                              required
                            >
                              <RadioGroup
                                row
                                name="elementModeId"
                                aria-label="Direction"
                                value={data.elementModeId || null}
                                onChange={(e) =>
                                  setdata((prevFilters) => ({
                                    ...prevFilters,
                                    elementModeId: e.target.value,
                                  }))
                                }
                              >
                                <FormControlLabel
                                  value="1"
                                  control={<Radio />}
                                  label={intl.formatMessage(messages.constant)}
                                />
                                <FormControlLabel
                                  value="2"
                                  control={<Radio />}
                                  label={intl.formatMessage(messages.variable)}
                                />
                              </RadioGroup>
                            </FormControl>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Card className={classes.card}>
                          <CardContent>
                            <FormControl
                              variant="standard"
                              component="fieldset"
                              required
                            >
                              <RadioGroup
                                row
                                name="elementCalcMethodId"
                                aria-label="Direction"
                                value={data.elementCalcMethodId || null}
                                onChange={(e) => {
                                  
                                  setdata((prevFilters) => ({
                                    ...prevFilters,
                                    elementCalcMethodId: e.target.value,
                                    payrollRefElements:
                                      e.target.value == 1
                                        ? []
                                        : data.payrollRefElements,
                                  }));
                                }}
                              >
                                <FormControlLabel
                                  value="1"
                                  control={<Radio />}
                                  label={intl.formatMessage(messages.Value)}
                                />
                                <FormControlLabel
                                  value="2"
                                  control={<Radio />}
                                  label={intl.formatMessage(
                                    messages.Percentage
                                  )}
                                />
                              </RadioGroup>
                            </FormControl>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="defaultVal"
                          name="defaultVal"
                          value={data.defaultVal}
                          onChange={(e) =>
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              defaultVal: e.target.value,
                            }))
                          }
                          label={intl.formatMessage(messages.defaultValue)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={12} xs={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.applyMinMaxVal || null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  applyMinMaxVal: e.target.checked,
                                  elementMinVal: "",
                                  elementMaxVal: "",
                                  minOnValue: "",
                                  maxOnValue: "",
                                }))
                              }
                              value={data.applyMinMaxVal || null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.elemMaxMin)}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          id="elementMinVal"
                          name="elementMinVal"
                          value={data.elementMinVal}
                          disabled={!data.applyMinMaxVal}
                          onChange={(e) =>
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              elementMinVal: e.target.value,
                            }))
                          }
                          label={intl.formatMessage(messages.min)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          id="elementMaxVal"
                          name="elementMaxVal"
                          value={data.elementMaxVal}
                          disabled={!data.applyMinMaxVal}
                          onChange={(e) =>
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              elementMaxVal: e.target.value,
                            }))
                          }
                          label={intl.formatMessage(messages.max)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          id="minOnValue"
                          name="minOnValue"
                          value={data.minOnValue}
                          disabled={!data.applyMinMaxVal}
                          onChange={(e) =>
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              minOnValue: e.target.value,
                            }))
                          }
                          label={intl.formatMessage(messages.calcValMin)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          id="maxOnValue"
                          name="maxOnValue"
                          disabled={!data.applyMinMaxVal}
                          value={data.maxOnValue}
                          onChange={(e) =>
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              maxOnValue: e.target.value,
                            }))
                          }
                          label={intl.formatMessage(messages.calcValMax)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* /////////////////////////////////////////////////////////////////// */}
              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                          <Button
                            variant="contained"
                            size="medium"
                            color="secondary"
                            disabled={
                              data.elementCalcMethodId == 1 ? true : false
                            }
                            onClick={() => handleClickOpenNamePopup(6)}
                          >
                            <FormattedMessage {...messages.refElement} />
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={1}>
                          <Button
                            variant="contained"
                            size="medium"
                            color="secondary"
                            disabled={
                              data.elementCalcMethodId == 1 ? true : false
                            }
                            onClick={() => handledeleteRef()}
                          >
                            <FormattedMessage {...Payrollmessages.delete} />
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <ElementTable
                            dataList={data.payrollRefElements}
                            setdataList={setdata}
                            Type={6}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                          <Button
                            variant="contained"
                            size="medium"
                            color="secondary"
                            onClick={() => handleClickOpenNamePopup(7)}
                          >
                            <FormattedMessage {...messages.basicElement} />
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Button
                            variant="contained"
                            size="medium"
                            color="secondary"
                            onClick={() => handledeleteRef2()}
                          >
                            <FormattedMessage {...Payrollmessages.delete} />
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <ElementTable
                            dataList={data.payrollRefElements2}
                            setdataList={setdata}
                            Type={7}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid item xs={6} md={1}>
                <Button
                  variant="contained"
                  type="submit"
                  size="medium"
                  color="secondary"
                >
                  <FormattedMessage {...Payrollmessages.save} />
                </Button>
              </Grid>
              <Grid item xs={6} md={1}>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={oncancel}
                >
                  <FormattedMessage {...Payrollmessages.cancel} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}
ElementsCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ElementsCreate);
