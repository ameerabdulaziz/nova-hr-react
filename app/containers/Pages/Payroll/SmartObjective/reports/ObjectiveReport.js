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
import GeneralListApis from '../../api/GeneralListApis';
import { getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/ObjectiveReportData';
import messages from '../messages';
import Search from '../../Component/Search';

function ObjectiveReport(props) {
  const { intl } = props;
  const title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [yearList, setYearList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [formInfo, setFormInfo] = useState({
    BranchId: branchId,
    EmployeeId: '',
    yearId: null,
    monthId: null,
    organizationId: null,
  });

  const getFilterHighlights = () => {
    const highlights = [];

    const employee = getAutoCompleteValue(employeeList, formInfo.EmployeeId);
    const year = getAutoCompleteValue(yearList, formInfo.yearId);
    const month = getAutoCompleteValue(monthsList, formInfo.monthId);
    const department = getAutoCompleteValue(
      departmentList,
      formInfo.organizationId
    );

    if (year) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.year),
        value: year.name,
      });
    }

    if (month) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.month),
        value: month.name,
      });
    }

    if (employee) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.employeeName),
        value: employee.name,
      });
    }

    if (department) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: department.name,
      });
    }

    setFilterHighlights(highlights);
  };

  const fetchTableData = async () => {
    setIsLoading(true);

    try {

      const formData = {
        EmployeeId: formInfo.EmployeeId,
        yearId: formInfo.yearId,
        monthId: formInfo.monthId,
        organizationId: formInfo.organizationId,
      }

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const response = await api(locale).getList(formData);
      setTableData(response);

      getFilterHighlights();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const departments = await GeneralListApis(locale).GetDepartmentList();
      setDepartmentList(departments);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthsList(months);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

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
      name: 'employeeName',
      label: intl.formatMessage(payrollMessages.employeeName),
    },

    {
      name: 'sum',
      label: intl.formatMessage(messages.averageExecutionOfObjective),
    },

    {
      name: 'sumWeight',
      label: intl.formatMessage(messages.totalWeight),
    },

    {
      name: 'totalWeightScore',
      label: intl.formatMessage(messages.totalScore),
    },
  ];

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    fetchTableData();
  };

  const openMonthDateWithCompanyChangeFun = async (BranchId,EmployeeId) => {

    let OpenMonthData 

    try
    {
      if(yearList.length !== 0 && monthsList.length !== 0)
      {
        if(!EmployeeId)
        {
          OpenMonthData = await GeneralListApis(locale).getOpenMonth( BranchId,0);
        }
        else
        {
          OpenMonthData = await GeneralListApis(locale).getOpenMonth( 0,EmployeeId);
        }

          setFormInfo((prev) => ({
            ...prev,
            yearId : OpenMonthData ? OpenMonthData.yearId : null,
            monthId: OpenMonthData ? OpenMonthData.monthId : null
          }));
      }
    }
    catch(err)
    {}

  }


  useEffect(()=>{
    if((formInfo.BranchId || formInfo.BranchId !== "") && (!formInfo.EmployeeId ||formInfo.EmployeeId === ""))
    {      
      openMonthDateWithCompanyChangeFun(formInfo.BranchId)
    }

    if((!formInfo.BranchId || formInfo.BranchId === "") && (formInfo.EmployeeId  || formInfo.EmployeeId !== ""))
    {
      openMonthDateWithCompanyChangeFun(0, formInfo.EmployeeId)
    }

    if((!formInfo.BranchId || formInfo.BranchId === "") && (!formInfo.EmployeeId || formInfo.EmployeeId === ""))
    {
      setFormInfo((prev) => ({
        ...prev,
        yearId : null,
        monthId: null
      }));
    }

  },[formInfo.BranchId, formInfo.EmployeeId,yearList,monthsList])

  return (
    <PayRollLoader isLoading={isLoading}>
      <form onSubmit={onFormSubmit}>
        <PapperBlock whiteBg icon='border_color' title={title} desc=''>
          <Grid container spacing={2} mt={0}>
            <Grid item xs={12}>
              <Search
                setsearchData={setFormInfo}
                searchData={formInfo}
                setIsLoading={setIsLoading}
                notShowDate
                notShowStatus
                company={formInfo.BranchId}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={yearList}
                value={getAutoCompleteValue(yearList, formInfo.yearId)}
                onChange={(_, value) => onAutoCompleteChange(value, 'yearId')}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id + option.name}>
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(payrollMessages.year)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={monthsList}
                value={getAutoCompleteValue(monthsList, formInfo.monthId)}
                onChange={(_, value) => onAutoCompleteChange(value, 'monthId')}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id + option.name}>
                    {option.name}
                  </li>
                )}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(payrollMessages.month)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button type='submit' variant='contained' color='primary'>
                    {intl.formatMessage(payrollMessages.search)}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </PapperBlock>
      </form>

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

ObjectiveReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ObjectiveReport);
