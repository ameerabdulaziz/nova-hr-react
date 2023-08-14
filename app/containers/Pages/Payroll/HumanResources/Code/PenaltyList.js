import React, { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import MUIDataTable from 'mui-datatables';
import ApiData from '../api/PenaltyData';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox, IndeterminateCheckBoxRounded } from '@mui/icons-material';
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

function PenaltyList() {
  const history=useHistory();  
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const [changedata, setchangedata] = useState(1);

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
    const dataApi = await ApiData(locale).GetPenaltyList();
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
        display: 'false',
      },
    },
    {
      name: 'enName',
      label:<FormattedMessage {...messages['enName']} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'arName',
      label: <FormattedMessage {...messages['arName']} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'elementName',
      label: <FormattedMessage {...messages['elementName']} />,
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
                <Link to={`/app/Pages/HR/EditPenalty${tableMeta.rowData[0]}`}>
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
            history.push(`/app/Pages/HR/CreatePenalty`);
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
    <div className={classes.table}>
      <MUIDataTable
        title="Penalties List"
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default PenaltyList;
