import React, { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl } from 'react-intl';
import VacationsTypesData from '../api/VacationsTypesData';
import MUIDataTable from 'mui-datatables';
import messages from '../messages';
import Payrollmessages from '../../messages';
// import Payrollmessages from '../../messages';
import { FormattedMessage } from 'react-intl';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';
import useStyles from '../../Style';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import style from '../../../../../styles/Styles.scss';
import EditIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertPopup  from '../../../../../components/Popup/AlertDeletePopup';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';



function VacationsTypes({ intl }) {
  const title = brand.name + ' - VacationsTypes';
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
    const data = await VacationsTypesData(locale).GetList();

    let newData = data.map((items) => {
        Object.keys(items).forEach((val) => {
          // this used to convert boolean values to string until table can read the values
        // if (typeof items[val] == 'boolean') {
        //   items[val] = String(items[val]);
        // }

        // used to make table read date Data as a date 
        if(val === "vacationDate")
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
      label: "id",
      options: {
        display: false
      }
    },
    {
      name: 'arName',
      label: intl.formatMessage(messages.arName),
      options: {
        filter: true
      }
    },
    {
      name: "enName",
      label: intl.formatMessage(messages.enName),
      options: {
        filter: true
      }
    },
    {
      name: 'deducted',
      label: intl.formatMessage(messages.deducted),
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              {value ? <CheckIcon style={{color: "#3f51b5"}} /> : <CloseIcon style={{color: "#717171"}}/>}
              
            </div>
          );
        }
      }
    },
    {
      name: 'hasBalance',
      label: intl.formatMessage(messages.hasBalance),
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              {value ? <CheckIcon style={{color: "#3f51b5"}} /> : <CloseIcon style={{color: "#717171"}}/>}
              
            </div>
          );
        }
      }
    },
    {
      name: 'isYearBalance',
      label: intl.formatMessage(messages.isYearBalance),
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              {value ? <CheckIcon style={{color: "#3f51b5"}} /> : <CloseIcon style={{color: "#717171"}}/>}
              
            </div>
          );
        }
      }
    },
    {
      name: 'app',
      label: intl.formatMessage(messages.shortcut),
      options: {
        filter: true
      }
    },
    {
      name: 'halfDay',
      label: intl.formatMessage(messages.halfDay),
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              {value  ? <CheckIcon style={{color: "#3f51b5"}} /> : <CloseIcon style={{color: "#717171"}}/>}
              
            </div>
          );
        }
      }
    },
      {
        name: 'Actions',
        label: intl.formatMessage(messages.actions),
        options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <div className={style.actionsSty}>
              <IconButton
                aria-label="Edit"
                size="large">
                <Link to={{ pathname: "/app/Pages/vac/EditVacationType", state: {id: tableMeta.rowData[0]}}}>
                  <EditIcon />
                </Link>
                
              </IconButton>

              <IconButton
              aria-label="Delete"
              size="large"
              onClick={() => {
                handleClickOpen(tableMeta.rowData)
              }}
              >
              <DeleteIcon />
              </IconButton>
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
      <Tooltip title="Add New">
        <Button
          variant="contained"
          onClick={() => {
            history.push(`/app/Pages/vac/CreateVacationType`);
          }}
          color="secondary"
          className={classes.button}
        >
          <AddIcon />
            <FormattedMessage {...Payrollmessages.add} />
        </Button>
      </Tooltip>
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
       let response = await VacationsTypesData().Delete(deleteItem);
 
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
              title={ intl.formatMessage(messages.vacationsTypes)}
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
        messageData={deleteItem[1]}
        callFun={DeleteFun}
        submitting={submitting}
        processing={processing}
      />

    </div>
  );
}

export default injectIntl(VacationsTypes);
