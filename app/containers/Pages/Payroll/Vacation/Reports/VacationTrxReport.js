import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import { toast } from 'react-hot-toast';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import GeneralListApis from '../../api/GeneralListApis';
import useStyles from '../../Style';
import messages from '../../messages';
import API from '../api/VacationTrxReportData';

function VacationTrxReport(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);

  const [EmployeeList, setEmployeeList] = useState([]);
  const [VacationsList, setVacationsList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [statusList, setStatusList] = useState([]);

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
      },
    },
    {
      name: 'toDate',
      label: <FormattedMessage {...messages.todate} />,
      options: {
        filter: true,
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
    rowsPerPage: 10,
    page: 0,
    searchOpen: false,
    selectableRows: 'none',
    onSearchClose: () => {
      // some logic
    },
  };

  async function fetchData() {
    const employees = await GeneralListApis(locale).GetEmployeeList();
    setEmployeeList(employees);

    const Vacations = await GeneralListApis(locale).GetVacList();
    setVacationsList(Vacations);

    const department = await GeneralListApis(locale).GetDepartmentList();
    setDepartmentList(department);

    const status = await GeneralListApis(locale).GetEmpStatusList();
    setStatusList(status);
  }

  const fetchTableData = async () => {
    const formData = { ...formInfo };

    formData.VacationId = formData.VacationId.map(item => item.id);

    Object.keys(formData).forEach((key) => {
      formData[key] = formData[key] === null ? '' : formData[key];
    });

    try {
      const dataApi = await API(locale).GetReport(formData);

      setTableData(dataApi);
    } catch (err) {
      toast.error(JSON.stringify(err.response.data));
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
    <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label={intl.formatMessage(messages.fromdate)}
                value={formInfo.FromDate}
                onChange={(date) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    FromDate: date && format(new Date(date), 'yyyy-MM-dd'),
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
                    ToDate: date && format(new Date(date), 'yyyy-MM-dd'),
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

          <Grid item xs={12} md={2}>
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

          <Grid item xs={12} md={3}>
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

          <Grid item md={3}>
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
          </Grid>

          <Grid item xs={12} md={2}>
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

        <div className={classes.table}>
          <MUIDataTable
            title=''
            data={tableData}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </PapperBlock>
  );
}

export default injectIntl(VacationTrxReport);
