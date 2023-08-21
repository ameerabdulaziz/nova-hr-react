import React, { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl } from 'react-intl';
import JobData from '../api/JobData';
import MUIDataTable from 'mui-datatables';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { FormattedMessage } from 'react-intl';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';
import useStyles from '../../../../../components/Tables/tableStyle-jss';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import style from '../../../../../styles/Styles.scss';
import EditIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertPopup  from '../../../../../components/Popup/AlertDeletePopup';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';



function Job({ intl }) {
  const title = brand.name + ' - Job';
  const description = brand.desc;
  const { classes, cx } = useStyles();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const locale = useSelector((state) => state.language.locale);
  const history = useHistory();
  const [search, setsearch] = useState('');
  const [dataTable, setDataTable] = useState([]);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [submitting ,setSubmitting] = useState(false)
  const [processing ,setProcessing] = useState(false)



  const getdata = async () => {
    const data = await JobData(locale).GetList();

    // this used to convert boolean values to string before store it in redux until table can read the values
    let newData = data.map((items) => {
      Object.keys(items).forEach((val) => {
        if (typeof items[val] == 'boolean') {
          items[val] = String(items[val]);
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
      label: intl.formatMessage(messages.id),
      options: {
        display: true
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
        name: 'enName',
        label: intl.formatMessage(messages.enName),
        options: {
          filter: true
        }
      },
      // {
      //   name: 'jobCode',
      //   label: intl.formatMessage(messages.jobCode),
      //   options: {
      //     filter: true
      //   }
      // },
      // {
      //   name: 'isLeadershipPosition',
      //   label: intl.formatMessage(messages.isLeadershipPosition),
      //   options: {
      //     filter: true
      //   }
      // },
      // {
      //   name: 'medicalInsuranceStartDay',
      //   label: intl.formatMessage(messages.medicalInsuranceStartDay),
      //   options: {
      //     filter: true
      //   }
      // },
      // {
      //   name: 'sancLevelName',
      //   label: intl.formatMessage(messages.sancLevelName),
      //   options: {
      //     filter: true
      //   }
      // },
      // {
      //   name: 'sancLevelArName',
      //   label: intl.formatMessage(messages.sancLevelArName),
      //   options: {
      //     filter: true
      //   }
      // },
      {
        name: 'jobTypeName',
        label: intl.formatMessage(messages.jobTypeName),
        options: {
          filter: true
        }
      },
      {
        name: 'jobNatureName',
        label: intl.formatMessage(messages.jobNatureName),
        options: {
          filter: true
        }
      },
      {
        name: 'parentName',
        label: intl.formatMessage(messages.parentName),
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
              <div className={style.actionsSty}>
              <IconButton
                aria-label="Edit"
                size="large">
                <Link to={`/app/Pages/MainData/EditJob${tableMeta.rowData[0]}`}>
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
    searchOpen: true,
    selectableRows: "none" ,
    customToolbar: () => (
      <Tooltip title="Add New">
        <Button
          variant="contained"
          onClick={() => {
            history.push(`/app/Pages/MainData/CreateJob`);
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
       let response = await JobData().Delete(deleteItem);
 
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
              title="Jobs list"
              data={search ? search : dataTable}
              columns={columns}
              options={options}
              className={style.tableSty}
            />
          </div>
        </div>

      <AlertPopup  
        handleClose={handleClose}
        open={openParentPopup}
        messageData={ locale === "en" ? deleteItem[2] : deleteItem[1]}
        callFun={DeleteFun}
        submitting={submitting}
        processing={processing}
      />

    </div>
  );
}

export default injectIntl(Job);
