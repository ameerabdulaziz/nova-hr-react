import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import attendanceMessages from '../../Attendance/messages';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import payrollMessages from '../../messages';
import api from '../api/TrainingCenterData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function TrainingCenter(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);

  const pageTitle = localStorage.getItem('MenuName');

  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const data = await api(locale).getList();

      setDataTable(data);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(payrollMessages.id),
      options: {
        display: false,
        print: false,
        download: false,
      },
    },

    {
      name: 'arName',
      label: intl.formatMessage(payrollMessages.arName),
    },

    {
      name: 'enName',
      label: intl.formatMessage(payrollMessages.enName),
    },

    {
      name: 'phone',
      label: intl.formatMessage(messages.phone),
    },

    {
      name: 'address',
      label: intl.formatMessage(attendanceMessages.Address),
      options: {
        noWrap: true,
      },
    },
  ];

  const deleteRow = async (id) => {
    setIsLoading(true);

    try {
      await api(locale).delete(id);

      toast.success(notif.saved);
      fetchNeededData();
    } catch (err) {
      setIsLoading(false);
    }
  };

  const actions = {
    add: {
      url: SITEMAP.humanResources.TrainingCenterListCreate.route,
    },
    edit: {
      url: SITEMAP.humanResources.TrainingCenterListEdit.route,
    },
    delete: {
      callback: deleteRow,
    },
  };

  return (
    <SimplifiedPayrollTable
      isLoading={isLoading}
      showLoader
      title={pageTitle}
      data={dataTable}
      columns={columns}
      actions={actions}
    />
  );
}

TrainingCenter.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TrainingCenter);
