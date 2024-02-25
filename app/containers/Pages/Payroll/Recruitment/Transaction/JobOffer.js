import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import { formateDate } from '../../helpers';
import api from '../api/JobOfferData';
import messages from '../messages';

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
      options: {
        customBodyRender: (value) => <pre>{formateDate(value)}</pre>,
      },
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
      url: '/app/Pages/Recruitment/JobOfferCreate',
    },
    edit: {
      url: '/app/Pages/Recruitment/JobOfferEdit',
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

JobOffer.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobOffer);
