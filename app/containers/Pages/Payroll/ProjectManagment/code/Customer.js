import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import CustomerData from '../api/CustomerData';
import messages from '../messages';
import { getCheckboxIcon } from '../../helpers';

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
    ...(locale === "en" && {
        name: 'enName',
        label: intl.formatMessage(messages.customerName),
    }),

    ...(locale === "ar" && {
        name: 'arName',
        label: intl.formatMessage(messages.customerName),
    })
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
      //
    } finally {
      setIsLoading(false);
    }
  };

  const actions = {
    add: {
      url: '/app/Pages/ProjectManagment/CustomerCreate',
    },
    edit: {
      url: '/app/Pages/ProjectManagment/CustomerEdit',
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
