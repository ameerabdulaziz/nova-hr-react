import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../../Component/PayrollTable';
import Payrollmessages from '../../../messages';
import RegisterLocationData from '../../api/RegisterLocationData';
import messages from '../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';

function RegisterLocation({ intl }) {
  const Title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const data = await RegisterLocationData(locale).GetList();

      setDataTable(data);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(Payrollmessages.id),
      options: {
        display: false,
      },
    },
    {
      name: 'arName',
      label: intl.formatMessage(Payrollmessages.arName),
    },
    {
      name: 'enName',
      label: intl.formatMessage(Payrollmessages.enName),
    },
    {
      name: 'address',
      label: intl.formatMessage(messages.Address),
      options: {
        noWrap: true,
      },
    },
    {
      name: 'locLat',
      label: intl.formatMessage(messages.Latitude),
    },
    {
      name: 'locLong',
      label: intl.formatMessage(messages.longitude),
    },
    {
      name: 'distance',
      label: intl.formatMessage(messages.Distance),
    },
  ];

  const deleteRow = async (id) => {
    setIsLoading(true);

    try {
      await RegisterLocationData().Delete(id);

      toast.success(notif.saved);
      getdata();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const actions = {
    add: {
      url: SITEMAP.attendance.RegisterLocationCreate.route,
    },
    edit: {
      url: SITEMAP.attendance.RegisterLocationEdit.route,
    },
    delete: {
      api: deleteRow,
    },
  };

  return (
    <PayrollTable
      isLoading={isLoading}
      showLoader
      title={Title}
      data={dataTable}
      columns={columns}
      actions={actions}
    />
  );
}

RegisterLocation.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(RegisterLocation);
