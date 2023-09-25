import React,{useState,useCallback,useEffect } from 'react';
import { PapperBlock } from 'enl-components';
import css from 'enl-styles/Table.scss';
import {Button , Grid,TextField,Autocomplete,Checkbox,Table,TableBody,TableCell,TableHead,TableRow} from "@mui/material";  
import Payrollmessages from '../../messages';
import messages from '../messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import DirectMangerData from '../api/DirectMangerData';
import { toast } from 'react-hot-toast';
import useStyles from '../../Style';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import GeneralListApis from '../../api/GeneralListApis';
import NamePopup from '../../Component/NamePopup';

function DirectManager(props) {
  
  const {intl} = props;
  const {classes,cx} = useStyles();  
  const [dataList, setdataList] = useState([]);
  const [employee, setEmployee] = useState();  
  const [employeeList, setEmployeeList] = useState([]);  
  const locale = useSelector(state => state.language.locale);
  const [OpenPopup, setOpenPopup] = useState(false);
  const Title = localStorage.getItem("MenuName");
  
  
  const handleClose = (data) => {   

    
     data.map((row) =>{
      if(dataList.filter((x) => x.id==row.id).length == 0)
      {
        setdataList((prev) => [...prev, row]);
      }
    });
    setOpenPopup(false);
  }
  
  const handleClickOpen = () => {
    
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
          if (x.id == row.id) {
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
        GetList();
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
      setdataList(data.map((obj) => {
        return {
            ...obj,
            isSelected: true,
        }}) || []);
    } catch (err) {
      toast.error(err);
    }
  });


  const GetEmployeeList = useCallback(async () => {
    try {
      
    const employees = await GeneralListApis(locale).GetEmployeeList();
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
      <PapperBlock whiteBg icon="border_color" title={Title}  desc="">
        <NamePopup
            handleClose={handleClose}            
            open={OpenPopup}
            Key={"Employee"}
        />
        <div>
            <Grid container spacing={3}>            
                <Grid item xs={6} md={3}>
                    <Autocomplete
                        id="ddlEmp"                        
                        options={employeeList}                        
                        getOptionLabel={(option) =>option.name}
                        onChange={(event, value) => {
                          
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
                  <Button variant="contained" size="medium" color="primary" onClick={handleClickOpen}>
                  <FormattedMessage {...Payrollmessages.chooseEmp} />
                  </Button>
                </Grid>            
                <Grid item xs={6} md={2}>                   
                    <Button variant="contained" size="medium" color="primary" onClick={on_submit} >
                      <FormattedMessage {...Payrollmessages.save} />
                    </Button>
                </Grid>   
            </Grid>
            <div className={classes.rootTable}>
                <Table className={cx(css.tableCrud, classes.table, classes.stripped)} >
                    <TableHead>
                    <TableRow >               
                        <TableCell  style={{width: '5px',padding:'0px'}}>                                                   
                            <Checkbox
                                checked={dataList.length > 0 &&  dataList.filter((crow) => crow.isSelected==true).length === dataList.length?true:false}
                                color="primary"
                                name="AllSelect"
                                indeterminate={dataList.filter((crow) => crow.isSelected==true).length > 0 && dataList.filter((crow) => crow.isSelected==true).length < dataList.length?true:false}
                                onChange={handlepermcheckboxAll}
                            />
                        </TableCell>   
                        <TableCell style={{width: '5px',padding:'0px'}}><FormattedMessage {...Payrollmessages.id}/></TableCell>
                        <TableCell style={{width: '20px',padding:'0px'}}><FormattedMessage {...messages.employeeName} /></TableCell>
                        <TableCell style={{width: '20px',padding:'0px'}}><FormattedMessage {...messages.organization}/></TableCell>
                                             
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {dataList.length !== 0 &&
                        dataList.map((row) => {
                        return (
                          
                            <TableRow hover key={row.id} sx={{ height: 1 }} style={{padding:'0px'}}> 
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
                              <TableCell style={{width: '20px',padding:'0px'}}>{row.name}</TableCell>   
                              <TableCell style={{width: '20px',padding:'0px'}}>{row.organizationName}</TableCell>
                                                    
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