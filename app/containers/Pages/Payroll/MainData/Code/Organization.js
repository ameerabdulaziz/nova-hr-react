import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import { injectIntl } from 'react-intl';
import OrganizationData from '../api/OrganizationData';
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


// const useStyles = makeStyles()(() => ({
//   root: {
//     flexGrow: 1,
//   },
// }));

function Organization({ intl }) {
  const title = brand.name + ' - Organization';
  const description = brand.desc;
  const { classes } = useStyles();

  const [dataTable, setDataTable] = useState([]);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [submitting ,setSubmitting] = useState(false)
  const [processing ,setProcessing] = useState(false)
  const locale = useSelector((state) => state.language.locale);
  const history = useHistory();



  const getdata = async () => {
    const data = await OrganizationData(locale).GetList();

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
      {
        name: 'parentName',
        label: intl.formatMessage(messages.parentNameOrg),
        options: {
          filter: true
        }
      },
      {
        name: 'empName',
        label: intl.formatMessage(messages.empName),
        options: {
          filter: true
        }
      },
      {
        name: 'manPower',
        // label: "ManPower",
        label: intl.formatMessage(messages.manPower),
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
                <Link to={`/app/Pages/MainData/EditOrganization${tableMeta.rowData[0]}`}>
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
            history.push(`/app/Pages/MainData/CreateOrganization`);
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
     let response = await OrganizationData().Delete(deleteItem);

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

        <div className={classes.root}>
        <div
            className={`${style.tableContainerSty}  ${locale === 'ar' ? style.tableContainerStyAr : ''}`}
          >
            <MUIDataTable
              title={intl.formatMessage(messages.OrganizationsList)}
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
        messageData={ locale === "en" ? deleteItem[2] : deleteItem[1]}
        callFun={DeleteFun}
        submitting={submitting}
        processing={processing}
      />

    </div>
  );
}

export default injectIntl(Organization);
