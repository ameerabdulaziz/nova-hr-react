import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/PermissionData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import Business from "@mui/icons-material/Business";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import GeneralListApis from "../../../api/GeneralListApis";
import { useLocation } from "react-router-dom";
import style from "../../../../../../styles/styles.scss";
import ResignReqTrxSty from "../../../../../../styles/pagesStyle/ResignReqTrxSty.scss";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PayRollLoader from "../../../Component/PayRollLoader";
import OrganizationTree from "../../../Component/OrganizationTree/Tree";
import OrganizationTreePopup from "../../../Component/OrganizationTree/TreePopup";
import { Box } from "@mui/material";
import SITEMAP from "../../../../../App/routes/sitemap";

function PermissionCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();

  const [organizationChartData, setOrganizationChartData] = useState(null);
  const [isTreePopupOpen, setIsTreePopupOpen] = useState(false);
  const [organizationTree, setOrganizationTree] = useState(
    OrganizationTree.buildTreeFromArray(null)
  );

  const dayList = [
    {
      id: 1,
      name: "Saturday",
    },
    {
      id: 2,
      name: "Sunday",
    },
    {
      id: 3,
      name: "Monday",
    },
    {
      id: 4,
      name: "Tuesday",
    },
    {
      id: 5,
      name: "Wednesday",
    },
    {
      id: 6,
      name: "Thursday",
    },
    {
      id: 7,
      name: "Friday",
    },
  ];

  const [data, setdata] = useState({
    id: 0,
    arName: "",
    enName: "",
    shortName: "",
    isDeducted: false,
    elementId: null,
    elementName: "",
    deductedValue: "",
    maxRepeated: "",
    maxMinuteNo: "",
    minMinuteNo: "",
    isDeductAnnual: false,
    isDeductReplacment:false,
    reqDayNotAllow: [],
    reqBeforeShiftInMinute: "",
    allowToTime: "",
    allowFromTime: "",
    organizationIds: [],
    isBetweenDay: false,
    isConfilctWithVac: false,
  });
  const [ElementList, setElementList] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event) => {
    if (event.target.name == "arName")
      setdata((prevFilters) => ({
        ...prevFilters,
        arName: event.target.value,
      }));

    if (event.target.name == "enName")
      setdata((prevFilters) => ({
        ...prevFilters,
        enName: event.target.value,
      }));

    if (event.target.name == "shortName")
      setdata((prevFilters) => ({
        ...prevFilters,
        shortName: event.target.value,
      }));

    if (event.target.name == "deductedValue")
      setdata((prevFilters) => ({
        ...prevFilters,
        deductedValue: event.target.value,
      }));

    if (event.target.name == "maxRepeated") {
      setdata((prevFilters) => ({
        ...prevFilters,
        maxRepeated: event.target.value,
      }));
    }
    if (event.target.name == "maxMinuteNo") {
      setdata((prevFilters) => ({
        ...prevFilters,
        maxMinuteNo: event.target.value,
      }));
    }
    if (event.target.name == "minMinuteNo") {
      setdata((prevFilters) => ({
        ...prevFilters,
        minMinuteNo: event.target.value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const body = {
        ...data,
        reqDayNotAllow: data.reqDayNotAllow.map((item) => item.name).join(","),
        organizationIds: data.organizationIds.map((item) => item.id).join(","),
      };

      await ApiData(locale).Save(body);

      toast.success(notif.saved);
      history.push(SITEMAP.attendance.Permission.route);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(SITEMAP.attendance.Permission.route);
  }
  async function fetchData() {
    try {
      const elements = await GeneralListApis(locale).GetElementList();
      setElementList(elements);

      const chart = await GeneralListApis(locale).GetSimpleOrganizationChart();

      if (chart?.[0]) {
        setOrganizationChartData(chart[0]);
        setOrganizationTree(OrganizationTree.buildTreeFromArray(chart[0]));
      } else {
        setOrganizationTree(
          OrganizationTree.buildTreeFromArray(organizationChartData)
        );
      }

      if (id) {
        const dataApi = await ApiData(locale).Get(id ?? 0);
        const clonedTree = OrganizationTree.buildTreeFromArray(
          chart?.[0] ?? organizationChartData
        );

        if (dataApi.organizationIds) {
          dataApi.organizationIds.split(",").forEach((item) => {
            clonedTree.addIsCheckProperty(String(item), true);
          });
          setOrganizationTree(clonedTree);
        }

        const days = dataApi.reqDayNotAllow
          ? dataApi.reqDayNotAllow.split(",").map((dayName) => {
              const day = dayList.find((item) => item.name === dayName);

              if (day) {
                return day;
              }

              return {
                id: dayName,
                name: dayName,
              };
            })
          : [];

        setdata({
          ...dataApi,
          reqDayNotAllow: days,
          organizationIds: clonedTree.getCheckedLeafNodes(),
        });
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onTreePopupSave = (changedTree) => {
    setOrganizationTree(changedTree.clone());
    setdata((prev) => ({
      ...prev,
      organizationIds: changedTree.getCheckedLeafNodes(),
    }));
  };

  const onTimePickerChange = (evt) => {
    setdata((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      {organizationChartData &&
        Object.keys(organizationChartData).length > 0 && (
          <OrganizationTreePopup
            isOpen={isTreePopupOpen}
            tree={organizationTree.clone()}
            chartData={organizationChartData}
            setIsOpen={setIsTreePopupOpen}
            onSave={onTreePopupSave}
          />
        )}

      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.PermissionCreateTitle)
            : intl.formatMessage(messages.PermissionUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={6} lg={5} xl={3}>
              <TextField
                id="arName"
                name="arName"
                value={data.arName}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(Payrollmessages.arName)}
                className={classes.field}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} md={6} lg={5} xl={3}>
              <TextField
                id="enName"
                name="enName"
                value={data.enName}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(Payrollmessages.enName)}
                className={classes.field}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <TextField
                id="shortName"
                name="shortName"
                value={data.shortName}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.shortName)}
                className={classes.field}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} md={3} lg={3} xl={1.5}>
              <TextField
                id="minMinuteNo"
                name="minMinuteNo"
                value={data.minMinuteNo}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.minMinuteNo)}
                className={classes.field}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <TextField
                id="maxMinuteNo"
                name="maxMinuteNo"
                value={data.maxMinuteNo}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.maxMinuteNo)}
                className={classes.field}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <TextField
                id="maxRepeated"
                name="maxRepeated"
                value={data.maxRepeated}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.maxRepeated)}
                className={classes.field}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} md={6} lg={5} xl={3} className={style.totalMinutesContainer}>
              <TextField
                name="ReqBeforeShiftInMinute"
                id="ReqBeforeShiftInMinute"
                label={intl.formatMessage(messages.reqBeforeShiftInMinute)}
                variant="outlined"
                type="number"
                fullWidth
                value={data.reqBeforeShiftInMinute}
                onChange={(e) =>
                  setdata((prev) => ({
                    ...prev,
                    reqBeforeShiftInMinute: e.target.value,
                  }))
                }
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <TextField
                value={data.allowFromTime}
                label={intl.formatMessage(messages.startTime)}
                type="time"
                name="allowFromTime"
                onChange={onTimePickerChange}
                className={classes.field}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <TextField
                value={data.allowToTime}
                label={intl.formatMessage(messages.endTime)}
                type="time"
                name="allowToTime"
                onChange={onTimePickerChange}
                className={classes.field}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={5} xl={3}>
              <Autocomplete
                options={dayList}
                multiple
                disableCloseOnSelect
                className={`${style.AutocompleteMulSty} ${
                  locale === "ar" ? style.AutocompleteMulStyAR : null
                }`}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={data.reqDayNotAllow}
                renderOption={(optionProps, option, { selected }) => (
                  <li {...optionProps} key={optionProps.id}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                getOptionLabel={(option) => (option ? option.name : "")}
                onChange={(_, value) =>
                  setdata((prev) => ({ ...prev, reqDayNotAllow: value }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.reqDayNotAllow)}
                  />
                )}
              />
            </Grid>




            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.isDeducted}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                isDeducted: e.target.checked,
                              }));
                              e.target.checked
                                ? setdata((prevFilters) => ({
                                    ...prevFilters,
                                    isDeductAnnual: false,
                                  }))
                                : null;
                            }}
                            value={data.isDeducted}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.isDeducted)}
                      />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Autocomplete
                        id="elementid"
                        options={ElementList}
                        value={{ id: data.elementId, name: data.elementName }}
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
                            elementId: value !== null ? value.id : null,
                            elementName: value !== null ? value.name : "",
                          }));
                        }}
                        disabled={!data.isDeducted}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="elementid"
                            required={data.isDeducted}
                            disabled={!data.isDeducted}
                            label={intl.formatMessage(Payrollmessages.element)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id="deductedValue"
                        name="deductedValue"
                        value={data.deductedValue}
                        onChange={(e) => handleChange(e)}
                        label={intl.formatMessage(messages.deductedValue)}
                        className={classes.field}
                        variant="outlined"
                        disabled={!data.isDeducted}
                        required={data.isDeducted}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.isDeductAnnual}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                isDeductAnnual: e.target.checked,
                                isDeductReplacment:false,
                                deductedValue: "",
                                elementId: null,
                                elementName: "",
                              }));

                              e.target.checked
                                ? setdata((prevFilters) => ({
                                    ...prevFilters,
                                    isDeducted: false,
                                  }))
                                : null;
                            }}
                            value={data.isDeductAnnual}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.isDeductAnnual)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.isDeductReplacment}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                isDeductReplacment: e.target.checked,
                                isDeductAnnual:false,
                              }));
                            }}
                            value={data.isDeductReplacment}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.isDeductReplacment)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.isConfilctWithVac}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                isConfilctWithVac: e.target.checked,
                              }));
                            }}
                            value={data.isConfilctWithVac}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.isConfilctWithVac)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.isBetweenDay}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                isBetweenDay: e.target.checked,
                              }));
                            }}
                            value={data.isBetweenDay}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.isBetweenDay)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ p: "16px!important" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                  >
                    <Grid item>
                      <Typography variant="h6">
                        {intl.formatMessage(messages.orgName)}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Button
                        variant="contained"
                        disabled={
                          !(
                            organizationChartData &&
                            Object.keys(organizationChartData).length > 0
                          )
                        }
                        onClick={() => setIsTreePopupOpen(true)}
                      >
                        {intl.formatMessage(messages.addOrChangeOrganization)}
                      </Button>
                    </Grid>
                  </Grid>

                  {data.organizationIds && data.organizationIds.length > 0 ? (
                    <div className={`${ResignReqTrxSty.cardContainer}`}>
                      <Grid container spacing={3}>
                        {data.organizationIds.map((item, index) => (
                          <Grid item key={index}>
                            <div className={ResignReqTrxSty.custodiesContainer}>
                              <Business className={classes.textSty} />
                              <span>{item.value}</span>
                            </div>
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                  ) : (
                    <Stack
                      direction="row"
                      sx={{ minHeight: 200 }}
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <Box>
                        <PeopleIcon sx={{ color: "#a7acb2", fontSize: 30 }} />
                        <Typography color="#a7acb2" variant="body1">
                          {intl.formatMessage(messages.noOrganizationSelect)}
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="secondary"
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>
            <Grid item>
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
    </PayRollLoader>
  );
}
PermissionCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(PermissionCreate);
