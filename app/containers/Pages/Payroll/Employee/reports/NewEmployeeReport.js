import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
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
import API from '../api/NewEmployeeReportData';
import messages from '../messages';

function NewEmployeeReport(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);

  const [departmentList, setDepartmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Title = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    OrganizationId: '',
    ShowSalary: false,
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
      label: <FormattedMessage {...messages.employeeCode} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'employeeName',
      label: <FormattedMessage {...messages.employeename} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'variableSalary',
      label: <FormattedMessage {...messages.insuranceSalary} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'mainSalary',
      label: <FormattedMessage {...messages.basicSalary} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'jobName',
      label: <FormattedMessage {...messages.jopTitle} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'hiringDate',
      label: <FormattedMessage {...messages.hiringDate} />,
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'qualification',
      label: <FormattedMessage {...messages.qualification} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'address',
      label: <FormattedMessage {...messages.address} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'insuranceDate',
      label: <FormattedMessage {...messages.insuranceDate} />,
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'taxable',
      label: <FormattedMessage {...messages.taxableStuff} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'postOverTime',
      label: <FormattedMessage {...messages.postOverTime} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'netSal',
      label: <FormattedMessage {...messages.netSalary} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'grossSalary',
      label: <FormattedMessage {...messages.grossSalary} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'siEmpShareFix',
      label: <FormattedMessage {...messages.insuranceShare} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'religion',
      label: <FormattedMessage {...messages.religion} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'qualificationDate',
      label: <FormattedMessage {...messages.qualificationDate} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'idCardNumber',
      label: <FormattedMessage {...messages.idCardNumber} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'birthDate',
      label: <FormattedMessage {...messages.birthDate} />,
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'gender',
      label: <FormattedMessage {...messages.gender} />,
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
      const department = await GeneralListApis(locale).GetDepartmentList();
      setDepartmentList(department);
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
          <Grid item xs={12} md={3}>
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
          </Grid>

          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label={intl.formatMessage(messages.fromDate)}
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

          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label={intl.formatMessage(messages.toDate)}
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

          <Grid item md={3}>
            <FormControlLabel
              control={<Checkbox />}
              onChange={(evt) => setFormInfo((prev) => ({
                ...prev,
                ShowSalary: evt.target.checked,
              }))
              }
              checked={formInfo.ShowSalary}
              label={intl.formatMessage(messages.showSalary)}
            />
          </Grid>

          <Grid item md={3}>
            <Button
              variant='contained'
              size='medium'
              color='primary'
              onClick={onSearchBtnClick}
            >
              <FormattedMessage {...payrollMessages.search} />
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
    </Box>
  );
}

export default injectIntl(NewEmployeeReport);
