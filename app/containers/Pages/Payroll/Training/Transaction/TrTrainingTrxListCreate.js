import { Autocomplete, Button, Grid, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import notif from "enl-api/ui/notifMessage";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import GeneralListApis from "../../api/GeneralListApis";
import NameList from "../../Component/NameList";
import PayRollLoader from "../../Component/PayRollLoader";
import { formateDate } from "../../helpers";
import payrollMessages from "../../messages";
import api from "../api/TrTrainingTrxListData";
import WorkFlowApi from "../../WorkFlow/api/WorkFlowData";

import messages from "../messages";
import SITEMAP from "../../../../App/routes/sitemap";

function TrTrainingTrxListCreate(props) {
  const { intl } = props;

  const pageTitle = localStorage.getItem("MenuName");

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const history = useHistory();

  const id = location.state?.id ?? 0;
  const { postDate } = location.state?? 0;
  const [employees, setEmployees] = useState([]);

  const [employeeList, setEmployeeList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  const [dateError, setDateError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    id,

    enName: "",
    arName: "",
    fromDate: new Date(),
    toDate: new Date(),
    trainerId: null,
    courseId: null,
    locationId: null,
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const employeesResponse = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employeesResponse);

      const courses = await GeneralListApis(locale).GetCourseList();
      setCourseList(courses);

      const locations = await GeneralListApis(locale).GetCourseLocationList();
      setLocationList(locations);

      if (id) {
        const response = await api(locale).getById(id);
        setFormInfo(response);

        setEmployees(
          response.employees?.map((item) => ({ ...item, isSelected: true })) ??
            []
        );
      } else if (postDate) {
        const response = await api(locale).getByExecutionId(postDate.executionId);
        setFormInfo(response);

        setEmployees(
          response.employees?.map((item) => ({ ...item, isSelected: true })) ??
            []
        );
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    const mappedEmployees = employees
      .filter((item) => item.isSelected)
      .map((item) => ({ id: item.id, name: item.name }));

    const body = {
      ...formInfo,
      employees: mappedEmployees,
      fromDate: formateDate(formInfo.fromDate),
      toDate: formateDate(formInfo.toDate),
    };

    setIsLoading(true);

    try {
      await api(locale).save(body);
      if (postDate) {
        let response = await WorkFlowApi(locale).ExecuteWorkFlow(postDate);
      }
      toast.success(notif.saved);
      history.push(SITEMAP.training.TrTrainingTrxList.route);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onCancelBtnClick = () => {
    history.push(SITEMAP.training.TrTrainingTrxList.route);
  };

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const getAutoCompleteValue = (list, key) =>
    list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={pageTitle} desc="">
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction="row">
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <TextField
                name="enName"
                value={formInfo.enName}
                required
                onChange={onInputChange}
                label={intl.formatMessage(payrollMessages.enName)}
                fullWidth
                variant="outlined"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <TextField
                name="arName"
                value={formInfo.arName}
                required
                onChange={onInputChange}
                label={intl.formatMessage(payrollMessages.arName)}
                fullWidth
                variant="outlined"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Autocomplete
                options={employeeList}
                value={getAutoCompleteValue(employeeList, formInfo.trainerId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : "")}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) =>
                  onAutoCompleteChange(value, "trainerId")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.trainerName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Autocomplete
                options={courseList}
                value={getAutoCompleteValue(courseList, formInfo.courseId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : "")}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, "courseId")}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.courseName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Autocomplete
                options={locationList}
                value={getAutoCompleteValue(locationList, formInfo.locationId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : "")}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) =>
                  onAutoCompleteChange(value, "locationId")
                }
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.location)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(payrollMessages.fromdate)}
                  value={formInfo.fromDate ? dayjs(formInfo.fromDate) : null}
                  sx={{ width: "100%" }}
                  onChange={(date) => onDatePickerChange(date, "fromDate")}
                  onError={(error) => {
                    setDateError((prevState) => ({
                      ...prevState,
                      fromDate: error !== null,
                    }));
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(payrollMessages.todate)}
                  value={formInfo.toDate ? dayjs(formInfo.toDate) : null}
                  sx={{ width: "100%" }}
                  onChange={(date) => onDatePickerChange(date, "toDate")}
                  onError={(error) => {
                    setDateError((prevState) => ({
                      ...prevState,
                      toDate: error !== null,
                    }));
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <NameList
                dataList={employees}
                setdataList={setEmployees}
                Key="Employee"
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" gap={2}>
                <Button variant="contained" color="secondary" type="submit">
                  {intl.formatMessage(payrollMessages.save)}
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={onCancelBtnClick}
                >
                  {intl.formatMessage(payrollMessages.cancel)}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

TrTrainingTrxListCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TrTrainingTrxListCreate);
