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
import { formateDate, getCheckboxIcon } from "../../helpers";
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
      name: "trainingEmpId",
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },

    {
      name: "trainingName",
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
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
  ];

  const onEvaluateBtnClick = (row) => {
    const state = { typeId: 1, trainingId: row[1] };

    history.push('/app/Pages/Survey/Survey', state);
  };

  const actions = {
    extraActions: (row) => (
      <>
        <Button variant="contained" color="primary"  onClick={() => onEvaluateBtnClick(row)}>
          {intl.formatMessage(messages.evaluate)}
        </Button>
        <Button variant="contained" color="primary">
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
