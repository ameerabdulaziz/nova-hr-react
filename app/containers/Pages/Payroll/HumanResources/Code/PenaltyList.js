import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import ApiData from '../api/PenaltyData';
import { useSelector } from 'react-redux';
import messages from '../messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import style from '../../../../../../app/styles/styles.scss';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import useStyles from '../../Style';
import EditButton from '../../Component/EditButton';
import DeleteButton from '../../Component/DeleteButton';
import AddButton   from '../../Component/AddButton';


function PenaltyList(props) {
  
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const [changedata, setchangedata] = useState(1);

  
  async function deleteList(selectedRows){
    
    const list=[];
    for(let i=0; i<selectedRows.data.length; i++) {
    list.push(data[selectedRows.data[i].dataIndex].id);
    }
    try {
      
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
              <EditButton param={{id: tableMeta.rowData[0] }} url={"/app/Pages/HR/PenaltyEdit"}></EditButton>
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
        <AddButton url={"/app/Pages/HR/PenaltyCreate"}></AddButton>
    ),
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      
      <div>
          <DeleteButton clickfnc={() => deleteList(selectedRows)}></DeleteButton>             
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

export default injectIntl(PenaltyList);
