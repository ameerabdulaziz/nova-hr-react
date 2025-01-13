import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import ProjectData from '../api/ProjectData';
import messages from '../messages';
import Payrollmessages from "../../messages";
import { getCheckboxIcon } from '../../helpers';
import SITEMAP from '../../../../App/routes/sitemap';

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
    // used to appear en employee name when ar employee name in en version , in ar version appear ar employee name when en employee name
    ...(locale === "en" ? [
      {
        name: 'enName',
        label: intl.formatMessage(messages.ProjectName),
      }
    ] : [
      {
        name: 'arName',
        label: intl.formatMessage(messages.ProjectName),
      }
    ]),
    {
      name: 'customerName',
      label: "Customer Name",
      label: intl.formatMessage(messages.customerName),
    },
    {
        name: 'expectedWorkHours',
        label: "Exp Working Hours",
        label: intl.formatMessage(messages.expectedWorkHours),
    },
    {
      name: 'expectedStartDate',
      label: "Exp Start Date",
      label: intl.formatMessage(messages.expectedStartDate),
    },
    {
      name: 'expectedEndDate',
      label: "Exp End Date",
      label: intl.formatMessage(messages.expectedEndDate),
    },
  ];

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
      await ProjectData().Delete(id);

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
      url: SITEMAP.projectManagement.ProjectCreate.route,
    },
    edit: {
      url: SITEMAP.projectManagement.ProjectEdit.route,
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

Project.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Project);
