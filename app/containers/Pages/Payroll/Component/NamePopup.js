import React,{useState,useCallback,useEffect } from 'react';
import css from 'enl-styles/Table.scss';
import { Dialog,DialogContent,DialogTitle,Checkbox,Table,TableBody,TableCell,TableHead,TableRow } from "@mui/material";  
import Payrollmessages from '../messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import { toast } from 'react-hot-toast';
import useStyles from '../Style';
import { useSelector } from 'react-redux';
import GeneralListApis from '../api/GeneralListApis';


function NamePopup(props) {
  
  const {classes,cx} = useStyles();  
  const [EmployeeList, setEmployeeList] = useState([]);  
  const locale = useSelector(state => state.language.locale);
  const { handleClose,open,Key } = props;

const CloseClick = async (key) => {
 
  debugger ;
  
  handleClose(EmployeeList.filter((row) => row.isSelected==true));
};

const handlepermcheckboxAll = (event) => {
setEmployeeList(  
  EmployeeList.map((x) => {    
        x.isSelected = event.target.checked;
    return x;
    })
);
};
const handleEnableOne = (event, row) => {  
    setEmployeeList(
        EmployeeList.map((x) => {
          if (x.id == row.id) {
              x.isSelected = event.target.checked;
          }
          return x;
        })
      );
};
const GetEmployeeList = useCallback(async () => {
    try {
      
      var data=[];
      if(Key=="Employee")
        data = await GeneralListApis(locale).GetEmployeeList(); 
      else if(Key=="Job")
        data = await GeneralListApis(locale).GetJobList();   
      
      setEmployeeList(data.map((obj) => {
        return {
            id: obj.id,
            name: obj.name,
            isSelected: false,
        }}));

    } catch (err) {
      toast.error(err);
    }
  }, []);

 
  
  useEffect(() => {
    debugger;
    if(open)
      GetEmployeeList();
  }, [open]);

  return (
    <div>
    <Dialog open={open} onClose={()=>CloseClick()}>
        <DialogTitle>{`${Key} List`} </DialogTitle>
        <DialogContent>       
          <div className={classes.rootTable}>
            <Table className={cx(css.tableCrud, classes.table, classes.stripped)} style={{minWidth:'0px'}}>
                <TableHead>
                <TableRow>             
                    <TableCell  style={{width: '5px',padding:'0px'}}>
                                              
                        <Checkbox
                            checked={EmployeeList.length > 0 &&  EmployeeList.filter((crow) => crow.isSelected==true).length === EmployeeList.length?true:false}
                            color="primary"
                            name="AllSelect"
                            indeterminate={EmployeeList.filter((crow) => crow.isSelected==true).length > 0 && EmployeeList.filter((crow) => crow.isSelected==true).length < EmployeeList.length?true:false}
                            onChange={handlepermcheckboxAll}
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
          </div>
        </DialogContent>        
    </Dialog>
</div>
            
            
  );
}
  
export default injectIntl(NamePopup);