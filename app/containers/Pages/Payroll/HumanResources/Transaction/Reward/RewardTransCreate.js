import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/RewardTransData";
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
  Autocomplete,
  Card,
  CardContent,
  FormControl,
  Tooltip,
} from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GeneralListApis from "../../../api/GeneralListApis";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import EmployeeData from "../../../Component/EmployeeData";
import SaveButton from "../../../Component/SaveButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router-dom";
import { ServerURL } from "../../../api/ServerConfig";
import PayRollLoader from "../../../Component/PayRollLoader";

function RewardTransCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes, cx } = useStyles();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [data, setdata] = useState({
    id: 0,
    date: format(new Date(), "yyyy-MM-dd"),
    docName: "",
    employeeId: "",
    elementId: "",
    elementName: "",
    monthId: "",
    monthName: "",
    note: "",
    payTemplateId: "",
    payTemplateName: "",
    rewardsId: "",
    rewardsName: "",
    value: "",
    yearId: "",
    yearName: "",
    superEmployeeId:"",
  });
  const [YearList, setYearList] = useState([]);
  const [MonthList, setMonthList] = useState([]);
  const [RewardsList, setRewardsList] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const handleEmpChange = useCallback((id, name) => {
    if (name == "employeeId")
      setdata((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
      }));
    if (name == "superEmployeeId")
      setdata((prevFilters) => ({
        ...prevFilters,
        superEmployeeId: id,
      }));
  }, []);

  const handleChange = (event, name) => {
    if (event.target.name == "note")
      setdata((prevFilters) => ({
        ...prevFilters,
        note: event.target.value,
      }));

    if (event.target.name == "value")
      setdata((prevFilters) => ({
        ...prevFilters,
        value: event.target.value,
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/RewardTrans`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function oncancel() {
    history.push(`/app/Pages/HR/RewardTrans`);
  }
  async function fetchData() {
    try {
      const years = await GeneralListApis(locale).GetYears(locale);
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths(locale);
      setMonthList(months);

      const rewards = await GeneralListApis(locale).GetRewards(locale);
      setRewardsList(rewards);

      if (id) {
        const dataApi = await ApiData(locale).Get(id);
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

  async function getRewardData(id) {
    try {
      setIsLoading(true);
      if (!id) {
        setdata((prevFilters) => ({
          ...prevFilters,
          elementId: 0,
          elementName: "",
          payTemplateId: 0,
          payTemplateName: "",
          value: "",
        }));
        return;
      }
      const rewarddata = await ApiData(locale).GetRewardData(id);
      setdata((prevFilters) => ({
        ...prevFilters,
        elementId: rewarddata.elementId,
        elementName: rewarddata.elementName,
        payTemplateId: rewarddata.payTemplateId,
        payTemplateName: rewarddata.payTemplateName,
        value: rewarddata.value,
      }));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.createRewardTitle)
            : intl.formatMessage(messages.updateRewardTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(messages.date)}
                  value={data.date}
                  onChange={(date) => {
                    if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                      if (!isNaN(new Date(date))) { 
                        setdata((prevFilters) => ({
                            ...prevFilters,
                            date: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                          }))
                      }
                      else
                      {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          date: null,
                        }))
                      } 
                    }
                  }}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={2}>
              <Autocomplete
                id="yearid"
                options={YearList}
                value={{ id: data.yearId, name: data.yearName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    yearId: value !== null ? value.id : 0,
                    yearName: value !== null ? value.name : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="yearId"
                    required
                    label={intl.formatMessage(messages.yearName)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Autocomplete
                id="monthId"
                options={MonthList}
                value={{ id: data.monthId, name: data.monthName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    monthId: value !== null ? value.id : 0,
                    monthName: value !== null ? value.name : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="monthId"
                    required
                    label={intl.formatMessage(messages.monthName)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl variant="standard">
                <div className={classes.actions}>
                  <Tooltip title="Upload">
                    <Button
                      variant="contained"
                      color="secondary"
                      component="label"
                    >
                      <AddIcon
                        className={cx(
                          smUp && classes.leftIcon,
                          classes.iconSmall
                        )}
                      />
                      {smUp && " "} Upload
                      <input
                        hidden
                        type="file"
                        name="file"
                        id="inputGroupFile"
                        onChange={(e) => {
                          setdata((prevFilters) => ({
                            ...prevFilters,
                            uploadedFile: e.target.files[0],
                          }));
                        }}
                        accept="image/png, image/jpeg, image/jpg, image/apng, image/webp, image/svg+xml"
                      />
                    </Button>
                  </Tooltip>
                </div>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              {data.docName && (
                <NavLink
                  to={{ pathname: `${ServerURL}${data.docName}` }}
                  target="_blank"
                >
                  <Button size="small">Open File</Button>
                </NavLink>
              )}
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
                      <Autocomplete
                        id="rewardsid"
                        options={RewardsList}
                        value={{ id: data.rewardsId, name: data.rewardsName }}
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
                            rewardsId: value !== null ? value.id : 0,
                            rewardsName: value !== null ? value.name : "",
                          }));
                          getRewardData(value !== null ? value.id : 0);
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="rewardsid"
                            required
                            label={intl.formatMessage(messages.rewardsName)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        id="payTemplateName"
                        name="payTemplateName"
                        value={data.payTemplateName}
                        label={intl.formatMessage(messages.payTemplateName)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        id="elementName"
                        name="elementName"
                        value={data.elementName}
                        label={intl.formatMessage(messages.elementName)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        id="value"
                        name="value"
                        value={data.value}
                        onChange={(e) => handleChange(e)}
                        label={intl.formatMessage(messages.value)}
                        required
                        className={classes.field}
                        variant="outlined"
                        //disabled={data.value ? true : false}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={data.employeeId}
              ></EmployeeData>
            </Grid>
            <Grid item xs={12} md={12}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={data.superEmployeeId}
                isSuper={true}                
              ></EmployeeData>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                id="note"
                name="note"
                value={data.note}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.note)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={1}>
              <SaveButton Id={id} />
            </Grid>
            <Grid item xs={12} md={1}>
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
RewardTransCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(RewardTransCreate);
