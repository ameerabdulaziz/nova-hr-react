import React,{useState,useCallback,useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import { PapperBlock } from 'enl-components';
import css from 'enl-styles/Table.scss';
import SearchIcon from '@mui/icons-material/Search';
import {
    Button ,
    Grid,
    TextField,
    Autocomplete,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
  } from "@mui/material";
  
import Payrollmessages from '../../messages';
import messages from '../messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import DirectMangerData from '../api/DirectMangerData';
import { toast } from 'react-hot-toast';
import useStyles from '../../../../../components/Tables/tableStyle-jss';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import GeneralListApis from '../../api/GeneralListApis';
import EmloyeePopup from '../../General/EmloyeePopup';
import AddIcon from '@mui/icons-material/Add';

function DirectManager(props) {
  
  const {intl} = props;
  const {classes,cx} = useStyles();  
  const [dataList, setdataList] = useState([]);
  const [employee, setEmployee] = useState();  
  const [employeeList, setEmployeeList] = useState([]);  
  const [selectedEmployees, setSelectedEmployees] = useState([]);    
  const locale = useSelector(state => state.language.locale);
  const [OpenPopup, setOpenPopup] = useState(false);
  
  const handleClose = (data) => {   

    debugger;
     data.map((row) =>{
    if (!dataList.includes(row)) {
      setdataList((prev) => [...prev, row]);
    }
    });
    setOpenPopup(false);
  }
  
  const handleClickOpen = () => {
    debugger;
      setOpenPopup(true);
  }

const handlepermcheckboxAll = (event) => {  
setdataList(  
  dataList.map((x) => {    
    x.isSelected = event.target.checked;
    return x;
  }));

};


const handleEnableOne = (event, row) => {
  
    setdataList(
        dataList.map((x) => {
          if (x.menuID == row.menuID) {
            if (event.target.name == "isselected") {
              x.isSelected = event.target.checked;
            } 
          }
          return x;
        })
      );

    
};

async function on_submit() {
    if (!employee){
      toast.error("Please Select Employee")
      return
    }
    try {
      let response = await  DirectMangerData().Save({
        'employee':employee,
        'dataList':dataList,
      });
      
      if (response.status==200) {
        toast.success(notif.saved);
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(notif.error);
    }
  }

  const GetList = useCallback(async () => {
    try {
      if (!employee){
        setdataList([]);
        return
      }
      const data = await DirectMangerData().GetList(locale,employee);
      setdataList(data || []);
    } catch (err) {
      toast.error(err);
    }
  });


  const GetEmployeeList = useCallback(async () => {
    try {
      
    const employees = await GeneralListApis(locale).GetEmployeeList(locale);
    setEmployeeList(employees);

    } catch (err) {
      toast.error(err);
    }
  }, []);

  useEffect(() => {    
    GetList();
  }, [employee]);

  useEffect(() => {
    GetEmployeeList();
  }, []);

  return (
      <PapperBlock whiteBg icon="border_color" title="" desc="">
        <EmloyeePopup
            handleClose={handleClose}            
            open={OpenPopup}
        />
        <div>
            <Grid container spacing={3}>            
                <Grid item xs={6} md={3}>
                    <Autocomplete
                        id="ddlEmp"                        
                        options={employeeList}                        
                        getOptionLabel={(option) =>option.name}
                        onChange={(event, value) => {
                          debugger ;
                            if (value !== null) {
                                setEmployee(value.id);
                            } else {
                                setEmployee(null);
                            }
                            
                        }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="employee"
                            value={employee}
                            label={intl.formatMessage(Payrollmessages.chooseEmp)}
                        />
                        )}
                    />
                </Grid>
                <Grid item xs={6} md={2}>
                  <Button variant="outlined" onClick={()=>handleClickOpen()}>
                      <AddIcon />
                  </Button>
                </Grid>            
                <Grid item xs={6} md={2}>                   
                    <Button variant="contained" size="medium" color="primary" onClick={on_submit} >
                    <FormattedMessage {...Payrollmessages.save} />
                    </Button>
                </Grid>   
            </Grid>
            <div className={classes.rootTable}>
                <Table className={cx(css.tableCrud, classes.table, classes.stripped)}>
                    <TableHead>
                    <TableRow>               
                        <TableCell ><FormattedMessage {...messages.employeeName} /></TableCell>
                        <TableCell ><FormattedMessage {...Payrollmessages.id}/></TableCell>
                        <TableCell ><FormattedMessage {...messages.organization}/></TableCell>
                        <TableCell  style={{textWrap: 'balance',width: '70px',textAlign:'center'}}>
                            <FormattedMessage {...Payrollmessages.delete}/>                        
                            <Checkbox
                                checked={dataList.length > 0 &&  dataList.filter((crow) => crow.isSelected==true).length === dataList.length?true:false}
                                color="primary"
                                name="AllSelect"
                                indeterminate={dataList.filter((crow) => crow.isSelected==true).length > 0 && dataList.filter((crow) => crow.isSelected==true).length < dataList.length?true:false}
                                onChange={handlepermcheckboxAll}
                            />
                        </TableCell>                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {dataList.length !== 0 &&
                        dataList.map((row) => {
                        return (
                            <TableRow
                            hover
                            key={row.menuID}
                            sx={{ height: 1 }}
                            >
                            <TableCell>{row.name}</TableCell>                            
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.organizationName}</TableCell>
                            <TableCell>
                                <Checkbox
                                checked={row.isSelected}
                                color="primary"
                                name="isselected"
                                onChange={(event) => handleEnableOne(event, row)}
                                value={row.isSelected}
                                />
                            </TableCell>                            
                            </TableRow>
                        );
                        })}
                    </TableBody>
                </Table>
                 
            </div>
        </div>       
      </PapperBlock>
  );
}
  
export default injectIntl(DirectManager);