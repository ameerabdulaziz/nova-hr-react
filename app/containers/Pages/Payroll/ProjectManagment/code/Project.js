import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import ProjectData from '../api/ProjectData';
import messages from '../messages';
import payrollMessages from '../../messages';
import SITEMAP from '../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function Project({ intl }) {
  const title = localStorage.getItem('MenuName');
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useSelector((state) => state.language.locale);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const data = await ProjectData(locale).GetList();

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
      name: 'projectCode',
      label: intl.formatMessage(messages.ProjectCode),
    },
    {
      name: 'enName',
      label: intl.formatMessage(messages.ProjectName),
      options: {
        display: locale === 'en',
      },
    },
    {
      name: 'arName',
      label: intl.formatMessage(messages.ProjectName),
      options: {
        display: locale === 'ar',
      },
    },
    {
      name: 'customerName',
      label: intl.formatMessage(messages.customerName),
    },
    {
      name: 'expectedWorkHours',
      label: intl.formatMessage(messages.expectedWorkHours),
    },
    {
      name: 'expectedStartDate',
      label: intl.formatMessage(messages.expectedStartDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.expectedStartDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: 'expectedEndDate',
      label: intl.formatMessage(messages.expectedEndDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.expectedEndDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
  ];

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
      await ProjectData().Delete(id);

      toast.success(notif.saved);
      getdata();
    } catch (er) {
      setIsLoading(false);
    }
  };

  const actions = {
    add: {
      url: SITEMAP.projectManagement.ProjectCreate.route,
    },
    edit: {
      url: SITEMAP.projectManagement.ProjectEdit.route,
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

Project.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Project);
