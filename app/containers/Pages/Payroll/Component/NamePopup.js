import React,{memo,useState,useCallback,useEffect } from 'react';
import css from 'enl-styles/Table.scss';
import { Dialog,DialogContent,DialogTitle,Tooltip,Grid,IconButton } from "@mui/material";  
import Payrollmessages from '../messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import { toast } from 'react-hot-toast';
import useStyles from '../Style';
import { useSelector } from 'react-redux';
import GeneralListApis from '../api/GeneralListApis'
import CheckIcon from "@mui/icons-material/Check";
import MUIDataTable from "mui-datatables";


function NamePopup(props) {
  const { intl } = props;
  const {classes,cx} = useStyles();  
  const [EmployeeList, setEmployeeList] = useState([]);  
  const locale = useSelector(state => state.language.locale);
  const { handleClose,open,Key } = props;
  var SelectedRows = [];
const CloseClick = async () => {
  
  //handleClose(EmployeeList.filter((row) => row.isSelected==true));
  handleClose(SelectedRows||[]);
};

async function handleSelect(allRowsSelected) {
  try {
    SelectedRows=[];
    for (let i = 0; i < allRowsSelected.length; i++) {
      SelectedRows.push({
        id: EmployeeList[allRowsSelected[i].dataIndex].id,
        name: EmployeeList[allRowsSelected[i].dataIndex].name,
        organizationName:EmployeeList[allRowsSelected[i].dataIndex].organizationName||"",
        isSelected: true,
      });
    }
      
  } catch (err) {
    toast.error(err.message);
  }
}

const GetList = useCallback(async () => {
    try {
      
      var data=[];
      if(Key=="Employee")
      {
        data = await GeneralListApis(locale).GetEmployeeListComponent(); 
        setEmployeeList(data.map((obj) => {
          return {
              id: obj.id,
              name: obj.name,
              organizationName:obj.organizationName,
              jobName:obj.jobName,
              isSelected: false,
          }}));
      }
      else if(Key=="Job")
      {
        data = await GeneralListApis(locale).GetJobList();  
      
        setEmployeeList(data.map((obj) => {
          return {
              id: obj.id,
              name: obj.name,
              isSelected: false,
          }}));
      }

    } catch (err) {
      toast.error(err);
    }
  }, []);

 
  
  useEffect(() => {
    
    if(open)
      GetList();
  }, [open]);

  const columns = [
    {
      name: "id",
      label: <FormattedMessage {...Payrollmessages["id"]} />,
      options: {
        filter: false,
      },
    },
    {
      name: "name",
      label: <FormattedMessage {...Payrollmessages["name"]} />,
      options: {
        filter: true,
      },
    },
  ];
  if(Key=="Employee")
  {
    columns.push({
      name: "jobName",
      label: <FormattedMessage {...Payrollmessages["job"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "organizationName",
      label: <FormattedMessage {...Payrollmessages["organizationName"]} />,
      options: {
        filter: true,
      },
    },) ;
  }
  
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    page: 0,
    searchOpen: true,
    onSearchClose: () => {
      //some logic
    },
    customToolbarSelect: (selectedRows) => (
      <div>
        <Grid container spacing={1} alignItems="flex-start" direction="row">
          <Grid item xs={12} md={1}>
            
          </Grid>          
        </Grid>
      </div>
    ),
    onRowsSelect: (curRowSelected, allRowsSelected) => {
      debugger ;
      handleSelect(allRowsSelected);
    },
    
  };


  return (
    <div>
    <Dialog open={open} fullWidth
     PaperProps={{
      overflowY: "clip !important"
    }}
      maxWidth="md" onClose={()=>CloseClick()}>
        <DialogTitle>{`${Key} List`} </DialogTitle>
        <DialogContent >     
        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title=""
            data={EmployeeList}
            columns={columns}
            options={options}
          />
        </div>  
         {/* <div className={classes.rootTable}>
             <Table className={cx(css.tableCrud, classes.table, classes.stripped)} style={{minWidth:'0px'}}>
                <TableHead>
                <TableRow>             
                    <TableCell  style={{width: '5px',padding:'0px'}}>
                                              
                        <Checkbox
                            checked={EmployeeList.length > 0 &&  EmployeeList.filter((crow) => crow.isSelected==true).length === EmployeeList.length?true:false}
                            color="primary"
                            name="AllSelect"
                            indeterminate={EmployeeList.filter((crow) => crow.isSelected==true).length > 0 && EmployeeList.filter((crow) => crow.isSelected==true).length < EmployeeList.length?true:false}
                            onChange={handlecheckboxAll}
                        />
                    </TableCell>  
                    <TableCell style={{width: '5px',padding:'0px'}}><FormattedMessage {...Payrollmessages.id} /></TableCell>
                    <TableCell style={{width: '15px',padding:'0px'}}><FormattedMessage {...Payrollmessages.name}/></TableCell>                       
                </TableRow>
                </TableHead>
                <TableBody>
                {EmployeeList.length !== 0 &&
                    EmployeeList.map((row) => {
                    return (
                        <TableRow
                          hover
                          key={row.id}
                          sx={{ height: 1 }}
                          >                                                  
                          
                          <TableCell style={{width: '5px',padding:'0px'}}>
                              <Checkbox
                              checked={row.isSelected}
                              color="primary"
                              name="isselected"
                              onChange={(event) => handleEnableOne(event, row)}
                              value={row.isSelected}
                              />
                          </TableCell>  
                          <TableCell style={{width: '5px',padding:'0px'}}>{row.id}</TableCell>
                          <TableCell style={{width: '15px',padding:'0px'}}>{row.name}</TableCell>                            
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>                
          </div>*/} 
        </DialogContent>        
    </Dialog>
</div>
            
            
  );
}
  

const MemoedNamePopup = memo(NamePopup);

export default injectIntl(MemoedNamePopup);
