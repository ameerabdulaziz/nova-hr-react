import { Print } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import PayrollTable from '../../../Component/PayrollTable';
import { formateDate } from '../../../helpers';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/MissionTrxData';
import messages from '../../messages';

function MissionTrxList(props) {
  const { intl } = props;
  const company = useSelector((state) => state.authReducer.companyInfo);
  const locale = useSelector((state) => state.language.locale);
  const [data, setData] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);
  const [printContent, setPrintContent] = useState('');
  const documentTitle = 'Mission ' + formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

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
    setIsLoading(true);

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

  useEffect(() => {
    fetchData();
  }, []);

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

  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(Payrollmessages.id),
      options: {
        filter: false,
      },
    },
    {
      name: 'fromDate',
      label: <FormattedMessage {...Payrollmessages.fromdate} />,
    },
    {
      name: 'toDate',
      label: <FormattedMessage {...Payrollmessages.todate} />,
    },

    {
      name: 'employeeName',
      label: <FormattedMessage {...Payrollmessages.employeeName} />,
    },

    {
      name: 'missionName',
      label: <FormattedMessage {...messages.missionName} />,
    },
    {
      name: 'minutesCount',
      label: <FormattedMessage {...messages.minutesCount} />,
    },

    {
      name: 'notes',
      label: <FormattedMessage {...Payrollmessages.notes} />,
      options: {
        customBodyRender: (value) => (value ? <div style={{ maxWidth: '200px', width: 'max-content' }}>{value}</div> : '')
      },
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
      url: '/app/Pages/Att/MissionTrxCreate',
    },
    edit: {
      url: '/app/Pages/Att/MissionTrxEdit',
      disabled: (row) => row[8] !== null,
    },
    delete: {
      api: deleteRow,
      disabled: (row) => row[8] !== null,
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
        data={data}
        columns={columns}
        actions={actions}
      />
    </>
  );
}

MissionTrxList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(MissionTrxList);
