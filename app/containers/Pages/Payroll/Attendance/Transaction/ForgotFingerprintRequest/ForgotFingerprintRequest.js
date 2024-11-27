
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../../Component/PayrollTable';
import payrollMessages from '../../../messages';
import ApiData from '../../api/ForgotFingerprintRequestData';
import messages from '../../messages';

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
    },
    {
      name: 'signDateTime',
      label: "signDateTime",
    //   label: intl.formatMessage(messages.missionName),
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
      url: '/app/Pages/Att/ForgotFingerprintRequestCreate',
    },
    edit: {
      url: '/app/Pages/Att/ForgotFingerprintRequestEdit',
    },
    delete: {
      api: deleteRow,
    },
  };


  return (
    <>
      <PayrollTable
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
