import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import AsTemplatePrint from '../components/AsTemplate/AsTemplatePrint';
import payrollMessages from "../../messages";
import SITEMAP from '../../../../App/routes/sitemap';
import api from '../api/AsCategoryData';

function AsCategory(props) {
  const { intl } = props;
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [printId, setPrintId] = useState();

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api().GetList();
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
      await api().Delete(id);
      toast.success(notif.saved);
      fetchTableData();
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const columns = [
    {
        name: 'id',
        label: intl.formatMessage(payrollMessages.code),
        type: 'static',
        initialValue: '',
        hidden: false,
      },
  
      {
        name: 'arName',
        label: intl.formatMessage(payrollMessages.arName),
        type: 'text',
        width: 'auto',
        initialValue: '',
        hidden: false,
      },
      {
        name: 'enName',
        label: intl.formatMessage(payrollMessages.enName),
        type: 'text',
        initialValue: '',
        width: 'auto',
        hidden: false,
      },
  ];

  const actions = {
    add: {
      url: SITEMAP.assessment.AsCategoryCreate.route,
    },
    edit: {
      url:SITEMAP.assessment.AsCategoryEdit.route,
    },
    delete: {
      callback: deleteRow,
    },
  };

  return (
    <>
      <SimplifiedPayrollTable
        isLoading={isLoading}
        showLoader
        title={Title}
        data={tableData}
        columns={columns}
        actions={actions}
      />

      <AsTemplatePrint intl={intl} printId={printId} setPrintId={setPrintId} />
    </>
  );
}

AsCategory.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AsCategory);

