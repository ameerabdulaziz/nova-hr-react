import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/EmployeeObjectiveData';
import messages from '../messages';

function EmployeeObjective(props) {
  const { intl } = props;
  const title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const authState = useSelector((state) => state.authReducer);
  const company = useSelector((state) => state.authReducer.companyInfo);
  const { isHR, isManagement } = authState.user;

  const isNormalEmployee = !isHR && !isManagement;

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [yearList, setYearList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);
  const [formInfo, setFormInfo] = useState({
    EmployeeId: '',
    OrganizationId: '',
    EmpStatusId: 1,

    yearId: null,
    monthId: null,
  });

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).getList(formInfo);
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
      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthsList(months);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
      await api(locale).delete(id);

      toast.success(notif.saved);

      fetchTableData();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

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
      name: 'objectiveDescription',
      label: intl.formatMessage(messages.objective),
    },

    {
      name: 'measurementTool',
      label: intl.formatMessage(messages.measurementTool),
    },

    {
      name: 'dueDate',
      label: intl.formatMessage(messages.dueDate),
    },

    {
      name: 'execution',
      label: intl.formatMessage(messages.achieved),
    },

    {
      name: 'weight',
      label: intl.formatMessage(messages.weight),
    },

    {
      name: 'weightedScore',
      label: intl.formatMessage(messages.weightedScore),
    },

    {
      name: 'evalNotes',
      label: intl.formatMessage(messages.comment),
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
      name: 'staffComment',
      label: intl.formatMessage(messages.employeeComment),
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

  const actions = {
    add: {
      url: '/app/Pages/SmartObjective/EmployeeObjectiveCreate',
      disabled: isNormalEmployee,
    },
    edit: {
      url: '/app/Pages/SmartObjective/EmployeeObjectiveEdit',
    },
    delete: {
      api: deleteRow,
    },
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    fetchTableData();
  };

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
                requireEmployee
                notShowStatus
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
                    required
                    label={intl.formatMessage(payrollMessages.year)}
                  />
                )}
              />
            </Grid>

            {company?.monthlySmartObjective && (
              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={monthsList}
                  value={getAutoCompleteValue(monthsList, formInfo.monthId)}
                  onChange={(_, value) => onAutoCompleteChange(value, 'monthId')
                  }
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
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
            )}

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
        columns={columns}
        actions={actions}
      />
    </PayRollLoader>
  );
}

EmployeeObjective.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeObjective);
