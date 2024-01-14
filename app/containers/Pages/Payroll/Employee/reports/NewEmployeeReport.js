import {
  Autocomplete,
  Button,
  Checkbox,
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
import PayRollLoader from "../../Component/PayRollLoader";

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
      label: intl.formatMessage(messages.organization),
      options: {
        filter: true,
      },
    },
    {
      name: 'employeeId',
      label: intl.formatMessage(messages.employeeCode),
      options: {
        filter: true,
      },
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeename),
      options: {
        filter: true,
      },
    },
    {
      name: 'variableSalary',
      label: intl.formatMessage(messages.insuranceSalary),
      options: {
        filter: true,
      },
    },
    {
      name: 'mainSalary',
      label: intl.formatMessage(messages.basicSalary),
      options: {
        filter: true,
      },
    },
    {
      name: 'jobName',
      label: intl.formatMessage(messages.jopTitle),
      options: {
        filter: true,
      },
    },
    {
      name: 'hiringDate',
      label: intl.formatMessage(messages.hiringDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'qualification',
      label: intl.formatMessage(messages.qualification),
      options: {
        filter: true,
      },
    },
    {
      name: 'address',
      label: intl.formatMessage(messages.address),
      options: {
        filter: true,
      },
    },
    {
      name: 'insuranceDate',
      label: intl.formatMessage(messages.insuranceDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'taxable',
      label: intl.formatMessage(messages.taxableStuff),
      options: {
        filter: true,
      },
    },
    {
      name: 'postOverTime',
      label: intl.formatMessage(messages.postOverTime),
      options: {
        filter: true,
      },
    },
    {
      name: 'netSal',
      label: intl.formatMessage(messages.netSalary),
      options: {
        filter: true,
      },
    },
    {
      name: 'grossSalary',
      label: intl.formatMessage(messages.grossSalary),
      options: {
        filter: true,
      },
    },
    {
      name: 'siEmpShareFix',
      label: intl.formatMessage(messages.insuranceShare),
      options: {
        filter: true,
      },
    },
    {
      name: 'religion',
      label: intl.formatMessage(messages.religion),
      options: {
        filter: true,
      },
    },
    {
      name: 'qualificationDate',
      label: intl.formatMessage(messages.qualificationDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'idCardNumber',
      label: intl.formatMessage(messages.idCardNumber),
      options: {
        filter: true,
      },
    },
    {
      name: 'birthDate',
      label: intl.formatMessage(messages.birthDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'gender',
      label: intl.formatMessage(messages.gender),
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
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
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
                  if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                    if (!isNaN(new Date(date))) { 
                      setFormInfo((prev) => ({
                          ...prev,
                          FromDate: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                        }))
                    }
                    else
                    {
                      setFormInfo((prev) => ({
                        ...prev,
                        FromDate: null,
                      }))
                    } 
                  }
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
                  if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                    if (!isNaN(new Date(date))) { 
                      setFormInfo((prev) => ({
                          ...prev,
                          ToDate: date === null ? null : format(new Date(date), "yyyy-MM-dd"),
                        }))
                    }
                    else
                    {
                      setFormInfo((prev) => ({
                        ...prev,
                        ToDate: null,
                      }))
                    } 
                  }
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
    </PayRollLoader>
  );
}

export default injectIntl(NewEmployeeReport);
