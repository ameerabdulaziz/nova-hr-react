import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import { formateDate } from '../../helpers';
import api from '../api/StopInsuranceData';
import messages from '../messages';
import payrollMessages from '../../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function StopInsurance(props) {
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
      name: 'employeeId',
      label: intl.formatMessage(payrollMessages.employeeId),
      options: {
        filter: false,
        display: false,
        print: false,
        download: false,
      },
    },

    {
      name: 'employeeCode',
      label: intl.formatMessage(payrollMessages.employeeCode),
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'insEndDate',
      label: intl.formatMessage(messages.endDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },

    {
      name: 'insReason',
      label: intl.formatMessage(messages.reason),
    },
    {
      name: 'notes',
      label: intl.formatMessage(messages.notes),
      options: {
        noWrap: true,
      },
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.socialInsurance.StopInsuranceCreate.route,
    },
    edit: {
      url: SITEMAP.socialInsurance.StopInsuranceEdit.route,
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

StopInsurance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(StopInsurance);
