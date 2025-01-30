import {
  Autocomplete, Button, Grid, Stack, TextField
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PapperBlock from '../../../../../components/PapperBlock/PapperBlock';
import GeneralListApis from '../../api/GeneralListApis';
import PayRollLoader from '../../Component/PayRollLoader';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import Search from '../../Component/Search';
import { formateDate, getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/FunctionsRequestData';
import messages from '../messages';

function FunctionsRequest(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const pageTitle = localStorage.getItem('MenuName') ?? '';

  const [employeeList, setEmployeeList] = useState([]);
  const [functionsList, setFunctionsList] = useState([]);
  const statusList = [
    { id: null, name: intl.formatMessage(payrollMessages.all) },
    { id: 1, name: intl.formatMessage(payrollMessages.pending) },
    { id: 2, name: intl.formatMessage(payrollMessages.approved) },
    { id: 3, name: intl.formatMessage(payrollMessages.rejected) },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [dateError, setDateError] = useState({});

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [searchInfo, setSearchInfo] = useState({
    FromDate: new Date(),
    ToDate: new Date(),
    EmployeeId: '',
    OrganizationId: '',
    EmpStatusId: 1,
  });
  const [formInfo, setFormInfo] = useState({
    functionId: null,
    statusId: null,
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const functions = await GeneralListApis(locale).TrFunctions();
      setFunctionsList(functions);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const fetchTableData = async () => {
    setIsLoading(true);

    const params = {
      fromDate: formateDate(searchInfo.FromDate),
      toDate: formateDate(searchInfo.ToDate),
      employeeId: searchInfo.EmployeeId,
      organizationId: searchInfo.OrganizationId,
      employeeStatusId: searchInfo.EmpStatusId,
      functionId: formInfo.functionId,
      statusId: formInfo.statusId,
    };

    try {
      const response = await api(locale).getList(params);
      setTableData(response);

      const highlights = [];

      const functionItem = getAutoCompleteValue(
        functionsList,
        formInfo.functionId
      );
      const status = getAutoCompleteValue(statusList, formInfo.statusId);
      const employee = getAutoCompleteValue(
        employeeList,
        searchInfo.EmployeeId
      );

      if (functionItem) {
        highlights.push({
          label: intl.formatMessage(messages.functionName),
          value: functionItem.name,
        });
      }

      if (status) {
        highlights.push({
          label: intl.formatMessage(messages.status),
          value: status.name,
        });
      }

      if (employee) {
        highlights.push({
          label: intl.formatMessage(messages.employeeName),
          value: employee.name,
        });
      }

      if (searchInfo.FromDate) {
        highlights.push({
          label: intl.formatMessage(payrollMessages.fromdate),
          value: formateDate(searchInfo.FromDate),
        });
      }

      if (searchInfo.ToDate) {
        highlights.push({
          label: intl.formatMessage(payrollMessages.todate),
          value: formateDate(searchInfo.ToDate),
        });
      }

      setFilterHighlights(highlights);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    fetchTableData();
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
      name: 'requestDate',
      label: intl.formatMessage(messages.requestDate),
    },

    {
      name: 'functionName',
      label: intl.formatMessage(messages.function),
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(payrollMessages.employeeName),
    },

    {
      name: 'organizationName',
      label: intl.formatMessage(payrollMessages.organizationName),
    },

    {
      name: 'step',
      label: intl.formatMessage(payrollMessages.step),
    },
    {
      name: 'status',
      label: intl.formatMessage(payrollMessages.status),
    },
    {
      name: 'approvedEmp',
      label: intl.formatMessage(payrollMessages.approvedEmp),
    },
  ];

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Search
                setsearchData={setSearchInfo}
                searchData={searchInfo}
                setIsLoading={setIsLoading}
                DateError={dateError}
                setDateError={setDateError}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={functionsList}
                value={getAutoCompleteValue(functionsList, formInfo.functionId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'functionId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.functions)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={statusList}
                value={getAutoCompleteValue(statusList, formInfo.statusId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'statusId')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(payrollMessages.status)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction='row' gap={2}>
                <Button variant='contained' color='secondary' type='submit'>
                  {intl.formatMessage(payrollMessages.search)}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>

      <SimplifiedPayrollTable
        isLoading={isLoading}
        title={pageTitle}
        data={tableData}
        columns={columns}
        filterHighlights={filterHighlights}
      />
    </PayRollLoader>
  );
}

FunctionsRequest.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(FunctionsRequest);
