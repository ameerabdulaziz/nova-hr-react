import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import api from '../api/SwapShiftTrxData';
import messages from '../messages';
import payrollMessages from '../../messages';
import SITEMAP from '../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function SwapShiftTrx(props) {
  const { intl } = props;
  const title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      const dataApi = await api(locale).getList();
      setTableData(dataApi);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteRow(id) {
    try {
      setIsLoading(true);

      await api(locale).delete(id);

      toast.success(notif.saved);

      fetchData();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
      name: 'attendanceDate',
      label: intl.formatMessage(messages.attendanceDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.attendanceDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
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
      name: 'swapShiftName',
      label: intl.formatMessage(messages.swapShift),
    },

    {
      name: 'swapStartTime',
      label: intl.formatMessage(messages.startTime),
    },

    {
      name: 'swapEndTime',
      label: intl.formatMessage(messages.endTime),
    },

    {
      name: 'approvedEmp',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'status',
      label: intl.formatMessage(messages.status),
    },

    {
      name: 'step',
      label: intl.formatMessage(messages.step),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.attendance.SwapShiftTrxCreate.route,
    },
    delete: {
      api: deleteRow,
    },
  };

  return (
    <SimplifiedPayrollTable
      isLoading={isLoading}
      showLoader
      title={title}
      data={tableData}
      columns={columns}
      actions={actions}
    />
  );
}

SwapShiftTrx.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SwapShiftTrx);
