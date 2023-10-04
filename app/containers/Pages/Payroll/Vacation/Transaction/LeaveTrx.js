import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { PapperBlock } from 'enl-components';
import useStyles from '../../Style';
import messages from '../messages';
import AddButton from '../../Component/AddButton';
import EditButton from '../../Component/EditButton';
import DeleteButton from '../../Component/DeleteButton';
import style from '../../../../../styles/styles.scss';

function LeaveTrxList(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);

  const deleteRow = async id => {
    console.log(id);
  };

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false
      },
    },
    {
      name: 'staff',
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
      name: 'LeaveType',
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
      name: 'serial',
      label: <FormattedMessage {...messages.serial} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'transactionDate',
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
              url={'/app/Pages/vac/LeaveTrxEdit'}
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
      <AddButton url={'/app/Pages/vac/LeaveTrxCreate'} />
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

export default injectIntl(LeaveTrxList);
