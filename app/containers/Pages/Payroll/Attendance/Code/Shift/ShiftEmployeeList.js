import { Autocomplete, Grid, TextField } from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PayRollLoader from '../../../Component/PayRollLoader';
import PayrollTable from '../../../Component/PayrollTable';
import GeneralListApis from '../../../api/GeneralListApis';
import { getCheckboxIcon } from '../../../helpers';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/ShiftEmployeeData';
import messages from '../../messages';

function ShiftEmployeeList(props) {
  const { intl } = props;
  const { state } = useLocation();

  const employeeID = state?.employeeId;

  const locale = useSelector((selectorState) => selectorState.language.locale);
  const [data, setData] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [EmployeeList, setEmployeeList] = useState([]);
  const [employee, setEmployee] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    if (!employee) {
      setData([]);
      return;
    }

    setIsLoading(true);

    try {
      const dataApi = await ApiData(locale).GetList(employee, '', '');
      setData(dataApi || []);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteRow(id) {
    setIsLoading(true);

    try {
      await ApiData(locale).Delete(id);

      toast.success(notif.saved);
      fetchData();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function GetLookup() {
    setIsLoading(true);

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      if (employeeID) {
        setEmployee(employeeID);
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetLookup();
  }, []);

  useEffect(() => {
    fetchData();
  }, [employee]);

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
      },
    },
    {
      name: 'shiftId',
      label: intl.formatMessage(messages.shiftId),
    },

    {
      name: 'shiftName',
      label: intl.formatMessage(messages.shiftName),
    },

    {
      name: 'startTime',
      label: intl.formatMessage(messages.startTime),
    },
    {
      name: 'endTime',
      label: intl.formatMessage(messages.endTime),
    },
    {
      name: 'fromDate',
      label: intl.formatMessage(Payrollmessages.fromdate),
    },
    {
      name: 'toDate',
      label: intl.formatMessage(Payrollmessages.todate),
    },
    {
      name: 'workHours',
      label: intl.formatMessage(messages.hours),
    },
    {
      name: 'vsaturday',
      label: intl.formatMessage(Payrollmessages.saturday),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'vsunday',
      label: intl.formatMessage(Payrollmessages.sunday),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'vmonday',
      label: intl.formatMessage(Payrollmessages.monday),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'vtuesday',
      label: intl.formatMessage(Payrollmessages.tuesday),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'vwednesday',
      label: intl.formatMessage(Payrollmessages.wednesday),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'vthursday',
      label: intl.formatMessage(Payrollmessages.thursday),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'vfriday',
      label: intl.formatMessage(Payrollmessages.friday),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
  ];

  const selectedEmployee = useMemo(() => {
    if (employee) {
      return EmployeeList.find((item) => item.id === employee);
    }
    return null;
  }, [employee, EmployeeList]);

  const actions = {
    add: {
      url: '/app/Pages/Att/ShiftEmployeeCreate',
      disabled: !employee,
      params: {
        employeeId: employee,
        employeeName: selectedEmployee?.name ?? null,
      },
    },
    edit: {
      url: '/app/Pages/Att/ShiftEmployeeEdit',
      params: {
        employeeId: employee,
        employeeName: selectedEmployee?.name ?? null,
      },
    },
    delete: {
      api: deleteRow,
    },
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Autocomplete
              id='employeeId'
              options={EmployeeList}
              value={
                employee
                  ? EmployeeList.find((item) => item.id === employee)
                  : null
              }
              isOptionEqualToValue={(option, value) => value.id === 0 || value.id === '' || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : '')}
              onChange={(event, value) => {
                setEmployee(value == null ? '' : value.id);
              }}
              renderInput={(params) => (
                <TextField
                  variant='outlined'
                  {...params}
                  name='employeeId'
                  required
                  label={intl.formatMessage(Payrollmessages.employeeName)}
                />
              )}
            />
          </Grid>
        </Grid>
      </PapperBlock>

      <PayrollTable
        isLoading={isLoading}
        title={Title}
        data={data}
        actions={actions}
        columns={columns}
      />
    </PayRollLoader>
  );
}

ShiftEmployeeList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ShiftEmployeeList);
