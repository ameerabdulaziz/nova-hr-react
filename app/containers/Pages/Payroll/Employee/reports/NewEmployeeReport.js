import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import API from '../api/NewEmployeeReportData';
import messages from '../messages';

function NewEmployeeReport(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const Title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);

  const [departmentList, setDepartmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateError, setDateError] = useState({});

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    OrganizationId: '',
    ShowSalary: false,
  });

  const columns = useMemo(() => {
    const beforeSalaryColumns = [
      {
        name: 'id',
        options: {
          filter: false,
          display: false,
          print: false,
        },
      },
      {
        name: 'organizationName',
        label: intl.formatMessage(messages.organization),
      },
      {
        name: 'employeeId',
        label: intl.formatMessage(payrollMessages.employeeId),
        options: {
          filter: false,
          display: false,
          download: false,
          print: false,
        },
      },

      {
        name: 'employeeCode',
        label: intl.formatMessage(payrollMessages.employeeCode),
      },
      {
        name: 'employeeName',
        label: intl.formatMessage(messages.employeename),
      },
      {
        name: 'variableSalary',
        label: intl.formatMessage(messages.insuranceSalary),
      },
      {
        name: 'mainSalary',
        label: intl.formatMessage(messages.basicSalary),
      },
      {
        name: 'jobName',
        label: intl.formatMessage(messages.jopTitle),
      },
      {
        name: 'hiringDate',
        label: intl.formatMessage(messages.hiringDate),
      },
      {
        name: 'qualification',
        label: intl.formatMessage(messages.qualification),
      },
      {
        name: 'address',
        label: intl.formatMessage(messages.address),
      },
      {
        name: 'insuranceDate',
        label: intl.formatMessage(messages.insuranceDate),
      },
      {
        name: 'taxable',
        label: intl.formatMessage(messages.taxableStuff),
      },
      {
        name: 'postOverTime',
        label: intl.formatMessage(messages.postOverTime),
      },
    ];

    const afterSalaryColumns = [
      {
        name: 'siEmpShareFix',
        label: intl.formatMessage(messages.insuranceShare),
      },
      {
        name: 'religion',
        label: intl.formatMessage(messages.religion),
      },
      {
        name: 'qualificationDate',
        label: intl.formatMessage(messages.qualificationDate),
      },
      {
        name: 'idCardNumber',
        label: intl.formatMessage(messages.idCardNumber),
      },
      {
        name: 'birthDate',
        label: intl.formatMessage(messages.birthDate),
      },
      {
        name: 'gender',
        label: intl.formatMessage(messages.gender),
      },
    ];

    const salaryColumns = [
      {
        name: 'netSal',
        label: intl.formatMessage(messages.netSalary),
      },
      {
        name: 'grossSalary',
        label: intl.formatMessage(messages.grossSalary),
      },
    ];

    if (formInfo.ShowSalary) {
      return [...beforeSalaryColumns, ...salaryColumns, ...afterSalaryColumns];
    }

    return [...beforeSalaryColumns, ...afterSalaryColumns];
  }, [formInfo.ShowSalary]);

  async function fetchData() {
    try {
      const department = await GeneralListApis(locale).GetDepartmentList();
      setDepartmentList(department);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  const fetchTableData = async () => {
    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);
      const formData = {
        ...formInfo,
        FormData: formateDate(formInfo.FromDate),
        ToDate: formateDate(formInfo.ToDate),
      };

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={intl.formatMessage(messages.fromDate)}
                value={
                  formInfo.FromDate
                    ? dayjs(formInfo.FromDate)
                    : formInfo.FromDate
                }
                className={classes.field}
                onChange={(date) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    FromDate: date,
                  }));
                }}
                onError={(error, value) => {
                  if (error !== null) {
                    setDateError((prevState) => ({
                      ...prevState,
                      FromDate: true,
                    }));
                  } else {
                    setDateError((prevState) => ({
                      ...prevState,
                      FromDate: false,
                    }));
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={intl.formatMessage(messages.toDate)}
                value={
                  formInfo.ToDate ? dayjs(formInfo.ToDate) : formInfo.ToDate
                }
                className={classes.field}
                onChange={(date) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    ToDate: date,
                  }));
                }}
                onError={(error, value) => {
                  if (error !== null) {
                    setDateError((prevState) => ({
                      ...prevState,
                      ToDate: true,
                    }));
                  } else {
                    setDateError((prevState) => ({
                      ...prevState,
                      ToDate: false,
                    }));
                  }
                }}
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
              {intl.formatMessage(payrollMessages.search)}
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>

      <PayrollTable title='' data={tableData} columns={columns} />
    </PayRollLoader>
  );
}

NewEmployeeReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(NewEmployeeReport);
