import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Stack,
  TextField
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import API from '../api/LeaveTrxReportData';
import messages from '../messages';

function LeaveTrxReport(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);

  const [EmployeeList, setEmployeeList] = useState([]);
  const [VacationsList, setVacationsList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [statusList, setStatusList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const Title = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    EmpStatusId: '',
    OrganizationId: '',
    VacationId: [],
    InsertDate: false,
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
      label: <FormattedMessage {...messages.organization} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'employeeId',
      label: <FormattedMessage {...messages.employeeId} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'employeeName',
      label: <FormattedMessage {...messages.employeeName} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'hiringDate',
      label: <FormattedMessage {...messages.hiringDate} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), 'yyyy-MM-dd'),
      },
    },
    {
      name: 'vacationName',
      label: <FormattedMessage {...messages.vacationName} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'fromDate',
      label: <FormattedMessage {...messages.fromdate} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), 'yyyy-MM-dd'),
      },
    },
    {
      name: 'toDate',
      label: <FormattedMessage {...messages.todate} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), 'yyyy-MM-dd'),
      },
    },
    {
      name: 'daysCount',
      label: <FormattedMessage {...messages.daysCount} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'dayEqual',
      label: <FormattedMessage {...messages.dayDeducedBy} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'trxDate',
      label: <FormattedMessage {...messages.registrationDate} />,
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
    rowsPerPageOptions: [10, 15, 50, 100],
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
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const Vacations = await GeneralListApis(locale).GetVacList();
      setVacationsList(Vacations);

      const department = await GeneralListApis(locale).GetDepartmentList();
      setDepartmentList(department);

      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);
    } catch (error) {
      toast.error(JSON.stringify(error.response.data));
    } finally {
      setIsLoading(false);
    }
  }

  const formateDate = (date) => format(new Date(date), 'yyyy-MM-dd');

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const formData = { ...formInfo };

      formData.VacationId = formData.VacationId.map((item) => item.id);
      formData.FromDate = formateDate(formData.FromDate);
      formData.ToDate = formateDate(formData.ToDate);

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? '' : formData[key];
      });

      const dataApi = await API(locale).GetReport(formData);

      setTableData(dataApi);
    } catch (error) {
      toast.error(JSON.stringify(error.response.data));
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
    <Box
      sx={{
        zIndex: 100,
        position: 'relative',
      }}
    >

      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <Backdrop
          sx={{
            color: 'primary.main',
            zIndex: 10,
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.69)',
          }}
          open={isLoading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>

        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label={intl.formatMessage(messages.fromdate)}
                value={formInfo.FromDate}
                onChange={(date) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    FromDate: date,
                  }));
                }}
                className={classes.field}
                renderInput={(params) => (
                  <TextField {...params} variant='outlined' />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label={intl.formatMessage(messages.todate)}
                value={formInfo.ToDate}
                onChange={(date) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    ToDate: date,
                  }));
                }}
                className={classes.field}
                renderInput={(params) => (
                  <TextField {...params} variant='outlined' />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={2}>
            <Autocomplete
              id='departmentId'
              options={departmentList}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => {
                setFormInfo((prev) => ({
                  ...prev,
                  OrganizationId: value.id,
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
          </Grid>

          <Grid item xs={12} md={3}>
            <Autocomplete
              id='employeeId'
              options={EmployeeList}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => {
                setFormInfo((prev) => ({
                  ...prev,
                  EmployeeId: value.id,
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
          </Grid>

          <Grid item xs={12} md={3}>
            <Autocomplete
              id='StatusList'
              options={statusList}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => {
                setFormInfo((prev) => ({
                  ...prev,
                  EmpStatusId: value.id,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  variant='outlined'
                  {...params}
                  name='StatusList'
                  label={intl.formatMessage(messages.status)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Autocomplete
              id='vacationId'
              options={VacationsList}
              multiple
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => {
                setFormInfo((prev) => ({
                  ...prev,
                  VacationId: value,
                }));
              }}
              sx={{
                '.MuiInputBase-root': {
                  paddingTop: '8px',
                  paddingBottom: '8px',
                },
              }}
              renderInput={(params) => (
                <TextField
                  variant='outlined'
                  {...params}
                  name='VacationId'
                  required
                  label={intl.formatMessage(messages.vacationType)}
                />
              )}
            />
          </Grid>

          <Grid item md={5}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <FormControlLabel
                control={<Checkbox />}
                onChange={(evt) => setFormInfo((prev) => ({
                  ...prev,
                  InsertDate: evt.target.checked,
                }))
                }
                checked={formInfo.InsertDate}
                label={intl.formatMessage(messages.filterOnRegistrationHistory)}
              />

              <Button
                variant='contained'
                size='medium'
                color='primary'
                onClick={onSearchBtnClick}
              >
                <FormattedMessage {...messages.search} />
              </Button>
            </Stack>
          </Grid>
        </Grid>

      </PapperBlock>

      <div className={classes.table}>
        <MUIDataTable
          title=''
          data={tableData}
          columns={columns}
          options={options}
        />
      </div>
    </Box>
  );
}

export default injectIntl(LeaveTrxReport);
