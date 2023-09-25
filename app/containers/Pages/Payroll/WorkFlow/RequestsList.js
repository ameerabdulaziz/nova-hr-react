import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import ApiData from './api/WorkFlowData';
import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Payrollmessages from '../messages';
import messages from './messages';
import { useHistory,Link} from "react-router-dom";
import style from '../../../../../app/styles/styles.scss';
import IconButton from '@mui/material/IconButton';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import useStyles from '../Style';
import { PapperBlock } from 'enl-components';
import {Button ,Grid,TextField, Autocomplete  } from '@mui/material';
import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import GeneralListApis from '../api/GeneralListApis';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { format } from "date-fns";


function RequestsList(props) {
  
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [cols, setCols] = useState([]);
  const [DocumentList, setDocumentList] = useState([]);  
  const [Document, setDocument] = useState({"documentId":0,"documentName":""});  
  const [fromdate, setfromate] = useState(null);
  const [todate, settodate] = useState(null);
  const [employee, setemployee] = useState(null);
  const [EmployeeList, setEmployeeList] = useState([]);
  
  const handleSearch = async (e) => {
    
    try{
        
      const dataApi = await ApiData(locale).Getrequests(Document.documentId,employee,fromdate,todate);
      setdata(dataApi);
      dataApi.map(item => (
        setCols(Object.keys(item))
    ));
    } catch (err) {
      toast.error(err.response.data);
    }
  }
  async function RequestAction(executionId,actionTypeId) {
  
    try {
     
      let response = await  ApiData(locale).ExecuteWorkFlow(executionId,actionTypeId);

      if (response.status==200) {
        toast.success(notif.saved);
        handleSearch();
      }
    } catch (err) {
      toast.error(notif.error);
    }
  }
  async function fetchData() {
    const Documents = await GeneralListApis(locale).GetDocumentList(locale);
    setDocumentList(Documents);
    setDocument({"documentId":Documents[0].id,"documentName":Documents[0].name});

    const employees = await GeneralListApis(locale).GetEmployeeList();
    setEmployeeList(employees);

    const dataApi = await ApiData(locale).Getrequests(Documents[0].id,employee,fromdate,todate);
    setdata(dataApi);
    dataApi.map(item => (
      setCols(Object.keys(item))
  ))
  }
  useEffect(() => {    
    fetchData();
  }, []);
  
  const columns =  cols.length !== 0?
  cols.map(item => (
   {
      name: item,
      label:  <FormattedMessage {...Payrollmessages[item]} />,
      options: {
        filter: true,
      }
   }
  )) : [];
  const action={
    name: 'Actions',
    options: {
      filter: false,

      customBodyRender: (value, tableMeta) => {
        console.log('tableMeta =', tableMeta);
        return (
          <div className={style.actionsSty}>
            <IconButton
              color="success" /* #2196f3 */
              aria-label="Approve"
              size="large"
              onClick={() => RequestAction(tableMeta.rowData[0],2)}
            >
              <DoneOutlineRoundedIcon/>
            </IconButton>

            <IconButton
              color="error"
              aria-label="Reject"
              size="large"
              onClick={() => RequestAction(tableMeta.rowData[0],3)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        );
      },
    },
  } ;

  if(columns.length>0)
    columns.push(action) ;

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 10,
    page: 0,
    searchOpen: false,
    onSearchClose: () => {
      //some logic
    },
    
  };

  
  return (
    <PapperBlock whiteBg icon="border_color" title={Title} desc=""> 
      <div>
      <Grid
          container
          spacing={3}>
          
          <Grid item xs={12}  md={2}>                
              <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                      label={intl.formatMessage(Payrollmessages.fromdate)}
                      value={fromdate}
                      onChange={(date) => { setfromate(date==null?null: format(new Date(date), "yyyy-MM-dd"))}}
                      className={classes.field}
                      renderInput={(params) => <TextField {...params} variant="outlined" />}
                  />
              </LocalizationProvider>
          </Grid>
          <Grid item xs={12}  md={2}>                
            <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                      label={intl.formatMessage(Payrollmessages.todate)}
                      value={todate}
                      onChange={(date) => { settodate(date==null?null: format(new Date(date), "yyyy-MM-dd"))}}
                      className={classes.field}
                      renderInput={(params) => <TextField {...params} variant="outlined" />}
                  />
              </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={3}>
              <Autocomplete  
                  id="employeeId"                        
                  options={EmployeeList}    
                  isOptionEqualToValue={(option, value) =>
                      value.id === 0 || value.id === "" ||option.id === value.id
                  }                 
                  getOptionLabel={(option) =>
                  option.name ? option.name : ""
                  }
                  onChange={(event, value) =>{ setemployee(value==null?null:value.id)} }
                  renderInput={(params) => (
                  <TextField
                      variant="outlined"                            
                      {...params}
                      name="employeeId"
                      required                              
                      label={intl.formatMessage(Payrollmessages.employeeName)}
                      />
                  )}
              />  
          </Grid>
          <Grid item xs={12} md={3}>
              <Autocomplete  
                  id="documentId"                        
                  options={DocumentList}   
                  value={{id:Document.documentId,name:Document.documentName}}     
                  isOptionEqualToValue={(option, value) =>
                      value.id === 0 || value.id === "" ||option.id === value.id
                  }                 
                  getOptionLabel={(option) =>
                  option.name ? option.name : ""
                  }
                  onChange={(event, value) =>{ setDocument({"documentId":value==null?null:value.id,"documentName":value==null?null:value.name});}}
                  renderInput={(params) => (
                  <TextField
                      variant="outlined"                            
                      {...params}
                      name="documentId"
                      required                              
                      label={intl.formatMessage(messages.documentName)}
                      />
                  )}
              />  
          </Grid>
          
          <Grid item xs={12} md={1}>                    
            <Button variant="contained" size="medium" color="primary" onClick={handleSearch} >
              <FormattedMessage {...Payrollmessages.search} />
            </Button>
          </Grid>  
          <Grid item xs={12}  md={12}></Grid>
        </Grid>
        <div className={classes.table}>
          <MUIDataTable
            title=""
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </PapperBlock>
  );
}


RequestsList.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(RequestsList);
