import { Autocomplete, Button, Grid, TextField, Tooltip } from "@mui/material";
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
import PayRollLoader from "../../Component/PayRollLoader";
import { formateDate, formatNumber, getCheckboxIcon } from "../../helpers";
import payrollMessages from "../../messages";
import api from "../api/TrTrainingTrxListData";
import PayrollTable from "../../Component/PayrollTable";
import messages from "../messages";
import { useHistory } from "react-router";

function EvaluateEmployee(props) {
  const { intl } = props;

  const pageTitle = localStorage.getItem("MenuName");

  const history = useHistory();

  const locale = useSelector((state) => state.language.locale);

  const [trainingList, setTrainingList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [training, setTraining] = useState({
    id: 0,
    arName: "",
    courseId: 0,
    courseName: "",
    fromDate: null,
    toDate: null,
    locationId: 0,
    locationName: "",
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const training = await api(locale).getTrainingByTrainerId();
      setTrainingList(training);
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

    setIsLoading(true);
    try {
      const data = await api(locale).GetTrainingEmployee(training.id);

      setData(data);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onAutoCompleteChange = (value, name) => {
    let selectedTraining = trainingList.find((item) => item.id === value.id);
    setTraining(selectedTraining);
  };

  const columns = [
    {
      name: "employeeId",
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: "courseId",
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: "trainingId",
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: "trainingEmpId",
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },

    {
      name: "employeeName",
      label: intl.formatMessage(payrollMessages.employeeName),
    },
    {
      name: "courseName",
      label: intl.formatMessage(messages.courseName),
    },
    {
      name: "fromDate",
      label: intl.formatMessage(payrollMessages.fromdate),
      options: {
        customBodyRender: (value) => <pre>{formateDate(value)}</pre>,
      },
    },
    {
      name: "toDate",
      label: intl.formatMessage(payrollMessages.todate),
      options: {
        customBodyRender: (value) => <pre>{formateDate(value)}</pre>,
      },
    },
    {
      name: "surveyDone",
      label: intl.formatMessage(messages.surveyDone),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: "testIsReview",
      label: intl.formatMessage(messages.testIsReview),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: "testGrade",
      label: intl.formatMessage(messages.testGrade),
      options: {
        customBodyRender: (value) => formatNumber(value),
      },
    },
  ];

  const onEvaluateBtnClick = (row) => {
    const state = { typeId: 2, trainingId: row.trainingId, evaluatedEmployeeId: row.employeeId };

    history.push('/app/Pages/Survey/Survey', state);
  };

  const onReviewBtnClick = (row) => {
    const state = { trainingId: row.trainingId, evaluatedEmployeeId: row.employeeId };

    history.push('/app/Pages/Training/ReviewTest', state);
  };

  const onRepeatBtnClick = async (row) => {
    setIsLoading(true);

    try {
      await api(locale).repeatTest(row.trainingId, row.employeeId);

      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const actions = {
    extraActions: (row) => (
      <>
        <Button
          variant="contained"
          color="primary"
          disabled={row.surveyDone}
          onClick={() => onEvaluateBtnClick(row)}
        >
          {intl.formatMessage(messages.evaluate)}
        </Button>

        <Button
          variant="contained"
          color="primary"
          disabled={row.testIsReview}
          onClick={() => onReviewBtnClick(row)}
        >
          {intl.formatMessage(messages.reviewTest)}
        </Button>

        <Button
          variant="contained"
          color="primary"
          disabled={!row.testIsReview}
          onClick={() => onRepeatBtnClick(row)}
        >
          {intl.formatMessage(messages.repeatTest)}
        </Button>
      </>
    ),
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" desc="" title={pageTitle}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Autocomplete
                options={trainingList}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.arName : "")}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.arName}
                  </li>
                )}
                onChange={(_, value) =>
                  onAutoCompleteChange(value, "trainingId")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.trainingName)}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                name="get"
              >
                {intl.formatMessage(payrollMessages.search)}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}></Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="arName"
                value={training.courseName}
                label={intl.formatMessage(messages.courseName)}
                fullWidth
                disabled={true}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="locationName"
                value={training.locationName}
                label={intl.formatMessage(messages.location)}
                fullWidth
                disabled={true}
                variant="outlined"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(payrollMessages.fromdate)}
                  value={training.fromDate ? dayjs(training.fromDate) : null}
                  sx={{ width: "100%" }}
                  disabled={true}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(payrollMessages.todate)}
                  value={training.toDate ? dayjs(training.toDate) : null}
                  disabled={true}
                  sx={{ width: "100%" }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
      <PayrollTable
        isLoading={isLoading}
        title={pageTitle}
        data={data}
        columns={columns}
        actions={actions}
      />
    </PayRollLoader>
  );
}

EvaluateEmployee.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EvaluateEmployee);
