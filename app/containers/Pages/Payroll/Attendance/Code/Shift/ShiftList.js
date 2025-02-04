import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../../Component/SimplifiedPayrollTable';
import { getCheckboxIcon } from '../../../helpers';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/ShiftData';
import messages from '../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';

function ShiftList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [data, setData] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);

    try {
      const dataApi = await ApiData(locale).GetList();
      setData(dataApi);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteRow(id) {
    setIsLoading(true);

    try {
      await ApiData(locale).Delete(id);

      toast.success(notif.saved);
      fetchData();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
      },
    },
    {
      name: 'arName',
      label: intl.formatMessage(Payrollmessages.arName),
    },

    {
      name: 'enName',
      label: intl.formatMessage(Payrollmessages.enName),
    },

    {
      name: 'startTime',
      label: intl.formatMessage(messages.startTime),
    },
    {
      name: 'endTime',
      label: intl.formatMessage(messages.endTime),
    },
    {
      name: 'shft2d',
      label: intl.formatMessage(messages.shft2d),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'shft10Hours',
      label: intl.formatMessage(messages.shft10Hours),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'hoursFromEmp',
      label: intl.formatMessage(messages.hoursFromEmp),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: 'webHide',
      label: intl.formatMessage(messages.webHide),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.attendance.ShiftCreate.route,
    },
    edit: {
      url: SITEMAP.attendance.ShiftEdit.route,
    },
    delete: {
      callback: deleteRow,
    },
  };

  return (
    <SimplifiedPayrollTable
      isLoading={isLoading}
      showLoader
      title={Title}
      data={data}
      columns={columns}
      actions={actions}
    />
  );
}

ShiftList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ShiftList);
