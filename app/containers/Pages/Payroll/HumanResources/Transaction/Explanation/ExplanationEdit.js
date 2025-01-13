import React, { useState, useEffect } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../../Explanation/api/ExplanationData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { Button, Grid, TextField, FormControlLabel, Checkbox } from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import SaveButton from "../../../Component/SaveButton";
import PayRollLoader from "../../../Component/PayRollLoader";
import { formateDate } from "../../../helpers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import SITEMAP from "../../../../../App/routes/sitemap";

function ExplanationEdit(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const id = location.state?.id ?? 0;
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  const [questionType, setQuestionType] = useState(location.state?.questionType ?? '');

  const [data, setdata] = useState({
    id: 0,
    employeeName: "",
    job: "",
    questionType: "",
    expTypeName: "",
    questionTitle: "",
    questionDate: "",
    questionDetails: "",
    hrLetterDate: "",
    directedTo: "",
    hrLetterLang: "",
    meetingReq: false,
    MeetingDate: null,
    fromTime: "",
    toTime: "",
  });
  const history = useHistory();


  const dateFormatFun = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const bodyData = {
        id: data.id,    
        response: data.response,
        MeetingDate: dateFormatFun(data.MeetingDate),
        fromTime: data.fromTime,
        toTime: data.toTime,
      }


      let response = await ApiData(locale).SaveResponse(bodyData);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.humanResources.Explanation.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) { 
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(SITEMAP.humanResources.Explanation.route);
  }

  async function fetchData() {
    try {
      const dataApi = await ApiData(locale).Get(id ?? 0);

      dataApi.questionDate = formateDate(dataApi.questionDate);
      dataApi.hrLetterDate = formateDate(dataApi.hrLetterDate);

      setQuestionType(dataApi.expTypeName);

      setdata((prev) => ({
          ...prev,
          ...dataApi
        }));
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
        title={intl.formatMessage(messages.update) + ` ${questionType}`}
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} mt={0}>
            <Grid item xs={12} md={4}>
              <TextField
                id="employee"
                name="employee"
                value={data.employeeName}
                label={intl.formatMessage(messages.employeeName)}
                className={classes.field}
                variant="outlined"
                disabled
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="job"
                name="job"
                disabled
                value={data.job}
                label={intl.formatMessage(messages.job)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="questionDate"
                name="questionDate"
                value={data.questionDate}
                label={intl.formatMessage(messages.questionDate)}
                className={classes.field}
                disabled
                variant="outlined"
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="ExpTypeName"
                name="ExpTypeName"
                value={data.expTypeName}
                label={intl.formatMessage(Payrollmessages.type)}
                className={classes.field}
                variant="outlined"
                disabled
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="QuestionTitle"
                name="QuestionTitle"
                value={data.questionTitle}
                label={intl.formatMessage(Payrollmessages.title)}
                className={classes.field}
                variant="outlined"
                disabled
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12}  md={4}>
                <FormControlLabel
                    control={(
                    <Checkbox
                        checked={data.meetingReq} 
                        value={data.meetingReq}
                        color="primary"
                        disabled
                    />
                    )}
                    label={intl.formatMessage(Payrollmessages.meetingReq)}
                />
            </Grid> 
            <Grid item xs={12} md={12}>
              <TextField
                id="QuestionDetails"
                name="QuestionDetails"
                value={data.questionDetails}
                multiline
                rows={2}
                label={intl.formatMessage(Payrollmessages.details)}
                className={classes.field}
                disabled
                variant="outlined"
                autoComplete='off'
              />
            </Grid>
            {data.questionType == 4 ? (
              <Grid item xs={12} md={4}>
                <TextField
                  id="HrLetterDate"
                  name="HrLetterDate"
                  value={data.hrLetterDate}
                  label={intl.formatMessage(Payrollmessages.hrLetterDate)}
                  className={classes.field}
                  variant="outlined"
                  disabled
                  autoComplete='off'
                />
              </Grid>
            ) : (
              ""
            )}
            {data.questionType == 4 ? (
              <Grid item xs={12} md={4}>
                <TextField
                  id="DirectedTo"
                  name="DirectedTo"
                  value={data.directedTo}
                  label={intl.formatMessage(Payrollmessages.directedTo)}
                  className={classes.field}
                  variant="outlined"
                  autoComplete='off'
                  disabled
                />
              </Grid>
            ) : (
              ""
            )}
            {data.questionType == 4 ? (
              <Grid item xs={12} md={4}>
                <TextField
                  id="HrLetterLang"
                  name="HrLetterLang"
                  value={data.hrLetterLang}
                  label={intl.formatMessage(Payrollmessages.hrLetterLang)}
                  className={classes.field}
                  variant="outlined"
                  disabled
                  autoComplete='off'
                />
              </Grid>
            ) : (
              ""
            )}

            {data.meetingReq && (
              <>
                <Grid item xs={12} md={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={intl.formatMessage(messages.meetingDate)}
                      value={data.MeetingDate ? dayjs(data.MeetingDate) : data.MeetingDate}
                      className={classes.field}
                      onChange={(date) => {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          MeetingDate: date,
                        }));
                      }}
                      onError={(error, value) => {
                        if (error !== null) {
                          setDateError((prevState) => ({
                            ...prevState,
                            [`MeetingDate`]: true,
                          }));
                        } else {
                          setDateError((prevState) => ({
                            ...prevState,
                            [`MeetingDate`]: false,
                          }));
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                      id="fromTime"
                      name="fromTime"
                      label={intl.formatMessage(Payrollmessages.startTime)}
                      type="time"
                      onChange={(e) =>
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          fromTime: e.target.value,
                        }))
                      }
                      className={classes.field}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      autoComplete="off"
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                      id="toTime"
                      name="toTime"
                      label={intl.formatMessage(Payrollmessages.endTime)}
                      type="time"
                      onChange={(e) =>
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          toTime: e.target.value,
                        }))
                      }
                      className={classes.field}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      autoComplete="off"
                    />
                </Grid>
              </>
            )}
            <Grid item xs={12} md={12}>
              <TextField
                id="response"
                name="response"
                multiline
                required
                rows={2}
                onChange={(e) =>
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    response: e.target.value,
                  }))
                }
                label={intl.formatMessage(messages.response)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={1}>
              <SaveButton Id={id}/>
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
ExplanationEdit.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ExplanationEdit);
