import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import { getCheckboxIcon } from '../../helpers';
import VacationsTypesData from '../api/VacationsTypesData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function VacationsTypes({ intl }) {
  const stringMenu = localStorage.getItem('Menu');
  const menu = stringMenu ? JSON.parse(stringMenu) : null;
  const menuName = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);

  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const data = await VacationsTypesData(locale).GetList();

      setDataTable(data);
    } catch (error) {
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
      label: 'id',
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
      name: 'deducted',
      label: intl.formatMessage(messages.deducted),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'hasBalance',
      label: intl.formatMessage(messages.hasBalance),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'isYearBalance',
      label: intl.formatMessage(messages.isYearBalance),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'app',
      label: intl.formatMessage(messages.shortcut),
    },
    {
      name: 'halfDay',
      label: intl.formatMessage(messages.halfDay),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
  ];

  const deleteRow = async (id) => {
    setIsLoading(true);

    try {
      await VacationsTypesData().Delete(id);

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
      url: SITEMAP.vacation.VacationsTypesCreate.route,
    },
    edit: {
      url: SITEMAP.vacation.VacationsTypesEdit.route,
    },
    delete: {
      api: deleteRow,
    },
  };

  return (
    <>
      <PayrollTable
        isLoading={isLoading}
        showLoader
        title={menuName}
        data={dataTable}
        columns={columns}
        actions={actions}
      />
    </>
  );
}

VacationsTypes.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(VacationsTypes);
