import React,{useState,useCallback,useEffect } from 'react';
import css from 'enl-styles/Table.scss';
import { Dialog,DialogContent,DialogTitle,Checkbox,Table,TableBody,TableCell,TableHead,TableRow } from "@mui/material";  
import Payrollmessages from '../messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import { toast } from 'react-hot-toast';
import useStyles from '../Style';
import { useSelector } from 'react-redux';
import GeneralListApis from '../api/GeneralListApis';


function JobPopup(props) {
  
  const {intl} = props;
  const {classes,cx} = useStyles();  
  const [dataList, setdataList] = useState([]);
  const [JobList, setJobList] = useState([]);  
  const locale = useSelector(state => state.language.locale);
  const { handleClose,open } = props;

const CloseClick = async (key) => {
 
  debugger ;
  
  handleClose(JobList.filter((row) => row.isSelected==true));
};

const handlepermcheckboxAll = (event) => {
setJobList(  
  JobList.map((x) => {    
        x.isSelected = event.target.checked;
    return x;
    })
);
};
const handleEnableOne = (event, row) => {  
    setJobList(
        JobList.map((x) => {
          if (x.id == row.id) {
              x.isSelected = event.target.checked;
          }
          return x;
        })
      );
};
const GetJobList = useCallback(async () => {
    try {
      
    const Jobs = await GeneralListApis(locale).GetJobList(locale);   
    
    setJobList(Jobs.map((obj) => {
      return {
          ...obj,
          isSelected: false,
      }}));

    } catch (err) {
      toast.error(err);
    }
  }, []);

 
  
  useEffect(() => {
    debugger;
    if(open)
      GetJobList();
  }, [open]);

  return (
    <div>
    <Dialog open={open} onClose={()=>CloseClick()}>
        <DialogTitle>Job List</DialogTitle>
        <DialogContent>       
          <div className={classes.rootTable}>
            <Table className={cx(css.tableCrud, classes.table, classes.stripped)} style={{minWidth:'0px'}}>
                <TableHead>
                <TableRow>             
                    <TableCell  style={{width: '5px',padding:'0px'}}>
                                              
                        <Checkbox
                            checked={JobList.length > 0 &&  JobList.filter((crow) => crow.isSelected==true).length === JobList.length?true:false}
                            color="primary"
                            name="AllSelect"
                            indeterminate={JobList.filter((crow) => crow.isSelected==true).length > 0 && JobList.filter((crow) => crow.isSelected==true).length < JobList.length?true:false}
                            onChange={handlepermcheckboxAll}
                        />
                    </TableCell>  
                    <TableCell style={{width: '5px',padding:'0px'}}><FormattedMessage {...Payrollmessages.id} /></TableCell>
                    <TableCell style={{width: '15px',padding:'0px'}}><FormattedMessage {...Payrollmessages.name}/></TableCell>                       
                </TableRow>
                </TableHead>
                <TableBody>
                {JobList.length !== 0 &&
                    JobList.map((row) => {
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
  
export default injectIntl(JobPopup);