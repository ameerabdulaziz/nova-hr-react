import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
// import api from '../api/SwapShiftTrxData';
import messages from '../messages';

function SwapShiftTrx(props) {
  const { intl } = props;
  const title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      // const dataApi = await api(locale).getList();
      // setTableData(dataApi);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteRow(id) {
    try {
      setIsLoading(true);

      // await api(locale).delete(id);

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
      name: 'date',
      label: intl.formatMessage(messages.AttendanceDate),
    },

    {
      name: 'returnDate',
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
      name: 'swapShift',
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
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'supervisor',
      label: intl.formatMessage(messages.supervisor),
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/Att/SwapShiftTrxCreate',
    },
    delete: {
      api: deleteRow,
    },
  };

  return (
    <PayrollTable
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
