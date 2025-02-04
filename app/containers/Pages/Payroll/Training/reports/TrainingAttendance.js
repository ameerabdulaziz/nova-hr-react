import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import GeneralListApis from '../../api/GeneralListApis';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import { getAutoCompleteValue, getCheckboxIcon } from '../../helpers';
import payrollMessages from '../../messages';
import API from '../api/TrainingAttendanceData';
import messages from '../messages';
import Search from "../../Component/Search";

function TrainingAttendance(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [trainingList, setTrainingList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [DateError, setDateError] = useState({});
  const pageTitle = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    BranchId: branchId,
    EmployeeId: "",
    trainingId: null,
    OrganizationId: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const INIT_COLUMN = [
    {
      name: 'organizationName',
      label: intl.formatMessage(payrollMessages.organizationName),
    },
    {
      name: 'employeeCode',
      label: intl.formatMessage(payrollMessages.employeeCode),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
  ];

  const [columns, setColumns] = useState([...INIT_COLUMN]);

  const fetchTableData = async () => {
    try {
      setIsLoading(true);

      const params = {
        organizationId: formInfo.OrganizationId,
        employeeId: formInfo.EmployeeId,
      };

      const dataApi = await API(locale).getList(formInfo.trainingId, params);

      const highlights = [];

      const employee = getAutoCompleteValue(employeeList, formInfo.EmployeeId);
      const training = getAutoCompleteValue(trainingList, formInfo.trainingId);
      const organization = getAutoCompleteValue(
        organizationList,
        formInfo.OrganizationId
      );

      if (employee) {
        highlights.push({
          label: intl.formatMessage(messages.employeeName),
          value: employee.name,
        });
      }

      if (training) {
        highlights.push({
          label: intl.formatMessage(messages.trainingName),
          value: training.name,
        });
      }

      if (organization) {
        highlights.push({
          label: intl.formatMessage(messages.organizationName),
          value: organization.name,
        });
      }

      setFilterHighlights(highlights);

      if (dataApi?.length > 0) {
        const clonedColumn = [...INIT_COLUMN];

        const {
          employeeName,
          employeeCode,
          organizationName,
          employeeId,
          organizationId,
          ...reset
        } = dataApi[0];

        Object.keys(reset).forEach((key) => {
          clonedColumn.push({
            name: key,
            label: key,
            options: {
              customBodyRender: (value) => getCheckboxIcon(value),
            },
          });
        });

        setColumns(clonedColumn);
      }

      setTableData(dataApi);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const training = await GeneralListApis(locale).GetTrainingList();
      setTrainingList(training);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    fetchTableData();
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={1} alignItems='center'>
            <Grid item xs={12} md={12} lg={8}>
              <Search
                setsearchData={setFormInfo}
                searchData={formInfo}
                setIsLoading={setIsLoading}
                DateError={DateError}
                setDateError={setDateError}
                company={formInfo.BranchId}
                notShowStatus={true}
                notShowDate={true}
              ></Search>
            </Grid>
            
            <Grid item xs={12}></Grid>

            <Grid item xs={12} md={3} lg={4}>
              <Autocomplete
                options={trainingList}
                value={getAutoCompleteValue(trainingList, formInfo.trainingId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'trainingId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.trainingName)}
                  />
                )}
              />
            </Grid>

            <Grid item>
              <Button variant='contained' type='submit' color='primary'>
                {intl.formatMessage(payrollMessages.search)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>

      <SimplifiedPayrollTable
        isLoading={isLoading}
        title=''
        data={tableData}
        columns={columns}
        filterHighlights={filterHighlights}
      />
    </PayRollLoaderInForms>
  );
}

TrainingAttendance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TrainingAttendance);
