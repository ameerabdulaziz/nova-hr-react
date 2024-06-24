import { List, Print } from '@mui/icons-material';
import {
  Box, IconButton, Stack, Tooltip
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import PayrollTable from '../../../Component/PayrollTable';
import { formateDate } from '../../../helpers';
import payrollMessages from '../../../messages';
import WFExecutionList from '../../../WorkFlow/WFExecutionList';
import ApiData from '../../api/PermissionTrxData';
import messages from '../../messages';

function PermissionTrxList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const authState = useSelector((state) => state.authReducer);
  const { isHR } = authState.user;
  const [data, setData] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);
  const company = useSelector((state) => state.authReducer.companyInfo);
  const [printContent, setPrintContent] = useState('');
  const documentTitle = 'Permission ' + formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

  const [requestId, setRequestId] = useState(null);

  const printDivRef = useRef(null);

  const printJS = useReactToPrint({
    content: () => printDivRef?.current,
    documentTitle,
    onBeforeGetContent: () => {
      setIsLoading(true);
    },
    onAfterPrint: () => {
      setIsLoading(false);
    },
    onPrintError: () => {
      setIsLoading(false);
    },
  });

  async function fetchData() {
    try {
      const dataApi = await ApiData(locale).GetList();
      setData(dataApi);
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
      //
    } finally {
      setIsLoading(false);
    }
  }

  const onPrintBtnClick = async (id) => {
    setIsLoading(true);

    try {
      const response = await ApiData(locale).print(id);
      setPrintContent(response);

      // TODO: Mohammed-Taysser - refactor it
      setTimeout(() => {
        printJS();
      }, 1);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(payrollMessages.trxId),
      options: {
        filter: false,
      },
    },
    {
      name: 'date',
      label: intl.formatMessage(payrollMessages.date),
    },
    {
      name: 'employeeCode',
      label: intl.formatMessage(payrollMessages.employeeCode),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(payrollMessages.employeeName),
    },
    {
      name: 'organization',
      label: intl.formatMessage(messages.orgName),
    },
    {
      name: 'permissionName',
      label: intl.formatMessage(messages.permissionName),
    },
    {
      name: 'minutesCount',
      label: intl.formatMessage(messages.minutesCount),
    },
    {
      name: 'notes',
      label: intl.formatMessage(payrollMessages.notes),
      options: {
        customBodyRender: (value) => (value ? (
          <div style={{ maxWidth: '200px', width: 'max-content' }}>
            {value}
          </div>
        ) : (
          ''
        )),
      },
    },
    {
      name: 'step',
      label: intl.formatMessage(payrollMessages.step),
    },
    {
      name: 'status',
      label: intl.formatMessage(payrollMessages.status),
    },
    {
      name: 'approvedEmp',
      label: intl.formatMessage(payrollMessages.approvedEmp),
    },
  ];

  const onExecutionBtnClick = async (id) => {
    setRequestId(id);
  };

  const onWFExecutionPopupClose = () => {
    setRequestId(null);
  };

  const actions = {
    add: {
      url: '/app/Pages/Att/PermissionTrxCreate',
    },
    edit: {
      url: '/app/Pages/Att/PermissionTrxEdit',
      // disabled edit action is not HR and status is null
      disabled: isHR ? false : (row) => row.status !== null,
    },
    delete: {
      api: deleteRow,
      // disabled delete action is not HR and status is null
      disabled: isHR ? false : (row) => row.status !== null,
    },
    extraActions: (row) => (
      <>
        <Tooltip
          placement='bottom'
          title={intl.formatMessage(payrollMessages.Print)}
        >
          <span>
            <IconButton onClick={() => onPrintBtnClick(row.id)}>
              <Print sx={{ fontSize: '1.2rem' }} />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip
          placement='bottom'
          title={intl.formatMessage(payrollMessages.details)}
        >
          <span>
            <IconButton onClick={() => onExecutionBtnClick(row.id)}>
              <List sx={{ fontSize: '1.2rem' }} />
            </IconButton>
          </span>
        </Tooltip>
      </>
    ),
  };

  return (
    <>
      <WFExecutionList
        handleClose={onWFExecutionPopupClose}
        open={Boolean(requestId)}
        RequestId={requestId}
        DocumentId={1}
      />

      <Box
        ref={printDivRef}
        sx={{
          display: 'none',
          '@media print': {
            display: 'block',
          },
          px: 2,
          py: 4,
        }}
      >
        <Stack spacing={2} px={2}>
          <div>
            <img src={company?.logo} alt='' height={45} />
          </div>
        </Stack>

        <div className='ql-snow'>
          <div className='ql-editor'>{parse(printContent)}</div>
        </div>
      </Box>

      <PayrollTable
        isLoading={isLoading}
        showLoader
        title={Title}
        data={data}
        columns={columns}
        actions={actions}
      />
    </>
  );
}

PermissionTrxList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PermissionTrxList);
