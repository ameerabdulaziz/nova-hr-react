import { Print } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Stack
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import PayrollTable from '../../Component/PayrollTable';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/LeaveTrxData';
import messages from '../messages';

import 'react-quill/dist/quill.snow.css';

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
  const documentTitle = 'Leave ' + formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

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
      name: 'vacationName',
      label: intl.formatMessage(messages.LeaveType),
    },
    {
      name: 'daysCount',
      label: intl.formatMessage(messages.daysCount),
    },
    {
      name: 'fromDate',
      label: intl.formatMessage(messages.fromDate),
    },
    {
      name: 'toDate',
      label: intl.formatMessage(messages.toDate),
    },

    {
      name: 'trxDate',
      label: intl.formatMessage(messages.transactionDate),
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
      name: 'print',
      label: intl.formatMessage(payrollMessages.Print),
      options: {
        filter: false,
        print: false,
        download: false,
        customBodyRender: (_, tableMeta) => (
          <IconButton onClick={() => onPrintBtnClick(tableMeta.rowData[0])}>
            <Print sx={{ fontSize: '1.2rem' }} />
          </IconButton>
        ),
      },
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/vac/LeaveTrxCreate',
    },
    edit: {
      url: '/app/Pages/vac/LeaveTrxEdit',
      disabled: isHR ? false : (row) => row[10] !== null,
    },
    delete: {
      api: deleteRow,
      disabled: isHR ? false : (row) => row[10] !== null,
    },
  };

  return (
    <>
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
