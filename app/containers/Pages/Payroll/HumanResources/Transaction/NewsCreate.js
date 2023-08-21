import React, { useState, useEffect, useCallback } from 'react';

import { PapperBlock } from 'enl-components';
import ApiData from '../api/NewsData';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import { useParams ,useHistory } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import {Button , Grid,TextField,Autocomplete,Checkbox,Table,TableBody,TableCell,TableHead,TableRow} from "@mui/material";  

import css from 'enl-styles/Table.scss';
import useStyles from '../../../../../components/Tables/tableStyle-jss';
import PropTypes from 'prop-types';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import GeneralListApis from '../../api/GeneralListApis';
import { format } from "date-fns";

import EmloyeePopup from '../../Component/EmloyeePopup';



function NewsCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  let { id } = useParams();
  const { classes,cx } = useStyles();
  const [OpenPopup, setOpenPopup] = useState(false);
  
  const [data, setdata] = useState({
    "id": 0,
    "fromDate":format(new Date(), "yyyy-MM-dd"),
    "toDate":format(new Date(), "yyyy-MM-dd"),
    "header":"",
    "details":"",
    "newsTypeId":"",
    "newsTypeName":"",   
  });
  const [TypeList, setTypeList] = useState([]);
  const [EmployeeList, setEmployeeList] = useState([]);
  const history=useHistory();  

  const handleSubmit = async (e) => {
    
    e.preventDefault();   
    try{
      debugger;  
      let response = await  ApiData(locale).Save(data,EmployeeList);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/NewsList`);
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  }
  async function oncancel(){
    history.push(`/app/Pages/HR/NewsList`);
  }

  async function fetchData() {
    debugger ;
    
    const types = await GeneralListApis(locale).GetNewsTypeList(locale);
    setTypeList(types);
    
    if(id)
    {
        const result = await ApiData(locale).Get(id??0); 
        if(result.employees)
        {  
            setEmployeeList(result.employees.map((obj) => {
                return {
                    ...obj,
                    isSelected:true
                }
            })) 
        }
        setdata(result);
    }
  }
  
  useEffect(() => {    
    fetchData();
  }, []);

  const handleClose = (data) => {   

    debugger;
     data.map((row) =>{
      if( EmployeeList.filter((x) => x.id==row.id).length == 0)
      {
        setEmployeeList((prev) => [...prev, {"id":row.id,"name":row.name,"isSelected":row.isSelected}]);
      }
    });
    setOpenPopup(false);
  }
  
  const handleClickOpen = () => {
    debugger;
      setOpenPopup(true);
  }

const handlepermcheckboxAll = (event) => {  
setEmployeeList(  
  EmployeeList.map((x) => {    
    x.isSelected = event.target.checked;
    return x;
  }));

};


const handleEnableOne = (event, row) => {
  
    setEmployeeList(
        EmployeeList.map((x) => {
          if (x.id == row.id) {
            if (event.target.name == "isselected") {
              x.isSelected = event.target.checked;
            } 
          }
          return x;
        })
      );
};

  return (
    <div>
        <PapperBlock whiteBg icon="border_color" title={data.id==0?intl.formatMessage(messages.NewsCreateTitle):intl.formatMessage(messages.NewsUpdateTitle)} desc={""}>
        <EmloyeePopup
            handleClose={handleClose}            
            open={OpenPopup}
        />
        <form onSubmit={handleSubmit}>
            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                <Grid item xs={12}  md={4}>                
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            label={intl.formatMessage(Payrollmessages.fromdate)}
                            value={data.fromDate}
                            onChange={(date) => {debugger; setdata((prevFilters) => ({...prevFilters,fromDate: format(new Date(date), "yyyy-MM-dd"),}))}}
                            className={classes.field}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}  md={4}>                
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            label={intl.formatMessage(Payrollmessages.todate)}
                            value={data.toDate}
                            onChange={(date) => {debugger; setdata((prevFilters) => ({...prevFilters,toDate: format(new Date(date), "yyyy-MM-dd"),}))}}
                            className={classes.field}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Autocomplete  
                        id="newsTypeId"                        
                        options={TypeList}  
                        value={{id:data.newsTypeId,name:data.newsTypeName}}     
                        isOptionEqualToValue={(option, value) =>
                            value.id === 0 || value.id === "" ||option.id === value.id
                        }                 
                        getOptionLabel={(option) =>
                        option.name ? option.name : ""
                        }
                        onChange={(event, value) => {
                                setdata((prevFilters) => ({
                                ...prevFilters,
                                newsTypeId:(value !== null)?value.id:0,
                                newsTypeName:(value !== null)?value.name:""
                                }));
                                  
                             }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="newsTypeId"
                            required                              
                            label={intl.formatMessage(Payrollmessages.type)}
                            />
                        )}
                    />  
                </Grid>
                <Grid item xs={12} md={8}>  
                    <TextField
                        id="title"
                        name="title"
                        value={data.header}               
                        label={intl.formatMessage(Payrollmessages.title)}
                        className={classes.field}
                        variant="outlined"
                        onChange={(e) => setdata((prevFilters) => ({
                            ...prevFilters,
                            header: e.target.value,
                          }))}  
                    />                  
                    
                </Grid>
                <Grid item xs={12} md={8}>                    
                    <TextField
                    id="details"
                    name="details"
                    multiline
                    required
                    rows={2}
                    value={data.details}
                    onChange={(e) => setdata((prevFilters) => ({
                        ...prevFilters,
                        details: e.target.value,
                      }))}                        
                    label={intl.formatMessage(Payrollmessages.details)}
                    className={classes.field}
                    variant="outlined"
                    />
                </Grid>
                <Grid item xs={6} md={4}></Grid>
                <Grid item xs={6} md={2}>
                  <Button variant="contained" size="medium" color="primary" onClick={handleClickOpen}>
                  <FormattedMessage {...Payrollmessages.chooseEmp} />
                  </Button>
                </Grid> 
                <Grid item xs={6} md={10}></Grid>
                <Grid item xs={12} md={8}>
                    <div className={classes.rootTable}>
                    <Table className={cx(css.tableCrud, classes.table, classes.stripped)} >
                        <TableHead>
                        <TableRow >               
                            <TableCell  style={{width: '5px',padding:'0px'}}>                                                   
                                <Checkbox
                                    checked={EmployeeList.length > 0 &&  EmployeeList.filter((crow) => crow.isSelected==true).length === EmployeeList.length?true:false}
                                    color="primary"
                                    name="AllSelect"
                                    indeterminate={EmployeeList.filter((crow) => crow.isSelected==true).length > 0 && EmployeeList.filter((crow) => crow.isSelected==true).length < EmployeeList.length?true:false}
                                    onChange={handlepermcheckboxAll}
                                />
                            </TableCell>   
                            <TableCell style={{width: '5px',padding:'0px'}}><FormattedMessage {...Payrollmessages.id}/></TableCell>
                            <TableCell style={{width: '20px',padding:'0px'}}><FormattedMessage {...messages.employeeName} /></TableCell>
                                                                         
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {EmployeeList.length !== 0 &&
                            EmployeeList.map((row) => {
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
                                                      
                                </TableRow>
                            );
                            })}
                        </TableBody>
                    </Table>
                    
                    </div>
                </Grid>
                <Grid item xs={6} md={4}></Grid>
                <Grid item xs={12} md={1}>                  
                    <Button variant="contained" type="submit" size="medium" color="primary" >
                       <FormattedMessage {...Payrollmessages.save} /> 
                    </Button>
                </Grid>
                <Grid item xs={12} md={1}>
                    <Button variant="contained" size="medium" color="primary" onClick={oncancel} >
                       <FormattedMessage {...Payrollmessages.cancel} /> 
                    </Button>
                </Grid>
                

            </Grid>            
        </form>
        </PapperBlock>
    
    </div>
  );
}
NewsCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(NewsCreate);

