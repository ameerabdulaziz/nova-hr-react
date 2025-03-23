import { Button } from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SITEMAP from '../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import { getCheckboxIcon } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/TestTemplateData';
import messages from '../messages';

function TestTemplate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const pageTitle = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).getList();
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
      name: 'name',
      label: intl.formatMessage(payrollMessages.name),
    },

    {
      name: 'trainingName',
      label: intl.formatMessage(messages.trainingName),
    },

    {
      name: 'fromDate',
      label: intl.formatMessage(payrollMessages.fromdate),
      options: getDateColumnOptions(
        intl.formatMessage(payrollMessages.fromdate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'toDate',
      label: intl.formatMessage(payrollMessages.todate),
      options: getDateColumnOptions(
        intl.formatMessage(payrollMessages.todate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'isClosed',
      label: intl.formatMessage(messages.isClose),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
  ];

  const onCloseBtnClick = async (row) => {
    setIsLoading(true);

    try {
      await api(locale).toggleTestStatus(row.id, !row.isClosed);

      toast.success(notif.saved);

      fetchTableData();
    } catch (err) {
      setIsLoading(false);
    }
  };

  const actions = {
    add: {
      url: SITEMAP.training.TestTemplateCreate.route,
    },
    edit: {
      url: SITEMAP.training.TestTemplateEdit.route,
    },
    delete: {
      callback: deleteRow,
    },
    extraActions: (row) => (
      <Button
        onClick={() => onCloseBtnClick(row)}
        size='small'
        variant='outlined'
      >
        {intl.formatMessage(
          row.isClosed ? messages.open : payrollMessages.close
        )}
      </Button>
    ),
  };

  return (
    <SimplifiedPayrollTable
      isLoading={isLoading}
      showLoader
      title={pageTitle}
      data={tableData}
      columns={columns}
      actions={actions}
    />
  );
}

TestTemplate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TestTemplate);
