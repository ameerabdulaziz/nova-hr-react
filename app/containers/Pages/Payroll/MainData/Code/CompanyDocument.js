import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import { ServerURL } from '../../api/ServerConfig';
import api from '../api/CompanyDocumentData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function CompanyDocument(props) {
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
      name: 'categoryName',
      label: intl.formatMessage(messages.category),
    },

    {
      name: 'docTypeName',
      label: intl.formatMessage(messages.documentType),
    },

    {
      name: 'docDesc',
      label: intl.formatMessage(messages.documentDescription),
    },

    {
      name: 'docType',
      label: intl.formatMessage(messages.documentType),
    },

    {
      name: 'docPath',
      label: intl.formatMessage(messages.document),
      options: {
        filter: false,
        print: false,
        customBodyRender: (value) => (value ? (
          <a
            href={`${ServerURL}Doc/CompanyDoc/${value}`}
            target='_blank'
            rel='noreferrer'
          >
            {intl.formatMessage(messages.preview)}
          </a>
        ) : (
          ''
        )),
      },
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.mainData.CompanyDocumentCreate.route,
    },
    edit: {
      url: SITEMAP.mainData.CompanyDocumentEdit.route,
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

CompanyDocument.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CompanyDocument);
