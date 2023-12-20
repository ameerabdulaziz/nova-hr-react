import { format } from 'date-fns';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import style from '../../../../styles/styles.scss';
import AddButton from '../Component/AddButton';
import AlertPopup from '../Component/AlertPopup';
import DeleteButton from '../Component/DeleteButton';
import EditButton from '../Component/EditButton';
import PayRollLoader from '../Component/PayRollLoader';
import useStyles from '../Style';
import payrollMessages from '../messages';
import api from './api/SettingMailSmsFormData';
import messages from './messages';

function SettingMailSmsForm(props) {
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
      label: '',
      options: {
        filter: false,
        display: false
      },
    },

    {
      name: 'subject',
      label: intl.formatMessage(messages.subject),
      options: {
        filter: true,
      },
    },

    {
      name: 'formTypeName',
      label: intl.formatMessage(messages.formTypeName),
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
              url={'/app/Pages/Setting/SettingMailSmsFormEdit'}
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
      <AddButton url={'/app/Pages/Setting/SettingMailSmsFormCreate'} />
    ),
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
  };

  const closePopup = () => {
    setOpenParentPopup(false);
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <AlertPopup
        handleClose={closePopup}
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

SettingMailSmsForm.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SettingMailSmsForm);
