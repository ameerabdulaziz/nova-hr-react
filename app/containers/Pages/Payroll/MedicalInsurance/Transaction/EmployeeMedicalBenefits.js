import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SITEMAP from '../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
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
      options: getDateColumnOptions(
        intl.formatMessage(payrollMessages.date),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
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
      url: SITEMAP.medicalInsurance.EmployeeMedicalBenefitsCreate.route,
    },
    edit: {
      url: SITEMAP.medicalInsurance.EmployeeMedicalBenefitsEdit.route,
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

EmployeeMedicalBenefits.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeMedicalBenefits);
