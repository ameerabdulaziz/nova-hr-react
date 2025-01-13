import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import ApiData from '../../api/UniformTrxData';
import messages from '../../messages';

import PayrollTable from '../../../Component/PayrollTable';
import { formateDate } from '../../../helpers';
import Payrollmessages from '../../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';

function UniformDeliveryList(props) {
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
        filter: true,
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'uniformName',
      label: intl.formatMessage(messages.uniformName),
    },
    {
      name: 'notes',
      label: intl.formatMessage(Payrollmessages.notes),
      options: {
        noWrap: true,
      },
    },
    {
      name: 'quantity',
      label: intl.formatMessage(Payrollmessages.count),
    },
    {
      name: 'uniformPrice',
      label: intl.formatMessage(Payrollmessages.price),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.humanResources.UniformDeliveryCreate.route,
    },
    edit: {
      url: SITEMAP.humanResources.UniformDeliveryEdit.route,
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

UniformDeliveryList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(UniformDeliveryList);
