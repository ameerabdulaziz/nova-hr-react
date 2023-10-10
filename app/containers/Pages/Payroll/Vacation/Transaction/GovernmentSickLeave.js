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
import api from '../api/GovernmentSickLeaveData';
import messages from '../messages';

function GovernmentSickLeave(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);

  const fetchTableData = async () => {
    const response = await api(
      locale
    ).GetList();
    setTableData(response);
  };

  const deleteRow = async id => {
    try {
      const response = await api(locale).delete(id);

      if (response.status === 200) {
        toast.success(notif.saved);

        fetchTableData();
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(JSON.stringify(err));
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
        display: false
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

            <DeleteButton
              clickfnc={() => deleteRow(tableMeta.rowData[0])}
            />
          </div>
        ),
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 10,
    page: 0,
    searchOpen: true,
    selectableRows: 'none',
    onSearchClose: () => {
      // some logic
    },
    customToolbar: () => (
      <AddButton url={'/app/Pages/vac/GovernmentSickLeaveCreate'} />
    ),
  };

  return (
    <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
      <div className={classes.table}>
        <MUIDataTable
          title=''
          data={tableData}
          columns={columns}
          options={options}
        />
      </div>
    </PapperBlock>
  );
}

export default injectIntl(GovernmentSickLeave);
