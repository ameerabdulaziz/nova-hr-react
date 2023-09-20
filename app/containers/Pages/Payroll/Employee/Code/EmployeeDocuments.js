import React, { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl } from 'react-intl';
import EmployeeDocumentsData from '../api/EmployeeDocumentsData';
import MUIDataTable from 'mui-datatables';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { FormattedMessage } from 'react-intl';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';
import useStyles from '../../Style';
import { useSelector } from 'react-redux';
import { useHistory, Link , useLocation } from 'react-router-dom';
import style from '../../../../../styles/Styles.scss';
import EditIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertPopup  from '../../../../../components/Popup/AlertDeletePopup';
import GeneralListApis from '../../api/GeneralListApis'; 
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { PapperBlock } from 'enl-components';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';




function EmployeeDocuments({ intl }) {
  const title = brand.name + ' - EmployeeDocuments';
  const description = brand.desc;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const history = useHistory();
  const [dataTable, setDataTable] = useState([]);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [submitting ,setSubmitting] = useState(false)
  const [processing ,setProcessing] = useState(false)
  const [employee, setEmployee] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const { state } = useLocation()
  const  employeeID  = state?.employeeId



  const getdata = async () => {

    const employees = await GeneralListApis(locale).GetEmployeeList(locale);  

    setEmployeeList(employees)

  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(()=>{
    if(employeeList.length !== 0 && employeeID)
    {
      setEmployee(employeeID)

      employeeChangeFun(employeeID)
    }
  },[employeeID, employeeList])

  const columns = [
    {
      name: "id",
      label: intl.formatMessage(messages.id),
      options: {
        display: true
      }
    },
    {
      name: 'empName',
      label: intl.formatMessage(messages.employeename),
      options: {
        filter: true
      }
    },
    {
        name: 'startDate',
        label: intl.formatMessage(messages.startDate),
        options: {
          filter: true
        }
      },
      {
        name: 'endDate',
        label: intl.formatMessage(messages.endDate),
        options: {
          filter: true
        }
      },
      {
        name: 'followDate',
        label: intl.formatMessage(messages.followDate),
        options: {
          filter: true
        }
      },
      {
        name: 'isPaperCopy',
        label: intl.formatMessage(messages.HardCopy),
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
                  <Link to={{ pathname: "/app/Pages/Employee/EditEmployeeDocuments", state: {id: tableMeta.rowData[0], employeeId: employee}}}>
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
        <span>
        <Button
          variant="contained"
          onClick={() => {
            history.push(`/app/Pages/Employee/CreateEmployeeDocuments`,  { employeeId: employee } );
          }}
          color="secondary"
          className={classes.button}
          disabled={employee ? false : true}
        >
          <AddIcon />
            <FormattedMessage {...Payrollmessages.add} />
        </Button>
        </span>
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
       let response = await EmployeeDocumentsData().Delete(deleteItem);
 
       if (response.status==200) {
         toast.success(notif.saved);
         employeeChangeFun(employee)
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




  const employeeChangeFun = async (id) => {

    if(id)
    {
    const data =  await EmployeeDocumentsData().GetList(id,locale);

    let newData = data.map((items) => {
      Object.keys(items).forEach((val) => {
        // this used to convert boolean values to string  until table can read the values
        if (typeof items[val] == 'boolean') {
          items[val] = String(items[val]);
        }

        // used to make table read date Data as a date 
        if(val === "startDate" || val === "endDate" || val === "followDate")
        {
            items[val] = new Date( items[val]).toLocaleDateString()
        }
      });
      return items;
    });

    setDataTable(newData)
  
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

        <PapperBlock whiteBg icon="border_color" title={intl.formatMessage(messages.EmployeeDocuments)} desc=""> 
        <Grid
            container
            spacing={1}
            alignItems="flex-start"
            direction="row"
          >
            <Grid item xs={1} sm={6}>
              <Autocomplete
                id="ddlEmp"
                options={employeeList}
                value={employee ?   employeeList.find((item)=> item.id === employee)   : null}  
                getOptionLabel={(option) => option ? option.name : ""}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
                }}
                onChange={(event, value) => {
                  if (value !== null) {
                    setEmployee(value.id);
                  } else {
                    setEmployee(0);
                  }
                  employeeChangeFun(value !== null ? value.id : null)
                }}
                renderInput={(params) => (
                  <TextField
                    variant="standard"
                    {...params}
                    name="employee"
                    value={employee}
                    label={intl.formatMessage(messages.chooseEmp)}
                    margin="normal"
                  />
                )}
              />
            </Grid>
          </Grid>


          <div
            className={`${style.EmpDocTableContainerSty} ${locale === 'ar' ? style.tableContainerStyAr : ''}`}
          >
            <MUIDataTable
              data={ dataTable}
              columns={columns}
              options={options}
              className={style.tableSty}
            />
          </div>

          </PapperBlock>
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

export default injectIntl(EmployeeDocuments);
