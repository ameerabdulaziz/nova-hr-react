import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import { formateDate } from '../../helpers';
import Payrollmessages from '../../messages';
import ReplaceAnnualLeaveBalanceData from '../api/ReplaceAnnualLeaveBalanceData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function ReplaceAnnualLeaveBalance({ intl }) {
  const menuName = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const data = await ReplaceAnnualLeaveBalanceData(locale).GetList();

      setDataTable(data);
    } catch (error) {
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
      name: 'id',
      label: intl.formatMessage(messages.TrxSerial),
    },
    {
      name: 'empName',
      label: intl.formatMessage(messages.EmployeeName),
    },
    {
      name: 'trxDate',
      label: intl.formatMessage(Payrollmessages.date),
      options: getDateColumnOptions(
        intl.formatMessage(messages.transactionDate),
        {
          minDateLabel: intl.formatMessage(Payrollmessages.minDate),
          maxDateLabel: intl.formatMessage(Payrollmessages.maxDate),
        }
      ),
    },
    {
      name: 'payTemplateName',
      label: intl.formatMessage(messages.Template),
    },
    {
      name: 'elementName',
      label: intl.formatMessage(messages.Element),
    },
    {
      name: 'yearName',
      label: intl.formatMessage(messages.year),
    },
    {
      name: 'monthName',
      label: intl.formatMessage(messages.Month),
    },
    {
      name: 'vacBalRep',
      label: intl.formatMessage(messages.BalanceToReplace),
    },
  ];

  const deleteRow = async (id) => {
    setIsLoading(true);

    try {
      ReplaceAnnualLeaveBalanceData().Delete(id);

      toast.success(notif.saved);
      getdata();
    } catch (err) {
      setIsLoading(false);
    }
  };

  const actions = {
    add: {
      url: SITEMAP.vacation.ReplaceAnnualLeaveBalanceCreate.route,
    },
    edit: {
      url: SITEMAP.vacation.ReplaceAnnualLeaveBalanceEdit.route,
    },
    delete: {
      callback: deleteRow,
    },
  };

  return (
    <>
      <SimplifiedPayrollTable
        isLoading={isLoading}
        showLoader
        title={menuName}
        data={dataTable}
        columns={columns}
        actions={actions}
      />
    </>
  );
}

ReplaceAnnualLeaveBalance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ReplaceAnnualLeaveBalance);
