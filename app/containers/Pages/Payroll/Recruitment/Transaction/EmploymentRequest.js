import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import { formateDate } from '../../helpers';
import api from '../api/EmploymentRequestData';
import messages from '../messages';

function EmploymentRequest(props) {
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

  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(messages.id),
      options: {
        filter: false,
        print: false,
      },
    },

    {
      name: 'departmentName',
      label: intl.formatMessage(messages.department),
    },

    {
      name: 'insDate',
      label: intl.formatMessage(messages.insertDate),
      options: {
        customBodyRender: (value) => <pre>{formateDate(value)}</pre>,
      },
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.position),
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/Recruitment/EmploymentRequestCreate',
    },
    edit: {
      url: '/app/Pages/Recruitment/EmploymentRequestEdit',
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

EmploymentRequest.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmploymentRequest);
