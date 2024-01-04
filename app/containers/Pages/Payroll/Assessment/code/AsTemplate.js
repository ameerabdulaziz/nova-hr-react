import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss';
import AddButton from '../../Component/AddButton';
import AlertPopup from '../../Component/AlertPopup';
import DeleteButton from '../../Component/DeleteButton';
import EditButton from '../../Component/EditButton';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import payrollMessages from '../../messages';
import api from '../api/AsTemplateData';
import messages from '../messages';
import AsTemplatePrint from '../components/AsTemplate/AsTemplatePrint';
import { Button } from "@mui/material";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';

function AsTemplate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const [printId, setPrintId] = useState();

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

      toast.success(notif.saved);

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

  const getCheckboxIcon = (value) => (
    <div>
      {value ? (
        <CheckIcon style={{ color: '#3f51b5' }} />
      ) : (
        <CloseIcon style={{ color: '#717171' }} />
      )}
    </div>
  );

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
      },
    },

    {
      name: 'enName',
      label: intl.formatMessage(messages.templateName),
      options: {
        filter: true,
      },
    },

    {
      name: 'arName',
      label: intl.formatMessage(messages.arTemplateName),
      options: {
        filter: true,
      },
    },

    {
      name: 'isPropation',
      label: intl.formatMessage(messages.isPropation),
      options: {
        filter: true,
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
      name: "",
      label: intl.formatMessage(messages.Print),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => (
            <LocalPrintshopOutlinedIcon 
             className={classes.textSty}
             style={{cursor: "pointer"}}
            onClick={()=>
                  setPrintId(tableMeta.rowData[0])
                }
            />
          ),
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
              url={'/app/Pages/Assessment/AsTemplateEdit'}
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
      <AddButton url={'/app/Pages/Assessment/AsTemplateCreate'} />
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

      <AsTemplatePrint 
      intl={intl}
      printId={printId}
      setPrintId={setPrintId}
      />
    </PayRollLoader>
  );
}

AsTemplate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AsTemplate);
