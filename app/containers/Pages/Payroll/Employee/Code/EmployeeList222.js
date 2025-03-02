import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import { formateDate, getCheckboxIcon } from '../../helpers';
import ApiData from '../api/PersonalData';
import messages from '../messages';
// import payrollMessages from "../../messages";
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
import { 
  Box, 
  Button, 
  Autocomplete, 
  Grid, 
  TextField, 
  Stack 
} from '@mui/material';



import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import dayjs from "dayjs";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import useStyles from '../../Style';
import { format } from "date-fns";

import GeneralTable from '../../Component/GeneralTable/GeneralTable';
import ActionDelete from '../../Component/GeneralTable/Actions/ActionDelete';
import ActionEdit from '../../Component/GeneralTable/Actions/ActionEdit';

import style from '../../../../../styles/styles.scss';
import TabletoolBar from '../../Component/GeneralTable/TabletoolBar/TabletoolBar';
import FilterBtn from '../../Component/GeneralTable/TabletoolBar/ToolbarButtons/FilterBtn';
import PrintBtn from '../../Component/GeneralTable/TabletoolBar/ToolbarButtons/PrintBtn';
import ExportExcelBtn from '../../Component/GeneralTable/TabletoolBar/ToolbarButtons/ExportExcelBtn';
import AddBtn from '../../Component/GeneralTable/TabletoolBar/ToolbarButtons/AddBtn';


function EmployeeList(props) {
  const { intl } = props;
  const history = useHistory();
  const location = useLocation();
  const { dashboardCardKey, StatusId } = location.state ?? 0;
  const locale = useSelector((state) => state.language.locale);
  const darkLightMode = useSelector((state) => state.ui.type);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const { classes } = useStyles();
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const Title = localStorage.getItem('MenuName');
  const [companyList, setCompanyList] = useState([]);
  const [filterHighlights, setFilterHighlights] = useState([]);
  const [searchData, setsearchData] = useState({
    BranchId: StatusId || dashboardCardKey ? "" : branchId,
  });


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [count, setCount] = useState(0);
  const [generalAllData, setGeneralAllData] = useState([]);
  const [selectedRowsIds, setSelectedRowsIds] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]);

  
  async function fetchData(apiPaginationKey) {
    setIsLoading(true);

    try {
      let formData = {
        BranchId: searchData.BranchId,
        pageNumber: (apiPaginationKey === "print" || apiPaginationKey === "excel") ? 0 : page + 1,
        PageSize:  (apiPaginationKey === "print" || apiPaginationKey === "excel") ? 0 :   rowsPerPage
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
      
      if(apiPaginationKey === "print" || apiPaginationKey === "excel" )
      {
        setGeneralAllData(dataApi)
      }
      else
      {
        setdata(dataApi.dataList)
        setCount(dataApi.totalRows)
      }

      

      // setdata(dataApi)

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

    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }


 useEffect(() => {
    getDataFun();
    // fetchData()
  }, []);


  useEffect(()=>{
    if(companyList.length !== 0)
    {
      getFilterHighlights();
    }
  },[companyList,searchData.BranchId])


  useEffect(() => {
    fetchData()
  }, [page,rowsPerPage]);


  async function deleteRow(id) {
    try {
      setIsLoading(true);
      await ApiData(locale).Delete(id);

      // fetchData();
      setPage(0)
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }


  const getFilterHighlights = () => {
    const highlights = [];
    console.log("innnn222 =", searchData.BranchId);
    console.log("innnn222 =", companyList);


    const company = getAutoCompleteValue(companyList, searchData.BranchId);




    if (company) {
      highlights.push({
        // label: "company",
        label: intl.formatMessage(Payrollmessages.company),
        value: company.name,
      });
    }

    console.log("highlights22 =", highlights);
    

    setFilterHighlights(highlights);
  };


  const [columns2, setColumns2] = useState([
    // {
    //   name: "serial",
    //   label: intl.formatMessage(messages.Serial),
    //   customBodyRender: (data) => {
    //     return <Tooltip title={intl.formatMessage(messages.orderDetails)} arrow> 
    //             <div  onClick={(e)=>{orderDetailsFun(e,data)}} >
    //               {data.serial}
    //             </div>
    //           </Tooltip>
    //   }
    // },
    // {
    //   name: "checkbox",
    //   // label: intl.formatMessage(messages.employeeCode),
    //   customBodyRender: (data) => {     
    //     // console.log("data =", data);
        
    //     return 
    //   }
    // },
    {
      name: "employeeCode",
      label: intl.formatMessage(messages.employeeCode),
      customBodyRender: (data) => {     
        // console.log("data =", data);
        
        return <EmployeeNavigation
                  employeeId={data.id}
                  employeeName={locale === "en" ? data.enName : data.arName}
                  openInNewTap
                  ResetDeviceKeyFun={ResetDeviceKeyFun}
                  // used to pass custom button to open menu
                  anchor={
                    <Button>{data.employeeCode}</Button>
                  }
                />
      }
    },
    // used to appear en employee name then ar employee name in en version , in ar version appear ar employee name then en employee name
    ...(locale === "en" ? [
      {
        name: 'enName',
        label: intl.formatMessage(messages.enname),
        customBodyRender: (data) => (
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                history.push(SITEMAP.employee.Personal.route, {
                  empid: {
                    id: data.id,
                    name: data.enName,
                  }
                });
              }}
            >
              {data.enName}
            </Box>
          ),

      },
      {
        name: 'arName',
        label: intl.formatMessage(messages.arname),
        customBodyRender: (data) => (
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                history.push(SITEMAP.employee.Personal.route, {
                  empid: {
                    id: data.id,
                    name: data.arName,
                  }
                });
              }}
            >
              {data.arName}
            </Box>
          ),

      },
    ] : [
      {
        name: 'arName',
        label: intl.formatMessage(messages.arname),
        customBodyRender: (data) => (
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                history.push(SITEMAP.employee.Personal.route, {
                  empid: {
                    id: data.id,
                    name: data.arName,
                  }
                });
              }}
            >
              {data.arName}
            </Box>
          ),
      },
      {
        name: 'enName',
        label: intl.formatMessage(messages.enname),
        options: {
          customBodyRender: (data) => (
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                history.push(SITEMAP.employee.Personal.route, {
                  empid: {
                    id: data.id,
                    name: data.enName,
                  }
                });
              }}
            >
              {data.enName}
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
      customBodyRender: (date) => {
        return date?.hiringDate   ? format(new Date(date?.hiringDate), "yyyy-MM-dd") : ""
      }
      // options: getDateColumnOptions(
      //   intl.formatMessage(messages.hiringDate),
      //   {
      //     minDateLabel: intl.formatMessage(Payrollmessages.minDate),
      //     maxDateLabel: intl.formatMessage(Payrollmessages.maxDate),
      //   }
      // ),
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
      print: false, // used to hide this column in print
      customBodyRender: (date) => {
        return getCheckboxIcon(date.isInsured)  
      }
    },
    {
      name: 'actions',
      label: intl.formatMessage(Payrollmessages.Actions),
      print: false, // used to hide this column in print
      export: false, // used to hide this column in excel
      // label: intl.formatMessage(messages.parentOrgName),
      customBodyRender: (data) => {

// console.log("action data =", data);


        return <div style={{display:"flex"}}>

                <EmployeeNavigation
                  employeeId={data.id}
                  employeeName={locale === "en" ? data.enName : data.arName}
                  openInNewTap
                  ResetDeviceKeyFun={ResetDeviceKeyFun}
                  // used to pass custom button to open menu
                  // anchor={
                  //   <Button>{data.employeeCode}</Button>
                  // }
                />


              {/* <ActionEdit 
                // disabled={true}
              /> */}
              <ActionDelete 
                // disabled={data.employeeCode === 1? true : false}
                deleteFun={()=>deleteRow(data.id)}
              />

              
        </div>
      }
    },
    
  ])


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
          minDateLabel: intl.formatMessage(Payrollmessages.minDate),
          maxDateLabel: intl.formatMessage(Payrollmessages.maxDate),
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





  const [anchorEl, setAnchorEl] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterType, setFilterType] = useState(null);
  const [filterVal, setFilterVal] = useState("");
  const [filterValslist, setFilterValslist] = useState([]);
  const [filterValslistApi, setFilterValslistApi] = useState([]);
  const [filterMinDatVal, setFilterMinDatVal] = useState(null);
  const [filterMaxDatVal, setFilterMaxDatVal] = useState(null);
  const [DateError, setDateError] = useState({});

  const [filterData, setFilterData] = useState({
    filterType: null,
    filterVal: "",
    filterMinDateVal: null,
    filterMaxDateVal: null,
    filterValslist: [],
    filterValslistApi: [],
  });




  const [filterList, setFilterList] = useState([
    {id:0, name:"empCode", lable: "emp code" ,type:"number"},
    {id:1, name:"empName", lable: "emp Name" ,type:"text"},
    {id:2, name:"HiringDate", lable: "Hiring Date" ,type:"date"},
    {id:3, name:"Insured", lable: "Insured" ,type:"boolean"},
  ]);

  // const [value, setValue] = useState('female');

  // const handleClick = (event) => {

  //   setAnchorEl(event.currentTarget);
  //   setOpenFilter(true)
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  //   setOpenFilter(false)
  // };


  // const applyFilterFun = () => {
  //     if(filterVal.length !== 0 || (filterMinDatVal || filterMaxDatVal))
  //     {
  //       let filterTypeWithVal = {...filterType}


  //       if(filterType.type === "date")
  //       {
  //         console.log("innn");
          
  //         if(filterMinDatVal)
  //         {
  //           filterTypeWithVal[`from${filterType.name}`] = filterMinDatVal
  //         }

  //         if(filterMaxDatVal)
  //           {
  //             filterTypeWithVal[`to${filterType.name}`] = filterMaxDatVal
  //           }
          


  //         setFilterValslistApi((prev)=>[
  //           ...prev,
  //           ...( filterMinDatVal ? [{[`from${filterType.name}`]: filterMinDatVal}] : []),
  //           ...( filterMaxDatVal ? [{[`to${filterType.name}`]: filterMaxDatVal}] : []),
  //         ])
  //       }
  //       else
  //       {
  //         filterTypeWithVal.value = filterVal

  //         setFilterValslistApi((prev)=>[
  //           ...prev,
  //           {[filterType.name]: filterVal},
  //         ])
  //       }

       


  //       console.log("filterTypeWithVal =", filterTypeWithVal);
        
  //       setFilterValslist((prev)=>([
  //         ...prev,
  //         filterTypeWithVal
  //       ]))

  //       // setFilterValslistApi((prev)=>[
  //       //   ...prev,
  //       //   {[filterType.name]: filterVal},
  //       // ])

  //     }
      
  //     setFilterType(null)
  //     setFilterVal("")
  //     setFilterMinDatVal(null)
  //     setFilterMaxDatVal(null)
  // }


  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;


//   const removeFilterItem = (removeItem) => {


// console.log("removeItem =", removeItem);

//     if(removeItem.type !== "date")
//     {

//       setFilterValslist(prevItems => prevItems.filter(item => item.name !== removeItem.name));
      
//       setFilterValslistApi(prevItems => prevItems.filter(obj => !obj.hasOwnProperty(removeItem.name)))
//     }
//     else
//     {
//       setFilterValslist(prevItems => prevItems.filter(item => item.name !== removeItem.name));

//       setFilterValslistApi(prevItems => prevItems.filter(obj => !obj.hasOwnProperty([`from${removeItem.name}`])))
//       setFilterValslistApi(prevItems => prevItems.filter(obj => !obj.hasOwnProperty([`to${removeItem.name}`])))
//     }


 
//   }


  const printFun = () => {
    fetchData("print")
  }

  const exportFun = () => {
    fetchData("excel")
  }
  


//   console.log("filterType =", filterType);
//   console.log("filterVal =", filterVal);
//   console.log("filterValslist =", filterValslist);
//   console.log("filterValslistApi =", filterValslistApi);
//   console.log("filterData =", filterData);



//   console.log("page11111 =", page);
//   console.log("rowsPerPage =", rowsPerPage);
//   console.log("count =", count);
//   console.log("data =", data);
  

// console.log("generalAllData =", generalAllData);


// console.log("selectedRowsData =", selectedRowsData);


// const disableSelectRowFun = (data) => {
//   // console.log("data =",data);

//   if(data.isInsured)
//   {
//     return false
//   }
//   else
//   {
//     return true
//   }
  
// }




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
                <FormattedMessage {...Payrollmessages.search} />
              </Button>
          </Grid>
        </Grid>
</PapperBlock>


        <TabletoolBar 
           components={() => (
            <>
            
              <FilterBtn 
                filterList={filterList}
                filterData={filterData}
                setFilterData={setFilterData}
              />

              <PrintBtn 
                title={Title}
                columns={columns2}
                printData={generalAllData}
                setPrintData={setGeneralAllData}
                printFun={printFun}
                filterHighlights={filterHighlights}
              />

              <ExportExcelBtn 
                exportFun={exportFun}
                exportdata={generalAllData}
                setExportData={setGeneralAllData}
                columns={columns2}
              />

              <AddBtn 
                URL={SITEMAP.employee.Personal.route}
              />

            </>
          )}

          filterData={filterData}
          setFilterData={setFilterData}
        />


      <GeneralTable 
        columns={columns2}
        dataTable={data}
        count={count}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        // select={true}
        // disableSelectRowFun={disableSelectRowFun}
        selectedRowsIds={selectedRowsIds}
        setSelectedRowsIds={setSelectedRowsIds}
        selectedRowsData={selectedRowsData}
        setSelectedRowsData={setSelectedRowsData}
      />

    {/* <SimplifiedPayrollTable
      isLoading={isLoading}
      showLoader
      title={Title}
      data={data}
      columns={columns}
      actions={actions}
      filterHighlights={filterHighlights}
    /> */}
    </PayRollLoader>
  );
}

EmployeeList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeList);
