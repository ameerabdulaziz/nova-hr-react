import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import api from '../api/HrEmployeeDocumentTrxData';
import messages from '../messages';

function HrEmployeeDocumentTrx(props) {
  const { intl } = props;
  const title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      const dataApi = await api(locale).getList();
      setData(dataApi);
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
      name: 'date',
      label: intl.formatMessage(messages.date),
    },

    {
      name: 'returnDate',
      label: intl.formatMessage(messages.returnDate),
    },

    {
      name: 'documentName',
      label: intl.formatMessage(messages.docName),
    },

    {
      name: 'status',
      label: intl.formatMessage(messages.status),
    },

    {
      name: 'notes',
      label: intl.formatMessage(messages.note),
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/HR/HrEmployeeDocumentTrxCreate',
    },
    edit: {
      url: '/app/Pages/HR/HrEmployeeDocumentTrxEdit',
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
      data={data}
      columns={columns}
      actions={actions}
    />
  );
}

HrEmployeeDocumentTrx.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HrEmployeeDocumentTrx);
