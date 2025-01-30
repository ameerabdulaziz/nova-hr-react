import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import TimeSheetData from '../api/TimeSheetData';
import messages from '../messages';
import payrollMessages from '../../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function TimeSheet({ intl }) {
  const title = localStorage.getItem('MenuName');
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useSelector((state) => state.language.locale);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const data = await TimeSheetData(locale).GetList();

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
      name: 'employeeId',
      label: intl.formatMessage(payrollMessages.employeeCode),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(payrollMessages.employeeName),
    },
    {
      name: 'projectName',
      label: intl.formatMessage(messages.ProjectName),
    },
    {
      name: 'stageName',
      label: intl.formatMessage(messages.stageName),
    },
    {
      name: 'taskName',
      label: intl.formatMessage(messages.taskName),
    },
  ];

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
      await TimeSheetData().Delete(id);

      toast.success(notif.saved);
      getdata();
    } catch (er) {
      setIsLoading(false);
    }
  };

  const actions = {
    add: {
      url: SITEMAP.projectManagement.TimeSheetCreate.route,
    },
    edit: {
      url: SITEMAP.projectManagement.TimeSheetEdit.route,
    },
    delete: {
      callback: deleteRow,
    },
  };

  return (
    <SimplifiedPayrollTable
      isLoading={isLoading}
      showLoader
      title={title}
      data={dataTable}
      columns={columns}
      actions={actions}
    />
  );
}

TimeSheet.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TimeSheet);
