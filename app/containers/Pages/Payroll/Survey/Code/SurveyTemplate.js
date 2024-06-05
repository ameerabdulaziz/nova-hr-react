import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import payrollMessages from '../../messages';
import api from '../api/SurveyTemplateData';
import messages from '../messages';

function SurveyTemplate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const pageTitle = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).getList();
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

      toast.success(notif.saved);

      fetchTableData();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
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
      name: 'name',
      label: intl.formatMessage(payrollMessages.name),
    },

    {
      name: 'surveyType',
      label: intl.formatMessage(messages.surveyType),
    },

    {
      name: 'fromDate',
      label: intl.formatMessage(payrollMessages.fromdate),
    },

    {
      name: 'toDate',
      label: intl.formatMessage(payrollMessages.todate),
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/Survey/SurveyTemplateCreate',
    },
    edit: {
      url: '/app/Pages/Survey/SurveyTemplateEdit',
    },
    delete: {
      api: deleteRow,
    },
  };

  return (
    <PayrollTable
      isLoading={isLoading}
      showLoader
      title={pageTitle}
      data={tableData}
      columns={columns}
      actions={actions}
    />

  );
}

SurveyTemplate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SurveyTemplate);
