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



function SurveyFollowReport(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [organizationList, setOrganizationList] = useState([]);
  const [surveyTemplateList, setSurveyTemplateList] = useState([]);
  const [surveyTemplate, setSurveyTemplate] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pageTitle = localStorage.getItem('MenuName');

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [formInfo, setFormInfo] = useState({
    OrganizationId: "",
    BranchId: branchId,
  });

    

  const columns = [
    {
      name: 'organizationName',
      label: intl.formatMessage(payrollMessages.organizationName),
    },
    {
      name: 'allEmployee',
      label: intl.formatMessage(messages.allEmployee),
    },
    {
      name: 'doneSurvey',
      label: intl.formatMessage(messages.completeSurvey),
    },
    {
      name: 'doneNotSurvey',
      label: intl.formatMessage(messages.surveyNotDone),
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

      
       const dataApi = await API(locale).getSurveyStatisticList(surveyTemplate?.id,formInfo);

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


  
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
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

SurveyFollowReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SurveyFollowReport);
