import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../Component/PayrollTable';
import Payrollmessages from '../messages';
import ApiData from './api/WorkFlowData';
import messages from './messages';

function WorkFlowList(props) {
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
        print: false,
      },
    },
    {
      name: 'arName',
      label: intl.formatMessage(Payrollmessages.arName),
    },
    {
      name: 'enName',
      label: intl.formatMessage(Payrollmessages.enName),
    },

    {
      name: 'documentName',
      label: intl.formatMessage(messages.documentName),
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/WF/WorkFlowCreate',
    },
    edit: {
      url: '/app/Pages/WF/WorkFlowEdit',
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

WorkFlowList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(WorkFlowList);
