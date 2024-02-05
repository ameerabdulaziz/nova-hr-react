import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/EmployeeMedicalBenefitsData';
import messages from '../messages';

function EmployeeMedicalBenefits(props) {
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
      label: intl.formatMessage(messages.serial),
      options: {
        filter: false,
      },
    },

    {
      name: 'trxDate',
      label: intl.formatMessage(payrollMessages.date),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },

    {
      name: 'employeeId',
      label: intl.formatMessage(payrollMessages.employeeId),
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'medItemName',
      label: intl.formatMessage(payrollMessages.name),
    },

    {
      name: 'medCentName',
      label: intl.formatMessage(messages.medicalCenterName),
    },

    {
      name: 'totalvalue',
      label: intl.formatMessage(messages.totalValue),
    },
    {
      name: 'employeeShare',
      label: intl.formatMessage(messages.employeeShare),
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/Minsurance/EmployeeMedicalBenefitsCreate',
    },
    edit: {
      url: '/app/Pages/Minsurance/EmployeeMedicalBenefitsEdit',
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

EmployeeMedicalBenefits.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeMedicalBenefits);
