import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../../Component/PayrollTable';
import { formateDate } from '../../../helpers';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/RewardTransData';
import messages from '../../messages';

function RewardTransList(props) {
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
      name: 'date',
      label: intl.formatMessage(messages.date),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'superEmployeeName',
      label: intl.formatMessage(messages.superEmployeeName),
    },
    {
      name: 'elementName',
      label: intl.formatMessage(messages.elementName),
    },
    {
      name: 'rewardsName',
      label: intl.formatMessage(messages.rewardsName),
    },
    {
      name: 'value',
      label: intl.formatMessage(messages.value),
    },

    {
      name: 'note',
      label: intl.formatMessage(messages.note),
    },
    {
      name: 'step',
      label: intl.formatMessage(Payrollmessages.step),
    },
    {
      name: 'status',
      label: intl.formatMessage(Payrollmessages.status),
    },
    {
      name: 'approvedEmp',
      label: intl.formatMessage(Payrollmessages.approvedEmp),
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/HR/RewardTransCreate',
    },
    edit: {
      url: '/app/Pages/HR/RewardTransEdit',
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

RewardTransList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(RewardTransList);
