import React, { useState, useEffect, useCallback } from 'react';
import { PapperBlock } from 'enl-components';
import shiftApi from '../api/ShiftData';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {Button ,Grid,TextField, Autocomplete ,Card ,CardContent} from "@mui/material";
import useStyles from '../../Style';
import PropTypes from 'prop-types';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import GeneralListApis from '../../api/GeneralListApis';
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MUIDataTable from 'mui-datatables';
import ApiData from '../api/ShiftEmployeeData';
import style from '../../../../../../app/styles/styles.scss';
import DeleteButton from '../../Component/DeleteButton';

function ShiftReview(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");   
  const [dataList, setdataList] = useState([]);
  
  const history=useHistory();    
  const [fromdate, setfromate] = useState(null);
  const [todate, settodate] = useState(null);
  const [employee, setemployee] = useState("");
  const [EmployeeList, setEmployeeList] = useState([]);
  const [Organization, setOrganization] = useState("");
  const [OrganizationList, setOrganizationList] = useState([]);
  const [ShiftsList, setShiftsList] = useState([]);
  const [ShiftId, setShiftId] = useState("");

  async function handleUpdate(selectedRows){
    try{     
        debugger ;
  
        let response = await  ApiData(locale).ChangeShift(dataList[selectedRows.data[0].dataIndex].employeeId,ShiftId,dataList[selectedRows.data[0].dataIndex].shiftDate);  
        if (response.status==200) {
          toast.success(notif.saved);
          setShiftId("");
          handleSearch();
        } else {
            toast.error(response.statusText);
        }
      } catch (err) {
        toast.error(err.response.data);
      }
  }
  
  async function Getookup() {
    
    const employees = await GeneralListApis(locale).GetEmployeeList();
    setEmployeeList(employees);

    const  organizations= await GeneralListApis(locale).GetDepartmentList();
    setOrganizationList(organizations);
    const shifts = await GeneralListApis(locale).GetShiftList();

          setShiftsList(shifts);

  }

useEffect(() => {    
    Getookup();
    }, []);

    const handleSearch = async (e) => {    
        try{            
          
          const dataApi = await ApiData(locale).GetEmpAttendance(fromdate,todate,employee,Organization);
          setdataList(dataApi);
        } catch (err) {
          toast.error(err.response.data);
        }
      }
    
  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
      },
    },  
    {
        name: 'weekDayName',
        label: <FormattedMessage {...Payrollmessages['weekDayName']} />,
        options: {
          filter: false,
        },
    }, 
    {
        name: 'shiftDate',
        label: <FormattedMessage {...Payrollmessages['date']} />,
        options: {
          filter: false,
        },
    },      
    {
      name: 'employeeName',
      label: <FormattedMessage {...Payrollmessages['employeeName']} />,
      options: {
        filter: true,
      },
    },
    {
        name: 'shiftId',
        label:<FormattedMessage {...messages['shiftId']} />,
        options: {
          filter: true,
        },
      },
      
      {
        name: 'shiftName',
        label: <FormattedMessage {...messages['shiftName']} />,
        options: {
          filter: true,
        },
      },
    
    {
        name: 'timeIn',
        label: <FormattedMessage {...messages['timeIn']} />,
        options: {
            filter: true,
        },
    },    
    {
        name: 'timeOut',
        label: <FormattedMessage {...messages['timeOut']} />,
        options: {
            filter: true,
        },
    },   
    {
        name: 'lateMin',
        label: <FormattedMessage {...messages['lateMin']} />,
        options: {
            filter: true,
        },
    },
    {
        name: 'extraTime',
        label: <FormattedMessage {...messages['extraTime']} />,
        options: {
            filter: true,
        },
    },
    {
      name: 'lessTime',
      label: <FormattedMessage {...messages['lessTime']} />,
      options: {
          filter: true,
      },
    },
    {
      name: 'breakTime',
      label: <FormattedMessage {...messages['breakTime']} />,
      options: {
          filter: true,
      },
    },
    {
      name: 'vac',
      label: <FormattedMessage {...messages['vac']} />,
      options: {
          filter: true,
      },
    },
   
    {
      name: 'mission',
      label: <FormattedMessage {...messages['mission']} />,
      options: {
          filter: true,
      },
    },
    {
      name: 'per',
      label: <FormattedMessage {...messages['per']} />,
      options: {
          filter: true,
      },
    },
      {
        name: 'shiftVacancy',
        label: <FormattedMessage {...messages['shiftVacancy']} />,
        options: {
            filter: true,
        },
      },
      {
        name: 'absence',
        label: <FormattedMessage {...messages['absence']} />,
        options: {
            filter: true,
        },
      },
      
    {
      name: 'Actions',
      options: {
        filter: false,

        customBodyRender: (value, tableMeta) => {
          console.log('tableMeta =', tableMeta);
          return (
            <div className={style.actionsSty}>
              <DeleteButton clickfnc={() => deleterow(tableMeta.rowData[0])}></DeleteButton>              
            </div>
          );
        },
      },
    },

    
  ];

  const options = {
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    search: false,
    selection: true,
    rowsPerPage: 10,
    page: 0,
   
    onSearchClose: () => {
      //some logic
    },
   
    customToolbarSelect: (selectedRows) => (  
        <Grid
            container
            spacing={1}
            alignItems="flex-start"
            direction="row">  
            <Grid item xs={12} md={4}>                    
                <Autocomplete  
                    id="shiftId"                        
                    options={ShiftsList}    
                    isOptionEqualToValue={(option, value) =>
                        value.id === 0 || value.id === "" ||option.id === value.id
                    }                 
                    getOptionLabel={(option) =>
                    option.name ? option.name : ""
                    }
                    value={ShiftId ?   ShiftsList.find((item)=> item.id === ShiftId)   : null}     
                    onChange={(event, value) =>{ setShiftId(value !== null?value.id:0)} }
                    renderInput={(params) => (
                    <TextField
                        variant="outlined"                            
                        {...params}
                        name="shiftId"
                        required                              
                        label={intl.formatMessage(messages.shiftName)}
                        />
                    )}
                />  
            </Grid>    
            <Grid item xs={12} md={2}>
                <Button variant="contained" size="medium" color="primary" className="mr-6" onClick={() => handleUpdate(selectedRows)} >
                        <FormattedMessage {...Payrollmessages.apply} /> 
                </Button>        
            </Grid>
        </Grid> 
    ),
  };

  return (
    <div>
        <PapperBlock whiteBg icon="border_color" title={Title} desc={""}>
            
            <div>                
                <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row">
                        <Grid item xs={12} md={12}>
                          <Card className={classes.card}>
                              <CardContent>
                                  <Grid
                                  container
                                  spacing={2}
                                  alignItems="flex-start"
                                  direction="row">  
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
                                          id="OrganizationId"                        
                                          options={OrganizationList}    
                                          isOptionEqualToValue={(option, value) =>
                                              value.id === 0 || value.id === "" ||option.id === value.id
                                          }                 
                                          getOptionLabel={(option) =>
                                          option.name ? option.name : ""
                                          }
                                          onChange={(event, value) =>{ setOrganization(value==null?"":value.id)} }
                                          renderInput={(params) => (
                                          <TextField
                                              variant="outlined"                            
                                              {...params}
                                              name="OrganizationId"                  
                                              label={intl.formatMessage(Payrollmessages.organizationName)}
                                              />
                                          )}
                                      />  
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
                                              onChange={(event, value) =>{ setemployee(value==null?"":value.id)} }
                                              renderInput={(params) => (
                                              <TextField
                                                  variant="outlined"                            
                                                  {...params}
                                                  name="employeeId"                  
                                                  label={intl.formatMessage(Payrollmessages.employeeName)}
                                                  />
                                              )}
                                          />  
                                    </Grid>
                                  
                                    <Grid item xs={12} md={2}>                    
                                        <Button variant="contained" size="medium" color="primary" onClick={handleSearch} >
                                        <FormattedMessage {...Payrollmessages.search} />
                                        </Button>
                                    </Grid>  
                                  </Grid>
                              </CardContent>
                          </Card>
                        </Grid>
                        
                        <Grid item xs={12} md={12}>
                            <div className={classes.table}>
                              <MUIDataTable
                                  title=""
                                  data={dataList}
                                  columns={columns}
                                  options={options}
                              />
                            </div>
                        </Grid>                     
                </Grid> 
                
            </div>
        </PapperBlock>
    
    </div>
  );
}
ShiftReview.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ShiftReview);

