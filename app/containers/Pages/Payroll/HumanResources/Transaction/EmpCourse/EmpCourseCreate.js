import React, { useState, useEffect } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/EmpCourseData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { Button, Grid, TextField, Autocomplete } from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GeneralListApis from "../../../api/GeneralListApis";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import SaveButton from "../../../Component/SaveButton";
import PayRollLoader from "../../../Component/PayRollLoader";

function EmpCourseCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState({
    id: 0,
    startDate: format(new Date(), "yyyy-MM-dd"),
    finishDate: format(new Date(), "yyyy-MM-dd"),
    commStartDate: format(new Date(), "yyyy-MM-dd"),
    commEndDate: format(new Date(), "yyyy-MM-dd"),
    employeeId: "",
    employeeName: "",
    courseId: "",
    courseName: "",
    gradeId: "",
    gradeName: "",
    centerId: "",
    centerName: "",
    courseCost: "",
    notes: "",
  });
  const [EmployeeList, setEmployeeList] = useState([]);
  const [CourseList, setCourseList] = useState([]);
  const [GradeList, setGradeList] = useState([]);
  const [CenterList, setCenterList] = useState([]);
  const history = useHistory();

  const handleChange = (event) => {
    if (event.target.name == "notes")
      setdata((prevFilters) => ({
        ...prevFilters,
        notes: event.target.value,
      }));

    if (event.target.name == "courseCost")
      setdata((prevFilters) => ({
        ...prevFilters,
        courseCost: event.target.value,
      }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/EmpCourse`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/HR/EmpCourse`);
  }
  async function fetchData() {
    try {
      const courses = await GeneralListApis(locale).GetCourseList();
      setCourseList(courses);

      const grades = await GeneralListApis(locale).GetGradeList();
      setGradeList(grades);

      const centers = await GeneralListApis(locale).GetTrainingCenterList();
      setCenterList(centers);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      if (id) {
        const dataApi = await ApiData(locale).Get(id ?? 0);

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
            ? intl.formatMessage(messages.EmpCourseCreateTitle)
            : intl.formatMessage(messages.EmpCourseUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(Payrollmessages.fromdate)}
                  value={data.startDate}
                  onChange={(date) => {
                    if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                      if (!isNaN(new Date(date))) { 
                        setdata((prevFilters) => ({
                            ...prevFilters,
                            startDate: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                          }))
                      }
                      else
                      {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          startDate: null,
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
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(Payrollmessages.todate)}
                  value={data.finishDate}
                  onChange={(date) => {
                    if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                      if (!isNaN(new Date(date))) { 
                        setdata((prevFilters) => ({
                            ...prevFilters,
                            finishDate: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                          }))
                      }
                      else
                      {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          finishDate: null,
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
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(messages.commStartDate)}
                  value={data.commStartDate}
                  onChange={(date) => {
                    if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                      if (!isNaN(new Date(date))) { 
                        setdata((prevFilters) => ({
                            ...prevFilters,
                            commStartDate: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                          }))
                      }
                      else
                      {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          commStartDate: null,
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
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(messages.commEndDate)}
                  value={data.commEndDate}
                  onChange={(date) => {
                    if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                      if (!isNaN(new Date(date))) { 
                        setdata((prevFilters) => ({
                            ...prevFilters,
                            commEndDate: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                          }))
                      }
                      else
                      {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          commEndDate: null,
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
            <Grid item xs={12} md={3}>
              <Autocomplete
                id="employeeId"
                options={EmployeeList}
                value={{ id: data.employeeId, name: data.employeeName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    employeeId: value !== null ? value.id : 0,
                    employeeName: value !== null ? value.name : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="employeeId"
                    required
                    label={intl.formatMessage(messages.employeeName)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Autocomplete
                id="courseId"
                options={CourseList}
                value={{ id: data.courseId, name: data.courseName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    courseId: value !== null ? value.id : 0,
                    courseName: value !== null ? value.name : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="courseId"
                    required
                    label={intl.formatMessage(messages.courseName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                id="gradeId"
                options={GradeList}
                value={{ id: data.gradeId, name: data.gradeName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    gradeId: value !== null ? value.id : 0,
                    gradeName: value !== null ? value.name : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="gradeId"
                    required
                    label={intl.formatMessage(messages.gradeName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                id="centerId"
                options={CenterList}
                value={{ id: data.centerId, name: data.centerName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    centerId: value !== null ? value.id : 0,
                    centerName: value !== null ? value.name : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="centerId"
                    required
                    label={intl.formatMessage(messages.centerName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                id="courseCost"
                name="courseCost"
                value={data.courseCost}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(Payrollmessages.price)}
                className={classes.field}
                variant="outlined"
                required
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={9}>
              <TextField
                id="notes"
                name="notes"
                value={data.notes}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.note)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
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
EmpCourseCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(EmpCourseCreate);
