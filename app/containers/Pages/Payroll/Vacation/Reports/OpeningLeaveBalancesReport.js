import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import GeneralListApis from '../../api/GeneralListApis';
import { getAutoCompleteValue } from '../../helpers';
import API from '../api/OpeningLeaveBalancesData';
import messages from '../messages';

function OpeningLeaveBalancesReport(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);

  const [yearsList, setYearsList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const Title = localStorage.getItem('MenuName');

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [formInfo, setFormInfo] = useState({
    EmployeeId: '',
    OrganizationId: '',
    yearId: null,
    EmpStatusId: '',
    BranchId: '',
  });

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
      name: 'organizationName',
      label: intl.formatMessage(messages.organization),
    },
    {
      name: 'employeeCode',
      label: intl.formatMessage(messages.employeeId),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'vacationName',
      label: intl.formatMessage(messages.vacationName),
    },
    {
      name: 'vacBalance',
      label: intl.formatMessage(messages.Balance),
    },
    {
      name: 'postedBal',
      label: intl.formatMessage(messages.postedBalance),
    },
  ];

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      formInfo.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, formInfo.EmployeeId);
    const status = getAutoCompleteValue(statusList, formInfo.EmpStatusId);
    const company = getAutoCompleteValue(companyList, formInfo.BranchId);
    const year = getAutoCompleteValue(yearsList, formInfo.yearId);

    if (year) {
      highlights.push({
        label: intl.formatMessage(messages.year),
        value: year.name,
      });
    }

    if (organization) {
      highlights.push({
        label: intl.formatMessage(messages.Organization),
        value: organization.name,
      });
    }

    if (employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: employee.name,
      });
    }

    if (status) {
      highlights.push({
        label: intl.formatMessage(messages.status),
        value: status.name,
      });
    }

    if (company) {
      highlights.push({
        label: intl.formatMessage(messages.company),
        value: company.name,
      });
    }

    setFilterHighlights(highlights);
  };

  const fetchTableData = async () => {
    try {
      setIsLoading(true);

      const dataApi = await API(locale).GetReport(formInfo);

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

      const yearResponse = await GeneralListApis(locale).GetYears();
      setYearsList(yearResponse);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);

      await fetchTableData();
    } catch (error) {
      setIsLoading(false);
    } finally {
      //
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onSearchBtnClick = () => {
    fetchTableData();
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Search
              setsearchData={setFormInfo}
              searchData={formInfo}
              setIsLoading={setIsLoading}
              notShowDate={true}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Autocomplete
              value={getAutoCompleteValue(yearsList, formInfo.yearId)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              options={yearsList}
              onChange={(_, value) => {
                setFormInfo((prev) => ({
                  ...prev,
                  yearId: value?.id ? value?.id : null,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage(messages.year)}
                />
              )}
            />
          </Grid>

          <Grid item md={2}>
            <Button
              variant='contained'
              color='primary'
              onClick={onSearchBtnClick}
            >
              {intl.formatMessage(messages.search)}
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>

      <PayrollTable
        isLoading={isLoading}
        title=''
        data={tableData}
        filterHighlights={filterHighlights}
        columns={columns}
      />
    </PayRollLoader>
  );
}

OpeningLeaveBalancesReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OpeningLeaveBalancesReport);
