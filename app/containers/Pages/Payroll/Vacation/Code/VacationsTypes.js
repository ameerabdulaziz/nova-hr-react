import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import { getCheckboxIcon } from '../../helpers';
import VacationsTypesData from '../api/VacationsTypesData';
import messages from '../messages';

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
      url: '/app/Pages/vac/VacationsTypesCreate',
    },
    edit: {
      url: '/app/Pages/vac/VacationsTypesEdit',
    },
    delete: {
      api: deleteRow,
    },
  };

  return (
    <>
      <Helmet>
        <title>{menuName}</title>
        <meta name='description' content={menu?.description} />
        <meta property='og:title' content={menuName} />
        <meta property='og:description' content={menu?.description} />
        <meta property='twitter:title' content={menuName} />
        <meta property='twitter:description' content={menu?.description} />
      </Helmet>

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
