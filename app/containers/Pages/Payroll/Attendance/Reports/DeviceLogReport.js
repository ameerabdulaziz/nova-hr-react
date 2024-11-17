import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { format } from 'date-fns';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate, getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import ApiData from '../api/AttendanceReportsData';
import messages from '../messages';

function DeviceLogReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);
  const [FingerprintType, setFingerprintType] = useState('');
  const [DevicesList, setDevicesList] = useState([]);
  const [Device, setDevice] = useState('');
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    OrganizationId: '',
    EmpStatusId: 1,
    DisplayDeviceName: false,
    DisplayDeleted: false,
    GroupByDate: true,
    BranchId: branchId,
  });

  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const fingerprintList = [
    { id: null, name: 'All' },
    { id: 1, name: 'Password/Fingerprint' },
    { id: 2, name: 'Card' },
    { id: 3, name: 'Mobile' },
  ];

  // used to clear table if search elements has change
  useEffect(() => {
    setdata([]);
  }, [searchData]);

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      searchData.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, searchData.EmployeeId);
    const status = getAutoCompleteValue(statusList, searchData.EmpStatusId);
    const company = getAutoCompleteValue(companyList, searchData.BranchId);
    const device = getAutoCompleteValue(DevicesList, Device);
    const fingerprint = getAutoCompleteValue(fingerprintList, FingerprintType);

    if (organization) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: organization.name,
      });
    }

    if (device) {
      highlights.push({
        label: intl.formatMessage(messages.device),
        value: device.name,
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

    if (fingerprint) {
      highlights.push({
        label: intl.formatMessage(messages.FingerType),
        value: fingerprint.name,
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {
    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);
      const formData = {
        FromDate: formateDate(searchData.FromDate),
        ToDate: formateDate(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
        IsGroupedBydate: searchData.GroupByDate,
        IsDeleted: searchData.DisplayDeleted,
        IsINOutDev: searchData.DisplayDeviceName,
        DeviceIds: Device,
        ModeId: FingerprintType,
      };

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? '' : formData[key];
      });

      const dataApi = await ApiData(locale).DeviceLogReportApi(formData);
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(payrollMessages.id),
      options: {
        display: false,
        print: false,
        download: false,
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
      name: 'timeIn',
      label: intl.formatMessage(messages.timeIn),
      options: {
        display: searchData.GroupByDate,
        print: searchData.GroupByDate,
        download: searchData.GroupByDate,
      },
    },

    {
      name: 'timeOut',
      label: intl.formatMessage(messages.timeOut),
      options: {
        display: searchData.GroupByDate,
        print: searchData.GroupByDate,
        download: searchData.GroupByDate,
      },
    },

    {
      name: 'devName',
      label: intl.formatMessage(messages.DeviceName),
      options: {
        display: searchData.DisplayDeviceName,
        print: searchData.DisplayDeviceName,
        download: searchData.DisplayDeviceName,
      },
    },
    {
      name: 'trxDateTime2',
      label: intl.formatMessage(messages.date),
      options: {
        customBodyRender: (value) => (
          <pre>
            {searchData.GroupByDate
              ? format(new Date(value), 'yyyy-MM-dd')
              : format(new Date(value), 'yyyy-MM-dd hh:mm aa')}
          </pre>
        ),
      },
    },
  ];

  async function fetchData() {
    try {
      const Devices = await GeneralListApis(locale).GetDeviceList();
      setDevicesList(Devices);

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
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
              setsearchData={setsearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              DateError={DateError}
              setDateError={setDateError}
              company={searchData.BranchId}
            ></Search>
          </Grid>

          <Grid item md={5} lg={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchData.DisplayDeviceName}
                  onChange={(evt) => {
                    setsearchData((prev) => ({
                      ...prev,
                      DisplayDeviceName: evt.target.checked,
                    }));
                  }}
                />
              }
              label={intl.formatMessage(messages.DisplayDeviceName)}
            />
          </Grid>

          <Grid item md={4} lg={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchData.DisplayDeleted}
                  onChange={(evt) => {
                    setsearchData((prev) => ({
                      ...prev,
                      DisplayDeleted: evt.target.checked,
                    }));
                  }}
                />
              }
              label={intl.formatMessage(messages.DisplayDeleted)}
            />
          </Grid>

          <Grid item md={12}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='Sign In Only'
                name='radio-buttons-group'
              >
                <FormControlLabel
                  value='Group By Date'
                  control={
                    <Radio
                      onChange={(evt) => {
                        setsearchData((prev) => ({
                          ...prev,
                          GroupByDate: !prev.GroupByDate,
                        }));
                      }}
                    />
                  }
                  checked={searchData.GroupByDate}
                  label={intl.formatMessage(messages.GroupByDate)}
                />

                <FormControlLabel
                  value='All Transactions'
                  control={
                    <Radio
                      onChange={(evt) => {
                        setsearchData((prev) => ({
                          ...prev,
                          GroupByDate: !prev.GroupByDate,
                        }));
                      }}
                    />
                  }
                  label={intl.formatMessage(messages.AllTransactions)}
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Autocomplete
              id='StatusList'
              options={fingerprintList}
              isOptionEqualToValue={(option, value) => value.id === 0 || value.id === '' || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : '')}
              onChange={(event, value) => setFingerprintType(
                value === null ? '' : value.id == null ? '' : value.id
              )
              }
              renderInput={(params) => (
                <TextField
                  variant='outlined'
                  {...params}
                  name='StatusList'
                  label={intl.formatMessage(messages.FingerType)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Autocomplete
              id='DeviceType'
              options={DevicesList}
              isOptionEqualToValue={(option, value) => value.id === 0 || value.id === '' || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : '')}
              onChange={(event, value) => {
                setDevice(value == null ? '' : value.id);
              }}
              renderInput={(params) => (
                <TextField
                  variant='outlined'
                  {...params}
                  name='DeviceType'
                  label={intl.formatMessage(messages.DeviceType)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              variant='contained'
              size='medium'
              color='primary'
              onClick={handleSearch}
            >
              <FormattedMessage {...payrollMessages.search} />
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>

      <PayrollTable title='' data={data} columns={columns} filterHighlights={filterHighlights} />
    </PayRollLoader>
  );
}

DeviceLogReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(DeviceLogReport);
