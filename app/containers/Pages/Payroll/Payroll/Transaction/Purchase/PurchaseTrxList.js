import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../../Component/SimplifiedPayrollTable';
import { formateDate } from '../../../helpers';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/PurchaseTrxData';
import SITEMAP from '../../../../../App/routes/sitemap';

function PurchaseTrxList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);

    try {
      const dataApi = await ApiData(locale).GetList();
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
      options: {
        filter: false,
      },
    },
    {
      name: 'transDate',
      label: intl.formatMessage(Payrollmessages.date),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: 'monthName',
      label: intl.formatMessage(Payrollmessages.month),
    },
    {
      name: 'yearName',
      label: intl.formatMessage(Payrollmessages.year),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(Payrollmessages.employeeName),
    },

    {
      name: 'totalvalue',
      label: intl.formatMessage(Payrollmessages.value),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.payroll.PurchaseTrxCreate.route,
    },
    edit: {
      url: SITEMAP.payroll.PurchaseTrxEdit.route,
    },
    delete: {
      callback: deleteRow,
    },
  };

  return (
    <SimplifiedPayrollTable
      isLoading={isLoading}
      showLoader
      title={Title}
      data={data}
      columns={columns}
      actions={actions}
    />
  );
}

PurchaseTrxList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PurchaseTrxList);
