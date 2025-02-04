import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import payrollMessages from '../../messages';
import api from '../api/HiringRequestEvaluationData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function HiringRequestEvaluation(props) {
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

  useEffect(() => {
    fetchTableData();
  }, []);

  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(messages.id),
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },

    {
      name: 'candidateName',
      label: intl.formatMessage(messages.applicantName),
    },

    {
      name: 'hiringRequestDate',
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
      label: intl.formatMessage(messages.position),
    },

    {
      name: 'reportToName',
      label: intl.formatMessage(messages.reportingTo),
    },

    {
      name: 'startDate',
      label: intl.formatMessage(messages.startDate),
      options: getDateColumnOptions(
        intl.formatMessage(payrollMessages.startDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'status',
      label: intl.formatMessage(messages.status),
    },
  ];

  const actions = {
    edit: {
      url: SITEMAP.recruitment.HiringRequestEvaluationEdit.route,
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

HiringRequestEvaluation.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HiringRequestEvaluation);
