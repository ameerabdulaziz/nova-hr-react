import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import api from '../api/SInsuranceOrgnizationData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function SInsuranceOrgnization(props) {
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
      name: 'id',
      label: intl.formatMessage(messages.organizationId),
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
      name: 'insuranceNumber',
      label: intl.formatMessage(messages.insuranceNumber),
    },
    {
      name: 'address',
      label: intl.formatMessage(messages.address),
      options: {
        noWrap: true,
      },
    },
    {
      name: 'owner',
      label: intl.formatMessage(messages.ownerName),
    },
    {
      name: 'governorateName',
      label: intl.formatMessage(messages.government),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.socialInsurance.SInsuranceOrgnizationCreate.route,
    },
    edit: {
      url: SITEMAP.socialInsurance.SInsuranceOrgnizationEdit.route,
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
      data={tableData}
      columns={columns}
      actions={actions}
    />
  );
}

SInsuranceOrgnization.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SInsuranceOrgnization);
