import React, { useEffect, useState } from 'react'
import ApiData from '../api/AttendanceReportsData'
import { useSelector } from 'react-redux'
import { Button, Grid } from '@mui/material'
import messages from '../messages'
import payrollMessages from '../../messages'
import { injectIntl, FormattedMessage } from 'react-intl'
import { PapperBlock } from 'enl-components'
import PropTypes from 'prop-types'
import Search from '../../Component/Search'
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms'
import { toast } from 'react-hot-toast'
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable'
import GeneralListApis from '../../api/GeneralListApis'
import { formateDate, getAutoCompleteValue } from '../../helpers'
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table'

function EmployeeLessTime(props) {
  const { intl } = props
  const locale = useSelector((state) => state.language.locale)
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([])
  const Title = localStorage.getItem('MenuName')
  const [isLoading, setIsLoading] = useState(true)
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    OrganizationId: '',
    EmpStatusId: 1,
    BranchId: branchId,
  })

  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      searchData.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, searchData.EmployeeId);
    const status = getAutoCompleteValue(statusList, searchData.EmpStatusId);
    const company = getAutoCompleteValue(companyList, searchData.BranchId);

    if (organization) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: organization.name,
      });
    }

    if (employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: employee.name,
      });
    }

    if (status) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: status.name,
      });
    }

    if (company) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: company.name,
      });
    }

    if (searchData.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(searchData.FromDate),
      });
    }

    if (searchData.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(searchData.ToDate),
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {
    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid))
      return
    }

    try {
      setIsLoading(true)
      let formData = {
        FromDate: formateDate(searchData.FromDate),
        ToDate: formateDate(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
      }
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? '' : formData[key]
      })
      const dataApi = await ApiData(locale).EmployeeLessTimeReport(formData)
      setdata(dataApi)

      getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false)
    }
  }

  const columns = [
    {
      name: 'employeeId',
      label: intl.formatMessage(payrollMessages.id),
      options: {
        filter: false,
      },
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.orgName),
    },
    {
      name: 'employeeCode',
      label: intl.formatMessage(messages.EmpCode),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'shiftDate',
      label: intl.formatMessage(messages.attendanceDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.attendanceDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: 'lessTime',
      label: intl.formatMessage(messages.lessTime),
    },
    {
      name: 'per',
      label: intl.formatMessage(messages.permission),
    },
  ]

  async function fetchData() {
    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);



  const openMonthDateWithCompanyChangeFun = async (BranchId,EmployeeId) => {

    let OpenMonthData 

    try
    {
      if(!EmployeeId)
      {
         OpenMonthData = await GeneralListApis(locale).getOpenMonth( BranchId,0);
      }
      else
      {
         OpenMonthData = await GeneralListApis(locale).getOpenMonth( 0,EmployeeId);
      }

      
      setsearchData((prev)=>({
        ...prev,
        FromDate: OpenMonthData ? OpenMonthData.fromDateAtt : null,
        ToDate: OpenMonthData ? OpenMonthData.todateAtt : null,
      }))
    }
    catch(err)
    {}

  }


  useEffect(()=>{
    if(searchData.BranchId !== "" && searchData.EmployeeId === "")
    {      
      openMonthDateWithCompanyChangeFun(searchData.BranchId)
    }

    if(searchData.BranchId === "" && searchData.EmployeeId !== "")
    {
      openMonthDateWithCompanyChangeFun(0, searchData.EmployeeId)
    }

    if(searchData.BranchId === "" && searchData.EmployeeId === "")
    {
      setsearchData((prev)=>({
        ...prev,
        FromDate: null,
        ToDate: null,
      }))
    }

  },[searchData.BranchId, searchData.EmployeeId])




  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container spacing={2}>
          <Grid item xs={12} md={11} lg={9} xl={7}>
            <Search
              setsearchData={setsearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              DateError={DateError}
              setDateError={setDateError}
              company={searchData.BranchId}
            ></Search>
          </Grid>



          <Grid item xs={12} >
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...payrollMessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>

      <SimplifiedPayrollTable title="" data={data} columns={columns} filterHighlights={filterHighlights} />
    </PayRollLoaderInForms>
  )
}

EmployeeLessTime.propTypes = { intl: PropTypes.object.isRequired }

export default injectIntl(EmployeeLessTime)
