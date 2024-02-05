import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../../Component/PayrollTable';
import { formateDate } from '../../../helpers';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/CustodyTrxData';
import messages from '../../messages';

function CustodyDeliveryList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      const dataApi = await ApiData(locale).GetList(1);
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
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
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
      url: '/app/Pages/HR/CustodyDeliveryCreate',
    },
    edit: {
      url: '/app/Pages/HR/CustodyDeliveryEdit',
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

CustodyDeliveryList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CustodyDeliveryList);
