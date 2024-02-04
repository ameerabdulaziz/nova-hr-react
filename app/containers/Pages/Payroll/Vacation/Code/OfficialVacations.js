import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import { formateDate } from '../../helpers';
import Payrollmessages from '../../messages';
import OfficialVacationsData from '../api/OfficialVacationsData';
import messages from '../messages';

function OfficialVacations({ intl }) {
  const title = localStorage.getItem('MenuName');
  const locale = useSelector((state) => state.language.locale);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const data = await OfficialVacationsData(locale).GetList();
      setDataTable(data);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRow = async (id) => {
    setIsLoading(true);

    try {
      await OfficialVacationsData().Delete(id);

      toast.success(notif.saved);
      getdata();
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
      label: 'id',
      options: {
        display: false,
        print: false,
      },
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
      name: 'vacationDate',
      label: intl.formatMessage(Payrollmessages.date),
      options: {
        customBodyRender: (value) => formateDate(value),
      }
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/vac/OfficialVacationsCreate',
    },
    edit: {
      url: '/app/Pages/vac/OfficialVacationsEdit',
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

OfficialVacations.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OfficialVacations);
