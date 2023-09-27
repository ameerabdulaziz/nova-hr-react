import React, { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl } from 'react-intl';
import ReplaceAnnualLeaveBalanceData from '../api/ReplaceAnnualLeaveBalanceData';
import MUIDataTable from 'mui-datatables';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { FormattedMessage } from 'react-intl';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import useStyles from '../../Style';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import style from '../../../../../styles/pagesStyle/ReplaceAnnualLeaveBalanceSty.scss';
import generalStyle from '../../../../../styles/Styles.scss';
import EditIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertPopup  from '../../../../../components/Popup/AlertDeletePopup';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import EditButton from '../../Component/EditButton';
import DeleteButton from '../../Component/DeleteButton';
import AddButton   from '../../Component/AddButton';



function ReplaceAnnualLeaveBalance({ intl }) {
  const title = brand.name + ' - ReplaceAnnualLeaveBalance';
  const description = brand.desc;
  const { classes, cx } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const history = useHistory();
  const [dataTable, setDataTable] = useState([]);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [submitting ,setSubmitting] = useState(false)
  const [processing ,setProcessing] = useState(false)



  const getdata = async () => {
    const data = await ReplaceAnnualLeaveBalanceData(locale).GetList();

    let newData = data.map((items) => {
        Object.keys(items).forEach((val) => {

        // used to make table read date Data as a date 
        if(val === "trxDate")
        {
            items[val] = new Date( items[val]).toLocaleDateString()
        }
      });
          return items;
    });

        setDataTable(newData)
  };

  useEffect(() => {
    getdata();
  }, []);

  

  const columns = [
    {
      name: "id",
      label: intl.formatMessage(messages.TrxSerial),
      options: {
        display: true
      }
    },
    {
      name: 'empName',
      label: intl.formatMessage(messages.EmployeeName),
      options: {
        filter: true
      }
    },
    {
      name: 'trxDate',
      label: intl.formatMessage(Payrollmessages.date),
      options: {
        filter: true
      }
    },
    {
      name: "payTemplateName",
      label: intl.formatMessage(messages.Template),
      options: {
        filter: true
      }
    },
    {
      name: "elementName",
      label: intl.formatMessage(messages.Element),
      options: {
        filter: true
      }
    },
    {
      name: "yearName",
      label: intl.formatMessage(messages.year),
      options: {
        filter: true
      }
    }, 
    {
      name: "monthName",
      label: intl.formatMessage(messages.Month),
      options: {
        filter: true
      }
    },
    {
      name: "vacBalRep",
      label: intl.formatMessage(messages.BalanceToReplace),
      options: {
        filter: true
      }
    },
      {
        name: 'Actions',
        label: intl.formatMessage(messages.actions),
        options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <div className={generalStyle.actionsSty}>
              <EditButton param={{id: tableMeta.rowData[0]}} url={"/app/Pages/vac/ReplaceAnnualLeaveBalanceEdit"}></EditButton>

              <DeleteButton clickfnc={() => handleClickOpen(tableMeta.rowData)}></DeleteButton>
              </div>
            );
          }
        }
      
    }
  ];

  

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 10,
    page: 0,
    // searchOpen: true,
    selectableRows: "none" ,
    customToolbar: () => (
      <div className={generalStyle.customToolbarBtn}>
          <AddButton url={"/app/Pages/vac/ReplaceAnnualLeaveBalanceCreate"} ></AddButton>
        </div>
    )
  };


  const handleClickOpen = (item) => {
      setOpenParentPopup(true);
      setDeleteItem(item)
  };
  
  const handleClose = () => {
      setOpenParentPopup(false);
  };


  const DeleteFun = async () => {
    setSubmitting(true)
    setProcessing(true)


    try {
       let response = await ReplaceAnnualLeaveBalanceData().Delete(deleteItem);
 
       if (response.status==200) {
         toast.success(notif.saved);
         getdata()
       } else {
           toast.error(response.statusText);
       }

      setSubmitting(false)
      setProcessing(false)
     } catch (err) {
       toast.error(notif.error);
       setSubmitting(false)
       setProcessing(false)
     }
  }



  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
        <div className={classes.root}  >
          <div
            className={`${style.tableContainerSty}  ${locale === 'ar' ? style.tableContainerStyAr : ''}`}
          >
            <MUIDataTable
              title={ intl.formatMessage(messages.ReplaceAnnualLeaveBalance)}
              data={dataTable}
              columns={columns}
              options={options}
              className={style.tableSty}
            />
          </div>
        </div>

      <AlertPopup  
        handleClose={handleClose}
        open={openParentPopup}
        messageData={deleteItem[2]}
        callFun={DeleteFun}
        submitting={submitting}
        processing={processing}
      />

    </div>
  );
}

export default injectIntl(ReplaceAnnualLeaveBalance);
