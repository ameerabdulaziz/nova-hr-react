import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { format } from 'date-fns';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import payrollMessages from '../../messages';
import InsuranceReportForm2 from '../../reports-templates/InsuranceReportForm2';
import api from '../api/Form2InsuranceData';
import messages from '../messages';

function Form2Insurance(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const [extraData, setExtraData] = useState({
    total: 0,
    totalMainSalary: 0,
    totalVarSalary: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [formInfo, setFormInfo] = useState({
    InsuranceOrg: '',
    InsOffice: '',
    ToDate: null,
    InsDate: 'false',
    OrderInsNo: 'false',
    HiringDate: 'false',
  });

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  const fetchTableData = async () => {
    try {
      setIsLoading(true);

      const formData = { ...formInfo };

      formData.ToDate = formateDate(formInfo.ToDate);

      if (formInfo.InsDate === 'true') {
        formData.HiringDate = 'false';
      } else {
        formData.HiringDate = 'true';
      }

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? '' : formData[key];
      });

      const { list, ...response } = await api(locale).GetList(formData);
      setTableData(list);
      setExtraData(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    try {
      const organizations = await api(locale).GetSInsuranceOrgnization();
      setOrganizationList(organizations);

      const office = await api(locale).GetSInsuranceOffices();
      setOfficeList(office);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const columns = [
    {
      name: 'socialInsuranceID',
      label: intl.formatMessage(messages.insuranceNumber),
      options: {
        filter: true,
      },
    },

    {
      name: 'employeeCode',
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
      name: 'job',
      label: intl.formatMessage(messages.job),
      options: {
        filter: true,
      },
    },

    {
      name: 'gender',
      label: intl.formatMessage(messages.gender),
      options: {
        filter: true,
      },
    },

    {
      name: 'birthDate',
      label: intl.formatMessage(messages.birthDate),
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), 'yyyy-MM-dd'),
      },
    },

    {
      name: 'insuranceDate',
      label: intl.formatMessage(messages.insuranceDate),
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), 'yyyy-MM-dd'),
      },
    },

    {
      name: 'mainSalary',
      label: intl.formatMessage(messages.insuranceSalary),
      options: {
        filter: true,
      },
    },

    {
      name: 'insGrossSalary',
      label: intl.formatMessage(messages.grossSalary),
      options: {
        filter: true,
      },
    },

    {
      name: 'mainSalaryNew',
      label: intl.formatMessage(messages.basicSalary),
      options: {
        filter: true,
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: false,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    selectableRows: 'none',
    searchOpen: false,
    onSearchClose: () => {
      // some logic
    },
    customToolbar: () => (
      <>
        <InsuranceReportForm2
          rows={tableData}
          organizationId={formInfo.InsuranceOrg ?? 0}
          totalSalary={extraData.total ?? 0}
          organizationName={
            organizationList.find((item) => item.id === formInfo.InsuranceOrg)
              ?.name ?? ''
          }
        />
      </>
    ),
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    fetchTableData();
  };

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={organizationList}
                    value={
                      organizationList.find(
                        (item) => item.id === formInfo.InsuranceOrg
                      ) ?? null
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    onChange={(_, value) => onAutoCompleteChange(value, 'InsuranceOrg')
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label={intl.formatMessage(messages.organizationName)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={officeList}
                    value={
                      officeList.find(
                        (item) => item.id === formInfo.InsOffice
                      ) ?? null
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    onChange={(_, value) => onAutoCompleteChange(value, 'InsOffice')
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.insuranceOffice)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label={intl.formatMessage(messages.toDate)}
                      value={formInfo.ToDate}
                      onChange={(date) => onDatePickerChange(date, 'ToDate')}
                      className={classes.field}
                      renderInput={(params) => (
                        <TextField {...params} variant='outlined' />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item md={12}>
                  <RadioGroup
                    row
                    value={formInfo.InsDate}
                    onChange={(evt) => {
                      setFormInfo((prev) => ({
                        ...prev,
                        InsDate: evt.target.value,
                      }));
                    }}
                  >
                    <FormControlLabel
                      value='true'
                      control={<Radio />}
                      label={intl.formatMessage(messages.hiringDate)}
                    />
                    <FormControlLabel
                      value='false'
                      control={<Radio />}
                      label={intl.formatMessage(messages.insuranceNumber)}
                    />
                  </RadioGroup>
                </Grid>

                <Grid item md={12}>
                  <FormControl>
                    <FormLabel>
                      <FormattedMessage {...messages.orderBy} />
                    </FormLabel>

                    <RadioGroup
                      row
                      value={formInfo.OrderInsNo}
                      onChange={(evt) => {
                        setFormInfo((prev) => ({
                          ...prev,
                          OrderInsNo: evt.target.value,
                        }));
                      }}
                    >
                      <FormControlLabel
                        value='true'
                        control={<Radio />}
                        label={intl.formatMessage(messages.insuranceNumber)}
                      />
                      <FormControlLabel
                        value='false'
                        control={<Radio />}
                        label={intl.formatMessage(messages.insuranceDate)}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Button variant='contained' color='primary' type='submit'>
                    <FormattedMessage {...payrollMessages.search} />
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mt: 4 }} className={classes.card}>
            <CardContent>
              <Grid container justifyContent='space-around' spacing={2}>
                <Grid item xs={4} textAlign='center'>
                  <Typography>{extraData.total ?? 0}</Typography>
                  <Typography variant='subtitle1'>
                    <FormattedMessage {...messages.totalFixed} />
                  </Typography>
                </Grid>

                <Grid item xs={4} textAlign='center'>
                  <Typography>{extraData.total ?? 0}</Typography>
                  <Typography variant='subtitle1'>
                    <FormattedMessage {...messages.totalVariable} />
                  </Typography>
                </Grid>

                <Grid item xs={4} textAlign='center'>
                  <Typography>{extraData.total ?? 0}</Typography>
                  <Typography variant='subtitle1'>
                    <FormattedMessage {...payrollMessages.total} />
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
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

Form2Insurance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Form2Insurance);
