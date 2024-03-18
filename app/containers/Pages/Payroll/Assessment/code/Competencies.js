import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import api from '../api/CompetenciesData';
import messages from '../messages';

function Competencies(props) {
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

      toast.success(notif.saved);

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
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },

    {
      name: 'enName',
      label: intl.formatMessage(messages.competencyName),
      options: {
        noWrap: true,
      },
    },

    {
      name: 'arName',
      label: intl.formatMessage(messages.arCompetencyName),
      options: {
        noWrap: true,
      },
    },

    {
      name: 'categoryName',
      label: intl.formatMessage(messages.category),
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/Assessment/CompetenciesCreate',
    },
    edit: {
      url: '/app/Pages/Assessment/CompetenciesEdit',
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

Competencies.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Competencies);
