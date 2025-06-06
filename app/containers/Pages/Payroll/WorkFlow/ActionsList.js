import React,{useState,useCallback,useEffect } from 'react';
import css from 'enl-styles/Table.scss';
import {Button , Grid,TextField,Table,TableBody,TableCell,TableHead,TableRow,TableContainer,Select,MenuItem  } from "@mui/material";  
import Payrollmessages from '../messages';
import messages from './messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import useStyles from '../Style';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-hot-toast';

function ActionsList(props) {
  
  const {intl,dataList,setdataList,Steps,ActionsTypeList} = props;
  const {classes,cx} = useStyles();  
  const [OpenPopup, setOpenPopup] = useState(false);

const handledelete = (event, row) => {
  
    setdataList(
        dataList.filter((x) => (x.formId != row.formId))
      );
};

const handleAdd = () => {
  
  if(Steps.length==0)
  {
    toast.error("enter steps first");
    return 
  }
  var formId=dataList.length>0?(dataList[dataList.length-1].formId)+1:1 ;
  setdataList((prev) => [...prev, {formId:formId,id:0,arName:"",enName:"",actionType:2,stepId:Steps[0].formId,stepName:Steps[0].arName,nextStepId:0,nextStepName:""}]);
}


const handleChange = (event, row) => {
  
  
  setdataList(
      dataList.map((x) => {
        if (x.formId == row.formId) {
          if (event.target.name == "arName") {
            x.arName = event.target.value;
            x.enName = event.target.value;
          } 
          if (event.target.name == "actionType") {
            x.actionType = event.target.value;
          } 
          if (event.target.name == "stepId") {
            x.stepId = event.target.value;
            x.stepName=Steps.find((ele) => ele.formId ===event.target.value).arName
          } 
          if (event.target.name == "nextStepId") {
            x.nextStepId = event.target.value??"";
            x.nextStepName=event.target.value?Steps.find((ele) => ele.formId ===event.target.value).arName:"";
          } 

        }
        return x;
      })
    );
};

  return (
      <div>
      
        <div>
            <Grid container spacing={3}>            
               
                <Grid item xs={6} md={12}>
                  <label style={{fontWeight:"bold",fontSize:"20px",marginRight:"30px"}}>{"WorkFlow Actions"}</label>
                  
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
                        <TableCell style={{width: '20px',padding:'0px',textAlign:'center'}}><FormattedMessage {...messages.step} /></TableCell>
                        <TableCell style={{width: '20px',padding:'0px',textAlign:'center'}}><FormattedMessage {...messages.actionType} /></TableCell>
                        <TableCell style={{width: '20px',padding:'0px',textAlign:'center'}}><FormattedMessage {...messages.nextStep} /></TableCell>
                        <TableCell style={{width: '5px',padding:'0px',textAlign:'center'}}></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {dataList.length !== 0 &&
                        dataList.map((row) => {
                        return (
                          
                            <TableRow hover key={row.formId} sx={{ height: 1 }} style={{padding:'0px'}}> 
                              <TableCell style={{width: '5px',padding:'0px',textAlign:'center'}}>{row.formId}</TableCell>
                              <TableCell style={{width: '5px',padding:'0px',textAlign:'center'}}>
                                <TextField
                                  style={{width:'200px'}}
                                  id="arName"
                                  name="arName"
                                  value={row.arName}
                                  onChange={(e) => handleChange(e,row)}                        
                                  label={""}                                 
                                  variant="outlined"
                                  autoComplete='off'
                                  />
                              </TableCell>                                                         
                              <TableCell style={{width: '20px',padding:'0px',textAlign:'center'}}>
                                <Select
                                  style={{width:'200px'}}
                                  id="stepId"
                                  name="stepId"
                                  variant="outlined"
                                  value={row.stepId}
                                  onChange={(e) => handleChange(e,row)}    
                                  > 
                                  {Steps.length !== 0 &&
                                  Steps.map((model,index) => {                      
                                    return  <MenuItem key={index} value={model.formId}>{model.arName}</MenuItem>
                                  })}
                                </Select>
                              </TableCell>  
                              <TableCell style={{width: '20px',padding:'0px',textAlign:'center'}}>
                                <Select
                                
                                  style={{width:'150px'}}
                                  id="actionType"
                                  name="actionType"
                                  variant="standard"
                                  value={row.actionType}
                                  onChange={(e) => handleChange(e,row)}    
                                 >                           
                                  {ActionsTypeList.length !== 0 &&
                                  ActionsTypeList.map((model,index) => {                      
                                    return  <MenuItem key={index} value={model.id}>{model.name}</MenuItem>
                                  })}
                                </Select>
                              </TableCell>  
                              <TableCell style={{width: '20px',padding:'0px',textAlign:'center'}}>
                                <Select
                                  style={{width:'200px'}}
                                  id="nextStepId"
                                  name="nextStepId"
                                  variant="standard"
                                  value={row.nextStepId==null?0:row.nextStepId}
                                  onChange={(e) => handleChange(e,row)}    
                                  > 
                                  <MenuItem value={0}>
                                      <em></em>
                                  </MenuItem>
                                  {Steps.length !== 0 &&
                                  Steps.map((model,index) => {                      
                                    return  <MenuItem key={index} value={model.formId}>{model.arName}</MenuItem>
                                  })}
                                </Select>
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
  
export default injectIntl(ActionsList);