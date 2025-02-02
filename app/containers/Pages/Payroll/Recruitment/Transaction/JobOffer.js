import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import payrollMessages from '../../messages';
import api from '../api/JobOfferData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function JobOffer(props) {
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
      name: 'jobOfferDate',
      label: intl.formatMessage(messages.offerDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.offerDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'departmentName',
      label: intl.formatMessage(messages.department),
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.recruitment.JobOfferCreate.route,
    },
    edit: {
      url: SITEMAP.recruitment.JobOfferEdit.route,
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

JobOffer.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobOffer);
