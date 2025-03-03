import { Button, Grid } from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import GeneralListApis from '../../api/GeneralListApis';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import Search from '../../Component/Search';
import { getAutoCompleteValue } from '../../helpers';
import messages from '../messages';
import API from '../api/VacationBalanceCostReportData';

function VacationBalanceCostReport(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  // const [organizationList, setOrganizationList] = useState([]);
  // const [employeeList, setEmployeeList] = useState([]);
  // const [statusList, setStatusList] = useState([]);
  // const [companyList, setCompanyList] = useState([]);

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pageTitle = localStorage.getItem('MenuName');

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [formInfo, setFormInfo] = useState({
    EmployeeId: null,
    OrganizationId: null,
    EmpStatusId: 1,
    BranchId: branchId,
  });

     const [printFilterData, setPrintFilterData] = useState({
          Employee: '',
          EmpStatus: "",
          Organization: '',
          Branch: "",
        });

  const columns = [
    {
      name: 'employeeCode',
      label: intl.formatMessage(messages.employeeId),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'vacName',
      label: intl.formatMessage(messages.vacationName),
    },
    {
      name: 'vacBalance',
      label: intl.formatMessage(messages.Balance),
    },
    {
      name: 'vacCost',
      label: intl.formatMessage(messages.cost),
      options: {
        customBodyRender: (value) => (value ? <pre>{value.toFixed(2)}</pre> : ''),
      },
    },
  ];

  const getFilterHighlights = () => {
    const highlights = [];

    // const organization = getAutoCompleteValue(
    //   organizationList,
    //   formInfo.OrganizationId
    // );
    // const employee = getAutoCompleteValue(employeeList, formInfo.EmployeeId);
    // const status = getAutoCompleteValue(statusList, formInfo.EmpStatusId);
    // const company = getAutoCompleteValue(companyList, formInfo.BranchId);

    if (printFilterData.Organization && printFilterData.Organization.length !== 0) {
    // if (organization) {
      highlights.push({
        label: intl.formatMessage(messages.Organization),
        value: printFilterData.Organization.name,
        // value: organization.name,
      });
    }

    if (printFilterData.Employee && printFilterData.Employee.length !== 0) {
    // if (employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: printFilterData.Employee.name,
        // value: employee.name,
      });
    }

    if (printFilterData.EmpStatus && printFilterData.EmpStatus.length !== 0) {
    // if (status) {
      highlights.push({
        label: intl.formatMessage(messages.status),
        value: printFilterData.EmpStatus.name,
        // value: status.name,
      });
    }

    if (printFilterData.Branch && printFilterData.Branch.length !== 0) {
    // if (company) {
      highlights.push({
        label: intl.formatMessage(messages.company),
        value: printFilterData.Branch.name,
        // value: company.name,
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

      // const employees = await GeneralListApis(locale).GetEmployeeList();
      // setEmployeeList(employees);

      // const status = await GeneralListApis(locale).GetEmpStatusList();
      // setStatusList(status);

      // const company = await GeneralListApis(locale).GetBranchList();
      // setCompanyList(company);

      // const organizations = await GeneralListApis(locale).GetDepartmentList();
      // setOrganizationList(organizations);

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
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <Grid container spacing={3}>
          <Grid item xs={12} md={11} lg={9} xl={7}>
            <Search
              setsearchData={setFormInfo}
              searchData={formInfo}
              notShowDate={true}
              setIsLoading={setIsLoading}
              company={formInfo.BranchId}
              setPrintFilterData={setPrintFilterData}
            />
          </Grid>

          <Grid item  xs={12} >
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

      <SimplifiedPayrollTable
        isLoading={isLoading}
        title=''
        filterHighlights={filterHighlights}
        data={tableData}
        columns={columns}
      />
    </PayRollLoaderInForms>
  );
}

VacationBalanceCostReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(VacationBalanceCostReport);
