import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../Component/SimplifiedPayrollTable';
import Payrollmessages from '../messages';
import ApiData from './api/WorkFlowData';
import messages from './messages';
import Copy from '@mui/icons-material/CopyAll';
import {
  Tooltip,
  IconButton,
} from '@mui/material';

import { useHistory } from 'react-router-dom';
import SITEMAP from '../../../App/routes/sitemap';

function WorkFlowList(props) {
  const { intl } = props;
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);

  const onCopyBtnClick = async (id) => {
    history.push(SITEMAP.workFlow.WorkFlowEdit.route, {
      id: id,
      isCopy: true},);
  };
  async function fetchData() {
    try {
      const dataApi = await ApiData(locale).GetList();
      setdata(dataApi);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteRow(id) {
    try {
      setIsLoading(true);
      await ApiData(locale).Delete(id);

      toast.success(notif.saved);
      fetchData();
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        print: false,
      },
    },
    {
      name: 'arName',
      label: intl.formatMessage(Payrollmessages.arName),
    },
    {
      name: 'enName',
      label: intl.formatMessage(Payrollmessages.enName),
    },

    {
      name: 'documentName',
      label: intl.formatMessage(messages.documentName),
    },
    {
      name: 'docTypeName',
      label: intl.formatMessage(messages.documentType),
    },
    
  ];

  const actions = {
    add: {
      url: SITEMAP.workFlow.WorkFlowCreate.route,
    },
    edit: {
      url: SITEMAP.workFlow.WorkFlowEdit.route,
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
            <IconButton onClick={() => onCopyBtnClick(row.id)}>
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
      data={data}
      columns={columns}
      actions={actions}
    />
  );
}

WorkFlowList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(WorkFlowList);
