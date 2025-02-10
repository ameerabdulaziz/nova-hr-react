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

function EmployeeList(props) {
  const { intl } = props;
  const history = useHistory();
  const location = useLocation();
  const { dashboardCardKey } = location.state ?? 0;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const Title = localStorage.getItem('MenuName');
  const [companyList, setCompanyList] = useState([]);
  const [filterHighlights, setFilterHighlights] = useState([]);
  const [searchData, setsearchData] = useState({
    BranchId: branchId,
  });

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [count, setCount] = useState(0);
  
  async function fetchData() {
    setIsLoading(true);

    try {
      let formData = {
        BranchId: searchData.BranchId,
        pageNumber: page,
        PageSize: rowsPerPage
      };

      // used if i redirect from dashboard page
      if(dashboardCardKey === "NewHired")
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
      
      setdata(dataApi.dataList);
      setCount(dataApi.totalRows)

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


  const options = {
    serverSide: true,
    count: count, // Total number of rows from API
    page: page - 1, // Current page
    rowsPerPage: rowsPerPage, // Rows per page
    // Handle page and rowsPerPage changes
    onTableChange: (action, tableState) => {
      if (action === "changePage") {
        setPage(tableState.page + 1)
      } 
      else if (action === "changeRowsPerPage") {
        setRowsPerPage(tableState.rowsPerPage)
        setPage(1); // Reset to first page when rowsPerPage changes
      }
    },
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

  const handleSearch = async (e) => {

        try {
          setIsLoading(true);

          let formData = {
            BranchId: searchData.BranchId
          };
          Object.keys(formData).forEach((key) => {
            formData[key] = formData[key] === null ? "" : formData[key];
          });
          
          const dataApi = await ApiData(locale).GetList(formData);
          setdata(dataApi);

        } catch (err) {
          
        } finally {
          setIsLoading(false);
        }
   
  };

  const onAutoCompleteChange = (value, name) => {
    setsearchData((prev) => ({
      ...prev,
      [name]: value  ? value.id : "",
    }));
  };

  
// get table data onload and when pagination change
  useEffect(() => {
    fetchData();
}, [page,rowsPerPage]);


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
      </PapperBlock>

    <SimplifiedPayrollTable
      isLoading={isLoading}
      showLoader
      title={Title}
      data={data}
      columns={columns}
      actions={actions}
      filterHighlights={filterHighlights}
      options={options}
    />
    </PayRollLoader>
  );
}

EmployeeList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeList);
