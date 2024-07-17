import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import GeneralListApis from '../../api/GeneralListApis';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import { formateDate, formatNumber, getAutoCompleteValue, getCheckboxIcon } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/EmployeeTrainingReportData';
import SurveyTemplatePrint from '../components/EmployeeTrainingReport/SurveyTemplatePrint';
import TestTemplatePrint from '../components/EmployeeTrainingReport/TestTemplatePrint';
import messages from '../messages';

function EmployeeTrainingReport(props) {
  const { intl } = props;

  const printSurveyRef = useRef(null);
  const printTestRef = useRef(null);

  const pageTitle = localStorage.getItem('MenuName');

  const company = useSelector((state) => state.authReducer.companyInfo);
  const locale = useSelector((state) => state.language.locale);

  const [trainingList, setTrainingList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [dateError, setDateError] = useState({});

  const [surveyInfo, setSurveyInfo] = useState({
    id: '',
    templateId: '',
    name: '',
    surveyTypeId: '',
    showStyle: '',
    arDescription: '',
    enDescription: '',
  });
  const [surveyQuestionsAnswers, setSurveyQuestionsAnswers] = useState([]);
  const [surveyGroupedQuestion, setSurveyGroupedQuestion] = useState({});

  const [testInfo, setTestInfo] = useState({
    id: '',
    templateId: '',
    name: '',
    showStyle: '',
    arDescription: '',
    enDescription: '',
  });
  const [testQuestionList, setTestQuestionList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    trainingId: null,
    fromDate: null,
    toDate: null,
    courseId: null,
  });

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const params = {
        fromDate: formateDate(formInfo.fromDate),
        toDate: formateDate(formInfo.toDate),
        trainingId: formInfo.trainingId,
        courseId: formInfo.courseId,
      };

      const response = await api(locale).getTrainingEmployee(params);
      setTableData(response);

      const highlights = [];

      const course = getAutoCompleteValue(courseList, formInfo.courseId);
      const training = getAutoCompleteValue(trainingList, formInfo.trainingId);

      if (course) {
        highlights.push({
          label: intl.formatMessage(messages.courseName),
          value: course.name,
        });
      }

      if (training) {
        highlights.push({
          label: intl.formatMessage(messages.trainingName),
          value: training.name,
        });
      }

      if (formInfo.fromDate) {
        highlights.push({
          label: intl.formatMessage(payrollMessages.fromdate),
          value: formateDate(formInfo.fromDate),
        });
      }

      if (formInfo.toDate) {
        highlights.push({
          label: intl.formatMessage(payrollMessages.todate),
          value: formateDate(formInfo.toDate),
        });
      }

      setFilterHighlights(highlights);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const training = await GeneralListApis(locale).GetTrainingList();
      setTrainingList(training);

      const courses = await GeneralListApis(locale).GetCourseList();
      setCourseList(courses);
    } catch (error) {
      //
    } finally {
      fetchTableData();
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    fetchTableData();
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

  const columns = [
    {
      name: 'employeeName',
      label: intl.formatMessage(payrollMessages.employeeName),
    },
    {
      name: 'courseName',
      label: intl.formatMessage(messages.courseName),
    },
    {
      name: 'trainingName',
      label: intl.formatMessage(messages.trainingName),
    },
    {
      name: 'fromDate',
      label: intl.formatMessage(payrollMessages.fromdate),
    },
    {
      name: 'toDate',
      label: intl.formatMessage(payrollMessages.todate),
    },
    {
      name: 'surveyDone',
      label: intl.formatMessage(messages.surveyDone),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'testDone',
      label: intl.formatMessage(messages.testDone),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'testIsReview',
      label: intl.formatMessage(messages.testIsReview),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'testGrade',
      label: intl.formatMessage(messages.testGrade),
      options: {
        customBodyRender: (value) => formatNumber(value),
      },
    },
  ];

  const printSurveyJS = useReactToPrint({
    documentTitle: surveyInfo?.name ?? 'Survey Template',
    content: () => printSurveyRef?.current,
    onBeforeGetContent: () => {
      setIsLoading(true);
    },
    onAfterPrint: () => {
      setIsLoading(false);
      setSurveyInfo({
        id: '',
        templateId: '',
        name: '',
        surveyTypeId: '',
        showStyle: '',
        arDescription: '',
        enDescription: '',
      });
      setSurveyGroupedQuestion({});
    },
    onPrintError: () => {
      setIsLoading(false);
      setSurveyInfo({
        id: '',
        templateId: '',
        name: '',
        surveyTypeId: '',
        showStyle: '',
        arDescription: '',
        enDescription: '',
      });
      setSurveyGroupedQuestion({});
    },
  });

  const printTestJS = useReactToPrint({
    documentTitle: testInfo?.name ?? 'Test Template',
    content: () => printTestRef?.current,
    onBeforeGetContent: () => {
      setIsLoading(true);
    },
    onAfterPrint: () => {
      setIsLoading(false);
      setTestInfo({
        id: '',
        templateId: '',
        name: '',
        showStyle: '',
        arDescription: '',
        enDescription: '',
      });
    },
    onPrintError: () => {
      setIsLoading(false);
      setTestInfo({
        id: '',
        templateId: '',
        name: '',
        showStyle: '',
        arDescription: '',
        enDescription: '',
      });
    },
  });

  const groupQuestionsByGroup = (questions) => questions.reduce((grouped, question) => {
    const group = question.questionGroup;
    if (!grouped[group]) {
      grouped[group] = [];
    }

    grouped[group].push(question);
    return grouped;
  }, {});

  const onViewSurveyBtnClick = async (surveyId) => {
    setIsLoading(true);

    try {
      const response = await api(locale).printSurvey(surveyId);
      setSurveyInfo({
        id: response.id,
        templateId: response.templateId,
        name: response.name,
        surveyTypeId: response.surveyTypeId,
        showStyle: response.showStyle,
        arDescription: response.arDescription,
        enDescription: response.enDescription,
      });

      const answers = response.question.map((item) => ({
        textAnswer: item.textAnswer,
        answerChoiceId: item.answerChoiceId,
        questionTypeId: item.questionTypeId,
        questionId: item.questionId,
      }));
      setSurveyQuestionsAnswers(answers);

      setSurveyGroupedQuestion(groupQuestionsByGroup(response.question));

      // TODO: Mohammed-Taysser - refactor it
      setTimeout(() => {
        printSurveyJS();
      }, 1);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onViewTestBtnClick = async (row) => {
    setIsLoading(true);

    try {
      const response = await api(locale).printTest(row.testId);

      setTestInfo({
        id: response.id,
        templateId: response.templateId,
        name: response.name,
        showStyle: response.showStyle,
        arDescription: response.arDescription,
        enDescription: response.enDescription,
      });

      setTestQuestionList(response.question);

      // TODO: Mohammed-Taysser - refactor it
      setTimeout(() => {
        printTestJS();
      }, 1);
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
          variant='contained'
          color='primary'
          disabled={!row.serveyId}
          onClick={() => onViewSurveyBtnClick(row.serveyId)}
        >
          {intl.formatMessage(messages.employeeSurvey)}
        </Button>

        <Button
          variant='contained'
          color='primary'
          disabled={!row.serveyId}
          onClick={() => onViewSurveyBtnClick(row.trainerSurveyId)}
        >
          {intl.formatMessage(messages.trainerSurvey)}
        </Button>

        <Button
          variant='contained'
          color='primary'
          disabled={!row.testId}
          onClick={() => onViewTestBtnClick(row)}
        >
          {intl.formatMessage(messages.viewTest)}
        </Button>
      </>
    ),
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      {/* TODO: @mohammed-taysser - refactor it with print wrapper component */}
      <Box
        ref={printSurveyRef}
        sx={{
          display: 'none',
          pageBreakBefore: 'always',
          direction: 'ltr',
          '@media print': {
            display: 'block',
          },
          'p.MuiTypography-root, .MuiTableCell-root': {
            fontSize: '10px',
            color: '#000',
          },
          '@page': {
            margin: 4,
          },
          svg: {
            fontSize: '0.7rem',
          },
        }}
      >
        <Stack
          spacing={2}
          mx={4}
          mt={4}
          mb={2}
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <div>
            <img src={company?.logo} alt='' height={45} />
          </div>

          <Typography>{surveyInfo?.name}</Typography>
        </Stack>

        <SurveyTemplatePrint
          groupedQuestion={surveyGroupedQuestion}
          questionsAnswers={surveyQuestionsAnswers}
        />
      </Box>

      <Box
        ref={printTestRef}
        sx={{
          display: 'none',
          pageBreakBefore: 'always',
          direction: 'ltr',
          '@media print': {
            display: 'block',
          },
          'p.MuiTypography-root, .MuiTableCell-root': {
            fontSize: '10px',
            color: '#000',
          },
          '@page': {
            margin: 4,
          },
          svg: {
            fontSize: '0.7rem',
          },
        }}
      >
        <Stack
          spacing={2}
          mx={4}
          mt={4}
          mb={2}
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <div>
            <img src={company?.logo} alt='' height={45} />
          </div>

          <Typography>{testInfo?.name}</Typography>
        </Stack>

        <TestTemplatePrint questionList={testQuestionList} />
      </Box>

      <PapperBlock whiteBg icon='border_color' desc='' title={pageTitle}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Autocomplete
                options={trainingList}
                value={getAutoCompleteValue(trainingList, formInfo.trainingId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'trainingId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.trainingName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={courseList}
                value={getAutoCompleteValue(courseList, formInfo.courseId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'courseId')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.courseName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(payrollMessages.fromdate)}
                  value={formInfo.fromDate ? dayjs(formInfo.fromDate) : null}
                  sx={{ width: '100%' }}
                  onChange={(date) => onDatePickerChange(date, 'fromDate')}
                  onError={(error) => {
                    setDateError((prevState) => ({
                      ...prevState,
                      fromDate: error !== null,
                    }));
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(payrollMessages.todate)}
                  value={formInfo.toDate ? dayjs(formInfo.toDate) : null}
                  sx={{ width: '100%' }}
                  onChange={(date) => onDatePickerChange(date, 'toDate')}
                  onError={(error) => {
                    setDateError((prevState) => ({
                      ...prevState,
                      toDate: error !== null,
                    }));
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item>
              <Button variant='contained' color='primary' type='submit'>
                {intl.formatMessage(payrollMessages.search)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>

      <PayrollTable
        isLoading={isLoading}
        title=''
        data={tableData}
        columns={columns}
        actions={actions}
        filterHighlights={filterHighlights}
      />
    </PayRollLoader>
  );
}

EmployeeTrainingReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeTrainingReport);
