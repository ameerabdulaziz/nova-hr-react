
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../../Component/SimplifiedPayrollTable';
import payrollMessages from '../../../messages';
import ApiData from '../../api/ForgotFingerprintRequestData';
import messages from '../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../../Component/PayrollTable/utils.payroll-table';

function ForgotFingerprintRequest(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [data, setData] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);



  async function fetchData() {
    setIsLoading(true);

    try {
      const dataApi = await ApiData(locale).GetList();
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
      await ApiData(locale).Delete(id);

      toast.success(notif.saved);
      fetchData();
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);



  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(payrollMessages.trxId),
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: 'employeeCode',
      label: intl.formatMessage(payrollMessages.employeeCode),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(payrollMessages.employeeName),
    },
    {
      name: 'trxDate',
      label: intl.formatMessage(payrollMessages.date),
      options: getDateColumnOptions(
        intl.formatMessage(payrollMessages.date),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: 'signDateTime',
      label: intl.formatMessage(messages.signDateTime),
    },

    {
      name: 'notes',
      label: intl.formatMessage(payrollMessages.notes),
      options: {
        customBodyRender: (value) => (value ? <div style={{ maxWidth: '200px', width: 'max-content' }}>{value}</div> : '')
      },
    },
    {
      name: 'status',
      label: intl.formatMessage(payrollMessages.status),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.attendance.ForgotFingerprintRequestCreate.route,
    },
    edit: {
      url: SITEMAP.attendance.ForgotFingerprintRequestEdit.route,
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
        title={Title}
        data={data}
        columns={columns}
        actions={actions}
      />
    </>
  );
}

ForgotFingerprintRequest.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ForgotFingerprintRequest);
