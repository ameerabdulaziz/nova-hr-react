import { Box, Button, Autocomplete, Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import { formateDate, getCheckboxIcon } from '../../helpers';
import ApiData from '../api/PersonalData';
import messages from '../messages';
import payrollMessages from "../../messages";
import EmployeeNavigation from '../../Component/EmployeeNavigation';
import Payrollmessages from "../../messages";
import { PapperBlock } from "enl-components";
import PayRollLoader from "../../Component/PayRollLoader";
import GeneralListApis from "../../api/GeneralListApis";
import { getAutoCompleteValue } from '../../helpers';
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import SITEMAP from '../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';



// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
// // import Button from '@mui/material/Button';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";

// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import useStyles from '../../Style';


function EmployeeList(props) {
  const { intl } = props;
  const history = useHistory();
  const location = useLocation();
  const { dashboardCardKey, StatusId } = location.state ?? 0;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  // const { classes } = useStyles();
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const Title = localStorage.getItem('MenuName');
  const [companyList, setCompanyList] = useState([]);
  const [filterHighlights, setFilterHighlights] = useState([]);
  const [searchData, setsearchData] = useState({
    BranchId: StatusId || dashboardCardKey ? "" : branchId,
  });

  
  async function fetchData() {
    setIsLoading(true);

    try {
      let formData = {
        BranchId: searchData.BranchId,
      };

      // used if i redirect from dashboard page
      if(dashboardCardKey === null && StatusId)
        {
          formData.StatusId = StatusId
        }
      else if(dashboardCardKey === "NewHired")
        {
          formData.NewHired = true
        }
      else if(dashboardCardKey === "InPorpatiom")
        {
          formData.InPorpatiom = true
        }
      else if(dashboardCardKey === "InPorpatiom")
        {
          formData.InPorpatiom = true
        }
      else if(dashboardCardKey === "Resignation")
        {
          formData.Resignation = true
        }
      else if(dashboardCardKey === "Terminated")
        {
          formData.Terminated = true
        }

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : (formData[key]==0?"":formData[key]);
      });

      const dataApi = await ApiData(locale).GetList(formData);
      
      setdata(dataApi)

    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }



  const getDataFun = async () => {
    try {
     
      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      getFilterHighlights();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }


 useEffect(() => {
    getDataFun();
    fetchData()
  }, []);

  async function deleteRow(id) {
    try {
      setIsLoading(true);
      await ApiData(locale).Delete(id);

      fetchData();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }


  const getFilterHighlights = () => {
    const highlights = [];

    const company = getAutoCompleteValue(companyList, formInfo.BranchId);

    if (company) {
      highlights.push({
        label: intl.formatMessage(messages.company),
        value: company.name,
      });
    }

    setFilterHighlights(highlights);
  };



  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: 'employeeCode',
      label: intl.formatMessage(messages.employeeCode),
      options: {
        customBodyRender: (value, tableMeta) => {     

          return <EmployeeNavigation
                    employeeId={tableMeta?.rowData[0]}
                    employeeName={locale === "en" ? tableMeta?.rowData[2] : tableMeta?.rowData[3]}
                    openInNewTap
                    ResetDeviceKeyFun={ResetDeviceKeyFun}
                    // used to pass custom button to open menu
                    anchor={
                      <Button>{value}</Button>
                    }
                  />
        }
      }
    },
    // used to appear en employee name then ar employee name in en version , in ar version appear ar employee name then en employee name
    ...(locale === "en" ? [
      {
        name: 'enName',
        label: intl.formatMessage(messages.enname),
        options: {
          customBodyRender: (value, tableMeta) => (
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                history.push(SITEMAP.employee.Personal.route, {
                  empid: {
                    id: tableMeta.rowData[0],
                    name: tableMeta.rowData[2],
                  }
                });
              }}
            >
              {value}
            </Box>
          ),
        },
      },
      {
        name: 'arName',
        label: intl.formatMessage(messages.arname),
        options: {
          customBodyRender: (value, tableMeta) => (
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                history.push(SITEMAP.employee.Personal.route, {
                  empid: {
                    id: tableMeta.rowData[0],
                    name: tableMeta.rowData[2],
                  }
                });
              }}
            >
              {value}
            </Box>
          ),
        },
      },
    ] : [
      {
        name: 'arName',
        label: intl.formatMessage(messages.arname),
        options: {
          customBodyRender: (value, tableMeta) => (
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                history.push(SITEMAP.employee.Personal.route, {
                  empid: {
                    id: tableMeta.rowData[0],
                    name: tableMeta.rowData[2],
                  }
                });
              }}
            >
              {value}
            </Box>
          ),
        },
      },
      {
        name: 'enName',
        label: intl.formatMessage(messages.enname),
        options: {
          customBodyRender: (value, tableMeta) => (
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                history.push(SITEMAP.employee.Personal.route, {
                  empid: {
                    id: tableMeta.rowData[0],
                    name: tableMeta.rowData[2],
                  }
                });
              }}
            >
              {value}
            </Box>
          ),
        },
      },
    ]),

    {
      name: 'userName',
      label: intl.formatMessage(messages.userName),
    },

    {
      name: 'nickName',
      label: intl.formatMessage(messages.nickName),
    },

    {
      name: 'statusName',
      label: intl.formatMessage(messages.status),
    },

    {
      name: 'hiringDate',
      label: intl.formatMessage(messages.hiringDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.hiringDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.organization),
    },
    {
      name: 'parentOrgName',
      label: intl.formatMessage(messages.parentOrgName),
    },
    
    {
      name: 'branchName',
      label: intl.formatMessage(Payrollmessages.branch),
    },
    {
      name: 'reportToName',
      label: intl.formatMessage(messages.reportto),
    },
    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobname),
    },
    {
      name: 'isInsured',
      label: intl.formatMessage(messages.isinsured),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.employee.Personal.route,
    },
    delete: {
      callback: deleteRow,
    },
    extraActions: (row) => (
      <EmployeeNavigation
        employeeId={row.id}
        employeeName={row.enName}
        ResetDeviceKeyFun={ResetDeviceKeyFun}
        openInNewTap
      />
    ),
  };




 const ResetDeviceKeyFun = async (employeeId) => {

  try
  {
    setIsLoading(true);
    await ApiData().ResetDeviceKey(employeeId);

    toast.success(notif.saved);
  }
  catch(err)
  {
    
  }
  finally {
    setIsLoading(false);
  }
  
 }

  const handleSearch = () => {
    fetchData();
  };

  const onAutoCompleteChange = (value, name) => {
    setsearchData((prev) => ({
      ...prev,
      [name]: value  ? value.id : "",
    }));
  };





//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openFilter, setOpenFilter] = useState(false);
//   const [filterType, setFilterType] = useState(null);
//   const [filterVal, setFilterVal] = useState("");
//   const [filterValslist, setFilterValslist] = useState([]);
//   const [filterValslistApi, setFilterValslistApi] = useState([]);
//   const [filterMinDatVal, setFilterMinDatVal] = useState(null);
//   const [filterMaxDatVal, setFilterMaxDatVal] = useState(null);
//   const [DateError, setDateError] = useState({});
//   const [filterList, setFilterList] = useState([
//     {id:0, name:"empCode", lable: "emp code" ,type:"number"},
//     {id:1, name:"empName", lable: "emp Name" ,type:"text"},
//     {id:2, name:"HiringDate", lable: "Hiring Date" ,type:"date"},
//     {id:3, name:"Insured", lable: "Insured" ,type:"boolean"},
//   ]);

//   const [value, setValue] = useState('female');

//   const handleClick = (event) => {

//     setAnchorEl(event.currentTarget);
//     setOpenFilter(true)
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setOpenFilter(false)
//   };


//   const applyFilterFun = () => {
//       if(filterVal.length !== 0 || (filterMinDatVal || filterMaxDatVal))
//       {
//         let filterTypeWithVal = {...filterType}


//         if(filterType.type === "date")
//         {
//           console.log("innn");
          
//           if(filterMinDatVal)
//           {
//             filterTypeWithVal.fromDate = filterMinDatVal
//           }

//           if(filterMaxDatVal)
//             {
//               filterTypeWithVal.toDate = filterMaxDatVal
//             }
          


//           setFilterValslistApi((prev)=>[
//             ...prev,
//             ...( filterMinDatVal ? [{[`from${filterType.name}`]: filterMinDatVal}] : []),
//             ...( filterMaxDatVal ? [{[`to${filterType.name}`]: filterMaxDatVal}] : []),
//           ])
//         }
//         else
//         {
//           filterTypeWithVal.value = filterVal

//           setFilterValslistApi((prev)=>[
//             ...prev,
//             {[filterType.name]: filterVal},
//           ])
//         }

       


//         console.log("filterTypeWithVal =", filterTypeWithVal);
        
//         setFilterValslist((prev)=>([
//           ...prev,
//           filterTypeWithVal
//         ]))

//         // setFilterValslistApi((prev)=>[
//         //   ...prev,
//         //   {[filterType.name]: filterVal},
//         // ])

//       }
      
//       setFilterType(null)
//       setFilterVal("")
//   }


//   // const handleChange = (event) => {
//   //   setValue(event.target.value);
//   // };

//   // const open = Boolean(anchorEl);
//   // const id = open ? 'simple-popover' : undefined;


//   const removeFilterItem = (removeItem) => {


// console.log("removeItem =", removeItem);


//     setFilterValslist(prevItems => prevItems.filter(item => item.name !== removeItem));
 
//     setFilterValslistApi(prevItems => prevItems.filter(obj => !obj.hasOwnProperty(removeItem)))
 
//   }
  


//   console.log("filterType =", filterType);
//   console.log("filterVal =", filterVal);
//   console.log("filterValslist =", filterValslist);
//   console.log("filterValslistApi =", filterValslistApi);
  

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
              <Autocomplete
                options={companyList}
                value={searchData.BranchId ? companyList.find(item => item.id === searchData.BranchId) ?? null : null}
                isOptionEqualToValue={(option, value) => option.id === value.id
                }
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(e, value) => onAutoCompleteChange(value ? value : "", 'BranchId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(Payrollmessages.company)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={handleSearch}
              >
                <FormattedMessage {...payrollMessages.search} />
              </Button>
          </Grid>
        </Grid>


{/* 
        <Grid container spacing={2} style={{marginTop:"0"}}>
          <Grid item xs={12} md={6}>

            <Button 
              // aria-describedby={id} 
              // variant="contained" 
              startIcon={<FilterListIcon />}
              onClick={handleClick} 
              >
                 Filter
            </Button>

            

            <Popover
              // id={id}
              open={openFilter}
              // open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              style={{marginTop:"10px"}}
            >
              <div style={{textAlign:"center", padding:"10px" , width:"250px"}}>

                  <Grid container spacing={2}>
                    <Grid item xs={12} >
                      <Autocomplete
                       options={filterList}
                       value={filterType}
                      // options={companyList}
                      // value={searchData.BranchId ? companyList.find(item => item.id === searchData.BranchId) ?? null : null}
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      getOptionDisabled={(option) =>{
                        // option === filterType
                        console.log("jhdjdj =",filterValslist.some(obj => obj.id === option.id));
                        
                       return filterValslist.some(obj => obj.id === option.id)

                      // console.log("jhdjdj =",filterValslistApi.some(obj => obj.id === option.id));
                        
                      // return filterValslistApi.some(obj => obj.id === option.id)
                      }}
                      // onChange={(e, value) => onAutoCompleteChange(value ? value : "", 'BranchId')
                      // }
                      onChange={(e, value) => {
                        setFilterType(value)
                        setFilterVal("")
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Type"
                          // label={intl.formatMessage(Payrollmessages.company)}
                        />
                      )}
                    />
                    </Grid>

                      {filterType && filterType.type === "text" && (
                        <Grid item xs={12} >
                          <TextField 
                            id="outlined-basic" 
                            label={filterType.name}
                            variant="outlined" 
                            value={filterVal}
                            onChange={(e)=>{
                              setFilterVal(e.target.value)
                            }}
                            />
                        </Grid>
                      )}

                      {filterType && filterType.type === "number" && (
                        <Grid item xs={12} >
                          <TextField 
                            id="outlined-basic" 
                            type='number'
                            label={filterType.name}
                            variant="outlined" 
                            value={filterVal}
                            onChange={(e)=>{
                              setFilterVal(e.target.value)
                            }}
                            />
                        </Grid>
                      )}


                      {filterType && filterType.type === "date" && (
                        <>
                          <Grid item xs={12} >
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="Min Date"
                                  value={filterMinDatVal ? dayjs(filterMinDatVal) : null}
                                  // className={classes.field}
                                  onChange={(date) => {
                                    // setdata((prevFilters) => ({
                                    //   ...prevFilters,
                                    //   lworkingDay: date,
                                    // }));

                                    setFilterMinDatVal(date)
                                  }}
                                  onError={(error, value) => {
                                    if (error !== null) {
                                      setDateError((prevState) => ({
                                        ...prevState,
                                        [`MinDate`]: true,
                                      }));
                                    } else {
                                      setDateError((prevState) => ({
                                        ...prevState,
                                        [`MinDate`]: false,
                                      }));
                                    }
                                  }}
                                />
                              </LocalizationProvider>
                          </Grid>

                          <Grid item xs={12} >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Max Date"
                                value={filterMaxDatVal ? dayjs(filterMaxDatVal) : null}
                                // className={classes.field}
                                onChange={(date) => {
                                  // setdata((prevFilters) => ({
                                  //   ...prevFilters,
                                  //   lworkingDay: date,
                                  // }));

                                  setFilterMaxDatVal(date)
                                }}
                                onError={(error, value) => {
                                  if (error !== null) {
                                    setDateError((prevState) => ({
                                      ...prevState,
                                      [`MaxDate`]: true,
                                    }));
                                  } else {
                                    setDateError((prevState) => ({
                                      ...prevState,
                                      [`MaxDate`]: false,
                                    }));
                                  }
                                }}
                              />
                            </LocalizationProvider>
                          </Grid>
                        </>
                      )}


                    {filterType && filterType.type === "boolean" && (
                        <>
                          <Grid item xs={12} >
                            <FormControl>

                              <RadioGroup
                                // aria-labelledby="demo-controlled-radio-buttons-group"
                                // name="controlled-radio-buttons-group"
                                value={filterVal}
                                // onChange={handleChange}
                                onChange={(e)=>{
                                  setFilterVal(e.target.value)
                                }}
                              >
                                <FormControlLabel 
                                  value="true" 
                                  control={<Radio />} 
                                  label="true" />

                                <FormControlLabel 
                                  value="false" 
                                  control={<Radio />} 
                                  label="false" />
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                        </>
                      )}

                    <Grid item xs={12} >
                        <Button
                        //  aria-describedby={id} 
                         variant="contained" 
                         onClick={()=>{
                          applyFilterFun()
                          handleClose()
                          }}>
                           Apply
                      </Button>
                    </Grid>
              </Grid>
              </div>

            </Popover>
          </Grid>

          <Grid item xs={12} >
              <div style={{display:"flex"}}>

                {filterValslist.map((item,index)=>{

             return   <div 
                  style={{
                    border: "2px solid #bdbdbd",
                    width: "fit-content",
                    padding: "3px 9px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    margin:"0 7px",
                    color:"#727272",
                    
                  }}
                  key={index}
                >
                      <HighlightOffIcon style={{fontSize: "21px", cursor:"pointer"}} onClick={()=>{removeFilterItem(item.name)}} /> &nbsp;
                      <span style={{borderRight: "1px solid #bdbdbd", fontWeight:"bolder"}}>{item.lable} &nbsp;</span> &nbsp;
                      <span className={classes.colorSty} style={{fontWeight:"bolder"}}>{item.value}</span>
                </div>
                })}


 
              </div>
          </Grid>
        </Grid> */}
      </PapperBlock>

    <SimplifiedPayrollTable
      isLoading={isLoading}
      showLoader
      title={Title}
      data={data}
      columns={columns}
      actions={actions}
      filterHighlights={filterHighlights}
    />
    </PayRollLoader>
  );
}

EmployeeList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeList);
