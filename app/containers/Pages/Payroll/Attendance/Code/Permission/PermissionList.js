import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../../Component/PayrollTable';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/PermissionData';
import messages from '../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';

function PermissionList(props) {
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
      options: {
        filter: false,
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
      name: 'elementName',
      label: intl.formatMessage(Payrollmessages.element),
    },

    {
      name: 'isDeducted',
      label: intl.formatMessage(messages.isDeducted),
    },

    {
      name: 'deductedValue',
      label: intl.formatMessage(messages.deductedValue),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.attendance.PermissionCreate.route,
    },
    edit: {
      url: SITEMAP.attendance.PermissionEdit.route,
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

PermissionList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PermissionList);
