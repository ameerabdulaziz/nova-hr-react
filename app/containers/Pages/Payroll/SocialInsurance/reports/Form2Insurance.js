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
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import useStyles from '../../Style';
import { formateDate } from '../../helpers';
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
    ToDate: new Date(),
    InsDate: 'false',
    OrderInsNo: 'false',
    HiringDate: 'false',
  });

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
    },

    {
      name: 'employeeCode',
      label: intl.formatMessage(messages.employeeId),
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'job',
      label: intl.formatMessage(messages.job),
    },

    {
      name: 'gender',
      label: intl.formatMessage(messages.gender),
    },

    {
      name: 'birthDate',
      label: intl.formatMessage(messages.birthDate),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },

    {
      name: 'insuranceDate',
      label: intl.formatMessage(messages.insuranceDate),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },

    {
      name: 'mainSalary',
      label: intl.formatMessage(messages.insuranceSalary),
    },

    {
      name: 'insGrossSalary',
      label: intl.formatMessage(messages.grossSalary),
    },

    {
      name: 'mainSalaryNew',
      label: intl.formatMessage(messages.basicSalary),
    },
  ];

  const options = {
    print: false,
    customToolbar: () => (
      <>
        <InsuranceReportForm2
          rows={tableData}
          organizationId={formInfo.InsuranceOrg || 0}
          totalSalary={extraData.total ?? 0}
          organizationName={
            organizationList.find((item) => item.id === formInfo.InsuranceOrg)
              ?.name ?? ''
          }
        />
      </>
    ),
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
                      renderInput={(params) => (
                        <TextField {...params} fullWidth variant='outlined' />
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

      <PayrollTable
        title=''
        data={tableData}
        columns={columns}
        options={options}
      />
    </PayRollLoader>
  );
}

Form2Insurance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Form2Insurance);
