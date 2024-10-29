import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import ContractData from '../api/ContractData';
import messages from '../messages';
import { formateDate } from '../../helpers';

function Contract({ intl }) {
  const title = localStorage.getItem('MenuName');
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useSelector((state) => state.language.locale);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const data = await ContractData(locale).GetList();

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
      name: 'customerName',
      label: intl.formatMessage(messages.customerName),
    },
    {
        name: 'contractCode',
        label: intl.formatMessage(messages.contractCode),
    },
    {
      name: 'fromDate',
      label: intl.formatMessage(messages.startDate),
      options: {
          filter: true,
          customBodyRender: (value) => (<pre>{formateDate(value)}</pre>),
        },
    },
    {
      name: 'toDate',
      label: intl.formatMessage(messages.endDate),
      options: {
        filter: true,
        customBodyRender: (value) => (<pre>{formateDate(value)}</pre>),
      },
    },
  ];

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
      await ContractData().Delete(id);

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
      url: '/app/Pages/ProjectManagment/ContractCreate',
    },
    edit: {
      url: '/app/Pages/ProjectManagment/ContractEdit',
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

Contract.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Contract);
