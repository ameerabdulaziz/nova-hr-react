import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import ContractData from '../api/ContractData';
import messages from '../messages';
import payrollMessages from '../../messages';
import SITEMAP from '../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

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
      options: getDateColumnOptions(
        intl.formatMessage(messages.startDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: 'toDate',
      label: intl.formatMessage(messages.endDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.endDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
  ];

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
      await ContractData().Delete(id);

      toast.success(notif.saved);
      getdata();
    } catch (er) {
      setIsLoading(false);
    }
  };

  const actions = {
    add: {
      url: SITEMAP.projectManagement.ContractCreate.route,
    },
    edit: {
      url: SITEMAP.projectManagement.ContractEdit.route,
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

Contract.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Contract);
