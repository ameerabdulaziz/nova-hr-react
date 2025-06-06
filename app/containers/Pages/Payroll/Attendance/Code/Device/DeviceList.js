import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../../Component/SimplifiedPayrollTable';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/DeviceData';
import messages from '../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';

function DeviceList(props) {
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
      await fetchData();
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
      label: intl.formatMessage(Payrollmessages.id),
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
      name: 'ip',
      label: intl.formatMessage(messages.ip),
    },

    {
      name: 'port',
      label: intl.formatMessage(messages.port),
    },

    {
      name: 'serialNumber',
      label: intl.formatMessage(messages.serialNumber),
    },

    {
      name: 'transportaion',
      label: intl.formatMessage(messages.transportaion),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.attendance.DeviceCreate.route,
    },
    edit: {
      url: SITEMAP.attendance.DeviceEdit.route,
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

DeviceList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(DeviceList);
