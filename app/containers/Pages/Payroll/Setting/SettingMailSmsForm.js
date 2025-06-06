import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../Component/SimplifiedPayrollTable';
import api from './api/SettingMailSmsFormData';
import messages from './messages';
import SITEMAP from '../../../App/routes/sitemap';

function SettingMailSmsForm(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).GetList();
      setTableData(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRow = async (id) => {
    setIsLoading(true);

    try {
      await api(locale).delete(id);

      fetchTableData();
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const columns = [
    {
      name: 'id',
      label: '',
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },

    {
      name: 'subject',
      label: intl.formatMessage(messages.subject),
    },

    {
      name: 'formTypeName',
      label: intl.formatMessage(messages.formTypeName),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.setting.SettingMailSmsFormCreate.route,
    },
    edit: {
      url: SITEMAP.setting.SettingMailSmsFormEdit.route,
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
      data={tableData}
      columns={columns}
      actions={actions}
    />
  );
}

SettingMailSmsForm.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SettingMailSmsForm);
