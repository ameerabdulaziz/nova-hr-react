import { Button, Grid, Autocomplete, TextField, IconButton } from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import GeneralListApis from '../../api/GeneralListApis';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import { getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import messages from '../messages';
import API from '../api/SurveyReportsData';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SurveyHistoryReportPrintTemplete from '../components/SurveyHistoryReport/SurveyHistoryReportPrintTemplete';
import EmployeeTrainingReportData from '../../Training/api/EmployeeTrainingReportData';
import Tooltip from '@mui/material/Tooltip';
import { useReactToPrint } from 'react-to-print';



function SurveyHistoryReport(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [organizationList, setOrganizationList] = useState([]);
  const [surveyTemplateList, setSurveyTemplateList] = useState([]);
  const [surveyTemplate, setSurveyTemplate] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const printSurveyRef = useRef(null);
  const pageTitle = localStorage.getItem('MenuName');

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [surveyQuestionsAnswers, setSurveyQuestionsAnswers] = useState([]);
  const [surveyGroupedQuestion, setSurveyGroupedQuestion] = useState({});
  const [formInfo, setFormInfo] = useState({
    OrganizationId: "",
    BranchId: branchId,
  });

    const [surveyInfo, setSurveyInfo] = useState({
      id: '',
      templateId: '',
      name: '',
      surveyTypeId: '',
      showStyle: '',
      arDescription: '',
      enDescription: '',
    });
    

  const columns = [
    {
      name: 'employeeCode',
      label: intl.formatMessage(payrollMessages.employeeCode),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(payrollMessages.employeeName),
    },
    {
      name: 'insDate',
      label: intl.formatMessage(payrollMessages.startDate),
    },
    {
      name: 'doneDate',
      label: intl.formatMessage(payrollMessages.endDate),
    },
    {
      name: '',
      label: intl.formatMessage(payrollMessages.Actions),
      options: {
        customBodyRender: (value,tableMeta) => {
           return <div style={{cursor:"pointer"}}>
                    <Tooltip title={intl.formatMessage(payrollMessages.details)} cursor="pointer" className="mr-6">  
                        <IconButton
                            onClick={() => {
                                printDetailsFun(tableData[tableMeta.rowIndex]?.userSurveyHId)
                            }}
                        >
                            <LocalPrintshopIcon />
                        </IconButton>
                    </Tooltip>
            </div>
        }
      },
    },
  ];

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      formInfo.OrganizationId
    );
    const surveyTemplate = getAutoCompleteValue(surveyTemplateList, surveyTemplate?.id);
    const company = getAutoCompleteValue(companyList, formInfo.BranchId);

    if (organization) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: organization.name,
      });
    }

    if (surveyTemplate) {
      highlights.push({
        label: intl.formatMessage(messages.surveyTemplate),
        value: surveyTemplate.name,
      });
    }

    if (company) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: company.name,
      });
    }

    setFilterHighlights(highlights);
  };

  const fetchTableData = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      
       const dataApi = await API(locale).getList(surveyTemplate?.id,formInfo);

       setTableData(dataApi);

      getFilterHighlights();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    try {
      setIsLoading(true);

      const SurveyTemplate = await API(locale).getSurveyTemplateList();
      setSurveyTemplateList(SurveyTemplate);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
    } catch (error) {        
      setIsLoading(false);
    } finally {
      //
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onSearchBtnClick = (e) => {
    fetchTableData(e);
  };


  const groupQuestionsByGroup = (questions) => questions.reduce((grouped, question) => {
    const group = question.questionGroup;
    if (!grouped[group]) {
      grouped[group] = [];
    }

    grouped[group].push(question);
    return grouped;
  }, {});

  const printDetailsFun = async (surveyId) => {
    setIsLoading(true);

    try {
      const response = await EmployeeTrainingReportData(locale).printSurvey(surveyId);
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

    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };


  const onBeforeGetContent = () => {
    setIsLoading(true);
  };

  const onAfterPrint = () => {
    setIsLoading(false);
    setSurveyGroupedQuestion({});
    setSurveyInfo({
        id: '',
        templateId: '',
        name: '',
        surveyTypeId: '',
        showStyle: '',
        arDescription: '',
        enDescription: '',
      });
  };

  const onPrintError = () => {
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
  };


  const printSurveyJS = useReactToPrint({
      documentTitle: surveyInfo?.name ?? 'Survey Template',
      content: () => printSurveyRef?.current,
      onBeforeGetContent,
      onAfterPrint,
      onPrintError,
    });


  useEffect(()=>{
    if(surveyQuestionsAnswers.length !== 0 && Object.keys(surveyGroupedQuestion).length !== 0)
    {
        printSurveyJS();
    }

  },[surveyQuestionsAnswers,surveyGroupedQuestion])

  
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>

        <SurveyHistoryReportPrintTemplete 
            printSurveyRef={printSurveyRef}
            surveyInfo={surveyInfo}
            surveyQuestionsAnswers={surveyQuestionsAnswers}
            surveyGroupedQuestion={surveyGroupedQuestion}
        />


        <form onSubmit={onSearchBtnClick}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Search
                    setsearchData={setFormInfo}
                    searchData={formInfo}
                    notShowDate={true}
                    setIsLoading={setIsLoading}
                    company={formInfo.BranchId}
                    notShowStatus={true}
                    notShowEmployeeName={true}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                        <Autocomplete
                        value={surveyTemplate ? surveyTemplate : null}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => (option ? option.name : '')}
                        options={surveyTemplateList}
                        onChange={(_, value) => {
                            setSurveyTemplate(value ? value : null)
                        }}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label={intl.formatMessage(messages.surveyTemplate)}
                            required
                            />
                        )}
                        />
                    </Grid>

                <Grid item md={2}>
                    <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    >
                    {intl.formatMessage(payrollMessages.search)}
                    </Button>
                </Grid>
            </Grid>
        </form>
      </PapperBlock>

      <PayrollTable
        isLoading={isLoading}
        title=''
        filterHighlights={filterHighlights}
        data={tableData}
        columns={columns}
      />
    </PayRollLoader>
  );
}

SurveyHistoryReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SurveyHistoryReport);
