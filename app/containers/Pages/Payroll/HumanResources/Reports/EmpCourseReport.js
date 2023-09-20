
import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import ApiData from '../api/EmpCourseData';
import { useSelector } from 'react-redux';
import {Button ,Grid,TextField, Autocomplete  } from '@mui/material';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import useStyles from '../../Style';
import { format } from "date-fns";
import GeneralListApis from '../../api/GeneralListApis';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { injectIntl, FormattedMessage } from 'react-intl';
import { PapperBlock } from 'enl-components';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';


function EmpCourseReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  
  const [fromdate, setfromate] = useState(null);
  const [todate, settodate] = useState(null);
  const [employee, setemployee] = useState(null);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [Course, setCourse] = useState(null);
  const [CourseList, setCourseList] = useState([]);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  
  const handleSearch = async (e) => {
    
    try{
      debugger;  
      const dataApi = await ApiData(locale).GetReport(employee,Course,fromdate,todate);
      setdata(dataApi);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  async function fetchData() {
    const employees = await GeneralListApis(locale).GetEmployeeList();
    setEmployeeList(employees);

    const Courses = await GeneralListApis(locale).GetCourseList();
    setCourseList(Courses);

    const dataApi = await ApiData(locale).GetReport(employee,Course,fromdate,todate);
    setdata(dataApi);
  }
  useEffect(() => {  
    fetchData();
  }, []);
  
  const columns = [
    {
        name: 'id',
        options: {
          filter: false,
        },
      },
      {
        name: 'employeeName',
        label: <FormattedMessage {...messages['employeeName']} />,
        options: {
          filter: true,
        },
      },
      {
        name: 'courseName',
        label: <FormattedMessage {...messages['courseName']} />,
        options: {
          filter: true,
        },
      },
      {
        name: 'startDate',
        label:<FormattedMessage {...Payrollmessages['fromdate']} />,
        options: {
          filter: true,
        },
      },  
      {
        name: 'finishDate',
        label:<FormattedMessage {...Payrollmessages['todate']} />,
        options: {
          filter: true,
        },
      },   
      {
        name: 'courseCost',
        label:<FormattedMessage {...Payrollmessages['price']} />,
        options: {
          filter: true,
        },
      },  
      {
        name: 'notes',
        label:<FormattedMessage {...Payrollmessages['notes']} />,
        options: {
          filter: true,
        },
      },      
  ];


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
          <Grid item xs={12} md={2}>
              <Autocomplete  
                  id="CourseId"                        
                  options={CourseList}    
                  isOptionEqualToValue={(option, value) =>
                      value.id === 0 || value.id === "" ||option.id === value.id
                  }                 
                  getOptionLabel={(option) =>
                  option.name ? option.name : ""
                  }
                  onChange={(event, value) =>{debugger; setCourse(value==null?null:value.id)} }
                  renderInput={(params) => (
                  <TextField
                      variant="outlined"                            
                      {...params}
                      name="CourseId"
                      required                              
                      label={intl.formatMessage(messages.courseName)}
                      />
                  )}
              />  
          </Grid>
          <Grid item xs={12} md={4}>
              <Autocomplete  
                  id="employeeId"                        
                  options={EmployeeList}    
                  isOptionEqualToValue={(option, value) =>
                      value.id === 0 || value.id === "" ||option.id === value.id
                  }                 
                  getOptionLabel={(option) =>
                  option.name ? option.name : ""
                  }
                  onChange={(event, value) =>{debugger; setemployee(value==null?null:value.id)} }
                  renderInput={(params) => (
                  <TextField
                      variant="outlined"                            
                      {...params}
                      name="employeeId"
                      required                              
                      label={intl.formatMessage(messages.employeeName)}
                      />
                  )}
              />  
          </Grid>
          <Grid item xs={12} md={2}>
                    
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

EmpCourseReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(EmpCourseReport);


