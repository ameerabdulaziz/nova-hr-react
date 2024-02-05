import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import { formateDate, getCheckboxIcon } from '../../helpers';
import EmployeeDataReportData from '../api/EmployeeDataReportData';
import messages from '../messages';

function EmployeeDataReport({ intl }) {
  const title = localStorage.getItem('MenuName');
  const locale = useSelector((state) => state.language.locale);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const data = await EmployeeDataReportData(locale).GetList();

      setDataTable(data);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const columns = [
    {
      name: 'id',
      label: 'id',
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: 'employeeId',
      label: intl.formatMessage(messages.EmpCode),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'birthDate',
      label: intl.formatMessage(messages.birthDate),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.Department),
    },
    {
      name: 'mainSalary',
      label: intl.formatMessage(messages.InsuranceSalary),
    },
    {
      name: 'variableSalary',
      label: intl.formatMessage(messages.BasicSalary),
    },
    {
      name: 'jobName',
      label: intl.formatMessage(messages.Job),
    },
    {
      name: 'gender',
      label: intl.formatMessage(messages.Gendar),
    },
    {
      name: 'hiringDate',
      label: intl.formatMessage(messages.hiringDate),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: 'qualification',
      label: intl.formatMessage(messages.Qualification),
    },
    {
      name: 'address',
      label: intl.formatMessage(messages.Address),
    },
    {
      name: 'isBnkTransfer',
      label: intl.formatMessage(messages.BankTransfere),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'insured',
      label: intl.formatMessage(messages.Insured),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'taxable',
      label: intl.formatMessage(messages.TaxableEmployee),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'postOverTime',
      label: intl.formatMessage(messages.postOverTime),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'religion',
      label: intl.formatMessage(messages.Religion),
    },
    {
      name: 'government',
      label: intl.formatMessage(messages.Governorate),
    },
    {
      name: 'city',
      label: intl.formatMessage(messages.City),
    },
    {
      name: 'nationality',
      label: intl.formatMessage(messages.Nationality),
    },
    {
      name: 'status',
      label: intl.formatMessage(messages.StopEmployee),
    },
    {
      name: 'bank',
      label: intl.formatMessage(messages.BankName),
    },
    {
      name: 'insuJob',
      label: intl.formatMessage(messages.InsuranceJob),
    },
    {
      name: 'medInsuCat',
      label: intl.formatMessage(messages.MedicalInsuranceCategory),
    },
    {
      name: 'qualificationDate',
      label: intl.formatMessage(messages.GraduationDate),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: 'idCardNumber',
      label: intl.formatMessage(messages.IDCardNumber),
    },
    {
      name: 'jobType',
      label: intl.formatMessage(messages.JobType),
    },
    {
      name: 'bookNo',
      label: intl.formatMessage(messages.BookNo),
    },
  ];

  return (
    <PayrollTable
      title={title}
      isLoading={isLoading}
      showLoader
      data={dataTable}
      columns={columns}
    />
  );
}

EmployeeDataReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeDataReport);
