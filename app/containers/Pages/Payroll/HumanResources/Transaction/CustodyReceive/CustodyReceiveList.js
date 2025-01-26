import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../../Component/PayrollTable';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/CustodyTrxData';
import messages from '../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';

function CustodyReceiveList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      const dataApi = await ApiData(locale).GetList(2);
      setdata(dataApi);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteRow(id) {
    try {
      setIsLoading(true);
      await ApiData(locale).Delete(id);

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
      label: intl.formatMessage(Payrollmessages.id),
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: 'date',
      label: intl.formatMessage(Payrollmessages.date),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'custodyName',
      label: intl.formatMessage(messages.custodyName),
    },
    {
      name: 'notes',
      label: intl.formatMessage(Payrollmessages.notes),
      options: {
        customBodyRender: (value) => (value ? <div style={{ maxWidth: '200px', width: 'max-content' }}>{value}</div> : '')
      },
    },
    {
      name: 'itemSerial',
      label: intl.formatMessage(messages.itemSerial),
    },
    {
      name: 'custCount',
      label: intl.formatMessage(Payrollmessages.count),
    },
    {
      name: 'CustodyPrice',
      label: intl.formatMessage(Payrollmessages.price),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.humanResources.CustodyReceiveCreate.route,
    },
    edit: {
      url: SITEMAP.humanResources.CustodyReceiveEdit.route,
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
      data={data}
      columns={columns}
      actions={actions}
    />
  );
}

CustodyReceiveList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CustodyReceiveList);
