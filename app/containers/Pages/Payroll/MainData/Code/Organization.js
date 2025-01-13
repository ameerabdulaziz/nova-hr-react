import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import OrganizationData from '../api/OrganizationData';
import messages from '../messages';
import { getCheckboxIcon } from '../../helpers';
import SITEMAP from '../../../../App/routes/sitemap';

function Organization({ intl }) {
  const title = localStorage.getItem('MenuName');
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useSelector((state) => state.language.locale);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const data = await OrganizationData(locale).GetList();

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
      name: 'parentName',
      label: intl.formatMessage(messages.parentNameOrg),
    },
    {
      name: 'empName',
      label: intl.formatMessage(messages.empName),
    },
    {
      name: 'manPower',
      label: intl.formatMessage(messages.manPower),
    },
    {
      name: 'isDisclaimer',
      label: intl.formatMessage(messages.IsDisclaimer),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
  ];

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
      await OrganizationData().Delete(id);

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
      url: SITEMAP.mainData.OrganizationCreate.route,
    },
    edit: {
      url: SITEMAP.mainData.OrganizationEdit.route,
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

Organization.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Organization);
