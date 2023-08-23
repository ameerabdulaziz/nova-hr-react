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
import {Button , Grid,TextField,Autocomplete,Checkbox,Table,
  TableBody,TableCell,TableHead,TableRow,FormControl,Tooltip, TableContainer} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import css from 'enl-styles/Table.scss';
import PropTypes from 'prop-types';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import GeneralListApis from '../../api/GeneralListApis';
import { format } from "date-fns";
import useMediaQuery from '@mui/material/useMediaQuery';
import EmloyeePopup from '../../Component/EmloyeePopup';
import useStyles from '../../Style';

import { useLocation } from "react-router-dom";



function NewsCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation()
  const { id } = location.state??0;
  const { classes,cx } = useStyles();
  const [OpenPopup, setOpenPopup] = useState(false);  
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const [data, setdata] = useState({
    "id": 0,
    "fromDate":format(new Date(), "yyyy-MM-dd"),
    "toDate":format(new Date(), "yyyy-MM-dd"),
    "header":"",
    "details":"",
    "newsTypeId":"",
    "newsTypeName":"",   
    "image":"",
    "photo":"",
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

const handlecheckAll = (event) => {  
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
        <Grid container alignItems={"initial"} spacing={3} >
            <Grid container item md={7} xs={12}  direction="row" style={{ maxHeight: '200vh' }}> 
            
              <Grid  item  md={4} xs={12}>                
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDatePicker
                          label={intl.formatMessage(Payrollmessages.fromdate)}
                          value={data.fromDate}
                          onChange={(date) => {debugger; setdata((prevFilters) => ({...prevFilters,fromDate: format(new Date(date), "yyyy-MM-dd"),}))}}
                          className={classes.field1}
                          renderInput={(params) => <TextField {...params} variant="outlined" />}
                      />
                  </LocalizationProvider>
              </Grid>
              <Grid  item  md={4} xs={12}>                
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDatePicker
                          label={intl.formatMessage(Payrollmessages.todate)}
                          value={data.toDate}
                          onChange={(date) => {debugger; setdata((prevFilters) => ({...prevFilters,toDate: format(new Date(date), "yyyy-MM-dd"),}))}}
                          className={classes.field1}
                          renderInput={(params) => <TextField {...params} variant="outlined" />}
                      />
                  </LocalizationProvider>
              </Grid>
              <Grid item md={4} xs={12}>
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
              <Grid item md={12} xs={12}>  
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
              <Grid item md={12} xs={12} >                    
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
            </Grid>
            <Grid  container item md={5} xs={12}  direction="row"> 
              <section className={classes.content}>
                <Grid item xs={12} md={12}  >
                  {data.image &&  <img  style={{width:"200px",height:"200px"}} src={URL.createObjectURL(data.image)} />}
                  {data.photo &&  <img style={{width:"200px",height:"200px"}} src={`data:image/jpeg;base64,${data.photo}`}/>}
                </Grid>
                
                <Grid item xs={12} md={12} >
                    <FormControl variant="standard" className={`${cx(classes.textField)}`}>
                      <div className={classes.actions}>     
                        <Tooltip title= "Upload">
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            component="label"
                          >
                            <AddIcon
                              className={cx(smUp && classes.leftIcon, classes.iconSmall)}
                            />
                            {smUp && ' '} Upload
                            
                            <input 
                              hidden 
                              type="file" 
                              name="file" 
                              className="custom-file-input" 
                              id="inputGroupFile" 
                              onChange={(e) => {debugger ; setdata((prevFilters) => ({
                                ...prevFilters,
                                image: e.target.files[0],
                                photo:""
                              }))}}  
                              accept="image/png, image/jpeg, image/jpg, image/apng, image/webp, image/svg+xml"
                            />
                        </Button>
                        </Tooltip>
                      </div>
                    </FormControl>                    
                </Grid>
                
                <hr className={classes.hr} />
                <Grid item xs={12} md={12}>
                  <Button variant="contained" size="medium" color="primary" onClick={handleClickOpen}>
                    <FormattedMessage {...Payrollmessages.chooseEmp} />
                  </Button>
                  <div className={classes.rootTable}>
                    <TableContainer style={{ maxHeight: 250 }}>
                      <Table className={cx(css.tableCrud, classes.table, classes.stripped)} style={{minWidth:"0px"}} >
                          <TableHead>
                          <TableRow >               
                              <TableCell  style={{width: '5px',padding:'0px'}}>                                                   
                                  <Checkbox
                                      checked={EmployeeList.length > 0 &&  EmployeeList.filter((crow) => crow.isSelected==true).length === EmployeeList.length?true:false}
                                      color="primary"
                                      name="AllSelect"
                                      indeterminate={EmployeeList.filter((crow) => crow.isSelected==true).length > 0 && EmployeeList.filter((crow) => crow.isSelected==true).length < EmployeeList.length?true:false}
                                      onChange={handlecheckAll}
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
                    </TableContainer>                   
                  </div>
                </Grid>
              </section> 
            </Grid>                
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

