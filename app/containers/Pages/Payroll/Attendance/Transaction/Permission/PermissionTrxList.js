import { Print } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import parse from 'html-react-parser';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import PayrollTable from '../../../Component/PayrollTable';
import { formateDate } from '../../../helpers';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/PermissionTrxData';
import messages from '../../messages';

function PermissionTrxList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);
  const company = useSelector((state) => state.authReducer.companyInfo);
  const [printContent, setPrintContent] = useState('');
  const documentTitle = 'Permission ' + formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

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
      const response = await ApiData(locale).Delete(id);

      if (response.status == 200) {
        toast.success(notif.saved);
        fetchData();
      } else {
        toast.error(response.statusText);
      }
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
      options: {
        filter: false,
      },
    },
    {
      name: 'date',
      label: <FormattedMessage {...Payrollmessages.date} />,
    },

    {
      name: 'employeeName',
      label: <FormattedMessage {...Payrollmessages.employeeName} />,
    },

    {
      name: 'permissionName',
      label: <FormattedMessage {...messages.permissionName} />,
    },
    {
      name: 'minutesCount',
      label: <FormattedMessage {...messages.minutesCount} />,
    },
    {
      name: 'notes',
      label: <FormattedMessage {...Payrollmessages.notes} />,
    },
    {
      name: 'step',
      label: <FormattedMessage {...Payrollmessages.step} />,
    },
    {
      name: 'status',
      label: <FormattedMessage {...Payrollmessages.status} />,
    },
    {
      name: 'approvedEmp',
      label: <FormattedMessage {...Payrollmessages.approvedEmp} />,
    },
    {
      name: 'Print',
      label: <FormattedMessage {...Payrollmessages.Print} />,
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
      url: '/app/Pages/Att/PermissionTrxCreate',
    },
    edit: {
      url: '/app/Pages/Att/PermissionTrxEdit',
    },
    delete: {
      api: deleteRow,
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

        <div className='ql-snow' style={{ direction: 'ltr' }}>
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

export default injectIntl(PermissionTrxList);
