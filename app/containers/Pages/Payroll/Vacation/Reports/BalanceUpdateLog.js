import { Button, Grid } from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import GeneralListApis from '../../api/GeneralListApis';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import { formateDate, getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import API from '../api/BalanceUpdateLogData';
import messages from '../messages';

function BalanceUpdateLog(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pageTitle = localStorage.getItem('MenuName');

  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    OrganizationId: '',
    EmpStatusId: 1,
    BranchId: '',
  });

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [dateError, setDateError] = useState({});

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      formInfo.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, formInfo.EmployeeId);
    const status = getAutoCompleteValue(statusList, formInfo.EmpStatusId);
    const company = getAutoCompleteValue(companyList, formInfo.BranchId);

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

    if (formInfo.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(formInfo.FromDate),
      });
    }

    if (formInfo.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(formInfo.ToDate),
      });
    }

    setFilterHighlights(highlights);
  };

  const columns = [
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
      name: 'days',
      label: intl.formatMessage(messages.daysCount),
    },
    {
      name: 'trxDate',
      label: intl.formatMessage(messages.fromDate),
    },
    {
      name: 'tRxDesc',
      label: intl.formatMessage(messages.description),
      options: {
        customBodyRender: (value) => (value ? (
          <div style={{ maxWidth: '200px', width: 'max-content' }}>
            {value}
          </div>
        ) : (
          ''
        )),
      },
    },
    {
      name: 'vacBalance',
      label: intl.formatMessage(messages.Balance),
    },
    {
      name: 'oldbalance',
      label: intl.formatMessage(messages.oldBalance),
    },
    {
      name: 'notes',
      label: intl.formatMessage(messages.modificationReason),
      options: {
        customBodyRender: (value) => (value ? (
          <div style={{ maxWidth: '200px', width: 'max-content' }}>
            {value}
          </div>
        ) : (
          ''
        )),
      },
    },
  ];

  const fetchTableData = async () => {
    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);
      const formData = {
        ...formInfo,
        FromDate: formateDate(formInfo.FromDate),
        ToDate: formateDate(formInfo.ToDate),
      };

      const dataApi = await API(locale).GetReport(formData);

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
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Search
              setsearchData={setFormInfo}
              searchData={formInfo}
              setIsLoading={setIsLoading}
              DateError={dateError}
              setDateError={setDateError}
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
        showLoader
        title=''
        data={tableData}
        filterHighlights={filterHighlights}
        columns={columns}
      />
    </PayRollLoader>
  );
}

BalanceUpdateLog.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(BalanceUpdateLog);
