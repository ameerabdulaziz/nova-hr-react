import { List, Print } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box, IconButton, Stack, Tooltip
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { ServerURL } from '../../api/ServerConfig';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import WFExecutionList from '../../WorkFlow/WFExecutionList';
import api from '../api/LeaveTrxData';
import messages from '../messages';

import 'react-quill/dist/quill.snow.css';
import SITEMAP from '../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function LeaveTrxList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const company = useSelector((state) => state.authReducer.companyInfo);
  const authState = useSelector((state) => state.authReducer);
  const { isHR } = authState.user;
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [printContent, setPrintContent] = useState('');
  const documentTitle =		'Leave ' + formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

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

  const fetchTableData = async () => {
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
    try {
      setIsLoading(true);
      await api(locale).delete(id);

      toast.success(notif.saved);

      fetchTableData();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onPrintBtnClick = async (id) => {
    setIsLoading(true);

    try {
      const response = await api(locale).print(id);
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

  const onExecutionBtnClick = async (id) => {
    setRequestId(id);
  };

  const onWFExecutionPopupClose = () => {
    setRequestId(null);
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(payrollMessages.trxId),
      options: {
        filter: false,        
        print: false,
      },
    },
    {
      name: 'employeeId',
      label: intl.formatMessage(payrollMessages.employeeId),
      options: {
        filter: false,
        display: false,
        download: false,
        print: false,
      },
    },

    {
      name: 'employeeCode',
      label: intl.formatMessage(payrollMessages.employeeCode),
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.organization),
    },
    {
      name: 'vacationName',
      label: intl.formatMessage(messages.LeaveType),
    },
    {
      name: 'insDate',
      label: intl.formatMessage(payrollMessages.transactionDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.transactionDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: 'daysCount',
      label: intl.formatMessage(messages.daysCount),
    },
    {
      name: 'fromDate',
      label: intl.formatMessage(payrollMessages.fromdate),
      options: getDateColumnOptions(
        intl.formatMessage(payrollMessages.fromdate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'toDate',
      label: intl.formatMessage(payrollMessages.todate),
      options: getDateColumnOptions(
        intl.formatMessage(payrollMessages.todate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'trxDate',
      label: intl.formatMessage(messages.transactionDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.transactionDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
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
    {
      name: 'vacDocPath',
      label: intl.formatMessage(payrollMessages.attachment),
      options: {
        filter: false,
        print: false,
        download: false,
        customBodyRender: (value) => {
          
          if (!value||value=="null") {
            return '';
          }

          return (
            <a
              href={`${ServerURL}Doc/VacDoc/${value}`}
              target='_blank'
              rel='noreferrer'
            >
              <Tooltip
                placement='bottom'
                title={intl.formatMessage(payrollMessages.preview)}
              >
                <span>
                  <IconButton>
                    <VisibilityIcon sx={{ fontSize: '1.2rem' }} />
                  </IconButton>
                </span>
              </Tooltip>
            </a>
          );
        },
      },
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.vacation.LeaveTrxCreate.route,
    },
    edit: {
      url: SITEMAP.vacation.LeaveTrxEdit.route,
      // disabled edit action is not HR and status is null
      disabled: isHR ? false : (row) => row.status !== null,
    },
    delete: {
      callback: deleteRow,
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
        DocumentId={3}
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

      <SimplifiedPayrollTable
        isLoading={isLoading}
        showLoader
        title={Title}
        data={tableData}
        columns={columns}
        actions={actions}
      />
    </>
  );
}

LeaveTrxList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(LeaveTrxList);
