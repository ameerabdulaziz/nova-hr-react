import React,{useState,useCallback,useEffect } from 'react';
import css from 'enl-styles/Table.scss';
import {Button , Grid,TextField,Table,TableBody,Typography,TableCell,TableHead,TableRow,TableContainer,Select,MenuItem  } from "@mui/material";  
import Payrollmessages from '../messages';
import messages from './messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import useStyles from '../Style';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import StepsTarget from './StepsTarget';

function StepsList(props) {
  
  const {intl,dataList,setdataList} = props;
  const {classes,cx} = useStyles();  
  const [OpenPopup, setOpenPopup] = useState(false);
  const [Selectedid, setSelectedid] = useState(0);
  const [stepsemployeeList, setstepsemployeeList] = useState([]);
  const [stepsjobList, setstepsjobList] = useState([]);

  const handleClosePopUp = () => {   
    
    
    setdataList(
      dataList.map((x) => {
        if (x.id == Selectedid) {
            x.stepsEmployeeList = stepsemployeeList.filter((row) => row.isSelected==true);
            x.stepsJobList = stepsjobList.filter((row) => row.isSelected==true);
        }
        return x;
      })
    );
    setOpenPopup(false);
  }
  const handleOpenPopUp = (event, row) => {
    
    setSelectedid(row.id);
    var rowEmployeeList = dataList.find((x) => x.id==row.id).stepsEmployeeList ; 
    if(rowEmployeeList !=null && rowEmployeeList!==undefined)
    {
      if(Object.hasOwn(rowEmployeeList, 'isSelected'))
        setstepsemployeeList(rowEmployeeList)
      else
      {
        setstepsemployeeList(rowEmployeeList?rowEmployeeList.map((obj) => {
          return {
              ...obj,
              isSelected: true,
          }}):[]);
      }
   }
   else
      setstepsemployeeList([]);  

    var rowJobList =dataList.find((x) => x.id==row.id).stepsJobList;
    if(rowJobList !=null && rowJobList!==undefined)
    {
      if(Object.hasOwn(rowJobList, 'isSelected'))
        setstepsjobList(rowJobList)
      else
      {
        setstepsjobList(rowJobList?rowJobList.map((obj) => {
          return {
              ...obj,
              isSelected: true,
          }}):[]);
      }
   }
   else
      setstepsjobList([]);

    setOpenPopup(true);
  }
const handledelete = (event, row) => {
  
    setdataList(
        dataList.filter((x) => (x.id != row.id))
      );
};

const handleAdd = () => {
  
  setdataList((prev) => [...prev, {id:(dataList.length)+1,arName:"",approvalType:1}]);
}


const handleChange = (event, row) => {
  
  
  setdataList(
      dataList.map((x) => {
        if (x.id == row.id) {
          if (event.target.name == "arName") {
            x.arName = event.target.value;
            x.enName = event.target.value;
          } 
          if (event.target.name == "approvalType") {
            x.approvalType = event.target.value;
          } 
        }
        return x;
      })
    );
};

  return (    
      <div>
        <StepsTarget 
        handleClose={handleClosePopUp}  
        open={OpenPopup} 
        stepsemployeeList={stepsemployeeList}
        setstepsemployeeList={setstepsemployeeList} 
        stepsjobList={stepsjobList} 
        setstepsjobList={setstepsjobList} ></StepsTarget>
        <div>
            <Grid container spacing={3} alignItems="flex-start"direction="row">            
               
                <Grid item xs={6} md={12}>
                  <label style={{fontWeight:"bold",fontSize:"20px",marginRight:"30px"}}>{"WorkFlow Steps"}</label>
                  
                  <Button variant="contained" size="medium" color="primary" onClick={handleAdd}>
                  <FormattedMessage {...Payrollmessages.add}/>
                  </Button>
                </Grid>            
               
            </Grid>
            <div className={classes.rootTable}>
            <TableContainer style={{ maxHeight: 420}}>
                <Table className={cx(css.tableCrud, classes.table, classes.stripped)} >
                    <TableHead>
                    <TableRow >               
                        
                        <TableCell style={{width: '5px',padding:'0px',textAlign:'center'}}><FormattedMessage {...Payrollmessages.id}/></TableCell>
                        <TableCell style={{width: '20px',padding:'0px',textAlign:'center'}}><FormattedMessage {...Payrollmessages.name} /></TableCell>
                        <TableCell style={{width: '20px',padding:'0px',textAlign:'center'}}><FormattedMessage {...messages.approval} /></TableCell>
                        <TableCell style={{width: '5px',padding:'0px',textAlign:'center'}}></TableCell>
                        <TableCell style={{width: '5px',padding:'0px',textAlign:'center'}}></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {dataList.length !== 0 &&
                        dataList.map((row) => {
                        return (
                          
                            <TableRow hover key={row.id} sx={{ height: 1 }} style={{padding:'0px'}}> 
                              <TableCell style={{width: '5px',padding:'0px',textAlign:'center'}}>{row.id}</TableCell>
                              <TableCell style={{width: '5px',padding:'0px',textAlign:'center'}}>
                                <TextField
                                  style={{width:'400px'}}
                                  id="arName"
                                  name="arName"
                                  value={row.arName}
                                  onChange={(e) => handleChange(e,row)}                        
                                  label={""}                                 
                                  variant="outlined"
                                  />
                              </TableCell>                                                         
                              
                              <TableCell style={{width: '20px',padding:'0px',textAlign:'center'}}>
                                <Select
                                  style={{width:'150px'}}
                                  id="approvalType"
                                  name="approvalType"
                                  variant="outlined"
                                  value={row.approvalType}
                                  onChange={(e) => handleChange(e,row)}    
                                 >                                
                                  <MenuItem value={1}>one</MenuItem>
                                  <MenuItem value={2}>All</MenuItem>
                                </Select>
                              </TableCell>  
                              <TableCell>
                                <IconButton
                                  style={{padding:'0px',margin:'0px'}}
                                  className={classes.button}
                                  aria-label="Delete"
                                  size="large"
                                  onClick={(e) => handleOpenPopUp(e,row)} 
                                >
                                  <AddIcon />
                                </IconButton>
                              </TableCell>      
                                  
                              <TableCell>
                                <IconButton
                                  style={{padding:'0px',margin:'0px'}}
                                  className={classes.button}
                                  aria-label="Delete"
                                  size="large"
                                  onClick={(e) => handledelete(e,row)} 
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>                                                
                            </TableRow>
                        );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
                 
            </div>
        </div>       
      </div>
  );
}
  
export default injectIntl(StepsList);