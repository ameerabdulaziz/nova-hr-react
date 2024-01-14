import {
  Autocomplete,
  Button,
  Grid,
  TextField
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import API from '../api/OpeningLeaveBalancesData';
import messages from '../messages';
import Search from "../../Component/Search";

function OpeningLeaveBalancesReport(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);

  const [EmployeeList, setEmployeeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [yearsList, setYearsList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const Title = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    EmployeeId: '',
    OrganizationId: '',
    yearId: null,
    // departmentId: ''
  });

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.organization) ,
      options: {
        filter: true,
      },
    },
    {
      name: 'employeeId',
      label: intl.formatMessage(messages.employeeId),
      options: {
        filter: true,
      },
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
      options: {
        filter: true,
      },
    },
    {
      name: 'vacationName',
      label: intl.formatMessage(messages.vacationName),
      options: {
        filter: true,
      },
    },
    {
      name: 'vacBalance',
      label: intl.formatMessage(messages.Balance),
      options: {
        filter: true,
      },
    },
    {
      name: 'postedBal',
      label: intl.formatMessage(messages.postedBalance),
      options: {
        filter: true,
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    searchOpen: false,
    selectableRows: 'none',
    serverSide: true,
    onSearchClose: () => {
      // some logic
    },
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
  };

  async function fetchData() {
    try {
      // const employees = await GeneralListApis(locale).GetEmployeeList();
      // setEmployeeList(employees);

      // const department = await GeneralListApis(locale).GetDepartmentList();
      // setDepartmentList(department);

      const yearResponse = await GeneralListApis(locale).GetYears();
      setYearsList(yearResponse);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const formData = { ...formInfo };

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? '' : formData[key];
      });

      const dataApi = await API(locale).GetReport(formData);

      setTableData(dataApi);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTableData();
  }, []);

  const onSearchBtnClick = () => {
    fetchTableData();
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <Grid container spacing={3}>

          {/* <Grid item xs={12} md={3}>
            <Autocomplete
              id='departmentId'
              options={departmentList}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => {
                setFormInfo((prev) => ({
                  ...prev,
                  OrganizationId: value?.id ? value?.id : null,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  variant='outlined'
                  {...params}
                  name='departmentId'
                  required
                  label={intl.formatMessage(messages.department)}
                />
              )}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={3}>
            <Autocomplete
              id='employeeId'
              options={EmployeeList}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => {
                setFormInfo((prev) => ({
                  ...prev,
                  EmployeeId: value?.id ? value?.id : null,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  variant='outlined'
                  {...params}
                  name='employeeId'
                  required
                  label={intl.formatMessage(messages.employeeName)}
                />
              )}
            />
          </Grid> */}

          <Grid item xs={12} md={12}>
            <Search
              // setsearchData={setsearchData}
              // searchData={searchData}
              setsearchData={setFormInfo}
              searchData={formInfo}
              setIsLoading={setIsLoading}
              notShowDate={true}
              // notShowStatus={true}
            ></Search>
          </Grid>

          <Grid item xs={12} md={3}>
            <Autocomplete
              value={
                yearsList.find(
                  (year) => year.id === formInfo.yearId
                ) ?? null
              }
              isOptionEqualToValue={(option, value) => option.id === value.id
              }
              getOptionLabel={(option) => (option ? option.name : '')}
              options={yearsList}
              onChange={(_, value) => {
                setFormInfo((prev) => ({
                  ...prev,
                  yearId: value?.id ? value?.id : null,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage(messages.year)}
                />
              )}
            />
          </Grid>

          <Grid item md={2}>

            <Button
              variant='contained'
              size='medium'
              color='primary'
              onClick={onSearchBtnClick}
            >
              <FormattedMessage {...messages.search} />
            </Button>

          </Grid>
        </Grid>
      </PapperBlock>

      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=''
          data={tableData}
          columns={columns}
          options={options}
        />
      </div>
    </PayRollLoader>
  );
}

export default injectIntl(OpeningLeaveBalancesReport);
