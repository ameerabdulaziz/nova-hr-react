import { Backdrop, Box, CircularProgress } from '@mui/material';
import { format } from 'date-fns';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss';
import AddButton from '../../Component/AddButton';
import DeleteButton from '../../Component/DeleteButton';
import EditButton from '../../Component/EditButton';
import useStyles from '../../Style';
import payrollMessages from '../../messages';
import api from '../api/StopInsuranceData';
import messages from '../messages';

function StopInsurance(props) {
  const { intl } = props;
  const { classes } = useStyles();
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
    //  toast.error(JSON.stringify(error.response.data));
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
    //  toast.error(JSON.stringify(err));
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
      },
    },
    {
      name: 'employeeId',
      label: intl.formatMessage(messages.employeeId),
      options: {
        filter: true,
      },
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
      options: {
        filter: true,
      },
    },

    {
      name: 'insEndDate',
      label: intl.formatMessage(messages.endDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },

    {
      name: 'insReason',
      label: intl.formatMessage(messages.reason),
      options: {
        filter: true,
      },
    },
    {
      name: 'notes',
      label: intl.formatMessage(messages.notes),
      options: {
        filter: true,
      },
    },
    {
      name: 'Actions',
      label: <FormattedMessage {...messages.actions} />,
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => (
          <div className={style.actionsSty}>
            <EditButton
              param={{ id: tableMeta.rowData[0] }}
              url={'/app/Pages/insurance/StopInsuranceEdit'}
            />

            <DeleteButton clickfnc={() => deleteRow(tableMeta.rowData[0])} />
          </div>
        ),
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 15, 50, 100],
    page: 0,
    searchOpen: true,
    selectableRows: 'none',
    onSearchClose: () => {
      //  some logic
    },
    customToolbar: () => (
      <AddButton url={'/app/Pages/insurance/StopInsuranceCreate'} />
    ),
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
  };

  return (
    <Box
      sx={{
        zIndex: 100,
        position: 'relative',
      }}
    >
      <Backdrop
        sx={{
          color: 'primary.main',
          zIndex: 10,
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.69)',
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title=""
            data={tableData}
            columns={columns}
            options={options}
          />
        </div>
      </PapperBlock>
    </Box>
  );
}

export default injectIntl(StopInsurance);
