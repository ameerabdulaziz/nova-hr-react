import { List } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../../Component/PayrollTable';
import payrollMessages from '../../../messages';
import WFExecutionList from '../../../WorkFlow/WFExecutionList';
import api from '../../api/OvertimeHoursRequestData';
import messages from '../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';

function OvertimeHoursRequest(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const authState = useSelector((state) => state.authReducer);
  const { isHR } = authState.user;
  const Title = localStorage.getItem('MenuName');

  const [requestId, setRequestId] = useState(null);
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

  const onExecutionBtnClick = async (id) => {
    setRequestId(id);
  };

  const onWFExecutionPopupClose = () => {
    setRequestId(null);
  };

  const actions = {
    add: {
      url: SITEMAP.attendance.OvertimeHoursRequestCreate.route,
    },
    edit: {
      url: SITEMAP.attendance.OvertimeHoursRequestEdit.route,
      // disabled edit action is not HR and status is null
      disabled: isHR ? false : (row) => row.status !== null,
    },
    delete: {
      api: deleteRow,
      // disabled delete action is not HR and status is null
      disabled: isHR ? false : (row) => row.status !== null,
    },
    extraActions: (row) => (
      <Tooltip
        placement='bottom'
        title={intl.formatMessage(payrollMessages.details)}
      >
        <span>
          <IconButton onClick={() => onExecutionBtnClick(row.id)}>
            <List sx={{ fontSize: '1.2rem' }} />
          </IconButton>
        </span>
      </Tooltip>
    ),
  };

  return (
    <>
      <WFExecutionList
        handleClose={onWFExecutionPopupClose}
        open={Boolean(requestId)}
        RequestId={requestId}
        DocumentId={6}
      />

      <PayrollTable
        isLoading={isLoading}
        showLoader
        title={Title}
        data={tableData}
        columns={columns}
        actions={actions}
      />
    </>
  );
}

OvertimeHoursRequest.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OvertimeHoursRequest);
