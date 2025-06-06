import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import payrollMessages from '../../messages';
import api from '../api/JobDataBankData';
import RowDropdown from '../components/JobDataBank/RowDropdown';
import messages from '../messages';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function JobDataBank(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    fetchTableData();
  }, []);

  const onSaveBtnClick = async (id) => {
    setIsLoading(true);

    try {
      await api(locale).save(id);
    } catch (error) {
      //
    } finally {
      fetchTableData();
    }
  };

  const columns = [
    {
      name: 'empName',
      label: intl.formatMessage(messages.candidateName),
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
    },

    {
      name: 'appDate',
      label: intl.formatMessage(messages.applicationDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.applicationDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'dataBnkJobName',
      label: intl.formatMessage(messages.jobName),
    },

    {
      name: '',
      label: '',
      options: {
        filter: false,
        print: false,
        customBodyRender: (_, tableMeta) => {
          const row = tableData[tableMeta.rowIndex];

          if (!row) {
            return '';
          }

          return (
            <RowDropdown
              row={row}
              tableMeta={tableMeta}
              onSaveBtnClick={onSaveBtnClick}
            />
          );
        },
      },
    },
  ];

  return (
    <SimplifiedPayrollTable
      isLoading={isLoading}
      showLoader
      title={Title}
      data={tableData}
      columns={columns}
    />
  );
}

JobDataBank.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobDataBank);
