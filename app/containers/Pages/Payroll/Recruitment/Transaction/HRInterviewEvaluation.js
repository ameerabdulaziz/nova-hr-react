import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import payrollMessages from '../../messages';
import api from '../api/HRInterviewEvaluationData';
import RowDropdown from '../components/HRInterviewEvaluation/RowDropdown';
import messages from '../messages';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function HRInterviewEvaluation(props) {
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

  const onSendRejectMailBtnClick = async (id) => {
    setIsLoading(true);

    try {
      await api(locale).SendRejectionMail(id);
      toast.success(notif.sent);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);

      await fetchTableData();
    }
  };

  const columns = [
    {
      name: 'empName',
      label: intl.formatMessage(messages.applicantName),
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
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
    },

    {
      name: 'hrStatus',
      label: intl.formatMessage(messages.hrStatus),
    },

    {
      name: 'techStatus',
      label: intl.formatMessage(messages.technicalStatus),
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
              onSendRejectMailBtnClick={onSendRejectMailBtnClick}
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

HRInterviewEvaluation.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HRInterviewEvaluation);
