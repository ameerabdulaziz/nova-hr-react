import { Print } from '@mui/icons-material';
import {
  Box, IconButton, Stack, Tooltip, Typography
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import PayrollTable from '../../Component/PayrollTable';
import payrollMessages from '../../messages';
import api from '../api/SurveyTemplateData';
import SurveyTemplatePrint from '../components/SurveyTemplate/SurveyTemplatePrint';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function SurveyTemplate(props) {
  const { intl } = props;
  const printDivRef = useRef(null);

  const company = useSelector((state) => state.authReducer.companyInfo);
  const locale = useSelector((state) => state.language.locale);
  const pageTitle = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [surveyInfo, setSurveyInfo] = useState(null);
  const [groupedQuestion, setGroupedQuestion] = useState({});

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).getList();
      setTableData(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRow = async (id) => {
    setIsLoading(true);

    try {
      await api(locale).delete(id);

      toast.success(notif.saved);

      fetchTableData();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },

    {
      name: 'name',
      label: intl.formatMessage(payrollMessages.name),
    },

    {
      name: 'surveyType',
      label: intl.formatMessage(messages.surveyType),
    },

    {
      name: 'fromDate',
      label: intl.formatMessage(payrollMessages.fromdate),
    },

    {
      name: 'toDate',
      label: intl.formatMessage(payrollMessages.todate),
    },
  ];

  const printJS = useReactToPrint({
    documentTitle: surveyInfo?.name ?? 'Survey Template',
    content: () => printDivRef?.current,
    onBeforeGetContent: () => {
      setIsLoading(true);
    },
    onAfterPrint: () => {
      setIsLoading(false);
      setSurveyInfo(null);
      setGroupedQuestion({});
    },
    onPrintError: () => {
      setIsLoading(false);
      setSurveyInfo(null);
      setGroupedQuestion({});
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

  const onPrintBtnClick = async (row) => {
    setIsLoading(true);

    try {
      const response = await api(locale).print(row.id);

      setSurveyInfo(response);

      setGroupedQuestion(groupQuestionsByGroup(response.question));

      // TODO: Mohammed-Taysser - refactor it
      setTimeout(() => {
        printJS();
      }, 1);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const actions = {
    add: {
      url: SITEMAP.survey.SurveyTemplateCreate.route,
    },
    edit: {
      url: SITEMAP.survey.SurveyTemplateEdit.route,
    },
    delete: {
      api: deleteRow,
    },
    extraActions: (row) => (
      <Tooltip
        placement='bottom'
        title={intl.formatMessage(payrollMessages.Print)}
      >
        <span>
          <IconButton onClick={() => onPrintBtnClick(row)}>
            <Print sx={{ fontSize: '1.2rem' }} />
          </IconButton>
        </span>
      </Tooltip>
    ),
  };

  return (
    <>
      <Box
        ref={printDivRef}
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

        <SurveyTemplatePrint groupedQuestion={groupedQuestion} />
      </Box>

      <PayrollTable
        isLoading={isLoading}
        showLoader
        title={pageTitle}
        data={tableData}
        columns={columns}
        actions={actions}
      />
    </>
  );
}

SurveyTemplate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SurveyTemplate);
