import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import ApiData from '../api/PermissionTrxData';
import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { FormattedMessage } from 'react-intl';
import { useHistory,Link} from "react-router-dom";
import style from '../../../../../../app/styles/styles.scss';
import IconButton from '@mui/material/IconButton';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import useStyles from '../../Style';
import { PapperBlock } from 'enl-components';


function PermissionTrxList() {
  const history=useHistory();  
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  

  async function deleterow(id) {
  
    try {
     debugger;
      let response = await  ApiData(locale).Delete(id);

      if (response.status==200) {
        toast.success(notif.saved);
        fetchData();

      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(notif.error);
    }
  }
  async function fetchData() {
    const dataApi = await ApiData(locale).GetList();
    setdata(dataApi);
  }
  useEffect(() => {    
    fetchData();
  }, []);
  
  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
      },
    },
    {
      name: 'date',
      label:<FormattedMessage {...Payrollmessages['date']} />,
      options: {
        filter: true,
      },
    },
    
    {
      name: 'employeeName',
      label: <FormattedMessage {...Payrollmessages['employeeName']} />,
      options: {
        filter: true,
      },
    },
    
    {
        name: 'permissionName',
        label: <FormattedMessage {...messages['permissionName']} />,
        options: {
            filter: true,
        },
    },    
    {
        name: 'minutesCount',
        label: <FormattedMessage {...messages['minutesCount']} />,
        options: {
            filter: true,
        },
    },
   
    {
        name: 'notes',
        label: <FormattedMessage {...Payrollmessages['notes']} />,
        options: {
            filter: true,
        },
        },
    {
      name: 'Actions',
      options: {
        filter: false,

        customBodyRender: (value, tableMeta) => {
          console.log('tableMeta =', tableMeta);
          return (
            <div className={style.actionsSty}>
              <IconButton
                aria-label="Edit"
                size="large"
              >
                <Link to={{ pathname: "/app/Pages/Att/PermissionTrxEdit", state: {id: tableMeta.rowData[0],},}}>
                    <EditIcon />
                  </Link>
              </IconButton>

              <IconButton
                className={classes.button}
                aria-label="Delete"
                size="large"
                onClick={() => deleterow(tableMeta.rowData[0])}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          );
        },
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
    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => (
      <Tooltip title="Add New">
        <Button
          variant="contained"
          onClick={() => {
            debugger;
            history.push(`/app/Pages/Att/PermissionTrxCreate`);
          }}
          color="secondary"
          className={classes.button}
        >
          <AddIcon />
            <FormattedMessage {...Payrollmessages.add} />
        </Button>
      </Tooltip>
    ),
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      
      <div>
     
        <Tooltip title={'Delete'} cursor="pointer" className="mr-6">
          <IconButton
            onClick={async() => {
              debugger;
              const list=[];
              for(let i=0; i<selectedRows.data.length; i++) {
              list.push(data[selectedRows.data[i].dataIndex].id);
              }
              try {
                debugger;
                 let response = await  ApiData(locale).DeleteList(list);
           
                 if (response.status==200) {
                   toast.success(notif.saved);
                   fetchData();
                 } else {
                     toast.error(response.statusText);
                 }
               } catch (err) {
                 toast.error(notif.error);
               }
            }}
          >
            <DeleteIcon></DeleteIcon>
            {/* <ActionDelete></ActionDelete> */}
          </IconButton>
        </Tooltip>
       
      </div>
    ),
  };

  

  return (
    <PapperBlock whiteBg icon="border_color" title={Title} desc=""> 
      <div className={classes.table}>
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </PapperBlock>
  );
}

export default PermissionTrxList;
