import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../../Component/PayrollTable';
import payrollMessages from '../../../messages';
import api from '../../api/OvertimeHoursRequestData';
import messages from '../../messages';

function OvertimeHoursRequest(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const authState = useSelector((state) => state.authReducer);
  const { isHR } = authState.user;
  const Title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).GetList();
      setTableData(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRow = async (id) => {
    setIsLoading(true);

    try {
      await api(locale).delete(id);

      fetchTableData();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
      },
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'trxDate',
      label: intl.formatMessage(messages.subscriptionDate),
    },

    {
      name: 'startTime',
      label: intl.formatMessage(messages.startTime),
      options: {
        customBodyRender: (value) => (value ? <pre>{format(new Date(value), 'hh:mm:ss aa')}</pre> : ''),
      },
    },

    {
      name: 'endTime',
      label: intl.formatMessage(payrollMessages.endTime),
      options: {
        customBodyRender: (value) => (value ? <pre>{format(new Date(value), 'hh:mm:ss aa')}</pre> : ''),
      },
    },

    {
      name: 'minutesCount',
      label: intl.formatMessage(messages.totalNumberOfMinutes),
    },

    {
      name: 'notes',
      label: intl.formatMessage(payrollMessages.notes),
      options: {
        customBodyRender: (value) => (value ? <div style={{ maxWidth: '200px', width: 'max-content' }}>{value}</div> : '')
      },
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

  const actions = {
    add: {
      url: '/app/Pages/Att/OvertimeHoursRequestCreate',
    },
    edit: {
      url: '/app/Pages/Att/OvertimeHoursRequestEdit',
      disabled: isHR ? false : (row) => row[8] !== null,
    },
    delete: {
      api: deleteRow,
      disabled: isHR ? false : (row) => row[8] !== null,
    },
  };

  return (
    <PayrollTable
      isLoading={isLoading}
      showLoader
      title={Title}
      data={tableData}
      columns={columns}
      actions={actions}
    />
  );
}

OvertimeHoursRequest.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OvertimeHoursRequest);
