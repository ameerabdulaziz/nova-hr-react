import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import tableMessage from '../../../../../components/Tables/messages';
import PayrollTable from '../../Component/PayrollTable';
import { getCheckboxIcon } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/RecEvaluationData';

function RecEvaluation(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTableData = async () => {
    try {
      const response = await api(locale).GetList();
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
      await api(locale).delete(id);

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
      name: 'elFinGrad',
      label: intl.formatMessage(tableMessage.finalGrad),
    },

    {
      name: 'elPercent',
      label: intl.formatMessage(tableMessage.elPercent),
    },

    {
      name: 'jobName',
      label: intl.formatMessage(tableMessage.elJob),
    },

    {
      name: 'isHr',
      label: intl.formatMessage(tableMessage.viewHR),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },

    {
      name: 'isManger',
      label: intl.formatMessage(tableMessage.viewManager),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/Recruitment/RecEvaluationCreate',
    },
    edit: {
      url: '/app/Pages/Recruitment/RecEvaluationEdit',
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

RecEvaluation.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(RecEvaluation);
