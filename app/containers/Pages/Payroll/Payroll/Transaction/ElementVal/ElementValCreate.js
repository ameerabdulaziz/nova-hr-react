import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  Autocomplete,
} from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import PayRollLoaderInForms from "../../../Component/PayRollLoaderInForms";
import ApiData from "../../api/ElementValData";
import GeneralListApis from "../../../api/GeneralListApis";
import elementApi from "../../api/ElementsData";
import EmployeeData from "../../../Component/EmployeeData";
import { format } from "date-fns";
import DecryptUrl from "../../../Component/DecryptUrl";
import SITEMAP from "../../../../../App/routes/sitemap";

function ElementValCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  //const { id } = location.state ?? 0;
  const id  = DecryptUrl() ?   DecryptUrl()  : location.state ? location.state : 0;
  const { classes, cx } = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [PayTemplateList, setPayTemplateList] = useState([]);
  const [BranchList, setBranchList] = useState([]);
  const [elementList, setElementList] = useState([]);

  const [data, setdata] = useState({
    id: 0,
    branchId:0,
    employeeId: 0,
    payTemplateId: 1,
    elementId: 0,
    elementMaxVal: "",
    elementMinVal: "",
    elementModeId: "",
    defaultVal: "",
    monthId: "",
    yearId: "",
    monthName: "",
    yearName: "",
    notes: "",
    elemVal: "",
    transDate:format(new Date(), "yyyy-MM-dd"),
  });

  const history = useHistory();

  const handleEmpChange = useCallback((id, name) => {
    if (name == "employeeId")
      setdata((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
      }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      let response = await ApiData(locale).Save(data);
      
      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.payroll.ElementVal.route ,{
          branchId: data.branchId,
          employeeId: data.employeeId,
          payTemplateId: data.payTemplateId,
          elementId: data.elementId,
        });
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(SITEMAP.payroll.ElementVal.route);
  }

  async function getOpenMonth(id) {
    try {
      if (!id) {
        setdata((prevFilters) => ({
          ...prevFilters,
          monthId: "",
          yearId: "",
          yearName: "",
          monthName: "",
        }));
        return;
      }
      setIsLoading(true);
      const result = await GeneralListApis(locale).getOpenMonth(id, 0);
      
      setdata((prevFilters) => ({
        ...prevFilters,
        monthId: result.monthId,
        yearId: result.yearId,
        monthName: result.monthName,
        yearName: result.yearName,
      }));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function getElementList(id) {
    try {
      setdata((prevFilters) => ({
        ...prevFilters,
        elementId: 0,
        elementMaxVal: "",
        elementMinVal: "",
        elementModeId: "",
        defaultVal: "",
      }));
      if (!id) {
        setElementList([]);
        return;
      }
      setIsLoading(true);
      const result = await GeneralListApis(locale).GetElementListByTemplate(id);
      setElementList(result);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function getElementData(id) {
    try {
        
      if (!id) {
        setdata((prevFilters) => ({
          ...prevFilters,
          elementId: 0,
          elementMaxVal: "",
          elementMinVal: "",
          elementModeId: "",
          defaultVal: "",
        }));

        return;
      }
      setIsLoading(true);
      const result = await elementApi(locale).Get(id);

      setdata((prevFilters) => ({
        ...prevFilters,
        elementId: result.id,
        elementMaxVal: result.elementMaxVal??"",
        elementMinVal: result.elementMinVal??"",
        elementModeId: result.elementModeId??"",
        defaultVal: result.defaultVal??"",
      }));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function GetLookup() {
    try {
      const BrList = await GeneralListApis(locale).GetBranchList();
      setBranchList(BrList);
      const PayList = await GeneralListApis(locale).GetPayTemplateList();
      getElementList(1);
      setPayTemplateList(PayList);
      if (id) {
        
        const dataApi = await ApiData(locale).Get(id ?? 0);
        setElementList(dataApi.elements);
        setdata(dataApi);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetLookup();
  }, []);

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.ElementValCreateTitle)
            : intl.formatMessage(messages.ElementValUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={4}
                    alignItems="flex-start"
                    direction="row"
                    item
                  >
                    <Grid
                      item
                      container
                      direction="row"
                      spacing={2}
                      xs={12}
                      md={4}
                    >
                      <Grid item xs={12} >
                        <Autocomplete
                          id="branchId"
                          options={BranchList}
                          isOptionEqualToValue={(option, value) =>value&&
                            (value.id === 0 ||
                            value.id === "" ||
                            option.id === value.id)
                          }
                          getOptionLabel={(option) =>
                            option.name ? option.name : ""
                          }
                          value={
                            data.branchId
                              ? BranchList.find((item) => item.id === data.branchId)
                              : null
                          }
                          onChange={(event, value) => {
                            setdata((prevFilters) => ({
                                ...prevFilters,
                                branchId: value !== null ? value.id : 0,
                                employeeId: 0,
                              }));
                            getOpenMonth(value !== null ? value.id : 0);
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="branchId"
                              required
                              label={intl.formatMessage(Payrollmessages.branch)}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6} >
                        <TextField
                          id="YearId"
                          name="YearId"
                          value={data.yearName}
                          label={intl.formatMessage(Payrollmessages.year)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid item xs={6} >
                        <TextField
                          id="MonthId"
                          name="MonthId"
                          value={data.monthName}
                          label={intl.formatMessage(Payrollmessages.month)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      spacing={2}
                      xs={12}
                      md={8}
                    >
                      <Card className={classes.card}>
                        <CardContent>
                          <Grid
                            container
                            spacing={1}
                            alignItems="flex-start"
                            direction="row"
                          >
                            <Grid item xs={12} md={6}>
                              <Autocomplete
                                id="PayTemplateId"
                                options={PayTemplateList}
                                isOptionEqualToValue={(option, value) =>value&&
                                  (value.id === 0 ||
                                  value.id === "" ||
                                  option.id === value.id)
                                }
                                getOptionLabel={(option) =>
                                  option.name ? option.name : ""
                                }
                                value={
                                  data.payTemplateId
                                    ? PayTemplateList.find(
                                        (item) => item.id === data.payTemplateId
                                      ) ?? null
                                    : null
                                }
                                onChange={(event, value) => {
                                  setdata((prevFilters) => ({
                                    ...prevFilters,
                                    payTemplateId: value !== null ? value.id : 0,
                                  }));
                                  getElementList(value !== null ? value.id : 0);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    variant="outlined"
                                    {...params}
                                    name="PayTemplateId"
                                    required
                                    label={intl.formatMessage(
                                      messages.payTemplate
                                    )}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Autocomplete
                                id="elementId"
                                options={elementList}
                                isOptionEqualToValue={(option, value) =>value&&
                                  (value.id === 0 ||
                                  value.id === "" ||
                                  option.id === value.id)
                                }
                                getOptionLabel={(option) =>
                                  option.name ? option.name : ""
                                }
                                value={
                                  data.elementId
                                    ? elementList.find(
                                        (item) => item.id === data.elementId
                                      )
                                    : null
                                }
                                onChange={(event, value) => {
                                  getElementData(value !== null ? value.id : 0);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    variant="outlined"
                                    {...params}
                                    name="elementId"
                                    required
                                    label={intl.formatMessage(
                                      Payrollmessages.element
                                    )}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <TextField
                                id="ElementMode"
                                name="ElementMode"
                                value={
                                  data.elementModeId == 1
                                    ? intl.formatMessage(messages.constant)
                                    : data.elementModeId == 2
                                    ? intl.formatMessage(messages.variable)
                                    : ""
                                }
                                label={intl.formatMessage(messages.elementMode)}
                                className={classes.field}
                                variant="outlined"
                                disabled
                                autoComplete='off'
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <TextField
                                id="ElementMaxVal"
                                name="ElementMaxVal"
                                value={data.elementMaxVal}
                                label={intl.formatMessage(messages.max)}
                                disabled
                                className={classes.field}
                                autoComplete='off'
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <TextField
                                id="ElementMinVal"
                                name="ElementMinVal"
                                value={data.elementMinVal}
                                label={intl.formatMessage(messages.min)}
                                disabled
                                className={classes.field}
                                autoComplete='off'
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <TextField
                                id="DefaultVal"
                                name="DefaultVal"
                                value={data.defaultVal}
                                label={intl.formatMessage(
                                  messages.defaultValue
                                )}
                                className={classes.field}
                                variant="outlined"
                                disabled
                                autoComplete='off'
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={data.employeeId}
                branchId={data.branchId}
              ></EmployeeData>
            </Grid>

            <Grid item md={4}></Grid>

            <Grid item xs={12} md={2}>
              <TextField
                id="Val"
                name="Val"
                value={data.elemVal}
                label={intl.formatMessage(messages.val)}
                className={classes.field}
                variant="outlined"
                onChange={(e) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      elemVal: e.target.value,
                    }));
                  }}
                  autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="Notes"
                name="Notes"
                value={data.notes}
                label={intl.formatMessage(Payrollmessages.notes)}
                className={classes.field}
                variant="outlined"
                onChange={(e) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    notes: e.target.value,
                  }));
                }}
                autoComplete='off'
              />
            </Grid>

            <Grid item >
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="secondary"
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>
            <Grid item >
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
        </form>
      </PapperBlock>
    </PayRollLoaderInForms>
  );
}
ElementValCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ElementValCreate);
