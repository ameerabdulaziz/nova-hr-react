import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/PenaltyTransData";
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
  Autocomplete,
  Card,
  CardContent,
  FormControl,
  Tooltip,
} from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import GeneralListApis from "../../../api/GeneralListApis";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ServerURL } from "../../../api/ServerConfig";
import { NavLink } from "react-router-dom";
import EmployeeData from "../../../Component/EmployeeData";
import SaveButton from "../../../Component/SaveButton";
import PayRollLoader from "../../../Component/PayRollLoader";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { getDefaultYearAndMonth } from "../../../helpers";

function PenaltyTransCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const [isLoading, setIsLoading] = useState(true);
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
    penaltyDetailId: "",
    penaltyTypeId: "",
    penaltyTypeName: "",
    penaltyId: "",
    penaltyName: "",
    superEmployeeId: "",
    value: "",
    yearId: "",
    yearName: "",
    month: "",
    sixMonth: "",
    year: "",
    hiringDateNo: "",
    lastDate: "",
    uploadedFile: null,
    docName: "",
  });
  const [YearList, setYearList] = useState([]);
  const [MonthList, setMonthList] = useState([]);
  const [PenaltyList, setPenaltyList] = useState([]);
  const [PenaltyTypeList, setPenaltyTypeList] = useState([]);

  const history = useHistory();

  const [DateError, setDateError] = useState({});

  // used to reformat date before send it to api
  const dateFormatFun = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };

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

  const handleChange = (event) => {
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

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);

      data.date = dateFormatFun(data.date);

      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/PenaltyTrans`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/HR/PenaltyTrans`);
  }
  async function fetchData() {
    try {
      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthList(months);

      const penalties = await GeneralListApis(locale).GetPenaltyList();
      setPenaltyList(penalties);

      const dataApi = await ApiData(locale).Get(id ?? 0);
      if (dataApi.id != 0) {
        setdata(dataApi);
      } else {
        const today = getDefaultYearAndMonth(years);
        const month = months.find((item) => item.id === today.monthId);
        const year = years.find((item) => item.id === today.yearId);

        setdata((prevFilters) => ({
          ...prevFilters,
          yearId: year?.id,
          yearName: year?.name,
          monthId: month?.id,
          monthName: month?.name,
        }));
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function getPenaltyData(id) {
    if (!id) {
      setdata((prevFilters) => ({
        ...prevFilters,
        elementId: 0,
        elementName: "",
        penaltyDetailId: 0,
        penaltyTypeId: 0,
        penaltyTypeName: "",
        value: "",
      }));
      setPenaltyTypeList([]);
      return;
    }
    try {
      setIsLoading(true);
      const result = await ApiData(locale).GetPenaltyTypesListByPenltyId(
        id,
        data.employeeId
      );
      setdata((prevFilters) => ({
        ...prevFilters,
        elementId: result.elementId,
        elementName: result.elementName,
        penaltyDetailId: result.selected.penaltyDetailId,
        penaltyTypeId: result.selected.id,
        penaltyTypeName: result.selected.name,
        value: result.selected.value,
      }));
      setPenaltyTypeList(result.penaltyTypeList);
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.date)}
                  value={data.date ? dayjs(data.date) : null}
                  className={classes.field}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      date: date,
                    }));
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`date`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`date`]: false,
                      }));
                    }
                  }}
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
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={data.employeeId}
                GetEmployeePenalties={true}
              ></EmployeeData>
            </Grid>
            <Grid item xs={12} md={12}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                isSuper={true}
                id={data.superEmployeeId}
              ></EmployeeData>
            </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                id="penaltyId"
                options={PenaltyList}
                value={{ id: data.penaltyId, name: data.penaltyName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    penaltyId: value !== null ? value.id : 0,
                    penaltyName: value !== null ? value.name : "",
                  }));
                  getPenaltyData(value !== null ? value.id : 0);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="rewardsid"
                    required
                    label={intl.formatMessage(messages.penaltyName)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="elementName"
                name="elementName"
                value={data.elementName}
                label={intl.formatMessage(messages.elementName)}
                className={classes.field}
                variant="outlined"
                disabled
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                id="penaltyTypeId"
                options={PenaltyTypeList}
                value={{
                  penaltyDetailId: data.penaltyDetailId,
                  id: data.penaltyTypeId,
                  name: data.penaltyTypeName,
                }}
                isOptionEqualToValue={(option, value) =>
                  value.penaltyDetailId === 0 ||
                  value.penaltyDetailId === "" ||
                  option.penaltyDetailId === value.penaltyDetailId
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    penaltyTypeId: value !== null ? value.id : 0,
                    penaltyTypeName: value !== null ? value.name : "",
                    penaltyDetailId: value.penaltyDetailId,
                    value: value !== null ? value.value : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="penaltyTypeId"
                    required
                    label={intl.formatMessage(messages.penaltyTypeName)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                autoComplete="off"
              />
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
                autoComplete="off"
              />
            </Grid>

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
PenaltyTransCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(PenaltyTransCreate);
