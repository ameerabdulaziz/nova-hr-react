import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import useStyles from '../../Style';
import { getCheckboxIcon } from '../../helpers';
import api from '../api/AsTemplateData';
import AsTemplatePrint from '../components/AsTemplate/AsTemplatePrint';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function AsTemplate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const [printId, setPrintId] = useState();

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
      name: 'enName',
      label: intl.formatMessage(messages.templateName),
    },

    {
      name: 'arName',
      label: intl.formatMessage(messages.arTemplateName),
    },

    {
      name: 'isPropation',
      label: intl.formatMessage(messages.isPropation),
      options: {
        filter: true,
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: '',
      label: intl.formatMessage(messages.Print),
      options: {
        filter: false,
        print: false,
        customBodyRender: (value, tableMeta) => (
          <LocalPrintshopOutlinedIcon
            className={classes.textSty}
            style={{ cursor: 'pointer' }}
            onClick={() => setPrintId(tableMeta.rowData[0])}
          />
        ),
      },
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.assessment.AsTemplateCreate.route,
    },
    edit: {
      url: SITEMAP.assessment.AsTemplateEdit.route,
    },
    delete: {
      api: deleteRow,
    },
  };

  return (
    <>
      <PayrollTable
        isLoading={isLoading}
        showLoader
        title={Title}
        data={tableData}
        columns={columns}
        actions={actions}
      />

      <AsTemplatePrint intl={intl} printId={printId} setPrintId={setPrintId} />
    </>
  );
}

AsTemplate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AsTemplate);
