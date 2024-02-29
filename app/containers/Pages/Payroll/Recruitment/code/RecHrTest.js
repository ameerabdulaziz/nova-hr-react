import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import tableMessage from '../../../../../components/Tables/messages';
import PayrollTable from '../../Component/PayrollTable';
import payrollMessages from '../../messages';
import api from '../api/RecHrTestData';

function RecHrTest(props) {
  const { intl } = props;
  const title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTableData = async () => {
    try {
      const response = await api().GetList();
      setTableData(response);
    } catch (error) {
      console.log(error);
      //
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
      await api().delete(id);

      fetchTableData();
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
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },

    {
      name: 'arName',
      label: intl.formatMessage(payrollMessages.arName),
    },

    {
      name: 'enName',
      label: intl.formatMessage(payrollMessages.enName),
    },

    {
      name: 'arDesc',
      label: intl.formatMessage(tableMessage.arDesc),
    },

    {
      name: 'enDesc',
      label: intl.formatMessage(tableMessage.enDesc),
    },

    {
      name: 'finalGrad',
      label: intl.formatMessage(tableMessage.finalGrad),
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/Recruitment/RecHrTestCreate',
    },
    edit: {
      url: '/app/Pages/Recruitment/RecHrTestEdit',
    },
    delete: {
      api: deleteRow,
    },
  };

  return (
    <PayrollTable
      isLoading={isLoading}
      showLoader
      title={title}
      data={tableData}
      columns={columns}
      actions={actions}
    />
  );
}

RecHrTest.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(RecHrTest);
