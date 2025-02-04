import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import { formateDate } from '../../helpers';
import api from '../api/MedicalInsuranceSubscriptionData';
import messages from '../messages';
import payrollMessages from '../../messages';
import SITEMAP from '../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

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
      label: intl.formatMessage(payrollMessages.employeeId),
      options: {
        filter: false,
        display: false,
        print: false,
        download: false,
      },
    },

    {
      name: 'employeeCode',
      label: intl.formatMessage(payrollMessages.employeeCode),
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'subDate',
      label: intl.formatMessage(messages.subscriptionDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.subscriptionDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
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
      options: getDateColumnOptions(
        intl.formatMessage(messages.lastUpdate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.medicalInsurance.MedicalInsuranceSubscriptionCreate.route,
    },
    edit: {
      url: SITEMAP.medicalInsurance.MedicalInsuranceSubscriptionEdit.route,
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

MedicalInsuranceSubscription.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(MedicalInsuranceSubscription);
