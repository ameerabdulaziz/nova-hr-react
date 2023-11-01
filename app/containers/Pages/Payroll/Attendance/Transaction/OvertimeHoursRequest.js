import { format } from 'date-fns';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss';
import AddButton from '../../Component/AddButton';
import AlertPopup from '../../Component/AlertPopup';
import DeleteButton from '../../Component/DeleteButton';
import EditButton from '../../Component/EditButton';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import payrollMessages from '../../messages';
import api from '../api/OvertimeHoursRequestData';
import messages from '../messages';

function OvertimeHoursRequest(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

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

  const deleteRow = async () => {
    setIsLoading(true);

    try {
      await api(locale).delete(deleteItem);

      fetchTableData();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteBtnClick = (item) => {
    setOpenParentPopup(true);
    setDeleteItem(item);
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
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
      options: {
        filter: true,
      },
    },

    {
      name: 'trxDate',
      label: intl.formatMessage(messages.subscriptionDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },

    {
      name: 'startTime',
      label: intl.formatMessage(messages.startTime),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'hh:mm:ss aa') : ''),
      },
    },

    {
      name: 'endTime',
      label: intl.formatMessage(payrollMessages.endTime),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'hh:mm:ss aa') : ''),
      },
    },

    {
      name: 'minutesCount',
      label: intl.formatMessage(messages.totalNumberOfMinutes),
      options: {
        filter: true,
      },
    },

    {
      name: 'notes',
      label: intl.formatMessage(payrollMessages.notes),
      options: {
        filter: true,
      },
    },

    {
      name: 'step',
      label: intl.formatMessage(payrollMessages.step),
      options: {
        filter: true,
      },
    },
    {
      name: 'status',
      label: intl.formatMessage(payrollMessages.status),
      options: {
        filter: true,
      },
    },
    {
      name: 'approvedEmp',
      label: intl.formatMessage(payrollMessages.approvedEmp),
      options: {
        filter: true,
      },
    },

    {
      name: 'Actions',
      label: intl.formatMessage(payrollMessages.Actions),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => (
          <div className={style.actionsSty}>
            <EditButton
              param={{ id: tableMeta.rowData[0] }}
              url={'/app/Pages/Att/OvertimeHoursRequestEdit'}
            />

            <DeleteButton
              clickfnc={() => onDeleteBtnClick(tableMeta.rowData[0])}
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
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    searchOpen: true,
    selectableRows: 'none',
    onSearchClose: () => {
      //  some logic
    },
    customToolbar: () => (
      <AddButton url={'/app/Pages/Att/OvertimeHoursRequestCreate'} />
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

      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title=''
            data={tableData}
            columns={columns}
            options={options}
          />
        </div>
      </PapperBlock>
    </PayRollLoader>
  );
}

OvertimeHoursRequest.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OvertimeHoursRequest);
