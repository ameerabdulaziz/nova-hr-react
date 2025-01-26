import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import StageData from '../api/StageData';
import messages from '../messages';
import { getCheckboxIcon } from '../../helpers';
import SITEMAP from '../../../../App/routes/sitemap';

function Stage({ intl }) {
  const title = localStorage.getItem('MenuName');
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useSelector((state) => state.language.locale);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const data = await StageData(locale).GetList();

      setDataTable(data);
    } catch (er) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const columns = [
    {
      name: 'stageCode',
      label: intl.formatMessage(messages.stageCode),
    },
    {
        name: 'enName',
        label: intl.formatMessage(messages.stageNameEN),
    },
    {
      name: 'arName',
      label: intl.formatMessage(messages.stageNameAr),
    },
  ];

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
      await StageData().Delete(id);

      toast.success(notif.saved);
      getdata();
    } catch (er) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const actions = {
    add: {
      url: SITEMAP.projectManagement.StageCreate.route,
    },
    edit: {
      url: SITEMAP.projectManagement.StageEdit.route,
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
      data={dataTable}
      columns={columns}
      actions={actions}
    />
  );
}

Stage.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Stage);
