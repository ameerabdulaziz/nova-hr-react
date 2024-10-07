import { Button, Grid } from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import GeneralListApis from '../../api/GeneralListApis';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import { getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import messages from '../messages';
import API from '../api/LeavesBalanceData';

function LeavesBalance(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);

  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pageTitle = localStorage.getItem('MenuName');

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [formInfo, setFormInfo] = useState({
    EmployeeId: null,
    OrganizationId: null,
    EmpStatusId: 1,
    BranchId: '',
  });

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
      name: 'hiringDate',
      label: intl.formatMessage(messages.hiringDate),
    },
    {
      name: 'insuranceDate',
      label: intl.formatMessage(messages.insuranceDate),
    },
    {
      name: 'annOpen',
      label: intl.formatMessage(messages.annualBalance),
    },
    {
      name: 'postedBal',
      label: intl.formatMessage(messages.postedBalance),
    },
    {
      name: 'annCurrentBa',
      label: intl.formatMessage(messages.CurrentBalance),
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

  // used to generate columns depend on api data
  if(tableData.length !== 0)
    {
      debugger;
        Object.keys(tableData[0]).map((key)=>{
  
          let keyCheck =  columns.some(function(col) {
                return col.name === key;
              })
            if(!keyCheck)
            {
                columns.push({
                    name: key,
                    label: key,
                })
            }
        }) 
        
    }
  
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Search
              setsearchData={setFormInfo}
              searchData={formInfo}
              notShowDate={true}
              setIsLoading={setIsLoading}
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
        filterHighlights={filterHighlights}
        data={tableData}
        columns={columns}
      />
    </PayRollLoader>
  );
}

LeavesBalance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(LeavesBalance);
