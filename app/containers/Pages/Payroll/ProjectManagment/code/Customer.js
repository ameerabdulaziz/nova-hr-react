import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import CustomerData from '../api/CustomerData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function Customer({ intl }) {
  const title = localStorage.getItem('MenuName');
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useSelector((state) => state.language.locale);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const data = await CustomerData(locale).GetList();

      setDataTable(data);
    } catch (er) {
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
      name: 'customerCode',
      label: intl.formatMessage(messages.customerCode),
    },
    {
      name: 'enName',
      label: intl.formatMessage(messages.customerName),
      options: {
        display: locale === 'en',
      },
    },
    {
      name: 'arName',
      label: intl.formatMessage(messages.customerName),
      options: {
        display: locale === 'ar',
      },
    },
    {
      name: 'accMgrName',
      label: intl.formatMessage(messages.accountManagerName),
    },
    {
      name: 'accMgrTelepnone',
      label: intl.formatMessage(messages.accountManagerMobileNumber),
    },
  ];

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
      await CustomerData().Delete(id);

      toast.success(notif.saved);
      getdata();
    } catch (er) {
      setIsLoading(false);
    }
  };

  const actions = {
    add: {
      url: SITEMAP.projectManagement.CustomerCreate.route,
    },
    edit: {
      url: SITEMAP.projectManagement.CustomerEdit.route,
    },
    delete: {
      callback: deleteRow,
    },
  };

  return (
    <SimplifiedPayrollTable
      isLoading={isLoading}
      showLoader
      title={title}
      data={dataTable}
      columns={columns}
      actions={actions}
    />
  );
}

Customer.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Customer);
