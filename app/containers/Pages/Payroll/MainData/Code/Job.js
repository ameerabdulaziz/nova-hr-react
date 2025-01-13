import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import JobData from '../api/JobData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function Job({ intl }) {
  const Title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getdata = async () => {
    try {
      setIsLoading(true);
      const data = await JobData(locale).GetList();

      setDataTable(data);
    } catch (err) {
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
      name: 'id',
      label: intl.formatMessage(messages.id),
    },
    {
      name: 'arName',
      label: intl.formatMessage(messages.arName),
    },
    {
      name: 'enName',
      label: intl.formatMessage(messages.enName),
    },

    {
      name: 'jobTypeName',
      label: intl.formatMessage(messages.jobTypeName),
    },
    {
      name: 'jobNatureName',
      label: intl.formatMessage(messages.jobNatureName),
    },
    {
      name: 'parentName',
      label: intl.formatMessage(messages.parentName),
    },
  ];

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
      await JobData().Delete(id);

      toast.success(notif.saved);
      getdata();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const actions = {
    add: {
      url: SITEMAP.mainData.JobCreate.route,
    },
    edit: {
      url: SITEMAP.mainData.JobEdit.route,
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
      data={dataTable}
      columns={columns}
      actions={actions}
    />
  );
}

Job.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Job);
