import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../../Component/PayrollTable';
import { formateDate } from '../../../helpers';
import ApiData from '../../api/TransferRequestData';
import messages from '../../messages';
import Payrollmessages from "../../../messages";

function AttentionList(props) {
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
        display: false,
        print: false,
      },
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
      name: 'job',
      label: intl.formatMessage(Payrollmessages.job),
    },
    {
      name: 'transfereDate',
      label: intl.formatMessage(messages.TransactionDate),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: 'organization',
      label: intl.formatMessage(messages.oldOrganization),
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.newOrganization),
    },
    {
      name: 'issueDate',
      label: intl.formatMessage(messages.decisionDate),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: 'flowStatus',
      label: intl.formatMessage(messages.Status),
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/HR/TransferRequestCreate',
    },
    edit: {
      url: '/app/Pages/HR/TransferRequestEdit',
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

AttentionList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AttentionList);
