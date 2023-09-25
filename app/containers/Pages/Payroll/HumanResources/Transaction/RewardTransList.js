import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import ApiData from '../api/RewardTransData';
import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import style from '../../../../../../app/styles/styles.scss';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import useStyles from '../../Style';
import { PapperBlock } from 'enl-components';
import EditButton from '../../Component/EditButton';
import DeleteButton from '../../Component/DeleteButton';
import AddButton   from '../../Component/AddButton';


function RewardTransList(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  
  async function deleteList(selectedRows){
    
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
  }
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
      label:<FormattedMessage {...messages['date']} />,
      options: {
        filter: true,
      },
    },   
    {
      name: 'employeeName',
      label: <FormattedMessage {...messages['employeeName']} />,
      options: {
        filter: true,
      },
    },
    {
        name: 'superEmployeeName',
        label: <FormattedMessage {...messages['superEmployeeName']} />,
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
        name: 'rewardsName',
        label: <FormattedMessage {...messages['rewardsName']} />,
        options: {
            filter: true,
        },
    },    
    {
        name: 'value',
        label: <FormattedMessage {...messages['value']} />,
        options: {
            filter: true,
        },
    },
    
    {
        name: 'note',
        label: <FormattedMessage {...messages['note']} />,
        options: {
            filter: true,
        },
    },
    {
      name: 'step',
      label: <FormattedMessage {...Payrollmessages['step']} />,
      options: {
          filter: true,
      },
    },
    {
      name: 'status',
      label: <FormattedMessage {...Payrollmessages['status']} />,
      options: {
          filter: true,
      },
    },
    {
      name: 'approvedEmp',
      label: <FormattedMessage {...Payrollmessages['approvedEmp']} />,
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
              <EditButton Id={tableMeta.rowData[0]} url={"/app/Pages/HR/RewardTransEdit"}></EditButton>
              <DeleteButton clickfnc={() => deleterow(tableMeta.rowData[0])}></DeleteButton>              
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
      <Tooltip title={intl.formatMessage(Payrollmessages.addNew)}>        
        <AddButton url={"/app/Pages/HR/RewardTransCreate"}></AddButton>
      </Tooltip>      
    ),
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (      
      <div>
        <Tooltip title={intl.formatMessage(Payrollmessages.delete)} cursor="pointer" className="mr-6">         
          <DeleteButton clickfnc={() => deleteList(selectedRows)}></DeleteButton>              
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

export default injectIntl(RewardTransList);
