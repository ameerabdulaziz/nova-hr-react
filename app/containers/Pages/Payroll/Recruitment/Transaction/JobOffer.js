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
import api from '../api/JobOfferData';
import messages from '../messages';

function JobOffer(props) {
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

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  useEffect(() => {
    fetchTableData();
  }, []);

  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(messages.id),
      options: {
        filter: false,
        display: false
      },
    },

    {
      name: 'candidateName',
      label: intl.formatMessage(messages.applicantName),
      options: {
        filter: true,
      },
    },

    {
      name: 'jobOfferDate',
      label: intl.formatMessage(messages.offerDate),
      options: {
        filter: true,
        customBodyRender: formateDate,
      },
    },

    {
      name: 'departmentName',
      label: intl.formatMessage(messages.department),
      options: {
        filter: true,
      },
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
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
              url={'/app/Pages/Recruitment/JobOfferEdit'}
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
      <AddButton url={'/app/Pages/Recruitment/JobOfferCreate'} />
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

JobOffer.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobOffer);
