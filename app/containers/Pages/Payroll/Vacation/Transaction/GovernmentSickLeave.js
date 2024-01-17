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
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import payrollMessages from '../../messages';
import api from '../api/GovernmentSickLeaveData';
import messages from '../messages';
import AlertPopup from '../../Component/AlertPopup';

function GovernmentSickLeave(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState('');

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

  const onDeleteBtnClick = (item) => {
    setOpenParentPopup(true);
    setDeleteItem(item);
  };

  const deleteRow = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).delete(deleteItem);

      if (response.status === 200) {
        toast.success(notif.saved);

        fetchTableData();
      } else {
        //
      }
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
      },
    },
    {
      name: 'employeeId',
      label: <FormattedMessage {...messages.employeeCode} />,
      options: {
        filter: true,
      },
    },

    {
      name: 'employeeName',
      label: <FormattedMessage {...messages.employeeName} />,
      options: {
        filter: true,
      },
    },

    {
      name: 'vacationName',
      label: <FormattedMessage {...messages.LeaveType} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'daysCount',
      label: <FormattedMessage {...messages.daysCount} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'fromDate',
      label: <FormattedMessage {...messages.fromdate} />,
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{format(new Date(value), "yyyy-MM-dd")}</pre> : ''),
      },
    },
    {
      name: 'toDate',
      label: <FormattedMessage {...messages.todate} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'trxDate',
      label: <FormattedMessage {...messages.transactionDate} />,
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
              url={'/app/Pages/vac/GovernmentSickLeaveEdit'}
            />

            <DeleteButton clickfnc={() => onDeleteBtnClick(tableMeta.rowData[0])} />
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
      // some logic
    },
    customToolbar: () => (
      <AddButton url={'/app/Pages/vac/GovernmentSickLeaveCreate'} />
    ),
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <AlertPopup
        handleClose={handleClose}
        open={openParentPopup}
        messageData={`${intl.formatMessage(
          payrollMessages.deleteMessage
        )}${deleteItem}`}
        callFun={deleteRow}
      />

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
    </PayRollLoader>
  );
}

export default injectIntl(GovernmentSickLeave);
