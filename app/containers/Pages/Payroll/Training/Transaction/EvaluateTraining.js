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

function EvaluateTraining(props) {
  const { intl } = props;
  const pageTitle = localStorage.getItem("MenuName");
  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const history = useHistory();

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const training = await api(locale).GetTrainingList();
      
      setData(training);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const columns = [
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
      name: "trainerId",
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
      name: "trainingName",
      label: intl.formatMessage(messages.trainingName),
    },
    {
      name: "courseName",
      label: intl.formatMessage(messages.courseName),
    },
    {
      name: "trainerName",
      label: intl.formatMessage(messages.trainerName),
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
    const state = { typeId: 1, trainingId: row.trainingId, trainingEmpId: row.trainingEmpId };

    history.push('/app/Pages/Survey/Survey', state);
  };

  const onTestBtnClick = (row) => {
    const state = { typeId: 1, trainingId: row.trainingId, trainingEmpId: row.trainingEmpId };

    history.push('/app/Pages/Training/Test', state);
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
          disabled={row.testDone}
          onClick={() => onTestBtnClick(row)}
        >
          {intl.formatMessage(messages.test)}
        </Button>
      </>
    ),
  };

  return (
    <PayRollLoader isLoading={isLoading}>
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

EvaluateTraining.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EvaluateTraining);
