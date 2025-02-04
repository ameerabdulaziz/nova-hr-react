import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import { formateDate } from '../../helpers';
import api from '../api/JobAdvertisementData';
import messages from '../messages';
import Copy from '@mui/icons-material/CopyAll';
import {
  Tooltip,
  IconButton,
} from '@mui/material';
import Payrollmessages from '../../messages';
import { useHistory } from 'react-router-dom';
import SITEMAP from '../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function JobAdvertisement(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');
  const history = useHistory();

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
      label: intl.formatMessage(messages.id),
      options: {
        filter: false,
        print: false,
      },
    },

    {
      name: 'job',
      label: intl.formatMessage(messages.jobName),
    },

    {
      name: 'jobAdvertisementCode',
      label: intl.formatMessage(messages.jobCode),
    },

    {
      name: 'expireDate',
      label: intl.formatMessage(messages.expireDate),
      options: getDateColumnOptions(
        intl.formatMessage(Payrollmessages.todate),
        {
          minDateLabel: intl.formatMessage(Payrollmessages.minDate),
          maxDateLabel: intl.formatMessage(Payrollmessages.maxDate),
        }
      ),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.recruitment.JobAdvertisementCreate.route,
    },
    edit: {
      url: SITEMAP.recruitment.JobAdvertisementEdit.route,
    },
    delete: {
      callback: deleteRow,
    },
    extraActions: (row) => (
      <>
        <Tooltip
          placement='bottom'
          title={intl.formatMessage(Payrollmessages.copy)}
        >
          <span>
            <IconButton onClick={() => {
              history.push(SITEMAP.recruitment.JobAdvertisementCreate.route, {
                id: row.id,
                isCopy: true});
              }}>
              <Copy sx={{ fontSize: '1.2rem' }} />
            </IconButton>
          </span>
        </Tooltip>
      </>
    ),
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

JobAdvertisement.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobAdvertisement);
