import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import GeneralListApis from '../../api/GeneralListApis';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import Search from '../../Component/Search';
import { formateDate, getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import ApiData from '../api/InsuranceReportApisData';
import messages from '../messages';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function StopInsuranceReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const deleteList = [
    { id: null, name: intl.formatMessage(messages.all) },
    { id: true, name: intl.formatMessage(payrollMessages.delete) },
    { id: false, name: intl.formatMessage(messages.notDelete) },
  ];

  const [data, setData] = useState([]);

  const pageTitle = localStorage.getItem('MenuName');

  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    OrganizationId: '',
    EmpStatusId: 1,
    BranchId: branchId,
    isDeleted: null,
  });

  const [dateError, setDateError] = useState({});

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      searchData.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, searchData.EmployeeId);
    const status = getAutoCompleteValue(statusList, searchData.EmpStatusId);
    const company = getAutoCompleteValue(companyList, searchData.BranchId);
    const isDeleted = getAutoCompleteValue(deleteList, searchData.isDeleted);

    if (organization) {
      highlights.push({
        label: intl.formatMessage(messages.organizationName),
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
        label: intl.formatMessage(payrollMessages.status),
        value: status.name,
      });
    }

    if (company) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: company.name,
      });
    }

    if (searchData.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(searchData.FromDate),
      });
    }

    if (searchData.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(searchData.ToDate),
      });
    }

    if (searchData.isDeleted !== null) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.delete),
        value: isDeleted.name,
      });
    }

    setFilterHighlights(highlights);
  };

  const onSearchBtnClick = async () => {
    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);

      const formData = {
        FromDate: formateDate(searchData.FromDate),
        ToDate: formateDate(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmpStatusId: searchData.EmpStatusId,
        IsDeleted: searchData.isDeleted,
      };

      const dataApi = await ApiData(locale).GetStopInsuranceReport(formData);
      setData(dataApi);

      getFilterHighlights();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onIsDeleteAutoCompleteChange = (value) => {
    setSearchData((prev) => ({
      ...prev,
      isDeleted: value !== null ? value.id : null,
    }));
  };

  const columns = [
    {
      name: 'id',
      options: {
        display: false,
        print: false,
      },
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.orgName),
    },

    {
      name: 'employeeCode',
      label: intl.formatMessage(messages.EmpCode),
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'insEndDate',
      label: intl.formatMessage(messages.InsuranceEndDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.InsuranceEndDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: 'insReason',
      label: intl.formatMessage(messages.InsuranceReasone),
      options: {
        noWrap: true,
      },
    },
  ];


  const openMonthDateWithCompanyChangeFun = async (BranchId,EmployeeId) => {

    let OpenMonthData 

    try
    {
      if(!EmployeeId)
      {
         OpenMonthData = await GeneralListApis(locale).getOpenMonth( BranchId,0);
      }
      else
      {
         OpenMonthData = await GeneralListApis(locale).getOpenMonth( 0,EmployeeId);
      }

      
      setSearchData((prev)=>({
        ...prev,
        FromDate: OpenMonthData ? OpenMonthData.fromDateAtt : null,
        ToDate: OpenMonthData ? OpenMonthData.todateAtt : null,
      }))
    }
    catch(err)
    {}

  }


  useEffect(()=>{
    if(searchData.BranchId !== "" && searchData.EmployeeId === "")
    {      
      openMonthDateWithCompanyChangeFun(searchData.BranchId)
    }

    if(searchData.BranchId === "" && searchData.EmployeeId !== "")
    {
      openMonthDateWithCompanyChangeFun(0, searchData.EmployeeId)
    }

    if(searchData.BranchId === "" && searchData.EmployeeId === "")
    {
      setSearchData((prev)=>({
        ...prev,
        FromDate: null,
        ToDate: null,
      }))
    }

  },[searchData.BranchId, searchData.EmployeeId])

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={8} xl={7}>
            <Search
              setsearchData={setSearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              DateError={dateError}
              setDateError={setDateError}
              company={searchData.BranchId}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={2.5} xl={1.7}>
            <Autocomplete
              options={deleteList}
              value={getAutoCompleteValue(deleteList, searchData.isDeleted)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(_, value) => onIsDeleteAutoCompleteChange(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage(payrollMessages.delete)}
                />
              )}
            />
          </Grid>

          <Grid xs={12} item>
            <Button
              variant='contained'
              color='primary'
              onClick={onSearchBtnClick}
            >
              {intl.formatMessage(payrollMessages.search)}
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>

      <SimplifiedPayrollTable
        title=''
        data={data}
        filterHighlights={filterHighlights}
        columns={columns}
      />
    </PayRollLoaderInForms>
  );
}

StopInsuranceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(StopInsuranceReport);
