import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../../Component/PayrollTable';
import payrollMessages from '../../../messages';
import api from '../../api/EmployeeInvestigationData';
import messages from '../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';

function EmployeeInvestigation(props) {
  const { intl } = props;

  const pageTitle = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);

  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const data = await api(locale).getList();

      setDataTable(data);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(payrollMessages.id),
      options: {
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'investigatorName',
      label: intl.formatMessage(messages.investigatorName),
    }, 
    {
      name: 'incident',
      label: intl.formatMessage(messages.incident),
    },
    {
      name: 'investigationResult',
      label: intl.formatMessage(messages.investigationResult),
    }, 
    {
      name: 'incidentDate',
      label: intl.formatMessage(messages.incidentDate),
    },
    {
      name: 'trxDate',
      label: intl.formatMessage(messages.date),
    },  
  ];

  const deleteRow = async (id) => {
    setIsLoading(true);

    try {
      await api(locale).delete(id);

      toast.success(notif.saved);
      fetchNeededData();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const actions = {
    add: {
      url: SITEMAP.humanResources.EmpInvestigationCreate.route,
    },
    edit: {
      url: SITEMAP.humanResources.EmpInvestigationEdit.route,
    },
    delete: {
      api: deleteRow,
    },
  };


  return (
    <PayrollTable
      isLoading={isLoading}
      showLoader
      title={pageTitle}
      data={dataTable}
      columns={columns}
      actions={actions}
    />
  );
}

EmployeeInvestigation.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeInvestigation);
