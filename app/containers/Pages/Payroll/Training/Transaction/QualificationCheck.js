import {
  Autocomplete, Button, Grid, Stack, TextField
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import GeneralListApis from '../../api/GeneralListApis';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import payrollMessages from '../../messages';
import api from '../api/QualificationCheckData';
import messages from '../messages';

function QualificationCheck(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const pageTitle = localStorage.getItem('MenuName') ?? '';

  const [organizationList, setOrganizationList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [functionsList, setFunctionsList] = useState([]);
  const typeList = [
    { id: 0, name: intl.formatMessage(payrollMessages.all) },
    { id: 1, name: intl.formatMessage(messages.courseExpiration) },
    { id: 2, name: intl.formatMessage(messages.notQualified) },
  ];

  const [isLoading, setIsLoading] = useState(true);

  const [tableData, setTableData] = useState([]);

  const [formInfo, setFormInfo] = useState({
    functionId: null,
    courseId: null,
    organizationId: null,
    expirationDays: '',
    type: 0,
  });

  const fetchTableData = async () => {
    setIsLoading(true);

    const params = {
      ...formInfo,
      expirationDays: formInfo.expirationDays ? formInfo.expirationDays : null,
    };

    try {
      const response = await api(locale).getQualificationCheck(params);
      setTableData(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const functions = await GeneralListApis(locale).TrFunctions();
      setFunctionsList(functions);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);

      const courses = await GeneralListApis(locale).GetCourseList();
      setCourseList(courses);

      fetchTableData();
    } catch (error) {
      //
    } finally {
      //
    }
  };

  useEffect(() => {
    fetchNeededData();
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
      name: 'employeeName',
      label: intl.formatMessage(payrollMessages.employeeName),
    },

    {
      name: 'organizationName',
      label: intl.formatMessage(payrollMessages.organizationName),
    },

    {
      name: 'courseName',
      label: intl.formatMessage(messages.courseName),
    },

    {
      name: 'type',
      label: intl.formatMessage(payrollMessages.type),
    },

    {
      name: 'expirationDate',
      label: intl.formatMessage(messages.expirationDate),
    },

    {
      name: 'functionName',
      label: intl.formatMessage(messages.function),
    },
  ];

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
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
                options={organizationList}
                value={getAutoCompleteValue(organizationList, formInfo.organizationId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'organizationId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(payrollMessages.organizationName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={courseList}
                value={getAutoCompleteValue(courseList, formInfo.courseId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'courseId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.courseName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={typeList}
                value={getAutoCompleteValue(typeList, formInfo.type)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'type')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(payrollMessages.type)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name='expirationDays'
                value={formInfo.expirationDays}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.expirationDays)}
                fullWidth
                variant='outlined'
                autoComplete='off'
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

      <PayrollTable
        isLoading={isLoading}
        title={pageTitle}
        data={tableData}
        columns={columns}
      />
    </PayRollLoader>
  );
}

QualificationCheck.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(QualificationCheck);
