import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
// import OrganizationData from '../api/OrganizationData';
import messages from '../messages';
import { getCheckboxIcon } from '../../helpers';

function Project({ intl }) {
  const title = localStorage.getItem('MenuName');
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useSelector((state) => state.language.locale);

  const getdata = async () => {
    setIsLoading(true);

    try {
    //   const data = await OrganizationData(locale).GetList();

    //   setDataTable(data);
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
      name: 'empName',
      label: "Customer Name",
    //   label: intl.formatMessage(messages.arName),
    },
    {
        name: 'empCode',
        label: "Contract Code",
      //   label: intl.formatMessage(messages.id),
    },
    {
      name: 'enName',
      label: "Contract Start Date",
    //   label: intl.formatMessage(messages.enName),
    },
    {
      name: 'parentName',
      label: "Contract End Date",
    //   label: intl.formatMessage(messages.parentNameOrg),
    },
    // {
    //   name: 'manPower',
    //   label: "manPower",
    // //   label: intl.formatMessage(messages.manPower),
    // },
    // {
    //   name: 'isDisclaimer',
    //   label: "IsDisclaimer",
    // //   label: intl.formatMessage(messages.IsDisclaimer),
    //   options: {
    //     customBodyRender: (value) => getCheckboxIcon(value),
    //   },
    // },
  ];

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
    //   await OrganizationData().Delete(id);

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
      url: '/app/Pages/ProjectManagment/ProjectCreate',
    },
    edit: {
      url: '/app/Pages/ProjectManagment/ProjectEdit',
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
