import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../../Component/PayrollTable';
import { formateDate } from '../../../helpers';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/LoanTrxData';

function LoanTrxList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
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
      name: 'employeeCode',
      label: intl.formatMessage(Payrollmessages.employeeCode),
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
      url: '/app/Pages/Payroll/LoanTrxCreate',
    },
    edit: {
      url: '/app/Pages/Payroll/LoanTrxEdit',
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

LoanTrxList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(LoanTrxList);
