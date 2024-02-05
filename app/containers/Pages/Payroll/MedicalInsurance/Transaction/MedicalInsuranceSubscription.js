import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import { formateDate } from '../../helpers';
import api from '../api/MedicalInsuranceSubscriptionData';
import messages from '../messages';

function MedicalInsuranceSubscription(props) {
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
        print: false,
        display: false,
      },
    },

    {
      name: 'employeeId',
      label: intl.formatMessage(messages.employeeId),
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'subDate',
      label: intl.formatMessage(messages.subscriptionDate),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },

    {
      name: 'subMonthlyFees',
      label: intl.formatMessage(messages.employeeShare),
    },

    {
      name: 'cmpFees',
      label: intl.formatMessage(messages.companyShare),
    },
    {
      name: 'updUser',
      label: intl.formatMessage(messages.lastUpdateBy),
    },
    {
      name: 'updDate',
      label: intl.formatMessage(messages.lastUpdate),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/Minsurance/MedicalInsuranceSubscriptionCreate',
    },
    edit: {
      url: '/app/Pages/Minsurance/MedicalInsuranceSubscriptionEdit',
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
      data={tableData}
      columns={columns}
      actions={actions}
    />
  );
}

MedicalInsuranceSubscription.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(MedicalInsuranceSubscription);
