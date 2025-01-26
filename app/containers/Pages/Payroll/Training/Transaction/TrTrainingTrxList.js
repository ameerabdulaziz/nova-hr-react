import { Button } from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PayrollTable from '../../Component/PayrollTable';
import payrollMessages from '../../messages';
import api from '../api/TrTrainingTrxListData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function TrTrainingTrxList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const pageTitle = localStorage.getItem('MenuName');

  const history = useHistory();

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
      label: intl.formatMessage(payrollMessages.enName),
    },

    {
      name: 'arName',
      label: intl.formatMessage(payrollMessages.arName),
    },

    {
      name: 'fromDate',
      label: intl.formatMessage(payrollMessages.fromdate),
    },

    {
      name: 'toDate',
      label: intl.formatMessage(payrollMessages.todate),
    },

    {
      name: 'courseName',
      label: intl.formatMessage(messages.courseName),
    },

    {
      name: 'trainerName',
      label: intl.formatMessage(messages.trainerName),
    },
  ];

  const onCreateTestBtnClick = (row) => {
    if (row.templateId) {
      history.push(SITEMAP.training.TestTemplateCreate.route, {
        id: row.templateId,
      });
    } else {
      history.push(SITEMAP.training.TestTemplateEdit.route, {
        trainingId: row.id,
      });
    }
  };

  const actions = {
    add: {
      url: SITEMAP.training.TrTrainingTrxListCreate.route,
    },
    edit: {
      url: SITEMAP.training.TrTrainingTrxListEdit.route,
    },
    delete: {
      api: deleteRow,
    },
    extraActions: (row) => (
      <Button
        variant={row.templateId ? 'outlined' : 'contained'}
        color='primary'
        onClick={() => onCreateTestBtnClick(row)}
      >
        {intl.formatMessage(
          row.templateId ? messages.editTest : messages.createTest
        )}
      </Button>
    ),
  };

  return (
    <PayrollTable
      isLoading={isLoading}
      showLoader
      title={pageTitle}
      data={tableData}
      columns={columns}
      actions={actions}
    />
  );
}

TrTrainingTrxList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TrTrainingTrxList);
